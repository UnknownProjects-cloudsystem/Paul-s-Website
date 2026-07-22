import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const recent = new Map<string, number>();
const DEDUPE_TTL_MS = 60_000;


function isDuplicate(key: string) {
  const now = Date.now();

  for (const [savedKey, timestamp] of recent) {
    if (now - timestamp > DEDUPE_TTL_MS) recent.delete(savedKey);
  }

  if (recent.has(key)) return true;

  recent.set(key, now);
  return false;
}

type Payload = Record<string, unknown> & {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  consent?: boolean;
};

function getValue(data: Payload, ...keys: string[]) {
  for (const key of keys) {
    const value = data[key];
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return String(value);
    }
  }

  return "Not provided";
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] || character
  );
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="width: 38%; padding: 12px 14px; border: 1px solid #d1d5db; background: #f3f4f6; font-weight: 700; color: #1f2937;">
        ${escapeHtml(label)}
      </td>
      <td style="padding: 12px 14px; border: 1px solid #d1d5db; color: #111827;">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

function buildEmailHtml(data: Payload) {
  const name = `${getValue(data, "firstName")} ${getValue(data, "lastName")}`.trim();
  const email = getValue(data, "email");

  const emailLink =
    email !== "Not provided"
      ? `<a href="mailto:${escapeHtml(email)}" style="color: #2563eb;">${escapeHtml(email)}</a>`
      : "Not provided";

  return `
    <!doctype html>
    <html>
      <body style="margin: 0; padding: 24px; background: #ffffff; font-family: Arial, Helvetica, sans-serif;">
        <div style="max-width: 810px; margin: 0 auto;">
          <h1 style="margin: 0 0 20px; font-size: 24px; color: #111827;">
            New CCI Website Inquiry
          </h1>

          <table cellspacing="0" cellpadding="0" style="width: 100%; border-collapse: collapse; font-size: 14px;">
            ${row("Name", name)}
            ${row("Phone", getValue(data, "phone"))}
            <tr>
              <td style="width: 38%; padding: 12px 14px; border: 1px solid #d1d5db; background: #f3f4f6; font-weight: 700; color: #1f2937;">
                Email
              </td>
              <td style="padding: 12px 14px; border: 1px solid #d1d5db;">
                ${emailLink}
              </td>
            </tr>
            ${row("Full Address", getValue(data, "fullAddress", "address", "area"))}
            ${row("City / Town", getValue(data, "city", "town"))}
            ${row("Preferred Contact", getValue(data, "preferredContact", "contactMethod"))}
            ${row("Service Category", getValue(data, "serviceCategory", "category"))}
            ${row("Service Type", getValue(data, "serviceType"))}
            ${row("Dog's Name", getValue(data, "dogName"))}
            ${row("Breed", getValue(data, "breed"))}
            ${row("Age", getValue(data, "age"))}
            ${row("Weight", getValue(data, "weight"))}
            ${row("Gender", getValue(data, "gender"))}
            ${row("Spayed / Neutered", getValue(data, "spayedNeutered", "spayed", "neutered"))}
            ${row("Training Level", getValue(data, "trainingLevel"))}
            ${row("Main Concern", getValue(data, "concern"))}
            ${row("Message", getValue(data, "message"))}
          </table>
        </div>
      </body>
    </html>
  `;
}

function buildEmailText(data: Payload) {
  return [
    "New CCI Website Inquiry",
    "",
    `Name: ${getValue(data, "firstName")} ${getValue(data, "lastName")}`.trim(),
    `Phone: ${getValue(data, "phone")}`,
    `Email: ${getValue(data, "email")}`,
    `Full Address: ${getValue(data, "fullAddress", "address", "area")}`,
    `City / Town: ${getValue(data, "city", "town")}`,
    `Preferred Contact: ${getValue(data, "preferredContact", "contactMethod")}`,
    `Service Category: ${getValue(data, "serviceCategory", "category")}`,
    `Service Type: ${getValue(data, "serviceType")}`,
    `Dog's Name: ${getValue(data, "dogName")}`,
    `Breed: ${getValue(data, "breed")}`,
    `Age: ${getValue(data, "age")}`,
    `Weight: ${getValue(data, "weight")}`,
    `Gender: ${getValue(data, "gender")}`,
    `Spayed / Neutered: ${getValue(data, "spayedNeutered", "spayed", "neutered")}`,
    `Training Level: ${getValue(data, "trainingLevel")}`,
    `Main Concern: ${getValue(data, "concern")}`,
    `Message: ${getValue(data, "message")}`,
  ].join("\n");
}

async function sendInquiryEmail(data: Payload) {
 const env = getCloudflareContext().env as {
  RESEND_API_KEY?: string;
  INQUIRY_FROM_EMAIL?: string;
  INQUIRY_TO_EMAIL?: string;
};

const apiKey = env.RESEND_API_KEY;
const from = env.INQUIRY_FROM_EMAIL;
const to = env.INQUIRY_TO_EMAIL;

  if (!apiKey || !from || !to) {
    throw new Error("Missing required email environment variables");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: String(data.email),
      subject: "New CCI Website Inquiry",
      html: buildEmailHtml(data),
      text: buildEmailText(data),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend ${response.status}: ${await response.text()}`);
  }
}

export async function POST(req: Request) {
  let data: Payload;

  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }

  if (typeof data.company === "string" && data.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const emailOk = /^\S+@\S+\.\S+$/.test(String(data.email ?? ""));
  const phoneOk = String(data.phone ?? "").replace(/\D/g, "").length >= 10;

  if (!data.firstName || !data.lastName || !emailOk || !phoneOk) {
    return NextResponse.json(
      { ok: false, error: "Missing or invalid fields" },
      { status: 422 }
    );
  }

  if (!data.consent) {
    return NextResponse.json(
      { ok: false, error: "Consent is required" },
      { status: 422 }
    );
  }

  const duplicateKey = `${data.email}|${data.phone}|${String(
    data.message ?? ""
  ).slice(0, 50)}`;

  if (isDuplicate(duplicateKey)) {
    return NextResponse.json({ ok: true, deduped: true });
  }

  try {
    await sendInquiryEmail(data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[inquiry] email delivery failed:", error);

    return NextResponse.json(
      { ok: false, error: "Unable to send inquiry" },
      { status: 502 }
    );
  }
}
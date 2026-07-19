import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const recent = new Map<string, number>();
const DEDUPE_TTL_MS = 60_000;

type Payload = Record<string, unknown> & {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  area?: string;
  city?: string;
  preferredContact?: string;
  serviceCategory?: string;
  serviceType?: string;
  dogName?: string;
  breed?: string;
  age?: string;
  weight?: string;
  gender?: string;
  spayedNeutered?: string;
  trainingLevel?: string;
  concern?: string;
  message?: string;
  company?: string;
  consent?: boolean;
};

function clean(value: unknown) {
  return String(value ?? "").trim();
}

function escapeHtml(value: unknown) {
  return clean(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isDuplicate(key: string) {
  const now = Date.now();
  for (const [storedKey, time] of recent) {
    if (now - time > DEDUPE_TTL_MS) recent.delete(storedKey);
  }
  return recent.has(key);
}

function inquiryFields(data: Payload): Array<[string, unknown]> {
  return [
    ["Name", `${clean(data.firstName)} ${clean(data.lastName)}`],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Full Address", data.area],
    ["City / Town", data.city],
    ["Preferred Contact", data.preferredContact],
    ["Service Category", data.serviceCategory],
    ["Service Type", data.serviceType],
    ["Dog's Name", data.dogName],
    ["Breed", data.breed],
    ["Age", data.age],
    ["Weight", data.weight],
    ["Gender", data.gender],
    ["Spayed / Neutered", data.spayedNeutered],
    ["Training Level", data.trainingLevel],
    ["Main Concern", data.concern],
    ["Message", data.message || "No additional message provided."],
  ];
}

function buildText(data: Payload) {
  return [
    "New CCI Website Inquiry",
    "",
    ...inquiryFields(data).map(
      ([label, value]) => `${label}: ${clean(value) || "—"}`
    ),
  ].join("\n");
}

function buildHtml(data: Payload) {
  const row = (label: string, value: unknown) =>
    `<tr><th align="left" valign="top" style="width:38%;padding:10px 14px;border:1px solid #d7d9dd;background:#f5f5f5;font-weight:700">${label}</th><td style="padding:10px 14px;border:1px solid #d7d9dd;white-space:pre-wrap">${escapeHtml(value) || "—"}</td></tr>`;
  return `
    <div style="font-family:Arial,sans-serif;color:#16181d;line-height:1.5">
      <h1 style="font-size:22px">New CCI Website Inquiry</h1>
      <table role="presentation" style="border-collapse:collapse;width:100%;max-width:810px">
        ${inquiryFields(data)
          .map(([label, value]) => row(label, value))
          .join("")}
      </table>
    </div>`;
}

async function sendInquiryEmail(data: Payload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.INQUIRY_FROM_EMAIL ||
        "Caissie Canine Instruction <onboarding@resend.dev>",
      to: [process.env.INQUIRY_TO_EMAIL || "Caissiecanineinstruction@gmail.com"],
      reply_to: clean(data.email),
      subject: `New CCI inquiry from ${clean(data.firstName)} ${clean(data.lastName)}`,
      text: buildText(data),
      html: buildHtml(data),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Email service responded ${response.status}: ${detail.slice(0, 200)}`);
  }
}

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  if (clean(data.company)) return NextResponse.json({ ok: true });

  const emailOk = /^\S+@\S+\.\S+$/.test(clean(data.email));
  const phoneOk = clean(data.phone).replace(/\D/g, "").length >= 10;
  if (!clean(data.firstName) || !clean(data.lastName) || !emailOk || !phoneOk) {
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

  const key = `${clean(data.email)}|${clean(data.phone)}|${clean(data.message).slice(0, 50)}`;
  if (isDuplicate(key)) return NextResponse.json({ ok: true, deduped: true });

  try {
    await sendInquiryEmail(data);
    recent.set(key, Date.now());
    return NextResponse.json({ ok: true, email: true });
  } catch (error) {
    console.error("[inquiry] email delivery failed:", (error as Error).message);
    return NextResponse.json(
      { ok: false, error: "Email delivery failed" },
      { status: 503 }
    );
  }
}

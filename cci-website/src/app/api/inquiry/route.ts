import { NextResponse } from "next/server";

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

function buildEmailText(data: Payload) {
  return [
    "New Caissie Canine Instruction Inquiry",
    "",
    `Name: ${data.firstName ?? ""} ${data.lastName ?? ""}`.trim(),
    `Phone: ${data.phone ?? "Not provided"}`,
    `Email: ${data.email ?? "Not provided"}`,
    `City: ${data.city ?? "Not provided"}`,
    `Service: ${data.serviceType ?? "Not provided"}`,
    `Dog: ${[data.breed, data.age, data.gender]
      .filter(Boolean)
      .join(", ") || "Not provided"}`,
    `Concern: ${data.concern ?? "Not provided"}`,
    "",
    `Message: ${data.message ?? "No additional message"}`,
    "",
    `Submitted: ${new Date().toLocaleString("en-CA")}`,
  ].join("\n");
}

async function sendInquiryEmail(
  text: string,
  replyTo: string
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const to = process.env.INQUIRY_TO_EMAIL;

  if (!apiKey || !from || !to) {
    throw new Error(
      "Missing RESEND_API_KEY, INQUIRY_FROM_EMAIL, or INQUIRY_TO_EMAIL"
    );
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
      reply_to: replyTo,
      subject: "New CCI Training Inquiry",
      text,
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new Error(`Resend ${response.status}: ${details}`);
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

  // Honeypot: silently accept bot submissions without sending email.
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
    await sendInquiryEmail(buildEmailText(data), String(data.email));
    console.log("[inquiry] Email delivered to Resend.");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(
      "[inquiry] email delivery failed:",
      error instanceof Error ? error.message : error
    );

    return NextResponse.json(
      { ok: false, error: "Unable to send inquiry" },
      { status: 502 }
    );
  }
}
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Simple in-memory dedupe (per server instance). Blocks identical resubmits
// within the TTL window so a double-click can't fire two SMS messages.
const recent = new Map<string, number>();
const DEDUPE_TTL_MS = 60_000;

function isDuplicate(key: string) {
  const now = Date.now();
  for (const [k, t] of recent) if (now - t > DEDUPE_TTL_MS) recent.delete(k);
  if (recent.has(key)) return true;
  recent.set(key, now);
  return false;
}

type Payload = Record<string, unknown> & {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string; // honeypot
  consent?: boolean;
};

function buildSms(d: Payload) {
  const line = (label: string, v: unknown) => (v ? `${label}: ${v}\n` : "");
  return (
    `New CCI Inquiry\n\n` +
    `Name: ${d.firstName ?? ""} ${d.lastName ?? ""}\n` +
    line("Phone", d.phone) +
    line("Email", d.email) +
    line("City", d.city) +
    line("Service", d.serviceType) +
    `Dog: ${[d.breed, d.age, d.gender].filter(Boolean).join(", ")}\n` +
    line("Concern", d.concern) +
    (d.message ? `\nMessage: ${d.message}\n` : "") +
    `\nReply to client: ${d.phone ?? ""}`
  );
}

// Send an SMS via the Twilio REST API. Returns true on success.
async function sendTwilioSms(body: string): Promise<boolean> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.OWNER_SMS_NUMBER || "+16475104080";
  if (!sid || !token || !from) return false;

  const auth = Buffer.from(`${sid}:${token}`).toString("base64");
  const params = new URLSearchParams({ To: to, From: from, Body: body });

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    }
  );
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Twilio ${res.status}: ${text.slice(0, 300)}`);
  }
  return true;
}

// Forward the lead to a Zapier webhook (optional backup / Sheets / Airtable log).
async function postWebhook(payload: object): Promise<boolean> {
  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  if (!webhook) return false;
  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  return true;
}

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot — silently accept to avoid tipping off bots, but do nothing.
  if (typeof data.company === "string" && data.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Validation
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

  // Dedupe
  const key = `${data.email}|${data.phone}|${String(data.message ?? "").slice(0, 50)}`;
  if (isDuplicate(key)) {
    return NextResponse.json({ ok: true, deduped: true });
  }

  const submittedAt = new Date().toISOString();
  const smsText = buildSms(data);

  // Dispatch: SMS via Twilio (primary) + webhook (optional backup/log).
  let sms = false;
  let webhook = false;
  const errors: string[] = [];

  try {
    sms = await sendTwilioSms(smsText);
  } catch (err) {
    errors.push(`twilio: ${(err as Error).message}`);
  }

  try {
    webhook = await postWebhook({
      secret: process.env.INQUIRY_WEBHOOK_SECRET,
      submittedAt,
      smsText,
      lead: data,
    });
  } catch (err) {
    errors.push(`webhook: ${(err as Error).message}`);
  }

  if (!sms && !webhook) {
    // Nothing dispatched. Log so the lead is never silently lost.
    console.warn(
      "[inquiry] No SMS/webhook configured or both failed. Lead received:\n",
      smsText,
      errors.length ? `\nErrors: ${errors.join(" | ")}` : ""
    );
  } else if (errors.length) {
    console.error("[inquiry] partial dispatch:", errors.join(" | "));
  }

  // Always 200 to the user so a delivery hiccup never loses the lead.
  return NextResponse.json({ ok: true, sms, webhook });
}

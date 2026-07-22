#!/usr/bin/env node
/**
 * Twilio SMS smoke test (pure Twilio — no Zapier).
 *
 * Usage:
 *   1. Fill TWILIO_* values in .env.local (see .env.example)
 *   2. npm run test:sms
 *
 * Sends one test text to OWNER_SMS_NUMBER using the exact same Twilio call the
 * website's /api/inquiry route uses. If this works, the live form will too.
 */

import fs from "node:fs";
import path from "node:path";

// --- minimal .env.local loader (no dependency) ---
function loadEnv(file) {
  const p = path.join(process.cwd(), file);
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    if (/^\s*#/.test(line)) continue; // full-line comment
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let [, k, raw] = m;
    raw = raw.trim();
    let v;
    if (raw[0] === '"' || raw[0] === "'") {
      // quoted value: take content up to the matching closing quote
      const q = raw[0];
      const end = raw.indexOf(q, 1);
      v = end >= 0 ? raw.slice(1, end) : raw.slice(1);
    } else {
      // unquoted: strip any trailing inline comment
      const hash = raw.indexOf(" #");
      v = (hash >= 0 ? raw.slice(0, hash) : raw).trim();
    }
    if (!(k in process.env)) process.env[k] = v;
  }
}
loadEnv(".env.local");

const sid = process.env.TWILIO_ACCOUNT_SID;
const token = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_FROM_NUMBER;
const to = process.env.OWNER_SMS_NUMBER || "+16475104080";

const missing = [
  ["TWILIO_ACCOUNT_SID", sid],
  ["TWILIO_AUTH_TOKEN", token],
  ["TWILIO_FROM_NUMBER", from],
].filter(([, v]) => !v);

if (missing.length) {
  console.error(
    "❌ Missing env vars: " + missing.map(([k]) => k).join(", ") +
      "\n   Fill them in .env.local (copy from .env.example) and retry."
  );
  process.exit(1);
}

const body =
  "✅ Caissie Canine Instruction test message.\n" +
  "If you received this, your website lead texts are working.";

const auth = Buffer.from(`${sid}:${token}`).toString("base64");
const params = new URLSearchParams({ To: to, From: from, Body: body });

console.log(`Sending test SMS  ${from} → ${to} …`);

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

const data = await res.json().catch(() => ({}));

if (res.ok) {
  console.log(`✅ Sent! Twilio SID: ${data.sid}  status: ${data.status}`);
  console.log("   Check the phone for the text.");
} else {
  console.error(`❌ Twilio error ${res.status}: ${data.message || ""}`);
  if (data.code === 21608 || data.code === 21211) {
    console.error("   Tip: verify the To/From numbers and your A2P/Toll-Free registration.");
  }
  if (data.more_info) console.error(`   More: ${data.more_info}`);
  process.exit(1);
}

const apiKey = process.env.RESEND_API_KEY;
const to = process.env.INQUIRY_TO_EMAIL || "hasszahra2020@gmail.com";
const from =
  process.env.INQUIRY_FROM_EMAIL ||
  "Caissie Canine Instruction <onboarding@resend.dev>";

if (!apiKey) {
  console.error("RESEND_API_KEY is missing from .env.local");
  process.exit(1);
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
    subject: "CCI website email test",
    text: "The Caissie Canine Instruction inquiry email connection is working.",
  }),
});

if (!response.ok) {
  console.error(`Email test failed (${response.status})`);
  process.exit(1);
}

console.log(`Test email sent to ${to}`);

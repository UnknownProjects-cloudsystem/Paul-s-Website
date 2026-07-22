# Deploying Caissie Canine Instruction to the web

Goal: put the site online so anyone — iPhone, Android, Windows, Mac — can open it
in a browser. Pick **one** of the two options below. Option A is fastest.

> ⚠️ Always run the commands from **inside the `cci-website` folder** (not its
> parent), so only the website is uploaded — not the big photo `.zip` next to it.

The folder is:
`C:\Users\hassz\Claude\Projects\Website Development- Caissie Canine Instructions\cci-website`

---

## Option A — Vercel CLI (fastest, ~5 minutes)

1. Open **PowerShell** (Windows) or **Terminal** (Mac).
2. Go into the project folder:
   ```powershell
   cd "C:\Users\hassz\Claude\Projects\Website Development- Caissie Canine Instructions\cci-website"
   ```
3. Install the Vercel tool (one time):
   ```powershell
   npm install -g vercel
   ```
4. Deploy:
   ```powershell
   vercel
   ```
   - The first time, it opens your browser to log in, then asks a few questions —
     **just press Enter to accept the defaults** (it auto-detects Next.js).
   - When it finishes it prints a **preview URL** you can open.
5. Publish the live (production) version:
   ```powershell
   vercel --prod
   ```
   This gives you the public link (e.g. `caissie-canine.vercel.app`).

---

## Option B — GitHub + Vercel (best for easy future updates)

1. Create a free account at github.com and a new **empty repository**.
2. Push this `cci-website` folder to it (GitHub Desktop app is the easiest way —
   "Add local folder" → select `cci-website` → Publish).
3. Go to **vercel.com → Add New → Project → Import** your repo → **Deploy**.

After this, every time you change the site and push, Vercel re-deploys automatically.

---

## After the first deploy: add your settings (so the contact form works)

In the Vercel dashboard → your project → **Settings → Environment Variables**, add:

| Name                  | Value                                            |
| --------------------- | ------------------------------------------------ |
| `TWILIO_ACCOUNT_SID`  | (from your `.env.local`)                         |
| `TWILIO_AUTH_TOKEN`   | (from your `.env.local`)                         |
| `TWILIO_FROM_NUMBER`  | `+16477993621`                                   |
| `OWNER_SMS_NUMBER`    | `+16475104080`                                   |
| `NEXT_PUBLIC_SITE_URL`| `https://caissiecanineinstruction.ca`            |

Then redeploy (Vercel → Deployments → … → Redeploy) so they take effect.

---

## Connect your domain

Vercel → your project → **Settings → Domains** → add
`caissiecanineinstruction.ca`. Vercel shows you the DNS records to enter at
whoever you bought the domain from (GoDaddy, Namecheap, etc.). Once DNS updates
(can take a few minutes to a few hours), the site shows at your real address.

---

## If the build fails

Copy the error Vercel shows (or just tell me) and I can pull the build logs and
fix the code from here — your Vercel connection lets me read deployments.

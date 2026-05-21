# Luvian Labs LLC — Investor Data Room

Password-gated, self-hosted investor data room. Pre-seed. Confidential. NDA-only.
Production URL: **https://data-room.luvian.info** (target).

Built with Astro v5 + Tailwind on Vercel (Hobby plan compatible). Single shared
investor password, HMAC-signed cookie, edge-style middleware, no third-party auth.

---

## What's in here

```
src/
├── content/dataroom/         markdown content (synced from main repo)
├── data/sections.ts          source-of-truth section/file index
├── lib/auth.ts               HMAC-signed cookie helpers
├── middleware.ts             password gate (runs on every request)
├── pages/
│   ├── index.astro           home (sections + quick downloads)
│   ├── login.astro           password form
│   ├── api/auth.ts           POST → set auth cookie
│   ├── api/logout.ts         POST → clear auth cookie
│   ├── [section]/index.astro section landing page (file list)
│   └── [section]/[slug].astro renders any markdown entry
├── layouts/
│   ├── BaseLayout.astro      html shell + footer
│   └── DataRoomLayout.astro  sidebar + top bar wrapper
└── components/SidebarNav.astro
public/
├── pdf/                      pitch deck, financial model PDF, etc.
├── csv/                      financial model + cap table CSVs
├── favicon.svg
└── robots.txt                noindex, nofollow

scripts/
└── sync-content.mjs          re-sync markdown from main repo
```

## Local Dev (5-minute path)

```bash
# 1. Install
npm install

# 2. Configure secrets
cp .env.example .env
# Open .env and set:
#   INVESTOR_ROOM_PASSWORD     (the password you'll share with investors)
#   INVESTOR_ROOM_COOKIE_SECRET = $(openssl rand -hex 32)

# 3. (re-)sync markdown content from the main monorepo
node scripts/sync-content.mjs ../my-modding-app-2/investor-data-room

# 4. Run
npm run dev      # http://localhost:4321
npm run build    # production build, runs through @astrojs/vercel
```

## Push to GitHub (new public repo)

```bash
# Init git (if not already)
cd /Users/annalieseparker/luvian-investor-data-room
git init
git add .
git commit -m "feat: initial investor data room (LLC stage, pre-seed)"

# Create the GitHub repo via gh CLI (you'll need gh auth login first)
gh repo create PilotSHC/luvian-investor-data-room \
  --public \
  --description "Luvian Labs LLC — investor data room (NDA-gated)" \
  --source=. \
  --remote=origin \
  --push
```

> **Public repo with confidential content?** Yes — by design. The repo holds
> draft templates, sanitized financials, and the password-gate code. The
> password itself is **only** in environment variables (Vercel secrets), never
> in git. The `_private/` folder in the main repo (executed contracts, bank
> statements, named investor pipeline) is gitignored everywhere and never
> reaches this repo.
>
> If you'd rather host the content privately, use:
>
> ```bash
> gh repo create PilotSHC/luvian-investor-data-room --private ...
> ```

## Deploy to Vercel

```bash
# 1. Install Vercel CLI if you don't have it
npm i -g vercel@latest

# 2. From the project directory:
cd /Users/annalieseparker/luvian-investor-data-room
vercel login
vercel link              # create new project: name = luvian-investor-data-room

# 3. Set production env vars (this is where the password lives)
vercel env add INVESTOR_ROOM_PASSWORD production
# (paste your investor password when prompted)

vercel env add INVESTOR_ROOM_COOKIE_SECRET production
# (paste the output of:  openssl rand -hex 32 )

vercel env add INVESTOR_ROOM_COOKIE_TTL production
# (paste:  604800   for 7 days)

# Optionally add the same vars for preview + development:
vercel env add INVESTOR_ROOM_PASSWORD preview
vercel env add INVESTOR_ROOM_COOKIE_SECRET preview

# 4. Deploy
vercel --prod
```

The first deploy typically takes ~60 seconds. Vercel will print a production
URL like `https://luvian-investor-data-room-xyz.vercel.app`.

## Wire up `data-room.luvian.info`

In the Vercel dashboard for this project:

1. **Settings → Domains → Add** → enter `data-room.luvian.info`.
2. Vercel will show a CNAME target (typically `cname.vercel-dns.com`).
3. In your DNS provider for `luvian.info`:
   ```
   Type:  CNAME
   Name:  data-room
   Value: cname.vercel-dns.com
   TTL:   3600
   ```
4. Wait 1–10 minutes for propagation; Vercel auto-issues a Let's Encrypt
   certificate the moment DNS resolves.
5. Confirm: `https://data-room.luvian.info/login` should serve the login page.

## Sharing With Investors

You have one shared password. Per-investor audit trail is intentionally _not_
implemented at this stage to keep things simple — if a password leaks, change
the env var in Vercel and redeploy.

**Investor onboarding flow (recommended):**

1. Send the investor the standard mutual NDA — `Mutual_NDA_TEMPLATE.md` from
   the main repo. (Or use HelloSign / DocuSign with a watermark.)
2. Once signed, send a one-line email:
   ```
   Data room: https://data-room.luvian.info
   Access code: <password>
   Expires in 7 days; reply to extend.
   ```
3. Track in `_private/Investor_Pipeline_2026_05.md` (in the main repo, gitignored).

**Rotating the password:**

```bash
vercel env rm INVESTOR_ROOM_PASSWORD production
vercel env add INVESTOR_ROOM_PASSWORD production
vercel --prod
```

Existing investor cookies remain valid for the cookie TTL (default 7 days)
unless you also rotate `INVESTOR_ROOM_COOKIE_SECRET`, which invalidates every
cookie immediately.

## Updating Content

The markdown lives in **two places**:

1. **Source of truth** — `~/my-modding-app-2/investor-data-room/`
2. **Rendered copy** — `~/luvian-investor-data-room/src/content/dataroom/`

To pull the latest content into the rendered copy:

```bash
cd ~/luvian-investor-data-room
node scripts/sync-content.mjs
git add -A && git commit -m "content: sync from monorepo $(date +%F)"
git push
```

Vercel auto-deploys every push to `main`. New content is live within ~60 s.

## Security Notes

- Password is stored only as a Vercel project env var. Never in code, never
  in git, never in logs.
- Auth cookie is HMAC-signed (HS256-equivalent) with a 32-byte secret;
  forging requires the secret. Rotate the secret to invalidate every cookie.
- HSTS, X-Frame-Options DENY, Referrer-Policy no-referrer, X-Robots-Tag
  noindex are all set in `vercel.json`.
- `robots.txt` disallows all crawlers (search engines and AI crawlers).
- Astro auto-escapes any user-rendered content; the only user input here is
  the password form which is read into a constant-time comparison.
- Static asset URLs (`/pdf/*.pdf`, `/csv/*.csv`) are also gated by the
  middleware — no document is reachable without an auth cookie.

## Limitations / Known Trade-offs

- **No per-investor audit trail.** A single shared password means you can't
  tell which investor accessed which doc. Acceptable for pre-seed; revisit at
  Series A or if a leak occurs.
- **Markdown rendering is read-only.** Investors can't comment, can't
  upload, can't mark items "received." If they want a checklist, they go to
  the section landing page.
- **Content sync is manual.** `node scripts/sync-content.mjs` must be run
  before each commit. Easy to script as a pre-commit hook later.
- **No analytics.** Add `@vercel/analytics` later if you want page-view counts.

## License & Confidentiality

This repository contains **draft legal templates and confidential business
information** of Luvian Labs LLC. Distribution is restricted to recipients
under NDA. No public license is granted.

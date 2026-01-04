# Production setup checklist — Supabase Keeper

This document summarizes the repository's current environment state, the secrets you must add to GitHub Actions, and the environment variables to set in Vercel (or your chosen host) to deploy the app to production.

---

## 1) Current local `.env` check

- Detected keys in local `.env` (DO NOT commit `.env` to source control):
  - `DATABASE_URL` — present
  - `JWT_SECRET` — present

Notes: keep secrets out of the repo. Move them to your host or GitHub Secrets and remove `.env` from the repository. If you keep `.env` locally, ensure `.gitignore` contains `.env`.

---

## 2) GitHub Actions secrets (add these to the repo Settings → Secrets)

Minimum required for the existing workflows and safe deploys:

- `DATABASE_URL` (required) — production Postgres connection string. Example value: `postgresql://...`
- `APP_URL` (required) — the public URL of the deployed app (used by the cron workflow to call `/api/cron/ping`). Example: `https://app.example.com`
- `JWT_SECRET` (required) — secret used to sign JWTs. Keep this long and random.
- `COOKIE_SECRET` (recommended) — secret for cookie signing or encryption if used separately from JWT.

Optional but recommended:

- `VERCEL_TOKEN` — required if you plan on deploying with the Vercel CLI from Actions.
- `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` — used with `VERCEL_TOKEN` for deployments.
- `SENTRY_DSN` — if using Sentry for error tracking.
- `SUPABASE_SERVICE_ROLE` — only if your server needs the Supabase service role (avoid storing service role keys unless necessary).

Security notes:

- Do not store user-supplied Supabase anon keys in GitHub Secrets — those belong to the database as records per-user (encrypted at rest is recommended).
- Rotate `JWT_SECRET` if compromised and implement a token invalidation strategy.

---

## 3) Vercel environment variables (add to Project Settings → Environment Variables)

Add these keys for the Production environment (and Preview/Development as appropriate):

- `DATABASE_URL` — production Postgres connection string. Value from your Neon/Postgres provider.
- `JWT_SECRET` — same secret used by your server to sign/verify JWTs.
- `COOKIE_SECRET` — if your app signs/encrypts cookies separately.
- `APP_URL` or `NEXT_PUBLIC_APP_URL` — public app URL (optional; useful for absolute links and client usage).
- `NODE_ENV` — `production` (not secret but recommended to set in production).
- `SENTRY_DSN` — optional for error tracking.

Which variables are public vs private:

- Any `NEXT_PUBLIC_...` variables are exposed to the browser — avoid placing secrets there.
- `DATABASE_URL`, `JWT_SECRET`, `COOKIE_SECRET`, and service role keys must be kept private (do not prefix with `NEXT_PUBLIC_`).

---

## 4) Quick deployment & migration steps

Before deploying to production:

1. Ensure `DATABASE_URL` points to your production DB and you have backups/snapshots.
2. In CI or on the host, run:

```bash
npm ci
npx prisma generate
npx prisma migrate deploy
npm run build
```

3. Start the app using your host/deployment platform. For Vercel, push to the production branch or use the Vercel UI/CLI to deploy.

4. Do not run `prisma migrate reset` in production — it wipes data.

---

## 5) Cron job / scheduler notes

- The repository includes `.github/workflows/cron-ping.yml` which seeds the DB (via `scripts/seed.js`) and calls `APP_URL/api/cron/ping?force=true` daily at 00:00 UTC. Ensure `APP_URL` and `DATABASE_URL` secrets are present in GitHub Secrets.
- For production, protect the cron endpoint. Recommended options:
  - Guard with a secret token header (set a GitHub secret and Vercel env), or
  - Use IP allowlist from your scheduler, or
  - Use signed webhooks from your scheduler provider.

---

## 6) Recommended next security steps (short list)

- Ensure cookies are set with `httpOnly`, `Secure`, and `SameSite=Lax` or `Strict` as appropriate.
- Add rate limiting to API routes to prevent abuse.
- Configure Prisma connection pooling (Neon pooling/Prisma Data Proxy) if using serverless deployments.
- Add monitoring (Sentry/Prometheus), and uptime checks for the cron endpoint.

---

## 7) How to add GitHub secrets via `gh` CLI (example)

```bash
gh secret set DATABASE_URL --body "$(cat /path/to/secret/db_url)"
gh secret set APP_URL --body "https://app.example.com"
gh secret set JWT_SECRET --body "$(openssl rand -hex 32)"
gh secret set COOKIE_SECRET --body "$(openssl rand -hex 32)"
```

For Vercel, use the Vercel dashboard (Project → Settings → Environment Variables) or `vercel env add`.

---

If you'd like, I can:

- Update `.github/workflows/cron-ping.yml` to include a header-secret for the cron call and show how to add that secret in GitHub and Vercel.
- Add a small middleware check in the cron route to require a secret header for forced runs.

Pick a follow-up and I will implement it.

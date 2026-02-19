# TechPail Postgres Demo Fork-to-Render Playbook

This repo is already owned by `jakeroth0`, so GitHub cannot fork it into the same account.
Use this equivalent flow:

1. Keep this repo as `upstream` (already done locally).
2. Create a new demo repo (example: `theTechPail-postgres-demo`).
3. Push a migration branch to the new repo as `origin`.

## Current Local State

- Local path: `/Users/jakeroth/Documents/New project/theTechPail`
- Branch: `codex/postgres-render-demo`
- Remote: `upstream -> https://github.com/jakeroth0/theTechPail`
- Remote: `origin -> https://github.com/jakeroth0/theTechPail-postgres-demo`

## Step 1: Wire Local Remotes

```bash
cd "/Users/jakeroth/Documents/New project/theTechPail"
git remote add origin https://github.com/jakeroth0/theTechPail-postgres-demo.git
git remote -v
git push -u origin codex/postgres-render-demo
```

Optional (keep `main` in sync too):

```bash
git push -u origin main
```

## Step 2: Minimal Postgres Migration Changes

Applied app edits (no architecture changes):

1. Add Postgres driver deps (`pg`, `pg-hstore`).
2. Update `config/connection.js` to use `DATABASE_URL` first.
3. Keep existing fallback behavior for local development if desired.
4. Update README/env docs for Postgres + Render.
5. Add `SESSION_SECRET` support for production sessions.

No route/model/view rewrites are expected.

## Step 3: Render Deployment

Create these services:

1. Render Postgres database
2. Render Web Service from `origin` repo

Web service settings:

- Build command: `npm ci && npm run build:css`
- Start command: `npm start`
- Environment variables:
  - `DATABASE_URL` (from Render Postgres)
  - `SESSION_SECRET` (new strong random string)
  - `NODE_ENV=production`

`PORT` is provided by Render automatically.

## Step 4: Seed Data Once (Optional)

After first deploy, run one-time seed command in Render shell:

```bash
npm run seed
```

Then test:

1. Signup
2. Login
3. Create post
4. Comment
5. Logout/login again (session persistence)

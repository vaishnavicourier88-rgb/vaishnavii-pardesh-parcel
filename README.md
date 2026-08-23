# Vaishnavii International Courier — Website

A React + Vite + Tailwind website for an international courier & cargo business:
live consignment tracking, rate calculator, doorstep pickup booking, customs guide,
destinations directory, and an internal Admin/Staff portal (login-protected).

## Run locally

```
npm install
npm run dev
```
Open http://localhost:3000

## Build for production

```
npm install
npm run build
```
This creates a static `dist/` folder — this is what gets deployed.

## Deploy — Vercel (recommended)

1. Push this folder to a new GitHub repository.
2. Go to vercel.com → sign in with GitHub → "Add New Project" → select the repo.
3. Vercel auto-detects Vite (settings already provided via `vercel.json`). Click **Deploy**.
4. You'll get a live URL like `your-project.vercel.app` in ~1-2 minutes.
5. Optional: add your own domain under Project → Settings → Domains.

## Deploy — Netlify

**Option A (GitHub):**
1. Push this folder to GitHub.
2. netlify.com → "Add new site" → "Import an existing project" → pick the repo.
3. Build settings are already set via `netlify.toml` (`npm run build`, publish `dist`). Click **Deploy**.

**Option B (no GitHub, drag & drop):**
1. Run `npm install && npm run build` on your own computer (needs Node.js installed).
2. Go to netlify.com → "Deploys" → drag the generated `dist` folder onto the page.

## Admin / Staff portal login (demo credentials)

| Role | Username | Password |
|---|---|---|
| Admin | `admin` | `admin@123` |
| Sub-Admin | `subadmin` | `subadmin@123` |
| Agent (Mumbai) | `agent_mumbai` | `agent@123` |

Change these in `src/data/mockData.ts` before going live — passwords are stored
as plain text in the frontend code, which is fine for a demo but not for real
production credentials.

## Notes

- No API keys or backend are required — this is a fully static site.
- All booking/tracking data is mock/demo data in `src/data/mockData.ts`. Wire it
  up to a real backend/database before taking real customer bookings.

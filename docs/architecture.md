# Architecture

Confirmed decisions for the private reader platform. Anything not listed here
is undecided; anything marked **FUTURE** is planned but does not exist yet.

## Product Surfaces

- Reader mobile app (invite-only readers)
- Admin web app (author/admin dashboard)
- Worker API (shared backend)

## Runtime

- Expo native mobile application (React Native, TypeScript, native builds via
  dev clients / EAS — no reliance on Expo Go)
- React + Vite admin SPA (TypeScript)
- Cloudflare Worker API (Hono)

## Persistence

- D1 (`packages/api/migrations/0001_init.sql`): users, sessions, books,
  chapters (text content + audio_key), grants, reading_progress,
  audio_progress — applied locally; remote apply happens after real
  resources are provisioned
- R2: audio only (**FUTURE** — no upload/streaming endpoints yet)
  - Chapter text/content lives in D1, never in R2
  - R2 bucket is private; no public URLs, ever

## Security Model

- invite-only access (**FUTURE** — grant enforcement not implemented yet)
- passwordless email OTP authentication (**FUTURE** — no reader auth yet;
  admin routes are interim-guarded by an `ADMIN_TOKEN` bearer secret that
  gets removed when OTP sessions land)
- book/chapter admin CRUD is live behind the `ADMIN_TOKEN` guard
- private R2 with authenticated audio streaming through the Worker
  (**FUTURE** — streaming endpoints not implemented yet)
- access checked server-side on every request (**FUTURE**)
- Android FLAG_SECURE screenshot/screen-record protection (**FUTURE**)
- reader-visible watermark while reading (**FUTURE**)
- no downloadable manuscript endpoint — text is delivered only as in-app
  chapter content (**FUTURE**)

## Repository

npm-workspaces monorepo, Node 22, TypeScript. No orchestration layer
(no Turborepo/Nx/Lerna/pnpm/Yarn/Docker).

```
packages/
├── shared/   @reader/shared — Zod schemas + inferred types (API contract),
│             consumed directly as TS source by api/admin/mobile
├── api/      @reader/api   — Hono on Cloudflare Workers; D1 binding `DB`,
│             R2 binding `AUDIO_BUCKET` (local placeholders in wrangler.jsonc)
├── admin/    @reader/admin — Vite SPA; dev proxy sends /api/* to the local
│             Worker on :8787; will be served via Workers Static Assets (FUTURE)
└── mobile/   @reader/mobile — Expo Router app; reader/audio/security features
              all FUTURE
```

Root scripts fan out to workspaces:

- `npm run dev:api` / `dev:admin` / `dev:mobile`
- `npm run typecheck` (all workspaces)
- `npm run build` (workspaces where a build exists — admin only today)

## Deployment

- Cloudflare wherever practical (**FUTURE**: nothing deployed yet; wrangler.jsonc
  contains local-development placeholder resource IDs that must be replaced)
- Mobile distributed as native builds (**FUTURE**: EAS setup not done)

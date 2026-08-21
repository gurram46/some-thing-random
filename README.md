# reading-app

Private, invite-only book reader for unreleased manuscripts.

- `packages/shared` — shared Zod schemas/types (`@reader/shared`)
- `packages/api` — Cloudflare Worker API (Hono + D1 + R2) (`@reader/api`)
- `packages/admin` — admin dashboard SPA (React + Vite) (`@reader/admin`)
- `packages/mobile` — reader app (Expo React Native) (`@reader/mobile`)

## Scripts (from repo root)

| Command | Purpose |
| --- | --- |
| `npm run dev:api` | Worker dev server on `:8787` (local D1/R2 simulation) |
| `npm run dev:admin` | Vite dev server; proxies `/api/*` to the Worker |
| `npm run dev:mobile` | Expo dev server |
| `npm run typecheck` | TypeScript check across all workspaces |
| `npm run build` | Build workspaces with a build step (admin today) |

## Cloudflare resources

`packages/api/wrangler.jsonc` contains **local development placeholders** for
the D1 database and R2 bucket. Before deploying, replace them per the comments
in that file. See `docs/architecture.md`.

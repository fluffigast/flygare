## Stack

Vite + React 19 + Tailwind 4 + pnpm. Node 22.

## Architecture

- Frontend: Azure Static Web Apps (free tier). Repo: `fluffigast/flygare`.
- CMS: Payload CMS on Azure Container App (`flygare-cms`, resource group `rg-joltjoker`).
- CMS DB: Postgres via `postgresAdapter` (`cms/src/payload.config.ts`), connection from `DATABASE_URL`. Persistent — survives container restarts and redeploys.
- SWA managed functions in `api/`:
  - `/api/smhi` — SMHI forecast proxy (CORS workaround), used by `src/utils/smhi-api.ts`.
  - `/api/wind` — wind aggregator (MEAC Hummeln live sensor, Skistar Åre scrape, SMHI forecast; per-source timeout + retry, cached 120s), used by `src/blocks/wind-widget/wind-widget.tsx`.
- CI: GitHub Actions (`.github/workflows/ci.yml`) → SWA deploy (frontend + API) + Docker build → Payload migrations → ACR push → Container App update (CMS).

## Layout

- `MainLayout` wraps all routes except the start page: `Header` + `@container items-center` wrapper + `Footer`.
- Known deviation: `HomeView` is routed outside `MainLayout` (`src/main.tsx`) and renders its own `Header`/`Footer`. Leave as is unless explicitly asked.
- `--max-width-2xl: 80rem` override in `index.css` — `max-w-2xl` is intentionally wide.
- Views use `max-w-2xl` without `mx-auto` — centering comes from the layout wrapper.
- Gap on parent containers, not margins on children.
- Radix UI primitives for interactive elements.

## Components

- Single-purpose. One component, one job.
- Arrow functions. No class components.
- Images: `getPlaceholderImage(id)` for stable hash-mapped unsplash images. `getRandomPlaceholderImage()` for hero fallback.

## Styling

- Tailwind utilities. Inline `style` only for computed values.
- Responsive: mobile-first with md/lg breakpoints.
- Container queries: `@container` on layout wrapper, `@md` breakpoints in nav.

## CMS

- Frontend fetches from CMS at runtime. The code reads `VITE_PAYLOAD_URL` (`src/lib/cms.ts`); CI sets it from the GitHub var `VITE_CMS_URL`.
- Fallback to local data in `src/data/` only happens when the fetch throws (CMS unreachable / non-2xx). After the first failure the CMS is marked offline for the session. An empty collection from a reachable CMS is rendered as empty, not replaced by fallback.
- Hooks in `src/hooks/useCMS.ts`: `useCMSData` (generic, internal), one hook per collection/global, `useGlobalLivePreview` (live editing).
- Live Preview configured in `payload.config.ts` — CMS embeds frontend in iframe via `FRONTEND_URL`.
- `public/staticwebapp.config.json` allows the CMS domain in `frame-ancestors` (live preview) and `connect-src`. The CMS host is hardcoded there.
- Admin: `admin@flygare.nu`, created by the seed. Password set via `PAYLOAD_ADMIN_PASSWORD` env from CI.

### Seed and migrations

- Seed runs at container start, not at Docker build: `cms/start.sh` runs `src/seed/index.ts` (with `NODE_ENV=development`, so schema push is on), then starts the server. Set `SKIP_SEED=true` to skip.
- The seed exits immediately if `news` has any document. Editing `src/data/` or the seed file does not change an already seeded prod DB — edit in Payload admin instead.
- Migrations: CI runs `npm run migrate` against the prod DB inside the freshly built image, before pushing to ACR. A failing migration aborts the deploy.
- Manual seed scripts (run from `cms/` with `DATABASE_URL` set; idempotent, skip existing entries, never update):
  - `npm run seed:pptx-pages` (`src/scripts/seed-pptx-pages.ts`) — Pages subpages, Activities per type (Kalender/Klubbresor/Årsmöten) and Competitions with `slug`.
  - `npm run seed:photos-documents` (`src/scripts/seed-photos-documents.ts`) — empty Photos slots per year (2020–current) and Årsmöte document slots in Documents.

### Media

- `media` collection (`cms/src/collections/Media.ts`) stores files on local disk: `/app/media`, or `MEDIA_DIR` if set. No cloud storage adapter.
- Only images are accepted (`mimeTypes: ['image/*']`), with sharp sizes `thumbnail` (400×300) and `hero` (1600×900). PDFs are rejected, so `documents.file` cannot hold PDFs today.
- Persistence in prod requires an Azure File mount on `/app/media`. No such mount is defined in this repo or CI — verify on the Container App.
- `serverURL` is not set, so media URLs are relative (`/api/media/file/<name>`). The frontend uses `image.url` as is, which resolves against the SWA domain, and CSP `img-src` does not allow the CMS host.

### Launch sites

- Startplatser = CMS collection `launches` + `src/data/sites.ts`, merged by slug in `sites-view.tsx` and `sites-single-view.tsx`. CMS wins on slug collision; local-only slugs still render. Mapping in `src/lib/map-launch.ts`.
- Neither `launches` nor `other-sites` has an image field. Site images come from `getPlaceholderImage()`.

## Deploy

- Frontend: `pnpm run build` → `swa deploy ./dist --api-location ./api`
- CMS: Docker build → migrations → push to ACR → `az containerapp update` (image + env vars). Seed runs on container start.
- Secrets in GitHub: `SWA_DEPLOYMENT_TOKEN`, `DATABASE_URL`, `PAYLOAD_SECRET`, `PAYLOAD_ADMIN_PASSWORD`, `ACR_USERNAME`, `ACR_PASSWORD`, `AZURE_CREDENTIALS`.
- Vars in GitHub: `VITE_CMS_URL`, `ACR_LOGIN_SERVER`, `CONTAINER_APP_NAME`, `RESOURCE_GROUP`.

## Stable version

- Tag `stable-demo-2026-05-11` — post-CMS design with live preview, SMHI proxy, compressed images.
- Tag `stable-nav-cms-2026-05-31` — PPTX-aligned nav, CMS collections, CMS-driven home page.

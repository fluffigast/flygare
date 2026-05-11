## Stack

Vite + React 19 + Tailwind 4 + pnpm. Node 22.

## Architecture

- Frontend: Azure Static Web Apps (free tier). Repo: `fluffigast/flygare`.
- CMS: Payload CMS on Azure Container App (`flygare-cms`, resource group `rg-joltjoker`).
- CMS DB: SQLite, ephemeral — resets on container restart. Seed script runs at Docker build time.
- SMHI proxy: Azure SWA managed function at `/api/smhi` (CORS workaround).
- CI: GitHub Actions → SWA deploy (frontend + API) + ACR push + Container App update (CMS).

## Layout

- `MainLayout` wraps all routes: `Header` + `@container items-center` wrapper + `Footer`.
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

- Frontend fetches from CMS at runtime via `VITE_CMS_URL`, falls back to local data in `src/data/`.
- Hooks in `src/hooks/useCMS.ts`: `useCMSData` (generic), `useGlobalLivePreview` (live editing).
- Live Preview configured in `payload.config.ts` — CMS embeds frontend in iframe via `FRONTEND_URL`.
- `staticwebapp.config.json` allows CMS domain in `frame-ancestors` for live preview.
- Admin: `admin@flygare.nu`. Password set via `PAYLOAD_ADMIN_PASSWORD` build arg in CI.

## Deploy

- Frontend: `pnpm run build` → `swa deploy ./dist --api-location ./api`
- CMS: Docker build with seed → push to ACR → update Container App.
- Secrets in GitHub: `SWA_DEPLOYMENT_TOKEN`, `PAYLOAD_ADMIN_PASSWORD`, `ACR_USERNAME`, `ACR_PASSWORD`, `AZURE_CREDENTIALS`.
- Vars in GitHub: `VITE_CMS_URL`, `ACR_LOGIN_SERVER`, `CONTAINER_APP_NAME`, `RESOURCE_GROUP`.

## Stable version

Tag `stable-demo-2026-05-11` — post-CMS design with live preview, SMHI proxy, compressed images.

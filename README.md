# flygare.nu

Webbplats för Åre Skärmflygklubb. Vite + React 19 + Tailwind 4 på Azure Static Web Apps, med Payload CMS (Postgres) på Azure Container Apps.

- **Styr-filer**: [`AGENTS.md`](./AGENTS.md) (stack, arkitektur, workflow), [`CLAUDE.md`](./CLAUDE.md) (regler för AI-sessioner).
- **Driftsplan**: [`docs/cutover-runbook.md`](./docs/cutover-runbook.md).
- **Alla uppgifter**: Utvecklingslista (se go-live-PDF — en branch, en PR per steg).

## Kom igång

Krav: Node 22, pnpm 9, Docker (för Postgres lokalt).

```bash
# 1. Klona och installera
git clone https://github.com/fluffigast/flygare.git
cd flygare
pnpm install
cd cms && npm install && cd ..

# 2. Starta Postgres lokalt
docker run -d --name flygare-pg -p 5432:5432 \
  -e POSTGRES_PASSWORD=flygare -e POSTGRES_DB=flygare \
  postgres:16

# 3. Kopiera env-filer
cp .env.example .env.local
cp cms/.env.example cms/.env

# 4. Kör CMS (port 3001) — seeden skapar admin@flygare.nu / change-me
cd cms && npm run dev

# 5. I ett nytt fönster: kör frontend (port 5173)
pnpm dev
```

Admin: http://localhost:3001/admin · frontend: http://localhost:5173

## Verifiera innan PR

```bash
pnpm exec tsc --noEmit   # tyst
pnpm build               # grön
pnpm test --run          # unit tests gröna (e2e kräver puppeteer — känd skuld, strunta i)
```

## Branch- och PR-flöde

- En branch per steg i Utvecklingslistan. Branch-namn från listan (`feat/safety-banner`, `fix/desktop-navigation`, …).
- PR mot `main`. Pusha aldrig direkt till `main` — det deployar.
- Svenska i commit-meddelande, PR-titel och PR-beskrivning. Ingen AI-attribution.
- Ändringar i `cms/` (schema, collections, globals) kräver migration — stäm av med Alexander före merge.

## Vanliga script

| | |
|---|---|
| `pnpm dev` | frontend på 5173 |
| `pnpm build` | prod-bygge |
| `pnpm test --run` | unit tests |
| `cd cms && npm run dev` | CMS på 3001 |
| `cd cms && npm run generate:types` | regenerera `payload-types.ts` efter schemaändring |
| `cd cms && npm run migrate:create` | ny migration |

## Arkitektur i korthet

- **Frontend**: Vite + React 19 + Tailwind 4, deploy till SWA via GitHub Actions.
- **CMS**: Payload 3 (Next.js app) på Container Apps, Postgres som DB. Seed körs vid containerstart.
- **SWA Functions**: `api/wind` (MEAC + SMHI + Skistar, cached), `api/smhi` (forecast-proxy).
- **Media**: lokal disk `/app/media` på Container App — Azure File-mount krävs i prod.

Mer: `AGENTS.md`.

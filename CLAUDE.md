# Claude Code – projektregler för flygare.nu

Dessa regler gäller alla AI-sessioner i detta repo. Vid konflikt med defaultbeteende: dessa vinner. Läs även `AGENTS.md` (stack, arkitektur, workflow).

## Språk

- Svara på svenska. Commit-meddelanden, PR-titlar och PR-beskrivningar: svenska.
- Teknisk engelska är ok inuti kodidentifierare och existerande kommentarer – följ det som redan finns i filen.

## Scope och disciplin

- Jobba på en uppgift i taget enligt `Utvecklingslista` (go-live-PDF). En branch, en PR, ett steg.
- Branch-namn ska matcha listan: `docs/agents-md`, `fix/cms-media`, `feat/safety-banner`, `fix/desktop-navigation`, `feat/contact-details`, `fix/hide-placeholders`, `feat/legacy-redirects`, `fix/cms-schema`, `chore/cutover-config`.
- Surgical edits. Ändra bara det som uppgiften kräver. Inga drive-by-refactors, inga formatering-sveps, inga städningar som inte efterfrågats.
- Inga nya abstraktioner "för framtiden". Tre liknande rader > en för tidig abstraktion.
- Inga nya filer om en befintlig kan utökas. Ingen ny dokumentation om inte uttryckligen efterfrågat.

## Git och PR

- Pusha aldrig direkt till `main`. `main` triggar både SWA- och Container App-deploy.
- En PR per branch. PR-mallen:
  - Titel: kort imperativ på svenska (`feat: flygregelbanner under hero`).
  - Beskrivning: vad som ändras, varför, hur det är testat, vilken rad i Utvecklingslistan det stänger.
- Inga AI-attribution i commits (`Co-Authored-By: Claude …` ska bort). Inga `🤖 Generated with …`-footers.
- Rebase/merge: skapa alltid nya commits. Inga `--amend` på pushade commits. Inga `--force-push`.
- Rör inte andra branches än den egna.

## Verifiering innan "klart"

Innan du säger att en uppgift är klar eller öppnar PR:

1. `pnpm exec tsc --noEmit` – ska vara tyst.
2. `pnpm build` – ska gå igenom.
3. `pnpm test --run` – unit tests ska vara gröna. E2e-testet (`test/e2e.test.ts`) saknar puppeteer och är känd skuld; strunta i det tills det fixas eller tas bort.
4. För frontend-ändringar: starta `pnpm dev` och testa i webbläsare. Skärmdumpar till PR om det är visuellt.
5. Om du inte kan verifiera något – skriv det explicit i PR, hitta inte på en pass.

Inga `console.log`, inga `TODO`-kommentarer, inga utkommenterade kodblock i PR.

## Scope-gränser (prata med Alexander innan)

Ändra inte dessa utan avstämning:

- `cms/` schema, collections, globals – kräver migration och deploy.
- `cms/start.sh`, `cms/Dockerfile`, `cms/payload.config.ts` i delar som rör DB/seed/storage.
- `.github/workflows/*` – CI-pipelines.
- `api/wind/`, `api/smhi/` – SWA-functions med retry/cache som styrelsen använder live.
- `public/staticwebapp.config.json` CSP – samordna med env-värden i Azure.
- Miljövariabler, secrets, Azure-resurser.

Om uppgiften kräver detta: skriv förslag i PR-beskrivningen, markera "kräver Alexander", merga inte.

## Secrets och env

- Inga riktiga API-nycklar, lösenord eller connection strings i källkoden eller i `.env`-filer som checkas in.
- `VITE_PAYLOAD_URL`, `FRONTEND_URL`, `DATABASE_URL`, `PAYLOAD_*` sätts i GitHub Actions / Azure. Lokalt: `.env.local` (gitignored).
- Hårdkoda inte `cms.flygare.nu` eller `flygare-cms.greensea-...northeurope.azurecontainerapps.io` i källkoden utan att det går via env.

## CMS-data och fallback

- Frontend hämtar från CMS i runtime. Fallback i `src/data/` triggas bara när fetch kastar.
- Tom collection från ett nåbart CMS = tom vy. Fyll inte med placeholder-data i hooken.
- `payload-types.ts` är genererad – kör `npm run generate:types` i `cms/` efter schemaändring, redigera inte för hand.
- `src/data/sites.ts` och CMS `launches` slås ihop på slug. CMS vinner vid krock.

## Stil

- TypeScript strict. Inga `any` om du kan undvika.
- Arrow functions. Inga klasser.
- Tailwind-utilities. `style`-prop bara för beräknade värden.
- En komponent = ett ansvar. Dela upp om det växer.
- Inga kommentarer som förklarar _vad_ koden gör – namn ska räcka. Bara _varför_ när det är icke-uppenbart.

## Testning

- Vitest för unit. Testa riktig data-flöde från CMS mock → view, inte isolerad logik utan kontext.
- Mocka inte system under test. Mocka I/O-gränser (fetch), inte komponenterna själva.
- Hårdkoda inte CMS-innehåll i tester som kan ändras. Assert på struktur.

## Vid tveksamhet

Hellre fråga än gissa. Skriv frågan i PR-beskrivningen och markera "blockad på beslut" i stället för att välja åt styrelsen.

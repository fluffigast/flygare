# Payload migrations

Denna katalog innehåller Payload-migrations som körs mot prod-DB:n **före**
varje CMS-deploy (se `.github/workflows/ci.yml` → "Run Payload migrations").

## Bakgrund

Payload's postgres-adapter har `push: true` som synkar schema automatiskt i
dev-läge, men **hoppas över i production** (`NODE_ENV=production`). Det
betyder att schema-ändringar (nya fält, ändrade enums, borttagna fält)
**kräver en migration** för att nå prod-DB:n.

Utan migration: runtime-queries försöker SELECT/INSERT på kolumner som
saknas i DB → alla `/api/*` returnerar 500 (upplevd som "CMS nere").

## Workflow: lägga till/ändra fält

1. Ändra collection eller global (t.ex. `src/collections/Pages.ts`).
2. Kör mot din **lokala** DB (som fortfarande har `push: true`):

   ```bash
   cd cms
   npm run migrate:create -- --name add_pages_section
   ```

   Payload jämför din nya schema mot lokal DB och genererar
   `YYYYMMDD_HHMMSS_add_pages_section.ts` här.

3. Läs igenom migrationen — kontrollera att den är säker för prod
   (särskilt: DROP-operationer, unique constraints på befintlig data,
   NOT NULL utan default på befintliga rader).

4. Committa migrationen tillsammans med collection-ändringen.

5. Push → CI kör `npm run migrate` mot prod-DB innan nya container-imagen
   deployas. Om migrationen misslyckas → deploy avbryts, prod är säker.

## Vanliga fallgropar

- **Enum-utökning på `select`-fält**: Payload lagrar `select` som varchar
  med app-level validering, inte native PG enum. Nya options kräver ingen
  DB-migration — men den kommer ändå att genereras av `migrate:create`
  som en `no-op`. Kör den ändå.

- **Nytt required-fält utan default**: befintliga rader har NULL där →
  Postgres kastar constraint-fel. Lös antingen med `defaultValue` i
  fältet, eller med en `UPDATE`-statement i migrationens `up()`.

- **Unique constraint på befintligt fält**: kolumnen måste redan ha
  unika värden (eller vara nullable + tomma). Rensa dupes först.

## Ad-hoc script-migrations

Engångs-skript för data (inte schema) ligger under `cms/src/scripts/`,
inte här. Exempel: `migrate-news-categories.ts` som mappar gamla
kategori-värden till nya. Dessa körs manuellt med `npm run script:*`.

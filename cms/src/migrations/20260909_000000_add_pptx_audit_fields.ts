import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Återinför fälten som var med i 4cb7be3 men reverterades i 07d947d p.g.a.
 * att push=true inte körs i prod → collection-schema hade fält som DB
 * saknade → 500 på /api/pages, /api/activities, /api/competitions.
 *
 * Alla fält är nullable/optional så de kan läggas till mot befintlig data
 * utan att bryta rader eller kräva backfill:
 * - pages.section    (URL-section: flyga-i-are / aktiviteter / tavlingar / om)
 * - pages.lede       (ingress-rad ovanför brödtext)
 * - activities.location (plats/mötesplats)
 * - competitions.slug (för URL-routing /tavlingar/{slug}, unique nullable)
 * - competitions.signup_url (anmälan-länk)
 *
 * OBS: Kör INTE i collection-schema ännu — den PR:en behöver följa efter
 * denna migration + verifiering. Denna migration är säker att köra ensam
 * (extra kolumner utan schema-fält skadar inget).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE pages
      ADD COLUMN IF NOT EXISTS section varchar,
      ADD COLUMN IF NOT EXISTS lede varchar;

    ALTER TABLE activities
      ADD COLUMN IF NOT EXISTS location varchar;

    ALTER TABLE competitions
      ADD COLUMN IF NOT EXISTS slug varchar,
      ADD COLUMN IF NOT EXISTS signup_url varchar;

    -- Unique-index på nullable kolumn: Postgres tillåter multipla NULL,
    -- så detta bryter inte mot rader som ännu saknar slug.
    CREATE UNIQUE INDEX IF NOT EXISTS competitions_slug_idx
      ON competitions (slug)
      WHERE slug IS NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS competitions_slug_idx;

    ALTER TABLE competitions
      DROP COLUMN IF EXISTS signup_url,
      DROP COLUMN IF EXISTS slug;

    ALTER TABLE activities
      DROP COLUMN IF EXISTS location;

    ALTER TABLE pages
      DROP COLUMN IF EXISTS lede,
      DROP COLUMN IF EXISTS section;
  `)
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Migrerar nyhetskategorier till pptx-set: Aktiviteter / Information /
 * Tävlingar / Övrigt. Mappar bort de tre gamla värden (Aktuellt,
 * Klubben, Säkerhet) till "Information" — de är inte tillgängliga i
 * CMS-dropdownen längre men befintliga rader kan fortfarande ha dem.
 *
 * Utan denna migration försvinner de raderna från frontend-filtret
 * eftersom vår hårdkodade CATEGORIES-lista i news-view bara innehåller
 * pptx-set:et.
 *
 * Idempotent: WHERE-klausulen matchar bara rader med gamla värden.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE news
    SET category = 'Information'
    WHERE category IN ('Aktuellt', 'Klubben', 'Säkerhet');
  `)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Ingen down — mapping är förlorande (vi vet inte vilken av de tre
  // originalvärdena en rad hade före).
}

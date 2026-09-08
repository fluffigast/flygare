/**
 * Migrerar nyhetskategorier till pptx-set: Aktiviteter / Information / Tävlingar / Övrigt.
 * Idempotent — kör så många gånger du vill.
 *
 * Kör: `npm run migrate:news-categories` (från cms/)
 */
import { getPayload } from 'payload'
import config from '@payload-config'

// Old → new mapping. Alla gamla värden som inte längre finns i CMS-dropdownen.
const CATEGORY_MAP: Record<string, string> = {
  Aktuellt: 'Information',
  Klubben: 'Information',
  Säkerhet: 'Information',
}

async function main() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'news',
    limit: 10000,
    where: {
      category: { in: Object.keys(CATEGORY_MAP) },
    },
    depth: 0,
  })

  if (docs.length === 0) {
    console.log('Inget att migrera — alla nyheter använder redan giltiga kategorier.')
    process.exit(0)
  }

  console.log(`Hittade ${docs.length} nyheter med gamla kategorier. Uppdaterar…`)

  let ok = 0
  let failed = 0
  for (const doc of docs) {
    const newCat = CATEGORY_MAP[doc.category as string]
    try {
      await payload.update({
        collection: 'news',
        id: doc.id,
        data: { category: newCat as any },
      })
      console.log(`  ✓ #${doc.id} "${doc.title}"  ${doc.category} → ${newCat}`)
      ok++
    } catch (err) {
      console.error(`  ✗ #${doc.id} "${doc.title}"  ${(err as Error).message}`)
      failed++
    }
  }

  console.log(`\nKlart. ${ok} uppdaterade, ${failed} misslyckades.`)
  process.exit(failed > 0 ? 1 : 0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

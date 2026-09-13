/**
 * Seedar tomma årgångs-slots i Photos + Årsmötesdokument i Documents.
 *
 * Skapar en Photos-post per år (2020-idag) med tom images-array så
 * /ovrigt/foton visar rätt struktur. Admin kan sedan ladda upp bilder
 * per år via CMS.
 *
 * Skapar också Årsmötesprotokoll-slots per år så /ovrigt/dokument
 * har rätt struktur. Filerna måste laddas upp manuellt.
 *
 * Idempotent: hoppar över befintliga.
 *
 * Kör: `npm run seed:photos-documents` (från cms/)
 */
import { getPayload } from 'payload'
import config from '@payload-config'

async function main() {
  const payload = await getPayload({ config })

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => 2020 + i)

  let created = 0
  let skipped = 0
  let failed = 0

  console.log('── Photos (tomma årgångs-slots) ────────────────────')
  for (const year of years) {
    try {
      const { docs } = await payload.find({
        collection: 'photos',
        where: { year: { equals: year } },
        limit: 1,
        depth: 0,
      })
      if (docs.length > 0) {
        console.log(`  · skip  Photos ${year}`)
        skipped++
        continue
      }
      await payload.create({
        collection: 'photos',
        data: {
          title: `Bilder ${year}`,
          year,
          images: [],
        } as any,
      })
      console.log(`  ✓ skapad Photos ${year}`)
      created++
    } catch (err) {
      console.error(`  ✗ Photos ${year}: ${(err as Error).message}`)
      failed++
    }
  }

  console.log('\n── Årsmötesprotokoll (slots, filer laddas manuellt) ')
  // Vi kan inte skapa Documents-poster utan en file-upload (required).
  // Loggar bara instruktion till admin.
  console.log('  (Documents kräver PDF-uppload — skapa manuellt i CMS-admin')
  console.log('   under Documents → New: kategori=Årsmöte, år=<år>, ladda upp PDF.)')
  for (const year of years.slice(-5)) {
    console.log(`  · slot Årsmötesprotokoll ${year}`)
  }

  console.log(`\nKlart. ${created} Photos-årgångar skapade, ${skipped} hoppade, ${failed} misslyckade.`)
  process.exit(failed > 0 ? 1 : 0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

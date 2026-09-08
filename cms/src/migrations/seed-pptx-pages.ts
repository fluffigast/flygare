/**
 * Skapar CMS-entries för alla pptx-audit-undersidor (Skistar, Acro, Speedrider,
 * Hängflyg, Paramotor, Kalender, Klubbresor, Årsmöten, Åre PPC, Topplandning,
 * Sverige Cup, Övriga tävlingar, Tävlingsstipendium) så admin kan redigera dem
 * i Payload direkt utan att först behöva skapa varje sida manuellt.
 *
 * Idempotent: hoppar över slugs som redan finns.
 *
 * Kör: `npm run seed:pptx-pages` (från cms/)
 */
import { getPayload } from 'payload'
import config from '@payload-config'

function richText(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', text, version: 1 }],
          version: 1,
        },
      ],
      direction: null,
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

type SeedEntry = {
  slug: string
  title: string
  section: 'flyga-i-are' | 'aktiviteter' | 'tavlingar' | 'om'
  category: string
  lede?: string
  body: string
  order: number
}

const ENTRIES: SeedEntry[] = [
  // ── Flyga i Åre ────────────────────────────────────────────
  {
    slug: 'skistar',
    title: 'Samarbetsavtalet Skistar',
    section: 'flyga-i-are',
    category: 'skistar',
    lede: 'Klubbens avtal med Skistar och regler för kommersiell aktör.',
    body: 'Innehåll kommer.',
    order: 40,
  },
  {
    slug: 'acro',
    title: 'Acro flygning',
    section: 'flyga-i-are',
    category: 'acro',
    lede: 'Vad du bör tänka på vid acro-flygning i Åre.',
    body: 'Acrobox och räddningsbåtsrutiner beskrivs i separata dokument.',
    order: 50,
  },
  {
    slug: 'speedrider',
    title: 'Speedrider',
    section: 'flyga-i-are',
    category: 'speedrider',
    lede: 'Speedriding i Åre — översikt och rutiner.',
    body: 'Innehåll kommer.',
    order: 70,
  },
  {
    slug: 'hangflyg',
    title: 'Hängflyg',
    section: 'flyga-i-are',
    category: 'hangflyg',
    lede: 'Hängflygning i Åre — översikt och rutiner.',
    body: 'Innehåll kommer.',
    order: 90,
  },
  {
    slug: 'paramotor',
    title: 'Paramotor',
    section: 'flyga-i-are',
    category: 'paramotor',
    lede: 'Paramotorflygning i Åre — översikt och rutiner.',
    body: 'Innehåll kommer.',
    order: 110,
  },
  // ── Aktiviteter ────────────────────────────────────────────
  {
    slug: 'kalender',
    title: 'Kalender',
    section: 'aktiviteter',
    category: 'aktivitet',
    lede: 'Översikt över klubbens aktiviteter under året.',
    body: 'Innehåll kommer.',
    order: 10,
  },
  {
    slug: 'klubbresor',
    title: 'Klubbresor',
    section: 'aktiviteter',
    category: 'aktivitet',
    lede: 'Information om klubbresor.',
    body: 'Innehåll kommer.',
    order: 20,
  },
  {
    slug: 'arsmoten',
    title: 'Årsmöten',
    section: 'aktiviteter',
    category: 'aktivitet',
    lede: 'Dokument från årsmöten sorterade på årtal.',
    body: 'Innehåll kommer. Dokument återfinns även under Dokumentarkiv i Övrigt-menyn.',
    order: 30,
  },
  {
    slug: 'ovriga-aktiviteter',
    title: 'Övriga klubbaktiviteter',
    section: 'aktiviteter',
    category: 'aktivitet',
    body: 'Information om övriga aktiviteter läggs ut när det behövs.',
    order: 40,
  },
  // ── Tävling ────────────────────────────────────────────────
  {
    slug: 'are-ppc',
    title: 'Åre PPC',
    section: 'tavlingar',
    category: 'tavling',
    lede: 'Åre Paragliding Point Competition.',
    body: 'Allmän info om tävlingen kommer.\n\nLänkar, kartor och filer.\n\nTävlingsresultat: se översikten under Tävlingar.',
    order: 10,
  },
  {
    slug: 'topplandning',
    title: 'Topplandning',
    section: 'tavlingar',
    category: 'tavling',
    body: 'Allmän info om tävlingen kommer.\n\nTävlingsresultat: se översikten under Tävlingar.',
    order: 20,
  },
  {
    slug: 'sverige-cup',
    title: 'Sverige Cup',
    section: 'tavlingar',
    category: 'tavling',
    body: 'Info och länkar till anmälan kommer.',
    order: 30,
  },
  {
    slug: 'ovriga-tavlingar',
    title: 'Övriga tävlingar',
    section: 'tavlingar',
    category: 'tavling',
    body: 'Info och länkar till anmälan kommer.',
    order: 40,
  },
  {
    slug: 'stipendium',
    title: 'Tävlingsstipendium',
    section: 'tavlingar',
    category: 'tavling',
    body: 'Info och länkar till ansökan kommer.',
    order: 50,
  },
]

async function main() {
  const payload = await getPayload({ config })

  let created = 0
  let skipped = 0
  let failed = 0

  for (const entry of ENTRIES) {
    try {
      const { docs } = await payload.find({
        collection: 'pages',
        where: { slug: { equals: entry.slug } },
        limit: 1,
        depth: 0,
      })
      if (docs.length > 0) {
        console.log(`  · skip  "${entry.slug}" (finns redan)`)
        skipped++
        continue
      }
      await payload.create({
        collection: 'pages',
        data: {
          title: entry.title,
          slug: entry.slug,
          section: entry.section as any,
          category: entry.category as any,
          lede: entry.lede,
          body: richText(entry.body),
          order: entry.order,
        } as any,
      })
      console.log(`  ✓ skapad "${entry.slug}" (${entry.section})`)
      created++
    } catch (err) {
      console.error(`  ✗ misslyckad "${entry.slug}": ${(err as Error).message}`)
      failed++
    }
  }

  console.log(`\nKlart. ${created} skapade, ${skipped} hoppade, ${failed} misslyckade.`)
  process.exit(failed > 0 ? 1 : 0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

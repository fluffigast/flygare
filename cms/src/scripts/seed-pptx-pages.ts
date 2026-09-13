/**
 * Seedar CMS med pptx-audit-strukturens innehåll: 14 Pages-undersidor,
 * Activities per typ (Kalender/Klubbresor/Årsmöten) och Competitions
 * med slug så tävlingsdetalj-vy fungerar.
 *
 * Idempotent: hoppar över entries som redan finns.
 * Uppdaterar EJ befintliga (använd Payload-admin för redigering).
 *
 * Kör: `npm run seed:pptx-pages` (från cms/, med DATABASE_URL satt)
 */
import { getPayload } from 'payload'
import config from '@payload-config'

function richText(text: string) {
  const paragraphs = text.split('\n\n').filter((p) => p.trim())
  return {
    root: {
      type: 'root',
      children: paragraphs.map((p) => ({
        type: 'paragraph',
        children: [{ type: 'text', text: p.trim(), version: 1 }],
        version: 1,
      })),
      direction: null,
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

// ── Pages ────────────────────────────────────────────────────────────
type PageSeed = {
  slug: string
  title: string
  section: 'flyga-i-are' | 'aktiviteter' | 'tavlingar' | 'om'
  category: string
  lede?: string
  body: string
  order: number
}

const PAGES: PageSeed[] = [
  {
    slug: 'skistar',
    title: 'Samarbetsavtalet Skistar',
    section: 'flyga-i-are',
    category: 'skistar',
    lede: 'Klubbens avtal med Skistar och regler för kommersiell aktör.',
    body:
      'All flygverksamhet i Åreskutans skidområde regleras av samarbetsavtalet mellan klubben och Skistar. Avtalet fastställer villkoren för användning av skidområdet, körning på Skistarvägar, hänsyn till lifts- och pisteverksamhet, samt regler för kommersiella aktörer.\n\n' +
      'Huvudpunkter:\n\n' +
      '• All körning på Skistarvägar sker på deras villkor — maxhastighet 40 km/h.\n' +
      '• Biltrafik ej tillåten under lifts öppettider.\n' +
      '• Fyrhjulsdrivna bilar ska eftersträvas på markerade vägar.\n' +
      '• Lås alltid Skistargrinden efter nedkörning.\n' +
      '• Tillstånd krävs för skoter på Åreskutan.\n\n' +
      'Kommersiell aktör: Skysport Skärmflygskola bedriver kommersiell verksamhet under separat avtal. Övriga aktörer behöver kontakta Skistar och klubbens styrelse innan start.',
    order: 40,
  },
  {
    slug: 'acro',
    title: 'Acro flygning',
    section: 'flyga-i-are',
    category: 'acro',
    lede: 'Vad du bör tänka på vid acro-flygning i Åre.',
    body:
      'Acro-flygning kräver hög färdighetsnivå och rätt utrustning. Följande gäller i Åre:\n\n' +
      '• Räddningsbåt krävs för acro över vatten. Klubbens båt kan bokas — se separata regler under Klubbuss & räddningsbåt.\n' +
      '• Acrobox ligger över Åresjön på anvisat område, säsong sommar när räddningsbåt finns tillgänglig.\n' +
      '• Höjdmarginal minst 500 m ovanför vatten vid manöverstart.\n' +
      '• Två reserver rekommenderas.\n' +
      '• Radiokontakt med markpersonal + räddningsbåt.\n\n' +
      'Kontakta styrelsen för information om aktuellt boksystem för räddningsbåten.',
    order: 50,
  },
  {
    slug: 'speedrider',
    title: 'Speedrider',
    section: 'flyga-i-are',
    category: 'speedrider',
    lede: 'Speedriding i Åre — översikt och rutiner.',
    body:
      'Speedriding kombinerar skidåkning med skärmflyg på små vingar (8–14 m²). Åreskutan har utmärkta förhållanden vintertid.\n\n' +
      'Att tänka på:\n\n' +
      '• Fjällcertifiering krävs för att flyga i lift-området.\n' +
      '• Håll god marginal till pisterna och undvik skidåkare/liftar.\n' +
      '• Vintervinden är starkare — max 8 m/s rekommenderas.\n' +
      '• Radiokontakt med andra piloter på klubbens frekvens.\n' +
      '• Anmäl start till närmaste lift-personal när det är öppet.\n\n' +
      'Erfarenhet från traditionell skidåkning i utförsåkning + skärmflygslicens är förutsättningar.',
    order: 70,
  },
  {
    slug: 'hangflyg',
    title: 'Hängflyg',
    section: 'flyga-i-are',
    category: 'hangflyg',
    lede: 'Hängflygning i Åre — översikt och rutiner.',
    body:
      'Åreskutan har flera startplatser lämpliga för hängflyg. Draklanda är den officiella landningsplatsen.\n\n' +
      'Att tänka på:\n\n' +
      '• Draklanda kräver god landningsteknik — testa i lugna förhållanden först.\n' +
      '• Kabinbanevajrarna passeras söder om Stötta 1 vid nerflyg utan höjdvinst.\n' +
      '• Minst 25 höjdflygningar för att landa vid öppet vatten utan instruktörs ansvar.\n' +
      '• Radio-check innan start.\n\n' +
      'Klubben har transportlösning för utrustning via klubbussen — kontakta styrelsen för tillgång.',
    order: 90,
  },
  {
    slug: 'paramotor',
    title: 'Paramotor',
    section: 'flyga-i-are',
    category: 'paramotor',
    lede: 'Paramotorflygning i Åre — översikt och rutiner.',
    body:
      'Paramotorflygning i Åreområdet kräver särskild hänsyn till lokal luftrums-reglering samt Skistars/markägarnas villkor.\n\n' +
      'Att tänka på:\n\n' +
      '• Motorljud stör markägare och andra användare — flyg lågt bara i egna eller godkända områden.\n' +
      '• Kontrollerat luftrum ESNZ TMA gäller upp till FL 95 (se Cross country flygning).\n' +
      '• Start från Draklanda tillåten enligt specifika villkor — kontakta klubben.\n' +
      '• Bränsle-hantering enligt normala flygregler.\n' +
      '• Anmäl planer till ATS Östersund om du flyger nära kontrollerat luftrum.',
    order: 110,
  },
  {
    slug: 'kalender',
    title: 'Kalender',
    section: 'aktiviteter',
    category: 'aktivitet',
    lede: 'Översikt över klubbens aktiviteter under året.',
    body:
      'En samlad översikt över kommande klubbaktiviteter: årsmöten, klubbresor, tävlingar, träffar och kurser.\n\n' +
      'Kalendern uppdateras löpande — anmäl aktiviteter till styrelsen så läggs de in.\n\n' +
      'Se enskilda aktiviteter för datum, plats och anmälnings-info.',
    order: 10,
  },
  {
    slug: 'klubbresor',
    title: 'Klubbresor',
    section: 'aktiviteter',
    category: 'aktivitet',
    lede: 'Information om klubbresor.',
    body:
      'Klubben arrangerar återkommande resor till svenska och utländska flygdestinationer. Klassiska resmål: Ölüdeniz (Turkiet), Bassano (Italien), Bir Billing (Indien), Krushevo (Nordmakedonien).\n\n' +
      'Resor är öppna för medlemmar med gällande licens. Anmälan sker vanligen 2–3 månader före avresa. Kostnad delas mellan deltagare.\n\n' +
      'Vill du föreslå en resa eller vara reseledare? Kontakta styrelsen.',
    order: 20,
  },
  {
    slug: 'arsmoten',
    title: 'Årsmöten',
    section: 'aktiviteter',
    category: 'aktivitet',
    lede: 'Dokument från årsmöten sorterade på årtal.',
    body:
      'Årsmötet är klubbens högsta beslutande organ och hålls årligen på våren. Kallelse skickas till alla medlemmar minst en månad före.\n\n' +
      'Alla årsmötesprotokoll finns tillgängliga under Dokumentarkiv (Övrigt-menyn) sorterade på årtal.\n\n' +
      'Motioner till årsmötet ska vara styrelsen tillhanda senast två veckor före mötet.',
    order: 30,
  },
  {
    slug: 'ovriga-aktiviteter',
    title: 'Övriga klubbaktiviteter',
    section: 'aktiviteter',
    category: 'aktivitet',
    lede: 'Övriga sammankomster och evenemang.',
    body:
      'Klubben ordnar löpande grillkvällar på Draklanda, tandemkvällar, tävlingsträningar och sociala event. Information om enskilda aktiviteter läggs ut när planeringen är klar.\n\n' +
      'Följ klubbens sociala medier för snabba uppdateringar.',
    order: 40,
  },
  {
    slug: 'are-ppc',
    title: 'Åre PPC',
    section: 'tavlingar',
    category: 'tavling',
    lede: 'Åre Paragliding Point Competition — klubbens största återkommande tävling.',
    body:
      'Åre PPC är en poängbaserad tävling där piloter jagar Åreskutans bästa distans, höjdvinst och tid i luften under en helg. Genomförs varje sommar när termik-förhållandena är som bäst.\n\n' +
      'Klasser: Open, Sport, Serial. Anmälan via klubbens formulär.\n\n' +
      'Tävlingsresultat och vinnare per år visas i Tävlingar-översikten.',
    order: 10,
  },
  {
    slug: 'topplandning',
    title: 'Topplandning',
    section: 'tavlingar',
    category: 'tavling',
    lede: 'Vem landar närmast toppen? Klassisk klubb-tävling.',
    body:
      'Topplandnings-tävlingen är en klassiker: alla piloter försöker landa så nära den utmärkta målpunkten på toppen som möjligt. Enkel att delta i, kul att titta på.\n\n' +
      'Genomförs vid lämpliga förhållanden under säsong. Tävlingsresultat visas i Tävlingar-översikten.',
    order: 20,
  },
  {
    slug: 'sverige-cup',
    title: 'Sverige Cup',
    section: 'tavlingar',
    category: 'tavling',
    lede: 'Nationella cup-serien — Åre är återkommande värd.',
    body:
      'Sverige Cup är den svenska nationella tävlingsserien. Åre är regelbundet värd för en delvring, framförallt under Åre PPC-helgen.\n\n' +
      'Anmälan sker via Svenska Skärmflygförbundets (SSFF) tävlings-portal.\n\n' +
      'Länk till anmälan och regelverk publiceras här när cup-datumen är fastställda.',
    order: 30,
  },
  {
    slug: 'ovriga-tavlingar',
    title: 'Övriga tävlingar',
    section: 'tavlingar',
    category: 'tavling',
    lede: 'Träffar, invitationals och lokala uppvisningar.',
    body:
      'Utöver de officiella tävlingarna arrangerar klubben löpande interna cup:er och deltar i uppvisningar. Info och anmälan-länkar läggs ut när tävlingarna är fastställda.',
    order: 40,
  },
  {
    slug: 'stipendium',
    title: 'Tävlingsstipendium',
    section: 'tavlingar',
    category: 'tavling',
    lede: 'Ekonomiskt stöd för klubbmedlemmar som representerar Åre i tävlingar.',
    body:
      'Klubben delar årligen ut tävlingsstipendium till medlemmar som representerar Åre Skärm- och Drakflygklubb i nationella och internationella tävlingar.\n\n' +
      'Ansökan görs till styrelsen med:\n\n' +
      '• Beskrivning av tävlingen (namn, plats, datum, klass)\n' +
      '• Kostnadsuppskattning (resa, boende, anmälning)\n' +
      '• Motivation\n\n' +
      'Ansökningsformulär och deadlines publiceras här när ansökningsperioden är öppen.',
    order: 50,
  },
]

// ── Activities ───────────────────────────────────────────────────────
type ActivitySeed = {
  slug: string
  title: string
  type: 'kalender' | 'klubbresa' | 'arsmote' | 'ovrigt'
  date: string
  location?: string
  body?: string
}

const currentYear = new Date().getFullYear()

const ACTIVITIES: ActivitySeed[] = [
  {
    slug: `arsmote-${currentYear}`,
    title: `Årsmöte ${currentYear}`,
    type: 'arsmote',
    date: `${currentYear}-04-20`,
    location: 'Draklanda',
    body: 'Årsmöte enligt stadgarna. Kallelse med dagordning skickas ut minst en månad före mötet.',
  },
  {
    slug: `arsmote-${currentYear - 1}`,
    title: `Årsmöte ${currentYear - 1}`,
    type: 'arsmote',
    date: `${currentYear - 1}-04-15`,
    location: 'Draklanda',
    body: 'Årsmötesprotokoll finns i Dokumentarkiv.',
  },
  {
    slug: 'sasongstart',
    title: 'Säsongsupptakt',
    type: 'kalender',
    date: `${currentYear}-05-15`,
    location: 'Draklanda',
    body: 'Traditionell säsongsupptakt med grillning och första flygen för året.',
  },
  {
    slug: 'sasongsavslutning',
    title: 'Säsongsavslutning',
    type: 'kalender',
    date: `${currentYear}-09-30`,
    location: 'Draklanda',
    body: 'Vi avslutar sommarsäsongen tillsammans.',
  },
  {
    slug: 'klubbresa-krushevo',
    title: 'Klubbresa Krushevo, Nordmakedonien',
    type: 'klubbresa',
    date: `${currentYear + 1}-05-10`,
    location: 'Krushevo, Nordmakedonien',
    body: 'Klassisk flygdestination i Nordmakedonien. En vecka termik-flygning. Anmälan öppnar i januari.',
  },
]

// ── Competitions ─────────────────────────────────────────────────────
type CompetitionSeed = {
  slug: string
  name: string
  status: 'Aktiv' | 'Avslutad'
  subtitle: string
  description: string
  signupUrl?: string
  winners?: Array<{ year: number; name: string; result: string }>
}

const COMPETITIONS: CompetitionSeed[] = [
  {
    slug: 'are-ppc',
    name: 'Åre PPC',
    status: 'Aktiv',
    subtitle: 'Åre Paragliding Point Competition',
    description:
      'Poängbaserad tävling där piloter jagar bäst distans, höjdvinst och tid i luften under en helg. Genomförs varje sommar när termik-förhållandena är som bäst.',
    signupUrl: 'https://paragliding.se',
    winners: [
      { year: 2025, name: 'Johan Bergman', result: '87 km / FAI-triangel' },
      { year: 2024, name: 'Anna Lindström', result: '74 km / open' },
      { year: 2023, name: 'Peter Sjögren', result: '69 km / return' },
    ],
  },
  {
    slug: 'topplandning',
    name: 'Topplandning',
    status: 'Aktiv',
    subtitle: 'Landa så nära målpunkten som möjligt',
    description:
      'Enkel och rolig tävling där alla piloter försöker landa så nära den utmärkta målpunkten på toppen som möjligt. Genomförs vid lämpliga förhållanden under säsong.',
    winners: [
      { year: 2025, name: 'Erik Nyström', result: '0.8 m' },
      { year: 2024, name: 'Maria Öberg', result: '1.4 m' },
    ],
  },
  {
    slug: 'sverige-cup',
    name: 'Sverige Cup',
    status: 'Aktiv',
    subtitle: 'Del av den nationella cup-serien',
    description:
      'Åre är regelbundet värd för en delvring i Sverige Cup, oftast under Åre PPC-helgen. Anmälan sker via SSFF:s tävlings-portal.',
    signupUrl: 'https://paragliding.se',
  },
]

async function main() {
  const payload = await getPayload({ config })

  let created = 0
  let skipped = 0
  let failed = 0

  console.log('── Pages ──────────────────────────────────────────')
  for (const entry of PAGES) {
    try {
      const { docs } = await payload.find({
        collection: 'pages',
        where: { slug: { equals: entry.slug } },
        limit: 1,
        depth: 0,
      })
      if (docs.length > 0) {
        console.log(`  · skip  "${entry.slug}"`)
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
      console.error(`  ✗ "${entry.slug}": ${(err as Error).message}`)
      failed++
    }
  }

  console.log('\n── Activities ─────────────────────────────────────')
  for (const a of ACTIVITIES) {
    try {
      const { docs } = await payload.find({
        collection: 'activities',
        where: { slug: { equals: a.slug } },
        limit: 1,
        depth: 0,
      })
      if (docs.length > 0) {
        console.log(`  · skip  "${a.slug}"`)
        skipped++
        continue
      }
      await payload.create({
        collection: 'activities',
        data: {
          title: a.title,
          slug: a.slug,
          type: a.type as any,
          date: a.date,
          location: a.location,
          body: a.body ? richText(a.body) : undefined,
        } as any,
      })
      console.log(`  ✓ skapad "${a.slug}" (${a.type})`)
      created++
    } catch (err) {
      console.error(`  ✗ "${a.slug}": ${(err as Error).message}`)
      failed++
    }
  }

  console.log('\n── Competitions ───────────────────────────────────')
  for (const c of COMPETITIONS) {
    try {
      const { docs } = await payload.find({
        collection: 'competitions',
        where: { slug: { equals: c.slug } },
        limit: 1,
        depth: 0,
      })
      if (docs.length > 0) {
        console.log(`  · skip  "${c.slug}"`)
        skipped++
        continue
      }
      await payload.create({
        collection: 'competitions',
        data: {
          name: c.name,
          slug: c.slug,
          status: c.status,
          subtitle: c.subtitle,
          description: richText(c.description),
          signupUrl: c.signupUrl,
          winners: c.winners,
        } as any,
      })
      console.log(`  ✓ skapad "${c.slug}"`)
      created++
    } catch (err) {
      console.error(`  ✗ "${c.slug}": ${(err as Error).message}`)
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

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

async function seed() {
  const payload = await getPayload({ config })

  // ── Admin user ──────────────────────────────────────────────────────
  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@flygare.nu',
      password: 'changeme123',
      role: 'admin',
    },
  })
  console.log('Created admin user')

  // ── News ────────────────────────────────────────────────────────────
  const newsItems = [
    {
      title: 'Välkommen till PPC Åre 2026',
      category: 'Tävlingar' as const,
      date: '2026-03-20',
      description: richText(
        'Årets upplaga av PoängPlockarCupen (PPC) startar i och med att första termiken hittas! Läs reglerna under Tävlingar. Nytt för i år: klubbtröjor och merchandise finns på asdfkstore.myspreadshop.se.',
      ),
      featured: true,
    },
    {
      title: 'Klubbuss Kampanj',
      category: 'Aktiviteter' as const,
      date: '2026-03-16',
      description: richText(
        'Vi letar efter en ny klubbuss! Budget: max 180 000 kr. Krav: 4WD, minst 7 platser, dragkrok. Tips? Swish 123 083 11 98 till kassan.',
      ),
      featured: true,
    },
    {
      title: 'Ny webbshop',
      category: 'Information' as const,
      date: '2026-01-23',
      description: richText(
        'SSFF:s webbshop har uppdaterats. Medlemskap och licenser köps nu via cloud.paragliding.se.',
      ),
    },
    {
      title: 'Ansök om tävlingsstipendium',
      category: 'Aktiviteter' as const,
      date: '2026-01-20',
      description: richText(
        'Klubben delar ut stipendier för tävlingsdeltagande. Ansök via styrelsen senast 15 mars.',
      ),
    },
    {
      title: 'Kallelse till Årsmöte 2026',
      category: 'Information' as const,
      date: '2026-01-12',
      description: richText(
        'Årsmöte hålls 22 februari kl 18:00 på Åre Fjällsätra. Dagordning och motioner skickas ut via e-post.',
      ),
    },
    {
      title: 'Viktig info till alla flygare',
      category: 'Information' as const,
      date: '2025-07-17',
      description: richText(
        'Påminnelse: Skistar-avtalet gäller — all körning på Skistarvägar sker på deras villkor. Maxhastighet 40 km/h. Hummeln: kör bara uppför i markerad stig.',
      ),
    },
    {
      title: 'Vinnare av topplandningstävlingen',
      category: 'Tävlingar' as const,
      date: '2025-04-12',
      description: richText(
        'Love Lundgren vann vårens topplandningstävling. Champagnen väntar!',
      ),
    },
    {
      title: '1000m projektet avslutat',
      category: 'Aktiviteter' as const,
      date: '2025-04-12',
      description: richText(
        'Jordbruksverkets tillstånd för 1000m-starten är nu klart. Starten är officiellt godkänd och öppen.',
      ),
    },
  ]

  for (const item of newsItems) {
    await payload.create({ collection: 'news', data: item })
  }
  console.log(`Created ${newsItems.length} news articles`)

  // ── Board Members ───────────────────────────────────────────────────
  const boardMembers = [
    { name: 'Therese Bärfenheim', role: 'Ordförande', sortOrder: 1 },
    { name: 'Vladimir Gutic', role: 'Vice ordförande', sortOrder: 2 },
    { name: 'Alexander Kinde', role: 'Ledamot', sortOrder: 3 },
    { name: 'Linda Kits', role: 'Kassör', sortOrder: 4 },
    { name: 'Pontus Karlsson', role: 'Ledamot', sortOrder: 5 },
    { name: 'Johan Bernalt', role: 'Suppleant', sortOrder: 6 },
    { name: 'Elias Evertsson', role: 'Suppleant', sortOrder: 7 },
  ]

  for (const member of boardMembers) {
    await payload.create({ collection: 'board-members', data: member })
  }
  console.log(`Created ${boardMembers.length} board members`)

  // ── Launches ────────────────────────────────────────────────────────
  const launches = [
    {
      name: '1000m starten',
      type: 'Starter' as const,
      direction: 'SO\u2013S (skärm), SO\u2013SV (hängflyg)',
      elevation: '1000 m',
      coords: 'Nås via Kabinbanan',
      heightDiff: '905 m',
      recommended: true,
      sortOrder: 1,
      description: richText(
        'Huvudstarten. Nås via Kabinbanan till toppen, sedan vandring söderut. Startplats med bra förhållanden vid syd- till sydostlig vind.',
      ),
      extra: richText(
        'Jordbruksverkets tillstånd beviljat 2023. Kontrollera alltid vajrar och linbanor innan start.',
      ),
    },
    {
      name: 'Tväråvalvet',
      type: 'Starter' as const,
      direction: 'NV (skärm), V\u2013NV (hängflyg)',
      elevation: '~1050 m',
      coords: '63\u00b025\'48"N, 13\u00b004\'57"E',
      heightDiff: '925 m till Draklanda, 370 m till liftstation',
      recommended: true,
      sortOrder: 2,
      description: richText(
        'Nordvänd start med lång glid till Draklanda. Bra vintertid med nordvästlig vind.',
      ),
      extra: richText(
        'Vinter: miniskidor rekommenderas för transport.',
      ),
    },
    {
      name: 'Mörvikshummeln Väst',
      type: 'Starter' as const,
      direction: 'S\u2013SV',
      elevation: '~900 m',
      coords: '63\u00b024\'55"N, 13\u00b003\'46"E',
      heightDiff: '520 m',
      recommended: true,
      sortOrder: 3,
      description: richText(
        'Populär start vid sydvästlig vind. Nås via Hummelnvägen.',
      ),
    },
    {
      name: 'Mörvikshummeln Syd',
      type: 'Starter' as const,
      direction: 'S',
      elevation: '~900 m',
      coords: '63\u00b024\'52"N, 13\u00b003\'51"E',
      heightDiff: '520 m',
      recommended: true,
      sortOrder: 4,
      description: richText('Sydvänd start intill väststarten.'),
    },
    {
      name: 'Mörvikshummeln Ost',
      type: 'Starter' as const,
      direction: 'O\u2013SO',
      elevation: '~900 m',
      coords: '63\u00b024\'54"N, 13\u00b004\'02"E',
      heightDiff: '510 m',
      recommended: true,
      sortOrder: 5,
      description: richText(
        'Östvänd start, bra vid termikflygning med östlig komponent.',
      ),
    },
    {
      name: 'Mörvikshummeln Nordost',
      type: 'Starter' as const,
      direction: 'NO\u2013N',
      elevation: '~900 m',
      coords: '63\u00b024\'58"N, 13\u00b003\'55"E',
      heightDiff: '525 m',
      recommended: true,
      sortOrder: 6,
      description: richText(
        'Nordostvänd start med vyer mot Åredalen.',
      ),
    },
    {
      name: 'Röda Rappet Väst',
      type: 'Starter' as const,
      direction: 'V\u2013NV',
      elevation: '~950 m',
      coords: '63\u00b025\'34"N, 13\u00b004\'13"E',
      heightDiff: '570 m',
      recommended: true,
      sortOrder: 7,
      description: richText(
        'Utmanande start med stora stenar och branta slänter. Kräver erfarenhet.',
      ),
    },
    {
      name: 'Långspannet',
      type: 'Starter' as const,
      direction: 'S\u2013SV',
      elevation: '~900 m',
      coords: 'Mellan stötta 3 och 4',
      heightDiff: '520 m',
      recommended: false,
      sortOrder: 8,
      description: richText(
        'Inofficiell start. REKOMMENDERAS EJ. Kräver P2-licens och lokal erfarenhet.',
      ),
    },
    {
      name: 'Draklanda',
      type: 'Landning' as const,
      direction: 'Alla',
      elevation: '~380 m',
      coords: '1 km väster om torget',
      recommended: true,
      sortOrder: 9,
      description: richText(
        'Officiell landningsplats. Enda godkända landningen vid Åreskutan.',
      ),
      extra: richText(
        'Krav: minst 25 höjdflygningar för sommarflygning utan instruktör. Vinter: sjöisen kan användas men utloppet har MYCKET svag is.',
      ),
    },
  ]

  for (const launch of launches) {
    await payload.create({ collection: 'launches', data: launch })
  }
  console.log(`Created ${launches.length} launches`)

  // ── Other Sites ─────────────────────────────────────────────────────
  const otherSites = [
    {
      name: 'Välliste, Trillevallen',
      direction: 'V\u2013NV',
      elevationDrop: '~400 m',
      description: richText(
        'Vid E14 utanför Undersåker. 20-25 min vandring, lift tillgänglig.',
      ),
    },
    {
      name: 'Getryggen, Snasahögarna',
      direction: 'S\u2013SV',
      elevationDrop: '~600 m',
      description: richText(
        'Utgångspunkt Storulvåns station. 45 min vandring.',
      ),
    },
    {
      name: 'Tossön, Järpen',
      direction: 'V',
      elevationDrop: '~350 m',
      description: richText('Nyligen röjd av Åre kommun.'),
    },
    {
      name: 'Rännberg, Gevsjön',
      direction: 'SO',
      elevationDrop: '~250 m',
      description: richText('Populär övningsplats.'),
    },
  ]

  for (const site of otherSites) {
    await payload.create({ collection: 'other-sites', data: site })
  }
  console.log(`Created ${otherSites.length} other sites`)

  // ── Competitions ────────────────────────────────────────────────────
  await payload.create({
    collection: 'competitions',
    data: {
      name: 'Åre PPC',
      status: 'Aktiv',
      subtitle: 'PoängPlockarCupen',
      description: richText(
        'Poängtävling över hela säsongen, skapad 2015 av Staffan Rolfsson och Magnus Hjelm.',
      ),
      rules: [
        { text: 'Varje flygning loggas i Flightlog.org' },
        { text: 'Cylinderradie: 400 m runt officiell topp' },
        { text: 'Poäng = antal cylindrar \u00d7 distans i km' },
        { text: 'Både skärm och hängflyg i samma klass' },
        { text: 'Säsongen pågår mars\u2013oktober' },
        { text: 'Resultat publiceras löpande' },
      ],
      winners: [],
    },
  })

  await payload.create({
    collection: 'competitions',
    data: {
      name: 'Larsa Open',
      status: 'Aktiv',
      subtitle: 'Fridistanstävling till Lars-Anders Jonssons minne',
      description: richText(
        'Minnestävling i fridistans, startad 2018.',
      ),
      rules: [
        { text: 'Längsta distans från Åreskutan under säsongen' },
        { text: 'Alla typer av flygningar räknas' },
        { text: 'GPS-logg krävs' },
        { text: 'Verifieras via XContest eller Flightlog' },
      ],
      winners: [
        { year: 2020, name: 'Gillis Bengtsson', result: '99,0 km' },
        { year: 2019, name: 'Andreas Florén', result: '46,1 km' },
        { year: 2018, name: 'Patrik Nietlisbach', result: '91,1 km' },
      ],
    },
  })

  await payload.create({
    collection: 'competitions',
    data: {
      name: 'Topplandning',
      status: 'Aktiv',
      subtitle: 'Första termiken på säsongen',
      description: richText(
        'Säsongens första termikmarkering \u2014 den som landar på toppen först vinner.',
      ),
      rules: [
        { text: 'Startområde: valfri officiell start' },
        {
          text: 'Grön zon: Ullådalstugan \u2192 Rödkulleliften \u2192 Åre Ski Inn \u2192 Hummelstugan \u2192 Fjällgårdsexpressen',
        },
        { text: 'Landning inom grön zon på Åreskutan krävs' },
        { text: 'GPS-logg och vittne eller foto som bevis' },
        { text: 'Vinst: Champagne (Moët) från klubben' },
        { text: 'Gäller från 1 januari varje år' },
        { text: 'Bara termisk lyft räknas (ej dynamiskt)' },
        { text: 'Styrelsen avgör tvister' },
      ],
      winners: [
        { year: 2020, name: 'Love Lundgren', result: '10 mars' },
        { year: 2019, name: 'Andreas Florén', result: '26 mars' },
        { year: 2015, name: 'Patrik Nietlisbach', result: '21 feb' },
        { year: 2005, name: 'Lars A Jonsson', result: '21 mars' },
      ],
    },
  })
  console.log('Created 3 competitions')

  // ── Milestones ──────────────────────────────────────────────────────
  const milestones = [
    { year: 1975, text: 'Åre Drakflygklubb bildas' },
    { year: 1988, text: 'Åre Skärmflygklubb bildas' },
    { year: 1995, text: 'Klubbarna slås ihop' },
    { year: 2023, text: '1000m-projektet slutförs' },
    { year: 2026, text: '~100 aktiva medlemmar' },
  ]

  for (const milestone of milestones) {
    await payload.create({ collection: 'milestones', data: milestone })
  }
  console.log(`Created ${milestones.length} milestones`)

  // ── Weather Links ───────────────────────────────────────────────────
  const weatherLinks = [
    { label: 'SMHI Fjällväder', url: 'https://www.smhi.se/vader/prognoser/fjallvader', sortOrder: 1 },
    { label: 'Yr.no Åreskutan', url: 'https://www.yr.no/nb/detaljer/tabell/2-2720396/Sverige/J%C3%A4mtlands%20l%C3%A4n/%C3%85re/%C3%85reskutan', sortOrder: 2 },
    { label: 'XCMeteo', url: 'https://xcmeteo.com/', sortOrder: 3 },
    { label: 'Windguru', url: 'https://www.windguru.cz/', sortOrder: 4 },
    { label: 'Windy', url: 'https://www.windy.com/', sortOrder: 5 },
    { label: 'TAF/METAR Frösön', url: 'https://www.aro.lfv.se/Links/Link/ViewLink?TorLinkId=314&type=MET', sortOrder: 6 },
    { label: 'MEAC Hummeln', url: 'https://meac.se/sub_2/hummeln/wind.asp', sortOrder: 7 },
    { label: 'MetOffice Isobarer', url: 'https://www.metoffice.gov.uk/weather/maps-and-charts/surface-pressure', sortOrder: 8 },
  ]

  for (const link of weatherLinks) {
    await payload.create({ collection: 'weather-links', data: link })
  }
  console.log(`Created ${weatherLinks.length} weather links`)

  // ── Global: SiteSettings ────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      clubName: 'Åre Skärm- och Drakflygklubb',
      foundedYear: 1975,
      heroSubtitle: 'Åre Skärm- och Drakflygklubb',
      heroTagline: 'Skandinaviens mest spektakulära flygplats',
      heroDescription: 'Jakten på termiken startar i mars. Har du tur får du sällskap av en kungsörn.',
      aboutTitle: '50 år av flygning från Skutan',
      aboutText: richText(
        'Åre Drakflygklubb bildades redan 1975 och är en av Sveriges äldsta drakflygklubbar. Under 80-talet dominerade draken, men på 90-talet tog skärmflyget över. Idag flyger ca 95% skärm. Klubben har ca 100 aktiva medlemmar varav 30 bor i Åre kommun.',
      ),
      statsMembers: '~100',
      statsDistanceRecord: '230 km',
      statsLaunchSites: '9',
    },
  })
  console.log('Seeded site-settings')

  // ── Global: MembershipInfo ──────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'membership-info',
    data: {
      price: '600 kr / år',
      validity: 'Giltigt t.o.m. 31 december 2026',
      shopUrl: 'https://cloud.paragliding.se/product-category/klubbmedlemskap-stod-support-eller-for-nybliven-pilot/',
      benefits: [
        { text: 'Tillgång till alla startplatser på Åreskutan' },
        { text: 'Tillgång till landningsplatsen Draklanda' },
        { text: 'Räddningsbåt vid Draklanda' },
        { text: 'Åka med klubbussen upp på berget' },
        { text: 'Rösträtt på årsmöte' },
        { text: 'Delta i klubbtävlingar som Åre PPC' },
        { text: 'Hjälp med licensförnyelse' },
        { text: 'Vinterpreparerade startplatser' },
        { text: 'Sommarklippning av Draklanda' },
      ],
      licenseRequirements: [
        { level: 'Elevlicens', requirements: 'Minst 10 flygningar' },
        { level: 'Pilot 1', requirements: 'Minst 10 flygningar' },
        { level: 'Pilot 2', requirements: 'Minst 10 höjdflygningar + 5 timmar flygtid' },
      ],
    },
  })
  console.log('Seeded membership-info')

  // ── Global: ContactInfo ─────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'contact-info',
    data: {
      email: 'info@flygare.nu',
      facebookUrl: 'https://www.facebook.com/groups/48461420739/',
      youtubeUrl: 'https://www.youtube.com/channel/UCQeXyEgUI2Z1y4fl1iiXIlQ',
      radioFrequencies: [
        { label: 'Lyssning', value: '146.7625 MHz' },
        { label: 'Sändning', value: '150.7625 MHz (repeater)' },
        { label: 'Öppningston', value: '67.0 Hz' },
        { label: 'Kanaldelning', value: '25 kHz' },
      ],
      emergencyContacts: [
        { label: '112', description: 'Nödsituation', phone: '112' },
        { label: '1177', description: 'Sjukvårdsrådgivning', phone: '1177' },
        { label: 'Frösötornet Flygledning', description: 'TMA-passage öster om Järpen', phone: '+46 8 511 886 17' },
        { label: 'Trafikverket Driftcentral Ånge', description: 'Järnvägsärenden', phone: '+46 690 523 20' },
      ],
      xcProcedures: richText(
        'Avtal med ATS Östersund för kontrollerat luftrum. Sektorer: Tore 4 och Tore 5, FL 95. Dagen före: mejla ats.ostersund@lfv.se med rutt, tider, sektor, frekvens, telefon. Flygdagen: ring tornet +46 8 511 886 17 innan start. Efter: meddela ATS per telefon. Kontrollera aro.lfv.se för publicerade öppettider.',
      ),
    },
  })
  console.log('Seeded contact-info')

  // ── Global: BusRules ────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'bus-rules',
    data: {
      intro: richText(
        'Klubben har en buss som kör medlemmar upp på berget mot en symbolisk avgift per tur.',
      ),
      rules: [
        { text: 'Fullvärdigt medlemskap krävs' },
        { text: 'Max 4 passagerare + 1 förare' },
        { text: 'Passageraravgift: 20 kr per tur (Swish till föraren)' },
        { text: 'Ungdomar under 18: gratis (kräver 3+ betalande passagerare)' },
        { text: 'Föraren hanterar egen ersättning' },
        { text: 'Max 40 km/h på Skistarvägar' },
        { text: 'Ingen uppkörning när liftar körs för cykling' },
        { text: 'Tanka vid OK/Q8 Åre (klubbkort i kassan)' },
        { text: 'Föraren kontrollerar olja/vatten vid varje tankning' },
        { text: 'Dagsutflykter max 20 mil (längre kräver styrelsebeslut)' },
        { text: 'Fyll i loggboken, lås Skistargrinden efter nedkörning' },
      ],
    },
  })
  console.log('Seeded bus-rules')

  // ── Global: FlyingGuide ─────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'flying-guide',
    data: {
      winterTitle: 'Flyga på vintern',
      winterContent: richText(
        'Vintern erbjuder fantastiska förhållanden med laminärt flöde och ofta starka inversioner. Startplatserna nås via kabinbanan. Kontrollera alltid snöförhållanden och vajrar. Miniskidor rekommenderas för transport till startplatserna.',
      ),
      summerTitle: 'Flyga på sommaren',
      summerContent: richText(
        'Sommaren bjuder på termik från mars till oktober. Bästa förhållandena hittas vanligtvis på eftermiddagen med svag sydvästlig vind. Kontrollera alltid aktuella NOTAM och luftrumsrestriktioner. Termikområden finns markerade på termikkartan.',
      ),
      hangGlidingTitle: 'Hängflygning från Skutan',
      hangGlidingContent: richText(
        'Hängflyg har längre tradition i Åre. Startplatserna är dimensionerade för båda typerna. Hängflygare har generellt bredare vindtolerans på starterna.',
      ),
      thermalMapTitle: 'Termikkarta Åre',
    },
  })
  console.log('Seeded flying-guide')

  console.log('Seed complete')
  process.exit(0)
}

seed()

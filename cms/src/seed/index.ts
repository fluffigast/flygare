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

  // ── Idempotency check ─────────────────────────────────────────────
  const existing = await payload.find({ collection: 'news', limit: 1 })
  if (existing.totalDocs > 0) {
    console.log('Database already seeded, skipping.')
    process.exit(0)
  }

  // ── Admin user ──────────────────────────────────────────────────────
  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@flygare.nu',
      password: process.env.PAYLOAD_ADMIN_PASSWORD || 'changeme123',
      role: 'admin',
    },
  })
  console.log('Created admin user')

  // ── News ────────────────────────────────────────────────────────────
  const newsItems = [
    {
      title: 'Välkommen till PPC Åre 2026',
      slug: 'valkommen-till-ppc-are-2026',
      category: 'Tävlingar' as const,
      date: '2026-03-20',
      description:
        'Årets upplaga av PoängPlockarCupen (PPC) startar i och med att första termiken hittas! Läs reglerna under Tävlingar. Nytt för i år: klubbtröjor och merchandise finns på asdfkstore.myspreadshop.se.',
      featured: true,
    },
    {
      title: 'Klubbuss Kampanj',
      slug: 'klubbuss-kampanj',
      category: 'Aktiviteter' as const,
      date: '2026-03-16',
      description:
        'Vi letar efter en ny klubbuss! Budget: max 180 000 kr. Krav: 4WD, minst 7 platser, dragkrok. Tips? Swish 123 083 11 98 till kassan.',
      featured: true,
    },
    {
      title: 'Ny webbshop',
      slug: 'ny-webbshop',
      category: 'Information' as const,
      date: '2026-01-23',
      description:
        'SSFF:s webbshop har uppdaterats. Medlemskap och licenser köps nu via cloud.paragliding.se.',
    },
    {
      title: 'Ansök om tävlingsstipendium',
      slug: 'ansok-om-tavlingsstipendium',
      category: 'Aktiviteter' as const,
      date: '2026-01-20',
      description:
        'Klubben delar ut stipendier för tävlingsdeltagande. Ansök via styrelsen senast 15 mars.',
    },
    {
      title: 'Kallelse till Årsmöte 2026',
      slug: 'kallelse-till-arsmote-2026',
      category: 'Information' as const,
      date: '2026-01-12',
      description:
        'Årsmöte hålls 22 februari kl 18:00 på Åre Fjällsätra. Dagordning och motioner skickas ut via e-post.',
    },
    {
      title: 'Viktig info till alla flygare',
      slug: 'viktig-info-till-alla-flygare',
      category: 'Information' as const,
      date: '2025-07-17',
      description:
        'Påminnelse: Skistar-avtalet gäller — all körning på Skistarvägar sker på deras villkor. Maxhastighet 40 km/h. Hummeln: kör bara uppför i markerad stig.',
    },
    {
      title: 'Vinnare av topplandningstävlingen',
      slug: 'vinnare-av-topplandningstavlingen',
      category: 'Tävlingar' as const,
      date: '2025-04-12',
      description:
        'Love Lundgren vann vårens topplandningstävling. Champagnen väntar!',
    },
    {
      title: '1000m projektet avslutat',
      slug: '1000m-projektet-avslutat',
      category: 'Aktiviteter' as const,
      date: '2025-04-12',
      description:
        'Jordbruksverkets tillstånd för 1000m-starten är nu klart. Starten är officiellt godkänd och öppen.',
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
      name: '1000-meter Syd',
      slug: '1000-meter-syd',
      type: 'Starter' as const,
      excerpt: 'Brant fjällstart på Västerskutan med bra höjd över dalen.',
      position: { wgs84Lat: 63.4089, wgs84Lon: 13.0782, sweref99Lat: 7038210, sweref99Lon: 692480 },
      altitudeMeters: 1200,
      heightAboveLanding: 700,
      windDirMin: 180,
      windDirMax: 225,
      windNotes: 'Känslig för rotor vid nordlig vind. Termiken kan vara stark vid sol.',
      experienceLevel: 'medel' as const,
      experienceNotes: 'Medel till avancerad pilot med god fjällerfarenhet',
      recommended: true,
      sortOrder: 1,
      description: richText('Startplats på Västerskutan med bra höjd över dalen och stora möjligheter i rätt vind. Kräver god startteknik.'),
      risks: [{ text: 'Rotor vid fel vindriktning.' }, { text: 'Bergig och stenig mark.' }, { text: 'Begränsade nödlandningsytor.' }],
      emergencyLocation: 'Åreskutan, 1000-meter syd startplats.',
    },
    {
      name: 'Tväråvalvet',
      slug: 'tvaravalvet',
      type: 'Starter' as const,
      excerpt: 'Nordvästlig start med god höjd — populär vid NV-vind.',
      position: { wgs84Lat: 63.43, wgs84Lon: 13.0825, sweref99Lat: 7040550, sweref99Lon: 692700 },
      altitudeMeters: 1050,
      heightAboveLanding: 925,
      windDirMin: 270,
      windDirMax: 330,
      windNotes: 'NV (skärm), V–NV (hängflyg). Bra höjd och bred startyta.',
      experienceLevel: 'medel' as const,
      experienceNotes: 'Medel till avancerad',
      recommended: true,
      sortOrder: 2,
      description: richText('Startplats med utsikt mot nordväst. Bred startyta som fungerar bra vid nordvästlig vind.'),
      risks: [{ text: 'Rotor vid sydlig vind.' }, { text: 'Brant terräng nedanför starten.' }],
      emergencyLocation: 'Tväråvalvet, Åreskutan.',
    },
    {
      name: 'Mörvikshummeln',
      slug: 'morvikshummeln',
      type: 'Starter' as const,
      excerpt: 'Öppnare sluttning söder om Åre — populär vid stabil vind från sydväst.',
      position: { wgs84Lat: 63.3955, wgs84Lon: 13.102, sweref99Lat: 7036950, sweref99Lon: 694050 },
      altitudeMeters: 920,
      heightAboveLanding: 480,
      windDirMin: 225,
      windDirMax: 270,
      windNotes: 'Lågning över skog kräver höjd och planering.',
      experienceLevel: 'nybörjare' as const,
      experienceNotes: 'Nybörjare till medel under mentorering',
      recommended: true,
      sortOrder: 3,
      description: richText('Rymlig start som passar piloter som bygger fjällvana. Landningsmöjligheter mot dalen med skog emellan.'),
      risks: [{ text: 'Skog och telefonledningar i glidbanan.' }, { text: 'Svaga lee-effekter vid ostlig vind.' }],
      emergencyLocation: 'Mörvikshummeln, Åre.',
    },
    {
      name: 'Röda Rappet Väst',
      slug: 'roda-rappet-vast',
      type: 'Starter' as const,
      excerpt: 'Västlig till nordvästlig start — bra komplement vid V-NV vind.',
      position: { wgs84Lat: 63.4261, wgs84Lon: 13.0703, sweref99Lat: 7040100, sweref99Lon: 691900 },
      altitudeMeters: 950,
      heightAboveLanding: 570,
      windDirMin: 250,
      windDirMax: 315,
      windNotes: 'V–NV. Skyddad från sydlig vind.',
      experienceLevel: 'medel' as const,
      experienceNotes: 'Medel med god fjällerfarenhet',
      recommended: true,
      sortOrder: 4,
      description: richText('Startplats vid Röda Rappet med västlig exponering. Skyddad position.'),
      risks: [{ text: 'Klippig terräng.' }, { text: 'Begränsade nödlandningsytor.' }],
      emergencyLocation: 'Röda Rappet Väst, Åreskutan.',
    },
    {
      name: 'Långspannet',
      slug: 'langspannet',
      type: 'Starter' as const,
      excerpt: 'Syd-sydvästlig start — ej rekommenderad för nybörjare.',
      position: { wgs84Lat: 63.405, wgs84Lon: 13.08, sweref99Lat: 7037800, sweref99Lon: 692500 },
      altitudeMeters: 900,
      heightAboveLanding: 520,
      windDirMin: 180,
      windDirMax: 225,
      windNotes: 'S–SV. Mellan stötta 3 och 4.',
      experienceLevel: 'avancerad' as const,
      experienceNotes: 'Avancerad pilot krävs — ej rekommenderad',
      recommended: false,
      sortOrder: 5,
      description: richText('Start mellan kabinbanans stöttor. Kräver precision och erfarenhet. Ej rekommenderad.'),
      risks: [{ text: 'Kablar i närheten.' }, { text: 'Begränsat utrymme.' }],
      emergencyLocation: 'Långspannet, mellan stötta 3 och 4, Åreskutan.',
    },
    {
      name: 'Draklanda',
      slug: 'draklanda',
      type: 'Landning' as const,
      excerpt: 'Officiell landningsplats — 1 km väster om torget i Åre.',
      position: { wgs84Lat: 63.398, wgs84Lon: 13.065, sweref99Lat: 7037200, sweref99Lon: 691500 },
      altitudeMeters: 380,
      heightAboveLanding: 0,
      windDirMin: 0,
      windDirMax: 360,
      windNotes: 'Alla vindriktningar. Officiell landningsplats.',
      experienceLevel: 'nybörjare' as const,
      experienceNotes: 'Alla nivåer',
      recommended: true,
      sortOrder: 6,
      description: richText('Draklanda är den officiella landningsplatsen, ca 1 km väster om Åre torg. Räddningsbåt tillgänglig under säsongen.'),
      risks: [{ text: 'Vindbyar vid terrängens kant.' }],
      emergencyLocation: 'Draklanda, landningsplats, Åre.',
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
      facebook: {
        label: 'Facebook — Åre Skärmflygklubb',
        url: 'https://www.facebook.com/groups/48461420739/',
      },
      youtube: {
        label: 'YouTube — Åre Skärmflygklubb',
        url: 'https://www.youtube.com/channel/UCQeXyEgUI2Z1y4fl1iiXIlQ',
      },
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

  // ── Global: SiteNavigation ─────────────────────────────────────
  await payload.updateGlobal({
    slug: 'site-navigation',
    data: {
      sections: [
        { label: 'Hem', path: '/', children: [] },
        {
          label: 'Flyga i Åre',
          path: '/flyga-i-are',
          children: [
            { label: 'Starter & landningar', path: '/flyga-i-are/startplatser' },
            { label: 'Väder', path: '/flyga-i-are/vader' },
            { label: 'Flygregler', path: '/flyga-i-are/flygregler' },
            { label: 'Säkerhet & nödsituation', path: '/flyga-i-are/sakerhet' },
            { label: 'Cross country & luftrum', path: '/flyga-i-are/xc' },
            { label: 'Acro', path: '/flyga-i-are/acro' },
            { label: 'Speedrider', path: '/flyga-i-are/speedrider' },
            { label: 'Hängflyg', path: '/flyga-i-are/hangflyg' },
            { label: 'Paramotor', path: '/flyga-i-are/paramotor' },
            { label: 'Klubbuss & räddningsbåt', path: '/flyga-i-are/klubbuss' },
          ],
        },
        { label: 'Nyheter', path: '/nyheter', children: [] },
        { label: 'Aktiviteter', path: '/aktiviteter', children: [] },
        { label: 'Tävling', path: '/tavlingar', children: [] },
        {
          label: 'Om klubben',
          path: '/om',
          children: [
            { label: 'Historia & nutid', path: '/om' },
            { label: 'Styrelsen', path: '/om/styrelsen' },
            { label: 'Kontakt', path: '/kontakt' },
            { label: 'Klubbprodukter', path: '/om/klubbprodukter' },
            { label: 'Stadgar', path: '/om/stadgar' },
            { label: 'Bli medlem', path: '/bli-medlem' },
          ],
        },
        {
          label: 'Övrigt',
          path: '/ovrigt',
          children: [
            { label: 'Foton', path: '/ovrigt/foton' },
            { label: 'Dokumentarkiv', path: '/ovrigt/dokument' },
            { label: 'Skärmflygförbundet', path: 'https://www.paragliding.se', external: true },
          ],
        },
      ],
    },
  })
  console.log('Seeded site-navigation')

  // ── Global: ClubInfo ───────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'club-info',
    data: {
      history: richText(
        'Åre Drakflygklubb bildades redan 1975 och sedan 1988 har även Åre Skärmflygklubb funnits. 1995 slogs klubbarna ihop och fick nuvarande namn Åre skärm- och drakflygklubb. Under 1980-talet dominerades flygningen av drakar, men under 1990-talet tog skärmarna över mer och mer — idag görs 95 % av all flygning från Skutan med skärm. Klubben har ca 100 medlemmar, varav ca 30 bor i Åre kommun. Under åren har ett antal startplatser iordningställts, landningsplatsen Draklanda har växt och blivit en väletablerad officiell landningsplats, och ett flertal tävlingar har arrangerats — bl.a. SM i distansflyg, SM/Nordiska mästerskap i akrobatik och den återkommande tävlingen Out and Return. Distansrekordet för skärmflygare är drygt 230 km (Åre–Sollefteå) och för hängflygare 116 km.',
      ),
      records: [
        { title: 'Distansrekord skärm', value: '230 km', year: 2020 },
        { title: 'Distansrekord hängflyg', value: '115 km' },
        { title: 'Medlemmar', value: '~100' },
        { title: 'Startplatser', value: '9' },
      ],
      clubProducts: richText('Klubbtröjor och merchandise finns på vår webbshop.'),
      shopUrl: 'https://asdfkstore.myspreadshop.se',
      stadgar: richText('Klubbens stadgar finns tillgängliga som dokument under Dokumentarkiv.'),
    },
  })
  console.log('Seeded club-info')

  // ── Pages (placeholder content) ────────────────────────────────
  const pagesSeed = [
    { title: 'Flygregler', slug: 'flygregler', category: 'flygregler' as const, body: richText('Vid nerflyg utan höjdvinst ska alltid kabinbanevajrarna passeras söder om stötta 1. Piloter som är lokalt oerfarna, elevlicensare och P1:or följer alltid denna regel. Samarbetsavtalet med Skistar reglerar körning på Skistarvägar — maxhastighet 40 km/h, ingen uppkörning när liftarna körs för cykling, och grinden ska låsas efter nedkörning. Draklanda är den officiella landningsplatsen; alla andra landningar betraktas som utelandningar vid XC-flyg.'), order: 1 },
    { title: 'Säkerhet & nödsituation', slug: 'sakerhet', category: 'sakerhet' as const, body: richText('Vid nödsituation: ring 112 (SOS Alarm) för akutvård vid allvarlig sjukdom eller skada — de kan även stänga av strömmen i kontaktledningarna. Ring 1177 för sjukvårdsrådgivning vid lindrigare skador. Trafikverkets driftcentral i Ånge (+46 690 523 20) leder tågtrafiken och kan stänga av strömmen om du landat nära järnvägen. Vid landning på Draklanda vid öppet vatten krävs minst 25 höjdflygningar om piloten inte flyger under instruktörs ansvar. Landning nära bäckutloppet på Åresjön är förbjuden — isen är extremt svag där.'), order: 2 },
    { title: 'Cross country & luftrum', slug: 'xc', category: 'xc' as const, body: richText('Åre skärmflygklubb har ett samarbetsavtal med ATS Östersund för flygning inom ESNZ TMA, sektorerna Tore 4 och Tore 5 upp till FL 95 (daterat 2022-03-30). Dagen före: mejla ats.ostersund@lfv.se med planerat område, höjd, in- och utfartstider, rutt, radiofrekvens samt telefonnummer för mark och luft. Kontrollera öppettider på aro.lfv.se (tider i UTC). Flygdagen: ring tornet 08-511 886 17 strax innan start för klartecken. Om NOTAM visar öppet men tornet inte svarar efter två försök med fem minuters intervall, kontakta WS ATCC 08-858 547 00. Avgång och ändringar rapporteras omgående till ATS per telefon.'), order: 3 },
    { title: 'Acro', slug: 'acro', category: 'acro' as const, body: richText('Information om acroflygning, räddningsbåt och acrobox i Åre.'), order: 4 },
    { title: 'Speedrider', slug: 'speedrider', category: 'speedrider' as const, body: richText('Information om speedriding i Åreområdet. Kontakta klubben för aktuella regler.'), order: 5 },
    { title: 'Hängflyg', slug: 'hangflyg', category: 'hangflyg' as const, body: richText('Hängflygning har lång tradition på Åreskutan — klubben grundades 1975 som Åre Drakflygklubb. Under 1980-talet dominerades flygningen från Skutan av drakar, men på 1990-talet tog skärmarna över och idag görs ca 95 % av all flygning med skärm. Startplatserna är anpassade för båda typerna och hängflygare har generellt bredare vindtolerans. Distansrekordet för hängflygare från Åreskutan är 116 km.'), order: 6 },
    { title: 'Paramotor', slug: 'paramotor', category: 'paramotor' as const, body: richText('Information om paramotorflygning i Åreområdet. Kontakta klubben för aktuella regler.'), order: 7 },
    { title: 'Klubbprodukter', slug: 'klubbprodukter', category: 'klubbprodukter' as const, body: richText('Klubbtröjor och merchandise. Beställ via vår webbshop.'), order: 1 },
    { title: 'Stadgar', slug: 'stadgar', category: 'stadgar' as const, body: richText('Klubbens stadgar. Se dokumentarkivet för fullständigt dokument.'), order: 2 },
  ]

  for (const page of pagesSeed) {
    await payload.create({ collection: 'pages', data: page })
  }
  console.log(`Created ${pagesSeed.length} pages`)

  // ── Activities (sample) ────────────────────────────────────────
  await payload.create({
    collection: 'activities',
    data: {
      title: 'Årsmöte 2026',
      slug: 'arsmote-2026',
      type: 'arsmote',
      date: '2026-02-22',
      body: richText('Årsmöte hålls 22 februari kl 18:00 på Åre Fjällsätra.'),
    },
  })
  console.log('Created 1 activity')

  console.log('Seed complete')
  process.exit(0)
}

seed()

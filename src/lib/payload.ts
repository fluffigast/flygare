export const PAYLOAD_URL =
  import.meta.env.VITE_PAYLOAD_URL || 'http://localhost:3001'

// ── Types ──────────────────────────────────────────────

export interface NewsItem {
  id: string
  title: string
  category: string
  date: string
  image?: { url: string; alt?: string } | null
  description?: unknown
  featured?: boolean
}

export interface BoardMember {
  id: string
  name: string
  role: string
  sortOrder: number
}

export interface Launch {
  id: string
  name: string
  type: 'Starter' | 'Landning'
  direction?: string
  elevation?: string
  coords?: string
  heightDiff?: string
  description?: unknown
  extra?: unknown
  recommended?: boolean
  sortOrder?: number
}

export interface OtherSite {
  id: string
  name: string
  direction?: string
  elevationDrop?: string
  description?: unknown
  coords?: string
}

export interface Competition {
  id: string
  name: string
  status: 'Aktiv' | 'Avslutad'
  subtitle?: string
  description?: unknown
  rules?: { text: string; id?: string }[]
  winners?: { year: number; name: string; result: string; id?: string }[]
}

export interface Milestone {
  id: string
  year: number
  text: string
}

export interface WeatherLink {
  id: string
  label: string
  url: string
  sortOrder?: number
}

export interface SiteSettings {
  clubName?: string
  foundedYear?: number
  heroSubtitle?: string
  heroTagline?: string
  heroDescription?: string
  aboutTitle?: string
  aboutText?: unknown
  statsMembers?: string
  statsDistanceRecord?: string
  statsLaunchSites?: string
}

export interface MembershipInfo {
  price?: string
  validity?: string
  shopUrl?: string
  benefits?: { text: string; id?: string }[]
  licenseRequirements?: { level: string; requirements: string; id?: string }[]
}

export interface ContactInfo {
  email?: string
  facebookUrl?: string
  youtubeUrl?: string
  radioFrequencies?: { label: string; value: string; id?: string }[]
  emergencyContacts?: { label: string; description: string; phone?: string; id?: string }[]
  xcProcedures?: unknown
}

export interface BusRulesData {
  intro?: unknown
  rules?: { text: string; id?: string }[]
}

export interface FlyingGuide {
  winterTitle?: string
  winterContent?: unknown
  summerTitle?: string
  summerContent?: unknown
  hangGlidingTitle?: string
  hangGlidingContent?: unknown
  thermalMapTitle?: string
}

// ── Fallback data (used when CMS is unreachable) ──────

const FALLBACK_NEWS: NewsItem[] = [
  { id: '1', title: 'Välkommen till PPC Åre 2026', category: 'Tävlingar', date: '2026-03-20', featured: true },
  { id: '2', title: 'Klubbuss Kampanj', category: 'Aktiviteter', date: '2026-03-16', featured: true },
  { id: '3', title: 'Ny webbshop', category: 'Information', date: '2026-01-23' },
  { id: '4', title: 'Ansök om tävlingsstipendium', category: 'Aktiviteter', date: '2026-01-20' },
  { id: '5', title: 'Kallelse till Årsmöte 2026', category: 'Information', date: '2026-01-12' },
  { id: '6', title: 'Viktig info till alla flygare', category: 'Information', date: '2025-07-17' },
  { id: '7', title: 'Vinnare av topplandningstävlingen', category: 'Tävlingar', date: '2025-04-12' },
  { id: '8', title: '1000m projektet avslutat', category: 'Aktiviteter', date: '2025-04-12' },
]

const FALLBACK_BOARD: BoardMember[] = [
  { id: '1', name: 'Therese Bärfenheim', role: 'Ordförande', sortOrder: 1 },
  { id: '2', name: 'Vladimir Gutic', role: 'Vice ordförande', sortOrder: 2 },
  { id: '3', name: 'Alexander Kinde', role: 'Ledamot', sortOrder: 3 },
  { id: '4', name: 'Linda Kits', role: 'Kassör', sortOrder: 4 },
  { id: '5', name: 'Pontus Karlsson', role: 'Ledamot', sortOrder: 5 },
  { id: '6', name: 'Johan Bernalt', role: 'Suppleant', sortOrder: 6 },
  { id: '7', name: 'Elias Evertsson', role: 'Suppleant', sortOrder: 7 },
]

const FALLBACK_LAUNCHES: Launch[] = [
  { id: '1', name: '1000m starten', type: 'Starter', direction: 'SO–S (skärm), SO–SV (hängflyg)', elevation: '1000 m', coords: 'Nås via Kabinbanan', heightDiff: '905 m', recommended: true, sortOrder: 1 },
  { id: '2', name: 'Tväråvalvet', type: 'Starter', direction: 'NV (skärm), V–NV (hängflyg)', elevation: '~1050 m', coords: '63°25\'48"N, 13°04\'57"E', heightDiff: '925 m', recommended: true, sortOrder: 2 },
  { id: '3', name: 'Mörvikshummeln Väst', type: 'Starter', direction: 'S–SV', elevation: '~900 m', coords: '63°24\'43"N, 13°04\'41"E', heightDiff: '520 m', recommended: true, sortOrder: 3 },
  { id: '4', name: 'Mörvikshummeln Syd', type: 'Starter', direction: 'S', elevation: '~900 m', coords: '63°24\'38"N, 13°04\'59"E', heightDiff: '520 m', recommended: true, sortOrder: 4 },
  { id: '5', name: 'Mörvikshummeln Ost', type: 'Starter', direction: 'O–SO', elevation: '~900 m', coords: '63°24\'39"N, 13°05\'02"E', heightDiff: '510 m', recommended: true, sortOrder: 5 },
  { id: '6', name: 'Mörvikshummeln Nordost', type: 'Starter', direction: 'NO–N', elevation: '~900 m', coords: '63°24\'40"N, 13°05\'04"E', heightDiff: '525 m', recommended: true, sortOrder: 6 },
  { id: '7', name: 'Röda Rappet Väst', type: 'Starter', direction: 'V–NV', elevation: '~950 m', coords: '63°25\'34"N, 13°04\'13"E', heightDiff: '570 m', recommended: true, sortOrder: 7 },
  { id: '8', name: 'Långspannet', type: 'Starter', direction: 'S–SV', elevation: '~900 m', coords: 'Mellan stötta 3 och 4', heightDiff: '520 m', recommended: false, sortOrder: 8 },
  { id: '9', name: 'Draklanda', type: 'Landning', direction: 'Alla', elevation: '~380 m', coords: '1 km väster om torget', recommended: true, sortOrder: 9 },
]

const FALLBACK_OTHER_SITES: OtherSite[] = [
  { id: '1', name: 'Välliste, Trillevallen', direction: 'V–NV', elevationDrop: '~400 m' },
  { id: '2', name: 'Getryggen, Snasahögarna', direction: 'S–SV', elevationDrop: '~600 m' },
  { id: '3', name: 'Tossön, Järpen', direction: 'V', elevationDrop: '~350 m' },
  { id: '4', name: 'Rännberg, Gevsjön', direction: 'SO', elevationDrop: '~250 m' },
]

const FALLBACK_COMPETITIONS: Competition[] = [
  { id: '1', name: 'Åre PPC', status: 'Aktiv', subtitle: 'PoängPlockarCupen', rules: [], winners: [] },
  { id: '2', name: 'Larsa Open', status: 'Aktiv', subtitle: 'Fridistanstävling till Lars-Anders Jonssons minne', rules: [], winners: [{ year: 2020, name: 'Gillis Bengtsson', result: '99,0 km' }, { year: 2019, name: 'Andreas Florén', result: '46,1 km' }, { year: 2018, name: 'Patrik Nietlisbach', result: '91,1 km' }] },
  { id: '3', name: 'Topplandning', status: 'Aktiv', subtitle: 'Första termiken på säsongen', rules: [], winners: [{ year: 2020, name: 'Love Lundgren', result: '10 mars' }, { year: 2019, name: 'Andreas Florén', result: '26 mars' }] },
]

const FALLBACK_MILESTONES: Milestone[] = [
  { id: '1', year: 1975, text: 'Åre Drakflygklubb bildas' },
  { id: '2', year: 1988, text: 'Åre Skärmflygklubb bildas' },
  { id: '3', year: 1995, text: 'Klubbarna slås ihop' },
  { id: '4', year: 2023, text: '1000m-projektet slutförs' },
  { id: '5', year: 2026, text: '~100 aktiva medlemmar' },
]

const FALLBACK_WEATHER_LINKS: WeatherLink[] = [
  { id: '1', label: 'SMHI Fjällväder', url: 'https://www.smhi.se/vader/prognoser/fjallvader', sortOrder: 1 },
  { id: '2', label: 'Yr.no Åreskutan', url: 'https://www.yr.no/nb/detaljer/tabell/2-2720396/', sortOrder: 2 },
  { id: '3', label: 'XCMeteo', url: 'https://xcmeteo.com/', sortOrder: 3 },
  { id: '4', label: 'Windguru', url: 'https://www.windguru.cz/', sortOrder: 4 },
  { id: '5', label: 'Windy', url: 'https://www.windy.com/', sortOrder: 5 },
  { id: '6', label: 'TAF/METAR Frösön', url: 'https://www.aro.lfv.se/Links/Link/ViewLink?TorLinkId=314&type=MET', sortOrder: 6 },
  { id: '7', label: 'MEAC Hummeln', url: 'https://meac.se/sub_2/hummeln/wind.asp', sortOrder: 7 },
  { id: '8', label: 'MetOffice Isobarer', url: 'https://www.metoffice.gov.uk/weather/maps-and-charts/surface-pressure', sortOrder: 8 },
]

const FALLBACK_SITE_SETTINGS: SiteSettings = {
  clubName: 'Åre Skärm- och Drakflygklubb',
  foundedYear: 1975,
  heroSubtitle: 'Åre Skärm- och Drakflygklubb',
  heroTagline: 'Skandinaviens mest spektakulära flygplats',
  heroDescription: 'Jakten på termiken startar i mars. Har du tur får du sällskap av en kungsörn.',
  aboutTitle: '50 år av flygning från Skutan',
  statsMembers: '~100',
  statsDistanceRecord: '230 km',
  statsLaunchSites: '9',
}

const FALLBACK_MEMBERSHIP: MembershipInfo = {
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
}

const FALLBACK_CONTACT: ContactInfo = {
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
}

const FALLBACK_BUS_RULES: BusRulesData = {
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
}

const FALLBACK_FLYING_GUIDE: FlyingGuide = {
  winterTitle: 'Flyga på vintern',
  summerTitle: 'Flyga på sommaren',
  hangGlidingTitle: 'Hängflygning från Skutan',
  thermalMapTitle: 'Termikkarta Åre',
}

// ── Fetch helpers ──────────────────────────────────────

interface CollectionResponse<T> {
  docs: T[]
  totalDocs: number
}

async function fetchCollection<T>(slug: string, params = ''): Promise<T[]> {
  const res = await fetch(`${PAYLOAD_URL}/api/${slug}?limit=100${params}`)
  if (!res.ok) throw new Error(`Payload ${slug}: ${res.status}`)
  const json: CollectionResponse<T> = await res.json()
  return json.docs
}

async function fetchGlobal<T>(slug: string): Promise<T> {
  const res = await fetch(`${PAYLOAD_URL}/api/globals/${slug}`)
  if (!res.ok) throw new Error(`Payload global ${slug}: ${res.status}`)
  return res.json() as Promise<T>
}

// ── Collection fetchers ────────────────────────────────

export async function getNews(): Promise<NewsItem[]> {
  try {
    return await fetchCollection<NewsItem>('news', '&sort=-date')
  } catch (e) {
    console.error(e)
    return FALLBACK_NEWS
  }
}

export async function getBoardMembers(): Promise<BoardMember[]> {
  try {
    return await fetchCollection<BoardMember>('board-members', '&sort=sortOrder')
  } catch (e) {
    console.error(e)
    return FALLBACK_BOARD
  }
}

export async function getLaunches(): Promise<Launch[]> {
  try {
    return await fetchCollection<Launch>('launches', '&sort=sortOrder')
  } catch (e) {
    console.error(e)
    return FALLBACK_LAUNCHES
  }
}

export async function getOtherSites(): Promise<OtherSite[]> {
  try {
    return await fetchCollection<OtherSite>('other-sites')
  } catch (e) {
    console.error(e)
    return FALLBACK_OTHER_SITES
  }
}

export async function getCompetitions(): Promise<Competition[]> {
  try {
    return await fetchCollection<Competition>('competitions')
  } catch (e) {
    console.error(e)
    return FALLBACK_COMPETITIONS
  }
}

export async function getMilestones(): Promise<Milestone[]> {
  try {
    return await fetchCollection<Milestone>('milestones', '&sort=year')
  } catch (e) {
    console.error(e)
    return FALLBACK_MILESTONES
  }
}

export async function getWeatherLinks(): Promise<WeatherLink[]> {
  try {
    return await fetchCollection<WeatherLink>('weather-links', '&sort=sortOrder')
  } catch (e) {
    console.error(e)
    return FALLBACK_WEATHER_LINKS
  }
}

// ── Global fetchers ────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    return await fetchGlobal<SiteSettings>('site-settings')
  } catch (e) {
    console.error(e)
    return FALLBACK_SITE_SETTINGS
  }
}

export async function getMembershipInfo(): Promise<MembershipInfo> {
  try {
    return await fetchGlobal<MembershipInfo>('membership-info')
  } catch (e) {
    console.error(e)
    return FALLBACK_MEMBERSHIP
  }
}

export async function getContactInfo(): Promise<ContactInfo> {
  try {
    return await fetchGlobal<ContactInfo>('contact-info')
  } catch (e) {
    console.error(e)
    return FALLBACK_CONTACT
  }
}

export async function getBusRules(): Promise<BusRulesData> {
  try {
    return await fetchGlobal<BusRulesData>('bus-rules')
  } catch (e) {
    console.error(e)
    return FALLBACK_BUS_RULES
  }
}

export async function getFlyingGuide(): Promise<FlyingGuide> {
  try {
    return await fetchGlobal<FlyingGuide>('flying-guide')
  } catch (e) {
    console.error(e)
    return FALLBACK_FLYING_GUIDE
  }
}

// ── Rich text helper ───────────────────────────────────

export function richTextToPlain(node: unknown): string {
  if (!node) return ''
  if (typeof node === 'string') return node

  const n = node as Record<string, unknown>

  // Lexical text node
  if (n.text && typeof n.text === 'string') {
    return n.text
  }

  // Root with children array
  if (Array.isArray(n.children)) {
    return (n.children as unknown[])
      .map((child) => richTextToPlain(child))
      .join(n.type === 'root' ? '\n\n' : '')
  }

  // Payload v3 wraps in { root: { children: [...] } }
  if (n.root) {
    return richTextToPlain(n.root)
  }

  return ''
}

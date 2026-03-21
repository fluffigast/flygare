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
    return []
  }
}

export async function getBoardMembers(): Promise<BoardMember[]> {
  try {
    return await fetchCollection<BoardMember>('board-members', '&sort=sortOrder')
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function getLaunches(): Promise<Launch[]> {
  try {
    return await fetchCollection<Launch>('launches', '&sort=sortOrder')
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function getOtherSites(): Promise<OtherSite[]> {
  try {
    return await fetchCollection<OtherSite>('other-sites')
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function getCompetitions(): Promise<Competition[]> {
  try {
    return await fetchCollection<Competition>('competitions')
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function getMilestones(): Promise<Milestone[]> {
  try {
    return await fetchCollection<Milestone>('milestones', '&sort=year')
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function getWeatherLinks(): Promise<WeatherLink[]> {
  try {
    return await fetchCollection<WeatherLink>('weather-links', '&sort=sortOrder')
  } catch (e) {
    console.error(e)
    return []
  }
}

// ── Global fetchers ────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    return await fetchGlobal<SiteSettings>('site-settings')
  } catch (e) {
    console.error(e)
    return {}
  }
}

export async function getMembershipInfo(): Promise<MembershipInfo> {
  try {
    return await fetchGlobal<MembershipInfo>('membership-info')
  } catch (e) {
    console.error(e)
    return {}
  }
}

export async function getContactInfo(): Promise<ContactInfo> {
  try {
    return await fetchGlobal<ContactInfo>('contact-info')
  } catch (e) {
    console.error(e)
    return {}
  }
}

export async function getBusRules(): Promise<BusRulesData> {
  try {
    return await fetchGlobal<BusRulesData>('bus-rules')
  } catch (e) {
    console.error(e)
    return {}
  }
}

export async function getFlyingGuide(): Promise<FlyingGuide> {
  try {
    return await fetchGlobal<FlyingGuide>('flying-guide')
  } catch (e) {
    console.error(e)
    return {}
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

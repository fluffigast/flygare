import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { News } from './collections/News'
import { BoardMembers } from './collections/BoardMembers'
import { Launches } from './collections/Launches'
import { OtherSites } from './collections/OtherSites'
import { Competitions } from './collections/Competitions'
import { Milestones } from './collections/Milestones'
import { WeatherLinks } from './collections/WeatherLinks'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { SiteSettings } from './globals/SiteSettings'
import { MembershipInfo } from './globals/MembershipInfo'
import { ContactInfo } from './globals/ContactInfo'
import { BusRules } from './globals/BusRules'
import { FlyingGuide } from './globals/FlyingGuide'
import { Pages } from './collections/Pages'
import { Activities } from './collections/Activities'
import { Documents } from './collections/Documents'
import { Photos } from './collections/Photos'
import { Links } from './collections/Links'
import { SiteNavigation } from './globals/SiteNavigation'
import { ClubInfo } from './globals/ClubInfo'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    meta: {
      title: 'Flygare CMS',
      description: 'Åre Skärm- och Drakflygklubb',
    },
    livePreview: {
      url: ({ data, collectionConfig, globalConfig }) => {
        const base = process.env.FRONTEND_URL || 'http://localhost:5173'
        const slug = collectionConfig?.slug || globalConfig?.slug

        // Mapping från legacy category till URL-section för Pages-collection.
        // Nyare rader ska ha `section` satt direkt.
        const legacyCategoryToSection: Record<string, string> = {
          klubbprodukter: 'om',
          stadgar: 'om',
          tavling: 'tavlingar',
          aktivitet: 'aktiviteter',
          // Övriga (flygregler, sakerhet, xc, klubbuss, skistar, acro,
          // speedrider, hangflyg, paramotor, startplatser, vader) mappas
          // till flyga-i-are — samma standard som förut.
        }

        const pagesUrl = () => {
          const s = data?.slug ?? ''
          const section =
            data?.section ??
            legacyCategoryToSection[data?.category] ??
            'flyga-i-are'
          return `/${section}/${s}`
        }

        const activityUrl = () => {
          const structuralSlugs = ['kalender', 'klubbresor', 'arsmoten', 'ovriga-aktiviteter']
          const s = data?.slug ?? ''
          if (structuralSlugs.includes(s)) return `/aktiviteter/${s}`
          return s ? `/aktiviteter/${s}` : '/aktiviteter'
        }

        const routes: Record<string, string> = {
          'news': data?.slug ? `/nyheter/${data.slug}` : '/nyheter',
          'board-members': '/om/styrelsen',
          'milestones': '/om',
          'launches': data?.slug ? `/flyga-i-are/startplatser/${data.slug}` : '/flyga-i-are/startplatser',
          'competitions': data?.slug ? `/tavlingar/${data.slug}` : '/tavlingar',
          'weather-links': '/flyga-i-are/vader',
          'pages': pagesUrl(),
          'activities': activityUrl(),
          'documents': '/ovrigt/dokument',
          'photos': '/ovrigt/foton',
          'links': '/',
          'site-settings': '/',
          'site-navigation': '/',
          'membership-info': '/bli-medlem',
          'contact-info': '/kontakt',
          'bus-rules': '/flyga-i-are/klubbuss',
          'flying-guide': '/flyga-i-are',
          'club-info': '/om',
        }
        return `${base}${routes[slug ?? ''] ?? '/'}`
      },
      collections: ['news', 'board-members', 'launches', 'competitions', 'milestones', 'weather-links', 'pages', 'activities', 'documents', 'photos'],
      globals: ['site-settings', 'membership-info', 'contact-info', 'bus-rules', 'flying-guide', 'site-navigation', 'club-info'],
    },
  },
  editor: lexicalEditor(),
  collections: [
    News,
    BoardMembers,
    Launches,
    OtherSites,
    Competitions,
    Milestones,
    WeatherLinks,
    Media,
    Users,
    Pages,
    Activities,
    Documents,
    Photos,
    Links,
  ],
  globals: [
    SiteSettings,
    MembershipInfo,
    ContactInfo,
    BusRules,
    FlyingGuide,
    SiteNavigation,
    ClubInfo,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL!,
    },
    // push=true skippas ändå i production (NODE_ENV=production).
    // I dev pushar Payload schema-diffar direkt till DB.
    // I prod ansvarar migrations-filerna i src/migrations/ för schema-
    // ändringar och körs via `payload migrate` (CI-steg före deploy).
    push: process.env.NODE_ENV !== 'production',
  }),
  upload: {
    limits: {
      fileSize: 25_000_000,
    },
  },
  sharp,
  secret: process.env.PAYLOAD_SECRET!,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : ['http://localhost:5173'],
})

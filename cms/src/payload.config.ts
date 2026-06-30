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
        const routes: Record<string, string> = {
          'news': data?.slug ? `/nyheter/${data.slug}` : '/nyheter',
          'board-members': '/om/styrelsen',
          'milestones': '/om',
          'launches': data?.slug ? `/flyga-i-are/startplatser/${data.slug}` : '/flyga-i-are/startplatser',
          'competitions': '/tavlingar',
          'weather-links': '/flyga-i-are/vader',
          'pages': ['klubbprodukter', 'stadgar'].includes(data?.category)
            ? `/om/${data?.slug ?? ''}`
            : `/flyga-i-are/${data?.slug ?? ''}`,
          'activities': '/aktiviteter',
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
    push: true,
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

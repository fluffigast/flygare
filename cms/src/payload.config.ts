import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    meta: {
      title: 'Flygare CMS',
      description: 'Åre Skärm- och Drakflygklubb',
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
  ],
  globals: [
    SiteSettings,
    MembershipInfo,
    ContactInfo,
    BusRules,
    FlyingGuide,
  ],
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL!,
    },
  }),
  upload: {
    limits: {
      fileSize: 5000000,
    },
  },
  secret: process.env.PAYLOAD_SECRET!,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : ['http://localhost:5173'],
})

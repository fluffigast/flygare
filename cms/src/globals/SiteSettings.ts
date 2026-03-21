import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'clubName',
      type: 'text',
      defaultValue: 'Åre Skärm- och Drakflygklubb',
    },
    {
      name: 'foundedYear',
      type: 'number',
      defaultValue: 1975,
    },
    {
      name: 'heroSubtitle',
      type: 'text',
    },
    {
      name: 'heroTagline',
      type: 'text',
    },
    {
      name: 'heroDescription',
      type: 'textarea',
    },
    {
      name: 'aboutTitle',
      type: 'text',
    },
    {
      name: 'aboutText',
      type: 'richText',
    },
    {
      name: 'statsMembers',
      type: 'text',
      defaultValue: '~100',
    },
    {
      name: 'statsDistanceRecord',
      type: 'text',
      defaultValue: '230 km',
    },
    {
      name: 'statsLaunchSites',
      type: 'text',
      defaultValue: '9',
    },
  ],
}

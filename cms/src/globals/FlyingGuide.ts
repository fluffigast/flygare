import type { GlobalConfig } from 'payload'

export const FlyingGuide: GlobalConfig = {
  slug: 'flying-guide',
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'winterTitle',
      type: 'text',
    },
    {
      name: 'winterContent',
      type: 'richText',
    },
    {
      name: 'summerTitle',
      type: 'text',
    },
    {
      name: 'summerContent',
      type: 'richText',
    },
    {
      name: 'hangGlidingTitle',
      type: 'text',
    },
    {
      name: 'hangGlidingContent',
      type: 'richText',
    },
    {
      name: 'thermalMapTitle',
      type: 'text',
    },
  ],
}

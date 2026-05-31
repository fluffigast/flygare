import type { GlobalConfig } from 'payload'

export const ClubInfo: GlobalConfig = {
  slug: 'club-info',
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'history', type: 'richText' },
    {
      name: 'records',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'year', type: 'number' },
      ],
    },
    { name: 'clubProducts', type: 'richText' },
    { name: 'shopUrl', type: 'text' },
    { name: 'stadgar', type: 'richText' },
  ],
}

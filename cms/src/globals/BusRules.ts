import type { GlobalConfig } from 'payload'

export const BusRules: GlobalConfig = {
  slug: 'bus-rules',
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'intro',
      type: 'richText',
    },
    {
      name: 'rules',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

import type { GlobalConfig } from 'payload'

export const BusRules: GlobalConfig = {
  slug: 'bus-rules',
  access: {
    read: () => true,
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

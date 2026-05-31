import type { GlobalConfig } from 'payload'

export const SiteNavigation: GlobalConfig = {
  slug: 'site-navigation',
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'path', type: 'text', required: true },
        { name: 'external', type: 'checkbox', defaultValue: false },
        {
          name: 'children',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'path', type: 'text', required: true },
            { name: 'external', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
  ],
}

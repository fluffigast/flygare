import type { CollectionConfig } from 'payload'

export const OtherSites: CollectionConfig = {
  slug: 'other-sites',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'direction',
      type: 'text',
    },
    {
      name: 'elevationDrop',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'coords',
      type: 'text',
    },
  ],
}

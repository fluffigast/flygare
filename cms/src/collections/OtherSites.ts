import type { CollectionConfig } from 'payload'

export const OtherSites: CollectionConfig = {
  slug: 'other-sites',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
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

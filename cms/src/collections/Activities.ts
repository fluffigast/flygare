import type { CollectionConfig } from 'payload'

export const Activities: CollectionConfig = {
  slug: 'activities',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'date'],
  },
  defaultSort: '-date',
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Kalender', value: 'kalender' },
        { label: 'Klubbresa', value: 'klubbresa' },
        { label: 'Årsmöte', value: 'arsmote' },
        { label: 'Övrigt', value: 'ovrigt' },
      ],
    },
    { name: 'date', type: 'date', required: true },
    {
      name: 'location',
      type: 'text',
      admin: { description: 'Plats/mötesplats (valfri).' },
    },
    { name: 'body', type: 'richText' },
    {
      name: 'attachments',
      type: 'array',
      fields: [
        { name: 'file', type: 'upload', relationTo: 'media', required: true },
      ],
    },
  ],
}

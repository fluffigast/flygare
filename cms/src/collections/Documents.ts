import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year'],
  },
  defaultSort: '-year',
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Årsmöte', value: 'arsmote' },
        { label: 'Stadgar', value: 'stadgar' },
        { label: 'Övrigt', value: 'ovrigt' },
      ],
    },
    { name: 'file', type: 'upload', relationTo: 'media', required: true },
    { name: 'year', type: 'number' },
  ],
}

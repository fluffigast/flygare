import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order'],
  },
  defaultSort: 'order',
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Flygregler', value: 'flygregler' },
        { label: 'Säkerhet', value: 'sakerhet' },
        { label: 'Cross country', value: 'xc' },
        { label: 'Acro', value: 'acro' },
        { label: 'Speedrider', value: 'speedrider' },
        { label: 'Hängflyg', value: 'hangflyg' },
        { label: 'Paramotor', value: 'paramotor' },
        { label: 'Klubbuss', value: 'klubbuss' },
        { label: 'Stadgar', value: 'stadgar' },
        { label: 'Klubbprodukter', value: 'klubbprodukter' },
      ],
    },
    { name: 'body', type: 'richText', required: true },
    { name: 'order', type: 'number', defaultValue: 0 },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}

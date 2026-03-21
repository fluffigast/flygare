import type { CollectionConfig } from 'payload'

export const Launches: CollectionConfig = {
  slug: 'launches',
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
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Starter', value: 'Starter' },
        { label: 'Landning', value: 'Landning' },
      ],
    },
    {
      name: 'direction',
      type: 'text',
    },
    {
      name: 'elevation',
      type: 'text',
    },
    {
      name: 'coords',
      type: 'text',
    },
    {
      name: 'heightDiff',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'extra',
      type: 'richText',
    },
    {
      name: 'recommended',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
  ],
}

import type { CollectionConfig } from 'payload'

export const Competitions: CollectionConfig = {
  slug: 'competitions',
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
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        description: 'URL-slug (ex: are-ppc → /tavlingar/are-ppc). Om tom visas tävlingen bara i översikten.',
      },
    },
    {
      name: 'signupUrl',
      type: 'text',
      admin: { description: 'Länk till anmälan (valfri).' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Aktiv', value: 'Aktiv' },
        { label: 'Avslutad', value: 'Avslutad' },
      ],
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'description',
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
    {
      name: 'winners',
      type: 'array',
      fields: [
        {
          name: 'year',
          type: 'number',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'result',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

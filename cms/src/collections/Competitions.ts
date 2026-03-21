import type { CollectionConfig } from 'payload'

export const Competitions: CollectionConfig = {
  slug: 'competitions',
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

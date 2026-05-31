import type { GlobalConfig } from 'payload'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      defaultValue: 'info@flygare.nu',
    },
    {
      name: 'facebook',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Facebook — Åre Skärmflygklubb' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'youtube',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'YouTube — Åre Skärmflygklubb' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'radioFrequencies',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'emergencyContacts',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
        },
      ],
    },
    {
      name: 'xcProcedures',
      type: 'richText',
    },
    {
      name: 'besoksadress',
      type: 'text',
    },
    {
      name: 'organisationsnummer',
      type: 'text',
    },
  ],
}

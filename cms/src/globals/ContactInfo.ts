import type { GlobalConfig } from 'payload'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      defaultValue: 'info@flygare.nu',
    },
    {
      name: 'facebookUrl',
      type: 'text',
    },
    {
      name: 'youtubeUrl',
      type: 'text',
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
  ],
}

import type { GlobalConfig } from 'payload'

export const MembershipInfo: GlobalConfig = {
  slug: 'membership-info',
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'price',
      type: 'text',
      defaultValue: '600 kr / år',
    },
    {
      name: 'validity',
      type: 'text',
    },
    {
      name: 'shopUrl',
      type: 'text',
    },
    {
      name: 'benefits',
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
      name: 'licenseRequirements',
      type: 'array',
      fields: [
        {
          name: 'level',
          type: 'text',
          required: true,
        },
        {
          name: 'requirements',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

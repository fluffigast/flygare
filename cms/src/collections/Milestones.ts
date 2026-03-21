import type { CollectionConfig } from 'payload'

export const Milestones: CollectionConfig = {
  slug: 'milestones',
  admin: {
    useAsTitle: 'text',
  },
  defaultSort: 'year',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'year',
      type: 'number',
      required: true,
    },
    {
      name: 'text',
      type: 'text',
      required: true,
    },
  ],
}

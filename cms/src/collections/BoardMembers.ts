import type { CollectionConfig } from 'payload'

export const BoardMembers: CollectionConfig = {
  slug: 'board-members',
  admin: {
    useAsTitle: 'name',
  },
  defaultSort: 'sortOrder',
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
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
  ],
}

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
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Starter', value: 'Starter' },
        { label: 'Landning', value: 'Landning' },
      ],
    },
    { name: 'excerpt', type: 'textarea' },
    // Position
    {
      name: 'position',
      type: 'group',
      fields: [
        { name: 'wgs84Lat', type: 'number' },
        { name: 'wgs84Lon', type: 'number' },
        { name: 'sweref99Lat', type: 'number' },
        { name: 'sweref99Lon', type: 'number' },
      ],
    },
    // Altitude
    { name: 'altitudeMeters', type: 'number' },
    { name: 'heightAboveLanding', type: 'number' },
    // Wind
    { name: 'windDirMin', type: 'number' },
    { name: 'windDirMax', type: 'number' },
    { name: 'windNotes', type: 'textarea' },
    // Experience
    {
      name: 'experienceLevel',
      type: 'select',
      options: [
        { label: 'Nybörjare', value: 'nybörjare' },
        { label: 'Medel', value: 'medel' },
        { label: 'Avancerad', value: 'avancerad' },
      ],
    },
    { name: 'experienceNotes', type: 'text' },
    // Content
    { name: 'description', type: 'richText' },
    {
      name: 'risks',
      type: 'array',
      fields: [
        { name: 'text', type: 'text', required: true },
      ],
    },
    // Emergency
    { name: 'emergencyLocation', type: 'text' },
    // Legacy fields
    { name: 'extra', type: 'richText' },
    { name: 'recommended', type: 'checkbox', defaultValue: true },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ],
}

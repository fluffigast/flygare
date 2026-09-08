import type { CollectionConfig } from 'payload'

// Section-värden mappar 1:1 mot URL-section-prefix i frontend-routes.
// Vid tillägg av ny section: uppdatera även livePreview i payload.config.ts.
export const PAGE_SECTIONS = [
  { label: 'Flyga i Åre',   value: 'flyga-i-are' },
  { label: 'Aktiviteter',   value: 'aktiviteter' },
  { label: 'Tävling',       value: 'tavlingar' },
  { label: 'Om klubben',    value: 'om' },
] as const

// Behåll category enum för bakåtkompatibilitet (befintliga rader). Nya
// pptx-slugs adderade. Fältet kommer att fasas ut när `section` är fyllt
// för alla rader (se cms/src/migrations/migrate-pages-section.ts).
const LEGACY_CATEGORIES = [
  { label: 'Flygregler',        value: 'flygregler' },
  { label: 'Säkerhet',          value: 'sakerhet' },
  { label: 'Cross country',     value: 'xc' },
  { label: 'Klubbuss',          value: 'klubbuss' },
  { label: 'Stadgar',           value: 'stadgar' },
  { label: 'Klubbprodukter',    value: 'klubbprodukter' },
  { label: 'Skistar-avtal',     value: 'skistar' },
  { label: 'Acro',              value: 'acro' },
  { label: 'Speedrider',        value: 'speedrider' },
  { label: 'Hängflyg',          value: 'hangflyg' },
  { label: 'Paramotor',         value: 'paramotor' },
  { label: 'Startplatser',      value: 'startplatser' },
  { label: 'Väder',             value: 'vader' },
  { label: 'Aktivitet',         value: 'aktivitet' },
  { label: 'Tävling',           value: 'tavling' },
  { label: 'Övrigt',            value: 'ovrigt' },
]

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'section', 'slug', 'order'],
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
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL-slug (ex: skistar → /flyga-i-are/skistar).' },
    },
    {
      name: 'section',
      type: 'select',
      required: false,
      options: PAGE_SECTIONS as unknown as { label: string; value: string }[],
      admin: {
        description: 'Vilken menysektion sidan hör till. Används för URL-routing i live-preview.',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: LEGACY_CATEGORIES,
      admin: {
        description: 'Legacy — används av äldre rader. Nya sidor: sätt även "section".',
      },
    },
    {
      name: 'lede',
      type: 'text',
      admin: { description: 'Ingressraden ovanför brödtexten (valfri).' },
    },
    { name: 'body', type: 'richText' },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Sortering inom sektionen (lägre nummer visas först).' },
    },
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

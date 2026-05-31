# Navigation + CMS Collections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure navigation to match PPTX spec, add new CMS collections/globals, wire frontend with live preview, and extend QC tests.

**Architecture:** New Payload CMS collections (`pages`, `activities`, `documents`, `photos`, `links`) and globals (`site-navigation`, `club-info`) follow existing patterns. Frontend gets a generic `PageView` component for CMS-driven content pages. Header rebuilt with dropdown menus reading from CMS `site-navigation` global. All new routes use existing `useCMSData` + `useGlobalLivePreview` hooks.

**Tech Stack:** Payload CMS 3.x, React 19, Tailwind 4, react-router, @payloadcms/live-preview-react

---

## File Map

**CMS — new files:**
- `cms/src/collections/Pages.ts` — generic content pages collection
- `cms/src/collections/Activities.ts` — activities/events collection
- `cms/src/collections/Documents.ts` — document archive collection
- `cms/src/collections/Photos.ts` — photo gallery collection
- `cms/src/collections/Links.ts` — external links collection
- `cms/src/globals/SiteNavigation.ts` — nav structure global
- `cms/src/globals/ClubInfo.ts` — club history/products/stadgar global

**CMS — modified files:**
- `cms/src/payload.config.ts` — register new collections/globals, update livePreview routes
- `cms/src/collections/News.ts` — update category options
- `cms/src/globals/ContactInfo.ts` — add besöksadress, organisationsnummer fields
- `cms/src/seed/index.ts` — seed new collections/globals with placeholder content

**Frontend — new files:**
- `src/views/page/page-view.tsx` — generic CMS page renderer
- `src/views/flyga-i-are/flyga-i-are-index.tsx` — flying guide index page
- `src/views/flyga-i-are/klubbuss-view.tsx` — bus rules page
- `src/views/om/styrelsen-view.tsx` — board members page (extracted from om)
- `src/views/aktiviteter/aktiviteter-view.tsx` — activities list
- `src/views/ovrigt/foton-view.tsx` — photo gallery
- `src/views/ovrigt/dokument-view.tsx` — document archive
- `src/data/navigation.ts` — local nav fallback data
- `src/data/pages.ts` — local pages fallback data
- `src/data/club-info.ts` — local club-info fallback data

**Frontend — modified files:**
- `src/components/header.tsx` — dropdown nav, CMS-driven
- `src/hooks/useCMS.ts` — add hooks for new collections/globals
- `src/main.tsx` — add new routes
- `src/layouts/main-layout.tsx` — update if needed for nested route layouts

**Tests — modified files:**
- `tests/qc-live.spec.ts` — extend with new pages, nav tests, CMS API tests

---

### Task 1: CMS — New collections

**Files:**
- Create: `cms/src/collections/Pages.ts`
- Create: `cms/src/collections/Activities.ts`
- Create: `cms/src/collections/Documents.ts`
- Create: `cms/src/collections/Photos.ts`
- Create: `cms/src/collections/Links.ts`

- [ ] **Step 1: Create Pages collection**

```typescript
// cms/src/collections/Pages.ts
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order'],
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
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Flygregler', value: 'flygregler' },
        { label: 'Säkerhet', value: 'sakerhet' },
        { label: 'Cross country', value: 'xc' },
        { label: 'Acro', value: 'acro' },
        { label: 'Speedrider', value: 'speedrider' },
        { label: 'Hängflyg', value: 'hangflyg' },
        { label: 'Paramotor', value: 'paramotor' },
        { label: 'Klubbuss', value: 'klubbuss' },
        { label: 'Stadgar', value: 'stadgar' },
        { label: 'Klubbprodukter', value: 'klubbprodukter' },
      ],
    },
    { name: 'body', type: 'richText', required: true },
    { name: 'order', type: 'number', defaultValue: 0 },
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
```

- [ ] **Step 2: Create Activities collection**

```typescript
// cms/src/collections/Activities.ts
import type { CollectionConfig } from 'payload'

export const Activities: CollectionConfig = {
  slug: 'activities',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'date'],
  },
  defaultSort: '-date',
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Kalender', value: 'kalender' },
        { label: 'Klubbresa', value: 'klubbresa' },
        { label: 'Årsmöte', value: 'arsmote' },
        { label: 'Övrigt', value: 'ovrigt' },
      ],
    },
    { name: 'date', type: 'date', required: true },
    { name: 'body', type: 'richText' },
    {
      name: 'attachments',
      type: 'array',
      fields: [
        { name: 'file', type: 'upload', relationTo: 'media', required: true },
      ],
    },
  ],
}
```

- [ ] **Step 3: Create Documents collection**

```typescript
// cms/src/collections/Documents.ts
import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year'],
  },
  defaultSort: '-year',
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Årsmöte', value: 'arsmote' },
        { label: 'Stadgar', value: 'stadgar' },
        { label: 'Övrigt', value: 'ovrigt' },
      ],
    },
    { name: 'file', type: 'upload', relationTo: 'media', required: true },
    { name: 'year', type: 'number' },
  ],
}
```

- [ ] **Step 4: Create Photos collection**

```typescript
// cms/src/collections/Photos.ts
import type { CollectionConfig } from 'payload'

export const Photos: CollectionConfig = {
  slug: 'photos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year'],
  },
  defaultSort: '-year',
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'year', type: 'number', required: true },
    {
      name: 'images',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
  ],
}
```

- [ ] **Step 5: Create Links collection**

```typescript
// cms/src/collections/Links.ts
import type { CollectionConfig } from 'payload'

export const Links: CollectionConfig = {
  slug: 'links',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order'],
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
    { name: 'url', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Extern', value: 'external' },
        { label: 'Partner', value: 'partner' },
        { label: 'Resurs', value: 'resource' },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
```

- [ ] **Step 6: Commit**

```bash
git add cms/src/collections/Pages.ts cms/src/collections/Activities.ts cms/src/collections/Documents.ts cms/src/collections/Photos.ts cms/src/collections/Links.ts
git commit -m "feat(cms): add Pages, Activities, Documents, Photos, Links collections"
```

---

### Task 2: CMS — New globals + update existing

**Files:**
- Create: `cms/src/globals/SiteNavigation.ts`
- Create: `cms/src/globals/ClubInfo.ts`
- Modify: `cms/src/globals/ContactInfo.ts`
- Modify: `cms/src/collections/News.ts`

- [ ] **Step 1: Create SiteNavigation global**

```typescript
// cms/src/globals/SiteNavigation.ts
import type { GlobalConfig } from 'payload'

export const SiteNavigation: GlobalConfig = {
  slug: 'site-navigation',
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'path', type: 'text', required: true },
        { name: 'external', type: 'checkbox', defaultValue: false },
        {
          name: 'children',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'path', type: 'text', required: true },
            { name: 'external', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
  ],
}
```

- [ ] **Step 2: Create ClubInfo global**

```typescript
// cms/src/globals/ClubInfo.ts
import type { GlobalConfig } from 'payload'

export const ClubInfo: GlobalConfig = {
  slug: 'club-info',
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'history', type: 'richText' },
    {
      name: 'records',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'year', type: 'number' },
      ],
    },
    { name: 'clubProducts', type: 'richText' },
    { name: 'shopUrl', type: 'text' },
    { name: 'stadgar', type: 'richText' },
  ],
}
```

- [ ] **Step 3: Update ContactInfo — add besöksadress and organisationsnummer**

Add these two fields at the end of the `fields` array in `cms/src/globals/ContactInfo.ts`:

```typescript
    {
      name: 'besoksadress',
      type: 'text',
    },
    {
      name: 'organisationsnummer',
      type: 'text',
    },
```

- [ ] **Step 4: Update News — match PPTX category options**

In `cms/src/collections/News.ts`, replace the category options:

```typescript
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Aktiviteter', value: 'Aktiviteter' },
        { label: 'Information', value: 'Information' },
        { label: 'Tävlingar', value: 'Tävlingar' },
        { label: 'Övrigt', value: 'Övrigt' },
      ],
    },
```

- [ ] **Step 5: Commit**

```bash
git add cms/src/globals/SiteNavigation.ts cms/src/globals/ClubInfo.ts cms/src/globals/ContactInfo.ts cms/src/collections/News.ts
git commit -m "feat(cms): add SiteNavigation, ClubInfo globals, update ContactInfo and News categories"
```

---

### Task 3: CMS — Register in config + update live preview

**Files:**
- Modify: `cms/src/payload.config.ts`

- [ ] **Step 1: Add imports for new collections and globals**

Add after the existing imports in `cms/src/payload.config.ts`:

```typescript
import { Pages } from './collections/Pages'
import { Activities } from './collections/Activities'
import { Documents } from './collections/Documents'
import { Photos } from './collections/Photos'
import { Links } from './collections/Links'
import { SiteNavigation } from './globals/SiteNavigation'
import { ClubInfo } from './globals/ClubInfo'
```

- [ ] **Step 2: Add to collections array**

Add `Pages, Activities, Documents, Photos, Links` to the `collections` array:

```typescript
  collections: [
    News,
    BoardMembers,
    Launches,
    OtherSites,
    Competitions,
    Milestones,
    WeatherLinks,
    Media,
    Users,
    Pages,
    Activities,
    Documents,
    Photos,
    Links,
  ],
```

- [ ] **Step 3: Add to globals array**

Add `SiteNavigation, ClubInfo` to the `globals` array:

```typescript
  globals: [
    SiteSettings,
    MembershipInfo,
    ContactInfo,
    BusRules,
    FlyingGuide,
    SiteNavigation,
    ClubInfo,
  ],
```

- [ ] **Step 4: Update livePreview routes map**

Replace the `routes` object in the `livePreview.url` function:

```typescript
        const routes: Record<string, string> = {
          'news': '/nyheter',
          'board-members': '/om/styrelsen',
          'milestones': '/om',
          'launches': '/flyga-i-are/startplatser',
          'competitions': '/tavlingar',
          'weather-links': '/flyga-i-are/vader',
          'pages': `/flyga-i-are/${data?.slug ?? ''}`,
          'activities': '/aktiviteter',
          'documents': '/ovrigt/dokument',
          'photos': '/ovrigt/foton',
          'links': '/',
          'site-settings': '/',
          'site-navigation': '/',
          'membership-info': '/bli-medlem',
          'contact-info': '/kontakt',
          'bus-rules': '/flyga-i-are/klubbuss',
          'flying-guide': '/flyga-i-are',
          'club-info': '/om',
        }
```

- [ ] **Step 5: Update livePreview collections and globals arrays**

```typescript
      collections: ['news', 'board-members', 'launches', 'competitions', 'milestones', 'weather-links', 'pages', 'activities', 'documents', 'photos'],
      globals: ['site-settings', 'membership-info', 'contact-info', 'bus-rules', 'flying-guide', 'site-navigation', 'club-info'],
```

- [ ] **Step 6: Commit**

```bash
git add cms/src/payload.config.ts
git commit -m "feat(cms): register new collections/globals, update live preview routes"
```

---

### Task 4: CMS — Seed data for new collections/globals

**Files:**
- Modify: `cms/src/seed/index.ts`

- [ ] **Step 1: Add seed data for site-navigation global**

Add after the existing global seeds at the end of the `seed()` function (before `process.exit(0)`):

```typescript
  // ── Global: SiteNavigation ─────────────────────────────────────
  await payload.updateGlobal({
    slug: 'site-navigation',
    data: {
      sections: [
        { label: 'Hem', path: '/', children: [] },
        {
          label: 'Flyga i Åre',
          path: '/flyga-i-are',
          children: [
            { label: 'Starter & landningar', path: '/flyga-i-are/startplatser' },
            { label: 'Väder', path: '/flyga-i-are/vader' },
            { label: 'Flygregler', path: '/flyga-i-are/flygregler' },
            { label: 'Säkerhet & nödsituation', path: '/flyga-i-are/sakerhet' },
            { label: 'Cross country & luftrum', path: '/flyga-i-are/xc' },
            { label: 'Acro', path: '/flyga-i-are/acro' },
            { label: 'Speedrider', path: '/flyga-i-are/speedrider' },
            { label: 'Hängflyg', path: '/flyga-i-are/hangflyg' },
            { label: 'Paramotor', path: '/flyga-i-are/paramotor' },
            { label: 'Klubbuss & räddningsbåt', path: '/flyga-i-are/klubbuss' },
          ],
        },
        { label: 'Nyheter', path: '/nyheter', children: [] },
        { label: 'Aktiviteter', path: '/aktiviteter', children: [] },
        { label: 'Tävling', path: '/tavlingar', children: [] },
        {
          label: 'Om klubben',
          path: '/om',
          children: [
            { label: 'Historia & nutid', path: '/om' },
            { label: 'Styrelsen', path: '/om/styrelsen' },
            { label: 'Kontakt', path: '/kontakt' },
            { label: 'Klubbprodukter', path: '/om/klubbprodukter' },
            { label: 'Stadgar', path: '/om/stadgar' },
            { label: 'Bli medlem', path: '/bli-medlem' },
          ],
        },
        {
          label: 'Övrigt',
          path: '/ovrigt',
          children: [
            { label: 'Foton', path: '/ovrigt/foton' },
            { label: 'Dokumentarkiv', path: '/ovrigt/dokument' },
            { label: 'Skärmflygförbundet', path: 'https://www.paragliding.se', external: true },
          ],
        },
      ],
    },
  })
  console.log('Seeded site-navigation')
```

- [ ] **Step 2: Add seed data for club-info global**

```typescript
  // ── Global: ClubInfo ───────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'club-info',
    data: {
      history: richText(
        'Åre Drakflygklubb bildades 1975 och är en av Sveriges äldsta drakflygklubbar. Under 80-talet dominerade draken, men på 90-talet tog skärmflyget över. Idag flyger ca 95% skärm. Distansrekordet ligger på 230 km — Åre till Sollefteå. Klubben har ca 100 aktiva medlemmar varav 30 bor i Åre kommun.',
      ),
      records: [
        { title: 'Distansrekord skärm', value: '230 km', year: 2020 },
        { title: 'Distansrekord hängflyg', value: '115 km' },
        { title: 'Medlemmar', value: '~100' },
        { title: 'Startplatser', value: '9' },
      ],
      clubProducts: richText('Klubbtröjor och merchandise finns på vår webbshop.'),
      shopUrl: 'https://asdfkstore.myspreadshop.se',
      stadgar: richText('Klubbens stadgar finns tillgängliga som dokument under Dokumentarkiv.'),
    },
  })
  console.log('Seeded club-info')
```

- [ ] **Step 3: Add seed data for pages collection (placeholder content)**

```typescript
  // ── Pages (placeholder content) ────────────────────────────────
  const pagesSeed = [
    { title: 'Flygregler', slug: 'flygregler', category: 'flygregler' as const, body: richText('Sammanfattning av de viktigaste flygreglerna. Samarbetsavtalet med Skistar. Regler för kommersiella aktörer.'), order: 1 },
    { title: 'Säkerhet & nödsituation', slug: 'sakerhet', category: 'sakerhet' as const, body: richText('Rutiner vid nödsituation. Säkerhet och ansvar. Etik och hänsyn.'), order: 2 },
    { title: 'Cross country & luftrum', slug: 'xc', category: 'xc' as const, body: richText('Information om XC-flygning, luftrumskartor, rutiner för flygning i kontrollerat luftrum, länkar och telefonnummer.'), order: 3 },
    { title: 'Acro', slug: 'acro', category: 'acro' as const, body: richText('Information om acroflygning, räddningsbåt, acrobox.'), order: 4 },
    { title: 'Speedrider', slug: 'speedrider', category: 'speedrider' as const, body: richText('Information om speedriding i Åre.'), order: 5 },
    { title: 'Hängflyg', slug: 'hangflyg', category: 'hangflyg' as const, body: richText('Information om hängflygning från Skutan.'), order: 6 },
    { title: 'Paramotor', slug: 'paramotor', category: 'paramotor' as const, body: richText('Information om paramotorflygning i Åre.'), order: 7 },
    { title: 'Klubbprodukter', slug: 'klubbprodukter', category: 'klubbprodukter' as const, body: richText('Klubbtröjor och merchandise. Beställ via vår webbshop.'), order: 1 },
    { title: 'Stadgar', slug: 'stadgar', category: 'stadgar' as const, body: richText('Klubbens stadgar. Se dokumentarkivet för fullständigt dokument.'), order: 2 },
  ]

  for (const page of pagesSeed) {
    await payload.create({ collection: 'pages', data: page })
  }
  console.log(`Created ${pagesSeed.length} pages`)
```

- [ ] **Step 4: Add seed data for activities (sample)**

```typescript
  // ── Activities (sample) ────────────────────────────────────────
  await payload.create({
    collection: 'activities',
    data: {
      title: 'Årsmöte 2026',
      slug: 'arsmote-2026',
      type: 'arsmote',
      date: '2026-02-22',
      body: richText('Årsmöte hålls 22 februari kl 18:00 på Åre Fjällsätra.'),
    },
  })
  console.log('Created 1 activity')
```

- [ ] **Step 5: Commit**

```bash
git add cms/src/seed/index.ts
git commit -m "feat(cms): seed site-navigation, club-info, pages, activities"
```

---

### Task 5: Frontend — Local data fallbacks + CMS hooks

**Files:**
- Create: `src/data/navigation.ts`
- Create: `src/data/pages.ts`
- Create: `src/data/club-info.ts`
- Modify: `src/hooks/useCMS.ts`

- [ ] **Step 1: Create navigation fallback data**

```typescript
// src/data/navigation.ts
export const navigation = {
  sections: [
    { label: 'Hem', path: '/', children: [] },
    {
      label: 'Flyga i Åre',
      path: '/flyga-i-are',
      children: [
        { label: 'Starter & landningar', path: '/flyga-i-are/startplatser' },
        { label: 'Väder', path: '/flyga-i-are/vader' },
        { label: 'Flygregler', path: '/flyga-i-are/flygregler' },
        { label: 'Säkerhet & nödsituation', path: '/flyga-i-are/sakerhet' },
        { label: 'Cross country & luftrum', path: '/flyga-i-are/xc' },
        { label: 'Acro', path: '/flyga-i-are/acro' },
        { label: 'Speedrider', path: '/flyga-i-are/speedrider' },
        { label: 'Hängflyg', path: '/flyga-i-are/hangflyg' },
        { label: 'Paramotor', path: '/flyga-i-are/paramotor' },
        { label: 'Klubbuss & räddningsbåt', path: '/flyga-i-are/klubbuss' },
      ],
    },
    { label: 'Nyheter', path: '/nyheter', children: [] },
    { label: 'Aktiviteter', path: '/aktiviteter', children: [] },
    { label: 'Tävling', path: '/tavlingar', children: [] },
    {
      label: 'Om klubben',
      path: '/om',
      children: [
        { label: 'Historia & nutid', path: '/om' },
        { label: 'Styrelsen', path: '/om/styrelsen' },
        { label: 'Kontakt', path: '/kontakt' },
        { label: 'Klubbprodukter', path: '/om/klubbprodukter' },
        { label: 'Stadgar', path: '/om/stadgar' },
        { label: 'Bli medlem', path: '/bli-medlem' },
      ],
    },
    {
      label: 'Övrigt',
      path: '/ovrigt',
      children: [
        { label: 'Foton', path: '/ovrigt/foton' },
        { label: 'Dokumentarkiv', path: '/ovrigt/dokument' },
        { label: 'Skärmflygförbundet', path: 'https://www.paragliding.se', external: true },
      ],
    },
  ],
};

export type NavSection = (typeof navigation.sections)[number];
export type NavChild = NavSection['children'][number];
```

- [ ] **Step 2: Create pages fallback data**

```typescript
// src/data/pages.ts
export const pages = [
  { title: 'Flygregler', slug: 'flygregler', category: 'flygregler', body: 'Flygregler publiceras snart.' },
  { title: 'Säkerhet & nödsituation', slug: 'sakerhet', category: 'sakerhet', body: 'Säkerhetsinformation publiceras snart.' },
  { title: 'Cross country & luftrum', slug: 'xc', category: 'xc', body: 'XC-information publiceras snart.' },
  { title: 'Acro', slug: 'acro', category: 'acro', body: 'Acro-information publiceras snart.' },
  { title: 'Speedrider', slug: 'speedrider', category: 'speedrider', body: 'Speedrider-information publiceras snart.' },
  { title: 'Hängflyg', slug: 'hangflyg', category: 'hangflyg', body: 'Hängflygsinformation publiceras snart.' },
  { title: 'Paramotor', slug: 'paramotor', category: 'paramotor', body: 'Paramotorinformation publiceras snart.' },
  { title: 'Klubbprodukter', slug: 'klubbprodukter', category: 'klubbprodukter', body: 'Klubbprodukter publiceras snart.' },
  { title: 'Stadgar', slug: 'stadgar', category: 'stadgar', body: 'Stadgar publiceras snart.' },
];
```

- [ ] **Step 3: Create club-info fallback data**

```typescript
// src/data/club-info.ts
export const clubInfo = {
  history: 'Åre Drakflygklubb bildades 1975 och är en av Sveriges äldsta drakflygklubbar. Under 80-talet dominerade draken, men på 90-talet tog skärmflyget över. Idag flyger ca 95% skärm.',
  records: [
    { title: 'Distansrekord skärm', value: '230 km', year: 2020 },
    { title: 'Distansrekord hängflyg', value: '115 km' },
    { title: 'Medlemmar', value: '~100' },
    { title: 'Startplatser', value: '9' },
  ],
  clubProducts: 'Klubbtröjor och merchandise finns på vår webbshop.',
  shopUrl: 'https://asdfkstore.myspreadshop.se',
  stadgar: 'Klubbens stadgar finns tillgängliga som dokument under Dokumentarkiv.',
};
```

- [ ] **Step 4: Add new hooks to useCMS.ts**

Add these at the end of `src/hooks/useCMS.ts`:

```typescript
// ── New collection hooks ──

export const usePages = (fallback: any[]) =>
  useCMSData(() => fetchCollection("pages", "&sort=order"), fallback);

export const usePage = (slug: string, fallback: any) =>
  useCMSData(() => fetchCollection("pages", `&where[slug][equals]=${slug}&limit=1`).then(docs => docs[0] ?? fallback), fallback);

export const useActivities = (fallback: any[]) =>
  useCMSData(() => fetchCollection("activities", "&sort=-date"), fallback);

export const useDocuments = (fallback: any[]) =>
  useCMSData(() => fetchCollection("documents", "&sort=-year"), fallback);

export const usePhotos = (fallback: any[]) =>
  useCMSData(() => fetchCollection("photos", "&sort=-year"), fallback);

export const useLinks = (fallback: any[]) =>
  useCMSData(() => fetchCollection("links", "&sort=order"), fallback);

// ── New global hooks ──

export const useSiteNavigation = (fallback: any) =>
  useCMSData(() => fetchGlobal("site-navigation"), fallback);

export const useClubInfo = (fallback: any) =>
  useCMSData(() => fetchGlobal("club-info"), fallback);

export const useBusRules = (fallback: any) =>
  useCMSData(() => fetchGlobal("bus-rules"), fallback);
```

- [ ] **Step 5: Commit**

```bash
git add src/data/navigation.ts src/data/pages.ts src/data/club-info.ts src/hooks/useCMS.ts
git commit -m "feat: add fallback data and CMS hooks for new collections/globals"
```

---

### Task 6: Frontend — Header with dropdown navigation

**Files:**
- Modify: `src/components/header.tsx`

- [ ] **Step 1: Rewrite header with dropdown nav from CMS**

Replace the entire content of `src/components/header.tsx`:

```tsx
import React, { useState } from "react";
import { Link } from "react-router";
import Button from "./button";
import { navigation as localNav } from "../data/navigation";
import { useSiteNavigation, useGlobalLivePreview } from "../hooks/useCMS";

const navLinkClass = "text-foreground hover:text-primary transition-colors";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const { data: cmsNav } = useSiteNavigation(localNav);
  const liveNav = useGlobalLivePreview(cmsNav);
  const nav = liveNav.sections?.length ? liveNav : localNav;

  const closeAll = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className="py-4 relative z-50">
      <div className="@container max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-1 text-2xl font-bold" onClick={closeAll}>
            Åre Skärm- och Drakflygklubb
          </Link>

          {/* Desktop nav */}
          <nav className="hidden @md:flex flex-1 items-center gap-4 justify-center">
            {nav.sections.map((section: any) => {
              if (section.children?.length > 0) {
                return (
                  <div
                    key={section.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(section.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link to={section.path} className={navLinkClass}>
                      {section.label} <span className="text-xs">▾</span>
                    </Link>
                    {openDropdown === section.label && (
                      <div className="absolute top-full left-0 pt-2 min-w-[220px]">
                        <div className="bg-background border border-border rounded-lg shadow-lg py-2">
                          {section.children.map((child: any) =>
                            child.external ? (
                              <a
                                key={child.label}
                                href={child.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                              >
                                {child.label} ↗
                              </a>
                            ) : (
                              <Link
                                key={child.label}
                                to={child.path}
                                className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                                onClick={closeAll}
                              >
                                {child.label}
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link key={section.label} to={section.path} className={navLinkClass} onClick={closeAll}>
                  {section.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden @md:flex flex-1 justify-end">
            <Button href="/bli-medlem">Bli medlem</Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="@md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="@md:hidden flex flex-col gap-2 pt-4">
            {nav.sections.map((section: any) => (
              <div key={section.label}>
                <Link to={section.path} className={`${navLinkClass} font-semibold`} onClick={closeAll}>
                  {section.label}
                </Link>
                {section.children?.length > 0 && (
                  <div className="pl-4 flex flex-col gap-1 mt-1">
                    {section.children.map((child: any) =>
                      child.external ? (
                        <a
                          key={child.label}
                          href={child.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={closeAll}
                        >
                          {child.label} ↗
                        </a>
                      ) : (
                        <Link
                          key={child.label}
                          to={child.path}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={closeAll}
                        >
                          {child.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
            <Button href="/bli-medlem">Bli medlem</Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/header.tsx
git commit -m "feat: CMS-driven dropdown navigation with live preview"
```

---

### Task 7: Frontend — New views + routes

**Files:**
- Create: `src/views/page/page-view.tsx`
- Create: `src/views/flyga-i-are/flyga-i-are-index.tsx`
- Create: `src/views/flyga-i-are/klubbuss-view.tsx`
- Create: `src/views/om/styrelsen-view.tsx`
- Create: `src/views/aktiviteter/aktiviteter-view.tsx`
- Create: `src/views/ovrigt/foton-view.tsx`
- Create: `src/views/ovrigt/dokument-view.tsx`
- Modify: `src/main.tsx`

- [ ] **Step 1: Create generic PageView**

```tsx
// src/views/page/page-view.tsx
import React from "react";
import { useParams } from "react-router";
import { usePage, useGlobalLivePreview } from "../../hooks/useCMS";
import { pages } from "../../data/pages";

const PageView: React.FC = () => {
  const { slug } = useParams();
  const fallback = pages.find((p) => p.slug === slug) ?? { title: "", slug: "", body: "" };
  const { data: page, loading } = usePage(slug ?? "", fallback);
  const livePage = useGlobalLivePreview(page);

  if (loading) {
    return (
      <div className="max-w-2xl px-4 py-16 w-full">
        <p className="text-muted-foreground">Laddar...</p>
      </div>
    );
  }

  const title = livePage.title || fallback.title;
  const body = livePage.body || fallback.body;

  return (
    <div className="max-w-2xl px-4 flex gap-8 md:gap-16 flex-col w-full py-8 md:py-16">
      <section className="flex flex-col gap-6">
        <h2 className="font-serif text-3xl">{title}</h2>
        {typeof body === "string" ? (
          <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
        ) : (
          <div className="prose prose-sm max-w-none text-muted-foreground">
            {/* Richtext from CMS renders here — Payload returns serialized Lexical JSON */}
            <p>{body?.root?.children?.[0]?.children?.[0]?.text ?? ""}</p>
          </div>
        )}
      </section>
      {livePage.links?.length > 0 && (
        <section className="flex flex-col gap-4">
          <h3 className="font-serif text-xl">Länkar</h3>
          <div className="flex flex-col gap-2">
            {livePage.links.map((link: any) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors underline text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default PageView;
```

- [ ] **Step 2: Create FlyingGuideIndex**

```tsx
// src/views/flyga-i-are/flyga-i-are-index.tsx
import React from "react";
import { Link } from "react-router";
import Separator from "../../components/separator";

const sections = [
  { label: "Starter & landningar", path: "/flyga-i-are/startplatser", desc: "Beskrivning av startplatser i Åre med omnejd" },
  { label: "Väder", path: "/flyga-i-are/vader", desc: "Lokala väderförhållanden och vädertjänster" },
  { label: "Flygregler", path: "/flyga-i-are/flygregler", desc: "Sammanfattning av flygregler och Skistar-avtal" },
  { label: "Säkerhet & nödsituation", path: "/flyga-i-are/sakerhet", desc: "Rutiner vid nödsituation, säkerhet och ansvar" },
  { label: "Cross country & luftrum", path: "/flyga-i-are/xc", desc: "XC-flygning, luftrumskartor, rutiner" },
  { label: "Acro", path: "/flyga-i-are/acro", desc: "Acroflygning, räddningsbåt, acrobox" },
  { label: "Speedrider", path: "/flyga-i-are/speedrider", desc: "Speedriding i Åre" },
  { label: "Hängflyg", path: "/flyga-i-are/hangflyg", desc: "Hängflygning från Skutan" },
  { label: "Paramotor", path: "/flyga-i-are/paramotor", desc: "Paramotorflygning i Åre" },
  { label: "Klubbuss & räddningsbåt", path: "/flyga-i-are/klubbuss", desc: "Regler och avgifter" },
];

const FlyingGuideIndex: React.FC = () => {
  return (
    <div className="max-w-2xl px-4 flex gap-8 md:gap-16 flex-col w-full py-8 md:py-16">
      <section className="flex flex-col gap-6">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">Flygguiden</p>
          <h2 className="font-serif text-3xl">Flyga i Åre</h2>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Allt du behöver veta för att flyga säkert i Årefjällen.
        </p>
      </section>
      <Separator />
      <div className="flex flex-col gap-6">
        {sections.map((s) => (
          <Link
            key={s.path}
            to={s.path}
            className="flex flex-col gap-1 p-4 rounded-lg border border-border hover:border-primary transition-colors"
          >
            <p className="text-sm font-semibold">{s.label}</p>
            <p className="text-muted-foreground text-xs">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FlyingGuideIndex;
```

- [ ] **Step 3: Create KlubbussView**

```tsx
// src/views/flyga-i-are/klubbuss-view.tsx
import React from "react";
import Separator from "../../components/separator";
import { busRules as localBusRules } from "../../data/bus-rules";
import { useBusRules, useGlobalLivePreview } from "../../hooks/useCMS";

const KlubbussView: React.FC = () => {
  const { data: cmsBusRules } = useBusRules(localBusRules);
  const liveBusRules = useGlobalLivePreview(cmsBusRules);
  const busRules = {
    ...localBusRules,
    intro: liveBusRules.intro ?? localBusRules.intro,
    rules: liveBusRules.rules?.length ? liveBusRules.rules : localBusRules.rules,
  };

  return (
    <div className="max-w-2xl px-4 flex gap-8 md:gap-16 flex-col w-full py-8 md:py-16">
      <section className="flex flex-col gap-6">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">Flyga i Åre</p>
          <h2 className="font-serif text-3xl">Klubbuss & räddningsbåt</h2>
        </div>
      </section>
      <Separator />
      <section className="flex flex-col gap-4">
        <ul className="flex flex-col gap-3">
          {busRules.rules.map((rule: any, i: number) => (
            <li key={i} className="text-muted-foreground text-sm leading-relaxed flex gap-3 items-baseline">
              <span className="text-foreground shrink-0">&bull;</span>
              {rule.text}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default KlubbussView;
```

Note: `useCMSData` needs to be exported from `useCMS.ts` — currently it's a private function. Add `export` to the function declaration in that file.

- [ ] **Step 4: Create StyrelsenView**

```tsx
// src/views/om/styrelsen-view.tsx
import React from "react";
import { boardMembers as localBoard } from "../../data/about";
import { useBoardMembers } from "../../hooks/useCMS";

const StyrelsenView: React.FC = () => {
  const { data: boardMembers } = useBoardMembers(localBoard);

  return (
    <div className="max-w-2xl px-4 flex gap-8 md:gap-16 flex-col w-full py-8 md:py-16">
      <section className="flex flex-col gap-6">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">Om klubben</p>
          <h2 className="font-serif text-3xl">Styrelsen</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3">
          {boardMembers.map((member: any) => (
            <div key={member.name} className="flex flex-col gap-1">
              <p className="text-sm font-semibold">{member.name}</p>
              <p className="text-muted-foreground text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StyrelsenView;
```

- [ ] **Step 5: Create AktiviteterView**

```tsx
// src/views/aktiviteter/aktiviteter-view.tsx
import React from "react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import Separator from "../../components/separator";
import { useActivities } from "../../hooks/useCMS";

const AktiviteterView: React.FC = () => {
  const { data: activities, loading } = useActivities([]);

  return (
    <div className="max-w-2xl px-4 flex gap-8 md:gap-16 flex-col w-full py-8 md:py-16">
      <section className="flex flex-col gap-6">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">Aktiviteter</p>
          <h2 className="font-serif text-3xl">Klubbens aktiviteter</h2>
        </div>
      </section>
      <Separator />
      {loading && <p className="text-sm text-muted-foreground">Laddar...</p>}
      {!loading && activities.length === 0 && (
        <p className="text-sm text-muted-foreground">Inga aktiviteter planerade just nu.</p>
      )}
      <div className="flex flex-col gap-6">
        {activities.map((activity: any) => (
          <div key={activity.id ?? activity.slug} className="flex flex-col gap-2 p-4 rounded-lg border border-border">
            <div className="flex gap-3 items-center">
              <h3 className="font-serif text-xl">{activity.title}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {activity.type}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {format(new Date(activity.date), "d MMMM yyyy", { locale: sv })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AktiviteterView;
```

- [ ] **Step 6: Create FotonView**

```tsx
// src/views/ovrigt/foton-view.tsx
import React from "react";
import Separator from "../../components/separator";
import { usePhotos } from "../../hooks/useCMS";

const FotonView: React.FC = () => {
  const { data: photos, loading } = usePhotos([]);

  return (
    <div className="max-w-2xl px-4 flex gap-8 md:gap-16 flex-col w-full py-8 md:py-16">
      <section className="flex flex-col gap-6">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">Övrigt</p>
          <h2 className="font-serif text-3xl">Foton</h2>
        </div>
      </section>
      <Separator />
      {loading && <p className="text-sm text-muted-foreground">Laddar...</p>}
      {!loading && photos.length === 0 && (
        <p className="text-sm text-muted-foreground">Inga foton uppladdade ännu.</p>
      )}
      <div className="flex flex-col gap-8">
        {photos.map((album: any) => (
          <section key={album.id ?? album.title} className="flex flex-col gap-4">
            <h3 className="font-serif text-xl">{album.title} ({album.year})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {album.images?.map((img: any, i: number) => (
                <img
                  key={i}
                  src={img.image?.url ?? img.url}
                  alt={img.caption ?? album.title}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default FotonView;
```

- [ ] **Step 7: Create DokumentView**

```tsx
// src/views/ovrigt/dokument-view.tsx
import React from "react";
import Separator from "../../components/separator";
import { useDocuments } from "../../hooks/useCMS";

const DokumentView: React.FC = () => {
  const { data: documents, loading } = useDocuments([]);

  return (
    <div className="max-w-2xl px-4 flex gap-8 md:gap-16 flex-col w-full py-8 md:py-16">
      <section className="flex flex-col gap-6">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">Övrigt</p>
          <h2 className="font-serif text-3xl">Dokumentarkiv</h2>
        </div>
      </section>
      <Separator />
      {loading && <p className="text-sm text-muted-foreground">Laddar...</p>}
      {!loading && documents.length === 0 && (
        <p className="text-sm text-muted-foreground">Inga dokument uppladdade ännu.</p>
      )}
      <div className="flex flex-col gap-4">
        {documents.map((doc: any) => (
          <a
            key={doc.id ?? doc.title}
            href={doc.file?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between items-center p-4 rounded-lg border border-border hover:border-primary transition-colors"
          >
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">{doc.title}</p>
              <p className="text-muted-foreground text-xs">{doc.category} {doc.year ? `· ${doc.year}` : ''}</p>
            </div>
            <span className="text-sm text-primary">Ladda ner ↓</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DokumentView;
```

- [ ] **Step 8: Update routes in main.tsx**

Replace the content of `src/main.tsx`:

```tsx
import "@fontsource-variable/karla";
import "@fontsource-variable/karla/wght-italic.css";
import "@fontsource-variable/source-serif-4";
import "@fontsource-variable/source-serif-4/wght-italic.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import HomeView from "./views/home/home-view.tsx";
import NewsView from "./views/news/news-view.tsx";
import NewsSingleView from "./views/news/news-single/news-single-view.tsx";
import MainLayout from "./layouts/main-layout.tsx";
import SitesView from "./views/sites/sites-view.tsx";
import SitesSingleView from "./views/sites/sites-single/sites-single-view.tsx";
import KontaktView from "./views/kontakt/kontakt-view.tsx";
import OmView from "./views/om/om-view.tsx";
import StyrelsenView from "./views/om/styrelsen-view.tsx";
import BliMedlemView from "./views/bli-medlem/bli-medlem-view.tsx";
import TavlingarView from "./views/tavlingar/tavlingar-view.tsx";
import VaderView from "./views/vader/vader-view.tsx";
import NotFoundView from "./views/not-found-view.tsx";
import FlyingGuideIndex from "./views/flyga-i-are/flyga-i-are-index.tsx";
import KlubbussView from "./views/flyga-i-are/klubbuss-view.tsx";
import PageView from "./views/page/page-view.tsx";
import AktiviteterView from "./views/aktiviteter/aktiviteter-view.tsx";
import FotonView from "./views/ovrigt/foton-view.tsx";
import DokumentView from "./views/ovrigt/dokument-view.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<HomeView />} />
        <Route element={<MainLayout />}>
          {/* Flyga i Åre */}
          <Route path="flyga-i-are">
            <Route index element={<FlyingGuideIndex />} />
            <Route path="startplatser" element={<SitesView />} />
            <Route path="startplatser/:slug" element={<SitesSingleView />} />
            <Route path="vader" element={<VaderView />} />
            <Route path="klubbuss" element={<KlubbussView />} />
            <Route path=":slug" element={<PageView />} />
          </Route>
          {/* Nyheter */}
          <Route path="nyheter">
            <Route index element={<NewsView />} />
            <Route path=":slug" element={<NewsSingleView />} />
          </Route>
          {/* Aktiviteter */}
          <Route path="aktiviteter" element={<AktiviteterView />} />
          {/* Tävlingar */}
          <Route path="tavlingar" element={<TavlingarView />} />
          {/* Om klubben */}
          <Route path="om">
            <Route index element={<OmView />} />
            <Route path="styrelsen" element={<StyrelsenView />} />
            <Route path="klubbprodukter" element={<PageView />} />
            <Route path="stadgar" element={<PageView />} />
          </Route>
          <Route path="kontakt" element={<KontaktView />} />
          <Route path="bli-medlem" element={<BliMedlemView />} />
          {/* Övrigt */}
          <Route path="ovrigt">
            <Route path="foton" element={<FotonView />} />
            <Route path="dokument" element={<DokumentView />} />
          </Route>
          {/* Legacy redirects */}
          <Route path="information" element={<FlyingGuideIndex />} />
          <Route path="startplatser" element={<SitesView />} />
          <Route path="startplatser/:slug" element={<SitesSingleView />} />
          <Route path="vader" element={<VaderView />} />
          {/* 404 */}
          <Route path="*" element={<NotFoundView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
```

- [ ] **Step 9: Commit**

```bash
git add src/views/page/ src/views/flyga-i-are/ src/views/om/styrelsen-view.tsx src/views/aktiviteter/ src/views/ovrigt/ src/main.tsx src/hooks/useCMS.ts
git commit -m "feat: add new views, routes, and CMS-driven dropdown nav"
```

---

### Task 8: Build + deploy + QC

**Files:**
- Modify: `tests/qc-live.spec.ts`

- [ ] **Step 1: Build locally to catch compile errors**

Run: `source ~/.nvm/nvm.sh && nvm use 22 && pnpm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Update QC tests with new pages**

Add these pages to the `pages` array in `tests/qc-live.spec.ts`:

```typescript
const pages = [
  { path: "/", name: "Hem" },
  { path: "/nyheter", name: "Nyheter" },
  { path: "/flyga-i-are", name: "Flyga i Åre" },
  { path: "/flyga-i-are/startplatser", name: "Startplatser" },
  { path: "/flyga-i-are/vader", name: "Väder" },
  { path: "/flyga-i-are/flygregler", name: "Flygregler" },
  { path: "/flyga-i-are/sakerhet", name: "Säkerhet" },
  { path: "/flyga-i-are/xc", name: "Cross country" },
  { path: "/flyga-i-are/klubbuss", name: "Klubbuss" },
  { path: "/aktiviteter", name: "Aktiviteter" },
  { path: "/tavlingar", name: "Tävlingar" },
  { path: "/om", name: "Om klubben" },
  { path: "/om/styrelsen", name: "Styrelsen" },
  { path: "/kontakt", name: "Kontakt" },
  { path: "/bli-medlem", name: "Bli medlem" },
  { path: "/ovrigt/foton", name: "Foton" },
  { path: "/ovrigt/dokument", name: "Dokument" },
];
```

Add CMS API tests for new endpoints:

```typescript
test("[api] CMS returns pages", async ({ request }) => {
  const res = await request.get(`${CMS_API}/pages?limit=1`);
  expect(res.status()).toBe(200);
});

test("[api] CMS returns site-navigation", async ({ request }) => {
  const res = await request.get(`${CMS_API}/globals/site-navigation`);
  expect(res.status()).toBe(200);
  const data = await res.json();
  expect(data.sections.length).toBeGreaterThan(0);
});

test("[api] CMS returns club-info", async ({ request }) => {
  const res = await request.get(`${CMS_API}/globals/club-info`);
  expect(res.status()).toBe(200);
});
```

Add nav dropdown test:

```typescript
test("[functional] Desktop nav has dropdown menus", async ({ page: p }) => {
  await p.setViewportSize({ width: 1280, height: 800 });
  await p.goto(BASE, { waitUntil: "networkidle" });

  // Hover over "Flyga i Åre" to open dropdown
  await p.hover("text=Flyga i Åre");
  await expect(p.locator("text=Starter & landningar")).toBeVisible();
  await expect(p.locator("text=Flygregler")).toBeVisible();
});
```

- [ ] **Step 3: Commit all changes**

```bash
git add -A
git commit -m "feat: complete nav + CMS collections sub-project, update QC tests"
```

- [ ] **Step 4: Push and wait for deploy**

```bash
git push origin main
```

Wait for CI deploy to succeed.

- [ ] **Step 5: Run QC tests against live site**

Run: `npx playwright test tests/qc-live.spec.ts --update-snapshots --reporter=list`
Expected: All tests pass.

- [ ] **Step 6: Update stable tag**

```bash
git tag -d stable-demo-2026-05-11 2>/dev/null
git push origin :refs/tags/stable-demo-2026-05-11 2>/dev/null
git tag -a stable-nav-cms -m "Stable: nav + CMS collections aligned with PPTX spec"
git push origin stable-nav-cms
```

# Flygare Site Alignment with PPTX Spec

Source: `Struktur ny hemsida.pptx`
Approach: Rich CMS (Approach A) — every section editable in Payload CMS with live preview.
Success criteria: Board members can edit all content during a workshop using the CMS admin.

## Decomposition

Five sub-projects, built in order:

1. **Navigation + CMS collections** — restructure nav, add missing collections/globals
2. **Flyga i Åre section** — safety, XC, acro, speedrider, hängflyg, paramotor, klubbuss page
3. **Aktiviteter section** — calendar, klubbresor, årsmöten
4. **Övrigt section** — foton, dokumentarkiv
5. **Content migration** — move flygare.nu content into the CMS

This spec covers sub-project 1. Subsequent sub-projects get their own spec → plan → implementation cycle.

## Navigation

```
Hem | Flyga i Åre ▾ | Nyheter | Aktiviteter | Tävling | Om klubben ▾ | Övrigt ▾ | [Bli medlem]
```

**Flyga i Åre** dropdown:
- Starter & landningar → /flyga-i-are/startplatser
- Väder → /flyga-i-are/vader
- Flygregler → /flyga-i-are/flygregler
- Säkerhet & nödsituation → /flyga-i-are/sakerhet
- Cross country & luftrum → /flyga-i-are/xc
- Acro → /flyga-i-are/acro
- Speedrider → /flyga-i-are/speedrider
- Hängflyg → /flyga-i-are/hangflyg
- Paramotor → /flyga-i-are/paramotor
- Klubbuss & räddningsbåt → /flyga-i-are/klubbuss

**Om klubben** dropdown:
- Historia & nutid → /om
- Styrelsen → /om/styrelsen
- Kontakt → /kontakt
- Klubbprodukter → /om/klubbprodukter
- Stadgar → /om/stadgar
- Bli medlem → /bli-medlem

**Övrigt** dropdown:
- Foton → /ovrigt/foton
- Dokumentarkiv → /ovrigt/dokument
- Skärmflygförbundet → external link

Nav structure stored in CMS global `site-navigation`. Header reads from CMS with local fallback.

## CMS Collections

### Existing (updated)
- `news` — title, category, date, image, description, featured
  - Update category options to match PPTX: Alla kategorier, Aktiviteter, Information, Tävlingar, Övrigt
- `board-members` — name, role, sortOrder
- `launches` — name, type, direction, elevation, coords, description, extra
- `other-sites` — name, direction, elevationDrop, description
- `competitions` — name, status, subtitle, description, rules, winners
- `milestones` — year, text
- `weather-links` — label, url, sortOrder
- `media` — upload with thumbnail + hero sizes
- `users` — email, password, role

### New: `pages`
Generic content pages. One collection, categorized.

Fields:
- `title` (text, required)
- `slug` (text, required, unique)
- `category` (select: flygregler, sakerhet, xc, acro, speedrider, hangflyg, paramotor, klubbuss, stadgar, klubbprodukter)
- `body` (richtext, required)
- `order` (number, for sort within category)
- `image` (upload, relationTo: media, optional)
- `links` (array of: label, url — for external references)

### New: `activities`
Fields:
- `title` (text, required)
- `slug` (text, required)
- `type` (select: kalender, klubbresa, arsmote, ovrigt)
- `date` (date, required)
- `body` (richtext)
- `attachments` (array of upload, relationTo: media)

### New: `documents`
Fields:
- `title` (text, required)
- `category` (select: arsmote, stadgar, ovrigt)
- `file` (upload, relationTo: media)
- `year` (number)

### New: `photos`
Fields:
- `title` (text, required)
- `year` (number, required)
- `images` (array of upload, relationTo: media)

### New: `links`
Fields:
- `title` (text, required)
- `url` (text, required)
- `category` (select: external, partner, resource)
- `order` (number)

## CMS Globals

### New: `site-navigation`
Fields:
- `sections` (array of objects):
  - `label` (text)
  - `path` (text)
  - `external` (checkbox)
  - `children` (array of: label, path, external)

### New: `club-info`
Fields:
- `history` (richtext)
- `records` (array of: title, value, year)
- `clubProducts` (richtext)
- `shopUrl` (text)
- `stadgar` (richtext)

### Updated: `contact-info`
Add fields:
- `besoksadress` (text)
- `organisationsnummer` (text)

## Live Preview

Every collection and global mapped to a frontend route:

| CMS item | Preview URL |
|----------|------------|
| `pages` (any category) | `/flyga-i-are/{slug}` |
| `pages` (klubbprodukter) | `/om/klubbprodukter` |
| `pages` (stadgar) | `/om/stadgar` |
| `activities` | `/aktiviteter` |
| `documents` | `/ovrigt/dokument` |
| `photos` | `/ovrigt/foton` |
| `news` | `/nyheter` |
| `board-members` | `/om/styrelsen` |
| `launches` | `/flyga-i-are/startplatser` |
| `competitions` | `/tavlingar` |
| `milestones` | `/om` |
| `weather-links` | `/flyga-i-are/vader` |
| `site-navigation` | `/` |
| `club-info` | `/om` |
| `contact-info` | `/kontakt` |
| `membership-info` | `/bli-medlem` |
| `bus-rules` | `/flyga-i-are/klubbuss` |
| `flying-guide` | `/flyga-i-are` |

## Frontend Routes

New routes to add:

```
/flyga-i-are                → FlyingGuideIndex (overview with links to subsections)
/flyga-i-are/startplatser   → SitesView (existing, moved)
/flyga-i-are/vader          → VaderView (existing, moved)
/flyga-i-are/flygregler     → PageView (generic, from `pages` collection)
/flyga-i-are/sakerhet       → PageView
/flyga-i-are/xc             → PageView
/flyga-i-are/acro           → PageView
/flyga-i-are/speedrider     → PageView
/flyga-i-are/hangflyg       → PageView
/flyga-i-are/paramotor      → PageView
/flyga-i-are/klubbuss       → KlubbussView (existing bus-rules global)
/aktiviteter                → AktiviteterView (from `activities` collection)
/tavlingar                  → TavlingarView (existing, keep)
/om                         → OmView (updated with club-info global)
/om/styrelsen               → StyrelsenView (from board-members)
/om/klubbprodukter          → PageView (from `pages`)
/om/stadgar                 → PageView (from `pages`)
/kontakt                    → KontaktView (existing, updated)
/bli-medlem                 → BliMedlemView (existing)
/ovrigt/foton               → FotonView (from `photos` collection)
/ovrigt/dokument            → DokumentView (from `documents` collection)
```

`PageView` is a generic view that fetches a `pages` document by slug and renders its richtext body. One component handles all simple content pages.

## Testing

QC test suite extended to cover:

### Functional (per new page)
- Page loads without console errors
- No horizontal overflow at desktop + mobile
- Content renders (not empty)
- CMS API returns data for the collection

### CMS Integration
- Each new collection API endpoint returns 200
- Each global API endpoint returns 200
- Live preview URL loads in iframe from CMS domain

### Navigation
- Desktop nav shows all PPTX sections
- Dropdowns open on hover/click
- All nav links resolve (no 404s)
- Mobile hamburger shows all sections

### Accessibility
- All new pages pass axe-core WCAG 2.1 AA scan

### Visual Regression
- Baselines for all new pages at desktop + mobile

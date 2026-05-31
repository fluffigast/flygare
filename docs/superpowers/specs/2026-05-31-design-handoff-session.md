# Focused Session: Design Handoff Implementation

## Context

Design handoff from Claude Design at `docs/design-handoff/`. 7 pages, editorial typography, specific layout rules. Home page header + hero partially done. Everything else needs implementation.

## What's done

- Header: 60px, 14px serif, underline hover, black pill
- Home hero: italic eyebrow + 96px display, real photos
- Home welcome row, wind widget, news slider, info cards
- CMS wired (site-settings, news, pages, etc.)
- 362 Playwright tests
- Real content from flygare.nu on all pages

## What to implement

Read `docs/design-handoff/README.md` first. Then `pages.jsx` and `components.jsx` for exact layouts.

### 1. Load JetBrains Mono font
Add to index.html. Used for dates, captions, wind numbers.

### 2. Footer redesign
- 3-column: menu links / more links / about blurb
- 1px hairline top border, 100px padding
- 14px Karla links, serif bold column titles

### 3. Nyheter page (`/nyheter`)
- Eyebrow "Aktuellt" (40px italic serif, accent color) + display "Senaste nytt" (96px bold serif)
- Filter bar: pill-style underline tabs
- 2-column news grid with large images
- Pagination with hairline borders

### 4. Single news page (`/nyheter/:slug`)
- 540px image header
- Eyebrow + 96px headline + mono date
- 2-column: article (serif italic lead + Karla body) + aside (related links)
- News slider below

### 5. Information/Flyga i Åre (`/flyga-i-are`)
- Eyebrow "Information" + display "Att flyga i Åre"
- 18px body intro
- 6 info cards in 3-column grid

### 6. Single startplats (`/flyga-i-are/startplatser/:slug`)
- Hero image + name
- Two-column meta: coords (mono), elevation, compass rose (80x80 SVG), wind window
- Serif italic lead + Karla body

### 7. Väder page (`/flyga-i-are/vader`)
- Today block: 3 metrics with large mono numbers
- 7-day strip with day names, wind, icons
- METAR snippet in mono bordered box

### 8. Bli medlem page (`/bli-medlem`)
- Serif intro
- Price card (600 kr/år)
- Form placeholder (name/email/rating/notes/submit)

## Design tokens

```
--ink: #020618
--ink-2: #0f172b
--slate: #62748e
--slate-2: #90a1b9
--hairline: #e2e8f0
--accent: #3774a3
```

Typography: Source Serif 4 (serif), Karla (sans), JetBrains Mono (mono)
Display: 96/0.96, Eyebrow: 40/1 italic, H-section: 32/1, Body: 16/24
Cards: sharp corners, no shadows, hover translateY(-2px)
Pill: radius 999, black, serif 14px

## How to execute

1. Read handoff files first — `README.md`, `pages.jsx`, `components.jsx`, `data.jsx`
2. Implement page by page, starting with footer (shared) then nyheter (most complex)
3. Use existing CMS hooks — don't break CMS integration
4. Run `npx playwright test tests/` after each page
5. Mobile responsive: clamp() for display sizes, collapse columns at 640/1024px
6. Keep Swedish text intact

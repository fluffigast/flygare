# Handoff: flygare — Åre Skärm- och Drakflygklubb website

## Overview
A high-fidelity interactive prototype for **flygare**, the website of *Åre Skärm- och Drakflygklubb* (the paragliding & hang-gliding club in Åre, Sweden). The site presents news, club info, takeoff sites, weather, regulations and membership in an editorial, aviation-themed style. The content is in Swedish.

## About the Design Files
The files in this bundle are **design references created in HTML** — a single-file React + Babel prototype showing the intended look, layout, copy and behaviour. They are **not production code to copy directly**.

The task is to **recreate these designs in the target codebase's existing environment** (Next.js, Astro, plain React, etc.), using its established routing, component, styling and content patterns. If no environment exists yet, pick a framework that fits the project (Next.js + MDX or a headless CMS would be a natural fit for a content-driven club site) and implement the design there.

## Fidelity
**High-fidelity (hifi).** Final colours, typography, spacing, copy and interactions. Recreate the UI pixel-perfectly using the codebase's existing libraries and patterns. Photos used in the prototype are placeholders treated with crops/filters — replace with real club photography on implementation.

## Pages / Views

The prototype implements **7 routes** via hash-based routing.

### 1. Home (`#/` or `#/hem`)
**Purpose:** Landing page. Surfaces today's weather/wind, the latest news, and quick entry into "Flyga i Åre" information.
**Layout (1600 px frame, content padded 110 px L/R):**
- **Hero** — full-bleed image header (~640 px tall) with overlay headline (Source Serif 4 italic 40 px eyebrow + 96 px bold display, white + navy ink).
- **Today strip** — 3-column grid: wind (m/s + cardinal), temperature, cloud base. Mono numbers, italic serif labels.
- **News carousel** — 3 cards visible at a time, paginated with chevron buttons + dots. Each card: 100 px square thumb left, eyebrow + serif title right, bottom date in mono.
- **Flyga i Åre** — 2×2 grid of large info cards (image left, text right), pointing to startplatser, regler, klubbussen, luftrum.
- **Footer** — 3-column menu + about blurb.

### 2. Nyheter (`#/nyheter`)
**Purpose:** Browse all club news, filterable.
**Layout:**
- Header band — italic eyebrow "Aktuellt" 40 px + display "Senaste nytt" 96 px on near-white.
- **Filter bar** — pill-style underline tabs: Alla / Aktiviteter / Aktuellt / Säkerhet / Tävlingar / Åre.
- **News grid** — 2 columns × N rows of news-item cards. Each card: large image left (~480×320), category eyebrow + headline + 1-line dek + date row right, with a chevron arrow that slides on hover.
- **Pagination** — numbered, 1px hairline border top.

### 3. Single news (`#/nyhet/:slug`)
**Purpose:** Read one news article.
**Layout:**
- 540 px image header.
- Italic eyebrow (category) + 96 px bold serif headline + mono published date.
- 2-column body: 650 px article column (24 px serif italic lead + 16 px Karla body in 3 paragraphs) on left, 400 px aside ("Relaterad information") with 2 link cards on right.
- Below: news slider ("Fler nyheter", 3 mini-cards, chevron + dots).

### 4. Information / Flyga i Åre (`#/information`)
**Purpose:** Hub for practical info — startplatser, regler, klubbussen, luftrum.
- Same eyebrow+display header pattern.
- Grid of large info cards (same component as home).

### 5. Single startplats (`#/startplats/:slug`)
**Purpose:** Detailed page for one takeoff site.
- Hero image + name + ICAO-style identifier badge (mono).
- Two-column meta block: WGS84 + SWEREF99 coords (mono), elevation, exposure (compass rose component, 80×80, with N tick + rotated needle), wind window, last updated.
- Body in serif italic + Karla.
- "Senast uppdaterad" timestamp in mono at bottom.

### 6. Väder (`#/vader`)
**Purpose:** Current and forecast weather for Åre.
- Today block (3 metrics, large numbers).
- Day strip — 7 day cells, each with day name (italic), wind value (mono), and a tiny cloud SVG icon.
- METAR-style snippet in mono inside a bordered box.

### 7. Bli medlem (`#/medlem`)
**Purpose:** Membership signup.
- Long-form layout with serif intro, three-tier price cards, and a placeholder form (name / email / pilot rating / notes / submit pill button).

## Components

### Header (global)
- 60 px tall, 1 px bottom hairline.
- Left: club name in 14 px Source Serif 4 bold.
- Center: nav links — *Väder*, *Regler*, *Om klubben* — 14 px serif, underline-on-hover (1 px slate scaling from left).
- Right: black 117×29 pill button "Bli medlem" (Source Serif 4 14 px white).

### Footer (global)
- 400 px tall, 1 px hairline.
- 3 columns: menu (Regler / Riktlinjer / Startplatser / Landningar / Luftrum / Nödinformation), links (Bli medlem / Dokument / Kontakt), about column (bold serif heading + 14 px Karla blurb).

### News card / News item
- See pages 1, 2, 3 above.

### Info card
- 700×360, image left half, text right half.
- Bold serif title 32 px + Karla 16 px body + arrow that slides 6 px on hover.

### Compass rose
- 80×80 circle, hairline ring, "N" tick top in mono 10 px slate, 2×28 px navy needle pivoting from center, rotated by exposure degrees (e.g. 155° = SSE).

### Pill button
- Border-radius 999, black bg, white serif 14 px, 5×20 padding. Hover lifts 1 px and shifts to `--ink-2`.

## Interactions & Behaviour
- **Routing:** hash-based. `window.location.hash` is the source of truth; clicking any `<a>` calls `navigate(hash)`.
- **News carousel:** chevron buttons step `offset` ±1, dots reflect page index. Disabled state at boundaries (opacity .35).
- **Hover:**
  - Nav links: 1 px underline scales from 0 → 1 over 200 ms.
  - News-item cards: title shifts colour to `--ink-2`, arrow translates X +6 px over 200 ms.
  - Info cards: same arrow slide.
  - Pill: background → `--ink-2`, translateY −1 px.
- **Filter bar (Nyheter):** active tab gets 2 px ink underline + weight 600.
- **Image-slot drop targets:** the `<image-slot>` web component lets a viewer drag in their own photos; the design handles missing images by showing a labelled placeholder.

## State Management
Minimal. The prototype uses:
- `useState` for the current hash route.
- `useState` for news carousel offset, filter category, pagination page.
- `useEffect` listening to `hashchange`.

In a real implementation, replace with the codebase's router (Next.js App Router, Remix, etc.). News, takeoff sites, articles, weather should be loaded from CMS / API; see `data.jsx` for the in-memory shape.

## Design Tokens

### Colours
```
--bg:       #ffffff   /* page background */
--paper:    #fafbfc   /* subtle off-white surfaces */
--ink:      #020618   /* near-black navy, body */
--ink-2:    #0f172b   /* heading navy */
--slate:    #62748e   /* muted body */
--slate-2:  #90a1b9   /* dim text */
--slate-3:  #cbd5e1   /* hairline lighter */
--hairline: #e2e8f0   /* 1 px borders */
--rust:     (accent — used sparingly; see CSS for exact value)
```

### Typography
```
--serif: "Source Serif 4", "Source Serif Pro", Georgia, serif
--sans:  "Karla", "Helvetica Neue", Arial, sans-serif
--mono:  "JetBrains Mono", ui-monospace, monospace
```

Type scale (px / line-height):
- Display:        96 / 0.96, serif 700, letter-spacing −0.02 em
- H1 (article):   64 / 1
- H section:      32 / 1, serif 700, ls −0.01 em
- H card:         26 / 1, serif 700
- Eyebrow:        32 / 24 px, serif italic, slate
- Eyebrow lg:     40 / 1, serif italic
- Lead (article): 24 / 1.3, serif italic
- Body:           16 / 24 px, Karla
- Label / nav:    14 / 1, serif (or Karla)
- Mono caption:   10–14 / 1, mono, often letter-spaced 0.06–0.08 em

### Spacing
4 / 8 / 12 / 16 / 20 / 24 / 32 / 50 / 60 / 100 / 110 px scale.

### Radii / borders
- Pill: 999.
- Cards: 0 (sharp).
- Hairline: 1 px solid `--hairline`.

### Shadows
None on cards. Hover states use translate, not shadow.

## Assets
- `assets/hero-paragliding.jpg`, `assets/takeoff-hero.jpg`, `assets/news-fjall.jpg`, `assets/luftrum.png`, `assets/klubbussen.png` — local Åre photography used as placeholder imagery (each card uses a unique crop + CSS filter treatment to disambiguate).
- Replace all of these with real, licensed club photography on implementation. Each card position should get its own photo, not the same photo recropped.

## Files in this bundle
- `flygare.html` — entry HTML, contains all CSS in a single `<style>` block and bootstraps React + Babel + the JSX modules below.
- `app.jsx` — root `<App />`, hash routing.
- `pages.jsx` — page-level components (Home, Nyheter, SingleNews, Information, Startplats, Vader, Medlem).
- `components.jsx` — shared components (Header, Footer, NewsCard, InfoCard, NewsItem, Compass, etc.).
- `data.jsx` — sample content: news articles, takeoff sites, info cards, weather.
- `image-slot.js` — `<image-slot>` web component for user-droppable photo placeholders.
- `assets/` — image placeholders.

## Implementation notes
- The single-file React prototype uses inline styles + a global `<style>` block. In a real codebase, port to CSS Modules / Tailwind / your existing system — the tokens above are the contract.
- The site is laid out at **1600 px**. Make it responsive on implementation: the editorial display sizes (96 px) should scale with `clamp()` or a breakpoint at ~1024 px and ~640 px. The 2-column article layout collapses to 1 column on mobile with the aside moving below.
- Swedish copy is final — keep Swedish characters (å, ä, ö) intact and load fonts with full Latin Extended subset.

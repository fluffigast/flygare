# Design Audit & Enhancement Spec — flygare.nu

Fullständig designaudit och prioriterad backlog. Agenten jobbar P0 → P1 → P2 → P3.

## Stack

Vite + React + Tailwind v4, self-hosted variable fonts (Source Serif 4, Karla, JetBrains Mono), shadcn-stil token-arkitektur, MapLibre.

## Behåll (fungerar)

- Typografi-par: Source Serif 4 (rubriker, variable 200–900), Karla (brödtext), JetBrains Mono (laddad men underanvänd).
- Self-hosted woff2 med `font-display: swap`, latin-ext för svenska.
- Base `font-size: 1.125rem` (18px).
- Full shadcn-tokenlager inklusive `.dark` som idag är oanvänt — gratis real estate.
- Mikro-interaktioner: `nav-link` underline sweep, `info-card-lift`, focus-visible-rings på carousel dots.
- MapLibre popups tema-matchade.
- Semantisk HTML: `role="region"`, `aria-label`, radiogroup på carousel.

## 1. Globala fixes

1. Favicon `vite.svg` → klubbmärke (SVG + apple-touch-icon + 32px PNG).
2. Dubbla `<title>`.
3. Canonical + og:image pekar på `flygare.nu` medan sajten körs på Azure SWA-domänen. Fixa post-cutover eller generera per deploy.
4. Inline `style="..."` överallt (`var(--ink, #020618)`-fallback). Flytta till Tailwind-tokens.
5. Två parallella tokensystem (`--ink/--slate/--hero-accent` och shadcn `--primary/--muted`). Konsolidera.

## 2. Tokens (förslag)

```css
:root {
  --ink: #020618; --ink-2: #0f172b;
  --slate: #62748e; --slate-2: #90a1b9;
  --border: #e2e8f0;
  --accent: #3774a3; --accent-strong: #2a5c82;
  --signal-safety: #b45309;  /* amber — tvingande regler */
  --signal-danger: #dc2626;  /* nödkontakter, TMA-varning */
  --signal-ok: #16a34a;      /* flygbart */
  --radius: 0.625rem;
  --shadow-card: 0 1px 3px rgb(2 6 23 / .06), 0 8px 24px rgb(2 6 23 / .07);
  --shadow-pop: 0 12px 40px rgb(2 6 23 / .14);
}
```

- `#3774a3` på vitt ≈ 4.6:1 — klarar AA för stor text, fail för 400w body. Använd `--accent-strong` för text-länkar.
- Flygregel-bannern ska vara amber (`--signal-safety`), inte blå — semantiken är "obligatoriskt".
- Ship dark mode (tokens finns, bara toggle saknas).

## 3. Typskala

| Token | Storlek | Användning |
|---|---|---|
| `--text-hero` | `clamp(2.75rem, 5.5vw, 4.75rem)` lh 1.04 | Hem-hero H1 |
| `--text-h1` | `clamp(2rem, 3.5vw, 3rem)` lh 1.08 | Sidtitlar |
| `--text-h2` | `clamp(1.5rem, 2.5vw, 2rem)` lh 1.15 | Sektionstitlar |
| `--text-h3` | 1.375rem lh 1.2 | Kort-titlar |
| `--text-lead` | 1.125rem lh 1.6 | Intro-paragrafer |
| `--text-body` | 1rem (root 18px) lh 1.6 | Brödtext |
| `--text-meta` | 0.8125rem | Datum, caption — **ta bort 10/11px** |
| `--text-eyebrow` | 0.75rem uppercase tracking 0.14em | Serif italic labels |

- Hem-hero H1 är idag `clamp(14px, 1.6vw, 24px)` — värsta enskilda defekten. Ska vara `--text-hero`.
- Hem-hero-höjd `clamp(240px, 30vw, 440px)` → `clamp(420px, 72vh, 720px)`.
- Inner-sidor har redan `clamp(340px, 52vh, 560px)` — behåll.
- Använd JetBrains Mono för koord, frekvenser, vindstyrka, tid, licens. `tabular-nums` på numeriska tabeller.

## 4. Komponenter

**Header:** liten logomark + wordmark. Scroll → backdrop-blur + translucent + border. "Bli medlem" ska ha accent-fill.

**Alert bar:** amber (`--signal-safety`). Cookie-dismiss 7 dagar, aldrig för första besöket.

**Weather panel (hem):** skeleton-cards under laddning. Per-plats rader med vindpil roterad till riktning, mono/tabular för hastighet, grönpunkt < 6 m/s, amber 6–9, röd > 9. Cache 10 min, visa senaste + timestamp vid fel.

**News carousel:** behåll arrows desktop, dots mobil. `scroll-snap-type: x mandatory` i stället för JS. `<img loading="lazy" decoding="async">` + aspect-ratio + explicit w/h (CLS). Stagger `animation-delay: 60ms * index`.

**Stats strip:** count-up vid scroll-into-view, respektera `prefers-reduced-motion`. Serif + `tabular-nums`.

**Footer:** logomark + social icons (Facebook/YouTube finns på Kontakt, saknas i footer). Back-to-top. `py-24` → `py-16`.

**Tables:** header uppercase `--text-eyebrow` slate, radgräns `--border`, zebra `#fafbfc`, `tabular-nums` + högerjustera siffror. Applicera på tävlingsresultat, licenskrav, radiofrekvenser.

**Nödkontakter:** röd-tintad kort (`--signal-danger` 8% bg, 4px vänster border), större type, `tel:`-länkar.

**Tidslinje (Om):** vertikal 2px `--border`-linje, 10px accent-prickar, år i serif bold.

**Pricing (Bli medlem):** max-w-md, border, `--shadow-card`, 600 kr som serif 56px, "Giltigt t.o.m. …" som meta, CTA accent-fill rounded-full, QR i bordered inset.

**Startplatser:** compass-badge SVG-pil roterad till vindexponering + bokstav (SO, V, S–SV). Varningstexter (vajrarna) → callout-komponent med amber vänsterborder.

**Hub-sidor:** lucide-ikoner + accent-vänsterborder på 3 säkerhetskritiska (Säkerhet, Flygregler, Luftrum). Aktiviteter → datum-poster-kort. Sticky in-page sub-nav på `/flyga-i-are/*`.

## 5. Motion

```css
@media (prefers-reduced-motion: no-preference) {
  [data-reveal] { animation: fade-up .5s ease-out both; }
  [data-reveal]:nth-child(2) { animation-delay: .07s }
  [data-reveal]:nth-child(3) { animation-delay: .14s }
}
@keyframes fade-up { from { opacity:0; transform: translateY(12px) } }
```

Hero: scale 1.0 → 1.04 på 8s ease-out. Hovers ≤ 250ms, card-lifts 200ms.

## 6. Performance

- **LCP:** hero som `<img fetchpriority="high">` + srcset (1920/1280/768w, WebP/AVIF). Nu är det `background-image` på div (osynlig för browser preloader).
- Självhosta Unsplash-bilder → WebP via Vite eller image-CDN.
- Code-split MapLibre så den bara laddas på `/startplatser`.
- Preload bara de två font-filer som används above-fold.

## 7. Tillgänglighet

- `--slate-2` (#90a1b9) på <14px fail. Bump till `--slate`. (Redan ändrat `--slate-2` till `#6b7d95` i tidigare PR.)
- Focus-ring på ALLA interaktiva element efter token-konsolidering.
- Vindpil-riktning i text ("Västlig 12 m/s"), inte bara rotation.
- Hub-"kort": `h3` istället för `p`+`strong`.
- Dark mode via `prefers-color-scheme` + toggle.

## 8. Prioriterad backlog

- **P0 — brand (timmar):** favicon, og:image/canonical, dubbel title, hero H1-storlek, byt återvunna site-foton.
- **P1 — hierarki & konvertering (1–2 dagar):** full-höjd hero, accent-system + amber-banner, weather-panel med skeleton + vindvisualisering, pricing-card, member-CTA, table-komponent.
- **P2 — struktur (2–4 dagar):** inline-style → tokens, sticky sub-nav, hub-ikoner, tidslinje, stats count-up, mobil-meny, dark mode-toggle.
- **P3 — polish (löpande):** bildpipeline (WebP/srcset), MapLibre code-split, count-up + reveal, radio-panel, footer-redesign.

## 9. Noteringar

Inner-sidors hero-höjder (`clamp(340px, 52vh, 560px)`) visar att redesign redan börjat där. Hem är efter. Rätta hem-hero först, sedan push alla vidare till nya skalan.

## Stack

Vite + React 19 + Tailwind 4. Payload CMS with local data fallback. Use pnpm.

## Layout

- Gap on parent containers, not margins on children.
- Radix UI primitives for interactive elements (dialogs, radio groups, separators).

## Components

- Single-purpose. One component, one job.
- Arrow functions. No class components.

## Styling

- Tailwind utilities. Inline `style` only for computed values (dynamic colors, transforms).
- Responsive: mobile-first with md/lg breakpoints.

## CMS

- Check CMS is running before CMS work. Always fall back to local data via `useCMS` hooks.
- Views own their own container layout (MainLayout only provides Header + Outlet + Footer).

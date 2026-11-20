# UI Redesign

## Audit summary

The app already had a solid architectural foundation — every component
(`Button`, `Card`, `Badge`, `Dialog`, `Tabs`, `Select`, `DropdownMenu`, `Input`,
`Textarea`, `Label`, `Form`) reads its colors from CSS custom-property tokens
defined once in `src/app/globals.css`, rather than hardcoding Tailwind color
classes. That meant the redesign was mostly a **token-level** change, not a
component rewrite. The concrete problems found:

1. **Indigo/purple brand color** (`#4f46e5` primary, `#6366f1` accent) used
   throughout — buttons, links, active nav state, focus rings, the
   notification dot, badges. Directly against the "restrained monochrome"
   brief.
2. **A literal gradient** (`bg-gradient-to-br from-primary to-purple-600`) on
   the sidebar's placeholder avatar — the one place a decorative gradient had
   snuck in.
3. **Three routes silently broken**: `error.tsx`, `loading.tsx`, and
   `not-found.tsx` referenced CSS variables (`--fg-primary`, `--bg-elevated`,
   `--accent-hover`, `--border-strong`, `--error`, etc.) that **do not exist**
   anywhere in `globals.css`. They rendered with browser-default fallback
   colors (invisible/near-black text on transparent backgrounds in places).
4. **Duplicated, un-designed auth forms** — `LoginForm` and `RegisterForm`
   hand-rolled raw `<input>`/`<button>` markup with copy-pasted Tailwind
   strings instead of the existing `Card`, `Input`, `Label`, `Button`
   components, so they drifted from the rest of the system (no focus-ring
   offset, different border radius rhythm, no loading state).
5. **No empty states** on the dashboard's Notes/Snippets/Activity lists —
   an empty workspace rendered nothing but blank space instead of guidance.
6. No `prefers-reduced-motion` handling anywhere, despite several components
   already using enter/exit animations.

Everything else (layout, spacing, information architecture, component
structure, Server/Client boundaries, Prisma/auth logic) was left untouched —
it didn't need to be rebuilt, only re-skinned and finished.

## Color system

Two foundational colors, both warm neutrals (Tailwind's "stone" scale) —
never pure black or pure white — with tonal surfaces for elevation and a
small set of semantic colors used only for status:

| Token | Light | Dark | Purpose |
|---|---|---|---|
| `--background` | `#fafaf9` | `#0c0a09` | Page canvas |
| `--foreground` | `#1c1917` | `#f5f5f4` | Primary text |
| `--card` / `--popover` | `#ffffff` | `#171412` | Elevated surfaces |
| `--primary` | `#1c1917` (near-black) | `#f5f5f4` (off-white) | Inverts per theme — CTAs, active states |
| `--secondary` / `--muted` | `#f5f5f4` | `#211d1a` | Low-emphasis surfaces |
| `--muted-foreground` | `#57534e` | `#a8a29e` | Secondary text (AA-checked) |
| `--accent` | `#e7e5e4` | `#2b2622` | Hover/tint surfaces |
| `--border` / `--input` | `#e7e5e4` | `rgba(255,255,255,.08/.14)` | Hairlines |
| `--destructive` | `#dc2626` | `#ef4444` | Errors only |
| `--success` | `#15803d` | `#22c55e` | Status only (task/badge) |
| `--warning` | `#b45309` | `#f59e0b` | Status only (task/badge) |

`--primary` is the key move: instead of a brand hue, it's the near-black (or
off-white in dark mode) foundation color, inverted — the same pattern Linear
and Vercel use for their "solid" button. No other component introduces a new
hue. All tokens are defined once in `:root` / `.dark` in `globals.css` and
consumed everywhere via Tailwind's `@theme inline` mapping — there is nowhere
else in the codebase a color is hardcoded.

## Typography

Unchanged font stack (Geist Sans / Geist Mono via `next/font`), Tailwind's
default type scale. Adjusted weight usage for a calmer hierarchy: page and
card titles moved from `font-bold` to `font-semibold` (bold read as loud
against the new neutral palette), stat values likewise.

## Motion

- Reused the existing `tailwindcss-animate`-based `animate-in fade-in-0
  slide-in-from-bottom-*` pattern (already used on the dashboard) and
  extended it to the auth card, `error.tsx`, and `not-found.tsx`, plus a
  staggered entrance (`[animation-delay:Nms]`) on the four dashboard stat
  cards.
- Added a global `@media (prefers-reduced-motion: reduce)` block in
  `globals.css` that collapses all animation/transition durations to near-zero
  — nothing in the app opted out of it individually.
- Kept existing Radix-driven component transitions (`Dialog`, `Tooltip`,
  `DropdownMenu`, `Select`) as-is; they already used the same token-based,
  restrained timing.

## Component changes

- **`Badge`**: `success`/`warning` variants now read `--success`/`--warning`
  tokens instead of hardcoded `green-500`/`amber-500`/`blue-500`; the
  `accent` variant no longer tints with the (now neutral) primary color at a
  visible hue — it reads as a plain neutral chip. Removed the unused `info`
  variant (verified no call sites).
- **`Sidebar`**: gradient avatar replaced with a flat `bg-primary` fill.
- **Auth forms**: `LoginForm`/`RegisterForm` rebuilt on top of `Card`,
  `Input`, `Label`, `Button` (with `loading` state) instead of duplicated
  markup. `(auth)/layout.tsx` now shows the app's actual brand mark above the
  card instead of a bare centered box.
- **`error.tsx` / `loading.tsx` / `not-found.tsx`**: rewritten to use the
  real design tokens (`bg-destructive/10`, `text-muted-foreground`, etc.)
  instead of undefined CSS variables; `error.tsx`'s retry action now uses the
  shared `Button` component; `loading.tsx` uses Tailwind's built-in
  `animate-spin` instead of a hand-rolled `<style>` keyframe.
- **Dashboard**: dropped the emoji from the welcome heading, added staggered
  entrance + hover-lift to the four stat cards, and added empty-state copy
  for Notes, Snippets, and Recent Activity (previously rendered nothing at
  all when a workspace had no data).

## Accessibility

- All muted-foreground/foreground pairings were chosen from Tailwind's
  "stone" scale at the same 600/400 steps the original tokens already used
  for their (previously verified) AA contrast — light-mode
  `muted-foreground` on `muted` and dark-mode equivalent both clear 4.5:1.
- `prefers-reduced-motion: reduce` now disables animation/transition
  duration globally.
- Focus rings (`--ring`) now use the foreground color instead of a
  saturated indigo, keeping visible contrast in both themes without
  introducing a hue.
- No changes to semantics/ARIA — existing `aria-label`, `aria-current`,
  `sr-only` headings, and landmark structure were left intact.

## Verification performed

- `tsc --noEmit`, `eslint`, and `next build` all pass.
- Static grep across `src/` confirms zero remaining purple/indigo/violet
  references.
- Verified rendered DOM/CSS in a headless browser (both as raw computed
  styles and screenshots) for `/login` and `/register` in light and dark
  color schemes — correct background/text/card tokens, visible content,
  working entrance animation.

## Known limitations

- **Routes referenced in the sidebar nav** (`/projects`, `/tasks`, `/notes`,
  `/snippets`, `/extensions`, `/settings`) don't exist as pages yet — only
  the dashboard (`/`) is implemented. They weren't built as part of this
  pass since it was a visual redesign of the existing surface, not new
  feature work; the nav will 404 (or redirect to `/login`, since an
  auth-protecting proxy/middleware redirects any unmatched route there) until
  those pages exist.
- Because of that same proxy/middleware, `not-found.tsx` is only reachable
  for an authenticated user hitting a genuinely missing nested route inside
  the app shell — it could not be exercised end-to-end without a live login
  session in this pass, though its markup and tokens were verified directly.
- Deeper motion (page-transition choreography between routes, list
  reordering animations) was intentionally left out — the brief warns against
  gratuitous animation, and the current surface (one dashboard + two auth
  forms) doesn't have enough route/state variety to justify more without
  guessing at motion for pages that don't exist yet.

# CodeSpace — Development Guide

> **Stack**: Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS v4 · ESLint 9

This document captures the architectural decisions made in **Phase 1 (Foundation)** so that future contributors can build on a stable base without restructuring the project.

---

## Folder Structure

```
src/
├── app/                   App Router (routing, layouts, pages)
│   ├── (dashboard)/       Route group — authenticated shell
│   │   ├── layout.tsx     Shell: Sidebar + Header + <main>
│   │   └── page.tsx       Dashboard home
│   ├── globals.css        Global CSS design tokens
│   ├── layout.tsx         Root HTML shell (fonts, meta)
│   ├── loading.tsx        Suspense loading boundary
│   ├── error.tsx          Error boundary (Client Component)
│   └── not-found.tsx      404 page
├── components/
│   ├── layout/            Shell components: Sidebar, Header, NavLink
│   └── ui/                Primitive components: Button, Badge
├── lib/
│   ├── constants.ts       App-wide constants (nav items, app name)
│   └── utils.ts           cn() helper and pure utilities
├── actions/               Server Actions (future phases)
├── hooks/                 Custom React hooks (future phases)
└── types/
    └── index.ts           Shared TypeScript interfaces
```

---

## Architectural Decisions

### 1. React Server Components (RSC) by Default

All components are RSCs unless they need:
- Browser APIs (`window`, `document`, `navigator`)
- Event handlers (`onClick`, `onChange`, etc.)
- React hooks that require client state (`useState`, `useEffect`, `usePathname`, etc.)

**Rule of thumb**: Add `"use client"` at the leaf of the component tree — never at a parent layout unless the entire subtree needs to be a client boundary.

**Example**: `Sidebar` is an RSC. It imports `NavLink` which is a Client Component because it calls `usePathname()`. The boundary is isolated at `NavLink`, keeping the rest of the sidebar server-rendered.

### 2. Route Groups

The `(dashboard)` route group applies a shared layout (sidebar + header) to all routes inside it without adding a URL segment. Future authenticated routes go inside this group.

```
app/
  (dashboard)/
    layout.tsx        ← shell layout
    page.tsx          ← /
    projects/
      page.tsx        ← /projects
    editor/
      page.tsx        ← /editor
```

To add a route *outside* the shell (e.g., a login page), place it at `app/login/page.tsx`.

### 3. Design Token System

All colours, spacing, and radii are defined as CSS custom properties in `globals.css` and exposed to Tailwind v4 via `@theme inline`. This means:

- **Never hardcode hex values in components** — always use `var(--token)` or the mapped Tailwind class.
- The single source of truth for the palette is `:root {}` in `globals.css`.
- Dark mode is *always on* in v1 (no toggle). System preference support can be added in Phase 2.

### 4. Navigation Data Flow

Nav items are defined as typed data in `lib/constants.ts` (`NAV_SECTIONS`). The `Sidebar` component maps over this data and renders `NavLink` for each item. Adding/removing nav items requires only a change to `constants.ts` — no component changes needed.

### 5. Import Aliases

Use `@/` to reference anything under `src/`:

```ts
import { cn } from "@/lib/utils";         // ✅
import { cn } from "../../lib/utils";     // ❌ — avoid relative paths
```

### 6. Metadata

Each page can export its own `metadata` object which merges into the root template defined in `app/layout.tsx`:

```ts
// app/(dashboard)/projects/page.tsx
export const metadata = {
  title: "Projects",  // Renders as "Projects | CodeSpace"
};
```

---

## Adding a New Route

1. Create `src/app/(dashboard)/[route-name]/page.tsx`
2. Export a default RSC component
3. Export `metadata` with at least a `title`
4. Add the route to `NAV_SECTIONS` in `lib/constants.ts` with a Lucide icon

---

## Adding a New Component

- **UI primitive** (button, input, badge) → `src/components/ui/`
- **Layout component** (sidebar section, toolbar) → `src/components/layout/`
- **Feature component** (project card, file tree) → `src/components/[feature]/`
- **Cross-feature shared** (avatar, empty state) → `src/components/shared/`

Mark as `"use client"` only if it needs hooks or DOM events.

---

## Server Actions

Place server actions in `src/actions/`. Name the file after the domain:

```
src/actions/
  projects.ts    ← createProject(), deleteProject()
  settings.ts    ← updateUserSettings()
```

Always mark the file (or individual functions) with `"use server"`.

---

## Custom Hooks

Client-only hooks live in `src/hooks/`. Convention: `use` prefix + descriptive name.

```
src/hooks/
  useDebounce.ts
  useLocalStorage.ts
```

---

## Running the Project

```bash
# Development server
npm run dev

# Type-check + lint
npm run lint

# Production build (verifies TypeScript + ESLint)
npm run build
```

---

## Future Phases (Backlog)

- **Phase 2**: Authentication (next-auth or Clerk), user context, protected routes
- **Phase 3**: Project management feature (CRUD, file tree)
- **Phase 4**: Integrated code editor (Monaco or CodeMirror)
- **Phase 5**: Integrated terminal (xterm.js)
- **Phase 6**: Git panel (libgit2 via WebAssembly or API)
- **Phase 7**: Command palette (⌘K), search
- **Phase 8**: Extensions / plugin system

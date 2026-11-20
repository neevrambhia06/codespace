# State Management Architecture

This document outlines the state management architecture used in the CodeSpace workspace. 
We strictly follow a separation of concerns to ensure performance, maintainability, and seamless Server Component compatibility in Next.js App Router.

## Client State (Zustand)

We use **Zustand** (with `persist` middleware via `localStorage`) to manage **client-only UI state and user preferences** that meet the following criteria:
- **Instant Feedback Required**: Actions like toggling the sidebar or switching simple local filters must happen immediately without a server roundtrip.
- **Persistent but Local**: These preferences (e.g., `sidebarCollapsed`, `compactMode`) are tied to the local machine/browser and shouldn't affect the canonical URL or server state. They enhance the developer's local workspace experience.
- **Not Shareable**: State that doesn't make sense to share in a URL (e.g., whether the user prefers the sidebar open or closed).

**Examples in our store (`useWorkspaceStore.ts`)**:
- `sidebarCollapsed`
- `compactMode`
- `taskFilter`
- `projectFilter`

## URL State (Search Params / Path)

We use the URL (and Next.js `useSearchParams`, `useRouter`, `Link`) for state that dictates **what is being viewed** and **needs to be shareable**.

**Examples**:
- `?q=search+query` (Global search queries)
- `/projects/[id]` (Currently selected project)
- `?modal=settings` (Deep linking to a specific view)

*Why not Zustand for this?* If a user copies the URL and sends it to a colleague, the application should load the exact same context (the searched project, the open modal). Zustand local storage cannot accomplish this.

## Server State (Database & Server Components)

We use **React Server Components (RSC)** and direct database queries (currently mocked) for the **source of truth**. 
Server state is never duplicated into the Zustand store simply for convenience.

**Examples**:
- User Profile
- List of Projects
- List of Tasks
- Knowledge Base Notes

*Why not Zustand for this?*
- Data fetching belongs on the server (faster, secure, less client bundle).
- React Server Components allow us to pass this data as props down to Client Components (like `<ProjectList>` and `<TaskList>`), which then apply the Zustand UI filters locally. This avoids syncing issues and data staleness.

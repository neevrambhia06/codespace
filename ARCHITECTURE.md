# CodeSpace Architecture

This document describes key architectural decisions for CodeSpace, specifically the boundary between Server Components and Client Components in our Next.js App Router implementation.

## Server Components vs. Client Components

CodeSpace is built using a **Server Component first** approach. This means by default, all components are Server Components. We explicitly define Client Components only when interactivity or client-side React features are required.

### Server Components
Server Components never ship JavaScript to the browser. They run exclusively on the server, resulting in smaller bundles, faster initial page loads, and direct access to backend resources (databases, APIs, filesystem).

**When we use them:**
- Data fetching
- Page layouts and shells (`layout.tsx`, `Sidebar.tsx`, `Header.tsx`)
- SEO-critical content
- Components that don't need user interactivity (like standard text, cards, non-interactive badges)

### Client Components (`"use client"`)
Client Components are pre-rendered on the server and hydrated on the client. They add JavaScript to the bundle.

**When we use them:**
- Interactivity and event listeners (e.g., `onClick`, `onChange`)
- State and lifecycle effects (e.g., `useState`, `useEffect`)
- Using browser APIs
- Any UI primitive that requires interactivity (e.g., `Dialog`, `DropdownMenu`, `Tabs`, `Button` if using hooks)
- Context providers (e.g., `ThemeProvider`)

## The Hydration Boundary

The boundary between Server and Client Components is critical to maintain performance. A common pattern in CodeSpace is passing Server Components as `children` or props to Client Components.

### Best Practices

1. **Keep Client Components at the Leaves:**
   Push `"use client"` down the component tree as far as possible. For example, instead of making an entire `Dashboard` a Client Component, extract the interactive button or dropdown into its own Client Component and import it into the Server Component dashboard.

2. **Passing Props Across the Boundary:**
   When passing props from a Server Component to a Client Component, the props must be **serializable** by React (strings, numbers, objects, arrays). You cannot pass non-serializable values (like classes or functions/callbacks) unless you're passing Server Actions.

3. **Interleaving Components (The `children` Pattern):**
   You *cannot* import a Server Component directly into a Client Component. It will automatically become a Client Component.
   Instead, you can pass a Server Component as a `children` prop (or any ReactNode prop) to a Client Component.

   **Correct Pattern:**
   ```tsx
   // Server Component (page.tsx)
   import { ClientWrapper } from './ClientWrapper';
   import { ServerContent } from './ServerContent';

   export default function Page() {
     return (
       <ClientWrapper>
         <ServerContent /> {/* This stays a Server Component! */}
       </ClientWrapper>
     );
   }
   ```

By adhering to these rules, CodeSpace maintains optimal performance, SEO, and developer experience.

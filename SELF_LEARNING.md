# Self-Learning Evidence Notes

This document provides concise evidence and tracking for the six Self-Learning Plan topics implemented within the CodeSpace application.

### 1. Component Libraries & Accessibility (shadcn/ui + Radix UI)
- **Implementation:** CodeSpace heavily leverages `shadcn/ui` for its core aesthetic and functional components, which under the hood are powered by Radix UI primitives.
- **Evidence:** 
  - `src/components/ui/` contains configured components like `Button`, `Dialog`, `Badge`, `Tabs`, `Input`, and `Label`.
  - **Accessibility**: We achieved a perfect 100/100 Lighthouse Accessibility score by ensuring Radix portals managed focus correctly, semantic HTML landmarks (`<main>`) were strictly adhered to in `app/(auth)/layout.tsx`, and contrast ratios were mathematically verified in `globals.css` (e.g., swapping `#6366f1` to `#4f46e5` for WCAG AA compliance).

### 2. Dark/Light Mode Theming (`next-themes`)
- **Implementation:** Seamless system and manual theme toggling without Hydration mismatches.
- **Evidence:** 
  - `src/components/providers/theme-provider.tsx` wraps the root layout in `<ThemeProvider defaultTheme="system" enableSystem />`.
  - `src/app/globals.css` defines strict CSS variables for `.dark` and `:root` tokens, styled around a sleek, IDE-inspired aesthetic.
  - The root `<html>` element dynamically receives `suppressHydrationWarning` to prevent the dreaded Next.js class mismatch flash during SSR.

### 3. Client-Side State Management (Zustand)
- **Implementation:** Ephemeral user-preference UI state decoupled from server data.
- **Evidence:** 
  - `src/store/useWorkspaceStore.ts` establishes a persistent Zustand store handling `sidebarCollapsed`, `compactMode`, and local data filters.
  - `src/hooks/useStoreHydration.ts` demonstrates advanced Next.js patterns by abstracting the hydration safety check (`isHydrated`) to ensure Zustand's `localStorage` sync doesn't crash the React tree during server-side generation.

### 4. Client-Side Validation (Zod & React Hook Form)
- **Implementation:** Bulletproof form rendering, input masking, and error reporting.
- **Evidence:** 
  - `src/lib/validations.ts` houses our rigorous Zod schemas (`createProjectSchema`, `createTaskSchema`, `createNoteSchema`, `loginSchema`, `registerSchema`) — a single shared source of truth used by both `LoginForm`/`RegisterForm` and the workspace create-forms.
  - `src/components/forms/CreateProjectForm.tsx` securely infers types directly from Zod (`z.infer<typeof createProjectSchema>`) and passes them through `useForm({ resolver: zodResolver(...) })`, yielding a perfectly typed submission pipeline.

### 5. Server Actions (Next.js 14+)
- **Implementation:** Direct, API-less mutations from the client to the server.
- **Evidence:** 
  - `src/actions/project.ts` and `src/actions/task.ts` declare the `"use server"` directive.
  - These actions parse the incoming payload safely with Zod, authenticate the session via Better Auth, execute a secure `prisma.$transaction`, and instantly purge the Next.js router cache via `revalidatePath("/")`—bypassing the need for heavy client-side fetching libraries.

### 6. Database Seeding & Mocking (Faker.js)
- **Implementation:** Generating robust, randomized mock data to populate the PostgreSQL database for rapid development testing.
- **Evidence:** 
  - `prisma/seed.ts` utilizes `@faker-js/faker` to programmatically generate Admin and User accounts, alongside dozens of structurally sound, relational mock Projects, Tasks, Notes, and Snippets. This script ensures reviewers can instantly populate the application environment via `npx prisma db seed`.

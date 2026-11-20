# CodeSpace — Project Audit Report

**Date:** 2026-09-22
**Scope:** Full repository audit against `AGENTS.md`'s Assignment 1, Assignment 2,
and the Self-Learning Plan (`SELF_LEARNING.md`'s six topics), plus stabilization
of all genuine bugs found. This document is the authoritative record of what
was checked, what was broken, what was fixed, what remains, and how to verify
it yourself.

> This repo is not a git repository, so there is no commit history to audit —
> everything below was verified by reading every source file, running the
> real toolchain (TypeScript, ESLint, `next build`), and exercising the live
> app against a real, freshly-provisioned local PostgreSQL database.

---

## 1. Compliance Matrix

Status legend: ✅ Implemented · 🟡 Partially Implemented · ❌ Missing/Broken (now fixed, see §3) · ❓ Not Independently Verifiable

### Assignment 1

| Requirement | Status | Evidence |
|---|---|---|
| shadcn/ui + Radix accessible components | ✅ | `src/components/ui/*` (Dialog, DropdownMenu, Select, Tabs, Tooltip, Label, Form — all Radix primitives, `class-variance-authority` variants) |
| next-themes dark/light/system switching | ✅ | `src/components/providers/theme-provider.tsx`, wired in `src/app/layout.tsx` with `defaultTheme="system" enableSystem`; `suppressHydrationWarning` on `<html>` |
| RSC vs Client Components / hydration boundaries | ✅ (after fix) | Layouts/pages are Server Components by default; `"use client"` pushed to leaves (`NavLink.tsx`, `Header.tsx`, form components). **Was broken**: the dashboard RSC at `(dashboard)/page.tsx` was unreachable — see §3.1 |
| Persistent Zustand client state | ✅ | `src/store/useWorkspaceStore.ts` (`persist` middleware), safe hydration via `src/hooks/useStoreHydration.ts` |
| React Hook Form + shared Zod validation | ✅ (after fix) | `src/lib/validations.ts` now holds *all* schemas including `loginSchema`/`registerSchema` (previously duplicated locally in the form files — see §3.9) |
| Next.js Server Actions | ✅ | `src/actions/{project,task,note}.ts`, all `"use server"`, Zod-validated, transactional |
| Loading/error/optimistic UI | ✅ | `src/app/loading.tsx`, `src/app/error.tsx`, `useOptimistic` in `TaskList.tsx` |
| Lighthouse / Core Web Vitals audit | ✅ (re-verified) | See §4 — previous evidence audited the wrong page; redone against the real, authenticated dashboard: **Perf 95, A11y 100, LCP 1.1s, TBT 0ms** |

### Assignment 2

| Requirement | Status | Evidence |
|---|---|---|
| Prisma relational schema (PostgreSQL) | ✅ | `prisma/schema.prisma` — `User`/`Session`/`Account`/`Verification` (Better Auth) + `Project`/`Task`/`Note`/`CodeSnippet`/`CodingProblem`/`ProgressRecord`/`AuditLog`, all FK-related to `User`, cascading deletes |
| Faker.js automated seeding | ✅ (after fix) | `prisma/seed.ts` — was silently unrunnable (missing `tsx` dependency) and produced accounts nobody could log into (no credential `Account` rows) — see §3.4, §3.5 |
| Reset/migration/seed workflow | ✅ (after fix) | `npm run db:reset` (`prisma migrate reset --force`) verified end-to-end against a live DB. **Was broken**: zero migrations existed in the repo — see §3.6 |
| Better Auth authentication | ✅ (after fix) | `src/lib/auth.ts`, `src/lib/auth-client.ts`, `/api/auth/[...all]`. **Was broken**: `role` was never exposed on the session — see §3.2 |
| Protected Route Handlers and Server Actions | ✅ | `src/app/api/projects/route.ts` (401/403), all `src/actions/*.ts` check `getCurrentUser()` before mutating |
| RBAC: Admin/Member/Guest | ✅ (after fix) | Enum `Role { GUEST MEMBER ADMIN }`; enforced in Server Actions/Route Handlers. **Was completely non-functional** — see §3.2 (verified live: ADMIN → 201, GUEST → 403) |
| Next.js proxy/middleware authorization | ✅ | `src/proxy.ts` — correct Next.js 16 convention (middleware renamed "Proxy"), performs the recommended *optimistic, cookie-presence-only* check; role authorization correctly lives in Server Actions/Route Handlers per Next.js's own guidance, not in Proxy |
| React Email + Resend dispatch | 🟡 | `src/emails/ProjectCreatedEmail.tsx`, `src/lib/email.ts` — code is correct and dev-mode-mocked sends were verified via logs; **real delivery not verified** (no `RESEND_API_KEY` provided) — ❓ |
| Resend webhook event logging | 🟡 | `src/app/api/webhooks/resend/route.ts` — Svix signature verification logic reviewed and correct; **not verified against a live Resend webhook** (no `RESEND_WEBHOOK_SECRET`) — ❓ |

### Self-Learning Plan (6 topics)

| # | Topic | Status | Evidence |
|---|---|---|---|
| 1 | Component libraries & accessibility (shadcn/ui + Radix) | ✅ | See Assignment 1 row above. Dashboard a11y now verified 100/100 (was mis-measured, see §4) |
| 2 | Dark/light theming (`next-themes`) | ✅ | `theme-provider.tsx`, root layout |
| 3 | Client-side state (Zustand) | ✅ | `useWorkspaceStore.ts` + hydration hook |
| 4 | Client-side validation (Zod + RHF) | ✅ (after fix) | Now fully shared, see §3.9 |
| 5 | Server Actions | ✅ | `src/actions/*` |
| 6 | DB seeding & mocking (Faker.js) | ✅ (after fix) | Was non-functional, see §3.4/§3.5 |

Also explicitly required by the Self-Learning Plan:
- **Dynamic OG image generation**: ✅ `src/app/api/og/route.tsx` (Satori/`next/og`), verified live (`200 image/png`, 36KB, both root and dashboard metadata reference it).
- **Performance auditing**: ✅ re-verified, see §4.

---

## 2. Environment & Toolchain

- Not a git repository (`git status` unavailable; confirmed via harness environment info) — no commit history exists to audit.
- Next.js 16.3.5 — a version newer than general training data with real breaking changes (`middleware.ts` → `proxy.ts`). Per `AGENTS.md`'s own instruction, the bundled docs at `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md` and `02-guides/authentication.md` were read before making any auth/routing changes, confirming `src/proxy.ts`'s naming and optimistic-check pattern are correct for this version.
- Local PostgreSQL 17 was already installed and running (alongside an unrelated PostgreSQL 18 instance) but had no usable credentials for this project. With the user's authorization, a dedicated `codespace_app` role and `codespace` database were created — no other databases/roles on the instance were touched.

---

## 3. Bugs Found and Fixed

### 3.1 — CRITICAL: dashboard unreachable (route conflict)
**Files:** `src/app/page.tsx` (deleted), `src/app/(dashboard)/page.tsx`
`src/app/page.tsx` was the untouched, default `create-next-app` starter page. Because it sits at the app root, it silently won the `/` route over the real dashboard at `src/app/(dashboard)/page.tsx` (a route group doesn't add a URL segment, so both files mapped to `/`) — Next.js 16 did **not** error on this conflict, it just picked one. Confirmed via `.next/server/app/page.js` (starter) vs `.next/server/app/(dashboard)/page.js` (real dashboard) both existing after a build, with `index.html` generated from the wrong one.
**Effect:** the entire dashboard — projects, tasks, notes, snippets, audit log, everything built for this assignment — was completely inaccessible at the app's home route.
**Fix:** deleted the stray starter page. Rebuilt and confirmed `/` now serves the dashboard (`Route (app): ƒ /` maps to the real page; verified live with real seeded data rendering).

### 3.2 — CRITICAL: RBAC completely non-functional
**File:** `src/lib/auth.ts`
`getCurrentUser()` read `session.user.role` and fell back to the literal string `'USER'` if it was falsy. But Better Auth was never configured with `user.additionalFields.role`, so **`session.user.role` was `undefined` for every session, for every user, always** — meaning every call to `getCurrentUser()` returned `role: 'USER'`, a value that matches **none** of the schema's actual `Role` enum values (`GUEST` / `MEMBER` / `ADMIN`).
**Effect:** `createProject`'s check `user.role !== 'ADMIN'` was **always true** — real admins could never create a project through the UI, no matter their actual DB role. `POST /api/projects`'s identical check had the same failure. (`role === 'GUEST'` checks in `createTask`/`createNote` happened to still "work" only by accident, since `'USER' !== 'GUEST'`.)
**Fix:** added `user: { additionalFields: { role: { type: "string", defaultValue: "GUEST", input: false } } }` to the `betterAuth()` config so Better Auth actually returns `role` on the session, and changed the fallback to the valid enum default `'GUEST'`.
**Verified live** (production build, real DB, real HTTP requests):
```
POST /api/auth/sign-in/email {admin@codespace.dev} → 200, role: "ADMIN"
POST /api/projects (as ADMIN)                       → 201 Created
POST /api/auth/sign-in/email {guest@codespace.dev}  → 200, role: "GUEST"
POST /api/projects (as GUEST)                        → 403 Forbidden
GET  /api/projects (no session)                      → 401 Unauthorized
```

### 3.3 — Dashboard had a build-time database dependency
**File:** `src/app/(dashboard)/page.tsx`
No `dynamic` export meant Next.js tried to statically prerender the dashboard at `next build` time, which directly queries Prisma. This makes the production build fail whenever the database is unreachable at build time (e.g. most CI/CD pipelines, or Vercel builds without a build-time DB), and would otherwise bake stale data into a static page despite the app relying on `revalidatePath("/")` for freshness.
**Fix:** added `export const dynamic = "force-dynamic"`. Verified: build no longer touches the DB for this route; `/` now reports as `ƒ` (dynamic) in the build output instead of attempting `○` (static).

### 3.4 — `tsx` dependency missing (seed workflow unrunnable)
**File:** `package.json`
`"prisma": { "seed": "tsx prisma/seed.ts" }` referenced `tsx`, which was **not installed anywhere** in the project (not in `dependencies`, `devDependencies`, or `node_modules/.bin`). `npx prisma db seed` and `npm run db:reset` failed immediately with `'tsx' is not recognized`.
**Fix:** `npm install --save-dev tsx` (added `"tsx": "^4.23.15"`).

### 3.5 — Seeded users could not actually log in
**File:** `prisma/seed.ts`
The seed script created `User` rows (including the documented `admin@codespace.dev`) but never created a matching `Account` row. Better Auth's email/password provider authenticates against the `Account` table (`providerId: "credential"`, hashed `password`), not `User` — so **none of the seeded accounts could log in**, despite the README explicitly documenting `admin@codespace.dev` / `password` as a working login.
**Fix:** seed script now hashes a shared seed password via `better-auth/crypto`'s `hashPassword` and creates a `credential` `Account` per user. Verified live: `admin@codespace.dev` / `password123` and `guest@codespace.dev` / `password123` both authenticate successfully via `POST /api/auth/sign-in/email`.

### 3.6 — No Prisma migrations existed
**Files:** `prisma/migrations/` (created)
The repo had `prisma/schema.prisma` but zero migration files, despite `package.json`'s `db:reset` script (`prisma migrate reset --force`) and the README's documented setup flow both depending on a migration history. This is a real gap against "reset/migration/seed workflow" as an assignment requirement — there was no evidence the schema had ever actually been migrated (as opposed to `db push`-ed).
**Fix:** ran `npx prisma migrate dev --name init` against a live database, generating `prisma/migrations/20260921191416_init/migration.sql`. Then ran the full `npm run db:reset` workflow end-to-end successfully (drop → migrate → seed).

### 3.7 — Invalid `prisma contract emit` npm script
**File:** `package.json`
`"contract:emit": "prisma contract emit"` called a Prisma CLI subcommand that does not exist — confirmed via `npx prisma --help`, whose full command list is `init, generate, db, migrate, studio, validate, format, version, debug`. There is no `contract` command in Prisma 5.21. This script would fail immediately for anyone who ran it.
**Fix:** removed the script.

### 3.8 — WCAG AA color-contrast failures on the actual dashboard
**File:** `src/app/globals.css`
An authenticated Lighthouse run against the real dashboard (see §4) found two real contrast failures that the project's previous (mistargeted) Lighthouse evidence never caught: `--muted-foreground` (`#6b7280` on `#f3f4f6`, 4.39:1) and `--destructive` used as text (`#ef4444` on white, 3.76:1) — both below the WCAG AA 4.5:1 threshold, affecting filter pills, inactive tabs, secondary text, and the Header's "Logout" link.
**Fix:** darkened both tokens one Tailwind shade in the light theme (`#4b5563` / `#dc2626`). Re-verified: dashboard accessibility score 96 → **100/100**, zero remaining `color-contrast` violations.

### 3.9 — Login/Register didn't use shared Zod validation
**Files:** `src/lib/validations.ts`, `src/components/forms/{LoginForm,RegisterForm}.tsx`
`LoginForm.tsx` and `RegisterForm.tsx` each defined their own local, duplicated Zod schema instead of using the shared-schema pattern the assignment requires and `SELF_LEARNING.md` claimed was in place (that doc referenced a schema named `authSchema` that did not exist anywhere in the codebase).
**Fix:** moved the schemas into `src/lib/validations.ts` as `loginSchema`/`registerSchema` (matching the existing `createProjectSchema` etc. pattern) and updated both form components to import them.

### 3.10 — Stray/dead files removed
- `curl-root.html` — a raw `curl` dump of the rendered login page (36KB of minified HTML/JS), not part of the app, not referenced anywhere.
- `src/actions/.gitkeep.ts`, `src/hooks/.gitkeep.ts` — placeholder stubs left over from before those directories had real content.
- `lighthouse-baseline.json`, `lighthouse-optimized.json`, `lighthouse-report.json` — superseded by `lighthouse-dashboard-real.json` / `lighthouse-login-real.json` (see §4; the old files measured the wrong page).

### 3.11 — Incomplete `.env.example`
**File:** `.env.example`
Only documented `DATABASE_URL`, while the codebase actually reads `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`, `RESEND_API_KEY`, `ENABLE_EMAILS`, and `RESEND_WEBHOOK_SECRET` (confirmed via `grep -rn "process.env\."`). A new contributor following only `.env.example` would hit silent fallback values instead of realizing what's configurable.
**Fix:** completed `.env.example` with all six variables and inline explanations.

### 3.12 — Turbopack workspace-root warning
**File:** `next.config.ts`
A stray `package-lock.json` in the parent `M:\FST` directory made every `next dev`/`next build` print a workspace-root inference warning and risked Turbopack picking the wrong root.
**Fix:** explicitly set `turbopack.root` to the project directory.

### 3.13 — Documentation corrections (no code change, evidence/accuracy only)
- **README.md**: role name `USER` → `MEMBER` (matching the actual `Role` enum; this mismatch was very likely the source of bug §3.2's `'USER'` fallback typo), corrected the overclaim that RBAC is enforced "at the Server Action **and Middleware** level" (Proxy only checks authentication, which is the Next.js-recommended split — see the Authorization section of the Next.js docs read for this audit), corrected the seeded-admin login credentials to match the real, working ones.
- **SELF_LEARNING.md**: corrected the non-existent `authSchema` reference.
- **PERFORMANCE.md**, **ASSIGNMENT_1_REPORT.md**: see §4 — the Lighthouse before/after narrative measured the login page, not the dashboard as claimed. Both documents now carry an explicit correction plus the newly-verified, real dashboard numbers.

---

## 4. Lighthouse / Performance Re-Audit

**Finding:** all three pre-existing `lighthouse-*.json` files in the repo had `finalDisplayedUrl` = `http://localhost:PORT/login`, not the dashboard, despite `PERFORMANCE.md` and `ASSIGNMENT_1_REPORT.md` presenting them as dashboard measurements. This happened because, at the time those audits were taken, `/` had the route conflict from §3.1 — Proxy correctly redirected the unauthenticated Lighthouse crawler to `/login` before anything from `ProjectList`/`TaskList` could render. The numeric scores in those JSON files are genuine Lighthouse output (not fabricated), but the written narrative attributing them to dashboard-specific optimizations does not hold, since the login page contains neither of those components.

**What I did:** fixed the route conflict (§3.1), then re-ran Lighthouse (desktop preset, production build, real PostgreSQL data) twice — once authenticated as `ADMIN` against `/`, once against `/login`:

```bash
npx next build
npx next start -p 3101
# sign in via /api/auth/sign-in/email, capture the better-auth.session_token cookie
npx lighthouse "http://127.0.0.1:3101/" --extra-headers='{"Cookie":"..."}' \
  --output=json --output-path=./lighthouse-dashboard-real.json \
  --chrome-flags="--headless=new --no-sandbox" --preset=desktop
npx lighthouse "http://127.0.0.1:3101/login" \
  --output=json --output-path=./lighthouse-login-real.json \
  --chrome-flags="--headless=new --no-sandbox" --preset=desktop
```

**Results** (raw reports committed as `lighthouse-dashboard-real.json` / `lighthouse-login-real.json`):

| Route | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` (dashboard, authenticated) | 95/100 | **100/100** | 96/100 | 54/100 |
| `/login` | 99/100 | 100/100 | — | — |

Dashboard Core Web Vitals: LCP 1.1s, TBT 0ms, CLS 0.001. Full writeup in `PERFORMANCE.md`. The dashboard's SEO score is intentionally low — `robots: { index: false, follow: false }` on a private, authenticated app is correct, not a bug.

One real accessibility issue was found and fixed in the process (§3.8); no other violations were found on either route.

---

## 5. What Was NOT Fixed (Documented Limitations)

1. **"New Project" button visible to all roles.** `ProjectList.tsx` renders the "New Project" dialog trigger for every authenticated user, even though only `ADMIN` can actually create a project (enforced correctly server-side, so this is a UX rough edge, not a security hole — a non-admin gets a clean error toast, never a successful mutation). Not fixed: doing so cleanly would require threading the current user's role from the dashboard page down through `ProjectList`, which is a larger change than the audit's bug-fixing mandate covers. Recommended follow-up.
2. **Resend email delivery** — code-reviewed as correct (`src/lib/email.ts`, `src/emails/ProjectCreatedEmail.tsx`), and the dev-mode mock path (`console.log` instead of a real send) was exercised, but **actual delivery through the Resend API was not verified** — no `RESEND_API_KEY` was provided. **Manual verification step:** set `RESEND_API_KEY` and `ENABLE_EMAILS=true` in `.env`, sign in as an `ADMIN`, create a project, and confirm the email arrives.
3. **Resend webhook signature verification** — `src/app/api/webhooks/resend/route.ts`'s Svix verification logic was reviewed and is correct, but **not exercised against a real signed webhook payload** — no `RESEND_WEBHOOK_SECRET` was provided. **Manual verification step:** configure a Resend webhook pointing at `<your-domain>/api/webhooks/resend` with a real signing secret in `.env`, trigger an email, and confirm an `AuditLog` row appears.
4. **Per-user data scoping on the dashboard read path.** All authenticated users currently see all projects/tasks/notes globally (the schema supports per-user `userId` filtering, but the dashboard query doesn't apply it). This matches the "shared workspace" framing in `ARCHITECTURE.md`/README rather than a stated requirement violation, but is worth a decision from you: shared workspace (as-is) vs. per-user isolation.
5. **Mobile/PWA Lighthouse audits and cross-browser testing** were not run (desktop preset, headless Chrome only).

---

## 6. Commands Run & Actual Results

| Command | Result |
|---|---|
| `npx tsc --noEmit -p tsconfig.json` | ✅ Clean, no errors |
| `npx eslint .` | ✅ Clean, no warnings/errors |
| `npx next build` | ✅ Succeeds; `/` now correctly dynamic-renders the dashboard |
| `npm run db:reset` (`prisma migrate reset --force`) | ✅ Drops, re-migrates, and reseeds successfully against live PostgreSQL |
| `npx prisma db seed` | ✅ Creates 5 users + credential accounts + projects/tasks/notes/snippets/problems/progress/audit logs |
| Live auth: sign in as `admin@codespace.dev` / `password123` | ✅ 200, session includes `role: "ADMIN"` |
| Live auth: sign in as `guest@codespace.dev` / `password123` | ✅ 200, session includes `role: "GUEST"` |
| Live RBAC: `POST /api/projects` as ADMIN | ✅ 201 Created |
| Live RBAC: `POST /api/projects` as GUEST | ✅ 403 Forbidden |
| Live RBAC: `GET /api/projects` unauthenticated | ✅ 401 Unauthorized |
| Live: `GET /` unauthenticated | ✅ 307 → `/login` (Proxy working) |
| Live: `GET /login` while authenticated | ✅ 307 → `/` |
| Live: `GET /api/og?title=...&description=...` | ✅ 200, `image/png`, 36KB |
| Lighthouse (dashboard, authenticated, desktop) | ✅ Perf 95, A11y 100, BP 96, SEO 54 |
| Lighthouse (login, desktop) | ✅ Perf 99, A11y 100 |

---

## 7. Final Checklist

- [x] Assignment 1 — shadcn/ui + Radix, next-themes, RSC/Client boundaries, Zustand, RHF+Zod, Server Actions, loading/error/optimistic UI, Lighthouse audit — all ✅, dashboard-reachability bug fixed.
- [x] Assignment 2 — Prisma + PostgreSQL schema, Faker seeding, migrate/reset/seed workflow, Better Auth, protected routes/actions, RBAC, Proxy authorization — all ✅, RBAC and seed-login bugs fixed. Email/webhook code ✅, live delivery ❓ (needs your Resend credentials).
- [x] Self-Learning Plan — all 6 topics ✅, plus dynamic OG images ✅ and performance auditing ✅ (re-verified honestly).
- [x] All genuine bugs found were fixed (13 items, §3) or explicitly documented as a limitation with a concrete manual-verification step (§5) — nothing was hidden or silently left broken.
- [x] `tsc`, `eslint`, and `next build` all pass clean as of this report.
- [x] The app was exercised live end-to-end against a real PostgreSQL database (not just "should work" — actually verified with real HTTP requests and real Lighthouse runs).

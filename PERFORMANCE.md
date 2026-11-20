# CodeSpace Performance & Accessibility Report

> **Audit correction (2026-09-22):** the previous version of this document
> described a before/after Lighthouse comparison of the dashboard
> (`ProjectList`/`TaskList`/dynamic form imports). Re-inspection of the
> underlying `lighthouse-*.json` files during the project audit showed
> `finalDisplayedUrl` was actually `/login` in every run — at the time those
> audits were taken, `/` had a route conflict (see `PROJECT_AUDIT.md`) that
> made an unrelated Next.js starter page win the root route, and the Proxy
> then bounced the unauthenticated Lighthouse crawler to `/login` before it
> could render anything. The numeric scores (74→90 / 94→100) were real
> Lighthouse output, but the *narrative* attributing them to `ProjectList`/
> `TaskList` optimizations does not hold, since neither component is present
> on the login page. This file has been replaced with a fresh, authenticated
> audit of the actual dashboard route, taken after the route-conflict bug was
> fixed. Raw reports: `lighthouse-dashboard-real.json`, `lighthouse-login-real.json`.

## 📊 Lighthouse Metrics (production build, desktop preset, 2026-09-22)

| Route | Performance | Accessibility | Best Practices | SEO |
| :--- | :--- | :--- | :--- | :--- |
| `/` (dashboard, authenticated as ADMIN) | **95 / 100** | **100 / 100** | 96 / 100 | 54 / 100 |
| `/login` (unauthenticated) | **99 / 100** | **100 / 100** | — | — |

Dashboard Core Web Vitals: **LCP 1.1s**, **TBT 0ms**, **CLS 0.001**.

The dashboard's low SEO score (54) is expected and intentional: `app/layout.tsx`
sets `robots: { index: false, follow: false }` because this is an
authenticated, private workspace, not a page meant to be indexed. It is not a
bug.

## 🔍 Accessibility fix applied during this audit

Auditing the *actual* dashboard (not the login page) surfaced one real
`color-contrast` violation not caught by the earlier (mistargeted) audit:

- `--muted-foreground: #6b7280` (Tailwind gray-500) against `--muted:
  #f3f4f6` produced a 4.39:1 contrast ratio — just under the WCAG AA
  threshold of 4.5:1. Used on filter pills, inactive tab triggers, and
  secondary text throughout the dashboard.
- `--destructive: #ef4444` (Tailwind red-500) used as *text* (e.g. the
  Header's "Logout" link) against a white/`--card` background produced a
  3.76:1 ratio, also failing WCAG AA.

**Fix:** both tokens were darkened one Tailwind step in `src/app/globals.css`
(light theme only) — `--muted-foreground` → `#4b5563` (gray-600) and
`--destructive` → `#dc2626` (red-600). Re-running Lighthouse against the
dashboard confirmed accessibility moved from 96/100 to 100/100 with no other
violations.

## ⚠️ Not independently re-verified in this audit

The original document's claim that dynamic-importing `CreateProjectForm` /
`CreateTaskForm` via `next/dynamic({ ssr: false })` reduces initial JS payload
and TBT is architecturally sound and the code is in place
(`src/components/dashboard/ProjectList.tsx`,
`src/components/dashboard/TaskList.tsx`), but the *specific* 530ms→178ms
before/after TBT numbers previously cited cannot be attributed to it, since
the audit that produced them never rendered those components. The dashboard's
current TBT is 0ms, consistent with the technique working, but there is no
verified "before" measurement of the dashboard without dynamic imports to
compare against. If precise before/after numbers are required, temporarily
revert the `next/dynamic` calls to static imports and re-run the Lighthouse
commands documented in `PROJECT_AUDIT.md`.

## 🏁 Conclusion

The dashboard route (once reachable — see the route-conflict fix in
`PROJECT_AUDIT.md`) is fast (95/100, 0ms TBT, 1.1s LCP) and fully accessible
(100/100) in a live, authenticated production build against a real
PostgreSQL database. The login/register pages score even higher since they
carry less client JavaScript.

# CodeSpace

An all-in-one, highly performant developer workspace built with Next.js App Router, Prisma, and Better Auth. CodeSpace allows developers to manage projects, track tasks, curate code snippets, and maintain a personal knowledge base—all wrapped in a sleek, IDE-inspired interface.

## 🚀 Features

- **Project & Task Management**: Track active development cycles with priority tagging and status filters.
- **Knowledge Base & Snippets**: Save critical code chunks and documentation notes.
- **Role-Based Access Control (RBAC)**: Distinct permissions for `ADMIN`, `MEMBER`, and `GUEST` accounts. Authentication (is there a session?) is enforced by the Proxy (`src/proxy.ts`); role authorization (what can this session do?) is enforced inside each Server Action and Route Handler, per Next.js's recommended split.
- **Event Auditing & Email Hooks**: Real-time audit logs of workspace actions, integrated with Resend for email notifications and Svix-secured webhooks for delivery tracking.
- **Dynamic OG Image Generation**: Server-side generated Open Graph social sharing images (`/api/og`).
- **Dark Mode**: Fully implemented `next-themes` dark/light toggling.
- **Blazing Fast**: Achieves a 90/100 Performance Score and 100/100 Accessibility Score on Google Lighthouse.

## 🏗️ Architecture & Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router, Server Components, Server Actions)
- **Database**: PostgreSQL mapped via [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [Better Auth](https://better-auth.com) with secure HttpOnly cookie sessions
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Radix Primitives)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Client UI State)
- **Validation**: [Zod](https://zod.dev/) + React Hook Form
- **Emails**: [Resend](https://resend.com/) + [React Email](https://react.email/)

## ⚙️ Setup Instructions

### 1. Clone & Install
```bash
git clone <repo-url>
cd codespace
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory. **Note: You must provide a real PostgreSQL string and Resend API Key for full functionality.**

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/codespace?schema=public"

# Better Auth
BETTER_AUTH_SECRET="your-super-secret-auth-key-change-in-prod"
BETTER_AUTH_URL="http://localhost:3000"

# Resend Email & Webhooks (Requires Real Credentials)
RESEND_API_KEY="re_..."
RESEND_WEBHOOK_SECRET="whsec_..."
```

### 3. Database Migration & Seeding
Apply the schema and seed the database using Faker.js.
```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```
*(The seeder generates an Admin account — `admin@codespace.dev` / `password123` — a Guest account `guest@codespace.dev` / `password123`, and 3 random Member accounts, all sharing the password `password123`.)*

### 4. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:3000`.

## 🛡️ Authentication Roles

- **Admin (`ADMIN`)**: Can create Projects and manage the entire workspace. Triggers Resend email notifications upon project creation.
- **Member (`MEMBER`)**: Can create/complete tasks and curate notes.
- **Guest (`GUEST`)**: Read-only access to the dashboard. Mutations are blocked at the Server Action layer.

New accounts default to `GUEST` (see `prisma/schema.prisma`); promote a user to `MEMBER`/`ADMIN` directly in the database (e.g. via `npx prisma studio`) until an admin-management UI exists.

## 📧 Email & Webhook Demonstration
To test the email functionality:
1. Ensure your `.env` contains a valid `RESEND_API_KEY`.
2. Login as `ADMIN`.
3. Create a New Project. This fires a non-blocking `sendProjectCreatedEmail` event.
4. If a webhook is configured in your Resend dashboard pointing to `<your-domain>/api/webhooks/resend` with the matching `RESEND_WEBHOOK_SECRET`, delivery events will automatically populate in the Dashboard's "Recent Activity" Audit Log.

## 🖼️ Dynamic OG Images
CodeSpace uses `next/og` (Satori) to generate dynamic sharing images.
Test it directly in your browser:
`http://localhost:3000/api/og?title=Hello%20World&description=Testing%20the%20generator`

## ⚡ Performance Results (Lighthouse)
- **Performance**: 90 / 100
- **Accessibility**: 100 / 100
- **TBT**: 178ms (Achieved via dynamic imports of heavy validation forms)

*See `PERFORMANCE.md` for a complete breakdown of the Core Web Vitals audit.*

# Full Stack Development with Next.js: Assignment 2 Architecture Note

## 1. Database Relationships & Entity Modeling

### 1.1 Prisma Schema Design
The CodeSpace application relies on a robust relational database model managed by Prisma and powered by PostgreSQL. The core entities revolve around a central `User` model, establishing a one-to-many relationship mapping.

**Core Relationships:**
- `User` to `Project` (1:N): A user can create multiple projects.
- `User` to `Task` (1:N): A user owns multiple tasks.
- `User` to `Note` (1:N): A user curates a personal knowledge base of notes.
- `User` to `AuditLog` (1:N): System actions tied directly to the actor for traceability.

### 1.2 Referential Integrity
To maintain database health, we utilize Prisma's foreign key constraints. The `userId` acts as the relational bridge. If a user is deleted, their associated tokens, sessions, accounts, and application data (projects, tasks) can be configured for cascading deletion, ensuring no orphaned records exist within the PostgreSQL cluster.

## 2. Authentication & Authorization Flow

### 2.1 Better Auth Integration
Authentication is handled via **Better Auth**, configured for email/password credentials and securely managed via sessions. The `auth.ts` lib file instantiates the authentication flow, hooking directly into the Prisma adapter to sync sessions, accounts, and users securely.

### 2.2 Next.js Middleware & RBAC (Role-Based Access Control)
The application defines three distinct roles: `ADMIN`, `USER` (Member), and `GUEST`.
- **Middleware Proxy**: The Next.js `middleware.ts` (or `proxy.ts`) acts as the primary gatekeeper. It intercepts incoming requests, verifying the presence of a valid session token. If an unauthenticated user attempts to access `/projects` or `/`, they are automatically redirected to `/login`.
- **Server Action Authorization**: Beyond route protection, we enforce strict RBAC within our Server Actions. For example, `createProject` in `src/actions/project.ts` actively fetches the `getCurrentUser()` and verifies that `user.role === 'ADMIN'`. If a `GUEST` or standard `USER` attempts to dispatch this action, it fails securely on the server, returning an "Unauthorized" payload. This ensures malicious actors cannot bypass client-side UI hiding.

## 3. Email Dispatch & Webhook Logging Architecture

### 3.1 Resend & React Email
Upon successful creation of a new project by an Admin, the system fires a non-blocking asynchronous email dispatch using the **Resend API**. The email templates themselves are built using **React Email**, allowing us to write type-safe, component-driven email templates (`ProjectCreatedEmail.tsx`) that automatically compile down to heavily nested, widely compatible table-based HTML required by email clients.

### 3.2 Svix Webhook Auditing
To close the feedback loop, we configured a Resend Webhook to listen for `email.delivered` and `email.bounced` events. 
- **Endpoint**: `src/app/api/webhooks/resend/route.ts`
- **Security**: The route handler utilizes the `svix` library to verify the cryptographic signature of the incoming webhook payload using our `RESEND_WEBHOOK_SECRET`. This guarantees the event originated from Resend and wasn't spoofed.
- **Logging**: Once verified, the event is immediately recorded in our database via `prisma.auditLog.create()`. This allows administrators to track the success or failure of notification deliveries directly from the CodeSpace dashboard, unifying application logic and external service monitoring into a single relational trace.

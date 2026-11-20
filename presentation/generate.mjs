import pptxgen from "pptxgenjs";

const pptx = new pptxgen();
pptx.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });
pptx.layout = "WIDE";
pptx.author = "CodeSpace Project";
pptx.title = "CodeSpace — All-in-One Developer Workspace";

// ---------- Palette ----------
const BG = "0B1120";        // near-black slate
const PANEL = "121B2E";     // slightly lighter panel
const PANEL2 = "182338";
const BORDER = "27324A";
const TEXT = "E5EAF2";
const SUBTEXT = "94A3B8";
const MUTED = "64748B";
const ACCENT = "6EE7B7";    // mint/emerald accent
const ACCENT2 = "60A5FA";   // blue accent
const WARN = "FBBF24";      // amber for future/partial
const FONT = "Segoe UI";
const MONO = "Consolas";

const W = 13.333, H = 7.5;

function baseSlide(s) {
  s.background = { color: BG };
}

function footer(s, num) {
  s.addText("CodeSpace — Developer Workspace", {
    x: 0.5, y: H - 0.42, w: 6, h: 0.3, fontFace: FONT, fontSize: 9, color: MUTED,
  });
  s.addText(String(num), {
    x: W - 1.0, y: H - 0.42, w: 0.5, h: 0.3, fontFace: FONT, fontSize: 9, color: MUTED, align: "right",
  });
}

function kicker(s, text) {
  s.addText(text.toUpperCase(), {
    x: 0.7, y: 0.42, w: 8, h: 0.35, fontFace: FONT, fontSize: 13, bold: true,
    color: ACCENT, charSpacing: 2,
  });
}

function title(s, text, opts = {}) {
  s.addText(text, {
    x: 0.7, y: opts.y ?? 0.75, w: opts.w ?? 11.9, h: opts.h ?? 0.7,
    fontFace: FONT, fontSize: opts.size ?? 30, bold: true, color: TEXT,
  });
}

function rule(s, y) {
  s.addShape("line", { x: 0.7, y, w: W - 1.4, h: 0, line: { color: BORDER, width: 1 } });
}

function pill(s, text, x, y, w, color) {
  s.addShape("roundRect", {
    x, y, w, h: 0.32, rectRadius: 0.06,
    fill: { color: PANEL2 }, line: { color: BORDER, width: 0.75 },
  });
  s.addText(text, {
    x, y, w, h: 0.32, align: "center", valign: "middle",
    fontFace: FONT, fontSize: 10.5, bold: true, color,
  });
}

// ==================================================================
// SLIDE 1 — Title
// ==================================================================
{
  const s = pptx.addSlide();
  baseSlide(s);

  s.addShape("rect", { x: 0, y: 0, w: 0.14, h: H, fill: { color: ACCENT }, line: { type: "none" } });

  s.addText("<  CODESPACE  />", {
    x: 0.9, y: 2.15, w: 10, h: 0.5, fontFace: MONO, fontSize: 16, color: ACCENT2, bold: true, charSpacing: 1,
  });

  s.addText("CodeSpace", {
    x: 0.85, y: 2.65, w: 11.5, h: 1.3, fontFace: FONT, fontSize: 60, bold: true, color: TEXT,
  });

  s.addText("An all-in-one developer workspace for projects, tasks, notes, and code snippets", {
    x: 0.9, y: 3.85, w: 10.5, h: 0.6, fontFace: FONT, fontSize: 18, color: SUBTEXT,
  });

  rule(s, 4.65);

  s.addText([
    { text: "Student Name:  ", options: { bold: true, color: SUBTEXT } },
    { text: "[Your Name]", options: { color: TEXT } },
  ], { x: 0.9, y: 4.9, w: 6, h: 0.35, fontFace: FONT, fontSize: 13 });

  s.addText([
    { text: "Roll No / Enrollment:  ", options: { bold: true, color: SUBTEXT } },
    { text: "[Enrollment Number]", options: { color: TEXT } },
  ], { x: 0.9, y: 5.3, w: 6, h: 0.35, fontFace: FONT, fontSize: 13 });

  s.addText([
    { text: "Course:  ", options: { bold: true, color: SUBTEXT } },
    { text: "Full Stack Development with Next.js", options: { color: TEXT } },
  ], { x: 0.9, y: 5.7, w: 8, h: 0.35, fontFace: FONT, fontSize: 13 });

  s.addText([
    { text: "Guide / Faculty:  ", options: { bold: true, color: SUBTEXT } },
    { text: "[Faculty Name]", options: { color: TEXT } },
  ], { x: 0.9, y: 6.1, w: 6, h: 0.35, fontFace: FONT, fontSize: 13 });

  s.addText("Academic Year 2026", {
    x: 0.9, y: 6.6, w: 6, h: 0.3, fontFace: FONT, fontSize: 11, color: MUTED,
  });

  s.addNotes(
    "Introduce yourself and the project name. CodeSpace is a small, working MVP of a developer workspace — the goal of this presentation is to show what was actually built and verified, not a concept pitch."
  );
}

// ==================================================================
// SLIDE 2 — Problem Statement
// ==================================================================
{
  const s = pptx.addSlide();
  baseSlide(s);
  kicker(s, "The Problem");
  title(s, "Developer tooling is scattered across disconnected apps");
  rule(s, 1.55);

  const items = [
    ["Project & task tracking", "lives in one tool (a board or issue tracker)"],
    ["Notes & documentation", "lives in another (a notes app or wiki)"],
    ["Reusable code snippets", "get pasted into gists, chat threads, or local files"],
    ["Progress on personal practice", "isn't tracked anywhere central at all"],
  ];

  let y = 2.0;
  items.forEach(([a, b]) => {
    s.addShape("roundRect", { x: 0.9, y, w: 0.14, h: 0.14, rectRadius: 0.03, fill: { color: ACCENT }, line: { type: "none" } });
    s.addText([
      { text: a + " ", options: { bold: true, color: TEXT } },
      { text: b, options: { color: SUBTEXT } },
    ], { x: 1.25, y: y - 0.16, w: 10.8, h: 0.45, fontFace: FONT, fontSize: 15 });
    y += 0.72;
  });

  s.addShape("roundRect", {
    x: 0.9, y: 5.15, w: 11.55, h: 1.35, rectRadius: 0.08,
    fill: { color: PANEL }, line: { color: BORDER, width: 1 },
  });
  s.addText([
    { text: "Result: ", options: { bold: true, color: ACCENT2 } },
    { text: "a developer switching between 4–5 separate tools just to organize their own work, with no single, authenticated place that ties a project to its tasks, notes, and code together.", options: { color: TEXT } },
  ], { x: 1.15, y: 5.35, w: 11.05, h: 1.0, fontFace: FONT, fontSize: 14.5, valign: "middle" });

  footer(s, 2);
  s.addNotes(
    "Keep this practical and grounded — this is about a personal/small-team organization problem, not a market-sizing claim. The pain is context-switching between disconnected tools for closely related work."
  );
}

// ==================================================================
// SLIDE 3 — Our Solution
// ==================================================================
{
  const s = pptx.addSlide();
  baseSlide(s);
  kicker(s, "Our Solution");
  title(s, "CodeSpace: one workspace, one login, one database");
  rule(s, 1.55);

  s.addText(
    "CodeSpace is a small MVP developer workspace built on the Next.js App Router. After signing in, a developer lands on a single dashboard that brings projects, tasks, notes, and a code-snippet library together — all backed by one relational schema instead of several disconnected tools.",
    { x: 0.9, y: 1.85, w: 11.55, h: 1.1, fontFace: FONT, fontSize: 15, color: SUBTEXT, lineSpacingMultiple: 1.25 }
  );

  const cards = [
    ["Projects & Tasks", "Create projects, track tasks, mark complete with instant optimistic UI"],
    ["Developer Notes", "A lightweight personal knowledge base tied to the same account"],
    ["Code Snippet Library", "Browse saved, language-tagged snippets from the same dashboard"],
    ["Secure by Role", "Admin / Member / Guest permissions enforced on the server, not just hidden in the UI"],
  ];

  const cw = 2.72, gap = 0.22, startX = 0.9, cy = 3.25, ch = 3.0;
  cards.forEach(([t, d], i) => {
    const x = startX + i * (cw + gap);
    s.addShape("roundRect", {
      x, y: cy, w: cw, h: ch, rectRadius: 0.09,
      fill: { color: PANEL }, line: { color: BORDER, width: 1 },
    });
    s.addShape("rect", { x, y: cy, w: cw, h: 0.06, fill: { color: ACCENT }, line: { type: "none" } });
    s.addText(t, { x: x + 0.2, y: cy + 0.3, w: cw - 0.4, h: 0.7, fontFace: FONT, fontSize: 15, bold: true, color: TEXT });
    s.addText(d, { x: x + 0.2, y: cy + 1.0, w: cw - 0.4, h: 1.85, fontFace: FONT, fontSize: 11.5, color: SUBTEXT, lineSpacingMultiple: 1.2 });
  });

  footer(s, 3);
  s.addNotes(
    "Emphasize this is a small, working MVP — the point is that these pieces already live in one authenticated app on one schema, which is the core organizational win, not an exhaustive feature list."
  );
}

// ==================================================================
// SLIDE 4 — Core USP & Key Features
// ==================================================================
{
  const s = pptx.addSlide();
  baseSlide(s);
  kicker(s, "Differentiator");
  title(s, "Core USP & Key Features");
  rule(s, 1.55);

  s.addShape("roundRect", {
    x: 0.9, y: 1.8, w: 11.55, h: 1.0, rectRadius: 0.08,
    fill: { color: PANEL2 }, line: { color: ACCENT2, width: 1 },
  });
  s.addText([
    { text: "USP:  ", options: { bold: true, color: ACCENT2 } },
    { text: "A single Server-Component dashboard reads directly from PostgreSQL via Prisma — no separate REST layer — while every mutation is a validated, role-checked Next.js Server Action.", options: { color: TEXT } },
  ], { x: 1.15, y: 1.8, w: 11.05, h: 1.0, fontFace: FONT, fontSize: 14, valign: "middle" });

  const feats = [
    ["Project & Task Management", "Admin-gated project creation; task completion with useOptimistic UI updates"],
    ["Developer Notes", "Create and browse notes as a personal knowledge base"],
    ["Code Snippet Library", "Language-tagged snippets surfaced on the dashboard"],
    ["Role-Based Workspace", "Admin / Member / Guest access enforced inside Server Actions & Route Handlers"],
    ["Live Workspace Stats", "Project count, pending tasks, and snippet count on the dashboard"],
    ["Audit Log", "Recent-activity timeline recorded per workspace action"],
  ];

  const colW = 5.68, colGap = 0.19, rowH = 1.02, startY = 3.05;
  feats.forEach(([t, d], i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.9 + col * (colW + colGap);
    const y = startY + row * (rowH + 0.15);
    s.addShape("roundRect", { x, y, w: colW, h: rowH, rectRadius: 0.07, fill: { color: PANEL }, line: { color: BORDER, width: 1 } });
    s.addShape("roundRect", { x: x + 0.18, y: y + 0.16, w: 0.1, h: 0.1, fill: { color: ACCENT }, line: { type: "none" } });
    s.addText(t, { x: x + 0.4, y: y + 0.1, w: colW - 0.6, h: 0.32, fontFace: FONT, fontSize: 13, bold: true, color: TEXT });
    s.addText(d, { x: x + 0.4, y: y + 0.44, w: colW - 0.6, h: 0.5, fontFace: FONT, fontSize: 10.5, color: SUBTEXT });
  });

  footer(s, 4);
  s.addNotes(
    "The USP is architectural, not a long feature list: Server Components talk to Prisma directly, and RBAC is verified server-side (confirmed live: admin gets 201, guest gets 403). Keep the six feature tiles short and point at the demo/flow slide for detail."
  );
}

// ==================================================================
// SLIDE 5 — Supporting Features & User Workflow
// ==================================================================
{
  const s = pptx.addSlide();
  baseSlide(s);
  kicker(s, "How It Works");
  title(s, "Supporting Features & End-to-End Workflow");
  rule(s, 1.5);

  const steps = ["Authenticated User", "Dashboard\n(Server Component)", "Create Form\n(RHF + Zod)", "Server Action\n(role + Zod check)", "Prisma\nTransaction", "PostgreSQL"];
  const n = steps.length;
  const boxW = 1.78, boxH = 1.0, gap = (11.55 - n * boxW) / (n - 1);
  const y0 = 2.0;
  steps.forEach((t, i) => {
    const x = 0.9 + i * (boxW + gap);
    s.addShape("roundRect", {
      x, y: y0, w: boxW, h: boxH, rectRadius: 0.08,
      fill: { color: i === n - 1 ? PANEL2 : PANEL }, line: { color: i % 2 === 0 ? ACCENT2 : ACCENT, width: 1.25 },
    });
    s.addText(t, {
      x: x + 0.05, y: y0, w: boxW - 0.1, h: boxH, align: "center", valign: "middle",
      fontFace: FONT, fontSize: 10.5, bold: true, color: TEXT,
    });
    if (i < n - 1) {
      s.addText("→", {
        x: x + boxW, y: y0, w: gap, h: boxH, align: "center", valign: "middle",
        fontFace: FONT, fontSize: 18, color: MUTED, bold: true,
      });
    }
  });

  s.addText("UI revalidates via revalidatePath(\"/\") — task completion reflects instantly through useOptimistic", {
    x: 0.9, y: y0 + boxH + 0.15, w: 11.55, h: 0.35, fontFace: MONO, fontSize: 10.5, color: MUTED, align: "center",
  });

  s.addText("Supporting features implemented alongside this flow", {
    x: 0.9, y: 3.75, w: 10, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: TEXT,
  });

  const supports = [
    ["Dark / Light / System Theme", "next-themes, hydration-safe via suppressHydrationWarning"],
    ["Role-Based Permissions", "Admin / Member / Guest checked in Server Actions & Route Handlers"],
    ["Route Protection", "Proxy (src/proxy.ts) checks session presence before rendering the dashboard"],
    ["Loading / Error / Optimistic UI", "app-level loading.tsx, error.tsx, and useOptimistic on tasks"],
    ["Email Notification (partial)", "Resend + React Email fires on project creation — code-complete and dev-verified; live delivery needs a production API key"],
  ];

  let y = 4.25;
  supports.forEach(([t, d]) => {
    s.addText([
      { text: "•  ", options: { color: ACCENT, bold: true } },
      { text: t + " — ", options: { bold: true, color: TEXT } },
      { text: d, options: { color: SUBTEXT } },
    ], { x: 0.9, y, w: 11.55, h: 0.42, fontFace: FONT, fontSize: 12 });
    y += 0.46;
  });

  footer(s, 5);
  s.addNotes(
    "Walk through the flow left to right — this is the same pattern used for projects, tasks, and notes. Be upfront that email notification is the one feature that's code-complete but not live-verified (no production Resend key was available during development)."
  );
}

// ==================================================================
// SLIDE 6 — Technology Stack
// ==================================================================
{
  const s = pptx.addSlide();
  baseSlide(s);
  kicker(s, "Technology Stack");
  title(s, "Built With");
  rule(s, 1.5);

  const groups = [
    ["Frontend & UI", ["Next.js 16 (App Router)", "TypeScript", "Tailwind CSS", "shadcn/ui + Radix UI", "next-themes", "Zustand"]],
    ["Forms & Server Logic", ["React Hook Form", "Zod", "Next.js Server Actions", "Route Handlers"]],
    ["Data & Auth", ["Prisma ORM", "PostgreSQL", "Better Auth", "Faker.js (seeding)"]],
    ["Email & Delivery", ["Resend", "React Email", "Svix (webhook verification)"]],
  ];

  const colW = 2.72, gap = 0.24, startX = 0.9, y0 = 2.0, colH = 4.6;
  groups.forEach(([label, items], i) => {
    const x = startX + i * (colW + gap);
    s.addShape("roundRect", { x, y: y0, w: colW, h: colH, rectRadius: 0.09, fill: { color: PANEL }, line: { color: BORDER, width: 1 } });
    s.addShape("rect", { x, y: y0, w: colW, h: 0.5, fill: { color: PANEL2 }, line: { type: "none" } });
    s.addText(label, { x: x + 0.12, y: y0, w: colW - 0.24, h: 0.5, align: "left", valign: "middle", fontFace: FONT, fontSize: 12.5, bold: true, color: ACCENT2 });
    let iy = y0 + 0.68;
    items.forEach((it) => {
      s.addText(it, { x: x + 0.18, y: iy, w: colW - 0.36, h: 0.42, fontFace: MONO, fontSize: 11, color: TEXT });
      iy += 0.5;
    });
  });

  s.addText(
    "Audit & documentation tooling: Lighthouse (Core Web Vitals / accessibility audits) and Mermaid (architecture diagrams for the technical report) — used to build and verify the project, not runtime app dependencies.",
    { x: 0.9, y: 6.75, w: 11.55, h: 0.5, fontFace: FONT, fontSize: 10.5, color: MUTED, italic: true }
  );

  footer(s, 6);
  s.addNotes(
    "Every item listed here is a real dependency in package.json and is actually used in the codebase — nothing here is aspirational. Lighthouse and Mermaid were used to audit and document the project, so they're called out separately from the app's runtime stack."
  );
}

// ==================================================================
// SLIDE 7 — Technical Architecture
// ==================================================================
{
  const s = pptx.addSlide();
  baseSlide(s);
  kicker(s, "Architecture");
  title(s, "Technical Architecture");
  rule(s, 1.5);

  const boxStyle = (fillColor, lineColor) => ({ fill: { color: fillColor }, line: { color: lineColor, width: 1.25 }, rectRadius: 0.07 });

  // Row 1: Browser / UI layer
  s.addShape("roundRect", { x: 0.7, y: 1.85, w: 11.9, h: 0.85, ...boxStyle(PANEL2, ACCENT2) });
  s.addText([
    { text: "Browser / UI Layer   ", options: { bold: true, color: ACCENT2 } },
    { text: "Server Components (pages, data-fetch)   +   Client Components (forms, interactivity, Zustand UI state)", options: { color: TEXT } },
  ], { x: 0.95, y: 1.85, w: 11.4, h: 0.85, valign: "middle", fontFace: FONT, fontSize: 12.5 });

  s.addText("↓", { x: 5.9, y: 2.72, w: 1.5, h: 0.3, align: "center", fontSize: 16, color: MUTED });

  // Row 2: Forms & validation
  s.addShape("roundRect", { x: 0.7, y: 3.02, w: 11.9, h: 0.7, ...boxStyle(PANEL, BORDER) });
  s.addText([
    { text: "Forms & Validation   ", options: { bold: true, color: ACCENT } },
    { text: "React Hook Form + Zod schemas (src/lib/validations.ts) — shared client & server-side", options: { color: TEXT } },
  ], { x: 0.95, y: 3.02, w: 11.4, h: 0.7, valign: "middle", fontFace: FONT, fontSize: 12 });

  s.addText("↓", { x: 5.9, y: 3.72, w: 1.5, h: 0.28, align: "center", fontSize: 16, color: MUTED });

  // Row 3: Server Actions / Auth / RBAC (three boxes)
  const r3y = 4.0, r3h = 0.85;
  const r3 = [
    ["Server Actions / API Routes", "createProject, createTask, createNote — \"use server\""],
    ["Auth & Proxy", "Better Auth session + src/proxy.ts route guard"],
    ["RBAC Check", "ADMIN / MEMBER / GUEST enforced per action"],
  ];
  const r3w = 3.83, r3gap = 0.2;
  r3.forEach(([t, d], i) => {
    const x = 0.7 + i * (r3w + r3gap);
    s.addShape("roundRect", { x, y: r3y, w: r3w, h: r3h, ...boxStyle(PANEL2, ACCENT) });
    s.addText(t, { x: x + 0.15, y: r3y + 0.08, w: r3w - 0.3, h: 0.35, fontFace: FONT, fontSize: 11.5, bold: true, color: TEXT });
    s.addText(d, { x: x + 0.15, y: r3y + 0.42, w: r3w - 0.3, h: 0.4, fontFace: FONT, fontSize: 9.5, color: SUBTEXT });
  });

  s.addText("↓", { x: 5.9, y: r3y + r3h + 0.03, w: 1.5, h: 0.26, align: "center", fontSize: 16, color: MUTED });

  // Row 4: Prisma / DB
  const r4y = r3y + r3h + 0.32;
  s.addShape("roundRect", { x: 0.7, y: r4y, w: 11.9, h: 0.7, ...boxStyle(PANEL2, ACCENT2) });
  s.addText([
    { text: "Prisma ORM   ↔   ", options: { bold: true, color: ACCENT2 } },
    { text: "PostgreSQL  (User, Project, Task, Note, CodeSnippet, AuditLog, Session/Account)", options: { color: TEXT } },
  ], { x: 0.95, y: r4y, w: 11.4, h: 0.7, valign: "middle", fontFace: FONT, fontSize: 12 });

  // Row 5: side pipelines
  const r5y = r4y + 0.9, r5h = 0.75, r5w = 5.85;
  s.addShape("roundRect", { x: 0.7, y: r5y, w: r5w, h: r5h, ...boxStyle(PANEL, BORDER) });
  s.addText([
    { text: "Faker.js Seed Pipeline   ", options: { bold: true, color: ACCENT } },
    { text: "prisma/seed.ts → users, projects, tasks, notes, snippets", options: { color: SUBTEXT } },
  ], { x: 0.9, y: r5y, w: r5w - 0.4, h: r5h, valign: "middle", fontFace: FONT, fontSize: 10.5 });

  s.addShape("roundRect", { x: 0.7 + r5w + 0.2, y: r5y, w: r5w, h: r5h, ...boxStyle(PANEL, BORDER) });
  s.addText([
    { text: "Resend + Svix Webhook   ", options: { bold: true, color: WARN } },
    { text: "project-created email → signed webhook → AuditLog (partial)", options: { color: SUBTEXT } },
  ], { x: 0.9 + r5w + 0.2, y: r5y, w: r5w - 0.4, h: r5h, valign: "middle", fontFace: FONT, fontSize: 10.5 });

  footer(s, 7);
  s.addNotes(
    "Walk top to bottom: UI, then forms/validation, then the three server-side gates (action, auth, role check) which all happen before Prisma ever runs. Faker seeding and the Resend/Svix webhook are shown as side pipelines that feed or branch off the same database — the webhook path is marked partial since live delivery wasn't verified with real credentials."
  );
}

// ==================================================================
// SLIDE 8 — Future Scope, Academic Coverage & Conclusion
// ==================================================================
{
  const s = pptx.addSlide();
  baseSlide(s);
  kicker(s, "Wrapping Up");
  title(s, "Academic Coverage, Future Scope & Conclusion");
  rule(s, 1.5);

  // Left: academic coverage
  s.addShape("roundRect", { x: 0.7, y: 1.85, w: 5.75, h: 3.55, rectRadius: 0.08, fill: { color: PANEL }, line: { color: BORDER, width: 1 } });
  s.addText("Academic Coverage", { x: 0.95, y: 2.0, w: 5.3, h: 0.4, fontFace: FONT, fontSize: 14, bold: true, color: ACCENT2 });
  const covered = [
    "Assignment 1: RSC/Client boundaries, hydration, Zustand, RHF+Zod, Server Actions, Lighthouse audit",
    "Assignment 2: Prisma schema, Faker seeding, Better Auth, RBAC, Proxy authorization",
    "Self-Learning Plan: all 6 topics + dynamic OG image generation",
  ];
  let cy = 2.5;
  covered.forEach((t) => {
    s.addText([{ text: "✓  ", options: { color: ACCENT, bold: true } }, { text: t, options: { color: SUBTEXT } }],
      { x: 0.95, y: cy, w: 5.3, h: 0.85, fontFace: FONT, fontSize: 11 });
    cy += 0.92;
  });

  // Right: future scope
  s.addShape("roundRect", { x: 6.65, y: 1.85, w: 5.95, h: 3.55, rectRadius: 0.08, fill: { color: PANEL }, line: { color: WARN, width: 1 } });
  s.addText("Future Scope (not yet implemented)", { x: 6.9, y: 2.0, w: 5.5, h: 0.4, fontFace: FONT, fontSize: 14, bold: true, color: WARN });
  const future = [
    "Snippet creation UI & coding-problem/progress tracking UI (schema exists, no interface yet)",
    "Live Resend delivery & Svix webhook verification with production credentials",
    "GitHub integration, richer Markdown editing, collaborative multi-user workspaces",
    "AI-assisted organization and coding-platform integrations",
  ];
  let fy = 2.5;
  future.forEach((t) => {
    s.addText([{ text: "○  ", options: { color: WARN, bold: true } }, { text: t, options: { color: SUBTEXT } }],
      { x: 6.9, y: fy, w: 5.5, h: 0.85, fontFace: FONT, fontSize: 11 });
    fy += 0.92;
  });

  // Conclusion bar
  s.addShape("roundRect", { x: 0.7, y: 5.65, w: 11.9, h: 1.15, rectRadius: 0.08, fill: { color: PANEL2 }, line: { color: ACCENT, width: 1.25 } });
  s.addText([
    { text: "Conclusion:  ", options: { bold: true, color: ACCENT } },
    { text: "CodeSpace is a small but genuinely working, audited full-stack MVP — an authenticated Next.js App Router application with real server-side RBAC, validated Server Actions, and a seeded PostgreSQL database — that unifies core developer-organization tasks in one workspace.", options: { color: TEXT } },
  ], { x: 0.95, y: 5.65, w: 11.4, h: 1.15, valign: "middle", fontFace: FONT, fontSize: 12.5, lineSpacingMultiple: 1.2 });

  footer(s, 8);
  s.addNotes(
    "Close by being explicit that the future-scope items are genuinely not built yet — snippet creation and coding-progress tracking exist only as database models today. This keeps the presentation's claims aligned with PROJECT_AUDIT.md."
  );
}

await pptx.writeFile({ fileName: "CodeSpace_Presentation.pptx" });
console.log("done");

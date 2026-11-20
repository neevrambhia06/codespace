import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { hashPassword } from 'better-auth/crypto';

const prisma = new PrismaClient();

const SEED_PASSWORD = 'password123';

const REAL_PROJECTS = [
  {
    name: "Customer Analytics Dashboard",
    description: "Real-time metrics, user retention analysis, and revenue reporting for the core product.",
    language: "TypeScript",
    status: "active",
    tasks: [
      { title: "Review weekly user retention metrics with product team", priority: "high", completed: true },
      { title: "Design custom date range picker for quarterly reports", priority: "medium", completed: true },
      { title: "Integrate CSV and PDF data export capabilities", priority: "high", completed: false },
      { title: "Optimize query response times for large report views", priority: "medium", completed: false },
    ],
  },
  {
    name: "Customer Invoicing & Billing System",
    description: "Automated recurring subscription renewals, invoice generation, and tax compliance.",
    language: "TypeScript",
    status: "active",
    tasks: [
      { title: "Audit checkout flow for international currency conversions", priority: "high", completed: true },
      { title: "Implement automated receipt email dispatch after renewal", priority: "high", completed: true },
      { title: "Test customer billing portal self-service downgrade flow", priority: "medium", completed: false },
    ],
  },
  {
    name: "Mobile Companion App V2",
    description: "Redesigned mobile experience for on-the-go workspace access, notifications, and task management.",
    language: "TypeScript",
    status: "active",
    tasks: [
      { title: "Finalize touch gestures for task completion swipe", priority: "medium", completed: true },
      { title: "Test offline caching when network connection drops", priority: "high", completed: true },
      { title: "Prepare App Store and Play Store screenshot assets", priority: "low", completed: false },
      { title: "Conduct usability session with five beta testers", priority: "medium", completed: false },
    ],
  },
  {
    name: "Team Knowledge Base Portal",
    description: "Centralized workspace documentation, design tokens, and project delivery playbooks.",
    language: "Markdown",
    status: "completed",
    tasks: [
      { title: "Publish brand writing and editorial tone guidelines", priority: "low", completed: true },
      { title: "Document release checklists for major quarterly milestones", priority: "high", completed: true },
      { title: "Archive obsolete onboarding documents from previous year", priority: "low", completed: true },
    ],
  },
  {
    name: "Notification & Messaging Hub",
    description: "Unified dispatch service for critical in-app alerts, team mentions, and weekly digests.",
    language: "TypeScript",
    status: "active",
    tasks: [
      { title: "Configure deliverability monitoring and bounce alerts", priority: "high", completed: true },
      { title: "Add user notification preference controls to account settings", priority: "medium", completed: false },
    ],
  },
  {
    name: "Design System & Component Library",
    description: "Shared editorial component standards, typography scale, and accessible form inputs.",
    language: "CSS",
    status: "archived",
    tasks: [
      { title: "Document contrast standards across all card surfaces", priority: "medium", completed: true },
      { title: "Package accessible modal dialog and dropdown components", priority: "high", completed: true },
    ],
  },
];

const REAL_NOTES = [
  {
    title: "Product Launch Readiness Checklist",
    snippet: "Key deliverables before rollout: verify sign-up and password reset flow, test notification deliverability, perform mobile layout review across phones and tablets, and verify user documentation.",
  },
  {
    title: "Quarterly Planning & Roadmap Notes",
    snippet: "Key priorities for next quarter: reduce initial workspace load times, introduce bulk task status updates, expand snippet formatting options, and enhance team role permissions.",
  },
  {
    title: "Customer Usability Feedback Summary",
    snippet: "Feedback from recent customer walkthroughs: participants praised the warm editorial layout and low eye strain during long working sessions. Several requested keyboard quick-search improvements.",
  },
  {
    title: "Team Onboarding Guide & Best Practices",
    snippet: "Welcome to the workspace! When organizing new initiatives: assign clear project milestones, tag priority on critical deliverables, keep notes organized by topic, and document decisions promptly.",
  },
  {
    title: "Sprint Retrospective Takeaways",
    snippet: "Delivered unified top navigation and streamlined search. Team velocity improved significantly by having project tracking and knowledge notes centralized in one quiet view.",
  },
  {
    title: "Security & Account Best Practices",
    snippet: "All member sessions use encrypted credentials and secure authentication cookies. Periodic reminders: enable two-factor protection, audit team roles, and keep workspace permissions updated.",
  },
];

const REAL_SNIPPETS = [
  {
    title: "Format Currency Utility",
    language: "typescript",
    code: `export function formatCurrency(amount: number, currency = 'USD'): string {\n  return new Intl.NumberFormat('en-US', {\n    style: 'currency',\n    currency,\n  }).format(amount);\n}`,
  },
  {
    title: "Debounce Action Handler",
    language: "typescript",
    code: `export function debounce<T extends (...args: any[]) => void>(fn: T, delayMs: number) {\n  let timer: NodeJS.Timeout;\n  return (...args: Parameters<T>) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delayMs);\n  };\n}`,
  },
  {
    title: "Safe JSON Parser",
    language: "typescript",
    code: `export function safeJsonParse<T>(raw: string, fallback: T): T {\n  try {\n    return JSON.parse(raw) as T;\n  } catch {\n    return fallback;\n  }\n}`,
  },
  {
    title: "Relative Time Formatter",
    language: "javascript",
    code: `export function formatRelativeDate(date: Date): string {\n  const diffDays = Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));\n  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });\n  return rtf.format(diffDays, 'day');\n}`,
  },
];

const REAL_UPDATES = [
  { title: "Completed usability testing", description: "Feedback incorporated into mobile review", time: "2 hours ago" },
  { title: "Updated quarterly roadmap", description: "Milestone markers refreshed for Q4", time: "4 hours ago" },
  { title: "Published launch checklist", description: "Readiness review shared with team", time: "Yesterday" },
  { title: "Archived legacy documentation", description: "Knowledge base cleaned and organized", time: "2 days ago" },
  { title: "Added project milestone", description: "Customer billing engine entered beta", time: "3 days ago" },
];

async function main() {
  console.log('🌱 Starting database seed with clean, plain-English content...');

  // 1. Clear existing data
  await prisma.auditLog.deleteMany();
  await prisma.progressRecord.deleteMany();
  await prisma.codingProblem.deleteMany();
  await prisma.codeSnippet.deleteMany();
  await prisma.note.deleteMany();
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users with realistic names
  const adminUser = await prisma.user.create({
    data: {
      name: 'Alex Morgan',
      email: 'admin@codespace.dev',
      emailVerified: true,
      role: 'ADMIN',
    },
  });

  const guestUser = await prisma.user.create({
    data: {
      name: 'Jordan Lee',
      email: 'guest@codespace.dev',
      emailVerified: true,
      role: 'GUEST',
    },
  });

  const allUsers = [adminUser, guestUser];

  // 3. Create Credentials
  const hashedSeedPassword = await hashPassword(SEED_PASSWORD);
  await Promise.all(
    allUsers.map((user) =>
      prisma.account.create({
        data: {
          id: `${user.id}-credential`,
          accountId: user.id,
          providerId: 'credential',
          userId: user.id,
          password: hashedSeedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    )
  );

  // 4. Create Projects & Tasks (Real plain English)
  for (const projectData of REAL_PROJECTS) {
    const project = await prisma.project.create({
      data: {
        name: projectData.name,
        description: projectData.description,
        status: projectData.status,
        language: projectData.language,
        userId: adminUser.id,
      },
    });

    for (const taskData of projectData.tasks) {
      await prisma.task.create({
        data: {
          title: taskData.title,
          priority: taskData.priority,
          completed: taskData.completed,
          projectId: project.id,
          userId: adminUser.id,
        },
      });
    }
  }

  // 5. Create Notes (Real plain English)
  for (const noteData of REAL_NOTES) {
    await prisma.note.create({
      data: {
        title: noteData.title,
        snippet: noteData.snippet,
        date: new Date().toLocaleDateString(),
        userId: adminUser.id,
      },
    });
  }

  // 6. Create Code Snippets (Clean utilities)
  for (const snippetData of REAL_SNIPPETS) {
    await prisma.codeSnippet.create({
      data: {
        title: snippetData.title,
        language: snippetData.language,
        code: snippetData.code,
        userId: adminUser.id,
      },
    });
  }

  // 7. Create Recent Updates
  for (const update of REAL_UPDATES) {
    await prisma.auditLog.create({
      data: {
        title: update.title,
        description: update.description,
        time: update.time,
        userId: adminUser.id,
      },
    });
  }

  console.log('✅ Clean database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

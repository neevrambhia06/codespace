import { FolderGit2, CheckCircle2, Terminal, ShieldCheck, Zap, ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";

export function DeepDiveFeatures() {
  return (
    <section id="features" className="py-24 sm:py-32 px-6 sm:px-10 bg-[#E6D5BD] text-[#101010] border-b border-[#101010]/15 bg-grain">
      <div className="max-w-7xl mx-auto space-y-28 sm:space-y-36">
        {/* ── Section Title ───────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#101010]/20 pb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-[#D5360C] mb-3">
              <span>03 // CORE CAPABILITIES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-balance">
              ENGINEERED FOR VELOCITY.
            </h2>
          </div>
          <p className="font-mono text-xs tracking-wider text-[#101010]/70 max-w-md uppercase leading-relaxed">
            Every screen and action in CodeSpace is intentionally stripped of unnecessary chrome, keeping you immersed in the act of building.
          </p>
        </div>

        {/* ── Feature 1: Project & Milestone Engine ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="w-10 h-10 rounded-xs bg-[#D5360C] text-[#E6D5BD] flex items-center justify-center">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div className="font-mono text-xs tracking-[0.25em] text-[#D5360C] uppercase font-bold">
              01 / PROJECT ARCHITECTURE
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              Atomic Project & Milestone Tracking.
            </h3>
            <p className="text-base text-[#101010]/80 leading-relaxed font-light">
              Organize multi-stack initiatives across TypeScript, Rust, Go, or Python. Gain instant visibility into completion metrics, recent updates, and team ownership without wading through bloated enterprise suites.
            </p>
            <div className="pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] font-bold text-[#D5360C] hover:text-[#101010] transition-colors"
              >
                <span>EXPLORE PROJECTS DIRECTORY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xs border border-[#101010]/25 bg-[#EFE3D1] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#101010]/15 pb-4 mb-6">
                <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#101010]">
                  ACTIVE DIRECTORY // MONOREPO VIEW
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#D5360C]/10 text-[#D5360C] font-mono text-[10px] font-bold">
                  POSTGRESQL SYNCED
                </span>
              </div>

              {/* Mock Project Cards */}
              <div className="space-y-3">
                {[
                  {
                    name: "Distributed Consensus Engine",
                    desc: "Raft consensus implementation in Rust with atomic memory barrier.",
                    lang: "Rust",
                    status: "active",
                    progress: 84,
                  },
                  {
                    name: "Next.js App Router Proxy",
                    desc: "Edge-based JWT session authorization and RBAC action dispatch.",
                    lang: "TypeScript",
                    status: "active",
                    progress: 92,
                  },
                  {
                    name: "Vector Pipeline Evaluator",
                    desc: "Embedding distillation and cosine index benchmark harness.",
                    lang: "Python",
                    status: "completed",
                    progress: 100,
                  },
                ].map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xs border border-[#101010]/15 bg-[#E6D5BD]/50 hover:bg-[#E6D5BD] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm text-[#101010]">{p.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-xs bg-[#101010]/10 text-[#101010]">
                          {p.lang}
                        </span>
                        <span
                          className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded-xs font-bold ${
                            p.status === "completed"
                              ? "bg-[#2A6E3B]/15 text-[#2A6E3B]"
                              : "bg-[#D5360C]/15 text-[#D5360C]"
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-[#101010]/70 mt-1">{p.desc}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1 bg-[#101010]/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#D5360C] h-full rounded-full"
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-[#101010]/60">{p.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature 2: Optimistic Taskboard with RBAC ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="rounded-xs border border-[#101010]/25 bg-[#EFE3D1] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#101010]/15 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D5360C]" />
                  <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#101010]">
                    RBAC ACTION PIPELINE
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase text-[#101010]/60">
                  LATENCY &lt; 20MS
                </span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: "Implement database seed with Faker.js",
                    priority: "high",
                    completed: true,
                    role: "ADMIN ONLY",
                  },
                  {
                    title: "Verify WCAG AA contrast for warm editorial palette",
                    priority: "medium",
                    completed: true,
                    role: "MEMBER+",
                  },
                  {
                    title: "Audit Resend webhook signature verification (Svix)",
                    priority: "high",
                    completed: false,
                    role: "ADMIN ONLY",
                  },
                  {
                    title: "Ship Fraunces & Space Mono typography scale",
                    priority: "low",
                    completed: true,
                    role: "MEMBER+",
                  },
                ].map((t, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xs border border-[#101010]/15 bg-[#E6D5BD]/40"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          t.completed ? "bg-[#D5360C] text-[#E6D5BD]" : "border border-[#101010]/40"
                        }`}
                      >
                        {t.completed && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          t.completed ? "line-through text-[#101010]/50" : "text-[#101010]"
                        }`}
                      >
                        {t.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded-xs bg-[#101010]/5 text-[#101010]/70">
                        {t.role}
                      </span>
                      <span
                        className={`font-mono text-[9px] uppercase px-1.5 py-0.5 rounded-xs font-bold ${
                          t.priority === "high"
                            ? "bg-[#B32608]/15 text-[#B32608]"
                            : t.priority === "medium"
                            ? "bg-[#D5360C]/15 text-[#D5360C]"
                            : "bg-[#101010]/10 text-[#101010]/70"
                        }`}
                      >
                        {t.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            <div className="w-10 h-10 rounded-xs bg-[#101010] text-[#E6D5BD] flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#D5360C]" />
            </div>
            <div className="font-mono text-xs tracking-[0.25em] text-[#D5360C] uppercase font-bold">
              02 // OPTIMISTIC MUTATION LAYER
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              Instant Feedback with Cryptographic RBAC.
            </h3>
            <p className="text-base text-[#101010]/80 leading-relaxed font-light">
              Toggling task completion feels instantaneous thanks to React 19 optimistic transitions. Permissions are locked down on the server: Guests browse safely, Members manage tasks, and Admins wield project-level command.
            </p>
            <div className="pt-2">
              <Link
                href="/tasks"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] font-bold text-[#D5360C] hover:text-[#101010] transition-colors"
              >
                <span>VIEW TASK ENGINE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Feature 3: Living Knowledge & Snippet Vault ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="w-10 h-10 rounded-xs bg-[#D5360C] text-[#E6D5BD] flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <div className="font-mono text-xs tracking-[0.25em] text-[#D5360C] uppercase font-bold">
              03 // LIVING KNOWLEDGE VAULT
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              Curate Snippets & Architectural Decisions.
            </h3>
            <p className="text-base text-[#101010]/80 leading-relaxed font-light">
              Don&apos;t let vital scripts and design decisions get buried in Discord or chat logs. CodeSpace lets you capture code chunks with syntax labels and maintain persistent notes beside your projects.
            </p>
            <div className="pt-2">
              <Link
                href="/snippets"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] font-bold text-[#D5360C] hover:text-[#101010] transition-colors"
              >
                <span>OPEN SNIPPET VAULT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xs border border-[#101010]/25 bg-[#101010] text-[#E6D5BD] p-6 sm:p-8 shadow-md">
              <div className="flex items-center justify-between border-b border-[#E6D5BD]/15 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#D5360C]" />
                  <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#E6D5BD]">
                    SNIPPET // PRISMA TRANSACTION HOOK
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase text-[#D5360C] tracking-widest font-bold">
                  TYPESCRIPT
                </span>
              </div>

              <pre className="font-mono text-xs text-[#E6D5BD]/90 leading-relaxed overflow-x-auto p-2 bg-[#101010]">
                <code>{`// Safe atomic project creation with audit trail
await prisma.$transaction(async (tx) => {
  const project = await tx.project.create({
    data: { name, description, status, userId }
  });

  await tx.auditLog.create({
    data: {
      title: "Project Initialized",
      description: \`Created "\${name}" with RBAC authorization\`,
      userId
    }
  });

  return project;
});`}</code>
              </pre>

              <div className="mt-4 pt-3 border-t border-[#E6D5BD]/10 flex items-center justify-between font-mono text-[10px] text-[#E6D5BD]/60 uppercase">
                <span>FORMAT: STRICT MONOCHROME</span>
                <span>COPY TO CLIPBOARD [⌘C]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

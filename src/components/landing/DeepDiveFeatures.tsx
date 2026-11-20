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
              ENGINEERED FOR FOCUS.
            </h2>
          </div>
          <p className="font-mono text-xs tracking-wider text-[#101010]/70 max-w-md uppercase leading-relaxed">
            Every screen and view in CodeSpace is intentionally stripped of unnecessary chrome, keeping you immersed in what matters.
          </p>
        </div>

        {/* ── Feature 1: Project & Milestone Engine ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="w-10 h-10 rounded-xs bg-[#D5360C] text-[#E6D5BD] flex items-center justify-center">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div className="font-mono text-xs tracking-[0.25em] text-[#D5360C] uppercase font-bold">
              01 / PROJECT MANAGEMENT
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              Clear Project & Milestone Organization.
            </h3>
            <p className="text-base text-[#101010]/80 leading-relaxed font-light">
              Keep your key initiatives organized in one central directory. Track overall progress, upcoming milestones, and project ownership without dealing with complex enterprise software.
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
                  ACTIVE PROJECTS // DIRECTORY VIEW
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#D5360C]/10 text-[#D5360C] font-mono text-[10px] font-bold">
                  CLOUD SYNCED
                </span>
              </div>

              {/* Mock Project Cards */}
              <div className="space-y-3">
                {[
                  {
                    name: "Customer Analytics Dashboard",
                    desc: "Real-time metrics, user retention analysis, and revenue reporting.",
                    tag: "Product",
                    status: "active",
                    progress: 84,
                  },
                  {
                    name: "Customer Invoicing & Billing System",
                    desc: "Automated subscription renewals, invoice generation, and tax compliance.",
                    tag: "Finance",
                    status: "active",
                    progress: 92,
                  },
                  {
                    name: "Team Knowledge Base Portal",
                    desc: "Centralized workspace documentation, guides, and project playbooks.",
                    tag: "Docs",
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
                          {p.tag}
                        </span>
                        <span
                          className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded-xs font-bold ${
                            p.status === "completed"
                              ? "bg-[#101010] text-[#E6D5BD]"
                              : "bg-[#D5360C] text-[#E6D5BD]"
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

        {/* ── Feature 2: Task Checklist ──────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="rounded-xs border border-[#101010]/25 bg-[#EFE3D1] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#101010]/15 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D5360C]" />
                  <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#101010]">
                    PROJECT DELIVERABLES
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase text-[#101010]/60">
                  INSTANT STATUS UPDATE
                </span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: "Review quarterly customer feedback and survey notes",
                    priority: "high",
                    completed: true,
                    role: "TEAM LEAD",
                  },
                  {
                    title: "Finalize touch gestures for mobile task completion",
                    priority: "medium",
                    completed: true,
                    role: "CORE TEAM",
                  },
                  {
                    title: "Draft release announcement and user walkthrough",
                    priority: "high",
                    completed: false,
                    role: "ALL MEMBERS",
                  },
                  {
                    title: "Verify accessible typography and form inputs",
                    priority: "low",
                    completed: true,
                    role: "CORE TEAM",
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
                            ? "bg-[#D5360C] text-[#E6D5BD]"
                            : "border border-[#101010] text-[#101010]"
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
              02 // RESPONSIVE TASK BOARD
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              Fast Checklists & Team Collaboration.
            </h3>
            <p className="text-base text-[#101010]/80 leading-relaxed font-light">
              Checking off deliverables feels instant with no waiting. Easily manage team access with clear permissions for owners, contributors, and guests.
            </p>
            <div className="pt-2">
              <Link
                href="/tasks"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] font-bold text-[#D5360C] hover:text-[#101010] transition-colors"
              >
                <span>VIEW TASK CHECKLIST</span>
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
              03 // NOTES & TEMPLATES
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              Capture Notes, Decisions & Reference Materials.
            </h3>
            <p className="text-base text-[#101010]/80 leading-relaxed font-light">
              Never lose an important decision or repeat routine setup. Keep meeting notes, project specs, and reusable text snippets directly beside your active checklists.
            </p>
            <div className="pt-2">
              <Link
                href="/notes"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] font-bold text-[#D5360C] hover:text-[#101010] transition-colors"
              >
                <span>BROWSE NOTES & DOCS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xs border border-[#101010]/25 bg-[#EFE3D1] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#101010]/15 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#D5360C]" />
                  <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#101010]">
                    REFERENCE LIBRARY
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase text-[#101010]/60">
                  ONE-CLICK COPY
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xs border border-[#101010]/15 bg-[#E6D5BD]/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display text-sm font-bold text-[#101010]">Format Currency Utility</span>
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-xs bg-[#101010] text-[#E6D5BD]">
                      TypeScript
                    </span>
                  </div>
                  <pre className="font-mono text-xs text-[#E6D5BD] leading-relaxed overflow-x-auto p-3 bg-[#101010] rounded-xs">
                    <code>{`export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

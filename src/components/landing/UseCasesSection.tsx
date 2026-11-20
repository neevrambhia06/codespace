import { Laptop, Cpu, GitFork, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const USE_CASES = [
  {
    role: "SOLO FOUNDER & HACKER",
    headline: "Shipping multiple SaaS products without context rot.",
    description:
      "When you wear every hat—product, architecture, DevOps, and frontend—switching between projects is your biggest time sink. CodeSpace lets you keep your active sprint tasks, deployment commands, and snippets pinned under one clean tab.",
    icon: Laptop,
    deliverables: ["Instant project switching", "Snippets for Stripe/Auth boilerplate", "Zero-friction task checklists"],
  },
  {
    role: "STAFF & SYSTEM ARCHITECT",
    headline: "Codifying architectural decisions and audit logs.",
    description:
      "Maintain a persistent record of technical choices, database migrations, and schema changes. Use role-based permissions to delegate task execution to members while keeping repository creation guarded by admin policy.",
    icon: Cpu,
    deliverables: ["Clear audit history on Neon PostgreSQL", "RBAC security boundaries", "Decoupled Server Action architecture"],
  },
  {
    role: "OPEN SOURCE MAINTAINER",
    headline: "Curating issues, notes, and release milestones.",
    description:
      "Track dependencies, triage feature requests, and maintain public knowledge notes without fighting complex enterprise project tools. Clean, fast, and respectful of your screen time.",
    icon: GitFork,
    deliverables: ["Keyboard-first workflow", "Light editorial theme for long hours", "Full accessibility and high Lighthouse scores"],
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-24 sm:py-32 px-6 sm:px-10 bg-[#E6D5BD] text-[#101010] border-b border-[#101010]/15 bg-grain">
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#101010]/20 pb-8 mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-[#D5360C] mb-3">
              <span>04 // REAL-WORLD WORKFLOWS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-balance">
              HOW BUILDERS OPERATE.
            </h2>
          </div>
          <p className="font-mono text-xs tracking-wider text-[#101010]/70 max-w-md uppercase leading-relaxed">
            Tailored to high-autonomy engineers who prioritize clarity over bureaucracy.
          </p>
        </div>

        {/* ── Cards Grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {USE_CASES.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <div
                key={i}
                className="rounded-xs border border-[#101010]/20 bg-[#EFE3D1] p-8 flex flex-col justify-between hover:border-[#101010] transition-all duration-300 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#101010]/10 pb-4 mb-6">
                    <span className="font-mono text-[10px] tracking-[0.25em] text-[#D5360C] uppercase font-bold">
                      {uc.role}
                    </span>
                    <Icon className="w-4 h-4 text-[#101010]" />
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug mb-3">
                    {uc.headline}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#101010]/75 leading-relaxed font-light mb-6">
                    {uc.description}
                  </p>
                </div>

                <div>
                  <div className="pt-4 border-t border-[#101010]/10 mb-6 space-y-2">
                    {uc.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-[#101010]/80 font-mono">
                        <span className="text-[#D5360C]">✦</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider font-bold text-[#101010] hover:text-[#D5360C] transition-colors"
                  >
                    <span>LAUNCH THIS WORKFLOW</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { X, Check, Layers, AlertCircle, Sparkles } from "lucide-react";

export function ComparisonSection() {
  return (
    <section id="comparison" className="py-24 sm:py-32 px-6 sm:px-10 bg-[#E6D5BD] text-[#101010] border-b border-[#101010]/15 bg-grain">
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#101010]/20 pb-8 mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-[#D5360C] mb-3">
              <span>02 // PARADIGM SHIFT</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-balance">
              THE FRAGMENTATION DILEMMA.
            </h2>
          </div>
          <p className="font-mono text-xs tracking-wider text-[#101010]/70 max-w-md uppercase leading-relaxed">
            Developers lose up to 3 hours daily context-switching across browser tabs, disconnected notes, and bloated trackers. Here is how we solve it.
          </p>
        </div>

        {/* ── Side-by-Side Comparison Grid ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* ── Without CodeSpace ───────────────────────────────────────── */}
          <div className="rounded-xs border border-[#101010]/20 bg-[#EFE3D1]/60 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#101010]/15 pb-4">
                <div className="flex items-center gap-2 text-[#101010]/70">
                  <AlertCircle className="w-5 h-5 text-[#B32608]" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold">
                    THE OLD PARADIGM
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase text-[#101010]/50 tracking-wider">
                  CHAOTIC SPRAWL
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-[#101010]">
                Without CodeSpace
              </h3>

              <ul className="space-y-4 pt-2">
                {[
                  "14+ open browser tabs juggling Jira, Notion, GitHub, and notes",
                  "Scattered local .txt files and forgotten markdown scratchpads",
                  "Eye-straining dark neon interfaces that cause cognitive burnout",
                  "Opaque, delayed task sync with zero role-based mutation safety",
                  "Zero unified audit trail of what was actually deployed or modified",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#101010]/75">
                    <div className="w-5 h-5 rounded-full bg-[#101010]/10 flex items-center justify-center shrink-0 mt-0.5 text-[#B32608]">
                      <X className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-4 border-t border-[#101010]/10 font-mono text-[11px] text-[#101010]/60 uppercase tracking-wider">
              RESULT: HIGH COGNITIVE DRAG & CONTEXT LOSS
            </div>
          </div>

          {/* ── With CodeSpace ──────────────────────────────────────────── */}
          <div className="rounded-xs border-2 border-[#101010] bg-[#EFE3D1] p-8 sm:p-10 flex flex-col justify-between shadow-md relative">
            {/* Top highlight ribbon */}
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#D5360C] text-[#E6D5BD] font-mono text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-xs">
              RECOMMENDED DISCIPLINE
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#101010]/15 pb-4">
                <div className="flex items-center gap-2 text-[#D5360C]">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold">
                    THE CODESPACE WAY
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase text-[#D5360C] tracking-wider font-bold">
                  SOVEREIGN HARMONY
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-[#101010]">
                With CodeSpace
              </h3>

              <ul className="space-y-4 pt-2">
                {[
                  "One unified cockpit for active repositories, milestones, and tasks",
                  "Living knowledge vault: curated code snippets and architectural decisions",
                  "Warm editorial typography engineered for 12+ hour focus sessions",
                  "Strict RBAC (Admin, Member, Guest) enforced at the Server Action layer",
                  "Real-time event logging & audit telemetry connected to PostgreSQL",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#101010] font-medium">
                    <div className="w-5 h-5 rounded-full bg-[#D5360C] flex items-center justify-center shrink-0 mt-0.5 text-[#E6D5BD]">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-4 border-t border-[#101010]/15 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[#D5360C] font-bold">
              <span>RESULT: MAXIMUM FLOW STATE & CLARITY</span>
              <Layers className="w-4 h-4 text-[#101010]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, Code2, Globe } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export function EditorialFooter() {
  return (
    <footer className="bg-[#101010] text-[#E6D5BD]">
      {/* ── Closing Callout Band in Bold Burnt Orange ─────────────────────── */}
      <div className="bg-[#D5360C] text-[#E6D5BD] py-20 sm:py-28 px-6 sm:px-10 bg-grain-orange border-b border-[#101010]">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-block px-3 py-1 rounded-full border border-[#E6D5BD]/30 font-mono text-[10px] tracking-[0.25em] uppercase">
            ✦ // IMMEDIATE ONBOARDING
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#E6D5BD] text-balance">
            Reclaim your engineering focus today.
          </h2>

          <p className="text-base sm:text-lg text-[#E6D5BD]/90 max-w-xl mx-auto font-light font-sans">
            No endless configurations or chaotic tool sprawl. Step into a sovereign, high-velocity workspace built for creators.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 bg-[#E6D5BD] text-[#101010] px-8 py-4 rounded-full font-mono text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 hover:bg-[#101010] hover:text-[#E6D5BD] shadow-md"
            >
              <span>ENTER THE WORKSPACE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login"
              className="font-mono text-xs tracking-[0.2em] uppercase text-[#E6D5BD] hover:underline px-6 py-4"
            >
              SIGN IN AS DEMO ADMIN →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Multi-Column Editorial Footer ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto py-16 sm:py-24 px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#E6D5BD]/15">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-xs bg-[#D5360C] text-[#E6D5BD] flex items-center justify-center">
                <Code2 className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono text-sm tracking-[0.25em] font-bold uppercase text-[#E6D5BD]">
                {APP_NAME}
              </span>
            </div>

            <p className="text-xs text-[#E6D5BD]/70 max-w-sm font-light leading-relaxed">
              An all-in-one, highly performant developer workspace crafted with Next.js App Router, Prisma ORM, and Better Auth. Built for typographic calm and engineering velocity.
            </p>

            <div className="pt-2 flex items-center gap-2 font-mono text-[10px] text-[#E6D5BD]/50 uppercase tracking-widest">
              <Globe className="w-3 h-3 text-[#D5360C]" />
              <span>DEPLOYED ON VERCEL EDGE & NEON PG</span>
            </div>
          </div>

          {/* Directory Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#D5360C] font-bold">
              WORKSPACE DIRECTORY
            </p>
            <ul className="space-y-2 font-mono text-xs text-[#E6D5BD]/80">
              <li>
                <Link href="/dashboard" className="hover:text-[#D5360C] transition-colors">
                  01 / DASHBOARD
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#D5360C] transition-colors">
                  02 / PROJECTS & CYCLES
                </Link>
              </li>
              <li>
                <Link href="/tasks" className="hover:text-[#D5360C] transition-colors">
                  03 / TASKBOARD
                </Link>
              </li>
              <li>
                <Link href="/notes" className="hover:text-[#D5360C] transition-colors">
                  04 / KNOWLEDGE & NOTES
                </Link>
              </li>
              <li>
                <Link href="/snippets" className="hover:text-[#D5360C] transition-colors">
                  05 / SNIPPET VAULT
                </Link>
              </li>
            </ul>
          </div>

          {/* System & Architecture */}
          <div className="md:col-span-4 space-y-3">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#D5360C] font-bold">
              SECURITY & ARCHITECTURE
            </p>
            <div className="space-y-2 text-xs text-[#E6D5BD]/70 font-mono">
              <div className="flex justify-between border-b border-[#E6D5BD]/10 pb-1.5">
                <span>AUTHENTICATION:</span>
                <span className="text-[#E6D5BD]">Better Auth (HttpOnly)</span>
              </div>
              <div className="flex justify-between border-b border-[#E6D5BD]/10 pb-1.5">
                <span>DATABASE:</span>
                <span className="text-[#E6D5BD]">PostgreSQL 16 (Neon)</span>
              </div>
              <div className="flex justify-between border-b border-[#E6D5BD]/10 pb-1.5">
                <span>AUTHORIZATION:</span>
                <span className="text-[#E6D5BD]">RBAC (Guest, Member, Admin)</span>
              </div>
              <div className="flex justify-between pb-1.5">
                <span>ACCESSIBILITY:</span>
                <span className="text-[#D5360C] font-bold">100 / 100 Lighthouse</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sign-off */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[11px] text-[#E6D5BD]/60">
          <div>
            © {new Date().getFullYear()} {APP_NAME}. ALL RIGHTS RESERVED. SOVEREIGN SOFTWARE.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-[#E6D5BD] transition-colors">
              LOGIN
            </Link>
            <Link href="/register" className="hover:text-[#E6D5BD] transition-colors">
              REGISTER
            </Link>
            <span>PALETTE: #D5360C / #E6D5BD / #101010</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { ArrowRight, Code2, ShieldCheck } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export function EditorialFooter() {
  return (
    <footer className="bg-[#101010] text-[#E6D5BD]">
      {/* ── Closing Callout Band ─────────────────────────────────────────── */}
      <div className="bg-[#D5360C] text-[#E6D5BD] py-20 sm:py-28 px-6 sm:px-10 bg-grain-orange border-b border-[#101010]">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-block px-3 py-1 rounded-full border border-[#E6D5BD]/30 font-mono text-[10px] tracking-[0.25em] uppercase">
            ✦ // GET STARTED
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#E6D5BD] text-balance">
            Reclaim your daily focus today.
          </h2>

          <p className="text-base sm:text-lg text-[#E6D5BD]/90 max-w-xl mx-auto font-light font-sans">
            No complex setup or chaotic tool sprawl. Step into a clean, distraction-free workspace built for momentum.
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
              SIGN IN TO ACCOUNT →
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
                <Code2 className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="font-mono text-sm tracking-[0.25em] font-bold uppercase text-[#E6D5BD]">
                {APP_NAME}
              </span>
            </div>

            <p className="text-xs text-[#E6D5BD]/70 max-w-sm font-light leading-relaxed">
              A unified, distraction-free workspace designed for clarity, momentum, and typographic calm. Built for creators, founders, and teams.
            </p>

            <div className="pt-2 flex items-center gap-2 font-mono text-[10px] text-[#E6D5BD]/50 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D5360C]" />
              <span>SECURE CLOUD WORKSPACE • CONTINUOUS SYNC</span>
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
                  02 / PROJECTS & INITIATIVES
                </Link>
              </li>
              <li>
                <Link href="/tasks" className="hover:text-[#D5360C] transition-colors">
                  03 / TASK CHECKLIST
                </Link>
              </li>
              <li>
                <Link href="/notes" className="hover:text-[#D5360C] transition-colors">
                  04 / KNOWLEDGE & NOTES
                </Link>
              </li>
              <li>
                <Link href="/snippets" className="hover:text-[#D5360C] transition-colors">
                  05 / TEMPLATES & SNIPPETS
                </Link>
              </li>
            </ul>
          </div>

          {/* Privacy & Standards */}
          <div className="md:col-span-4 space-y-3">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#D5360C] font-bold">
              PRIVACY & SECURITY
            </p>
            <div className="space-y-2.5 text-xs text-[#E6D5BD]/70 font-mono">
              <div className="flex justify-between border-b border-[#E6D5BD]/10 pb-1.5">
                <span>DATA PROTECTION:</span>
                <span className="text-[#E6D5BD]">End-to-End SSL Encryption</span>
              </div>
              <div className="flex justify-between border-b border-[#E6D5BD]/10 pb-1.5">
                <span>ACCESS SESSIONS:</span>
                <span className="text-[#E6D5BD]">Secure Verified Credentials</span>
              </div>
              <div className="flex justify-between border-b border-[#E6D5BD]/10 pb-1.5">
                <span>BACKUPS:</span>
                <span className="text-[#E6D5BD]">Automatic Cloud Redundancy</span>
              </div>
              <div className="flex justify-between pb-1.5">
                <span>EXPERIENCE:</span>
                <span className="text-[#D5360C] font-bold">Fast & Distraction-Free</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sign-off */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[11px] text-[#E6D5BD]/60">
          <div>
            © {new Date().getFullYear()} {APP_NAME}. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-[#E6D5BD] transition-colors">
              SIGN IN
            </Link>
            <Link href="/register" className="hover:text-[#E6D5BD] transition-colors">
              REGISTER
            </Link>
            <span>PRIVATE & SECURE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { ArrowRight, Code2, ShieldCheck } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export function EditorialFooter() {
  return (
    <footer className="bg-[#101010] text-[#E6D5BD]">
      {/* ── Closing Callout Band ─────────────────────────────────────────── */}
      <div className="bg-[#D5360C] text-[#E6D5BD] py-20 sm:py-24 px-6 sm:px-10 bg-grain-orange border-b border-[#101010]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block px-3 py-1 rounded-full border border-[#E6D5BD]/30 font-mono text-[10px] tracking-[0.25em] uppercase">
            ✦ GET STARTED
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#E6D5BD] text-balance">
            Reclaim your daily focus today.
          </h2>

          <p className="text-base sm:text-lg text-[#E6D5BD]/95 max-w-lg mx-auto font-sans font-light">
            No complex setup. Step into a clean, distraction-free workspace built for momentum.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 bg-[#E6D5BD] text-[#101010] px-8 py-3.5 rounded-full font-sans text-xs tracking-wider font-bold uppercase transition-all duration-300 hover:bg-[#101010] hover:text-[#E6D5BD] shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>ENTER WORKSPACE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login"
              className="font-sans text-xs tracking-wider font-semibold uppercase text-[#E6D5BD] hover:underline px-5 py-3.5"
            >
              SIGN IN →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Multi-Column Editorial Footer ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto py-12 sm:py-16 px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#E6D5BD]/15">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-[#D5360C] text-white flex items-center justify-center">
                <Code2 className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="font-sans text-sm tracking-[0.2em] font-bold uppercase text-[#E6D5BD]">
                {APP_NAME}
              </span>
            </div>

            <p className="text-xs text-[#E6D5BD]/70 max-w-sm font-normal leading-relaxed">
              A unified, distraction-free workspace designed for clarity, momentum, and typographic calm.
            </p>

            <div className="pt-2 flex items-center gap-2 font-sans text-xs text-[#E6D5BD]/60">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D5360C]" />
              <span>Encrypted cloud workspace • Continuous sync</span>
            </div>
          </div>

          {/* Directory Links */}
          <div className="md:col-span-3 space-y-2.5">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#D5360C] font-bold">
              DIRECTORY
            </p>
            <ul className="space-y-1.5 font-sans text-xs text-[#E6D5BD]/80">
              <li>
                <Link href="/dashboard" className="hover:text-[#D5360C] transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#D5360C] transition-colors">
                  Projects & Milestones
                </Link>
              </li>
              <li>
                <Link href="/tasks" className="hover:text-[#D5360C] transition-colors">
                  Task Checklists
                </Link>
              </li>
              <li>
                <Link href="/notes" className="hover:text-[#D5360C] transition-colors">
                  Knowledge & Notes
                </Link>
              </li>
              <li>
                <Link href="/snippets" className="hover:text-[#D5360C] transition-colors">
                  Templates & Snippets
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & Sessions */}
          <div className="md:col-span-4 space-y-2.5">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#D5360C] font-bold">
              SECURITY & ACCESS
            </p>
            <div className="space-y-2 text-xs text-[#E6D5BD]/70 font-sans">
              <div className="flex justify-between border-b border-[#E6D5BD]/10 pb-1.5">
                <span>Encryption:</span>
                <span className="text-[#E6D5BD] font-medium">256-bit SSL</span>
              </div>
              <div className="flex justify-between border-b border-[#E6D5BD]/10 pb-1.5">
                <span>Access Sessions:</span>
                <span className="text-[#E6D5BD] font-medium">Verified Credentials</span>
              </div>
              <div className="flex justify-between pb-1.5">
                <span>Experience:</span>
                <span className="text-[#D5360C] font-bold">Fast & Distraction-Free</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sign-off */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#E6D5BD]/60 font-sans">
          <div>
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-[#E6D5BD] transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="hover:text-[#E6D5BD] transition-colors">
              Register
            </Link>
            <span>Privacy & Focus</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

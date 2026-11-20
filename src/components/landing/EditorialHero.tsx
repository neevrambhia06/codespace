import Link from "next/link";
import { ArrowRight, Terminal, CheckCircle2, FolderGit2, Sparkles } from "lucide-react";

export function EditorialHero() {
  return (
    <section
      id="overview"
      className="relative min-h-[92vh] lg:min-h-screen bg-[#D5360C] text-[#E6D5BD] pt-32 pb-20 px-6 sm:px-10 flex flex-col justify-between overflow-hidden bg-grain-orange"
    >
      {/* ── Background Editorial Accents ──────────────────────────────────── */}
      {/* 12-point Soft Black Starburst/Asterisk Graphic from Reference Photo */}
      <div className="absolute top-24 right-8 sm:top-28 sm:right-16 text-[#101010] select-none pointer-events-none transition-transform duration-700 hover:rotate-45">
        <svg
          width="110"
          height="110"
          viewBox="0 0 100 100"
          fill="currentColor"
          className="w-20 h-20 sm:w-28 sm:h-28 opacity-95 drop-shadow-sm animate-pulse duration-1000"
          aria-hidden="true"
        >
          <path d="M50 0 L58 35 L93 20 L72 50 L100 50 L72 65 L93 90 L58 75 L50 100 L42 75 L7 90 L28 65 L0 50 L28 50 L7 20 L42 35 Z" />
        </svg>
      </div>

      {/* Subtle background typographic watermark */}
      <div className="absolute -bottom-10 -left-6 font-display text-[16vw] font-bold text-[#101010]/5 select-none pointer-events-none leading-none tracking-tighter">
        WORKSPACE
      </div>

      {/* ── Top Flanking Editorial Captions ───────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-b border-[#E6D5BD]/20 pb-8 z-10">
        <div className="md:col-span-5">
          <p className="font-mono text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#E6D5BD]/90 leading-relaxed">
            IDEAS, SYSTEMS, AND ROADMAPS FOR THE DISCIPLINED BUILDER
          </p>
        </div>
        <div className="hidden md:block md:col-span-2 text-center font-mono text-[11px] tracking-[0.25em] text-[#101010]">
          ✦ // 2026 EDITION
        </div>
        <div className="md:col-span-5 md:text-right">
          <p className="font-serif italic text-xs sm:text-sm text-[#E6D5BD]/85 leading-relaxed max-w-md md:ml-auto">
            A sovereign space for engineers, makers, and craftsmen who see the world in systems and build with conviction.
          </p>
        </div>
      </div>

      {/* ── Center Stage: Oversized Display Headline ──────────────────────── */}
      <div className="my-auto py-12 lg:py-16 z-10 max-w-5xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E6D5BD]/30 font-mono text-[10px] tracking-[0.25em] uppercase text-[#E6D5BD] mb-6 backdrop-blur-xs">
          <Sparkles className="w-3 h-3 text-[#101010]" />
          <span>MODERN EDITORIAL WORKSPACE</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-[#E6D5BD] leading-[1.02] text-balance">
          THE ARCHITECT&apos;S <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#101010]">SOVEREIGN</span> WORKSPACE.
        </h1>

        <p className="mt-8 text-base sm:text-lg md:text-xl text-[#E6D5BD]/90 max-w-2xl leading-relaxed font-sans font-light">
          Where high-velocity engineering meets typographic calm. CodeSpace unifies project tracking, optimistic task execution, code curation, and reactive knowledge in one sovereign environment.
        </p>

        {/* ── CTA Row ──────────────────────────────────────────────────────── */}
        <div className="mt-10 flex flex-wrap items-center gap-6 sm:gap-8">
          {/* Circular Outlined Arrow Button (Inspired directly by Reference Art) */}
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-4 bg-[#E6D5BD] text-[#101010] pl-6 pr-3 py-3 rounded-full font-mono text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 hover:bg-[#101010] hover:text-[#E6D5BD] shadow-sm"
          >
            <span>EXPLORE WORKSPACE</span>
            <div className="w-9 h-9 rounded-full border border-[#101010] group-hover:border-[#E6D5BD] flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Secondary Quick Action */}
          <Link
            href="/login"
            className="font-mono text-xs tracking-[0.2em] uppercase text-[#E6D5BD] hover:text-[#101010] transition-colors py-2 border-b border-transparent hover:border-[#101010]"
          >
            SIGN IN TO CONSOLE →
          </Link>

          <span className="hidden sm:inline font-mono text-xs text-[#E6D5BD]/60">
            // NO NOISY ADS. PURE SIGNAL.
          </span>
        </div>
      </div>

      {/* ── Interactive Workspace Preview Card (Floated Editorial Surface) ── */}
      <div className="mt-6 mb-8 z-10">
        <div className="rounded-sm border border-[#101010]/30 bg-[#EFE3D1] text-[#101010] p-4 sm:p-6 shadow-md max-w-4xl">
          <div className="flex items-center justify-between border-b border-[#101010]/15 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D5360C]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#101010]/30" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#101010]/30" />
              <span className="font-mono text-[11px] font-bold tracking-widest text-[#101010] ml-2">
                LIVE WORKSPACE TELEMETRY
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-wider text-[#101010]/60 uppercase">
              POSTGRESQL // NEON CONNECTED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="border border-[#101010]/10 rounded-xs p-3 bg-[#E6D5BD]/60">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-[#101010]/70">PROJECTS</span>
                <FolderGit2 className="w-3.5 h-3.5 text-[#D5360C]" />
              </div>
              <div className="font-display text-2xl font-bold mt-1 text-[#101010]">05 ACTIVE</div>
              <p className="text-[11px] text-[#101010]/70 mt-0.5">TypeScript & Rust Monorepos</p>
            </div>

            <div className="border border-[#101010]/10 rounded-xs p-3 bg-[#E6D5BD]/60">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-[#101010]/70">TASKBOARD</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D5360C]" />
              </div>
              <div className="font-display text-2xl font-bold mt-1 text-[#101010]">100% AUDITED</div>
              <p className="text-[11px] text-[#101010]/70 mt-0.5">Optimistic Server Actions</p>
            </div>

            <div className="border border-[#101010]/10 rounded-xs p-3 bg-[#E6D5BD]/60">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-[#101010]/70">SNIPPETS</span>
                <Terminal className="w-3.5 h-3.5 text-[#D5360C]" />
              </div>
              <div className="font-display text-2xl font-bold mt-1 text-[#101010]">VAULT SYNC</div>
              <p className="text-[11px] text-[#101010]/70 mt-0.5">High-speed keyboard lookup</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar: Editorial Counter & Indicators ────────────────────── */}
      <div className="flex items-center justify-between border-t border-[#E6D5BD]/20 pt-6 z-10 font-mono text-xs tracking-[0.2em]">
        <div className="flex items-center gap-4">
          <span className="text-[#101010] font-bold">01 // 05</span>
          <div className="w-24 sm:w-40 h-[1.5px] bg-[#E6D5BD]/30 overflow-hidden">
            <div className="w-1/5 h-full bg-[#101010]" />
          </div>
          <span className="text-[#E6D5BD]/80 hidden sm:inline">ENTRY POINT</span>
        </div>

        <div className="text-[#E6D5BD]/80">
          SCROLL TO EXPLORE ARCHITECTURE ↓
        </div>
      </div>
    </section>
  );
}

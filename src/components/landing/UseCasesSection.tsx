"use client";

import { useEffect, useRef, useState } from "react";
import { Laptop, Cpu, GitFork, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import {
  animate,
  createTimeline,
  createScope,
  onScroll,
  stagger,
} from "animejs";
import { createDrawable } from "animejs/svg";
import { animateCounter, prefersReducedMotion } from "@/lib/motion";

interface Persona {
  id: string;
  role: string;
  headline: string;
  caption: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  metricNumber: number;
  metricPrefix: string;
  metricSuffix: string;
  metricLabel: string;
}

const PERSONAS: Persona[] = [
  {
    id: "founder",
    role: "Founders & Builders",
    headline: "Ship initiatives with zero overhead.",
    caption: "Roadmaps, deliverables, and notes unified.",
    icon: Laptop,
    tags: ["Project Roadmaps", "Live Checklists", "Cloud Sync"],
    metricNumber: 4,
    metricPrefix: "",
    metricSuffix: "x",
    metricLabel: "Faster Daily Flow",
  },
  {
    id: "lead",
    role: "Engineering Leads",
    headline: "Align team deliverables effortlessly.",
    caption: "Transparent milestone tracking and clear deliverables.",
    icon: Cpu,
    tags: ["Milestone Tracking", "Role Permissions", "Clean Logs"],
    metricNumber: 100,
    metricPrefix: "",
    metricSuffix: "%",
    metricLabel: "Focused Clarity",
  },
  {
    id: "consultant",
    role: "Consultants & Creators",
    headline: "Present deliverables that impress.",
    caption: "Curate specs, notes, and tasks in calm harmony.",
    icon: GitFork,
    tags: ["Keyboard Commands", "Editorial Design", "Export Ready"],
    metricNumber: 0,
    metricPrefix: "",
    metricSuffix: "",
    metricLabel: "Cognitive Fatigue",
  },
];

export function UseCasesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);
  const stat4Ref = useRef<HTMLSpanElement>(null);

  const [activePersona, setActivePersona] = useState<Persona>(PERSONAS[0]);

  // ── Anime.js v4 Scope Lifecycle: 2D Grid Stagger & Scroll Draw ───────────
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) return;

    const scope = createScope({
      mediaQueries: { mobile: "(max-width: 768px)" },
      root: sectionRef.current || undefined,
    });

    scope.add(() => {
      // 1. Scroll-synced SVG line drawing
      try {
        const paths = sectionRef.current?.querySelectorAll<SVGGeometryElement>(".usecase-draw-path");
        if (paths && paths.length > 0) {
          animate(createDrawable(paths), {
            draw: ["0 0", "0 1"],
            delay: stagger(40),
            ease: "inOut(3)",
            autoplay: onScroll({ target: sectionRef.current || undefined, sync: true }),
          });
        }
      } catch (err) {
        console.warn("Usecase draw error:", err);
      }

      // 2. Heavy 2D Grid Stagger Wave on Stat Cards
      const tl = createTimeline({
        defaults: { ease: "outExpo" },
        autoplay: onScroll({ target: sectionRef.current || undefined, enter: "top 80%" }),
      });

      tl.add(".stat-grid-card", {
        opacity: [0, 1],
        translateY: [40, 0],
        scale: [0.9, 1],
        duration: 750,
        delay: stagger(70, { grid: [2, 2], from: "center" }),
        ease: "outBack(1.2)",
      });

      // 3. Number Counter Rollups
      animateCounter(stat1Ref.current, 99.9, { decimals: 1, suffix: "%" });
      animateCounter(stat2Ref.current, 4, { suffix: "x" });
      animateCounter(stat3Ref.current, 100, { suffix: "%" });
      animateCounter(stat4Ref.current, 50, { prefix: "<", suffix: "ms" });
    });

    return () => {
      scope.revert();
    };
  }, []);

  const selectPersona = (p: Persona) => {
    setActivePersona(p);
    if (cardRef.current && !prefersReducedMotion()) {
      animate(cardRef.current, {
        opacity: [0.7, 1],
        scale: [0.985, 1],
        duration: 350,
        ease: "outExpo",
      });
    }
  };

  const Icon = activePersona.icon;

  return (
    <section
      ref={sectionRef}
      id="use-cases"
      className="relative py-20 sm:py-28 px-6 sm:px-10 bg-[#E6D5BD] text-[#101010] border-b border-[#101010]/15 bg-grain overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#101010]/15 pb-6 mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-[#D5360C] mb-2 font-semibold">
              <span>04 // INTENDED DISCIPLINES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#101010]">
              BUILT FOR BUILDERS.
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#524D46] max-w-sm">
            Tailored for individuals and autonomous teams who value speed and clarity.
          </p>
        </div>

        {/* ── Interactive Persona Pills ──────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {PERSONAS.map((p) => {
            const isSelected = activePersona.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => selectPersona(p)}
                className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#D5360C] text-white border-[#D5360C] shadow-sm scale-[1.02]"
                    : "bg-white text-[#101010] border-[#101010]/12 hover:bg-[#FAF4EA]"
                }`}
              >
                {p.role}
              </button>
            );
          })}
        </div>

        {/* ── Active Persona Showcase Bento ──────────────────────────────── */}
        <div
          ref={cardRef}
          className="relative rounded-2xl border border-[#101010]/15 bg-white p-6 sm:p-10 shadow-lg mb-12 overflow-hidden"
        >
          {/* Scroll-synced SVG border bracket */}
          <svg
            className="absolute top-2 left-2 w-8 h-8 pointer-events-none text-[#101010]"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path d="M 32 2 L 2 2 L 2 32" stroke="#101010" strokeWidth="2" className="usecase-draw-path" />
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D5360C]/10 text-[#D5360C] flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#D5360C] font-bold">
                  {activePersona.role}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#101010] leading-tight">
                {activePersona.headline}
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#524D46] leading-relaxed">
                {activePersona.caption}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                {activePersona.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-medium bg-[#EDE4D5] text-[#101010]"
                  >
                    <Check className="w-3 h-3 text-[#D5360C]" />
                    <span>{t}</span>
                  </span>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 bg-[#D5360C] text-white px-5 py-2.5 rounded-lg font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#B82D09] transition-colors"
                >
                  <span>Launch Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="w-full rounded-xl border border-[#101010]/10 bg-[#F7F4EF] p-8 text-center shadow-inner">
                <span className="block font-mono text-xs uppercase tracking-widest text-[#524D46] mb-2">
                  EXPECTED IMPACT
                </span>
                <div className="font-sans text-6xl sm:text-7xl font-bold tracking-tight text-[#101010]">
                  {activePersona.metricPrefix}
                  {activePersona.metricNumber}
                  {activePersona.metricSuffix}
                </div>
                <p className="font-sans text-sm font-semibold text-[#D5360C] mt-2">
                  {activePersona.metricLabel}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Animated Stat Counters Bar with 2D Grid Stagger Wave ─────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat-grid-card p-5 rounded-xl border border-[#101010]/12 bg-white text-center shadow-2xs opacity-0">
            <span ref={stat1Ref} className="font-sans text-3xl sm:text-4xl font-bold text-[#101010]">
              99.9%
            </span>
            <p className="font-sans text-xs text-[#524D46] mt-1 font-medium">Cloud Sync Uptime</p>
          </div>

          <div className="stat-grid-card p-5 rounded-xl border border-[#101010]/12 bg-white text-center shadow-2xs opacity-0">
            <span ref={stat2Ref} className="font-sans text-3xl sm:text-4xl font-bold text-[#D5360C]">
              4x
            </span>
            <p className="font-sans text-xs text-[#524D46] mt-1 font-medium">Faster Daily Focus</p>
          </div>

          <div className="stat-grid-card p-5 rounded-xl border border-[#101010]/12 bg-white text-center shadow-2xs opacity-0">
            <span ref={stat3Ref} className="font-sans text-3xl sm:text-4xl font-bold text-[#101010]">
              100%
            </span>
            <p className="font-sans text-xs text-[#524D46] mt-1 font-medium">Distraction Free</p>
          </div>

          <div className="stat-grid-card p-5 rounded-xl border border-[#101010]/12 bg-white text-center shadow-2xs opacity-0">
            <span ref={stat4Ref} className="font-sans text-3xl sm:text-4xl font-bold text-[#D5360C]">
              &lt;50ms
            </span>
            <p className="font-sans text-xs text-[#524D46] mt-1 font-medium">Search Response</p>
          </div>
        </div>
      </div>
    </section>
  );
}

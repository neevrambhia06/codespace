"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  FolderGit2,
  FileText,
  Sparkles,
  Layers,
  Check,
} from "lucide-react";
import {
  animate,
  createTimeline,
  createDraggable,
  createSpring,
  createScope,
  onScroll,
  stagger,
} from "animejs";
import { createDrawable } from "animejs/svg";
import { prefersReducedMotion } from "@/lib/motion";
import { usePageTransition } from "@/components/providers/PageTransitionProvider";

interface SampleTask {
  id: string;
  title: string;
  completed: boolean;
  priority: "High" | "Normal";
}

interface SampleProject {
  id: string;
  name: string;
  category: string;
  progress: number;
}

export function EditorialHero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const starburstRef = useRef<HTMLDivElement>(null);
  const { navigateWithTransition } = usePageTransition();

  // Interactive Hero Preview State
  const [activeTab, setActiveTab] = useState<"tasks" | "projects" | "notes">("tasks");
  const [tasks, setTasks] = useState<SampleTask[]>([
    { id: "1", title: "Refine typography & colour tokens", completed: true, priority: "High" },
    { id: "2", title: "Test interactive component library", completed: false, priority: "High" },
    { id: "3", title: "Review milestone roadmap", completed: false, priority: "Normal" },
    { id: "4", title: "Export documentation summary", completed: false, priority: "Normal" },
  ]);
  const [selectedProjectId, setSelectedProjectId] = useState("p1");

  const sampleProjects: SampleProject[] = [
    { id: "p1", name: "Design System & Tokens", category: "Core", progress: 85 },
    { id: "p2", name: "Client Billing Portal", category: "Finance", progress: 92 },
    { id: "p3", name: "Team Knowledge Base", category: "Docs", progress: 64 },
  ];

  // Toggle sample task completion
  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

    const el = document.getElementById(`hero-task-${id}`);
    if (el && !prefersReducedMotion()) {
      animate(el, {
        scale: [0.97, 1],
        duration: 250,
        ease: "outExpo",
      });
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  // ── Anime.js v4 Scope & Animations Lifecycle ──────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) return;

    const scope = createScope({
      mediaQueries: { mobile: "(max-width: 768px)" },
      root: containerRef.current || undefined,
    });

    scope.add(() => {
      // 1. Entrance timeline
      const tl = createTimeline({
        defaults: { ease: "outExpo" },
      });

      if (headlineRef.current) {
        tl.add(headlineRef.current, {
          opacity: [0, 1],
          translateY: [40, 0],
          duration: 900,
        });
      }

      if (ctaGroupRef.current) {
        tl.add(
          ctaGroupRef.current,
          {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 700,
          },
          "-=500"
        );
      }

      if (previewRef.current) {
        tl.add(
          previewRef.current,
          {
            opacity: [0, 1],
            translateY: [35, 0],
            scale: [0.97, 1],
            duration: 850,
          },
          "-=600"
        );
      }

      // 2. Continuous Circular Seal Rotation
      if (starburstRef.current) {
        animate(starburstRef.current, {
          rotate: [0, 360],
          duration: 32000,
          loop: true,
          ease: "linear",
        });
      }

      // 3. Scroll-Synced SVG Line Drawing
      try {
        const heroDrawPaths = containerRef.current?.querySelectorAll<SVGGeometryElement>(".hero-draw-path");
        if (heroDrawPaths && heroDrawPaths.length > 0) {
          animate(createDrawable(heroDrawPaths), {
            draw: ["0 0", "0 1"],
            delay: stagger(40),
            ease: "inOut(3)",
            autoplay: onScroll({ sync: true }),
          });
        }
      } catch (err) {
        console.warn("Hero draw path error:", err);
      }
    });

    return () => {
      scope.revert();
    };
  }, []);

  // ── Tactile Spring Draggable Cards with createDraggable + createSpring ─────
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) return;

    let draggables: any[] = [];
    const timer = setTimeout(() => {
      try {
        const cards = document.querySelectorAll<HTMLElement>(".interactive-card");
        cards.forEach((card) => {
          const d = createDraggable(card, {
            releaseEase: createSpring({ stiffness: 120, damping: 6 }),
          });
          draggables.push(d);
        });
      } catch (err) {
        console.warn("Draggable init:", err);
      }
    }, 60);

    return () => {
      clearTimeout(timer);
      draggables.forEach((d) => d?.revert?.());
    };
  }, [activeTab]);

  return (
    <section
      ref={containerRef}
      id="overview"
      className="relative min-h-[92vh] lg:min-h-screen bg-[#D5360C] text-[#E6D5BD] pt-28 pb-16 px-6 sm:px-10 flex flex-col justify-between overflow-hidden bg-grain-orange"
    >
      {/* ── Background Editorial Rotating Circular Seal ─────────────────── */}
      <div
        ref={starburstRef}
        className="absolute top-20 right-8 sm:top-24 sm:right-16 text-[#101010] select-none pointer-events-none opacity-85 drop-shadow-sm z-0"
        aria-hidden="true"
      >
        <svg
          width="110"
          height="110"
          viewBox="0 0 100 100"
          className="w-16 h-16 sm:w-22 sm:h-22"
        >
          {/* Outer circular seal */}
          <circle cx="50" cy="50" r="46" fill="#101010" />
          {/* Subtle dashed inner orbit ring */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#E6D5BD"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          {/* Centered geometric starburst accent */}
          <path
            d="M50 20 L53 38 L68 32 L58 46 L72 50 L58 54 L68 68 L53 62 L50 80 L47 62 L32 68 L42 54 L28 50 L42 46 L32 32 L47 38 Z"
            fill="#E6D5BD"
          />
          {/* Core dot in Burnt Orange */}
          <circle cx="50" cy="50" r="6" fill="#D5360C" />
        </svg>
      </div>

      {/* ── Center Stage: Hero Headline & CTA ──────────────────────────────── */}
      <div className="my-auto pt-4 pb-8 lg:py-12 z-10 max-w-5xl mx-auto w-full text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E6D5BD]/30 font-mono text-[10px] tracking-[0.22em] uppercase text-[#E6D5BD] mb-5 backdrop-blur-xs">
          <Sparkles className="w-3 h-3 text-[#101010]" />
          <span>FOCUSED WORKSPACE</span>
        </div>

        <h1
          ref={headlineRef}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-tight text-[#E6D5BD] leading-[1.03] text-balance opacity-0"
        >
          YOUR SOVEREIGN, <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#101010]">FOCUSED</span> WORKSPACE.
        </h1>

        <p className="mt-5 text-base sm:text-lg text-[#E6D5BD]/95 max-w-xl leading-relaxed font-sans font-normal">
          Unify project initiatives, deliverables checklists, and knowledge notes in one distraction-free editorial interface.
        </p>

        {/* ── CTA Row ──────────────────────────────────────────────────────── */}
        <div
          ref={ctaGroupRef}
          className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 opacity-0"
        >
          <button
            onClick={() => navigateWithTransition("/dashboard")}
            className="group inline-flex items-center gap-3 bg-[#E6D5BD] text-[#101010] pl-6 pr-3 py-3 rounded-full font-sans text-xs tracking-wider font-bold uppercase transition-all duration-300 hover:bg-[#101010] hover:text-[#E6D5BD] shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>EXPLORE WORKSPACE</span>
            <div className="w-8 h-8 rounded-full border border-[#101010] group-hover:border-[#E6D5BD] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 bg-white/20">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          <Link
            href="/login"
            className="font-sans text-xs tracking-wider font-semibold uppercase text-[#E6D5BD] hover:text-[#101010] transition-colors py-2.5 px-4 rounded-full border border-[#E6D5BD]/30 hover:border-[#101010] hover:bg-black/10"
          >
            SIGN IN →
          </Link>

          <span className="hidden lg:inline font-mono text-[11px] text-[#E6D5BD]/75">
            ✦ Real-time cloud sync
          </span>
        </div>
      </div>

      {/* ── Live Clickable Hero Mini-Workspace Preview with Draggable Cards ── */}
      <div
        ref={previewRef}
        className="mt-4 mb-4 z-10 max-w-5xl mx-auto w-full opacity-0"
      >
        <div className="relative rounded-xl border border-[#101010]/20 bg-white text-[#101010] p-4 sm:p-5 shadow-2xl overflow-hidden">
          {/* Editorial corner frame SVG drawn on scroll */}
          <svg
            className="absolute top-2 left-2 w-8 h-8 pointer-events-none text-[#101010]"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path d="M 32 2 L 2 2 L 2 32" stroke="#101010" strokeWidth="2" className="hero-draw-path" />
          </svg>
          <svg
            className="absolute bottom-2 right-2 w-8 h-8 pointer-events-none text-[#101010]"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path d="M 0 30 L 30 30 L 30 0" stroke="#101010" strokeWidth="2" className="hero-draw-path" />
          </svg>

          {/* Card Top bar with Interactive Tabs & Tactile Physics Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#101010]/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 mr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D5360C]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#101010]/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#101010]/20" />
              </div>
              <span className="font-sans text-xs font-bold text-[#101010] uppercase tracking-wider hidden sm:inline">
                LIVE WORKSPACE DEMO
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#EDE4D5] text-[#101010] font-mono text-[10px] font-semibold">
                ✦ Interactive Cards
              </span>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-1.5 bg-[#EDE4D5] p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveTab("tasks")}
                className={`px-3 py-1 rounded-md text-xs font-sans font-semibold transition-all cursor-pointer ${
                  activeTab === "tasks"
                    ? "bg-[#D5360C] text-white shadow-2xs"
                    : "text-[#101010] hover:bg-[#FAF4EA]"
                }`}
              >
                Checklist ({completedCount}/{tasks.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("projects")}
                className={`px-3 py-1 rounded-md text-xs font-sans font-semibold transition-all cursor-pointer ${
                  activeTab === "projects"
                    ? "bg-[#D5360C] text-white shadow-2xs"
                    : "text-[#101010] hover:bg-[#FAF4EA]"
                }`}
              >
                Projects ({sampleProjects.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("notes")}
                className={`px-3 py-1 rounded-md text-xs font-sans font-semibold transition-all cursor-pointer ${
                  activeTab === "notes"
                    ? "bg-[#D5360C] text-white shadow-2xs"
                    : "text-[#101010] hover:bg-[#FAF4EA]"
                }`}
              >
                Notes
              </button>
            </div>
          </div>

          {/* Interactive Tab Content: tactile draggable cards */}
          <div className="pt-3.5 min-h-[140px]">
            {/* 1. Checklist Tab */}
            {activeTab === "tasks" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {tasks.map((task) => (
                  <div
                    id={`hero-task-${task.id}`}
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`interactive-card flex items-center justify-between p-3 rounded-lg border transition-all cursor-grab active:cursor-grabbing select-none shadow-xs ${
                      task.completed
                        ? "border-[#101010]/10 bg-[#EDE4D5]/35 text-[#524D46]"
                        : "border-[#101010]/15 bg-white hover:border-[#D5360C]/60 hover:shadow-sm text-[#101010]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pointer-events-auto">
                      <button
                        type="button"
                        aria-label={task.completed ? "Mark pending" : "Mark done"}
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                          task.completed
                            ? "bg-[#D5360C] text-white"
                            : "border border-[#101010]/30 hover:border-[#D5360C]"
                        }`}
                      >
                        {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                      <span
                        className={`text-xs font-sans truncate ${
                          task.completed ? "line-through text-[#524D46]/70" : "font-medium"
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md shrink-0 font-bold ${
                        task.priority === "High"
                          ? "bg-[#D5360C]/10 text-[#D5360C]"
                          : "bg-[#EDE4D5] text-[#524D46]"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 2. Projects Tab */}
            {activeTab === "projects" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {sampleProjects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProjectId(proj.id)}
                    className={`interactive-card p-3 rounded-lg border transition-all cursor-grab active:cursor-grabbing select-none shadow-xs ${
                      selectedProjectId === proj.id
                        ? "border-[#D5360C] bg-[#EDE4D5]/35 shadow-xs"
                        : "border-[#101010]/12 bg-white hover:border-[#101010]/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-sans text-xs font-semibold text-[#101010] truncate">
                        {proj.name}
                      </span>
                      <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded-md bg-[#EDE4D5] text-[#524D46]">
                        {proj.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 bg-[#EDE4D5] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#D5360C] h-full rounded-full transition-all duration-500"
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-[#101010]">
                        {proj.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. Notes Tab */}
            {activeTab === "notes" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="interactive-card p-3 rounded-lg border border-[#101010]/12 bg-[#EDE4D5]/35 cursor-grab active:cursor-grabbing select-none shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-3.5 h-3.5 text-[#D5360C]" />
                    <span className="font-sans text-xs font-bold text-[#101010]">
                      Architecture Decisions
                    </span>
                  </div>
                  <p className="text-xs text-[#524D46] line-clamp-2">
                    Clean 3-colour system with high visual contrast and calm layout rhythm.
                  </p>
                </div>
                <div className="interactive-card p-3 rounded-lg border border-[#101010]/12 bg-[#EDE4D5]/35 cursor-grab active:cursor-grabbing select-none shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-3.5 h-3.5 text-[#D5360C]" />
                    <span className="font-sans text-xs font-bold text-[#101010]">
                      Release Milestones
                    </span>
                  </div>
                  <p className="text-xs text-[#524D46] line-clamp-2">
                    Zero latency offline persistence with automatic cloud backup.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#101010]/10 flex items-center justify-between text-[11px] font-sans text-[#524D46]">
            <span>Click or drag any card to test live interactions</span>
            <button
              onClick={() => navigateWithTransition("/dashboard")}
              className="font-semibold text-[#D5360C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Open Full Workspace →
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom Editorial Scroller Indicator with Drawn Line ───────────── */}
      <div className="flex items-center justify-between border-t border-[#E6D5BD]/20 pt-4 z-10 font-mono text-xs tracking-wider max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <span className="text-[#101010] font-bold">01 // 05</span>
          <div className="w-20 sm:w-32 h-[1.5px] bg-[#E6D5BD]/30 overflow-hidden">
            <div className="w-1/4 h-full bg-[#101010]" />
          </div>
          <span className="text-[#E6D5BD]/80 hidden sm:inline">DISCOVERY</span>
        </div>

        <div className="text-[#E6D5BD]/90 flex items-center gap-1">
          <span>Scroll to explore</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}

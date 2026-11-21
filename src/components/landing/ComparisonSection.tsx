"use client";

import { useEffect, useRef, useState } from "react";
import { X, Check, AlertCircle, Sparkles, Move } from "lucide-react";
import {
  animate,
  createTimeline,
  createDraggable,
  createSpring,
  createScope,
  onScroll,
  stagger,
} from "animejs";
import { createDrawable, morphTo } from "animejs/svg";
import { prefersReducedMotion } from "@/lib/motion";

export function ComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"flow" | "friction">("flow");

  // ── Anime.js v4 Scope & Scroll Drawing Lifecycle ─────────────────────────
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) return;

    const scope = createScope({
      mediaQueries: { mobile: "(max-width: 768px)" },
      root: sectionRef.current || undefined,
    });

    scope.add(() => {
      // 1. Reveal header elements
      const el = sectionRef.current;
      if (el) {
        animate(el.querySelectorAll(".reveal-item"), {
          opacity: [0, 1],
          translateY: [25, 0],
          duration: 700,
          delay: stagger(90),
          ease: "outExpo",
        });
      }

      // 2. Scroll-synced SVG Line Drawing (2px Soft Black)
      try {
        const compPaths = sectionRef.current?.querySelectorAll<SVGGeometryElement>(".comparison-draw-path");
        if (compPaths && compPaths.length > 0) {
          animate(createDrawable(compPaths), {
            draw: ["0 0", "0 1"],
            delay: stagger(40),
            ease: "inOut(3)",
            autoplay: onScroll({ target: sectionRef.current || undefined, sync: true }),
          });
        }
      } catch (err) {
        console.warn("Comparison draw error:", err);
      }
    });

    return () => {
      scope.revert();
    };
  }, []);

  // ── Tactile Draggable Cards with createDraggable + createSpring ───────────
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) return;

    let draggables: any[] = [];
    const timer = setTimeout(() => {
      try {
        const chips = sectionRef.current?.querySelectorAll<HTMLElement>(".comparison-chip");
        chips?.forEach((chip) => {
          const d = createDraggable(chip, {
            releaseEase: createSpring({ stiffness: 120, damping: 6 }),
          });
          draggables.push(d);
        });
      } catch (err) {
        console.warn("Comparison draggable init:", err);
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      draggables.forEach((d) => d?.revert?.());
    };
  }, [mode]);

  // Mode switcher with card pop & shape morphing
  const switchMode = (newMode: "flow" | "friction") => {
    setMode(newMode);
    if (!prefersReducedMotion()) {
      if (cardRef.current) {
        animate(cardRef.current, {
          opacity: [0.7, 1],
          scale: [0.985, 1],
          duration: 350,
          ease: "outExpo",
        });
      }

      try {
        const targetId = newMode === "flow" ? "#compare-target-star" : "#compare-target-burst";
        animate("#compare-morph-shape", {
          d: morphTo(targetId),
          duration: 500,
          ease: "inOutQuad",
        });
      } catch (err) {
        console.warn("Comparison morph error:", err);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="comparison"
      className="relative py-20 sm:py-28 px-6 sm:px-10 bg-[#E6D5BD] text-[#101010] border-b border-[#101010]/15 bg-grain overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section Header with Scroll-Synced Vector Frame ───────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#101010]/15 pb-6 mb-12 gap-4">
          <div className="reveal-item opacity-0 flex items-start gap-3.5">
            {/* Morphing comparison badge */}
            <div className="w-10 h-10 rounded-lg bg-white border border-[#101010]/15 flex items-center justify-center shrink-0 shadow-2xs">
              <svg width="24" height="24" viewBox="0 0 100 100" fill="none" className="text-[#D5360C]">
                <path
                  id="compare-morph-shape"
                  d="M50 0 L58 35 L93 20 L72 50 L100 50 L72 65 L93 90 L58 75 L50 100 L42 75 L7 90 L28 65 L0 50 L28 50 L7 20 L42 35 Z"
                  fill="currentColor"
                />
                <path
                  id="compare-target-star"
                  d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z"
                  style={{ display: "none" }}
                />
                <path
                  id="compare-target-burst"
                  d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z"
                  style={{ display: "none" }}
                />
              </svg>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-[#D5360C] mb-1 font-semibold">
                <span>02 // THE WORKSPACE ADVANTAGE</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#101010]">
                FROM CHAOS TO CALM.
              </h2>
            </div>
          </div>

          <div className="reveal-item opacity-0 md:text-right">
            <span className="font-mono text-[10px] tracking-widest text-[#524D46] uppercase block mb-1">
              WORKFLOW COMPARISON
            </span>
            <p className="font-sans text-xs sm:text-sm text-[#524D46] max-w-sm">
              One unified workspace eliminates cognitive drag and tool fatigue.
            </p>
          </div>
        </div>

        {/* ── Interactive Mode Switcher Pills ────────────────────────────── */}
        <div className="flex items-center justify-center mb-8 reveal-item opacity-0">
          <div className="inline-flex items-center p-1 rounded-xl bg-[#EDE4D5] border border-[#101010]/12 shadow-xs">
            <button
              type="button"
              onClick={() => switchMode("flow")}
              className={`px-4 py-2 rounded-lg font-sans text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                mode === "flow"
                  ? "bg-[#D5360C] text-white shadow-xs"
                  : "text-[#524D46] hover:text-[#101010]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Flow (With CodeSpace)</span>
            </button>
            <button
              type="button"
              onClick={() => switchMode("friction")}
              className={`px-4 py-2 rounded-lg font-sans text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                mode === "friction"
                  ? "bg-[#101010] text-white shadow-xs"
                  : "text-[#524D46] hover:text-[#101010]"
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5 text-[#B32608]" />
              <span>The Friction (Without)</span>
            </button>
          </div>
        </div>

        {/* ── Dynamic Comparison Bento Container with Draggable Cards ────── */}
        <div
          ref={cardRef}
          className="relative rounded-2xl border border-[#101010]/15 bg-white p-6 sm:p-10 shadow-lg reveal-item opacity-0 overflow-hidden"
        >
          {/* Scroll-synced SVG border bracket */}
          <svg
            className="absolute top-2 left-2 w-8 h-8 pointer-events-none text-[#101010]"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path d="M 32 2 L 2 2 L 2 32" stroke="#101010" strokeWidth="2" className="comparison-draw-path" />
          </svg>
          <svg
            className="absolute bottom-2 right-2 w-8 h-8 pointer-events-none text-[#101010]"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path d="M 0 30 L 30 30 L 30 0" stroke="#101010" strokeWidth="2" className="comparison-draw-path" />
          </svg>

          {mode === "flow" ? (
            /* ── Flow State View ─────────────────────────────────────────── */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#D5360C]/10 text-[#D5360C] font-mono text-[11px] font-bold">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>CALM MOMENTUM</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#101010]">
                  Unify milestones, tasks, and notes in one surface.
                </h3>
                <ul className="space-y-3 pt-2 text-xs sm:text-sm font-sans text-[#101010]">
                  {[
                    "One home for all active projects and initiatives",
                    "Real-time task tracking with instant completion",
                    "Warm editorial contrast reduces daily eye strain",
                    "Fast keyboard search across all notes and templates",
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#D5360C] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-xl border border-[#101010]/10 bg-[#F7F4EF] p-5 shadow-inner">
                  <div className="flex items-center justify-between pb-3 border-b border-[#101010]/10 text-xs font-sans font-semibold text-[#101010]">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2A6E3B]" />
                      <span>Synchronized Flow State</span>
                    </span>
                    <span className="font-mono text-[10px] text-[#524D46]">ACTIVE STATE</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    <div className="comparison-chip p-3.5 rounded-lg bg-white border border-[#101010]/10 shadow-2xs cursor-grab active:cursor-grabbing select-none">
                      <span className="text-[11px] font-sans text-[#524D46]">Active Project</span>
                      <h4 className="font-sans font-bold text-sm text-[#101010] mt-0.5">
                        Brand Identity & UI
                      </h4>
                      <div className="mt-2.5 flex items-center gap-2">
                        <div className="flex-1 bg-[#EDE4D5] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#D5360C] h-full w-4/5 rounded-full" />
                        </div>
                        <span className="font-mono text-[10px] font-bold text-[#101010]">80%</span>
                      </div>
                    </div>

                    <div className="comparison-chip p-3.5 rounded-lg bg-white border border-[#101010]/10 shadow-2xs cursor-grab active:cursor-grabbing select-none">
                      <span className="text-[11px] font-sans text-[#524D46]">Deliverable Status</span>
                      <h4 className="font-sans font-bold text-sm text-[#101010] mt-0.5">
                        4/4 Tasks Completed
                      </h4>
                      <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#2A6E3B] font-semibold">
                        <Check className="w-3.5 h-3.5" />
                        <span>Ready to launch</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ── Friction State View ─────────────────────────────────────── */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#B32608]/10 text-[#B32608] font-mono text-[11px] font-bold">
                  <AlertCircle className="w-3 h-3 stroke-[2.5]" />
                  <span>HIGH COGNITIVE DRAG</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#101010]">
                  Scattered tabs and forgotten notes kill focus.
                </h3>
                <ul className="space-y-3 pt-2 text-xs sm:text-sm font-sans text-[#524D46]">
                  {[
                    "Dozens of open browser tabs across disconnected apps",
                    "Lost scratchpad files and unorganized checklists",
                    "Dark neon UI that causes severe visual fatigue",
                    "Constant context switching drains daily creative momentum",
                  ].map((flaw, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#101010]/10 text-[#B32608] flex items-center justify-center shrink-0">
                        <X className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{flaw}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-xl border border-[#B32608]/20 bg-[#FAF4EA] p-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#101010]/10 text-xs font-sans font-semibold text-[#B32608]">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#B32608] animate-pulse" />
                      <span>Fragmented Tool Sprawl</span>
                    </span>
                    <span className="font-mono text-[10px] text-[#B32608]">HIGH OVERHEAD</span>
                  </div>

                  <div className="space-y-2 mt-4 text-xs font-sans">
                    <div className="comparison-chip p-3 rounded-lg border border-dashed border-[#B32608]/30 bg-white text-[#524D46] flex items-center justify-between cursor-grab active:cursor-grabbing select-none shadow-2xs">
                      <span>14 disconnected browser tabs open</span>
                      <span className="font-mono text-[10px] text-[#B32608]">CONFUSED</span>
                    </div>
                    <div className="comparison-chip p-3 rounded-lg border border-dashed border-[#B32608]/30 bg-white text-[#524D46] flex items-center justify-between cursor-grab active:cursor-grabbing select-none shadow-2xs">
                      <span>Untracked tasks across 3 different checklists</span>
                      <span className="font-mono text-[10px] text-[#B32608]">DELAYED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { animate, observeAndAnimate, stagger, prefersReducedMotion } from "@/lib/motion";

const FAQS = [
  {
    q: "How do team roles and workspace permissions work?",
    a: "Team Leads have full creation and priority rights; Members check off tasks and create notes; Guests have clean read-only visibility.",
  },
  {
    q: "Can I access CodeSpace seamlessly on mobile and tablet?",
    a: "Yes. The entire editorial layout, top navigation, checklists, and notes adapt fluidly to any screen size with touch-first ergonomics.",
  },
  {
    q: "How is my workspace data backed up and secured?",
    a: "All project data is backed up to dedicated cloud storage with encrypted session credentials and zero third-party telemetry.",
  },
  {
    q: "Can I search across all my projects, tasks, and notes?",
    a: "Yes. Press ⌘K or tap the search bar to instantly query your entire directory and jump to any item in milliseconds.",
  },
  {
    q: "What makes CodeSpace different from typical productivity tools?",
    a: "No distracting popups, bloated sidebars, or dark neon fatigue. Just warm, tactile editorial clarity designed for deep work.",
  },
];

export function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    return observeAndAnimate(sectionRef.current, () => {
      const el = sectionRef.current;
      if (el) {
        animate(el.querySelectorAll(".reveal-item"), {
          opacity: [0, 1],
          translateY: [25, 0],
          duration: 700,
          delay: stagger(80),
          ease: "outExpo",
        });
      }
    });
  }, []);

  const toggle = (idx: number) => {
    const next = openIndex === idx ? null : idx;
    setOpenIndex(next);

    if (next !== null && !prefersReducedMotion()) {
      const contentEl = document.getElementById(`faq-content-${next}`);
      if (contentEl) {
        animate(contentEl, {
          opacity: [0, 1],
          translateY: [-6, 0],
          duration: 300,
          ease: "outExpo",
        });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-20 sm:py-28 px-6 sm:px-10 bg-[#E6D5BD] text-[#101010] border-b border-[#101010]/15 bg-grain"
    >
      <div className="max-w-4xl mx-auto">
        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#101010]/15 pb-6 mb-12 gap-4">
          <div className="reveal-item opacity-0">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-[#D5360C] mb-2 font-semibold">
              <span>06 // QUESTIONS & ANSWERS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#101010]">
              FREQUENT QUESTIONS.
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#524D46] max-w-sm reveal-item opacity-0">
            Everything you need to know about getting started and daily workflows.
          </p>
        </div>

        {/* ── Accordion List ──────────────────────────────────────────────── */}
        <div className="space-y-3">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-[#101010]/12 bg-white transition-all overflow-hidden reveal-item opacity-0 shadow-2xs hover:border-[#101010]/25"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-sm sm:text-base font-bold text-[#101010]">
                    {item.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#D5360C] text-white"
                        : "bg-[#EDE4D5] text-[#101010]"
                    }`}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5 stroke-[2.5]" /> : <Plus className="w-3.5 h-3.5 stroke-[2.5]" />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-content-${idx}`}
                    className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#524D46] font-normal leading-relaxed border-t border-[#101010]/8 pt-3"
                  >
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

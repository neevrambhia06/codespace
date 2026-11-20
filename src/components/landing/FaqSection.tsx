"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "How do team roles and workspace permissions work?",
    a: "CodeSpace offers intuitive member roles: Guests can view projects and milestones without making changes; Members can check off deliverables and add documentation notes; and Team Leads can create new projects, assign priorities, and manage workspace preferences.",
  },
  {
    q: "Can I access CodeSpace on mobile and tablet devices?",
    a: "Yes. The entire editorial interface—including top navigation, drawer menus, project boards, and notes—is fully responsive and designed for easy reading across laptops, tablets, and phones.",
  },
  {
    q: "How is my workspace data backed up and protected?",
    a: "Your data is protected with secure, encrypted session credentials and saved to dedicated cloud databases with continuous backups and zero third-party tracking.",
  },
  {
    q: "Can I organize and search across all my notes and snippets?",
    a: "Yes. Pressing ⌘K (or Ctrl+K) opens a quick-search palette allowing you to jump to any project, task, or documentation memo in seconds without taking your hands off the keyboard.",
  },
  {
    q: "What makes CodeSpace different from typical productivity tools?",
    a: "CodeSpace deliberately avoids cluttered sidebars, unneeded banners, and flashing notification badges. It provides a tactile, warm editorial environment inspired by print design so you can focus on meaningful work without visual fatigue.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 px-6 sm:px-10 bg-[#E6D5BD] text-[#101010] border-b border-[#101010]/15 bg-grain">
      <div className="max-w-4xl mx-auto">
        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#101010]/20 pb-8 mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-[#D5360C] mb-3">
              <span>06 // QUESTIONS & ANSWERS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-balance">
              FREQUENTLY ASKED QUESTIONS.
            </h2>
          </div>
          <p className="font-mono text-xs tracking-wider text-[#101010]/70 max-w-md uppercase leading-relaxed">
            Helpful answers about workspace organization, team collaboration, and daily productivity.
          </p>
        </div>

        {/* ── Accordion List ──────────────────────────────────────────────── */}
        <div className="space-y-4">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xs border border-[#101010]/20 bg-[#EFE3D1] transition-all duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 outline-none focus-visible:bg-[#101010]/5"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg sm:text-xl font-bold text-[#101010]">
                    {item.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full border border-[#101010]/30 flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? "bg-[#D5360C] text-[#E6D5BD] border-[#D5360C]" : "text-[#101010]"
                    }`}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm text-[#101010]/80 font-light leading-relaxed border-t border-[#101010]/10 pt-4 animate-in fade-in-0 duration-300">
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

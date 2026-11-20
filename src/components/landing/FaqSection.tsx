"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "How does the Role-Based Access Control (RBAC) work?",
    a: "CodeSpace implements a 3-tier permission ladder: GUEST, MEMBER, and ADMIN. Authentication is verified at the edge proxy, while authorization is enforced at the Server Action layer. Guests have read-only access to browse projects; Members can toggle and create tasks; only Admins can create projects and trigger email dispatches.",
  },
  {
    q: "Can I connect my own PostgreSQL instance (Neon, Supabase, AWS RDS)?",
    a: "Yes. CodeSpace uses standard Prisma ORM mapped to PostgreSQL. Simply set the DATABASE_URL environment variable in your Vercel deployment or local .env file and run `npx prisma db push` to synchronize all tables in seconds.",
  },
  {
    q: "How are sessions and credentials handled?",
    a: "Sessions are managed via Better Auth using secure HttpOnly, SameSite cookies. User passwords are encrypted with industry-standard scrypt hashing in the Account table, completely isolating credentials from client-side JavaScript.",
  },
  {
    q: "Does CodeSpace work on mobile and tablet devices?",
    a: "Yes. The entire editorial interface—including the navbar, responsive drawers, project lists, and taskboards—is built mobile-first and tested across all viewport dimensions with 100/100 accessibility standards.",
  },
  {
    q: "How is the warm editorial theme enforced?",
    a: "The application strictly adheres to a 3-color palette: Burnt Orange (#D5360C), Warm Ivory (#E6D5BD), and Soft Black (#101010). All surfaces, cards, and text hierarchy derive from these tokens, preventing dark neon noise and maintaining consistent typographic calm.",
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
              <span>06 // CLARIFICATIONS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-balance">
              QUESTIONS & ARCHITECTURE.
            </h2>
          </div>
          <p className="font-mono text-xs tracking-wider text-[#101010]/70 uppercase leading-relaxed">
            Everything you need to know about the stack, security, and developer ergonomics.
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

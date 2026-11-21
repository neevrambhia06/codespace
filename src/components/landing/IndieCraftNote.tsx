"use client";

import { useEffect, useRef } from "react";
import { Quote, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { animate, observeAndAnimate, stagger } from "@/lib/motion";

export function IndieCraftNote() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    return observeAndAnimate(sectionRef.current, () => {
      const el = sectionRef.current;
      if (el) {
        animate(el.querySelectorAll(".reveal-item"), {
          opacity: [0, 1],
          translateY: [25, 0],
          duration: 700,
          delay: stagger(100),
          ease: "outExpo",
        });
      }
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="craft"
      className="py-20 sm:py-28 px-6 sm:px-10 bg-[#E6D5BD] text-[#101010] border-b border-[#101010]/15 bg-grain"
    >
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl border-2 border-[#101010] p-6 sm:p-12 bg-white relative shadow-md reveal-item opacity-0">
          {/* Top accent badge */}
          <div className="absolute -top-3.5 left-8 bg-[#D5360C] text-white font-mono text-[10px] tracking-[0.25em] font-bold uppercase px-3 py-1 rounded-md shadow-xs">
            05 // THE PHILOSOPHY OF CRAFT
          </div>

          <div className="flex items-center justify-between border-b border-[#101010]/10 pb-5 mb-6">
            <span className="font-mono text-xs tracking-wider uppercase text-[#524D46] font-semibold">
              BUILDER MANIFESTO
            </span>
            <Quote className="w-5 h-5 text-[#D5360C]" />
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight leading-snug mb-4 text-[#101010]">
            &ldquo;Software built for focused thought—not corporate bloat.&rdquo;
          </h2>

          <p className="text-sm sm:text-base text-[#524D46] leading-relaxed font-normal mb-8 max-w-2xl">
            We stripped away endless sidebars and noisy notifications to restore quiet momentum. Natural paper warmth, high-legibility typography, and instant responsiveness.
          </p>

          {/* 3 Core Interactive Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 mb-8">
            <div className="p-3.5 rounded-xl border border-[#101010]/10 bg-[#F7F4EF] hover:border-[#D5360C]/40 transition-colors">
              <Zap className="w-4 h-4 text-[#D5360C] mb-2" />
              <h3 className="font-sans text-xs font-bold text-[#101010]">Zero Clutter</h3>
              <p className="text-[11px] text-[#524D46] mt-0.5">No popups or ads</p>
            </div>

            <div className="p-3.5 rounded-xl border border-[#101010]/10 bg-[#F7F4EF] hover:border-[#D5360C]/40 transition-colors">
              <Sparkles className="w-4 h-4 text-[#D5360C] mb-2" />
              <h3 className="font-sans text-xs font-bold text-[#101010]">Calm Reading</h3>
              <p className="text-[11px] text-[#524D46] mt-0.5">Warm editorial contrast</p>
            </div>

            <div className="p-3.5 rounded-xl border border-[#101010]/10 bg-[#F7F4EF] hover:border-[#D5360C]/40 transition-colors">
              <ShieldCheck className="w-4 h-4 text-[#D5360C] mb-2" />
              <h3 className="font-sans text-xs font-bold text-[#101010]">Total Sovereignty</h3>
              <p className="text-[11px] text-[#524D46] mt-0.5">Always synchronized</p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#101010]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#524D46]">
            <div>
              <span className="font-bold text-[#101010]">CodeSpace Collective</span>
              <span className="block text-[11px]">Crafted for focus & autonomy</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="text-[#D5360C] font-semibold">CALM MOMENTUM</span>
              <span>•</span>
              <span>LIGHTWEIGHT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

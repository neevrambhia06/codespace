"use client";

import { useEffect, useRef } from "react";
import { animate, createDrawable, onScroll, stagger, prefersReducedMotion } from "@/lib/motion";

interface EditorialConnectorProps {
  label?: string;
  fromSection?: string;
  toSection?: string;
  variant?: "straight" | "stepped" | "branch";
}

export function EditorialConnector({
  label = "FLOW CONTINUITY",
  fromSection = "01",
  toSection = "02",
  variant = "stepped",
}: EditorialConnectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) return;

    try {
      const paths = containerRef.current?.querySelectorAll<SVGGeometryElement>(".scroll-draw-path");
      if (paths && paths.length > 0) {
        animate(createDrawable(paths), {
          draw: ["0 0", "0 1"],
          delay: stagger(40),
          ease: "inOut(3)",
          autoplay: onScroll({ target: containerRef.current || undefined, sync: true }),
        });
      }
    } catch (err) {
      console.warn("Scroll draw connector error:", err);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-6 sm:py-8 overflow-hidden select-none bg-[#E6D5BD] border-y border-[#101010]/15"
      aria-hidden="true"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Editorial Stamp */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="w-2.5 h-2.5 bg-[#D5360C] rounded-full animate-pulse" />
          <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#101010] uppercase">
            {fromSection} ─── {toSection} // {label}
          </span>
        </div>

        {/* Center Scroll-Synced Drawing SVG Vector */}
        <div className="w-full max-w-2xl h-16 sm:h-20 flex items-center justify-center">
          <svg
            viewBox="0 0 600 60"
            className="w-full h-full text-[#101010]"
            fill="none"
            preserveAspectRatio="none"
          >
            {variant === "stepped" ? (
              <>
                {/* Horizontal lead line */}
                <path
                  d="M 10 30 L 180 30"
                  stroke="#101010"
                  strokeWidth="2"
                  className="scroll-draw-path"
                />
                {/* Stepped rise */}
                <path
                  d="M 180 30 L 220 12 L 380 12 L 420 48 L 540 48"
                  stroke="#101010"
                  strokeWidth="2"
                  className="scroll-draw-path"
                />
                {/* Forward Arrow head */}
                <path
                  d="M 530 40 L 545 48 L 530 56"
                  stroke="#101010"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="scroll-draw-path"
                />
                {/* Measurement tick marks */}
                <path d="M 220 5 L 220 19" stroke="#101010" strokeWidth="2" className="scroll-draw-path" />
                <path d="M 380 5 L 380 19" stroke="#101010" strokeWidth="2" className="scroll-draw-path" />
                <path d="M 420 41 L 420 55" stroke="#101010" strokeWidth="2" className="scroll-draw-path" />
              </>
            ) : variant === "branch" ? (
              <>
                {/* Divergent split & convergence */}
                <path
                  d="M 10 30 L 150 30 C 220 30 240 10 300 10 L 450 10 C 510 10 530 30 580 30"
                  stroke="#101010"
                  strokeWidth="2"
                  className="scroll-draw-path"
                />
                <path
                  d="M 150 30 C 220 30 240 50 300 50 L 450 50 C 510 50 530 30 580 30"
                  stroke="#101010"
                  strokeWidth="2"
                  className="scroll-draw-path"
                />
                {/* Downward arrow */}
                <path
                  d="M 570 22 L 585 30 L 570 38"
                  stroke="#101010"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="scroll-draw-path"
                />
              </>
            ) : (
              <>
                {/* Straight dynamic ruler line */}
                <path
                  d="M 10 30 L 570 30"
                  stroke="#101010"
                  strokeWidth="2"
                  className="scroll-draw-path"
                />
                <path
                  d="M 555 20 L 575 30 L 555 40"
                  stroke="#101010"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="scroll-draw-path"
                />
                {/* Regular ruler ticks */}
                <path d="M 100 22 L 100 38" stroke="#101010" strokeWidth="2" className="scroll-draw-path" />
                <path d="M 250 22 L 250 38" stroke="#101010" strokeWidth="2" className="scroll-draw-path" />
                <path d="M 400 22 L 400 38" stroke="#101010" strokeWidth="2" className="scroll-draw-path" />
              </>
            )}
          </svg>
        </div>

        {/* Right Indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#524D46] uppercase">
            NEXT SECTION
          </span>
          <span className="text-[#101010] font-mono text-xs">↓</span>
        </div>
      </div>
    </div>
  );
}

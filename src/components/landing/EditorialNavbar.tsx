"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Code2 } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { animate, prefersReducedMotion } from "@/lib/motion";
import { usePageTransition } from "@/components/providers/PageTransitionProvider";

interface NavItem {
  label: string;
  href: string;
}

const NAV_LINKS: NavItem[] = [
  { label: "OVERVIEW", href: "#overview" },
  { label: "SYSTEM", href: "#comparison" },
  { label: "CAPABILITIES", href: "#features" },
  { label: "WORKFLOWS", href: "#use-cases" },
  { label: "PHILOSOPHY", href: "#craft" },
  { label: "FAQ", href: "#faq" },
];

export function EditorialNavbar() {
  const navRef = useRef<HTMLElement>(null);
  const navLinksContainerRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("OVERVIEW");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigateWithTransition } = usePageTransition();

  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
    isReady: boolean;
  }>({ left: 0, width: 0, opacity: 0, isReady: false });

  const updateIndicator = useCallback(() => {
    const container = navLinksContainerRef.current;
    const activeEl = linkRefs.current[activeSection];
    if (!container || !activeEl) return;

    const containerRect = container.getBoundingClientRect();
    const linkRect = activeEl.getBoundingClientRect();

    setIndicatorStyle((prev) => ({
      left: linkRect.left - containerRect.left,
      width: linkRect.width,
      opacity: 1,
      isReady: prev.isReady,
    }));
  }, [activeSection]);

  useEffect(() => {
    updateIndicator();
    const t = setTimeout(() => {
      setIndicatorStyle((prev) => ({ ...prev, isReady: true }));
    }, 50);
    return () => clearTimeout(t);
  }, [activeSection, updateIndicator]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  useEffect(() => {
    if (!prefersReducedMotion() && navRef.current) {
      animate(navRef.current, {
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 700,
        ease: "outExpo",
      });
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = NAV_LINKS.map((link) => {
        const id = link.href.replace("#", "");
        const el = document.getElementById(id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return { label: link.label, top: rect.top };
      }).filter(Boolean) as { label: string; top: number }[];

      const current = sections
        .reverse()
        .find((s) => s.top <= 120);

      if (current) {
        setActiveSection(current.label);
      } else {
        setActiveSection("OVERVIEW");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 opacity-0 ${
          isScrolled
            ? "bg-[#E6D5BD]/95 backdrop-blur-md py-3.5 shadow-xs"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* ── Left: Bold uppercase brand wordmark ─────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group outline-none"
            aria-label={`${APP_NAME} Home`}
          >
            <div
              className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors duration-300 shadow-2xs ${
                isScrolled
                  ? "bg-[#D5360C] text-white"
                  : "bg-[#101010] text-[#E6D5BD]"
              }`}
            >
              <Code2 className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span
              className={`font-sans text-sm tracking-[0.2em] font-bold uppercase transition-colors duration-300 ${
                isScrolled ? "text-[#101010]" : "text-[#E6D5BD]"
              }`}
            >
              {APP_NAME}
            </span>
          </Link>

          {/* ── Centre: Clean, evenly spaced uppercase navigation links with continuous gliding underline ── */}
          <nav
            ref={navLinksContainerRef}
            className="hidden md:flex items-center gap-8 lg:gap-10 relative py-1"
          >
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.label;
              return (
                <a
                  key={item.label}
                  ref={(el) => {
                    linkRefs.current[item.label] = el;
                  }}
                  href={item.href}
                  className={`relative flex flex-col items-center py-1 font-sans text-xs tracking-wider uppercase transition-colors duration-200 outline-none ${
                    isScrolled
                      ? isActive
                        ? "text-[#101010] font-bold"
                        : "text-[#101010]/60 hover:text-[#101010]"
                      : isActive
                      ? "text-[#E6D5BD] font-bold"
                      : "text-[#E6D5BD]/75 hover:text-[#E6D5BD]"
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}

            {/* ── Continuous Moving Underline Indicator ── */}
            <span
              aria-hidden="true"
              className={`absolute -bottom-1 left-0 h-[2.5px] rounded-full pointer-events-none ${
                isScrolled ? "bg-[#D5360C]" : "bg-[#E6D5BD]"
              }`}
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
                transition: indicatorStyle.isReady
                  ? "transform 350ms cubic-bezier(0.22, 1, 0.36, 1), width 350ms cubic-bezier(0.22, 1, 0.36, 1), background-color 300ms ease, opacity 200ms ease"
                  : "opacity 200ms ease",
              }}
            />
          </nav>

          {/* ── Right: Minimal action trigger & mobile drawer button ──────── */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateWithTransition("/dashboard")}
              className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 font-sans text-xs tracking-wider uppercase font-bold rounded-lg transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer ${
                isScrolled
                  ? "bg-[#D5360C] text-white hover:bg-[#B82D09] shadow-xs"
                  : "bg-[#E6D5BD] text-[#101010] hover:bg-[#101010] hover:text-[#E6D5BD]"
              }`}
            >
              <span>WORKSPACE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer ${
                isScrolled ? "text-[#101010] hover:bg-black/5" : "text-[#E6D5BD] hover:bg-white/10"
              }`}
              aria-label="Toggle navigation drawer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer Navigation ───────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#E6D5BD] flex flex-col pt-24 px-8 pb-10 justify-between animate-in fade-in-0 duration-200 md:hidden bg-grain">
          <div className="space-y-6">
            <p className="font-mono text-[10px] tracking-[0.25em] text-[#D5360C] uppercase font-bold">
              NAVIGATION
            </p>
            <nav className="flex flex-col space-y-5">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-2xl font-bold text-[#101010] hover:text-[#D5360C] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#101010]/20">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigateWithTransition("/dashboard");
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#D5360C] text-white font-sans text-xs uppercase tracking-wider font-bold rounded-lg shadow-sm cursor-pointer"
            >
              <span>ENTER WORKSPACE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-3 border border-[#101010]/30 text-[#101010] font-sans text-xs uppercase tracking-wider font-semibold rounded-lg"
            >
              SIGN IN
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

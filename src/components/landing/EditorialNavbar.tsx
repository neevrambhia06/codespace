"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Code2 } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("OVERVIEW");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition from transparent to solid after passing the initial hero zone
      setIsScrolled(window.scrollY > 40);

      // Section spy
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#E6D5BD]/95 backdrop-blur-md border-b border-[#101010] py-3.5 shadow-xs"
            : "bg-transparent py-6"
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
              className={`w-6 h-6 rounded-xs flex items-center justify-center transition-colors duration-300 ${
                isScrolled
                  ? "bg-[#D5360C] text-[#E6D5BD]"
                  : "bg-[#101010] text-[#E6D5BD]"
              }`}
            >
              <Code2 className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span
              className={`font-mono text-sm tracking-[0.25em] font-bold uppercase transition-colors duration-300 ${
                isScrolled ? "text-[#101010]" : "text-[#E6D5BD]"
              }`}
            >
              {APP_NAME}
            </span>
          </Link>

          {/* ── Centre: Clean, evenly spaced uppercase navigation links with active dot ── */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.label;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`group relative flex flex-col items-center font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 outline-none ${
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
                  {/* Subtle circular dot indicator directly beneath active link */}
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-1 transition-all duration-300 ${
                      isActive
                        ? isScrolled
                          ? "bg-[#D5360C] scale-100 opacity-100"
                          : "bg-[#E6D5BD] scale-100 opacity-100"
                        : "scale-0 opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </nav>

          {/* ── Right: Minimal action trigger & mobile drawer button ──────── */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 font-mono text-[11px] tracking-[0.18em] uppercase font-bold rounded-xs transition-all duration-200 ${
                isScrolled
                  ? "bg-[#D5360C] text-[#E6D5BD] hover:bg-[#101010] shadow-xs"
                  : "bg-[#E6D5BD] text-[#101010] hover:bg-[#101010] hover:text-[#E6D5BD]"
              }`}
            >
              <span>WORKSPACE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-xs transition-colors md:hidden outline-none ${
                isScrolled
                  ? "text-[#101010] hover:bg-[#101010]/10"
                  : "text-[#E6D5BD] hover:bg-[#E6D5BD]/15"
              }`}
              aria-label="Toggle navigation drawer"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.75]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.75]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Editorial Drawer ────────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#E6D5BD] text-[#101010] pt-24 px-8 pb-10 flex flex-col justify-between md:hidden animate-in fade-in-0 duration-200">
          <div className="flex flex-col gap-6">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#101010]/50 border-b border-[#101010]/20 pb-2">
              INDEX // NAVIGATION
            </p>
            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-2xl font-bold uppercase tracking-tight hover:text-[#D5360C] transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-[#101010]/40">→</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#101010]/20">
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-3.5 bg-[#D5360C] text-[#E6D5BD] font-mono text-xs uppercase tracking-[0.2em] font-bold rounded-xs"
            >
              ENTER WORKSPACE
            </Link>
            <div className="flex items-center justify-between text-xs font-mono text-[#101010]/60 pt-2">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="hover:underline">
                Sign In
              </Link>
              <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="hover:underline">
                Register
              </Link>
              <span>Build 0.1.0</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

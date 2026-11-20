"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Code2,
  Search,
  Bell,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  User,
  CheckCircle2,
} from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { SearchModal } from "@/components/layout/SearchModal";

interface NavRoute {
  label: string;
  href: string;
}

const PRIMARY_ROUTES: NavRoute[] = [
  { label: "DASHBOARD", href: "/dashboard" },
  { label: "PROJECTS", href: "/projects" },
  { label: "TASKS", href: "/tasks" },
  { label: "NOTES", href: "/notes" },
  { label: "SNIPPETS", href: "/snippets" },
  { label: "EXTENSIONS", href: "/extensions" },
];

export function GlobalNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Global Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setIsProfileOpen(false);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out of session");
          router.push("/login");
        },
      },
    });
  };

  const userName = session?.user?.name && !session.user.name.includes("Developer") ? session.user.name : "Alex Morgan";
  const userEmail = session?.user?.email || "alex@codespace.dev";
  const userInitial = (userName[0] || "A").toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#E6D5BD] border-b border-[#101010]">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          {/* ── Left: Wordmark with Burnt Orange mark ───────────────────── */}
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 group outline-none select-none"
              aria-label={`${APP_NAME} Workspace`}
            >
              <div className="w-7 h-7 rounded-xs bg-[#D5360C] text-[#F4EBDD] flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                <Code2 className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-mono text-sm tracking-[0.25em] font-bold uppercase text-[#101010]">
                {APP_NAME}
              </span>
            </Link>
          </div>

          {/* ── Centre: Primary Nav Links with Active Dot Indicator ─────── */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-9">
            {PRIMARY_ROUTES.map((route) => {
              const isActive =
                route.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(route.href);

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`relative py-1 flex flex-col items-center font-mono text-[11px] tracking-[0.2em] uppercase transition-colors outline-none ${
                    isActive
                      ? "text-[#101010] font-bold"
                      : "text-[#101010]/60 hover:text-[#101010]"
                  }`}
                >
                  <span>{route.label}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-[#D5360C]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Right: Compact Utility Cluster ──────────────────────────── */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Minimal Search Trigger (⌘K) */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search Workspace (⌘K)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xs border border-[#101010]/20 bg-[#F4EBDD] text-[#101010] hover:bg-[#FAF4EA] hover:border-[#101010] transition-colors font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C]"
            >
              <Search className="w-3.5 h-3.5 text-[#D5360C]" />
              <kbd className="hidden sm:inline-block font-mono text-[10px] tracking-wider text-[#4A443C]">
                ⌘K
              </kbd>
            </button>

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => setIsNotificationsOpen((prev) => !prev)}
                aria-label="Notifications"
                className="relative flex h-8 w-8 items-center justify-center rounded-xs border border-[#101010]/15 bg-[#F4EBDD] text-[#101010] hover:bg-[#FAF4EA] hover:border-[#101010] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C]"
              >
                <Bell className="w-3.5 h-3.5 text-[#101010]" />
                <span
                  className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#D5360C]"
                  aria-hidden="true"
                />
              </button>

              {/* Notification Popover */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-xs border border-[#101010] bg-[#F4EBDD] shadow-[4px_4px_0px_#101010] p-3 z-50 animate-in fade-in-0 zoom-in-95 duration-100">
                  <div className="flex items-center justify-between pb-2 border-b border-[#101010]/15 font-mono text-[10px] uppercase tracking-wider font-bold text-[#101010]">
                    <span>WORKSPACE ALERTS</span>
                    <span className="text-[#D5360C]">UP TO DATE</span>
                  </div>
                  <div className="py-2.5 space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-[#101010]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D5360C] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-[11px] leading-tight">Workspace Synchronized</p>
                        <p className="text-[10px] text-[#4A443C]">All project changes saved to cloud</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-[#101010]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#101010] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-[11px] leading-tight">Account Protected</p>
                        <p className="text-[10px] text-[#4A443C]">Session is verified and encrypted</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#101010]/10 text-center">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#4A443C]">
                      All notifications caught up
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Compact User Avatar & Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                aria-label="User Profile Menu"
                className="flex items-center justify-center w-8 h-8 rounded-full border border-[#101010] bg-[#101010] text-[#F4EBDD] font-mono text-xs font-bold hover:bg-[#2A2A2A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C]"
              >
                <span>{userInitial}</span>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xs border border-[#101010] bg-[#F4EBDD] shadow-[4px_4px_0px_#101010] py-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-100">
                  {/* User info */}
                  <div className="px-3 py-2 border-b border-[#101010]/15">
                    <p className="font-mono text-xs font-bold text-[#101010] truncate">
                      {userName}
                    </p>
                    <p className="font-mono text-[10px] text-[#4A443C] truncate">
                      {userEmail}
                    </p>
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    <Link
                      href="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#101010] hover:bg-[#FAF4EA] hover:text-[#D5360C] transition-colors font-mono uppercase tracking-wider"
                    >
                      <Settings className="w-3.5 h-3.5 text-[#101010]" />
                      <span>Settings</span>
                    </Link>

                    <Link
                      href="/"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#101010] hover:bg-[#FAF4EA] hover:text-[#D5360C] transition-colors font-mono uppercase tracking-wider"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#101010]" />
                      <span>Back to Landing</span>
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="pt-1 border-t border-[#101010]/15">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#D5360C] hover:bg-[#FAF4EA] hover:text-[#B82D09] transition-colors font-mono uppercase tracking-wider font-bold text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Icon */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-xs border border-[#101010]/20 bg-[#F4EBDD] text-[#101010] hover:bg-[#FAF4EA] transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-[#101010]" />
              ) : (
                <Menu className="w-4 h-4 text-[#101010]" />
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Full-Height Warm Ivory Drawer ─────────────────────── */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#101010] bg-[#E6D5BD] px-6 py-6 space-y-5 animate-in slide-in-from-top-2 duration-200">
            {/* Primary links */}
            <div className="flex flex-col space-y-3">
              {PRIMARY_ROUTES.map((route) => {
                const isActive =
                  route.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(route.href);

                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-2 border-b border-[#101010]/10 font-mono text-xs tracking-[0.2em] uppercase ${
                      isActive
                        ? "text-[#101010] font-bold"
                        : "text-[#101010]/70 hover:text-[#101010]"
                    }`}
                  >
                    <span>{route.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#D5360C]" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile utilities */}
            <div className="pt-2 space-y-2 border-t border-[#101010]/20 font-mono text-xs uppercase tracking-wider">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center justify-between p-2 rounded-xs border border-[#101010]/20 bg-[#F4EBDD] text-[#101010]"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-[#D5360C]" />
                  <span>Search Workspace</span>
                </span>
                <kbd className="text-[10px] text-[#4A443C]">⌘K</kbd>
              </button>

              <Link
                href="/settings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center gap-2 p-2 rounded-xs border border-[#101010]/20 bg-[#F4EBDD] text-[#101010]"
              >
                <Settings className="w-3.5 h-3.5 text-[#101010]" />
                <span>Settings</span>
              </Link>

              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center gap-2 p-2 rounded-xs border border-[#101010]/20 bg-[#F4EBDD] text-[#101010]"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#101010]" />
                <span>Back to Landing</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 p-2 rounded-xs border border-[#D5360C] bg-[#D5360C] text-[#F4EBDD] font-bold"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout ({userName})</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Command / Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

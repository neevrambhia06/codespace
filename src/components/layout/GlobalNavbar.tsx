"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
import { usePageTransition } from "@/components/providers/PageTransitionProvider";

interface NavRoute {
  label: string;
  href: string;
}

const PRIMARY_ROUTES: NavRoute[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Tasks", href: "/tasks" },
  { label: "Notes", href: "/notes" },
  { label: "Snippets", href: "/snippets" },
  { label: "Extensions", href: "/extensions" },
];

export function GlobalNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { navigateWithTransition } = usePageTransition();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLElement>(null);
  const routeRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
    isReady: boolean;
  }>({ left: 0, width: 0, opacity: 0, isReady: false });

  const updateIndicator = useCallback(() => {
    const container = navContainerRef.current;
    if (!container) return;

    const activeRoute = PRIMARY_ROUTES.find((r) =>
      r.href === "/dashboard"
        ? pathname === "/dashboard"
        : pathname.startsWith(r.href)
    );

    if (!activeRoute) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const activeEl = routeRefs.current[activeRoute.href];
    if (!activeEl) return;

    const containerRect = container.getBoundingClientRect();
    const linkRect = activeEl.getBoundingClientRect();

    setIndicatorStyle((prev) => ({
      left: linkRect.left - containerRect.left,
      width: linkRect.width,
      opacity: 1,
      isReady: prev.isReady,
    }));
  }, [pathname]);

  useEffect(() => {
    updateIndicator();
    const t = setTimeout(() => {
      setIndicatorStyle((prev) => ({ ...prev, isReady: true }));
    }, 50);
    return () => clearTimeout(t);
  }, [pathname, updateIndicator]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

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
      <header className="sticky top-0 z-40 w-full bg-[#F7F4EF] border-b border-[#101010]/12 transition-colors">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          {/* ── Left: Wordmark with Burnt Orange mark (takes to landing page with NeoLeaf transition) ── */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateWithTransition("/")}
              className="flex items-center gap-2.5 group outline-none select-none cursor-pointer"
              aria-label={`${APP_NAME} Landing Page`}
            >
              <div className="w-7 h-7 rounded-md bg-[#D5360C] text-white flex items-center justify-center transition-transform group-hover:scale-105 duration-200 shadow-2xs">
                <Code2 className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-sans text-sm tracking-[0.16em] font-bold uppercase text-[#101010]">
                {APP_NAME}
              </span>
            </button>
          </div>

          {/* ── Centre: Primary Nav Links with Continuous Moving Underline ─────── */}
          <nav
            ref={navContainerRef}
            className="hidden md:flex items-center gap-7 lg:gap-8 relative py-1"
          >
            {PRIMARY_ROUTES.map((route) => {
              const isActive =
                route.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(route.href);

              return (
                <Link
                  key={route.href}
                  ref={(el) => {
                    routeRefs.current[route.href] = el;
                  }}
                  href={route.href}
                  className={`relative py-1 flex flex-col items-center font-sans text-xs tracking-normal transition-colors outline-none ${
                    isActive
                      ? "text-[#101010] font-semibold"
                      : "text-[#524D46] hover:text-[#101010] font-medium"
                  }`}
                >
                  <span>{route.label}</span>
                </Link>
              );
            })}

            {/* Continuous Moving Underline */}
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#D5360C] pointer-events-none"
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
                transition: indicatorStyle.isReady
                  ? "transform 350ms cubic-bezier(0.22, 1, 0.36, 1), width 350ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease"
                  : "opacity 200ms ease",
              }}
            />
          </nav>

          {/* ── Right: Compact Utility Cluster ──────────────────────────── */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Bar Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search Workspace"
              className="flex items-center gap-2.5 px-3 py-1.5 w-36 sm:w-52 md:w-64 lg:w-72 rounded-lg border border-[#101010]/12 bg-white text-[#101010] hover:bg-white hover:border-[#101010]/25 transition-all text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C] text-left shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-[#D5360C] shrink-0" />
              <span className="truncate font-sans text-xs text-[#524D46] font-normal">
                Search workspace…
              </span>
            </button>

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => setIsNotificationsOpen((prev) => !prev)}
                aria-label="Notifications"
                className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[#101010]/12 bg-white text-[#101010] hover:bg-[#EDE4D5] hover:border-[#101010]/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C]"
              >
                <Bell className="w-3.5 h-3.5 text-[#101010]" />
                <span
                  className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#D5360C]"
                  aria-hidden="true"
                />
              </button>

              {/* Notification Popover */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-lg border border-[#101010]/12 bg-white shadow-lg p-3 z-50 animate-in fade-in-0 zoom-in-95 duration-100">
                  <div className="flex items-center justify-between pb-2 border-b border-[#101010]/10 font-sans text-xs font-semibold text-[#101010]">
                    <span>Workspace Alerts</span>
                    <span className="text-[#D5360C] text-[11px] font-mono">UP TO DATE</span>
                  </div>
                  <div className="py-2.5 space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-[#101010]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D5360C] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-xs leading-tight">Workspace Synchronized</p>
                        <p className="text-[11px] text-[#524D46]">All project changes saved to cloud</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-[#101010]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#101010] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-xs leading-tight">Account Protected</p>
                        <p className="text-[11px] text-[#524D46]">Session is verified and encrypted</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#101010]/10 text-center">
                    <span className="font-sans text-[11px] text-[#524D46]">
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
                className="flex items-center gap-2 p-1 rounded-lg border border-[#101010]/12 bg-white hover:bg-[#EDE4D5] hover:border-[#101010]/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C]"
              >
                <div className="w-6 h-6 rounded-full bg-[#101010] text-[#F7F4EF] flex items-center justify-center font-sans font-semibold text-[11px] select-none">
                  {userInitial}
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg border border-[#101010]/12 bg-white shadow-lg p-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-100">
                  {/* User info */}
                  <div className="px-3 py-2 border-b border-[#101010]/10">
                    <p className="font-sans font-semibold text-xs text-[#101010] truncate">
                      {userName}
                    </p>
                    <p className="font-mono text-[11px] text-[#524D46] truncate">
                      {userEmail}
                    </p>
                  </div>

                  {/* Menu actions */}
                  <div className="py-1">
                    <Link
                      href="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#101010] hover:bg-[#F7F4EF] rounded-md transition-colors font-sans font-medium"
                    >
                      <Settings className="w-3.5 h-3.5 text-[#524D46]" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigateWithTransition("/");
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#101010] hover:bg-[#F7F4EF] rounded-md transition-colors font-sans font-medium text-left cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#524D46]" />
                      <span>Back to Landing</span>
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="pt-1 border-t border-[#101010]/10">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#D5360C] hover:bg-[#F7F4EF] rounded-md transition-colors font-sans font-semibold text-left cursor-pointer"
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
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-[#101010]/12 bg-white text-[#101010] hover:bg-[#EDE4D5] transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-[#101010]" />
              ) : (
                <Menu className="w-4 h-4 text-[#101010]" />
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Full-Height Clean Drawer ─────────────────────────── */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#101010]/12 bg-[#F7F4EF] px-6 py-6 space-y-5 animate-in slide-in-from-top-2 duration-200">
            {/* Primary links */}
            <div className="flex flex-col space-y-2">
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
                    className={`flex items-center justify-between py-2 border-b border-[#101010]/8 font-sans text-sm ${
                      isActive
                        ? "text-[#101010] font-semibold"
                        : "text-[#524D46] hover:text-[#101010]"
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
            <div className="pt-2 space-y-2 border-t border-[#101010]/12 font-sans text-xs">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-lg border border-[#101010]/12 bg-white text-[#101010]"
              >
                <Search className="w-3.5 h-3.5 text-[#D5360C]" />
                <span>Search Workspace</span>
              </button>

              <Link
                href="/settings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center gap-2 p-2 rounded-lg border border-[#101010]/12 bg-white text-[#101010]"
              >
                <Settings className="w-3.5 h-3.5 text-[#101010]" />
                <span>Settings</span>
              </Link>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigateWithTransition("/");
                }}
                className="w-full flex items-center gap-2 p-2 rounded-lg border border-[#101010]/12 bg-white text-[#101010] text-left cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#101010]" />
                <span>Back to Landing</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 p-2 rounded-lg border border-[#D5360C] bg-[#D5360C] text-white font-semibold cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── Search Modal Component ───────────────────────────────────── */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

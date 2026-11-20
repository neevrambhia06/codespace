"use client";

// Sidebar
// Renders static navigation and consumes the workspace store
// to handle the collapsed state in the warm editorial style.

import Link from "next/link";
import { Code2, ArrowLeft } from "lucide-react";
import { NAV_SECTIONS, APP_NAME } from "@/lib/constants";
import { NavLink } from "./NavLink";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { useStoreHydration } from "@/hooks/useStoreHydration";
import { useSession } from "@/lib/auth-client";

export function Sidebar() {
  const isCollapsed = useStoreHydration(useWorkspaceStore, (state) => state.sidebarCollapsed) ?? false;
  const { data: session } = useSession();

  return (
    <aside
      id="sidebar"
      className="flex h-full shrink-0 flex-col border-r border-[#101010]/15 bg-[#E6D5BD] text-[#101010] transition-all duration-300 ease-in-out"
      style={{ width: isCollapsed ? 'var(--spacing-sidebar-collapsed)' : 'var(--spacing-sidebar-width)' }}
      aria-label="Primary navigation"
    >
      {/* ── Brand ───────────────────────────────────────────────────────── */}
      <div className={`flex h-[var(--header-height)] shrink-0 items-center gap-3 border-b border-[#101010]/15 ${isCollapsed ? 'justify-center px-0' : 'px-4'}`}>
        <Link
          href="/"
          id="sidebar-brand"
          className="flex items-center gap-2.5 rounded-xs outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C]"
          aria-label={`${APP_NAME} — home`}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-xs bg-[#D5360C] shrink-0 text-[#E6D5BD]">
            <Code2 className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
          </div>
          {!isCollapsed && (
            <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#101010] truncate">
              {APP_NAME}
            </span>
          )}
        </Link>
      </div>

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav className={`flex flex-1 flex-col gap-6 overflow-y-auto py-4 ${isCollapsed ? 'px-2' : 'px-3'}`}>
        {NAV_SECTIONS.map((section) => (
          <div key={section.title ?? "default"} className="flex flex-col gap-1">
            {section.title && !isCollapsed && (
              <p className="mb-1 px-3 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-[#101010]/50 truncate">
                {section.title}
              </p>
            )}
            {section.title && isCollapsed && (
              <div className="h-4" />
            )}
            {section.items.map((item) => (
              <NavLink key={item.href} item={item} collapsed={isCollapsed} />
            ))}
          </div>
        ))}

        {!isCollapsed && (
          <div className="mt-auto px-3 pt-4 border-t border-[#101010]/10">
            <Link
              href="/"
              className="flex items-center gap-2 text-[11px] font-mono text-[#101010]/60 hover:text-[#D5360C] uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Landing</span>
            </Link>
          </div>
        )}
      </nav>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <div className={`shrink-0 border-t border-[#101010]/15 py-3 ${isCollapsed ? 'px-2 flex justify-center' : 'px-3'}`}>
        <div className={`flex items-center gap-3 rounded-xs py-2 ${isCollapsed ? 'px-0 justify-center' : 'px-3 bg-[#EFE3D1]/50 border border-[#101010]/10'}`}>
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D5360C] font-mono text-xs font-bold text-[#E6D5BD]"
            aria-label="User avatar"
          >
            {session?.user?.name ? session.user.name[0].toUpperCase() : "D"}
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[#101010]">
                {session?.user?.name || "Developer"}
              </p>
              <p className="truncate font-mono text-[9px] uppercase tracking-wider text-[#101010]/60">
                {(session?.user as { role?: string })?.role || "GUEST"} // WORKSPACE
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

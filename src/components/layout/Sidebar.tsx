"use client";

// Sidebar
// Renders static navigation and consumes the workspace store
// to handle the collapsed state.

import Link from "next/link";
import { Code2 } from "lucide-react";
import { NAV_SECTIONS, APP_NAME } from "@/lib/constants";
import { NavLink } from "./NavLink";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { useStoreHydration } from "@/hooks/useStoreHydration";

export function Sidebar() {
  const isCollapsed = useStoreHydration(useWorkspaceStore, (state) => state.sidebarCollapsed) ?? false;

  return (
    <aside
      id="sidebar"
      className="flex h-full shrink-0 flex-col border-r bg-background transition-all duration-300 ease-in-out"
      style={{ width: isCollapsed ? 'var(--spacing-sidebar-collapsed)' : 'var(--spacing-sidebar-width)' }}
      aria-label="Primary navigation"
    >
      {/* ── Brand ───────────────────────────────────────────────────────── */}
      <div className={`flex h-[var(--header-height)] shrink-0 items-center gap-3 border-b ${isCollapsed ? 'justify-center px-0' : 'px-4'}`}>
        <Link
          href="/"
          id="sidebar-brand"
          className="flex items-center gap-2.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`${APP_NAME} — home`}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-primary shrink-0">
            <Code2 className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
          </div>
          {!isCollapsed && (
            <span className="text-sm font-semibold tracking-tight text-foreground truncate">
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
              <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground truncate">
                {section.title}
              </p>
            )}
            {section.title && isCollapsed && (
               <div className="h-4" /> // spacing when titles are hidden
            )}
            {section.items.map((item) => (
              <NavLink key={item.href} item={item} collapsed={isCollapsed} />
            ))}
          </div>
        ))}
      </nav>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <div className={`shrink-0 border-t py-3 ${isCollapsed ? 'px-2 flex justify-center' : 'px-3'}`}>
        <div className={`flex items-center gap-3 rounded-md py-2 ${isCollapsed ? 'px-0 justify-center' : 'px-3'}`}>
          {/* Placeholder avatar */}
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
            aria-label="User avatar"
          >
            D
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-foreground">
                Developer
              </p>
              <p className="truncate text-[10px] text-muted-foreground">
                workspace
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

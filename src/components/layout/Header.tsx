"use client";

// Header
// Renders the top bar. Takes its title from the parent layout
// via a slot/prop so individual pages can control the heading.

import { Bell, Search, PanelLeftClose, PanelLeft } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { useStoreHydration } from "@/hooks/useStoreHydration";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const isCollapsed = useStoreHydration(useWorkspaceStore, (state) => state.sidebarCollapsed) ?? false;
  const toggleSidebar = useWorkspaceStore((state) => state.toggleSidebar);
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/login");
        },
      },
    });
  };

  return (
    <header
      id="app-header"
      className="flex h-[var(--header-height)] shrink-0 items-center justify-between border-b border-border bg-background px-6"
    >
      {/* ── Left: page title & toggle ─────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="mr-2 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
        {title && (
          <h1 className="text-sm font-semibold text-foreground">
            {title}
          </h1>
        )}
      </div>

      {/* ── Right: actions ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-1">
        {/* Search trigger — future: open a command palette (⌘K) */}
        <button
          id="header-search-btn"
          type="button"
          aria-label="Search (⌘K)"
          className="group flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-border/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Search className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Search…</span>
          <kbd className="ml-1 hidden rounded bg-background px-1 font-mono text-[10px] text-muted-foreground sm:inline">
            ⌘K
          </kbd>
        </button>

        {/* Notifications */}
        <button
          id="header-notifications-btn"
          type="button"
          aria-label="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
          {/* Notification dot */}
          <span
            className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary"
            aria-hidden="true"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
        </button>

        {session?.user && (
          <div className="flex items-center gap-3 ml-2 border-l border-border pl-3">
            <span className="text-sm font-medium text-foreground">{session.user.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-destructive hover:underline"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

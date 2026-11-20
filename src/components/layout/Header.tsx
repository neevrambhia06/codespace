"use client";

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
      className="flex h-[var(--header-height)] shrink-0 items-center justify-between border-b border-[#101010]/15 bg-[#E6D5BD] px-6 text-[#101010]"
    >
      {/* ── Left: page title & toggle ─────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="mr-2 flex h-8 w-8 items-center justify-center rounded-xs text-[#101010]/70 transition-colors hover:bg-[#EFE3D1] hover:text-[#101010] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C]"
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
        {title && (
          <h1 className="font-display text-sm font-bold tracking-tight text-[#101010]">
            {title}
          </h1>
        )}
      </div>

      {/* ── Right: actions ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        {/* Search trigger */}
        <button
          id="header-search-btn"
          type="button"
          aria-label="Search"
          className="group flex items-center gap-2 rounded-xs border border-[#101010]/15 bg-[#EFE3D1] px-3 py-1.5 text-xs text-[#101010]/70 transition-colors hover:border-[#101010]/30 hover:text-[#101010] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C]"
        >
          <Search className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline font-mono text-[11px]">Search workspace…</span>
        </button>

        {/* Notifications */}
        <button
          id="header-notifications-btn"
          type="button"
          aria-label="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-xs text-[#101010]/70 transition-colors hover:bg-[#EFE3D1] hover:text-[#101010] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C]"
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
          <span
            className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#D5360C]"
            aria-hidden="true"
          />
        </button>

        {session?.user && (
          <div className="flex items-center gap-3 ml-2 border-l border-[#101010]/15 pl-3">
            <span className="font-mono text-xs font-semibold text-[#101010]">{session.user.name}</span>
            <button
              onClick={handleLogout}
              className="font-mono text-[11px] uppercase tracking-wider text-[#D5360C] hover:text-[#101010] font-bold transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

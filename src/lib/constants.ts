import {
  LayoutDashboard,
  FolderOpen,
  Terminal,
  Settings,
  Puzzle,
  CheckSquare,
  StickyNote,
} from "lucide-react";
import type { NavSection } from "@/types";

// ── App meta ─────────────────────────────────────────────────────────────────

export const APP_NAME = "CodeSpace";
export const APP_VERSION = "0.1.0";
export const APP_DESCRIPTION = "All-in-one workspace for developers";

// ── Navigation ────────────────────────────────────────────────────────────────

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "Workspace",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        exact: true,
      },
      {
        label: "Projects",
        href: "/projects",
        icon: FolderOpen,
      },
      {
        label: "Tasks",
        href: "/tasks",
        icon: CheckSquare,
      },
      {
        label: "Notes",
        href: "/notes",
        icon: StickyNote,
      },
      {
        label: "Snippets",
        href: "/snippets",
        icon: Terminal,
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        label: "Extensions",
        href: "/extensions",
        icon: Puzzle,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

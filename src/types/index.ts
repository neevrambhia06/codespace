import type { LucideIcon } from "lucide-react";

// ── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** If true, only highlight when the path matches exactly */
  exact?: boolean;
  /** Optional badge count shown on the nav item */
  badge?: number;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

// ── Layout ───────────────────────────────────────────────────────────────────

export interface PageMeta {
  title: string;
  description?: string;
}

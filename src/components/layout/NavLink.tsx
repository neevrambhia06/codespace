"use client";

// NavLink MUST be a Client Component because it uses `usePathname()`
// from next/navigation, which reads the current URL at runtime.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

interface NavLinkProps {
  item: NavItem;
  /** When true, renders a compact icon-only version */
  collapsed?: boolean;
}

export function NavLink({ item, collapsed = false }: NavLinkProps) {
  const pathname = usePathname();

  const isActive = item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(item.href + "/");

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      id={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
      title={collapsed ? item.label : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-150",
        "outline-none focus-visible:ring-2 focus-visible:ring-primary",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        collapsed && "justify-center px-2"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {/* Active indicator bar */}
      {isActive && !collapsed && (
        <span
          className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-primary"
          aria-hidden="true"
        />
      )}

      <Icon
        className={cn(
          "h-4 w-4 shrink-0 transition-colors",
          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
        )}
        aria-hidden="true"
      />

      {!collapsed && (
        <span className="truncate">{item.label}</span>
      )}

      {/* Badge */}
      {item.badge !== undefined && item.badge > 0 && !collapsed && (
        <span
          className="ml-auto min-w-[18px] rounded-full bg-primary px-1 py-px text-center font-mono text-[10px] font-semibold leading-none text-primary-foreground"
          aria-label={`${item.badge} notifications`}
        >
          {item.badge > 99 ? "99+" : item.badge}
        </span>
      )}
    </Link>
  );
}

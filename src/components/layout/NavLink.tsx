"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

interface NavLinkProps {
  item: NavItem;
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
        "group relative flex items-center gap-3 rounded-xs px-3 py-2 text-xs font-medium transition-all duration-150",
        "outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C]",
        isActive
          ? "bg-[#D5360C]/12 text-[#D5360C] font-bold"
          : "text-[#101010]/75 hover:bg-[#EFE3D1] hover:text-[#101010]",
        collapsed && "justify-center px-2"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {/* Active indicator bar in Burnt Orange */}
      {isActive && !collapsed && (
        <span
          className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r bg-[#D5360C]"
          aria-hidden="true"
        />
      )}

      <Icon
        className={cn(
          "h-4 w-4 shrink-0 transition-colors",
          isActive ? "text-[#D5360C]" : "text-[#101010]/60 group-hover:text-[#101010]"
        )}
        aria-hidden="true"
      />

      {!collapsed && (
        <span className="truncate font-mono tracking-wider uppercase text-[11px]">{item.label}</span>
      )}

      {/* Badge */}
      {item.badge !== undefined && item.badge > 0 && !collapsed && (
        <span
          className="ml-auto min-w-[18px] rounded-full bg-[#D5360C] px-1 py-px text-center font-mono text-[9px] font-semibold leading-none text-[#E6D5BD]"
          aria-label={`${item.badge} notifications`}
        >
          {item.badge > 99 ? "99+" : item.badge}
        </span>
      )}
    </Link>
  );
}

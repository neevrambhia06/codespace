"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  FolderOpen,
  CheckSquare,
  FileText,
  Code2,
  Puzzle,
  Settings,
  ArrowRight,
  X,
} from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Actions";
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const COMMANDS: CommandItem[] = [
  {
    id: "nav-dashboard",
    title: "Dashboard",
    subtitle: "Workspace overview, active metrics & recent updates",
    category: "Navigation",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "nav-projects",
    title: "Projects",
    subtitle: "Active initiatives, milestones & project directories",
    category: "Navigation",
    href: "/projects",
    icon: FolderOpen,
  },
  {
    id: "nav-tasks",
    title: "Tasks",
    subtitle: "Deliverables checklist, priorities & completed items",
    category: "Navigation",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    id: "nav-notes",
    title: "Notes & Docs",
    subtitle: "Important takeaways, project specs & team documentation",
    category: "Navigation",
    href: "/notes",
    icon: FileText,
  },
  {
    id: "nav-snippets",
    title: "Snippets & Templates",
    subtitle: "Saved templates, helper functions & reusable text",
    category: "Navigation",
    href: "/snippets",
    icon: Code2,
  },
  {
    id: "nav-extensions",
    title: "Integrations & Tools",
    subtitle: "Productivity extensions, calendar sync & notifications",
    category: "Navigation",
    href: "/extensions",
    icon: Puzzle,
  },
  {
    id: "nav-settings",
    title: "Settings",
    subtitle: "Profile, preferences & security settings",
    category: "Navigation",
    href: "/settings",
    icon: Settings,
  },
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open is handled by parent, but if this component manages it or is always rendered
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return COMMANDS;
    const q = query.toLowerCase().trim();
    return COMMANDS.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(q) ||
        cmd.subtitle.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q)
    );
  }, [query]);

  // Handle arrow key navigation
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }

    const handleArrowNav = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(filteredCommands.length, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? Math.max(filteredCommands.length - 1, 0) : prev - 1
        );
      } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
        e.preventDefault();
        const selected = filteredCommands[selectedIndex];
        router.push(selected.href);
        onClose();
      }
    };

    window.addEventListener("keydown", handleArrowNav);
    return () => window.removeEventListener("keydown", handleArrowNav);
  }, [isOpen, filteredCommands, selectedIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#101010]/60 backdrop-blur-xs transition-opacity animate-in fade-in-0 duration-150"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl rounded-xs border border-[#101010] bg-[#F4EBDD] shadow-[4px_4px_0px_#101010] animate-in fade-in-0 zoom-in-95 duration-150 overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#101010]/15 bg-[#FAF4EA]">
          <Search className="w-4 h-4 text-[#D5360C] shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search workspace or jump to section... (Type to filter)"
            className="flex-1 bg-transparent text-sm text-[#101010] placeholder:text-[#4A443C]/70 outline-none font-sans"
          />
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 font-mono text-[10px] tracking-wider uppercase border border-[#101010]/20 bg-[#E6D5BD] text-[#4A443C] rounded-xs">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="sm:hidden text-[#4A443C] hover:text-[#101010]"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center">
              <p className="font-mono text-xs uppercase tracking-wider text-[#4A443C]">
                No matching destinations found for &quot;{query}&quot;
              </p>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    router.push(cmd.href);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xs text-left transition-colors font-sans ${
                    isSelected
                      ? "bg-[#D5360C] text-[#F4EBDD]"
                      : "text-[#101010] hover:bg-[#FAF4EA]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-xs flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? "border-[#F4EBDD]/40 bg-[#B82D09] text-[#F4EBDD]"
                          : "border-[#101010]/15 bg-[#E6D5BD] text-[#101010]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-mono text-xs font-bold uppercase tracking-wider">
                        {cmd.title}
                      </div>
                      <div
                        className={`text-[11px] line-clamp-1 ${
                          isSelected ? "text-[#F4EBDD]/85" : "text-[#4A443C]"
                        }`}
                      >
                        {cmd.subtitle}
                      </div>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isSelected
                        ? "translate-x-0.5 opacity-100 text-[#F4EBDD]"
                        : "opacity-0"
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-[#101010]/15 bg-[#E6D5BD]/50 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#4A443C]">
          <span>Navigation: ↑ ↓ Enter</span>
          <span>Close: Esc</span>
        </div>
      </div>
    </div>
  );
}

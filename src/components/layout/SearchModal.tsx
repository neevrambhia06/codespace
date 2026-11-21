"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
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
  Home,
  FolderGit2,
  CheckCircle2,
  Circle,
  FileCode2,
  Loader2,
} from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Projects" | "Tasks" | "Notes" | "Snippets";
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STATIC_COMMANDS: SearchItem[] = [
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
  {
    id: "nav-landing",
    title: "Homepage / Landing",
    subtitle: "Public landing page, overview and design philosophy",
    category: "Navigation",
    href: "/",
    icon: Home,
  },
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    } else {
      setQuery("");
      setSearchResults([]);
    }
  }, [isOpen]);

  // Debounced search for live database records
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        if (!res.ok) throw new Error("Search failed");
        const data = await res.json();

        const items: SearchItem[] = [];

        // Map projects
        if (data.projects && Array.isArray(data.projects)) {
          data.projects.forEach((p: { id: string; name: string; description?: string }) => {
            items.push({
              id: `proj-${p.id}`,
              title: p.name,
              subtitle: p.description || "Active project initiative",
              category: "Projects",
              href: `/projects/${p.id}`,
              icon: FolderGit2,
            });
          });
        }

        // Map tasks
        if (data.tasks && Array.isArray(data.tasks)) {
          data.tasks.forEach((t: { id: string; title: string; completed?: boolean; priority?: string }) => {
            items.push({
              id: `task-${t.id}`,
              title: t.title,
              subtitle: `Deliverable • Priority: ${t.priority || "medium"} • ${t.completed ? "Completed" : "Pending"}`,
              category: "Tasks",
              href: `/tasks`,
              icon: t.completed ? CheckCircle2 : Circle,
            });
          });
        }

        // Map notes
        if (data.notes && Array.isArray(data.notes)) {
          data.notes.forEach((n: { id: string; title: string; snippet?: string }) => {
            items.push({
              id: `note-${n.id}`,
              title: n.title,
              subtitle: n.snippet || "Documentation record",
              category: "Notes",
              href: `/notes`,
              icon: FileText,
            });
          });
        }

        // Map snippets
        if (data.snippets && Array.isArray(data.snippets)) {
          data.snippets.forEach((s: { id: string; title: string; language?: string }) => {
            items.push({
              id: `snip-${s.id}`,
              title: s.title,
              subtitle: `Snippet • Language: ${s.language || "text"}`,
              category: "Snippets",
              href: `/snippets`,
              icon: FileCode2,
            });
          });
        }

        setSearchResults(items);
      } catch (err) {
        console.error("[Search error]", err);
      } finally {
        setIsLoading(false);
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [query]);

  // Combined list of matching commands and dynamic database results
  const allItems = useMemo(() => {
    const q = query.toLowerCase().trim();
    const matchingStatic = !q
      ? STATIC_COMMANDS
      : STATIC_COMMANDS.filter(
          (cmd) =>
            cmd.title.toLowerCase().includes(q) ||
            cmd.subtitle.toLowerCase().includes(q) ||
            cmd.category.toLowerCase().includes(q)
        );

    return [...searchResults, ...matchingStatic];
  }, [query, searchResults]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [allItems.length]);

  // Keyboard navigation & submission
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(allItems.length, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? Math.max(allItems.length - 1, 0) : prev - 1
        );
      } else if (e.key === "Enter" && allItems[selectedIndex]) {
        e.preventDefault();
        const selected = allItems[selectedIndex];
        router.push(selected.href);
        onClose();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [allItems, selectedIndex, router, onClose]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#101010]/60 backdrop-blur-xs transition-opacity animate-in fade-in-0 duration-150"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-xl border border-[#101010]/15 bg-white shadow-2xl animate-in fade-in-0 zoom-in-95 duration-150 overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#101010]/10 bg-white">
          <Search className="w-4 h-4 text-[#D5360C] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search projects, tasks, notes, snippets, or jump to section…"
            className="flex-1 bg-transparent text-sm text-[#101010] placeholder:text-[#524D46] outline-none font-sans"
          />
          {isLoading && (
            <Loader2 className="w-4 h-4 text-[#D5360C] animate-spin shrink-0" />
          )}
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 font-mono text-[10px] uppercase border border-[#101010]/10 bg-[#EDE4D5] text-[#524D46] rounded-md">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="sm:hidden text-[#524D46] hover:text-[#101010] p-1 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {allItems.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-sans text-xs text-[#524D46]">
                No matching projects, notes, or destinations found for &quot;{query}&quot;
              </p>
            </div>
          ) : (
            allItems.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={`${cmd.id}-${idx}`}
                  onClick={() => {
                    router.push(cmd.href);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors font-sans cursor-pointer ${
                    isSelected
                      ? "bg-[#D5360C] text-white"
                      : "text-[#101010] hover:bg-[#EDE4D5]/40"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? "border-white/30 bg-[#B82D09] text-white"
                          : "border-[#101010]/10 bg-[#EDE4D5] text-[#101010]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-xs font-semibold truncate">
                          {cmd.title}
                        </span>
                        <span
                          className={`font-mono text-[9px] uppercase px-1.5 py-0.5 rounded-md border ${
                            isSelected
                              ? "border-white/30 text-white bg-white/10"
                              : "border-[#101010]/10 text-[#524D46] bg-[#EDE4D5]"
                          }`}
                        >
                          {cmd.category}
                        </span>
                      </div>
                      <div
                        className={`text-[11px] line-clamp-1 truncate ${
                          isSelected ? "text-white/85" : "text-[#524D46]"
                        }`}
                      >
                        {cmd.subtitle}
                      </div>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isSelected
                        ? "translate-x-0.5 opacity-100 text-white"
                        : "opacity-0"
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2 border-t border-[#101010]/10 bg-[#F7F4EF] flex items-center justify-between text-[11px] font-sans text-[#524D46]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 border border-[#101010]/10 bg-[#EDE4D5] rounded-md text-[10px] font-mono">↑↓</kbd> Navigate
            </span>
            <span>
              <kbd className="px-1 border border-[#101010]/10 bg-[#EDE4D5] rounded-md text-[10px] font-mono">↵</kbd> Open
            </span>
          </div>
          <div>
            <span>
              <kbd className="px-1 border border-[#101010]/10 bg-[#EDE4D5] rounded-md text-[10px] font-mono">ESC</kbd> Close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

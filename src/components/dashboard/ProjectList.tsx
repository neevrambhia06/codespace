"use client";

import type { Project } from "@prisma/client";
import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { useStoreHydration } from "@/hooks/useStoreHydration";
import dynamic from "next/dynamic";

const CreateProjectForm = dynamic(
  () => import("@/components/forms/CreateProjectForm").then((m) => m.CreateProjectForm),
  { ssr: false }
);

interface ProjectListProps {
  projects: (Project & { lastUpdated: string })[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const filter = useStoreHydration(useWorkspaceStore, (state) => state.projectFilter) ?? 'all';
  const compactMode = useStoreHydration(useWorkspaceStore, (state) => state.compactMode) ?? false;
  const setProjectFilter = useWorkspaceStore((state) => state.setProjectFilter);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = filter === "all" || project.status === filter;
    const matchesSearch =
      !searchQuery.trim() ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Boolean(project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-2">
            {[
              { id: "all", label: "All" },
              { id: "active", label: "Active" },
              { id: "archived", label: "Archived" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setProjectFilter(tab.id as "all" | "active" | "archived")}
                className={`font-sans text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  filter === tab.id
                    ? "bg-[#D5360C] text-white font-semibold shadow-2xs"
                    : "bg-[#EDE4D5] text-[#101010] hover:bg-[#E2D6C3] border border-[#101010]/10 font-medium"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#524D46] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter projects…"
              className="pl-8 pr-3 py-1.5 font-sans text-xs rounded-lg border border-[#101010]/12 bg-white text-[#101010] placeholder:text-[#524D46] outline-none focus:border-[#D5360C] w-36 sm:w-48 transition-all"
            />
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-8 gap-1.5 bg-[#D5360C] text-white hover:bg-[#B82D09] font-medium">
              <Plus className="h-3.5 w-3.5" />
              <span>New Project</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="border border-[#101010]/15 bg-white text-[#101010] rounded-xl">
            <DialogHeader>
              <DialogTitle className="font-sans font-bold text-lg text-[#101010]">Create Project</DialogTitle>
              <DialogDescription className="text-xs text-[#524D46]">
                Add a new initiative to your workspace directory.
              </DialogDescription>
            </DialogHeader>
            <CreateProjectForm onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* List */}
      <div className={compactMode ? "space-y-2" : "space-y-3"}>
        {filteredProjects.length === 0 ? (
          <p className="text-xs font-sans text-[#524D46] p-6 border border-dashed border-[#101010]/15 rounded-lg text-center bg-[#EDE4D5]/30">
            No projects found matching current filter.
          </p>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`flex items-center justify-between rounded-lg border border-[#101010]/12 bg-white transition-all duration-200 hover:border-[#101010]/25 hover:shadow-xs ${
                compactMode ? "p-3" : "p-4"
              }`}
            >
              <div className="flex flex-col gap-0.5">
                <Link
                  href={`/projects/${project.id}`}
                  className="font-sans text-sm sm:text-base font-semibold text-[#101010] hover:text-[#D5360C] transition-colors flex items-center gap-1.5 group tracking-[-0.01em]"
                >
                  <span>{project.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#D5360C]" />
                </Link>
                {project.description && (
                  <p className="text-xs text-[#524D46] line-clamp-1 leading-relaxed font-normal">
                    {project.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Badge variant={project.status === "active" ? "accent" : "secondary"}>
                  {project.status}
                </Badge>
                <span className="hidden sm:inline font-mono text-xs text-[#524D46]">
                  {project.lastUpdated}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

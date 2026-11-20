"use client";

import type { Project } from "@prisma/client";
import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
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

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.status === filter;
  });

  return (
    <div className="space-y-4">
      {/* Header controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          {["all", "active", "archived"].map((mode) => (
            <button
              key={mode}
              onClick={() => setProjectFilter(mode as "all" | "active" | "archived")}
              className={`font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-xs transition-colors border ${
                filter === mode
                  ? "bg-[#D5360C] text-[#F4EBDD] border-[#D5360C] font-bold"
                  : "bg-[#F4EBDD] text-[#4A443C] border-[#101010]/20 hover:bg-[#FAF4EA] hover:text-[#101010]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-8 gap-1.5 bg-[#D5360C] text-[#F4EBDD] hover:bg-[#B82D09]">
              <Plus className="h-3.5 w-3.5" />
              <span>+ New Project</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="border border-[#101010] bg-[#F4EBDD] text-[#101010]">
            <DialogHeader>
              <DialogTitle className="font-display font-bold">Create Project</DialogTitle>
              <DialogDescription className="text-xs text-[#4A443C]">
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
          <p className="text-xs font-mono text-[#4A443C] p-6 border border-dashed border-[#101010]/25 rounded-xs text-center bg-[#F4EBDD]/50">
            No projects found matching current filter.
          </p>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`flex items-center justify-between rounded-xs border border-[rgba(16,16,16,0.22)] bg-[#F4EBDD] transition-all duration-200 hover:bg-[#FAF4EA] hover:border-[#101010]/40 hover:shadow-[2px_2px_0px_rgba(16,16,16,0.08)] ${
                compactMode ? "p-3" : "p-4"
              }`}
            >
              <div className="flex flex-col gap-0.5">
                <Link
                  href={`/projects/${project.id}`}
                  className="font-display text-sm sm:text-base font-bold text-[#101010] hover:text-[#D5360C] transition-colors flex items-center gap-1.5 group"
                >
                  <span>{project.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#D5360C]" />
                </Link>
                {project.description && (
                  <p className="text-xs text-[#4A443C] line-clamp-1 leading-relaxed">
                    {project.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Badge variant={project.status === "active" ? "accent" : "secondary"}>
                  {project.status}
                </Badge>
                <span className="hidden sm:inline font-mono text-[10px] text-[#4A443C] uppercase tracking-wider">
                  Updated: {project.lastUpdated}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

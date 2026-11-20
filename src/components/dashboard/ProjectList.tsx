"use client";

import type { Project } from "@prisma/client";
import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
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
          <button
            onClick={() => setProjectFilter("all")}
            className={`text-xs px-2 py-1 rounded-md transition-colors ${filter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            All
          </button>
          <button
            onClick={() => setProjectFilter("active")}
            className={`text-xs px-2 py-1 rounded-md transition-colors ${filter === "active" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            Active
          </button>
          <button
            onClick={() => setProjectFilter("archived")}
            className={`text-xs px-2 py-1 rounded-md transition-colors ${filter === "archived" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            Archived
          </button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-8 gap-1">
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">New Project</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Project</DialogTitle>
              <DialogDescription>
                Add a new project to your workspace.
              </DialogDescription>
            </DialogHeader>
            <CreateProjectForm onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* List */}
      <div className={`space-y-${compactMode ? '2' : '4'}`}>
        {filteredProjects.length === 0 ? (
          <p className="text-sm text-muted-foreground">No projects found.</p>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`flex items-center justify-between rounded-lg border border-border transition-colors hover:bg-muted/50 ${compactMode ? 'p-2' : 'p-4'}`}
            >
              <div className="flex flex-col gap-1">
                <Link href={`/projects/${project.id}`} className="font-medium text-foreground hover:underline">
                  {project.name}
                </Link>
                {!compactMode && (
                  <p className="text-xs text-muted-foreground">
                    {project.description}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge
                  variant={project.status === "active" ? "default" : "secondary"}
                >
                  {project.status}
                </Badge>
                {!compactMode && (
                  <span className="text-[10px] text-muted-foreground">
                    {project.lastUpdated}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

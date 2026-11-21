"use client";

import type { Task } from "@prisma/client";
import { useState, useOptimistic, useTransition } from "react";
import { CheckCircle2, Circle, Plus, Search } from "lucide-react";
import { toast } from "sonner";
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
import { toggleTaskStatus } from "@/actions/task";

const CreateTaskForm = dynamic(
  () => import("@/components/forms/CreateTaskForm").then((m) => m.CreateTaskForm),
  { ssr: false }
);

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  const filter = useStoreHydration(useWorkspaceStore, (state) => state.taskFilter) ?? 'all';
  const compactMode = useStoreHydration(useWorkspaceStore, (state) => state.compactMode) ?? false;
  const setTaskFilter = useWorkspaceStore((state) => state.setTaskFilter);
  const toggleCompactMode = useWorkspaceStore((state) => state.toggleCompactMode);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, startTransition] = useTransition();

  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    tasks,
    (state, { id, completed }: { id: string; completed: boolean }) =>
      state.map((task) =>
        task.id === id ? { ...task, completed } : task
      )
  );

  const filteredTasks = optimisticTasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && !task.completed) ||
      (filter === "completed" && task.completed);
    const matchesSearch =
      !searchQuery.trim() ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleToggle = async (taskId: string, currentCompleted: boolean) => {
    const newCompleted = !currentCompleted;
    
    startTransition(() => {
      setOptimisticTasks({ id: taskId, completed: newCompleted });
    });
    
    const response = await toggleTaskStatus(taskId, newCompleted);
    if (!response.success) {
      toast.error(response.error || "Failed to update task status");
    }
  };

  return (
    <div className="space-y-4">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-2">
            {[
              { id: "all", label: "All" },
              { id: "pending", label: "Pending" },
              { id: "completed", label: "Completed" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTaskFilter(tab.id as "all" | "pending" | "completed")}
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
              placeholder="Filter tasks…"
              className="pl-8 pr-3 py-1.5 font-sans text-xs rounded-lg border border-[#101010]/12 bg-white text-[#101010] placeholder:text-[#524D46] outline-none focus:border-[#D5360C] w-32 sm:w-44 transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleCompactMode}
            className={`font-sans text-xs px-3 py-1.5 rounded-lg border border-[#101010]/12 transition-colors cursor-pointer ${
              compactMode
                ? 'bg-[#101010] text-white font-semibold'
                : 'bg-[#EDE4D5] text-[#101010] hover:bg-[#E2D6C3] font-medium'
            }`}
            title="Toggle Compact Mode"
          >
            Compact
          </button>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1.5 bg-[#D5360C] text-white hover:bg-[#B82D09] font-medium">
                <Plus className="h-3.5 w-3.5" />
                <span>New Task</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="border border-[#101010]/15 bg-white text-[#101010] rounded-xl">
              <DialogHeader>
                <DialogTitle className="font-sans font-bold text-lg text-[#101010]">Create Task</DialogTitle>
                <DialogDescription className="text-xs text-[#524D46]">
                  Add an actionable item to your checklist.
                </DialogDescription>
              </DialogHeader>
              <CreateTaskForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* List */}
      <div className={compactMode ? "space-y-2" : "space-y-3"}>
        {filteredTasks.length === 0 ? (
          <p className="text-xs font-sans text-[#524D46] p-6 border border-dashed border-[#101010]/15 rounded-lg text-center bg-[#EDE4D5]/30">
            No tasks found matching current filter.
          </p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between rounded-lg border border-[#101010]/12 bg-white transition-all duration-200 hover:border-[#101010]/25 hover:shadow-xs ${
                compactMode ? "p-2.5" : "p-3.5"
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggle(task.id, task.completed)}
                  className="text-[#101010]/40 hover:text-[#D5360C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C] rounded-md cursor-pointer"
                  aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-[#D5360C]" />
                  ) : (
                    <Circle className="h-4 w-4 text-[#101010]/40" />
                  )}
                </button>
                <span
                  className={`text-xs sm:text-sm font-sans ${
                    task.completed
                      ? "line-through text-[#524D46]/60"
                      : "text-[#101010] font-medium"
                  }`}
                >
                  {task.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {task.priority && (
                  <Badge
                    variant={task.priority.toLowerCase() === "high" ? "accent" : "secondary"}
                    className="text-[10px]"
                  >
                    {task.priority}
                  </Badge>
                )}
                {task.completed && (
                  <Badge variant="default" className="text-[10px]">
                    Done
                  </Badge>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

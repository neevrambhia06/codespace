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
            {["all", "pending", "completed"].map((mode) => (
              <button
                key={mode}
                onClick={() => setTaskFilter(mode as "all" | "pending" | "completed")}
                className={`font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-xs transition-colors border cursor-pointer ${
                  filter === mode
                    ? "bg-[#D5360C] text-[#F4EBDD] border-[#D5360C] font-bold"
                    : "bg-[#F4EBDD] text-[#4A443C] border-[#101010]/20 hover:bg-[#FAF4EA] hover:text-[#101010]"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3 h-3 text-[#4A443C] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter tasks…"
              className="pl-7 pr-3 py-1 font-mono text-[10px] uppercase rounded-xs border border-[#101010]/20 bg-[#F4EBDD] text-[#101010] placeholder:text-[#4A443C]/60 outline-none focus:border-[#D5360C] w-32 sm:w-40 transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleCompactMode}
            className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-xs border border-[#101010]/20 transition-colors ${
              compactMode ? 'bg-[#101010] text-[#F4EBDD]' : 'bg-[#F4EBDD] text-[#4A443C]'
            } hover:bg-[#FAF4EA] hover:text-[#101010]`}
            title="Toggle Compact Mode"
          >
            Compact
          </button>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1.5 bg-[#D5360C] text-[#F4EBDD] hover:bg-[#B82D09]">
                <Plus className="h-3.5 w-3.5" />
                <span>+ New Task</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="border border-[#101010] bg-[#F4EBDD] text-[#101010]">
              <DialogHeader>
                <DialogTitle className="font-display font-bold">Create Task</DialogTitle>
                <DialogDescription className="text-xs text-[#4A443C]">
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
          <p className="text-xs font-mono text-[#4A443C] p-6 border border-dashed border-[#101010]/25 rounded-xs text-center bg-[#F4EBDD]/50">
            No tasks found matching current filter.
          </p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between rounded-xs border border-[rgba(16,16,16,0.22)] bg-[#F4EBDD] transition-all duration-200 hover:bg-[#FAF4EA] hover:border-[#101010]/40 hover:shadow-[2px_2px_0px_rgba(16,16,16,0.08)] ${
                compactMode ? "p-2.5" : "p-3.5"
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggle(task.id, task.completed)}
                  className="text-[#101010]/40 hover:text-[#D5360C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C] rounded-xs"
                  aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-[#D5360C]" />
                  ) : (
                    <Circle className="h-4 w-4 text-[#101010]/50" />
                  )}
                </button>
                <span
                  className={`text-xs sm:text-sm font-sans ${
                    task.completed
                      ? "line-through text-[#4A443C]/60"
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
                    className="text-[9px]"
                  >
                    {task.priority}
                  </Badge>
                )}
                {task.completed && (
                  <Badge variant="default" className="text-[9px]">
                    DONE
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

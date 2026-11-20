"use client";

import type { Task } from "@prisma/client";
import { useState, useOptimistic, useTransition } from "react";
import { CheckCircle2, Circle, Plus } from "lucide-react";
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
  const [, startTransition] = useTransition();

  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    tasks,
    (state, { id, completed }: { id: string; completed: boolean }) =>
      state.map((task) =>
        task.id === id ? { ...task, completed } : task
      )
  );

  const filteredTasks = optimisticTasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
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
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          {["all", "pending", "completed"].map((mode) => (
            <button
              key={mode}
              onClick={() => setTaskFilter(mode as "all" | "pending" | "completed")}
              className={`font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-xs transition-colors border ${
                filter === mode
                  ? "bg-[#D5360C] text-[#E6D5BD] border-[#D5360C] font-bold"
                  : "bg-[#EFE3D1] text-[#101010]/70 border-[#101010]/15 hover:bg-[#E6D5BD]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleCompactMode}
            className={`font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-xs border border-[#101010]/15 transition-colors ${
              compactMode ? 'bg-[#101010] text-[#E6D5BD]' : 'bg-[#EFE3D1] text-[#101010]/70'
            } hover:bg-[#E6D5BD]`}
            title="Toggle Compact Mode"
          >
            Compact
          </button>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                <span>New Task</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="border border-[#101010]/20 bg-[#EFE3D1] text-[#101010]">
              <DialogHeader>
                <DialogTitle className="font-display font-bold">Create Task</DialogTitle>
                <DialogDescription className="text-xs text-[#101010]/70">
                  Add an actionable task to your active workspace.
                </DialogDescription>
              </DialogHeader>
              <CreateTaskForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* List */}
      <div className={compactMode ? "space-y-1.5" : "space-y-2.5"}>
        {filteredTasks.length === 0 ? (
          <p className="text-xs font-mono text-[#101010]/60 p-4 border border-dashed border-[#101010]/20 rounded-xs text-center">
            No tasks found matching current filter.
          </p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-3 rounded-xs border border-[#101010]/10 bg-[#E6D5BD]/40 transition-colors hover:bg-[#E6D5BD] hover:border-[#101010]/25 ${
                compactMode ? 'p-2' : 'p-3'
              }`}
            >
              <button 
                onClick={() => handleToggle(task.id, task.completed)}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C] rounded-full shrink-0"
                aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
              >
                {task.completed ? (
                  <CheckCircle2 className={`${compactMode ? 'h-4 w-4' : 'h-5 w-5'} text-[#D5360C]`} />
                ) : (
                  <Circle className={`${compactMode ? 'h-4 w-4' : 'h-5 w-5'} text-[#101010]/40 hover:text-[#101010]`} />
                )}
              </button>
              <div className="flex flex-1 items-center justify-between gap-4">
                <span
                  className={`${compactMode ? 'text-xs' : 'text-sm'} ${
                    task.completed
                      ? "line-through text-[#101010]/40"
                      : "text-[#101010] font-medium"
                  }`}
                >
                  {task.title}
                </span>
                <Badge
                  variant={
                    task.priority === "high"
                      ? "destructive"
                      : task.priority === "medium"
                      ? "warning"
                      : "secondary"
                  }
                  className={`capitalize shrink-0 ${compactMode ? 'text-[9px] px-1.5 py-0' : ''}`}
                >
                  {task.priority}
                </Badge>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

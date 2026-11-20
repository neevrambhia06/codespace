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

const CreateTaskForm = dynamic(
  () => import("@/components/forms/CreateTaskForm").then((m) => m.CreateTaskForm),
  { ssr: false }
);
import { toggleTaskStatus } from "@/actions/task";


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
          <button
            onClick={() => setTaskFilter("all")}
            className={`text-xs px-2 py-1 rounded-md transition-colors ${filter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            All
          </button>
          <button
            onClick={() => setTaskFilter("pending")}
            className={`text-xs px-2 py-1 rounded-md transition-colors ${filter === "pending" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            Pending
          </button>
          <button
            onClick={() => setTaskFilter("completed")}
            className={`text-xs px-2 py-1 rounded-md transition-colors ${filter === "completed" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            Completed
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleCompactMode}
            className={`text-xs px-2 py-1 rounded-md border border-border transition-colors ${compactMode ? 'bg-muted' : 'bg-transparent'} hover:bg-muted`}
            title="Toggle Compact Mode"
          >
            Compact UI
          </button>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <Plus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">New Task</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Task</DialogTitle>
                <DialogDescription>
                  Add a new task to your workspace.
                </DialogDescription>
              </DialogHeader>
              <CreateTaskForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* List */}
      <div className={`space-y-${compactMode ? '1' : '3'}`}>
        {filteredTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-3 rounded-lg border border-transparent transition-colors hover:bg-muted/50 ${compactMode ? 'p-1' : 'p-2'}`}
            >
              <button 
                onClick={() => handleToggle(task.id, task.completed)}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
                aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
              >
                {task.completed ? (
                  <CheckCircle2 className={`${compactMode ? 'h-4 w-4' : 'h-5 w-5'} text-primary`} />
                ) : (
                  <Circle className={`${compactMode ? 'h-4 w-4' : 'h-5 w-5'} text-muted-foreground`} />
                )}
              </button>
              <div className="flex flex-1 items-center justify-between">
                <span
                  className={`${compactMode ? 'text-xs' : 'text-sm'} font-medium ${
                    task.completed
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {task.title}
                </span>
                <Badge
                  variant={
                    task.priority === "high"
                      ? "destructive"
                      : task.priority === "medium"
                      ? "warning" // Uses our custom extension in Badge.tsx
                      : "secondary"
                  }
                  className={`capitalize ${compactMode ? 'text-[9px] px-1.5 py-0' : ''}`}
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

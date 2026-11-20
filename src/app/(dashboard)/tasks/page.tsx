import { prisma } from "@/lib/prisma";
import { TaskList } from "@/components/dashboard/TaskList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tasks | CodeSpace",
  description: "Track and organize your pending and completed tasks.",
};

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    orderBy: { updatedAt: "desc" },
  });

  const pendingCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Tasks</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Stay on top of your development checklist and milestones.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workspace Tasks</CardTitle>
          <CardDescription>
            {pendingCount} pending task{pendingCount === 1 ? "" : "s"} to complete.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TaskList tasks={tasks} />
        </CardContent>
      </Card>
    </div>
  );
}

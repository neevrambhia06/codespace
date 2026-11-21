import { prisma } from "@/lib/prisma";
import { TaskList } from "@/components/dashboard/TaskList";
import { PageHeader } from "@/components/layout/PageHeader";
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
    <div className="flex flex-col gap-6 animate-in fade-in-0 duration-300 w-full">
      {/* ── Editorial Page Header ─────────────────────────────────────────── */}
      <PageHeader
        eyebrow="DELIVERABLES CHECKLIST"
        title="Tasks"
        description="Track, organize, and check off deliverables across all your workspace projects."
        action={
          <div className="font-sans text-xs text-[#524D46] font-medium">
            {pendingCount} pending deliverables
          </div>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Workspace Checklist</CardTitle>
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

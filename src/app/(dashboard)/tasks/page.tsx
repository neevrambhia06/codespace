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
        eyebrow="EXECUTION CHECKLIST // SPRINT"
        title="Tasks & Milestones"
        description="Track optimistic checklist items, toggle execution state, and monitor sprint deliverables."
        action={
          <div className="font-mono text-xs text-[#4A443C] uppercase tracking-wider font-semibold">
            {pendingCount} PENDING DELIVERABLES
          </div>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Sprint Checklist</CardTitle>
          <CardDescription>
            {pendingCount} pending task{pendingCount === 1 ? "" : "s"} awaiting execution.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TaskList tasks={tasks} />
        </CardContent>
      </Card>
    </div>
  );
}

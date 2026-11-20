import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Code, CheckCircle2, Circle, Clock, FolderGit2, User as UserIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";

export const dynamic = "force-dynamic";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    select: { name: true, description: true },
  });

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.name} | CodeSpace`,
    description: project.description || "Project details on CodeSpace",
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      tasks: {
        orderBy: { createdAt: "desc" },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  const completedTasks = project.tasks.filter((t) => t.completed).length;
  const totalTasks = project.tasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in-0 duration-300 w-full">
      {/* ── Breadcrumb Navigation ───────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-1">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#4A443C] hover:text-[#D5360C] transition-colors font-bold"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>All Projects</span>
        </Link>
        <span className="font-mono text-xs text-[#101010]/30">/</span>
        <span className="font-mono text-xs uppercase tracking-wider text-[#101010] font-bold">
          {project.name}
        </span>
      </div>

      {/* ── Editorial Page Header ───────────────────────────────────── */}
      <PageHeader
        eyebrow="REPOSITORY INSPECTOR // DETAIL"
        title={project.name}
        description={project.description || "Project telemetry, member ownership, and milestone tracking."}
        action={
          <div className="flex items-center gap-2">
            {project.language && (
              <Badge variant="secondary" className="gap-1">
                <Code className="h-3 w-3" />
                <span>{project.language}</span>
              </Badge>
            )}
            <Badge variant={project.status === "active" ? "accent" : "secondary"}>
              {project.status}
            </Badge>
          </div>
        }
      />

      {/* ── Repository Metadata Card ────────────────────────────────── */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center gap-2.5 p-3 rounded-xs border border-[rgba(16,16,16,0.15)] bg-[#FAF4EA]">
              <UserIcon className="h-4 w-4 text-[#D5360C]" />
              <div>
                <span className="block font-mono text-[10px] text-[#4A443C] uppercase">Repository Owner</span>
                <strong className="text-[#101010] font-sans text-xs">{project.user?.name || "Developer"}</strong>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xs border border-[rgba(16,16,16,0.15)] bg-[#FAF4EA]">
              <Calendar className="h-4 w-4 text-[#D5360C]" />
              <div>
                <span className="block font-mono text-[10px] text-[#4A443C] uppercase">Creation Timestamp</span>
                <strong className="text-[#101010] font-sans text-xs">{new Date(project.createdAt).toLocaleDateString()}</strong>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xs border border-[rgba(16,16,16,0.15)] bg-[#FAF4EA]">
              <Clock className="h-4 w-4 text-[#D5360C]" />
              <div>
                <span className="block font-mono text-[10px] text-[#4A443C] uppercase">Last Mutation</span>
                <strong className="text-[#101010] font-sans text-xs">{new Date(project.updatedAt).toLocaleDateString()}</strong>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Progress & Tasks Section ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Overview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-bold">Execution Progress</CardTitle>
            <CardDescription className="text-xs text-[#4A443C]">
              Completion rate for linked tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-4xl font-bold tracking-tight text-[#101010]">
                {progressPercent}%
              </span>
              <span className="font-mono text-xs text-[#4A443C]">
                {completedTasks} / {totalTasks} done
              </span>
            </div>
            <div className="w-full bg-[#E6D5BD] h-2.5 rounded-full overflow-hidden border border-[#101010]/15">
              <div
                className="bg-[#D5360C] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="pt-3 text-xs text-[#4A443C] space-y-2 border-t border-[#101010]/15 font-mono">
              <div className="flex justify-between">
                <span>PENDING ITEMS:</span>
                <strong className="text-[#101010]">{totalTasks - completedTasks}</strong>
              </div>
              <div className="flex justify-between">
                <span>COMPLETED ITEMS:</span>
                <strong className="text-[#101010]">{completedTasks}</strong>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Tasks List */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold">Linked Sprint Tasks</CardTitle>
              <CardDescription className="text-xs text-[#4A443C]">
                Actionable deliverables assigned to this repository
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-xs">
              {project.tasks.length} total
            </Badge>
          </CardHeader>
          <CardContent>
            {project.tasks.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-[#101010]/25 rounded-xs bg-[#FAF4EA]">
                <p className="font-mono text-xs text-[#4A443C]">No tasks linked to this repository yet.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {project.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-xs border border-[rgba(16,16,16,0.18)] bg-[#FAF4EA] transition-all hover:border-[#101010]/40 hover:shadow-[2px_2px_0px_rgba(16,16,16,0.08)]"
                  >
                    <div className="flex items-center gap-3">
                      {task.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-[#D5360C] shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-[#101010]/40 shrink-0" />
                      )}
                      <span
                        className={`text-xs sm:text-sm font-sans ${
                          task.completed ? "line-through text-[#4A443C]/60" : "font-medium text-[#101010]"
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>

                    <Badge
                      variant={
                        task.priority?.toLowerCase() === "high"
                          ? "accent"
                          : "secondary"
                      }
                      className="text-[9px]"
                    >
                      {task.priority || "NORMAL"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

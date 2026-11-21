import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, CheckCircle2, Circle, Clock, User as UserIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
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
          className="inline-flex items-center gap-1.5 font-sans text-xs text-[#524D46] hover:text-[#D5360C] transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>All Projects</span>
        </Link>
        <span className="font-sans text-xs text-[#101010]/30">/</span>
        <span className="font-sans text-xs text-[#101010] font-semibold truncate max-w-xs">
          {project.name}
        </span>
      </div>

      {/* ── Editorial Page Header ───────────────────────────────────── */}
      <PageHeader
        eyebrow="PROJECT DETAILS"
        title={project.name}
        description={project.description || "Project overview, key deliverables, and milestone tracking."}
        action={
          <div className="flex items-center gap-2">
            {project.language && (
              <Badge variant="secondary">
                <span>{project.language}</span>
              </Badge>
            )}
            <Badge variant={project.status === "active" ? "accent" : "secondary"}>
              {project.status}
            </Badge>
          </div>
        }
      />

      {/* ── Project Metadata Card ───────────────────────────────────── */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center gap-3 p-3 rounded-lg border border-[#101010]/10 bg-[#EDE4D5]/35">
              <UserIcon className="h-4 w-4 text-[#D5360C] shrink-0" />
              <div>
                <span className="block font-sans text-[11px] text-[#524D46]">Project Lead</span>
                <strong className="text-[#101010] font-sans text-xs font-semibold">{project.user?.name || "Alex Morgan"}</strong>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-[#101010]/10 bg-[#EDE4D5]/35">
              <Calendar className="h-4 w-4 text-[#D5360C] shrink-0" />
              <div>
                <span className="block font-sans text-[11px] text-[#524D46]">Date Created</span>
                <strong className="text-[#101010] font-mono text-xs">{new Date(project.createdAt).toLocaleDateString()}</strong>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-[#101010]/10 bg-[#EDE4D5]/35">
              <Clock className="h-4 w-4 text-[#D5360C] shrink-0" />
              <div>
                <span className="block font-sans text-[11px] text-[#524D46]">Last Updated</span>
                <strong className="text-[#101010] font-mono text-xs">{new Date(project.updatedAt).toLocaleDateString()}</strong>
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
            <CardTitle className="text-base font-bold">Task Progress</CardTitle>
            <CardDescription className="text-xs text-[#524D46]">
              Completion rate for project tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="font-sans text-4xl font-bold tracking-tight text-[#101010]">
                {progressPercent}%
              </span>
              <span className="font-mono text-xs text-[#524D46]">
                {completedTasks} / {totalTasks} done
              </span>
            </div>
            <div className="w-full bg-[#EDE4D5] h-2 rounded-full overflow-hidden border border-[#101010]/10">
              <div
                className="bg-[#D5360C] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="pt-3 text-xs text-[#524D46] space-y-2 border-t border-[#101010]/10 font-sans">
              <div className="flex justify-between items-center">
                <span>Pending items:</span>
                <strong className="text-[#101010] font-mono text-xs">{totalTasks - completedTasks}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Completed items:</span>
                <strong className="text-[#101010] font-mono text-xs">{completedTasks}</strong>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Tasks List */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold">Project Tasks</CardTitle>
              <CardDescription className="text-xs text-[#524D46]">
                Deliverables and tasks for this project
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-xs">
              {project.tasks.length} total
            </Badge>
          </CardHeader>
          <CardContent>
            {project.tasks.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-[#101010]/15 rounded-lg bg-[#EDE4D5]/30">
                <p className="font-sans text-xs text-[#524D46]">No tasks linked to this project yet.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {project.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-[#101010]/12 bg-white transition-all hover:border-[#101010]/25 hover:shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      {task.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-[#D5360C] shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-[#101010]/40 shrink-0" />
                      )}
                      <span
                        className={`text-xs sm:text-sm font-sans ${
                          task.completed ? "line-through text-[#524D46]/60" : "font-medium text-[#101010]"
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
                      className="text-[10px]"
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

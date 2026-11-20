import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Code, CheckCircle2, Circle, Clock, FolderGit2, User as UserIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

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
    <div className="flex flex-col gap-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 max-w-5xl mx-auto">
      {/* ── Breadcrumb & Navigation ─────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="gap-1.5 text-[#101010]/70 hover:text-[#D5360C]">
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
        <span className="font-mono text-xs text-[#101010]/30">/</span>
        <Button variant="ghost" size="sm" asChild className="gap-1.5 text-[#101010]/70 hover:text-[#D5360C]">
          <Link href="/dashboard">
            Dashboard
          </Link>
        </Button>
      </div>

      {/* ── Project Header Card ─────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                <FolderGit2 className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                  {project.name}
                </CardTitle>
                <CardDescription className="text-sm mt-1 text-muted-foreground">
                  {project.description || "No description provided for this project."}
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              {project.language && (
                <Badge variant="secondary" className="gap-1">
                  <Code className="h-3 w-3" />
                  {project.language}
                </Badge>
              )}
              <Badge variant={project.status === "active" ? "default" : "secondary"}>
                {project.status}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-primary" />
              <span>Owner: <strong className="text-foreground">{project.user?.name || "Developer"}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>Last updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Progress & Tasks Section ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Overview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Task Progress</CardTitle>
            <CardDescription className="text-xs">
              Completion rate for project tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold tracking-tight text-foreground">{progressPercent}%</span>
              <span className="text-xs text-muted-foreground">{completedTasks} of {totalTasks} done</span>
            </div>
            <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="pt-2 text-xs text-muted-foreground space-y-1.5 border-t border-border">
              <div className="flex justify-between">
                <span>Pending Tasks</span>
                <span className="font-medium text-foreground">{totalTasks - completedTasks}</span>
              </div>
              <div className="flex justify-between">
                <span>Completed Tasks</span>
                <span className="font-medium text-foreground">{completedTasks}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Tasks List */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-semibold">Project Tasks</CardTitle>
              <CardDescription className="text-xs">
                Tasks associated with {project.name}
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              {project.tasks.length} total
            </Badge>
          </CardHeader>
          <CardContent>
            {project.tasks.length === 0 ? (
              <div className="text-center py-8 border border-dashed rounded-lg">
                <p className="text-xs text-muted-foreground">No tasks linked to this project yet.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {project.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border/60 hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {task.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                      )}
                      <span
                        className={`text-sm ${
                          task.completed ? "line-through text-muted-foreground" : "font-medium text-foreground"
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>

                    <Badge
                      variant={
                        task.priority === "high"
                          ? "destructive"
                          : task.priority === "medium"
                          ? "warning"
                          : "secondary"
                      }
                      className="text-[10px] capitalize"
                    >
                      {task.priority}
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

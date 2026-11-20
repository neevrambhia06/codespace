import {
  Code2,
  FolderOpen,
  Terminal,
  Activity,
  Clock,
  FileText,
} from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { ProjectList } from "@/components/dashboard/ProjectList";
import { TaskList } from "@/components/dashboard/TaskList";
import { CreateNoteButton } from "@/components/dashboard/CreateNoteButton";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Project, Task, Note, CodeSnippet, AuditLog } from "@prisma/client";

// Dashboard reads live, mutation-driven data (projects/tasks/notes are
// created via Server Actions and revalidated with revalidatePath("/")).
// Force dynamic rendering so it always hits the database instead of being
// statically prerendered at build time (which also removes the build-time
// dependency on database availability).
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard",
  description: `Welcome to ${APP_NAME}`,
  openGraph: {
    images: [
      {
        url: `/api/og?title=Dashboard&description=${encodeURIComponent(`Welcome to ${APP_NAME}`)}`,
        width: 1200,
        height: 630,
        alt: "Dashboard Open Graph Image",
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`/api/og?title=Dashboard&description=${encodeURIComponent(`Welcome to ${APP_NAME}`)}`],
  }
};

export default async function DashboardPage() {
  const [dbProjects, dbTasks, dbNotes, dbSnippets, dbActivities] = await Promise.all([
    prisma.project.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
    prisma.task.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
    prisma.note.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
    prisma.codeSnippet.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  // Map Prisma data to plain objects for Client Components
  const projects = dbProjects.map((p: Project) => ({
    ...p,
    lastUpdated: p.updatedAt.toLocaleDateString(),
  }));

  const tasks = dbTasks.map((t: Task) => ({
    ...t,
  }));

  const notes = dbNotes.map((n: Note) => ({
    ...n,
    date: n.createdAt.toLocaleDateString(),
  }));

  const snippets = dbSnippets.map((s: CodeSnippet) => ({
    ...s,
  }));

  const activities = dbActivities.map((a: AuditLog) => ({
    ...a,
    time: a.createdAt.toLocaleDateString(),
  }));

  return (
    <div className="flex flex-col gap-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
      {/* ── Welcome ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="welcome-heading">
        <div className="flex flex-col gap-1">
          <h2
            id="welcome-heading"
            className="text-2xl font-semibold tracking-tight text-foreground"
          >
            Good evening, Developer
          </h2>
          <p className="text-sm text-muted-foreground">
            Welcome to {APP_NAME} — your all-in-one developer workspace.
          </p>
        </div>
      </section>

      {/* ── Stats row ────────────────────────────────────────────────────── */}
      <section aria-labelledby="stats-heading">
        <h3 id="stats-heading" className="sr-only">
          Workspace stats
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="animate-in fade-in-0 slide-in-from-bottom-1 duration-500 transition-shadow hover:shadow-md [animation-delay:40ms] [animation-fill-mode:backwards]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{projects.length}</div>
              <p className="text-xs text-muted-foreground">
                Total active projects
              </p>
            </CardContent>
          </Card>
          <Card className="animate-in fade-in-0 slide-in-from-bottom-1 duration-500 transition-shadow hover:shadow-md [animation-delay:80ms] [animation-fill-mode:backwards]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">
                {tasks.filter((t: Task) => !t.completed).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Pending completion
              </p>
            </CardContent>
          </Card>
          <Card className="animate-in fade-in-0 slide-in-from-bottom-1 duration-500 transition-shadow hover:shadow-md [animation-delay:120ms] [animation-fill-mode:backwards]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Session Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">2h 34m</div>
              <p className="text-xs text-muted-foreground">
                Active since 16:12
              </p>
            </CardContent>
          </Card>
          <Card className="animate-in fade-in-0 slide-in-from-bottom-1 duration-500 transition-shadow hover:shadow-md [animation-delay:160ms] [animation-fill-mode:backwards]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Snippets</CardTitle>
              <Terminal className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{snippets.length}</div>
              <p className="text-xs text-muted-foreground">
                Saved code snippets
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Main Grid ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        {/* Left Column */}
        <div className="flex flex-col gap-4 lg:col-span-4">
          {/* Projects Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>
                You have {projects.length} total projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectList projects={projects} />
            </CardContent>
          </Card>

          {/* Tasks Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Current Tasks</CardTitle>
              <CardDescription>
                {tasks.filter((t: Task) => !t.completed).length} pending tasks to complete.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList tasks={tasks} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4 lg:col-span-3">
          {/* Knowledge Base */}
          <Card className="flex flex-1 flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Knowledge Base</CardTitle>
              <CreateNoteButton />
            </CardHeader>
            <CardContent className="flex-1">
              <Tabs defaultValue="notes" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="snippets">Snippets</TabsTrigger>
                </TabsList>
                <TabsContent value="notes" className="mt-4 space-y-4">
                  {notes.length === 0 ? (
                    <p className="rounded-md border border-dashed p-4 text-center text-xs text-muted-foreground">
                      No notes yet. Create one to get started.
                    </p>
                  ) : (
                  notes.map((note) => (
                    <div
                      key={note.id}
                      className="flex flex-col gap-1 rounded-md border p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold flex items-center gap-2">
                          <FileText className="h-3.5 w-3.5 text-primary" />
                          {note.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {note.date}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {note.snippet}
                      </p>
                    </div>
                  )))}
                </TabsContent>
                <TabsContent value="snippets" className="mt-4 space-y-4">
                  {snippets.length === 0 ? (
                    <p className="rounded-md border border-dashed p-4 text-center text-xs text-muted-foreground">
                      No snippets yet. Save one to get started.
                    </p>
                  ) : (
                  snippets.map((snippet) => (
                    <div
                      key={snippet.id}
                      className="flex flex-col gap-2 rounded-md border p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold flex items-center gap-2">
                          <Code2 className="h-3.5 w-3.5 text-primary" />
                          {snippet.title}
                        </span>
                        <Badge variant="secondary" className="text-[10px]">
                          {snippet.language}
                        </Badge>
                      </div>
                      <pre className="overflow-hidden rounded bg-muted/50 p-2 text-[10px] text-muted-foreground">
                        <code>{snippet.code}</code>
                      </pre>
                    </div>
                  )))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {activities.length === 0 ? (
                <p className="rounded-md border border-dashed p-4 text-center text-xs text-muted-foreground">
                  No recent activity.
                </p>
              ) : (
              <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-2 before:w-0.5 before:bg-border pl-6">
                {activities.map((activity) => (
                  <div key={activity.id} className="relative">
                    <span className="absolute -left-6 mt-1 flex h-2 w-2 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium">
                        {activity.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {activity.description}
                      </span>
                      <span className="text-[10px] text-muted-foreground mt-1">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

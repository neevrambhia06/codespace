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
import { PageHeader } from "@/components/layout/PageHeader";
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

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard",
  description: `Welcome to ${APP_NAME} — Sovereign Workspace`,
};

export default async function DashboardPage() {
  const [dbProjects, dbTasks, dbNotes, dbSnippets, dbActivities] = await Promise.all([
    prisma.project.findMany({ orderBy: { updatedAt: "desc" }, take: 6 }),
    prisma.task.findMany({ orderBy: { updatedAt: "desc" }, take: 6 }),
    prisma.note.findMany({ orderBy: { updatedAt: "desc" }, take: 6 }),
    prisma.codeSnippet.findMany({ orderBy: { updatedAt: "desc" }, take: 6 }),
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
  ]);

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

  const pendingTasksCount = tasks.filter((t: Task) => !t.completed).length;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in-0 duration-300 w-full">
      {/* ── Editorial Page Header ─────────────────────────────────────────── */}
      <PageHeader
        eyebrow="WORKSPACE OVERVIEW"
        title="Workspace Overview"
        description="Monitor active initiatives, pending deliverables, and team knowledge across your workspace."
        action={
          <div className="flex items-center gap-2 font-sans text-xs text-[#524D46] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#2A6E3B]" />
            <span>Active & Synchronized</span>
          </div>
        }
      />

      {/* ── Stats Row ─────────────────────────────────────────────────────── */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Workspace stats
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:border-[#101010]/25 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-sans text-xs font-semibold uppercase tracking-wider text-[#524D46]">
                Active Projects
              </CardTitle>
              <FolderOpen className="h-4 w-4 text-[#D5360C]" />
            </CardHeader>
            <CardContent>
              <div className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-[#101010]">
                {projects.length}
              </div>
              <p className="font-sans text-xs text-[#524D46] mt-1">
                Initiatives tracked
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-[#101010]/25 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-sans text-xs font-semibold uppercase tracking-wider text-[#524D46]">
                Pending Tasks
              </CardTitle>
              <Activity className="h-4 w-4 text-[#D5360C]" />
            </CardHeader>
            <CardContent>
              <div className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-[#101010]">
                {pendingTasksCount}
              </div>
              <p className="font-sans text-xs text-[#524D46] mt-1">
                Pending completion
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-[#101010]/25 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-sans text-xs font-semibold uppercase tracking-wider text-[#524D46]">
                Saved Snippets
              </CardTitle>
              <Terminal className="h-4 w-4 text-[#D5360C]" />
            </CardHeader>
            <CardContent>
              <div className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-[#101010]">
                {snippets.length}
              </div>
              <p className="font-sans text-xs text-[#524D46] mt-1">
                Code patterns retained
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-[#101010]/25 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-sans text-xs font-semibold uppercase tracking-wider text-[#524D46]">
                Knowledge Notes
              </CardTitle>
              <FileText className="h-4 w-4 text-[#D5360C]" />
            </CardHeader>
            <CardContent>
              <div className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-[#101010]">
                {notes.length}
              </div>
              <p className="font-sans text-xs text-[#524D46] mt-1">
                Documentation records
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Main Workspace Grid ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Recent Projects & Tasks */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>
                {projects.length} repositories currently active in this workspace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectList projects={projects} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deliverables Checklist</CardTitle>
              <CardDescription>
                Track and manage your team deliverables and priorities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList tasks={tasks} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Knowledge Base & Activity */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Knowledge Base</CardTitle>
                <CardDescription>
                  Curated notes & scripts
                </CardDescription>
              </div>
              <CreateNoteButton />
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="notes" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-[#EDE4D5] border border-[#101010]/10 p-1 rounded-lg">
                  <TabsTrigger
                    value="notes"
                    className="font-sans text-xs font-semibold rounded-md data-[state=active]:bg-[#D5360C] data-[state=active]:text-white text-[#101010] cursor-pointer"
                  >
                    Notes ({notes.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="snippets"
                    className="font-sans text-xs font-semibold rounded-md data-[state=active]:bg-[#D5360C] data-[state=active]:text-white text-[#101010] cursor-pointer"
                  >
                    Snippets ({snippets.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="notes" className="mt-4 space-y-3">
                  {notes.length === 0 ? (
                    <p className="text-xs font-sans text-[#524D46] p-6 border border-dashed border-[#101010]/15 rounded-lg text-center bg-[#EDE4D5]/30">
                      No notes created yet.
                    </p>
                  ) : (
                    notes.map((note) => (
                      <div
                        key={note.id}
                        className="rounded-lg border border-[#101010]/12 bg-white p-3.5 transition-all duration-200 hover:border-[#101010]/25 hover:shadow-xs"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-sans text-sm font-semibold text-[#101010] flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-[#D5360C] shrink-0" />
                            <span>{note.title}</span>
                          </h4>
                          <span className="font-mono text-xs text-[#524D46]">
                            {note.date}
                          </span>
                        </div>
                        <p className="text-xs text-[#524D46] line-clamp-2 leading-relaxed font-normal">
                          {note.snippet}
                        </p>
                      </div>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="snippets" className="mt-4 space-y-3">
                  {snippets.length === 0 ? (
                    <p className="text-xs font-sans text-[#524D46] p-6 border border-dashed border-[#101010]/15 rounded-lg text-center bg-[#EDE4D5]/30">
                      No code snippets found.
                    </p>
                  ) : (
                    snippets.map((snip) => (
                      <div
                        key={snip.id}
                        className="rounded-lg border border-[#101010]/12 bg-white p-3.5 transition-all duration-200 hover:border-[#101010]/25 hover:shadow-xs"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-sans text-sm font-semibold text-[#101010] flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5 text-[#D5360C] shrink-0" />
                            <span>{snip.title}</span>
                          </h4>
                          <Badge variant="default" className="text-[10px]">
                            {snip.language}
                          </Badge>
                        </div>
                        <pre className="p-2.5 rounded-md bg-[#F7F4EF] text-xs font-mono text-[#101010] overflow-x-auto border border-[#101010]/10">
                          <code>{snip.code}</code>
                        </pre>
                      </div>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates across your workspace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities.length === 0 ? (
                  <p className="text-xs font-sans text-[#524D46] p-4 border border-dashed border-[#101010]/15 rounded-lg text-center bg-[#EDE4D5]/30">
                    No activity recorded yet.
                  </p>
                ) : (
                  activities.map((act) => (
                    <div
                      key={act.id}
                      className="flex items-center justify-between text-xs pb-2.5 border-b border-[#101010]/10 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#D5360C] shrink-0" />
                        <span className="font-medium text-[#101010]">{act.title}</span>
                        {act.description && (
                          <span className="text-xs text-[#524D46]">
                            {act.description}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-[#524D46]">
                        {act.time}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

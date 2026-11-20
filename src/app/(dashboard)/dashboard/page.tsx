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
  description: `Welcome to ${APP_NAME} — Sovereign Developer Workspace`,
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
        eyebrow="WORKSPACE DISPATCH // CODESPACE CONSOLE"
        title="System Overview & Metrics"
        action={
          <div className="flex items-center gap-2 font-mono text-xs text-[#4A443C] uppercase tracking-wider font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#2A6E3B]" />
            <span>POSTGRESQL CONNECTED // FLOW STATE</span>
          </div>
        }
      />

      {/* ── Stats Row ─────────────────────────────────────────────────────── */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Workspace stats
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:border-[#101010]/40 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-mono text-xs font-bold uppercase tracking-wider text-[#4A443C]">
                ACTIVE PROJECTS
              </CardTitle>
              <FolderOpen className="h-4 w-4 text-[#D5360C]" />
            </CardHeader>
            <CardContent>
              <div className="font-display text-4xl font-bold tracking-tight text-[#101010]">
                {projects.length}
              </div>
              <p className="font-mono text-[11px] text-[#4A443C] mt-1 uppercase tracking-wider">
                Initiatives tracked
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-[#101010]/40 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-mono text-xs font-bold uppercase tracking-wider text-[#4A443C]">
                PENDING TASKS
              </CardTitle>
              <Activity className="h-4 w-4 text-[#D5360C]" />
            </CardHeader>
            <CardContent>
              <div className="font-display text-4xl font-bold tracking-tight text-[#101010]">
                {pendingTasksCount}
              </div>
              <p className="font-mono text-[11px] text-[#4A443C] mt-1 uppercase tracking-wider">
                Pending completion
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-[#101010]/40 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-mono text-xs font-bold uppercase tracking-wider text-[#4A443C]">
                SAVED SNIPPETS
              </CardTitle>
              <Terminal className="h-4 w-4 text-[#D5360C]" />
            </CardHeader>
            <CardContent>
              <div className="font-display text-4xl font-bold tracking-tight text-[#101010]">
                {snippets.length}
              </div>
              <p className="font-mono text-[11px] text-[#4A443C] mt-1 uppercase tracking-wider">
                Code patterns retained
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-[#101010]/40 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-mono text-xs font-bold uppercase tracking-wider text-[#4A443C]">
                KNOWLEDGE NOTES
              </CardTitle>
              <FileText className="h-4 w-4 text-[#D5360C]" />
            </CardHeader>
            <CardContent>
              <div className="font-display text-4xl font-bold tracking-tight text-[#101010]">
                {notes.length}
              </div>
              <p className="font-mono text-[11px] text-[#4A443C] mt-1 uppercase tracking-wider">
                Architectural records
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
              <CardTitle>Task Execution Board</CardTitle>
              <CardDescription>
                Live optimistic state with role-based write permissions.
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
                <TabsList className="grid w-full grid-cols-2 bg-[#E6D5BD] border border-[#101010]/20 p-1 rounded-xs">
                  <TabsTrigger
                    value="notes"
                    className="font-mono text-xs uppercase tracking-wider font-bold data-[state=active]:bg-[#D5360C] data-[state=active]:text-[#F4EBDD] text-[#101010] rounded-xs"
                  >
                    NOTES ({notes.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="snippets"
                    className="font-mono text-xs uppercase tracking-wider font-bold data-[state=active]:bg-[#D5360C] data-[state=active]:text-[#F4EBDD] text-[#101010] rounded-xs"
                  >
                    SNIPPETS ({snippets.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="notes" className="mt-4 space-y-3">
                  {notes.length === 0 ? (
                    <p className="text-xs font-mono text-[#4A443C] p-6 border border-dashed border-[#101010]/25 rounded-xs text-center bg-[#F4EBDD]/50">
                      No notes created yet.
                    </p>
                  ) : (
                    notes.map((note) => (
                      <div
                        key={note.id}
                        className="rounded-xs border border-[rgba(16,16,16,0.22)] bg-[#F4EBDD] p-3.5 transition-all duration-200 hover:bg-[#FAF4EA] hover:border-[#101010]/40 hover:shadow-[2px_2px_0px_rgba(16,16,16,0.08)]"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-display text-sm font-bold text-[#101010] flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-[#D5360C] shrink-0" />
                            <span>{note.title}</span>
                          </h4>
                          <span className="font-mono text-[10px] text-[#4A443C]">
                            {note.date}
                          </span>
                        </div>
                        <p className="text-xs text-[#4A443C] line-clamp-2 leading-relaxed">
                          {note.snippet}
                        </p>
                      </div>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="snippets" className="mt-4 space-y-3">
                  {snippets.length === 0 ? (
                    <p className="text-xs font-mono text-[#4A443C] p-6 border border-dashed border-[#101010]/25 rounded-xs text-center bg-[#F4EBDD]/50">
                      No code snippets found.
                    </p>
                  ) : (
                    snippets.map((snip) => (
                      <div
                        key={snip.id}
                        className="rounded-xs border border-[rgba(16,16,16,0.22)] bg-[#F4EBDD] p-3.5 transition-all duration-200 hover:bg-[#FAF4EA] hover:border-[#101010]/40 hover:shadow-[2px_2px_0px_rgba(16,16,16,0.08)]"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-display text-sm font-bold text-[#101010] flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5 text-[#D5360C] shrink-0" />
                            <span>{snip.title}</span>
                          </h4>
                          <Badge variant="default" className="text-[9px]">
                            {snip.language}
                          </Badge>
                        </div>
                        <pre className="p-2.5 rounded-xs bg-[#E6D5BD]/60 text-[11px] font-mono text-[#101010] overflow-x-auto border border-[#101010]/15">
                          <code>{snip.code}</code>
                        </pre>
                      </div>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Audit Log / Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Stream</CardTitle>
              <CardDescription>
                System telemetry and administrative logs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities.length === 0 ? (
                  <p className="text-xs font-mono text-[#4A443C] p-4 border border-dashed border-[#101010]/25 rounded-xs text-center bg-[#F4EBDD]/50">
                    No activity recorded yet.
                  </p>
                ) : (
                  activities.map((act) => (
                    <div
                      key={act.id}
                      className="flex items-center justify-between text-xs pb-2.5 border-b border-[#101010]/15 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#D5360C] shrink-0" />
                        <span className="font-medium text-[#101010]">{act.title}</span>
                        {act.description && (
                          <span className="text-[11px] text-[#4A443C] font-mono">
                            {act.description}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-[10px] text-[#4A443C]">
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

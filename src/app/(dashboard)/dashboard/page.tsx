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
    <div className="flex flex-col gap-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 max-w-7xl mx-auto">
      {/* ── Welcome Header ────────────────────────────────────────────────── */}
      <section aria-labelledby="welcome-heading" className="border-b border-[#101010]/15 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-[#D5360C] font-bold mb-1.5">
              <span>WORKSPACE DISPATCH // CODESPACE CONSOLE</span>
            </div>
            <h2
              id="welcome-heading"
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#101010]"
            >
              System Overview & Metrics
            </h2>
          </div>
          <p className="font-mono text-xs text-[#101010]/60 uppercase tracking-wider">
            STATUS: POSTGRESQL CONNECTED // FLOW STATE
          </p>
        </div>
      </section>

      {/* ── Stats Row ─────────────────────────────────────────────────────── */}
      <section aria-labelledby="stats-heading">
        <h3 id="stats-heading" className="sr-only">
          Workspace stats
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:border-[#101010]/30 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-mono text-xs font-bold uppercase tracking-wider text-[#101010]/70">
                ACTIVE PROJECTS
              </CardTitle>
              <FolderOpen className="h-4 w-4 text-[#D5360C]" />
            </CardHeader>
            <CardContent>
              <div className="font-display text-3xl font-bold text-[#101010]">{projects.length}</div>
              <p className="text-[11px] text-[#101010]/60 mt-1 font-mono">
                Initiatives tracked
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-[#101010]/30 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-mono text-xs font-bold uppercase tracking-wider text-[#101010]/70">
                PENDING TASKS
              </CardTitle>
              <Activity className="h-4 w-4 text-[#D5360C]" />
            </CardHeader>
            <CardContent>
              <div className="font-display text-3xl font-bold text-[#101010]">
                {pendingTasksCount}
              </div>
              <p className="text-[11px] text-[#101010]/60 mt-1 font-mono">
                Pending completion
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-[#101010]/30 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-mono text-xs font-bold uppercase tracking-wider text-[#101010]/70">
                SAVED SNIPPETS
              </CardTitle>
              <Terminal className="h-4 w-4 text-[#D5360C]" />
            </CardHeader>
            <CardContent>
              <div className="font-display text-3xl font-bold text-[#101010]">{snippets.length}</div>
              <p className="text-[11px] text-[#101010]/60 mt-1 font-mono">
                Code patterns retained
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-[#101010]/30 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-mono text-xs font-bold uppercase tracking-wider text-[#101010]/70">
                KNOWLEDGE NOTES
              </CardTitle>
              <FileText className="h-4 w-4 text-[#D5360C]" />
            </CardHeader>
            <CardContent>
              <div className="font-display text-3xl font-bold text-[#101010]">{notes.length}</div>
              <p className="text-[11px] text-[#101010]/60 mt-1 font-mono">
                Architectural records
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Main Grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
        {/* Left Column (Projects & Tasks) */}
        <div className="flex flex-col gap-6 lg:col-span-4">
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
              <CardTitle>Actionable Tasks</CardTitle>
              <CardDescription>
                {pendingTasksCount} tasks pending immediate review or completion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList tasks={tasks} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column (Knowledge & Activity) */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          <Card className="flex flex-1 flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Knowledge Base</CardTitle>
                <CardDescription>Curated notes & scripts</CardDescription>
              </div>
              <CreateNoteButton />
            </CardHeader>
            <CardContent className="flex-1">
              <Tabs defaultValue="notes" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-xs border border-[#101010]/15 bg-[#E6D5BD]">
                  <TabsTrigger
                    value="notes"
                    className="font-mono text-xs uppercase data-[state=active]:bg-[#D5360C] data-[state=active]:text-[#E6D5BD]"
                  >
                    Notes ({notes.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="snippets"
                    className="font-mono text-xs uppercase data-[state=active]:bg-[#D5360C] data-[state=active]:text-[#E6D5BD]"
                  >
                    Snippets ({snippets.length})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="notes" className="mt-4 space-y-3">
                  {notes.length === 0 ? (
                    <p className="rounded-xs border border-dashed border-[#101010]/20 p-4 text-center text-xs text-[#101010]/60 font-mono">
                      No notes yet. Create one to capture decisions.
                    </p>
                  ) : (
                    notes.map((note) => (
                      <div
                        key={note.id}
                        className="flex flex-col gap-1 rounded-xs border border-[#101010]/15 bg-[#E6D5BD]/50 p-3 hover:bg-[#E6D5BD] transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold flex items-center gap-2 text-[#101010]">
                            <FileText className="h-3.5 w-3.5 text-[#D5360C]" />
                            {note.title}
                          </span>
                          <span className="font-mono text-[9px] text-[#101010]/50">
                            {note.date}
                          </span>
                        </div>
                        <p className="text-xs text-[#101010]/70 font-light line-clamp-2 mt-1">
                          {note.snippet}
                        </p>
                      </div>
                    ))
                  )}
                </TabsContent>
                <TabsContent value="snippets" className="mt-4 space-y-3">
                  {snippets.length === 0 ? (
                    <p className="rounded-xs border border-dashed border-[#101010]/20 p-4 text-center text-xs text-[#101010]/60 font-mono">
                      No snippets yet. Save one to get started.
                    </p>
                  ) : (
                    snippets.map((snippet) => (
                      <div
                        key={snippet.id}
                        className="flex flex-col gap-2 rounded-xs border border-[#101010]/15 bg-[#E6D5BD]/50 p-3 hover:bg-[#E6D5BD] transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold flex items-center gap-2 text-[#101010]">
                            <Code2 className="h-3.5 w-3.5 text-[#D5360C]" />
                            {snippet.title}
                          </span>
                          <Badge variant="secondary" className="text-[9px]">
                            {snippet.language}
                          </Badge>
                        </div>
                        <pre className="overflow-x-auto rounded-xs bg-[#101010] p-2.5 font-mono text-[10px] text-[#E6D5BD]/90">
                          <code>{snippet.code}</code>
                        </pre>
                      </div>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Audit Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Audit & Activity Log</CardTitle>
              <CardDescription>Real-time event ledger from PostgreSQL</CardDescription>
            </CardHeader>
            <CardContent>
              {activities.length === 0 ? (
                <p className="rounded-xs border border-dashed border-[#101010]/20 p-4 text-center text-xs text-[#101010]/60 font-mono">
                  No recent audit records.
                </p>
              ) : (
                <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-2 before:w-px before:bg-[#101010]/20 pl-6">
                  {activities.map((activity) => (
                    <div key={activity.id} className="relative">
                      <span className="absolute -left-6 mt-1 flex h-2 w-2 items-center justify-center rounded-full bg-[#D5360C] ring-4 ring-[#EFE3D1]" />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-[#101010]">
                          {activity.title}
                        </span>
                        <span className="text-xs text-[#101010]/70 font-light">
                          {activity.description}
                        </span>
                        <span className="font-mono text-[9px] text-[#101010]/50 mt-0.5">
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

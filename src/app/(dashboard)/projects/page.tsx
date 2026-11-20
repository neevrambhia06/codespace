import { prisma } from "@/lib/prisma";
import { ProjectList } from "@/components/dashboard/ProjectList";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Project } from "@prisma/client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects | CodeSpace",
  description: "Manage and track your active workspace projects.",
};

export default async function ProjectsPage() {
  const dbProjects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
  });

  const projects = dbProjects.map((p: Project) => ({
    ...p,
    lastUpdated: p.updatedAt.toLocaleDateString(),
  }));

  return (
    <div className="flex flex-col gap-6 animate-in fade-in-0 duration-300 w-full">
      {/* ── Editorial Page Header ─────────────────────────────────────────── */}
      <PageHeader
        eyebrow="REPOSITORY ARCHITECTURE // DIRECTORY"
        title="Projects & Repositories"
        description="Create, track, and inspect all software initiatives in your workspace."
        action={
          <div className="font-mono text-xs text-[#4A443C] uppercase tracking-wider font-semibold">
            {projects.length} ACTIVE REPOSITORIES
          </div>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Workspace Repositories</CardTitle>
          <CardDescription>
            You have {projects.length} total projects cataloged in this database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectList projects={projects} />
        </CardContent>
      </Card>
    </div>
  );
}

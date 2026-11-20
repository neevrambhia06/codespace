import { prisma } from "@/lib/prisma";
import { ProjectList } from "@/components/dashboard/ProjectList";
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
    <div className="flex flex-col gap-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Projects</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create, track, and organize your software repositories and initiatives.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>
            You have {projects.length} total projects in this workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectList projects={projects} />
        </CardContent>
      </Card>
    </div>
  );
}

import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() || "";

  // If query is empty, return empty results or top recent items
  if (!q) {
    try {
      const [recentProjects, recentNotes, recentSnippets] = await Promise.all([
        prisma.project.findMany({
          take: 4,
          orderBy: { updatedAt: "desc" },
          select: { id: true, name: true, description: true, status: true },
        }),
        prisma.note.findMany({
          take: 3,
          orderBy: { updatedAt: "desc" },
          select: { id: true, title: true, snippet: true },
        }),
        prisma.codeSnippet.findMany({
          take: 3,
          orderBy: { updatedAt: "desc" },
          select: { id: true, title: true, language: true },
        }),
      ]);

      return NextResponse.json({
        projects: recentProjects,
        tasks: [],
        notes: recentNotes,
        snippets: recentSnippets,
      });
    } catch {
      return NextResponse.json({ projects: [], tasks: [], notes: [], snippets: [] });
    }
  }

  try {
    const [projects, tasks, notes, snippets] = await Promise.all([
      prisma.project.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        },
        take: 6,
        select: { id: true, name: true, description: true, status: true },
      }),
      prisma.task.findMany({
        where: {
          title: { contains: q, mode: "insensitive" },
        },
        take: 6,
        select: { id: true, title: true, priority: true, completed: true, projectId: true },
      }),
      prisma.note.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { snippet: { contains: q, mode: "insensitive" } },
          ],
        },
        take: 6,
        select: { id: true, title: true, snippet: true },
      }),
      prisma.codeSnippet.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { language: { contains: q, mode: "insensitive" } },
          ],
        },
        take: 6,
        select: { id: true, title: true, language: true },
      }),
    ]);

    return NextResponse.json({
      projects,
      tasks,
      notes,
      snippets,
    });
  } catch (error) {
    console.error("[Search API Error]", error);
    return NextResponse.json({ projects: [], tasks: [], notes: [], snippets: [] }, { status: 500 });
  }
}

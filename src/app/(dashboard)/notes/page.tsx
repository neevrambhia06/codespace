import { prisma } from "@/lib/prisma";
import { CreateNoteButton } from "@/components/dashboard/CreateNoteButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { FileText, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Notes | CodeSpace",
  description: "Knowledge base and documentation notes.",
};

export default async function NotesPage() {
  const dbNotes = await prisma.note.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Notes & Documentation</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Capture architectural decisions, meeting memos, and personal notes.
          </p>
        </div>
        <CreateNoteButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dbNotes.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center text-muted-foreground">
              <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notes found. Create your first note above!</p>
            </CardContent>
          </Card>
        ) : (
          dbNotes.map((note) => (
            <Card key={note.id} className="hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary shrink-0" />
                    {note.title}
                  </CardTitle>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {note.snippet}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

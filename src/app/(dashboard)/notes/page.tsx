import { prisma } from "@/lib/prisma";
import { CreateNoteButton } from "@/components/dashboard/CreateNoteButton";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
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
    <div className="flex flex-col gap-6 animate-in fade-in-0 duration-300 w-full">
      {/* ── Editorial Page Header ─────────────────────────────────────────── */}
      <PageHeader
        eyebrow="KNOWLEDGE & DOCUMENTATION"
        title="Notes"
        description="Capture important takeaways, project notes, and team documentation."
        action={<CreateNoteButton />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dbNotes.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center text-[#4A443C]">
              <FileText className="h-8 w-8 mx-auto mb-2 text-[#D5360C]/60" />
              <p className="font-mono text-xs uppercase tracking-wider">
                No notes found. Click &quot;+ New Note&quot; to create one.
              </p>
            </CardContent>
          </Card>
        ) : (
          dbNotes.map((note) => (
            <Card key={note.id} className="hover:border-[#101010]/40 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#D5360C] shrink-0" />
                    <span>{note.title}</span>
                  </CardTitle>
                  <span className="font-mono text-[10px] text-[#4A443C] flex items-center gap-1 uppercase tracking-wider">
                    <Calendar className="h-3 w-3" />
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-[#4A443C] whitespace-pre-wrap leading-relaxed font-sans">
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

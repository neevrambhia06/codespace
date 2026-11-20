import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/layout/PageHeader";
import { Code2 } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Code Snippets | CodeSpace",
  description: "Curated code snippets and reusable utilities.",
};

export default async function SnippetsPage() {
  const snippets = await prisma.codeSnippet.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6 animate-in fade-in-0 duration-300 w-full">
      {/* ── Editorial Page Header ─────────────────────────────────────────── */}
      <PageHeader
        eyebrow="TEMPLATES & SNIPPETS"
        title="Snippets & Templates"
        description="Quickly access and copy reusable code snippets, commands, and templates."
        action={
          <div className="font-mono text-xs text-[#4A443C] uppercase tracking-wider font-semibold">
            {snippets.length} SAVED TEMPLATES
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {snippets.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center text-[#4A443C]">
              <Code2 className="h-8 w-8 mx-auto mb-2 text-[#D5360C]/60" />
              <p className="font-mono text-xs uppercase tracking-wider">
                No snippets saved in this workspace yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          snippets.map((snippet) => (
            <Card key={snippet.id} className="overflow-hidden hover:border-[#101010]/40 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-[#D5360C] shrink-0" />
                    <span>{snippet.title}</span>
                  </CardTitle>
                  <Badge variant="default" className="text-xs uppercase font-mono">
                    {snippet.language}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="rounded-xs bg-[#E6D5BD]/60 p-3 text-xs font-mono text-[#101010] border border-[#101010]/15 overflow-x-auto">
                  <code>{snippet.code}</code>
                </pre>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

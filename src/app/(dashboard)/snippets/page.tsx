import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
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
    <div className="flex flex-col gap-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Code Snippets</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Quickly access and copy reusable patterns, scripts, and algorithms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {snippets.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center text-muted-foreground">
              <Code2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No snippets saved yet.</p>
            </CardContent>
          </Card>
        ) : (
          snippets.map((snippet) => (
            <Card key={snippet.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-primary shrink-0" />
                    {snippet.title}
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs uppercase font-mono">
                    {snippet.language}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="rounded-lg bg-muted/60 p-3 text-xs font-mono text-muted-foreground overflow-x-auto">
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

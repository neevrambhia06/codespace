import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Puzzle, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Extensions | CodeSpace",
  description: "Workspace extensions and tools.",
};

const EXTENSIONS = [
  {
    name: "Prisma Studio",
    description: "Visual database explorer and editor for PostgreSQL.",
    category: "Database",
    status: "Installed",
  },
  {
    name: "Better Auth Provider",
    description: "Session management and role-based access control.",
    category: "Security",
    status: "Installed",
  },
  {
    name: "Dynamic OG Generator",
    description: "Satori-powered dynamic Open Graph social card renderer.",
    category: "Social",
    status: "Installed",
  },
  {
    name: "Lighthouse Performance Profiler",
    description: "Core Web Vitals monitoring and accessibility scoring.",
    category: "Analytics",
    status: "Installed",
  },
];

export default function ExtensionsPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Workspace Extensions</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Explore installed plugins and integrations enhancing your developer environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EXTENSIONS.map((ext) => (
          <Card key={ext.name}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Puzzle className="h-4 w-4 text-primary shrink-0" />
                  {ext.name}
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {ext.category}
                </Badge>
              </div>
              <CardDescription className="text-xs mt-1">
                {ext.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{ext.status}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

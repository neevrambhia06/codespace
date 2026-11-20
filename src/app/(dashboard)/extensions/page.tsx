import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/layout/PageHeader";
import { Puzzle, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Extensions | CodeSpace",
  description: "Workspace extensions and tools.",
};

const EXTENSIONS = [
  {
    name: "Prisma Studio",
    description: "Visual database explorer and editor for Neon PostgreSQL.",
    category: "Database",
    status: "Installed",
  },
  {
    name: "Better Auth Provider",
    description: "Session management and role-based cryptographic access control.",
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
    name: "Lighthouse Profiler",
    description: "Core Web Vitals monitoring and accessibility scoring.",
    category: "Analytics",
    status: "Installed",
  },
];

export default function ExtensionsPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in-0 duration-300 w-full">
      {/* ── Editorial Page Header ─────────────────────────────────────────── */}
      <PageHeader
        eyebrow="INTEGRATIONS // TOOLCHAIN"
        title="Workspace Extensions"
        description="Explore installed plugins and integrations enhancing your developer environment."
        action={
          <div className="font-mono text-xs text-[#4A443C] uppercase tracking-wider font-semibold">
            {EXTENSIONS.length} SYSTEM EXTENSIONS ACTIVE
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EXTENSIONS.map((ext) => (
          <Card key={ext.name} className="hover:border-[#101010]/40 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Puzzle className="h-4 w-4 text-[#D5360C] shrink-0" />
                  <span>{ext.name}</span>
                </CardTitle>
                <Badge variant="default" className="text-xs">
                  {ext.category}
                </Badge>
              </div>
              <CardDescription className="text-xs mt-1 text-[#4A443C]">
                {ext.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1.5 text-xs text-[#2A6E3B] font-mono uppercase tracking-wider font-bold">
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

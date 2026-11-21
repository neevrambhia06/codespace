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
    name: "GitHub Repository Sync",
    description: "Automatically link pull requests, commits, and milestones to workspace tasks.",
    category: "Workflow",
    status: "Active",
  },
  {
    name: "Calendar & Schedule Sync",
    description: "Sync project deadlines and task deliverables directly with your calendar.",
    category: "Productivity",
    status: "Active",
  },
  {
    name: "Document & PDF Exporter",
    description: "Export knowledge base notes and project summaries into formatted PDF or Markdown.",
    category: "Export",
    status: "Active",
  },
  {
    name: "Slack Team Notifications",
    description: "Send project updates, milestone alerts, and daily task summaries to team channels.",
    category: "Messaging",
    status: "Active",
  },
];

export default function ExtensionsPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in-0 duration-300 w-full">
      {/* ── Editorial Page Header ─────────────────────────────────────────── */}
      <PageHeader
        eyebrow="WORKSPACE INTEGRATIONS"
        title="Integrations & Tools"
        description="Connect your workspace with team productivity tools, calendar scheduling, and export options."
        action={
          <div className="font-sans text-xs text-[#524D46] font-medium">
            {EXTENSIONS.length} active integrations
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EXTENSIONS.map((ext) => (
          <Card key={ext.name} className="hover:border-[#101010]/25 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm sm:text-base font-semibold flex items-center gap-2">
                  <Puzzle className="h-4 w-4 text-[#D5360C] shrink-0" />
                  <span>{ext.name}</span>
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">
                  {ext.category}
                </Badge>
              </div>
              <CardDescription className="text-xs mt-1 text-[#524D46]">
                {ext.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1.5 text-xs text-[#2A6E3B] font-sans font-semibold">
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

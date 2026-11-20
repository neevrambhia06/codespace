import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/layout/PageHeader";
import { User, Shield, Key, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Settings | CodeSpace",
  description: "Account and workspace settings.",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col gap-6 animate-in fade-in-0 duration-300 w-full max-w-4xl mx-auto">
      {/* ── Editorial Page Header ─────────────────────────────────────────── */}
      <PageHeader
        eyebrow="PREFERENCES // ACCESS CONTROL"
        title="Account & System Settings"
        description="Manage your account profile, permissions, and workspace environment configurations."
        action={
          <Badge variant={user?.role === "ADMIN" ? "accent" : "secondary"} className="text-xs">
            ROLE: {user?.role || "GUEST"}
          </Badge>
        }
      />

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-[#D5360C]" />
            <CardTitle>Profile & Authentication</CardTitle>
          </div>
          <CardDescription className="text-xs text-[#4A443C]">
            Identity details provided during registration or database seeding.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="rounded-xs border border-[rgba(16,16,16,0.18)] bg-[#FAF4EA] p-3.5">
              <span className="font-mono text-[10px] text-[#4A443C] block mb-1 uppercase tracking-wider">
                Full Name
              </span>
              <span className="font-sans font-bold text-[#101010] text-sm">
                {user?.name || "Developer"}
              </span>
            </div>
            <div className="rounded-xs border border-[rgba(16,16,16,0.18)] bg-[#FAF4EA] p-3.5">
              <span className="font-mono text-[10px] text-[#4A443C] block mb-1 uppercase tracking-wider">
                Email Address
              </span>
              <span className="font-sans font-bold text-[#101010] text-sm">
                {user?.email || "admin@codespace.dev"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xs border border-[rgba(16,16,16,0.18)] bg-[#FAF4EA] p-3.5">
            <div className="flex items-center gap-3">
              <Shield className="h-4 w-4 text-[#D5360C]" />
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#101010]">
                  Assigned Workspace Role
                </span>
                <p className="text-xs text-[#4A443C]">
                  Controls workspace mutations and cryptographic access control
                </p>
              </div>
            </div>
            <Badge variant={user?.role === "ADMIN" ? "default" : "secondary"}>
              {user?.role || "GUEST"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Integration Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-[#D5360C]" />
            <CardTitle>API & Infrastructure Telemetry</CardTitle>
          </div>
          <CardDescription className="text-xs text-[#4A443C]">
            Configured environment services connected to CodeSpace.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-xs text-[#4A443C]">
          <div className="flex justify-between items-center py-2.5 border-b border-[#101010]/15">
            <span className="font-medium text-[#101010]">PostgreSQL Database (Neon US-East-2)</span>
            <Badge variant="default" className="text-[10px]">
              CONNECTED
            </Badge>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-[#101010]/15">
            <span className="font-medium text-[#101010]">Session Authentication (Better Auth)</span>
            <Badge variant="default" className="text-[10px]">
              ACTIVE
            </Badge>
          </div>
          <div className="flex justify-between items-center py-2.5">
            <span className="font-medium text-[#101010]">Notification Dispatch Engine</span>
            <Badge variant="secondary" className="text-[10px]">
              LOCAL MODE
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

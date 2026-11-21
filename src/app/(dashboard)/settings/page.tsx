import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/layout/PageHeader";
import { User, Shield, ShieldCheck } from "lucide-react";

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
        eyebrow="WORKSPACE PREFERENCES"
        title="Account Preferences"
        description="Manage your profile, notification options, and account security settings."
        action={
          <Badge variant={user?.role === "ADMIN" ? "accent" : "secondary"} className="text-xs">
            Role: {user?.role || "Member"}
          </Badge>
        }
      />

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-[#D5360C]" />
            <CardTitle>Profile & Identification</CardTitle>
          </div>
          <CardDescription className="text-xs text-[#524D46]">
            Personal details associated with your workspace login.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border border-[#101010]/10 bg-[#EDE4D5]/35 p-3.5">
              <span className="font-sans text-[11px] text-[#524D46] block mb-1">
                Full Name
              </span>
              <span className="font-sans font-semibold text-[#101010] text-sm">
                {user?.name || "Alex Morgan"}
              </span>
            </div>
            <div className="rounded-lg border border-[#101010]/10 bg-[#EDE4D5]/35 p-3.5">
              <span className="font-sans text-[11px] text-[#524D46] block mb-1">
                Email Address
              </span>
              <span className="font-sans font-semibold text-[#101010] text-sm">
                {user?.email || "alex@codespace.dev"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-[#101010]/10 bg-[#EDE4D5]/35 p-3.5">
            <div className="flex items-center gap-3">
              <Shield className="h-4 w-4 text-[#D5360C] shrink-0" />
              <div>
                <span className="text-xs font-sans font-semibold text-[#101010] block">
                  Workspace Role
                </span>
                <p className="text-xs text-[#524D46]">
                  Determines your editing capabilities and project management access
                </p>
              </div>
            </div>
            <Badge variant={user?.role === "ADMIN" ? "default" : "secondary"}>
              {user?.role || "Member"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Workspace Preferences Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#D5360C]" />
            <CardTitle>Security & Cloud Options</CardTitle>
          </div>
          <CardDescription className="text-xs text-[#524D46]">
            Connected workspace capabilities and session protection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-xs text-[#524D46]">
          <div className="flex justify-between items-center py-2.5 border-b border-[#101010]/10">
            <span className="font-medium text-[#101010]">Automatic Cloud Backup</span>
            <Badge variant="default" className="text-[10px]">
              Active
            </Badge>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-[#101010]/10">
            <span className="font-medium text-[#101010]">Encrypted Session Verification</span>
            <Badge variant="default" className="text-[10px]">
              Protected
            </Badge>
          </div>
          <div className="flex justify-between items-center py-2.5">
            <span className="font-medium text-[#101010]">Email Activity Summaries</span>
            <Badge variant="secondary" className="text-[10px]">
              Enabled
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

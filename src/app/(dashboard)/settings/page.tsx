import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { User, Shield, Key } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Settings | CodeSpace",
  description: "Account and workspace settings.",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col gap-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account profile, permissions, and workspace preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Profile & Authentication</CardTitle>
          </div>
          <CardDescription>
            Account details provided during registration or database seeding.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border p-3">
              <span className="text-xs text-muted-foreground block mb-1">Full Name</span>
              <span className="font-medium text-foreground">{user?.name || "Developer"}</span>
            </div>
            <div className="rounded-lg border p-3">
              <span className="text-xs text-muted-foreground block mb-1">Email Address</span>
              <span className="font-medium text-foreground">{user?.email || "admin@codespace.dev"}</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <div>
                <span className="text-sm font-medium">Assigned Role</span>
                <p className="text-xs text-muted-foreground">Controls workspace mutations and access control</p>
              </div>
            </div>
            <Badge variant={user?.role === "ADMIN" ? "default" : "secondary"}>
              {user?.role || "GUEST"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            <CardTitle>API & Integration Keys</CardTitle>
          </div>
          <CardDescription>
            Configured environment services connected to CodeSpace.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-xs text-muted-foreground">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span>PostgreSQL Database (Neon)</span>
            <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">Connected</Badge>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span>Session Authentication (Better Auth)</span>
            <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">Active</Badge>
          </div>
          <div className="flex justify-between items-center py-2">
            <span>Resend Email Dispatch</span>
            <Badge variant="outline" className="text-muted-foreground">Mock Mode</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

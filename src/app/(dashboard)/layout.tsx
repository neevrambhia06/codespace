// Dashboard shell layout — React Server Component
// Route group `(dashboard)` groups routes that share the sidebar+header shell
// without adding a URL segment. All children are rendered inside <main>.

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Full viewport height; sidebar fixed-width, content scrolls independently
    <div className="flex h-full overflow-hidden bg-background">
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <Sidebar />

      {/* ── Main column ──────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        {/* Page content */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto p-6"
          // Skip-to-main-content target for keyboard accessibility
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

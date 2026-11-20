import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full overflow-hidden bg-[#E6D5BD] text-[#101010]">
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <Sidebar />

      {/* ── Main column ──────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        {/* Page content in Warm Ivory with subtle paper grain texture */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto p-6 lg:p-8 bg-grain"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

import { GlobalNavbar } from "@/components/layout/GlobalNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EF] text-[#101010]">
      {/* ── Unified Full-Width Horizontal Top Navbar ─────────────────── */}
      <GlobalNavbar />

      {/* ── Full-Width Clean Workspace Canvas ────────────────────────── */}
      <main
        id="main-content"
        className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 py-8 lg:py-10"
        tabIndex={-1}
      >
        {children}
      </main>
    </div>
  );
}

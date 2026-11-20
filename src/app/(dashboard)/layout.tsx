import { GlobalNavbar } from "@/components/layout/GlobalNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#E6D5BD] text-[#101010] bg-grain">
      {/* ── Unified Full-Width Horizontal Top Navbar ─────────────────── */}
      <GlobalNavbar />

      {/* ── Full-Width Editorial Canvas ──────────────────────────────── */}
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

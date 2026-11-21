import { EditorialNavbar } from "@/components/landing/EditorialNavbar";
import { EditorialHero } from "@/components/landing/EditorialHero";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { DeepDiveFeatures } from "@/components/landing/DeepDiveFeatures";
import { UseCasesSection } from "@/components/landing/UseCasesSection";
import { IndieCraftNote } from "@/components/landing/IndieCraftNote";
import { FaqSection } from "@/components/landing/FaqSection";
import { EditorialFooter } from "@/components/landing/EditorialFooter";
import { EditorialConnector } from "@/components/landing/EditorialConnector";
import { APP_NAME } from "@/lib/constants";

export const metadata = {
  title: `${APP_NAME} — The Sovereign Developer Workspace`,
  description:
    "An all-in-one developer workspace designed in a bold, warm editorial aesthetic. Unifying active development cycles, optimistic task progression, code curation, and reactive knowledge.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#E6D5BD] text-[#101010] flex flex-col font-sans selection:bg-[#D5360C] selection:text-[#E6D5BD] font-editorial-theme">
      {/* ── Redesigned Editorial Navigation ───────────────────────────────── */}
      <EditorialNavbar />

      {/* ── Structured Editorial Sections with Scroll Connectors ──────────── */}
      <main className="flex-1">
        {/* 1. Hero Section (Canvas: Bold Burnt Orange with Grain & Starburst) */}
        <EditorialHero />

        {/* Scroll-Synced Connector 01 -> 02 */}
        <EditorialConnector
          fromSection="01"
          toSection="02"
          label="FROM CHAOS TO CALM"
          variant="stepped"
        />

        {/* 2. Problem vs. Solution Comparison ("Without vs. With") */}
        <ComparisonSection />

        {/* Scroll-Synced Connector 02 -> 03 */}
        <EditorialConnector
          fromSection="02"
          toSection="03"
          label="CORE CAPABILITIES"
          variant="branch"
        />

        {/* 3. Deep-Dive Feature Blocks with Workflow Track & Bento Wave */}
        <DeepDiveFeatures />

        {/* Scroll-Synced Connector 03 -> 04 */}
        <EditorialConnector
          fromSection="03"
          toSection="04"
          label="INTENDED DISCIPLINES"
          variant="straight"
        />

        {/* 4. Real-World Use Cases (Founder, Architect, Maintainer) */}
        <UseCasesSection />

        {/* 5. Creator / Indie Craft Note (Authentic grounded philosophy) */}
        <IndieCraftNote />

        {/* 6. FAQ Accordion Section */}
        <FaqSection />
      </main>

      {/* ── Closing Callout & Editorial Footer ────────────────────────────── */}
      <EditorialFooter />
    </div>
  );
}

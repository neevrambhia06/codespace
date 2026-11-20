import { Quote } from "lucide-react";

export function IndieCraftNote() {
  return (
    <section id="craft" className="py-24 sm:py-32 px-6 sm:px-10 bg-[#EFE3D1] text-[#101010] border-b border-[#101010]/15 bg-grain">
      <div className="max-w-4xl mx-auto">
        <div className="border-2 border-[#101010] p-8 sm:p-14 bg-[#E6D5BD] relative shadow-sm">
          {/* Top accent badge */}
          <div className="absolute -top-3.5 left-8 bg-[#D5360C] text-[#E6D5BD] font-mono text-[10px] tracking-[0.25em] font-bold uppercase px-3 py-1">
            05 // THE PHILOSOPHY OF CRAFT
          </div>

          <div className="flex items-center justify-between border-b border-[#101010]/15 pb-6 mb-8">
            <span className="font-mono text-xs tracking-widest uppercase text-[#101010]/60">
              BUILDER MANIFESTO // DISPATCH #01
            </span>
            <Quote className="w-6 h-6 text-[#D5360C]" />
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight leading-snug mb-6 text-balance">
            &ldquo;We got tired of pitch-black neon dashboards that look like gaming consoles.&rdquo;
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#101010]/85 font-light leading-relaxed">
            <p>
              Somewhere in the last decade, software engineering tools standardized on generic dark themes—pitch black backgrounds, electric purples, and high-contrast neon borders. While fine for short glanceability, they tire the eyes after twelve hours of deep system architecture.
            </p>
            <p>
              We built <strong>CodeSpace</strong> around the calm tactile warmth of classic print editorial design: <em>Warm Ivory (#E6D5BD)</em>, crisp <em>Soft Black (#101010)</em> typography, and deliberate <em>Burnt Orange (#D5360C)</em> accents.
            </p>
            <p>
              No unneeded popups. No AI chatbots interrupting your flow. Just your projects, your tasks, your code snippets, and your architectural truth—persisted securely in PostgreSQL and executed with immediate feedback.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-[#101010]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-[#101010]/70">
            <div>
              <span className="font-bold text-[#101010]">THE CODESPACE TEAM</span>
              <span className="block text-[11px] text-[#101010]/50">Independent Builders & Systems Engineers</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>STACK: NEXT.JS 16</span>
              <span>•</span>
              <span>ENGINE: NEON PG</span>
              <span>•</span>
              <span className="text-[#D5360C] font-bold">SOVEREIGN</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

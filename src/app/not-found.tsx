import Link from "next/link";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[#E6D5BD] text-[#101010] bg-grain">
      <div className="flex max-w-md flex-col items-center gap-6 text-center animate-in fade-in-0 slide-in-from-bottom-2 duration-500 border border-[#101010]/20 bg-[#EFE3D1] p-10 rounded-xs shadow-sm">
        {/* Graphic */}
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-xs bg-[#D5360C]/15 text-[#D5360C] border border-[#D5360C]/30">
            <FileQuestion className="h-10 w-10" aria-hidden="true" />
          </div>
          <span className="absolute -top-2 -right-2 rounded-xs border border-[#101010] bg-[#101010] px-2 py-0.5 font-mono text-xs font-bold text-[#E6D5BD]">
            404
          </span>
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#D5360C] uppercase font-bold">
            RESOURCE NOT LOCATED
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight text-[#101010]">
            Page Not Found
          </h1>
          <p className="text-xs text-[#101010]/70 font-light leading-relaxed">
            The architectural endpoint you requested doesn&apos;t exist or has been refactored.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
          <Link
            id="not-found-home-link"
            href="/dashboard"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xs bg-[#D5360C] text-[#E6D5BD] px-4 py-2.5 font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#101010] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xs border border-[#101010]/30 text-[#101010] px-4 py-2.5 font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#101010] hover:text-[#E6D5BD] transition-colors"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

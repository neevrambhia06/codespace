import Link from "next/link";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[#F7F4EF] text-[#101010]">
      <div className="flex max-w-md flex-col items-center gap-6 text-center animate-in fade-in-0 slide-in-from-bottom-2 duration-500 border border-[#101010]/12 bg-white p-10 rounded-xl shadow-lg">
        {/* Graphic */}
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-[#D5360C]/10 text-[#D5360C] border border-[#D5360C]/20">
            <FileQuestion className="h-10 w-10" aria-hidden="true" />
          </div>
          <span className="absolute -top-2 -right-2 rounded-md border border-[#101010] bg-[#101010] px-2 py-0.5 font-mono text-xs font-bold text-white">
            404
          </span>
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs tracking-wider text-[#D5360C] uppercase font-semibold">
            PAGE NOT FOUND
          </span>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#101010]">
            Page Not Found
          </h1>
          <p className="text-xs text-[#524D46] font-normal leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
          <Link
            id="not-found-home-link"
            href="/dashboard"
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#D5360C] text-white px-4 py-2.5 font-sans text-xs font-semibold hover:bg-[#B82D09] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[#101010]/12 bg-[#EDE4D5] text-[#101010] px-4 py-2.5 font-sans text-xs font-semibold hover:bg-[#E2D6C3] transition-colors"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

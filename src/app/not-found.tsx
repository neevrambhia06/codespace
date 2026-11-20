// 404 — Not Found page (React Server Component)
import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex max-w-md flex-col items-center gap-6 text-center animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
        {/* Graphic */}
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary text-muted-foreground">
            <FileQuestion className="h-10 w-10" aria-hidden="true" />
          </div>
          <span className="absolute -top-1 -right-1 rounded-full border border-border bg-popover px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
            404
          </span>
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Page not found
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        {/* CTA */}
        <Link
          id="not-found-home-link"
          href="/"
          className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

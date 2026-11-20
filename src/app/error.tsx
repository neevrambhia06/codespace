"use client";

// Error boundaries MUST be Client Components.
// This catches unhandled errors in the route segment and its children.

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to an error reporting service in production
    console.error("[CodeSpace Error Boundary]", error);
  }, [error]);

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex max-w-md flex-col items-center gap-6 text-center animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertTriangle className="h-8 w-8" aria-hidden="true" />
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-foreground">
            Something went wrong
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {error.message ||
              "An unexpected error occurred. Try refreshing the page."}
          </p>
          {error.digest && (
            <p className="font-mono text-xs text-muted-foreground/70">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <Button id="error-reset-btn" onClick={reset} className="gap-2">
          <RefreshCcw className="h-4 w-4" aria-hidden="true" />
          Try again
        </Button>
      </div>
    </div>
  );
}

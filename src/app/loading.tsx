// Root loading UI — shown while a page segment suspends during navigation.
// This is a React Server Component — no "use client" needed.

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner ring */}
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-foreground"
          aria-hidden="true"
        />
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    </div>
  );
}

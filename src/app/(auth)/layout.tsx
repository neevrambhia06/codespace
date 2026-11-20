import { ReactNode } from "react";
import Link from "next/link";
import { Code2 } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary/40 p-6">
      <div className="flex w-full max-w-md flex-col items-center gap-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`${APP_NAME} — home`}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Code2 className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {APP_NAME}
          </span>
        </Link>

        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}

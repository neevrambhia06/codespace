import { ReactNode } from "react";
import Link from "next/link";
import { Code2, ArrowLeft } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#E6D5BD] text-[#101010] p-6 bg-grain selection:bg-[#D5360C] selection:text-[#E6D5BD]">
      <div className="flex w-full max-w-md flex-col items-center gap-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
        <div className="flex items-center justify-between w-full border-b border-[#101010]/15 pb-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-xs outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C]"
            aria-label={`${APP_NAME} — home`}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-xs bg-[#D5360C] text-[#E6D5BD]">
              <Code2 className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
            </div>
            <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-[#101010]">
              {APP_NAME}
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#101010]/60 hover:text-[#D5360C] transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Landing Page</span>
          </Link>
        </div>

        <div className="w-full">{children}</div>

        <div className="text-center font-mono text-[10px] text-[#4A443C] tracking-widest uppercase">
          ✦ // SECURE ENCRYPTED SESSION
        </div>
      </div>
    </main>
  );
}

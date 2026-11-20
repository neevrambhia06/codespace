import * as React from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <header className="border-b border-[#101010] pb-6 mb-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-[#D5360C] font-bold mb-1.5">
            <span>{eyebrow}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#101010]">
            {title}
          </h1>
          {description && (
            <p className="text-xs sm:text-sm text-[#4A443C] mt-1.5 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {action && (
          <div className="flex items-center gap-3 shrink-0">
            {action}
          </div>
        )}
      </div>
    </header>
  );
}

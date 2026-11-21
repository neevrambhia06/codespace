import * as React from "react"
import { cn } from "@/lib/utils"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border border-[rgba(16,16,16,0.15)] bg-white px-3 py-2 text-xs text-[#101010] placeholder:text-[#524D46] font-sans transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D5360C] focus-visible:border-[#D5360C] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

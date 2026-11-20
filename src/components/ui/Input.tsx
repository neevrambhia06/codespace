import * as React from "react"

import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-xs border border-[rgba(16,16,16,0.22)] bg-[#FAF4EA] px-3 py-1.5 text-xs text-[#101010] placeholder:text-[#4A443C]/70 font-sans transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D5360C] focus-visible:border-[#D5360C] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

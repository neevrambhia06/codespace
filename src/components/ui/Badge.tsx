import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 font-sans text-[11px] font-semibold transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "border border-[#101010] bg-[#101010] text-white",
        secondary:
          "border border-[#101010]/12 bg-[#EDE4D5] text-[#101010]",
        destructive:
          "border border-[#B32608] bg-[#B32608] text-white",
        outline:
          "border border-[#101010]/20 bg-transparent text-[#101010]",
        accent:
          "border border-[#D5360C] bg-[#D5360C] text-white",
        success:
          "border border-[#2A6E3B] bg-[#2A6E3B] text-white",
        warning:
          "border border-[#D5360C] bg-[#D5360C] text-white",
        error:
          "border border-[#B32608] bg-[#B32608] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

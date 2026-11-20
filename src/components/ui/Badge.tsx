import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-xs px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase font-bold transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "border border-[#101010] bg-[#101010] text-[#F4EBDD]",
        secondary:
          "border border-[#101010] bg-transparent text-[#101010]",
        destructive:
          "border border-[#B32608] bg-[#B32608] text-[#F4EBDD]",
        outline:
          "border border-[#101010] bg-transparent text-[#101010]",
        accent:
          "border border-[#D5360C] bg-[#D5360C] text-[#F4EBDD]",
        success:
          "border border-[#101010] bg-[#101010] text-[#F4EBDD]",
        warning:
          "border border-[#D5360C] bg-[#D5360C] text-[#F4EBDD]",
        error:
          "border border-[#B32608] bg-[#B32608] text-[#F4EBDD]",
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

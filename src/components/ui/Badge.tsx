import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-xs border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase font-bold transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "border-[#D5360C]/30 bg-[#D5360C]/15 text-[#D5360C]",
        secondary:
          "border-[#101010]/15 bg-[#101010]/8 text-[#101010]",
        destructive:
          "border-[#B32608]/30 bg-[#B32608]/15 text-[#B32608]",
        outline: "border-[#101010]/30 text-[#101010]",
        accent: "border-[#D5360C]/30 bg-[#D5360C]/10 text-[#D5360C]",
        success: "border-[#2A6E3B]/30 bg-[#2A6E3B]/15 text-[#2A6E3B]",
        warning: "border-[#D5360C]/30 bg-[#D5360C]/15 text-[#D5360C]",
        error: "border-[#B32608]/30 bg-[#B32608]/15 text-[#B32608]",
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

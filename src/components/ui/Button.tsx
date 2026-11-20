import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xs text-xs font-mono tracking-wider uppercase font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default: "bg-[#D5360C] text-[#E6D5BD] hover:bg-[#101010] hover:text-[#E6D5BD] shadow-xs active:translate-y-px",
        destructive:
          "bg-[#B32608] text-[#E6D5BD] hover:bg-[#101010] shadow-xs",
        outline:
          "border border-[#101010]/30 bg-transparent text-[#101010] hover:bg-[#101010] hover:text-[#E6D5BD]",
        secondary:
          "bg-[#EFE3D1] text-[#101010] border border-[#101010]/15 hover:bg-[#E6D5BD] hover:border-[#101010]/30",
        ghost: "hover:bg-[#EFE3D1] text-[#101010]",
        link: "text-[#D5360C] underline-offset-4 hover:underline lowercase font-sans font-medium",
        primary: "bg-[#D5360C] text-[#E6D5BD] hover:bg-[#101010]",
        danger: "bg-[#B32608] text-[#E6D5BD] hover:bg-[#101010]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-xs px-3 text-[11px]",
        lg: "h-11 rounded-xs px-8 text-xs",
        icon: "h-9 w-9",
        md: "h-9 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && (
          <span
            className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        )}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

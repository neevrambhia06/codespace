import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xs font-sans font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5360C] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#D5360C] text-white hover:bg-[#B82D09] font-semibold shadow-xs active:translate-y-px",
        destructive:
          "bg-[#B32608] text-white hover:bg-[#8F1E06] shadow-xs",
        outline:
          "border border-[#101010]/20 bg-white text-[#101010] hover:bg-[#EDE4D5] hover:border-[#101010]/30",
        secondary:
          "bg-[#EDE4D5] text-[#101010] hover:bg-[#E2D6C3] border border-[#101010]/12 font-medium",
        ghost:
          "text-[#101010] hover:bg-[#EDE4D5] hover:text-[#D5360C]",
        link:
          "text-[#D5360C] underline-offset-4 hover:underline lowercase font-sans font-medium",
        primary:
          "bg-[#D5360C] text-white hover:bg-[#B82D09] font-semibold",
        danger:
          "bg-[#B32608] text-white hover:bg-[#8F1E06]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-6 text-sm",
        icon: "h-8 w-8 sm:h-9 sm:w-9",
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

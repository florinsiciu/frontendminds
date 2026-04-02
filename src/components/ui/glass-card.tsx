import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlight"
  as?: React.ElementType
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "rounded-2xl border border-white/[0.06] bg-white/[0.02] shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-[16px] transition-all duration-300 md:hover:-translate-y-[3px] md:hover:border-white/[0.12] md:hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)]",
          variant === "highlight" && "border-indigo-500/[0.12] bg-indigo-500/[0.04]",
          className
        )}
        {...props}
      />
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }

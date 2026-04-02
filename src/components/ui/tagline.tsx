import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

const Tagline = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "mb-5 block text-[0.7rem] font-bold uppercase tracking-[0.2em] text-indigo-400",
          className
        )}
        {...props}
      />
    )
  }
)
Tagline.displayName = "Tagline"

export { Tagline }

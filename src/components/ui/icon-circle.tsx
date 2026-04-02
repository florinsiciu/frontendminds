import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

const sizeVariants = {
  sm: "h-9 w-9 text-sm",
  md: "h-11 w-11 text-lg",
  lg: "h-[52px] w-[52px] text-xl",
} as const

interface IconCircleProps extends HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof sizeVariants
}

const IconCircle = forwardRef<HTMLDivElement, IconCircleProps>(
  ({ className, size = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-indigo-500/[0.12] font-bold text-indigo-400",
          sizeVariants[size],
          className
        )}
        {...props}
      />
    )
  }
)
IconCircle.displayName = "IconCircle"

export { IconCircle }

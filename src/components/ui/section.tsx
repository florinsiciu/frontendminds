import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

const bgVariants = {
  default: "",
  muted: "bg-[#131C2E]",
  accent: "bg-gradient-to-b from-primary/[0.07] to-primary/[0.01]",
  warm: "bg-gradient-to-b from-primary/[0.04] to-emerald-500/[0.03]",
} as const

const widthVariants = {
  narrow: "max-w-3xl",
  medium: "max-w-5xl",
  wide: "max-w-6xl",
  full: "max-w-[1200px]",
} as const

interface SectionProps extends HTMLAttributes<HTMLElement> {
  bg?: keyof typeof bgVariants
  width?: keyof typeof widthVariants
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, bg = "default", width = "wide", children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:py-24",
          bgVariants[bg],
          className
        )}
        {...props}
      >
        <div className={cn("mx-auto", widthVariants[width])}>
          {children}
        </div>
      </section>
    )
  }
)
Section.displayName = "Section"

export { Section }

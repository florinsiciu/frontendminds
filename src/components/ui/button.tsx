"use client"

import { cn } from "@/lib/utils"
import { buttonVariants, type ButtonVariantsProps } from "./button-variants"

function Button({
  className,
  variant = "default",
  size = "default",
  shape = "default",
  ...props
}: React.ComponentProps<"button"> & ButtonVariantsProps) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, shape, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

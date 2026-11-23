import type { ComponentProps } from "react"
import { cn } from "cn"

type SectionProps = ComponentProps<"section"> & {
  surface?: "light" | "dark"
  /** Vertical rhythm. Most sections only pad the bottom. */
  space?: "bottom" | "both" | "none"
}

export function Section({
  surface = "light",
  space = "bottom",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      data-surface={surface}
      className={cn(
        space === "bottom" && "pb-section",
        space === "both" && "py-section",
        surface === "dark" && "bg-void text-offwhite",
        className
      )}
      {...props}
    />
  )
}

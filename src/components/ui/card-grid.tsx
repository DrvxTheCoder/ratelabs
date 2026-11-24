import type { ComponentProps } from "react"
import { cn } from "cn"

import { FadeUp } from "@/components/motion/fade-up"

type CardGridProps = Omit<ComponentProps<typeof FadeUp>, "as" | "group"> & {
  /** Narrowest a column may get before the grid wraps. */
  min?: "stat" | "card"
}

/** Wrapping row of equal columns; children grow to fill the last line. */
export function CardGrid({ min = "card", className, ...props }: CardGridProps) {
  return (
    <FadeUp
      as="ul"
      group
      className={cn(
        "flex flex-wrap gap-6 *:min-w-0",
        min === "stat"
          ? "*:flex-[1_1_min(100%,280px)]"
          : "*:flex-[1_1_min(100%,320px)]",
        className
      )}
      {...props}
    />
  )
}

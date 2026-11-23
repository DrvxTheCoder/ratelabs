import type { ComponentProps } from "react"
import { cn } from "cn"

type CardGridProps = ComponentProps<"ul"> & {
  /** Narrowest a column may get before the grid wraps. */
  min?: "stat" | "card"
}

/** Wrapping row of equal columns; children grow to fill the last line. */
export function CardGrid({ min = "card", className, ...props }: CardGridProps) {
  return (
    <ul
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

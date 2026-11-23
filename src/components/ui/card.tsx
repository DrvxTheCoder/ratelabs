import type { ComponentProps } from "react"
import { cn } from "cn"

type CardTag = "div" | "li" | "article" | "figure"

type CardProps = ComponentProps<"div"> & { as?: CardTag }

/** White 6px card used for stats, services, testimonials and forms. */
export function Card({ as = "div", className, ...props }: CardProps) {
  const Tag = as as "div"
  return (
    <Tag
      className={cn("rounded-card bg-white shadow-card", className)}
      {...props}
    />
  )
}

import type { ComponentProps } from "react"
import { cn } from "cn"

import { StarIcon } from "./icons"

type EyebrowProps = ComponentProps<"p"> & {
  tone?: "light" | "dark"
  star?: boolean
}

export function Eyebrow({
  tone = "light",
  star = true,
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 type-eyebrow",
        tone === "light" ? "text-ink-2" : "text-mist-2",
        className
      )}
      {...props}
    >
      {star && <StarIcon />}
      {children}
    </p>
  )
}

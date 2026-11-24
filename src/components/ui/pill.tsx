import type { ComponentProps } from "react"
import { cn } from "cn"

type PillProps = ComponentProps<"span"> & {
  /** `outline` on white cards, `glass` over imagery, dark enough for light photos. */
  variant?: "outline" | "glass"
}

export function Pill({ variant = "outline", className, ...props }: PillProps) {
  return (
    <span
      className={cn(
        "rounded-full px-3 type-mono",
        variant === "outline"
          ? "border border-line-3 py-[5px] text-ink-2"
          : "bg-glass py-1 text-offwhite backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
}

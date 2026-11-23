import type { ComponentProps } from "react"
import { cn } from "cn"

type ContainerProps = ComponentProps<"div"> & {
  /**
   * `false`: the content box is 1200px wide, gutters sit outside it.
   * `true`: gutters are included in the 1200px (navbar, slideshows).
   */
  inset?: boolean
}

export function Container({
  inset = false,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-gutter",
        inset
          ? "max-w-page"
          : "max-w-[calc(var(--container-page)+2*var(--spacing-gutter))]",
        className
      )}
      {...props}
    />
  )
}

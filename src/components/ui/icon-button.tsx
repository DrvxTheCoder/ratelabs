import type { ComponentProps } from "react"
import { cn } from "cn"

type IconButtonProps = ComponentProps<"button"> & {
  /** Accessible name: the button only contains an icon. */
  label: string
  /** Hairline circle, as on the slideshow pause controls. */
  ring?: boolean
}

/** 44px icon target. */
export function IconButton({
  label,
  ring = false,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-full",
        ring && "border border-line-ring",
        className
      )}
      {...props}
    />
  )
}

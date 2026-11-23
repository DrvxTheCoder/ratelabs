import type { ComponentProps } from "react"

/** Shared SVG root: 160×96 grid, Void 1.5px strokes, round caps. */
export function IllustrationFrame({
  children,
  ...props
}: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 160 96"
      width="180"
      height="108"
      fill="none"
      stroke="var(--color-void)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

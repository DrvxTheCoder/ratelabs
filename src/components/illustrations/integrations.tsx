import type { ComponentProps } from "react"

import { IllustrationFrame } from "./illustration-frame"

export function IntegrationsIllustration(props: ComponentProps<"svg">) {
  return (
    <IllustrationFrame {...props}>
      <rect
        x="14"
        y="30"
        width="34"
        height="36"
        rx="6"
        fill="var(--color-white)"
      />
      <path d="M22 42h18M22 50h18M22 58h10" stroke="var(--color-ash)" />
      <rect
        x="112"
        y="30"
        width="34"
        height="36"
        rx="6"
        fill="var(--color-white)"
      />
      <path d="M120 42h18M120 50h18M120 58h10" stroke="var(--color-ash)" />
      <path d="M54 42h52M101 37l5 5-5 5" />
      <path d="M106 54H54M59 49l-5 5 5 5" />
      <circle
        cx="80"
        cy="48"
        r="3.2"
        fill="var(--color-orange)"
        stroke="none"
      />
    </IllustrationFrame>
  )
}

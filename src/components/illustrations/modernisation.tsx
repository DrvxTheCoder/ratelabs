import type { ComponentProps } from "react"

import { IllustrationFrame } from "./illustration-frame"

export function ModernisationIllustration(props: ComponentProps<"svg">) {
  return (
    <IllustrationFrame {...props}>
      <rect
        x="16"
        y="58"
        width="44"
        height="14"
        rx="3"
        stroke="var(--color-ash)"
        strokeDasharray="3 3"
      />
      <rect
        x="16"
        y="40"
        width="44"
        height="14"
        rx="3"
        stroke="var(--color-ash)"
        strokeDasharray="3 3"
      />
      <rect
        x="16"
        y="22"
        width="44"
        height="14"
        rx="3"
        stroke="var(--color-ash)"
        strokeDasharray="3 3"
      />
      <path d="M68 48h22M84 42l6 6-6 6" />
      <rect
        x="100"
        y="58"
        width="44"
        height="14"
        rx="3"
        fill="var(--color-white)"
      />
      <rect
        x="100"
        y="40"
        width="44"
        height="14"
        rx="3"
        fill="var(--color-white)"
      />
      <rect
        x="100"
        y="22"
        width="44"
        height="14"
        rx="3"
        fill="var(--color-orange)"
      />
      <path d="M108 65h14M108 47h14" stroke="var(--color-ash)" />
      <path d="M108 29h14" />
    </IllustrationFrame>
  )
}

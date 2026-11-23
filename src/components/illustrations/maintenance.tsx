import type { ComponentProps } from "react"

import { IllustrationFrame } from "./illustration-frame"

export function MaintenanceIllustration(props: ComponentProps<"svg">) {
  return (
    <IllustrationFrame {...props}>
      <circle
        cx="80"
        cy="48"
        r="42"
        stroke="var(--color-ash)"
        strokeDasharray="3 4"
      />
      <circle cx="122" cy="48" r="3" fill="var(--color-void)" stroke="none" />
      <circle cx="38" cy="48" r="3" fill="var(--color-ash)" stroke="none" />
      <path
        d="M80 14l28 10v22c0 18-12 28-28 34-16-6-28-16-28-34V24z"
        fill="var(--color-white)"
      />
      <path
        d="M68 48l8 8 14-16"
        stroke="var(--color-orange)"
        strokeWidth="2.5"
      />
    </IllustrationFrame>
  )
}

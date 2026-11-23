import type { ComponentProps } from "react"

import { IllustrationFrame } from "./illustration-frame"

export function BusinessToolsIllustration(props: ComponentProps<"svg">) {
  return (
    <IllustrationFrame {...props}>
      <path d="M39 36H54V60H66" />
      <path d="M61 56l5 4-5 4" />
      <path d="M94 60H106V36H117" />
      <path d="M112 32l5 4-5 4" />
      <circle cx="28" cy="36" r="11" fill="var(--color-white)" />
      <circle cx="28" cy="36" r="3" fill="var(--color-void)" stroke="none" />
      <rect
        x="66"
        y="46"
        width="28"
        height="28"
        rx="6"
        fill="var(--color-white)"
      />
      <circle cx="80" cy="60" r="5" />
      <path d="M80 51v3M80 66v3M71 60h3M86 60h3" />
      <circle cx="128" cy="36" r="11" fill="var(--color-orange)" />
      <path d="M123 36l3.5 3.5 6-7" />
    </IllustrationFrame>
  )
}

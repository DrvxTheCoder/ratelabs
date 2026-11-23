import type { ComponentProps } from "react"

import { IllustrationFrame } from "./illustration-frame"

export function WebPlatformIllustration(props: ComponentProps<"svg">) {
  return (
    <IllustrationFrame {...props}>
      <rect
        x="22"
        y="10"
        width="116"
        height="76"
        rx="6"
        fill="var(--color-white)"
      />
      <path d="M22 26h116" />
      <circle cx="32" cy="18" r="2" fill="var(--color-void)" stroke="none" />
      <circle cx="40" cy="18" r="2" fill="var(--color-ash)" stroke="none" />
      <circle cx="48" cy="18" r="2" fill="var(--color-ash)" stroke="none" />
      <path d="M52 26v60" stroke="var(--color-ash)" strokeWidth="1" />
      <path d="M30 38h14M30 46h14M30 54h10" stroke="var(--color-ash)" />
      <path d="M64 34h28" stroke="var(--color-ash)" />
      <rect
        x="64"
        y="58"
        width="10"
        height="20"
        rx="1.5"
        fill="var(--color-void)"
      />
      <rect
        x="80"
        y="48"
        width="10"
        height="30"
        rx="1.5"
        fill="var(--color-ash)"
        stroke="var(--color-ash)"
      />
      <rect
        x="96"
        y="40"
        width="10"
        height="38"
        rx="1.5"
        fill="var(--color-orange)"
      />
      <rect
        x="112"
        y="52"
        width="10"
        height="26"
        rx="1.5"
        fill="var(--color-ash)"
        stroke="var(--color-ash)"
      />
    </IllustrationFrame>
  )
}

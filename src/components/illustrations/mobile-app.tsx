import type { ComponentProps } from "react"

import { IllustrationFrame } from "./illustration-frame"

export function MobileAppIllustration(props: ComponentProps<"svg">) {
  return (
    <IllustrationFrame {...props}>
      <rect
        x="58"
        y="6"
        width="44"
        height="84"
        rx="9"
        fill="var(--color-white)"
      />
      <path d="M74 13h12" />
      <rect
        x="66"
        y="22"
        width="28"
        height="13"
        rx="3"
        stroke="var(--color-ash)"
      />
      <rect
        x="66"
        y="40"
        width="28"
        height="13"
        rx="3"
        stroke="var(--color-ash)"
      />
      <rect
        x="66"
        y="58"
        width="28"
        height="13"
        rx="3"
        stroke="var(--color-ash)"
      />
      <circle
        cx="73"
        cy="28.5"
        r="2.5"
        fill="var(--color-orange)"
        stroke="none"
      />
      <path d="M78 27h11M78 31h7" stroke="var(--color-ash)" />
      <path d="M74 82h12" />
      <circle cx="34" cy="34" r="11" fill="var(--color-white)" />
      <path d="M29 34l3.5 3.5 6-7" />
      <rect
        x="112"
        y="52"
        width="30"
        height="20"
        rx="5"
        fill="var(--color-white)"
      />
      <path d="M119 60h16M119 66h9" stroke="var(--color-ash)" />
      <path d="M120 72v7l7-7" fill="var(--color-white)" />
    </IllustrationFrame>
  )
}

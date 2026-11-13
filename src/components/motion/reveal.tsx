"use client"

import * as React from "react"

import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap"

type RevealProps = React.ComponentProps<"div"> & {
  /** Animate each direct child in sequence rather than the wrapper as one. */
  stagger?: boolean
  delay?: number
}

function Reveal({ stagger, delay = 0, children, ...props }: RevealProps) {
  const root = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const element = root.current
      if (!element) return

      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(stagger ? element.children : element, {
          y: 36,
          autoAlpha: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          stagger: stagger ? 0.09 : 0,
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        })
      })
    },
    { scope: root }
  )

  return (
    <div ref={root} data-slot="reveal" {...props}>
      {children}
    </div>
  )
}

export { Reveal }

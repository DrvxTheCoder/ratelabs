"use client"

import * as React from "react"

import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap"

type CountUpProps = React.ComponentProps<"span"> & {
  value: number
  suffix?: string
}

/** Renders the final value on the server, then counts up to it on first view. */
function CountUp({ value, suffix = "", ...props }: CountUpProps) {
  const root = React.useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const element = root.current
      if (!element) return

      gsap.matchMedia().add(MOTION_OK, () => {
        const counter = { current: 0 }
        element.textContent = `0${suffix}`

        gsap.to(counter, {
          current: value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
          onUpdate: () => {
            element.textContent = `${Math.round(counter.current)}${suffix}`
          },
        })

        return () => {
          element.textContent = `${value}${suffix}`
        }
      })
    },
    { scope: root, dependencies: [value, suffix] }
  )

  return (
    <span ref={root} data-slot="count-up" {...props}>
      {value}
      {suffix}
    </span>
  )
}

export { CountUp }

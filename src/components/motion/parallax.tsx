"use client"

import * as React from "react"
import { cn } from "cn"

import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap"

/** Clips its child and drifts it slowly while the frame crosses the viewport. */
function Parallax({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const root = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-parallax-layer]",
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        )
      })
    },
    { scope: root }
  )

  return (
    <div
      ref={root}
      data-slot="parallax"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <div data-parallax-layer className="absolute -inset-y-[8%] inset-x-0">
        {children}
      </div>
    </div>
  )
}

export { Parallax }

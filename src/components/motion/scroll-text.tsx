"use client"

import * as React from "react"

import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap"

type ScrollTextProps = React.ComponentProps<"p"> & {
  children: string
}

/** Paragraph whose words ink in as it scrolls through the viewport. */
function ScrollText({ children, ...props }: ScrollTextProps) {
  const root = React.useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from("[data-word]", {
          opacity: 0.18,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            end: "bottom 50%",
            scrub: 0.4,
          },
        })
      })
    },
    { scope: root }
  )

  return (
    <p ref={root} data-slot="scroll-text" {...props}>
      {children.split(" ").map((word, index) => (
        <React.Fragment key={index}>
          <span data-word>{word}</span>{" "}
        </React.Fragment>
      ))}
    </p>
  )
}

export { ScrollText }

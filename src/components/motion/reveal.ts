"use client"

import { EASE_SOFT, gsap } from "./gsap"

/** The "blur reveal" shared by slides, page headers and the mobile menu. */
export const HIDDEN = { opacity: 0, y: 10, filter: "blur(8px)" }
export const SHOWN = { opacity: 1, y: 0, filter: "blur(0px)" }

export const REVEAL = {
  duration: 0.9,
  ease: EASE_SOFT,
  wordStagger: 0.09,
  lineOffset: 0.25,
}

/** Adds a word-by-word reveal of every `[data-line]` in `root` to `timeline`. */
export function addWordReveal(
  timeline: gsap.core.Timeline,
  root: Element,
  at: number
) {
  root.querySelectorAll("[data-line]").forEach((line, index) => {
    timeline.to(
      line.querySelectorAll("[data-word]"),
      {
        ...SHOWN,
        duration: REVEAL.duration,
        ease: REVEAL.ease,
        stagger: REVEAL.wordStagger,
      },
      at + index * REVEAL.lineOffset
    )
  })
}

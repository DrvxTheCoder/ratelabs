"use client"

import type { RefObject } from "react"

import { EASE, gsap, MOTION, useGSAP } from "./gsap"

/** Elements that already came in: they must not replay when a page is revisited. */
const revealed = new WeakSet<Element>()

const PROPS = "opacity,transform"

type FadeUpOptions = {
  /** Reveal the element's children one after the other instead of itself. */
  group?: boolean
}

/**
 * Fades the element up the first time it scrolls into view. Markup contract:
 * the element carries `data-fade="self"` or `data-fade="group"`, which
 * globals.css hides until GSAP takes over here.
 */
export function useFadeUp(
  root: RefObject<HTMLElement | null>,
  { group = false }: FadeUpOptions = {}
) {
  useGSAP(
    () => {
      const element = root.current
      if (!element) return
      const targets = group ? Array.from(element.children) : [element]

      gsap.matchMedia().add(MOTION.animate, () => {
        const waiting = targets.filter((target) => !revealed.has(target))
        if (waiting.length === 0) return
        gsap.set(waiting, { opacity: 0, y: 24 })

        // An observer rather than ScrollTrigger: it needs no measuring, so it
        // holds for sticky cards and late layout shifts.
        const observer = new IntersectionObserver(
          (entries) => {
            const entering: Element[] = []
            const passed: Element[] = []
            for (const { target, isIntersecting, boundingClientRect } of entries) {
              if (isIntersecting) entering.push(target)
              else if (boundingClientRect.bottom < 0) passed.push(target)
            }
            for (const target of [...entering, ...passed]) {
              revealed.add(target)
              observer.unobserve(target)
            }

            // Not part of the GSAP context, whose revert would bring back the
            // hidden state when the page is left: see the cleanup below.
            if (passed.length > 0) {
              gsap.set(passed, { clearProps: PROPS })
            }
            if (entering.length > 0) {
              gsap.to(entering, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: EASE,
                stagger: 0.08,
                clearProps: PROPS,
              })
            }
          },
          { rootMargin: "0px 0px -10% 0px" }
        )
        waiting.forEach((target) => observer.observe(target))

        return () => {
          observer.disconnect()
          gsap.killTweensOf(waiting)
          gsap.set(waiting, { clearProps: PROPS })
        }
      })

      // From here on GSAP owns the hidden state painted by globals.css.
      element.setAttribute("data-fade", "ready")
    },
    { scope: root }
  )
}

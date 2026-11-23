"use client"

import { useRef, type RefObject } from "react"

import { EASE_SOFT, gsap, MOTION, useGSAP } from "./gsap"
import { addWordReveal, HIDDEN, REVEAL, SHOWN } from "./reveal"

type TransitionOptions = {
  /** Crossfade, in seconds. The incoming slide waits `delay` (through dark). */
  fade: { duration: number; delay: number }
  /** Slow zoom-out of the incoming picture. */
  zoom: { from: number; duration: number }
  /** When the headline's first word appears. */
  wordsAt?: number
}

/**
 * Plays the change from one slide to the next inside `root`. Markup contract:
 *
 * - `[data-slide]`: one layer per slide, all but the first hidden in CSS
 * - `[data-slide-image]`: the picture, zoomed out on entry
 * - `[data-line]` / `[data-word]`: headline, revealed word by word
 * - `[data-reveal="1.7"]`: anything else, revealed at that many seconds
 */
export function useSlideTransitions(
  root: RefObject<HTMLElement | null>,
  index: number,
  { fade, zoom, wordsAt = 0 }: TransitionOptions
) {
  const shown = useRef(index)
  const show = useRef<(to: number, from: number) => void>(null)

  useGSAP(
    () => {
      const slides = gsap.utils
        .toArray<HTMLElement>("[data-slide]", root.current)
        .map((layer) => ({
          layer,
          image: layer.querySelector("[data-slide-image]"),
          text: layer.querySelectorAll<HTMLElement>(
            "[data-word], [data-reveal]"
          ),
        }))

      gsap.matchMedia().add(MOTION, (context) => {
        const { reduce } = context.conditions as Record<string, boolean>

        const settle = (active: number) =>
          slides.forEach(({ layer, image, text }, position) => {
            const isActive = position === active
            gsap.set(layer, { autoAlpha: isActive ? 1 : 0 })
            gsap.set(text, isActive ? SHOWN : HIDDEN)
            gsap.set(image, { scale: 1 })
          })

        settle(shown.current)

        if (reduce) {
          show.current = settle
          return
        }

        const enter = slides.map(({ layer, image, text }) => {
          const timeline = gsap
            .timeline({ paused: true })
            .to(
              image,
              { scale: 1, duration: zoom.duration, ease: "power1.out" },
              0
            )
            .to(
              layer,
              { autoAlpha: 1, duration: fade.duration, ease: EASE_SOFT },
              fade.delay
            )

          addWordReveal(timeline, layer, wordsAt)
          text.forEach((element) => {
            const at = element.dataset.reveal
            if (at === undefined) return
            timeline.to(
              element,
              { ...SHOWN, duration: REVEAL.duration, ease: REVEAL.ease },
              Number(at)
            )
          })
          return timeline
        })

        const leave = slides.map(({ layer, text }) =>
          gsap
            .timeline({ paused: true })
            .to(
              layer,
              { autoAlpha: 0, duration: fade.duration, ease: EASE_SOFT },
              0
            )
            .to(text, { ...HIDDEN, duration: 0.4, ease: EASE_SOFT }, 0)
        )

        show.current = (to, from) => {
          const incoming = slides[to]
          enter[from].pause()
          leave[to].pause()
          leave[from].invalidate().restart()

          // Only rewind a slide that is fully gone, so that a quick there-and-back
          // carries on from what is on screen.
          if (Number(gsap.getProperty(incoming.layer, "opacity")) === 0) {
            gsap.set(incoming.text, HIDDEN)
            gsap.set(incoming.image, { scale: zoom.from })
          }
          enter[to].invalidate().restart()
        }
      })
    },
    { scope: root }
  )

  useGSAP(
    () => {
      const from = shown.current
      if (from === index) return
      shown.current = index
      show.current?.(index, from)
    },
    { dependencies: [index], scope: root }
  )
}

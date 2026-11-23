"use client"

import {
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type RefObject,
} from "react"

import { gsap, useGSAP } from "./gsap"
import { useReducedMotion } from "./use-media-query"

function subscribeToVisibility(notify: () => void) {
  document.addEventListener("visibilitychange", notify)
  return () => document.removeEventListener("visibilitychange", notify)
}

function useDocumentHidden() {
  return useSyncExternalStore(
    subscribeToVisibility,
    () => document.hidden,
    () => false
  )
}

type SlideshowOptions = {
  count: number
  /** Seconds each slide stays on screen. */
  interval: number
  /** Receives `--progress` (0 to 1) while the current slide's time runs. */
  progressRef?: RefObject<HTMLElement | null>
}

/**
 * Slideshow state: which slide is active, and a GSAP clock that advances it.
 *
 * The clock holds while the user has paused, while keyboard focus is inside, and
 * while the tab is hidden. Under reduced motion it starts paused.
 */
export function useSlideshow({
  count,
  interval,
  progressRef,
}: SlideshowOptions) {
  const reduced = useReducedMotion()
  const documentHidden = useDocumentHidden()
  const [index, setIndex] = useState(0)
  const [restarts, setRestarts] = useState(0)
  const [userPaused, setUserPaused] = useState<boolean | null>(null)
  const [focusWithin, setFocusWithin] = useState(false)
  const clock = useRef<gsap.core.Tween>(null)

  const paused = userPaused ?? reduced
  const held = paused || focusWithin || documentHidden

  useGSAP(
    () => {
      clock.current = gsap.fromTo(
        progressRef?.current ?? { "--progress": 0 },
        { "--progress": 0 },
        {
          "--progress": 1,
          duration: interval,
          ease: "none",
          paused: true,
          onComplete: () => setIndex((current) => (current + 1) % count),
        }
      )
    },
    { dependencies: [index, restarts, count, interval], revertOnUpdate: true }
  )

  useGSAP(() => void clock.current?.paused(held), {
    dependencies: [held, index, restarts, count, interval],
  })

  const goTo = (target: number) => {
    setIndex((target + count) % count)
    setRestarts((value) => value + 1)
  }

  return {
    index,
    paused,
    goTo,
    next: () => goTo(index + 1),
    previous: () => goTo(index - 1),
    togglePause: () => setUserPaused(!paused),
    /** Spread on the slideshow's root element. */
    rootProps: {
      onFocus: (event: FocusEvent) => {
        setFocusWithin(event.target.matches(":focus-visible"))
      },
      onBlur: (event: FocusEvent) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocusWithin(false)
        }
      },
    },
  }
}

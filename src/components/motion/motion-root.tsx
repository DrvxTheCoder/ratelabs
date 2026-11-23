"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

import { ScrollTrigger } from "./gsap"

/** Keeps ScrollTrigger measurements honest as fonts, images and routes change. */
export function MotionRoot() {
  const pathname = usePathname()

  useEffect(() => {
    let active = true
    const refresh = () => {
      if (active) ScrollTrigger.refresh()
    }

    void document.fonts.ready.then(refresh)

    const onLoad = (event: Event) => {
      if (event.target instanceof HTMLImageElement) refresh()
    }
    document.addEventListener("load", onLoad, true)

    return () => {
      active = false
      document.removeEventListener("load", onLoad, true)
    }
  }, [])

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  return null
}

"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"

import { gsap, MOTION, ScrollTrigger } from "./gsap"

/** Drops any scroll in flight so that it cannot fight the router's own. */
function halt(lenis: Lenis) {
  lenis.stop()
  lenis.start()
}

/** Ids repeat across pages, which stay mounted but hidden: take the visible one. */
function findTarget(hash: string) {
  const id = CSS.escape(decodeURIComponent(hash.slice(1)))
  return Array.from(document.querySelectorAll<HTMLElement>(`#${id}`)).find(
    (element) => element.getClientRects().length > 0
  )
}

/**
 * Eased wheel scrolling and same-page links. Touch keeps its native scroll, and
 * with reduced motion nothing here runs. The real scroll position is used (no
 * transformed wrapper), so sticky and fixed elements are unaffected.
 */
export function SmoothScroll() {
  const pathname = usePathname()
  const current = useRef<Lenis>(null)

  useEffect(() => {
    const media = gsap.matchMedia()

    media.add(MOTION.animate, () => {
      const lenis = new Lenis({ lerp: 0.1 })
      current.current = lenis
      lenis.on("scroll", ScrollTrigger.update)
      const tick = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)

      const onClick = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0) return
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return

        const link = (event.target as Element).closest("a")
        if (!link?.href || link.target === "_blank") return
        const url = new URL(link.href)
        if (url.origin !== location.origin) return
        if (url.pathname !== location.pathname) return halt(lenis)

        const target = url.hash ? findTarget(url.hash) : undefined
        // Focus targets (the skip link) keep the browser's instant jump.
        if (url.hash && (!target || target.tagName === "MAIN")) return

        // Next's <Link> steps aside once the default is prevented.
        event.preventDefault()
        if (url.href !== location.href) history.pushState(null, "", url)

        // One frame, so that a closing menu can release its scroll lock.
        requestAnimationFrame(() => {
          lenis.resize()
          if (!target) return lenis.scrollTo(0, { duration: 1.2 })
          lenis.scrollTo(target, { duration: 1.2 })
          // As a native jump would: keyboard navigation carries on from there.
          target.tabIndex = -1
          target.focus({ preventScroll: true })
        })
      }
      const onPopState = () => halt(lenis)

      // Grabbing the custom scrollbar takes over from any scroll in flight.
      const onPointerDown = (event: PointerEvent) => {
        if ((event.target as Element).closest("[data-scrollbar]")) halt(lenis)
      }

      document.addEventListener("pointerdown", onPointerDown, true)
      document.addEventListener("click", onClick, true)
      window.addEventListener("popstate", onPopState)

      return () => {
        document.removeEventListener("pointerdown", onPointerDown, true)
        document.removeEventListener("click", onClick, true)
        window.removeEventListener("popstate", onPopState)
        gsap.ticker.remove(tick)
        lenis.destroy()
        current.current = null
      }
    })

    return () => media.revert()
  }, [])

  useLayoutEffect(() => {
    if (current.current) halt(current.current)
  }, [pathname])

  return null
}

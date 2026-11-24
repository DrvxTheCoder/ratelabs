"use client"

import { useEffect, useRef, type PointerEvent } from "react"

const MIN_THUMB = 48
/** Gap between the thumb and the ends of the viewport. */
const INSET = 4

/** Lengths needed to map the page's scroll to the thumb and back. */
function measure() {
  const viewport = window.innerHeight
  const page = document.documentElement.scrollHeight
  const track = viewport - INSET * 2
  const thumb = Math.max(MIN_THUMB, (track * viewport) / page)
  return { range: page - viewport, thumb, travel: track - thumb }
}

/**
 * Floating thumb drawn over the page in place of the browser's scrollbar, which
 * globals.css hides for mouse users. Touch devices keep their native indicator.
 */
export function Scrollbar() {
  const root = useRef<HTMLDivElement>(null)
  const drag = useRef<{ pointer: number; scroll: number }>(null)

  useEffect(() => {
    const element = root.current
    if (!element) return

    const update = () => {
      const { range, thumb, travel } = measure()
      element.style.visibility = range > 1 ? "visible" : "hidden"
      if (range <= 1) return
      const progress = Math.min(1, Math.max(0, window.scrollY / range))
      element.style.height = `${thumb}px`
      element.style.transform = `translateY(${INSET + progress * travel}px)`
    }

    const observer = new ResizeObserver(update)
    observer.observe(document.body)
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    update()

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.dataset.dragging = ""
    drag.current = { pointer: event.clientY, scroll: window.scrollY }
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    const { range, travel } = measure()
    if (travel <= 0) return
    const moved = event.clientY - drag.current.pointer
    window.scrollTo({
      top: drag.current.scroll + (moved / travel) * range,
      behavior: "instant",
    })
  }

  const onRelease = (event: PointerEvent<HTMLDivElement>) => {
    drag.current = null
    delete event.currentTarget.dataset.dragging
  }

  return (
    <div
      ref={root}
      data-scrollbar
      aria-hidden="true"
      className="group/bar invisible fixed top-0 right-0 z-55 hidden w-3.5 touch-none pointer-fine:block"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onLostPointerCapture={onRelease}
    >
      <div className="absolute inset-y-0 right-1 w-1 rounded-full bg-ash opacity-70 transition-[width,opacity] duration-200 group-hover/bar:w-1.5 group-hover/bar:opacity-100 group-data-dragging/bar:w-1.5 group-data-dragging/bar:opacity-100 motion-reduce:transition-none" />
    </div>
  )
}

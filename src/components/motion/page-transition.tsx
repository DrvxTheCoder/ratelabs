"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "cn"

import { Logo } from "@/components/ui/logo"

import { gsap, MOTION, ScrollTrigger } from "./gsap"
import { setCovered } from "./page-cover"

const BELOW = 120
const ABOVE = -120
const SWEEP = { ease: "power3.inOut", stagger: 0.07 }
/** Uncovers the page if a navigation never commits (network failure). */
const NAVIGATION_TIMEOUT = 4000

type Navigate = (href: string) => boolean

const PageTransitionContext = createContext<{ navigate: Navigate }>({
  navigate: () => false,
})

/**
 * `navigate(href)` plays the transition, then changes page. It returns `false`
 * when there is nothing to play, and the link should navigate by itself.
 */
export function usePageTransition() {
  return useContext(PageTransitionContext)
}

const panel =
  "absolute inset-x-0 -top-[15vh] h-[130vh] [clip-path:polygon(0_0,50%_9%,100%_0,100%_91%,50%_100%,0_91%)]"

/**
 * Two chevron panels, orange edging Void, that sweep up over the page and off
 * again once the next one is in place. Links opt in through `LocaleLink`.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const cover = useRef<HTMLDivElement>(null)
  const tween = useRef<gsap.core.Tween>(null)
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)
  const pending = useRef(false)

  const uncover = useCallback(() => {
    clearTimeout(timeout.current)
    tween.current?.kill()
    pending.current = false
    setCovered(false)
    if (!cover.current) return

    const [orange, ink] = cover.current.children
    tween.current = gsap.to([ink, orange], {
      ...SWEEP,
      yPercent: ABOVE,
      duration: 0.7,
      delay: 0.08,
      onComplete: () => {
        gsap.set(cover.current, { autoAlpha: 0 })
        ScrollTrigger.refresh()
      },
    })
  }, [])

  const navigate = useCallback<Navigate>(
    (href) => {
      if (pending.current) return true
      if (!cover.current || href.split("#")[0] === pathname) return false
      if (!window.matchMedia(MOTION.animate).matches) return false

      pending.current = true
      tween.current?.kill()
      gsap.set(cover.current, { autoAlpha: 1 })
      tween.current = gsap.fromTo(
        cover.current.children,
        { yPercent: BELOW },
        {
          ...SWEEP,
          yPercent: 0,
          duration: 0.6,
          onComplete: () => {
            setCovered(true)
            router.push(href)
            timeout.current = setTimeout(uncover, NAVIGATION_TIMEOUT)
          },
        }
      )
      return true
    },
    [pathname, router, uncover]
  )

  // Also cancels a cover in progress when the visitor goes back meanwhile.
  useEffect(() => {
    if (pending.current) uncover()
  }, [pathname, uncover])

  useEffect(
    () => () => {
      clearTimeout(timeout.current)
      tween.current?.kill()
      setCovered(false)
    },
    []
  )

  const value = useMemo(() => ({ navigate }), [navigate])

  return (
    <PageTransitionContext value={value}>
      {children}
      <div
        ref={cover}
        data-page-cover
        aria-hidden="true"
        className="pointer-events-none invisible fixed inset-0 z-100 overflow-hidden"
      >
        <div className={cn(panel, "bg-orange")} />
        <div
          className={cn(
            panel,
            "flex items-center justify-center bg-void text-offwhite"
          )}
        >
          <Logo variant="logomark" className="h-16" />
        </div>
      </div>
    </PageTransitionContext>
  )
}

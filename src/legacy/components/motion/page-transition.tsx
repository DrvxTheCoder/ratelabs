"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import { cn } from "cn"

import { LogoMark } from "@/legacy/components/ui/logo"
import { defaultLocale } from "@/i18n/config"
import { gsap, MOTION_OK, ScrollTrigger } from "@/lib/gsap"

const HIDDEN_BELOW = 120
const HIDDEN_ABOVE = -120
/** Uncovers the page if a navigation never commits, such as on a network failure. */
const NAVIGATION_TIMEOUT = 4000

type PageTransitionContextValue = {
  navigate: (href: string) => void
}

const PageTransitionContext =
  React.createContext<PageTransitionContextValue | null>(null)

function usePageTransition() {
  const context = React.useContext(PageTransitionContext)
  if (!context) {
    throw new Error("usePageTransition must be used in <PageTransition>.")
  }
  return context
}

function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const panels = React.useRef<HTMLDivElement>(null)
  const pending = React.useRef(false)
  const timeout = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  const uncover = React.useCallback(() => {
    clearTimeout(timeout.current)
    pending.current = false
    const layers = panels.current?.children
    if (!layers) return

    gsap.to(layers, {
      yPercent: HIDDEN_ABOVE,
      duration: 0.7,
      ease: "power3.inOut",
      stagger: 0.07,
      delay: 0.08,
      onComplete: () => {
        gsap.set(panels.current, { autoAlpha: 0 })
        ScrollTrigger.refresh()
      },
    })
  }, [])

  const navigate = React.useCallback(
    (href: string) => {
      if (pending.current || href === pathname) return

      const layers = panels.current?.children
      if (!layers || !window.matchMedia(MOTION_OK).matches) {
        router.push(href)
        return
      }

      pending.current = true
      gsap.set(panels.current, { autoAlpha: 1 })
      gsap.fromTo(
        [...layers].reverse(),
        { yPercent: HIDDEN_BELOW },
        {
          yPercent: 0,
          duration: 0.6,
          ease: "power3.inOut",
          stagger: 0.07,
          onComplete: () => {
            router.push(href)
            timeout.current = setTimeout(uncover, NAVIGATION_TIMEOUT)
          },
        }
      )
    },
    [pathname, router, uncover]
  )

  React.useEffect(() => {
    if (!pending.current) return
    window.scrollTo({ top: 0, behavior: "instant" })
    uncover()
  }, [pathname, uncover])

  const value = React.useMemo(() => ({ navigate }), [navigate])

  return (
    <PageTransitionContext value={value}>
      {children}
      <div
        ref={panels}
        data-slot="page-transition"
        aria-hidden
        className="pointer-events-none invisible fixed inset-0 z-100 overflow-hidden"
      >
        <div className="absolute inset-x-0 -top-[15vh] h-[130vh] bg-brand [clip-path:polygon(0_0,50%_9%,100%_0,100%_91%,50%_100%,0_91%)]" />
        <div className="absolute inset-x-0 -top-[15vh] flex h-[130vh] items-center justify-center bg-primary text-primary-foreground [clip-path:polygon(0_0,50%_9%,100%_0,100%_91%,50%_100%,0_91%)]">
          <LogoMark className="size-16" />
        </div>
      </div>
    </PageTransitionContext>
  )
}

function useLocalizedHref(href: string) {
  const { lang } = useParams<{ lang?: string }>()
  const prefix = `/${lang ?? defaultLocale}`
  return href === "/" ? prefix : `${prefix}${href}`
}

type TransitionLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  /** Path without the locale prefix, such as `/work`. */
  href: string
}

function TransitionLink({
  href,
  className,
  onNavigate,
  ...props
}: TransitionLinkProps) {
  const { navigate } = usePageTransition()
  const localizedHref = useLocalizedHref(href)

  return (
    <Link
      data-slot="transition-link"
      href={localizedHref}
      className={cn(className)}
      onNavigate={(event) => {
        onNavigate?.(event)
        event.preventDefault()
        navigate(localizedHref)
      }}
      {...props}
    />
  )
}

export { PageTransition, TransitionLink, useLocalizedHref }

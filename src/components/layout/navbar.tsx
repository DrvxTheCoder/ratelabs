"use client"

import { useRef } from "react"
import { cn } from "cn"

import {
  EASE,
  Flip,
  gsap,
  MOTION,
  ScrollTrigger,
  useGSAP,
} from "@/components/motion/gsap"
import { LocaleLink } from "@/components/ui/locale-link"
import { Logo } from "@/components/ui/logo"
import type { NavContent } from "@/content/types"

import { LanguageToggle } from "./language-toggle"
import { MobileMenu } from "./mobile-menu"

const COMPACT_AFTER = 8
/** Everything the Flip morph interpolates besides position and scale. */
const MORPH_PROPS = "color,backgroundColor,borderColor,opacity"

/**
 * Transparent bar that morphs into a floating pill once the page scrolls.
 *
 * Both layouts are plain CSS keyed on `data-compact`. GSAP Flip records the
 * first one, the attribute is switched (one reflow), and the difference is
 * animated with transforms, opacity and colour only.
 */
export function Navbar({ nav }: { nav: NavContent }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const header = root.current
      if (!header) return
      const targets = gsap.utils.toArray<HTMLElement>("[data-morph]", header)

      const apply = (compact: boolean) => {
        header.toggleAttribute("data-compact", compact)
        header.dataset.surface = compact ? "light" : "dark"
      }

      gsap.matchMedia().add(MOTION, (context) => {
        const { reduce } = context.conditions as Record<string, boolean>
        let ready = false

        const morph = (compact: boolean) => {
          if (header.hasAttribute("data-compact") === compact) return
          if (reduce || !ready) return apply(compact)

          const state = Flip.getState(targets, { props: MORPH_PROPS })
          Flip.killFlipsOf(targets)
          gsap.set(targets, { clearProps: "all" })
          apply(compact)
          Flip.from(state, {
            duration: 0.45,
            ease: EASE,
            scale: true,
            onComplete: () => void gsap.set(targets, { clearProps: "all" }),
          })
        }

        ScrollTrigger.create({
          start: COMPACT_AFTER,
          end: "max",
          onEnter: () => morph(true),
          onLeaveBack: () => morph(false),
        })
        morph(window.scrollY > COMPACT_AFTER)
        ready = true
      })
    },
    { scope: root }
  )

  return (
    <header
      ref={root}
      data-surface="dark"
      className="group/nav pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center"
    >
      <div
        className={cn(
          "pointer-events-auto relative isolate flex w-full max-w-page items-center justify-between gap-4 border border-transparent px-gutter py-4 nav:py-7",
          "group-data-compact/nav:mt-3.5 group-data-compact/nav:w-[calc(100%-32px)] group-data-compact/nav:max-w-[780px] group-data-compact/nav:gap-6 group-data-compact/nav:py-1.5 group-data-compact/nav:pr-1.5 group-data-compact/nav:pl-[22px]"
        )}
      >
        <span
          data-morph
          aria-hidden="true"
          className="absolute -inset-px -z-10 rounded-full border border-line bg-glass-light opacity-0 shadow-nav backdrop-blur-[14px] group-data-compact/nav:opacity-100"
        />

        <LocaleLink
          href="/#top"
          aria-label={nav.labels.home}
          className="flex min-h-11 items-center nav:min-h-0"
        >
          <Logo
            data-morph
            className="text-offwhite group-data-compact/nav:text-[21px] group-data-compact/nav:text-void"
          />
        </LocaleLink>

        <nav aria-label={nav.labels.primary} className="hidden nav:block">
          <ul className="flex gap-8 group-data-compact/nav:gap-6">
            {nav.links.map((link) => (
              <li key={link.href}>
                <LocaleLink
                  data-morph
                  href={link.href}
                  className="relative block text-[14px] font-medium whitespace-nowrap text-offwhite after:absolute after:-inset-x-2 after:-inset-y-3 group-data-compact/nav:text-[13px] group-data-compact/nav:text-void"
                >
                  {link.label}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5 max-nav:gap-2">
          <LanguageToggle
            label={nav.labels.switchLanguage}
            className="max-nav:hidden group-data-compact/nav:hidden"
          />
          <LocaleLink
            data-morph
            href={nav.cta.href}
            className={cn(
              "hidden min-h-11 items-center rounded-full border border-line-nav px-[22px] text-[14px] font-medium whitespace-nowrap text-offwhite sm:inline-flex",
              "group-data-compact/nav:min-h-10 group-data-compact/nav:border-void group-data-compact/nav:bg-void group-data-compact/nav:px-[18px] group-data-compact/nav:text-[13px]"
            )}
          >
            {nav.cta.label}
          </LocaleLink>
          <MobileMenu
            nav={nav}
            className="flex size-11 items-center justify-center rounded-full text-offwhite group-data-compact/nav:text-void nav:hidden"
          />
        </div>
      </div>
    </header>
  )
}

"use client"

import { useRef, useState, type ReactNode } from "react"
import { Dialog } from "@base-ui/react/dialog"

import { gsap, MOTION, useGSAP } from "@/components/motion/gsap"
import { HIDDEN, REVEAL, SHOWN } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { CloseIcon, MenuIcon } from "@/components/ui/icons"
import { LocaleLink } from "@/components/ui/locale-link"
import { Logo } from "@/components/ui/logo"
import type { NavContent } from "@/content/types"

import { LanguageToggle } from "./language-toggle"

/** Plays the entrance when the portal mounts it, which is after `open` flips. */
function MenuPanel({ children }: { children: ReactNode }) {
  const panel = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION.animate, () => {
        gsap
          .timeline()
          .from(panel.current, {
            autoAlpha: 0,
            duration: 0.35,
            ease: REVEAL.ease,
          })
          .fromTo(
            "[data-menu-item]",
            HIDDEN,
            { ...SHOWN, duration: 0.6, ease: REVEAL.ease, stagger: 0.06 },
            0.1
          )
      })
    },
    { scope: panel }
  )

  return (
    <div
      ref={panel}
      className="flex min-h-full flex-col bg-void px-gutter pt-4 pb-8"
    >
      {children}
    </div>
  )
}

type MobileMenuProps = { nav: NavContent; className?: string }

/** Full-screen menu under 821px. Focus trap and scroll lock come from Base UI. */
export function MobileMenu({ nav, className }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const popup = useRef<HTMLDivElement>(null)
  const actions = useRef<Dialog.Root.Actions>(null)
  const close = () => setOpen(false)

  // `actionsRef` hands us the unmount, so the exit can finish first. Reopening
  // mid-exit reverts the tween.
  useGSAP(
    () => {
      if (open || !popup.current) return

      gsap.matchMedia().add(MOTION, (context) => {
        const { reduce } = context.conditions as Record<string, boolean>
        gsap.to(popup.current, {
          autoAlpha: 0,
          duration: reduce ? 0 : 0.25,
          ease: REVEAL.ease,
          onComplete: () => actions.current?.unmount(),
        })
      })
    },
    { dependencies: [open], revertOnUpdate: true }
  )

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} actionsRef={actions}>
      <Dialog.Trigger aria-label={nav.labels.openMenu} className={className}>
        <MenuIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup
          ref={popup}
          data-surface="dark"
          data-lenis-prevent
          className="fixed inset-0 z-60 overflow-y-auto text-offwhite outline-none"
        >
          <MenuPanel>
            <Dialog.Title className="sr-only">{nav.labels.menu}</Dialog.Title>
            <div className="flex items-center justify-between">
              <LocaleLink
                href="/"
                onClick={close}
                aria-label={nav.labels.home}
                className="flex min-h-11 items-center"
              >
                <Logo />
              </LocaleLink>
              <Dialog.Close
                aria-label={nav.labels.closeMenu}
                className="flex size-11 items-center justify-center rounded-full border border-line-ring"
              >
                <CloseIcon />
              </Dialog.Close>
            </div>

            <nav
              aria-label={nav.labels.primary}
              className="flex flex-1 flex-col justify-center py-10"
            >
              <ul className="flex flex-col gap-2">
                {nav.links.map((link) => (
                  <li key={link.href} data-menu-item>
                    <LocaleLink
                      href={link.href}
                      onClick={close}
                      className="inline-flex min-h-14 items-center type-h2"
                    >
                      {link.label}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div
              data-menu-item
              className="flex flex-wrap items-center justify-between gap-4"
            >
              <Button variant="accent" href={nav.cta.href} onClick={close}>
                {nav.cta.label}
              </Button>
              <LanguageToggle label={nav.labels.switchLanguage} />
            </div>
          </MenuPanel>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

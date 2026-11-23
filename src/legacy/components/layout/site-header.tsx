"use client"

import * as React from "react"
import { useParams, usePathname } from "next/navigation"
import { ArrowRightIcon, MenuIcon } from "lucide-react"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { cn } from "cn"

import { LanguageSwitcher } from "@/legacy/components/layout/language-switcher"
import { TransitionLink } from "@/legacy/components/motion/page-transition"
import { Button, buttonVariants } from "@/legacy/components/ui/button"
import { Logo } from "@/legacy/components/ui/logo"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/legacy/components/ui/sheet"
import type { Dictionary } from "@/i18n/dictionaries/fr"
import { navLinks } from "@/lib/site"

const HIDE_AFTER = 160

function useActiveHref() {
  const pathname = usePathname()
  const { lang } = useParams<{ lang: string }>()
  return pathname.slice(`/${lang}`.length) || "/"
}

function MobileNav({ nav }: { nav: Dictionary["nav"] }) {
  const [open, setOpen] = React.useState(false)
  const active = useActiveHref()
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="secondary"
            size="icon"
            aria-label={nav.openMenu}
            className="lg:hidden"
          />
        }
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent
        side="right"
        closeLabel={nav.closeMenu}
        className="dark bg-background p-6 pt-20 text-foreground data-[side=right]:w-full data-[side=right]:sm:max-w-md"
      >
        <SheetTitle className="sr-only">{nav.menuTitle}</SheetTitle>
        <SheetDescription className="sr-only">{nav.primary}</SheetDescription>
        <nav aria-label={nav.primary} className="flex flex-1 flex-col gap-1">
          {navLinks.map((link) => (
            <TransitionLink
              key={link.key}
              href={link.href}
              onClick={close}
              aria-current={active === link.href ? "page" : undefined}
              className="font-display text-6xl leading-tight transition-colors aria-[current]:text-brand"
            >
              {nav[link.key]}
            </TransitionLink>
          ))}
        </nav>
        <div className="flex items-center justify-between gap-4">
          <LanguageSwitcher label={nav.language} />
          <TransitionLink
            href="/contact"
            onClick={close}
            className={buttonVariants({ variant: "brand" })}
          >
            {nav.cta}
          </TransitionLink>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function SiteHeader({ nav }: { nav: Dictionary["nav"] }) {
  const active = useActiveHref()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = React.useState(false)

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0
    setHidden(current > previous && current > HIDE_AFTER)
  })

  return (
    <motion.header
      data-slot="site-header"
      initial={false}
      animate={{ y: hidden ? "-130%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-x-0 top-3 z-50"
      onFocusCapture={() => setHidden(false)}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4 rounded-2xl border border-foreground/5 bg-background/85 pr-2.5 pl-4 shadow-[0_8px_30px_-12px_rgb(30_30_38/0.18)] backdrop-blur-md">
          <TransitionLink
            href="/"
            aria-label={nav.home}
            className="rounded-md transition-opacity outline-none hover:opacity-75 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Logo aria-hidden className="h-10" />
          </TransitionLink>

          <nav aria-label={nav.primary} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = active === link.href
                return (
                  <li key={link.key}>
                    <TransitionLink
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "relative block rounded-xl px-4 py-2 text-sm font-semibold outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                        !isActive &&
                          "text-muted-foreground transition-colors hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-xl bg-muted"
                          transition={{
                            type: "spring",
                            bounce: 0.15,
                            duration: 0.5,
                          }}
                        />
                      )}
                      {nav[link.key]}
                    </TransitionLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher label={nav.language} className="hidden sm:flex" />
            <TransitionLink
              href="/contact"
              className={cn(buttonVariants(), "hidden lg:inline-flex")}
            >
              {nav.cta}
              <ArrowRightIcon
                data-icon="inline-end"
                className="transition-transform group-hover/button:translate-x-0.5"
              />
            </TransitionLink>
            <MobileNav nav={nav} />
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export { SiteHeader }

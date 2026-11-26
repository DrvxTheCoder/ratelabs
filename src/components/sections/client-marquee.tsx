"use client"

import { useRef } from "react"
import Image from "next/image"
import { cn } from "cn"

import { EASE_SOFT, gsap, MOTION, useGSAP } from "@/components/motion/gsap"
import { FadeUp } from "@/components/motion/fade-up"
import { Section } from "@/components/ui/section"
import { clients } from "@/content/clients"
import type { ClientsContent } from "@/content/types"

/** Even: the loop shifts by half the track, which must outspan the widest screens. */
const COPIES = 6
/** Seconds per loop. */
const DURATION = 85
const REST_OPACITY = 0.55

function MarqueeRow() {
  const row = useRef<HTMLDivElement>(null)

  useGSAP(
    (_, contextSafe) => {
      const element = row.current
      if (!element || !contextSafe) return

      const hoverLogo = contextSafe((event: Event, opacity: number) => {
        const logo = (event.target as Element).closest("[data-logo]")
        if (logo) {
          gsap.to(logo, { opacity, duration: 0.3, ease: EASE_SOFT })
        }
      })
      const highlight = (event: Event) => hoverLogo(event, 1)
      const dim = (event: Event) => hoverLogo(event, REST_OPACITY)
      element.addEventListener("pointerover", highlight)
      element.addEventListener("pointerout", dim)

      gsap.matchMedia().add(MOTION.animate, () => {
        const loop = gsap
          .timeline({
            repeat: -1,
            scrollTrigger: {
              trigger: element,
              toggleActions: "play pause resume pause",
            },
          })
          .fromTo(
            "[data-track]",
            { xPercent: 0 },
            { xPercent: -50, duration: DURATION, ease: "none" }
          )

        const speed = (timeScale: number) => () =>
          void gsap.to(loop, { timeScale, duration: 0.4, overwrite: true })
        const slow = speed(0)
        const resume = speed(1)
        element.addEventListener("pointerenter", slow)
        element.addEventListener("pointerleave", resume)

        return () => {
          element.removeEventListener("pointerenter", slow)
          element.removeEventListener("pointerleave", resume)
        }
      })

      return () => {
        element.removeEventListener("pointerover", highlight)
        element.removeEventListener("pointerout", dim)
      }
    },
    { scope: row }
  )

  return (
    <div ref={row} className="overflow-hidden">
      <div data-track className="flex w-max">
        {Array.from({ length: COPIES }, (_, copy) =>
          clients.map(({ name, wordmark, logo }) => (
            <div
              key={`${copy}-${name}`}
              data-logo
              className="flex h-16 flex-none items-center px-11 whitespace-nowrap"
              style={{ opacity: REST_OPACITY }}
            >
              {logo ? (
                // Eager: lazy logos would pop in as the track brings them on screen.
                <Image
                  src={logo.src}
                  alt=""
                  width={logo.width}
                  height={logo.height}
                  sizes="220px"
                  quality={90}
                  loading="eager"
                  draggable={false}
                  className={cn("w-auto max-w-none", logo.className)}
                />
              ) : (
                <span className={cn(wordmark)}>{name}</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export function ClientMarquee({ content }: { content: ClientsContent }) {
  return (
    <Section
      lang={content.lang}
      aria-label={content.label}
      className="overflow-hidden"
    >
      <FadeUp className="mb-9 text-center type-eyebrow text-ink-2">
        <p>{content.label}</p>
      </FadeUp>
      <FadeUp
        aria-hidden="true"
        className="mask-[linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
      >
        <MarqueeRow />
      </FadeUp>
    </Section>
  )
}

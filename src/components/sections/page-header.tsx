"use client"

import { useRef } from "react"
import { cn } from "cn"

import { gsap, MOTION, useGSAP } from "@/components/motion/gsap"
import {
  addWordReveal,
  HIDDEN,
  REVEAL,
  SHOWN,
} from "@/components/motion/reveal"
import { headlineText, SplitWords } from "@/components/motion/split-words"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { MediaFrame } from "@/components/ui/media-frame"
import { Section } from "@/components/ui/section"
import type { LinkItem, PageHeaderContent } from "@/content/types"

type PageHeaderProps = {
  content: PageHeaderContent & { cta?: LinkItem }
  className?: string
}

/** Image-led band that opens every inner page, with the hero's word reveal. */
export function PageHeader({ content, className }: PageHeaderProps) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const element = root.current
      if (!element) return

      gsap.matchMedia().add(MOTION.animate, () => {
        const details = element.querySelectorAll("[data-reveal]")
        gsap.set(element.querySelectorAll("[data-word]"), HIDDEN)
        gsap.set(details, HIDDEN)

        const timeline = gsap.timeline()
        addWordReveal(timeline, element, 0.15)
        timeline.to(
          details,
          {
            ...SHOWN,
            duration: REVEAL.duration,
            ease: REVEAL.ease,
            stagger: 0.15,
          },
          0.6
        )
      })

      // From here on GSAP owns the hidden state painted by globals.css.
      element.dataset.revealRoot = "ready"
    },
    { scope: root }
  )

  return (
    <Section
      lang={content.lang}
      surface="dark"
      space="none"
      className={cn(
        "relative isolate flex min-h-[520px] items-center justify-center overflow-hidden px-gutter pt-36 pb-24 text-center",
        className
      )}
    >
      <MediaFrame
        {...content.media}
        captionPosition="none"
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-void/45" />
      </MediaFrame>
      <div
        ref={root}
        data-reveal-root="pending"
        className="flex max-w-[860px] flex-col items-center"
      >
        <Eyebrow tone="dark" star={false}>
          {content.eyebrow}
        </Eyebrow>
        <h1
          aria-label={headlineText([content.title])}
          className="mt-5 mb-4 type-cta"
        >
          <SplitWords lines={[content.title]} align="center" />
        </h1>
        {content.lead && (
          <p data-reveal className="max-w-[560px] type-body text-mist-2">
            {content.lead}
          </p>
        )}
        {content.cta && (
          <div data-reveal className="mt-9">
            <Button variant="accent" href={content.cta.href}>
              {content.cta.label}
            </Button>
          </div>
        )}
      </div>
    </Section>
  )
}

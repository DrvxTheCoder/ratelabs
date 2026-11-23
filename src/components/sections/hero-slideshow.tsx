"use client"

import { useRef } from "react"
import { cn } from "cn"

import { EASE_SOFT, gsap, useGSAP } from "@/components/motion/gsap"
import { headlineText, SplitWords } from "@/components/motion/split-words"
import { useReducedMotion } from "@/components/motion/use-media-query"
import { useSlideTransitions } from "@/components/motion/use-slide-transitions"
import { useSlideshow } from "@/components/motion/use-slideshow"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { MediaCaption, MediaFrame } from "@/components/ui/media-frame"
import { PauseButton } from "@/components/ui/pause-button"
import { Section } from "@/components/ui/section"
import type { HeroContent } from "@/content/types"

const INTERVAL = 7.5

type HeroSlideshowProps = { content: HeroContent; id?: string }

export function HeroSlideshow({ content, id = "top" }: HeroSlideshowProps) {
  const { slides, labels } = content
  const root = useRef<HTMLElement>(null)
  const indicator = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()

  const { index, paused, goTo, togglePause, rootProps } = useSlideshow({
    count: slides.length,
    interval: INTERVAL,
    progressRef: indicator,
  })

  useSlideTransitions(root, index, {
    fade: { duration: 1.2, delay: 0.35 },
    zoom: { from: 1.06, duration: INTERVAL + 1.5 },
    wordsAt: 0.85,
  })

  useGSAP(
    () => {
      gsap.to("[data-track]", {
        scaleX: (position) => (position === index ? 1 : 0),
        duration: reduced ? 0 : 0.4,
        ease: EASE_SOFT,
        overwrite: true,
      })
    },
    { dependencies: [index, reduced], scope: indicator }
  )

  return (
    <Section
      ref={root}
      id={id}
      lang={content.lang}
      surface="dark"
      space="none"
      aria-label={labels.region}
      className="relative h-[clamp(640px,100svh,780px)] overflow-hidden stack:h-[780px]"
      {...rootProps}
    >
      <div aria-live={paused ? "polite" : "off"}>
        {slides.map((slide, position) => {
          const active = position === index
          const Heading = position === 0 ? "h1" : "h2"

          return (
            <div
              key={slide.lines.join()}
              data-slide
              role="group"
              aria-label={`${position + 1} / ${slides.length}`}
              aria-hidden={!active}
              inert={!active}
              className={cn(
                "absolute inset-0",
                position > 0 && "invisible opacity-0"
              )}
            >
              <MediaFrame
                data-slide-image
                {...slide.media}
                captionPosition="none"
                preload={position === 0}
                className="absolute inset-0"
              />
              {!slide.media.src && (
                <MediaCaption
                  position="top-right"
                  className="top-28 tracking-[.04em] max-stack:top-20 max-stack:right-6"
                >
                  {slide.media.caption}
                </MediaCaption>
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(9_9_15/.55)_0%,rgb(9_9_15/0)_30%,rgb(9_9_15/.85)_100%)]" />

              <div className="absolute inset-x-0 bottom-0">
                <Container
                  inset
                  className="flex flex-wrap items-end justify-between gap-8 pb-18 max-stack:pb-26"
                >
                  <div className="max-w-[680px]">
                    <Heading
                      aria-label={headlineText(slide.lines)}
                      className="mb-5 type-hero"
                    >
                      <SplitWords lines={slide.lines} />
                    </Heading>
                    <p
                      data-reveal="1.7"
                      className="max-w-[480px] type-lead text-mist-2"
                    >
                      {slide.lead}
                    </p>
                  </div>
                  <div data-reveal="2.1">
                    <Button
                      variant="accent"
                      href={slide.cta.href}
                      tabIndex={active ? 0 : -1}
                    >
                      {slide.cta.label}
                    </Button>
                  </div>
                </Container>
              </div>
            </div>
          )
        })}
      </div>

      <div className="absolute top-1/2 right-5 z-3 flex -translate-y-1/2 flex-col items-end max-stack:inset-x-3 max-stack:top-auto max-stack:bottom-6 max-stack:translate-y-0 max-stack:flex-row max-stack:items-center max-stack:justify-between">
        <ol
          ref={indicator}
          className="flex flex-col items-end gap-0.5 max-stack:flex-row"
        >
          {slides.map((slide, position) => {
            const active = position === index
            return (
              <li key={slide.lines.join()}>
                <button
                  type="button"
                  onClick={() => goTo(position)}
                  aria-label={labels.goTo.replace("{n}", String(position + 1))}
                  aria-current={active}
                  className={cn(
                    "relative flex min-h-11 min-w-11 items-center justify-end px-3 type-counter max-stack:justify-center",
                    active ? "font-medium text-offwhite" : "text-ash"
                  )}
                >
                  <span
                    data-track
                    aria-hidden="true"
                    className="absolute right-full -mr-0.5 block h-px w-9 origin-right overflow-hidden bg-track max-stack:hidden"
                    style={{
                      transform: position === 0 ? undefined : "scaleX(0)",
                    }}
                  >
                    <span
                      className="block h-px origin-left bg-offwhite"
                      style={{
                        transform: active
                          ? "scaleX(var(--progress, 0))"
                          : "scaleX(0)",
                      }}
                    />
                  </span>
                  <span>0{position + 1}</span>
                </button>
              </li>
            )
          })}
        </ol>
        <PauseButton
          paused={paused}
          labels={labels}
          onToggle={togglePause}
          className="mt-2 max-stack:mt-0"
        />
      </div>
    </Section>
  )
}

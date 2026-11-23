"use client"

import { useRef } from "react"
import { cn } from "cn"

import { useSlideTransitions } from "@/components/motion/use-slide-transitions"
import { useSlideshow } from "@/components/motion/use-slideshow"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { IconButton } from "@/components/ui/icon-button"
import { LongArrowLeftIcon, LongArrowRightIcon } from "@/components/ui/icons"
import { MediaCaption, MediaFrame } from "@/components/ui/media-frame"
import { PauseButton } from "@/components/ui/pause-button"
import { Section } from "@/components/ui/section"
import type { SectorsContent } from "@/content/types"

type SectorSlideshowProps = { content: SectorsContent; id?: string }

export function SectorSlideshow({ content, id }: SectorSlideshowProps) {
  const { slides, labels } = content
  const root = useRef<HTMLElement>(null)

  const { index, paused, next, previous, togglePause, rootProps } =
    useSlideshow({ count: slides.length, interval: 6.5 })

  useSlideTransitions(root, index, {
    fade: { duration: 1, delay: 0.2 },
    zoom: { from: 1.05, duration: 8 },
  })

  return (
    <Section
      ref={root}
      id={id}
      lang={content.lang}
      surface="dark"
      space="none"
      aria-label={labels.region}
      className="relative h-[600px] overflow-hidden"
      {...rootProps}
    >
      <div aria-live={paused ? "polite" : "off"}>
        {slides.map((slide, position) => {
          const active = position === index
          return (
            <div
              key={slide.title}
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
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(9_9_15/.7)_0%,rgb(9_9_15/0)_60%)]" />
              {!slide.media.src && (
                <MediaCaption
                  position="top-right"
                  className="max-stack:right-6"
                >
                  {slide.media.caption}
                </MediaCaption>
              )}
              <Container inset className="relative pt-18">
                <div data-reveal="0.6">
                  <Eyebrow tone="dark" star={false}>
                    {content.eyebrow}
                  </Eyebrow>
                  <h2 className="my-3 type-h2">{slide.title}</h2>
                  <p className="max-w-[380px] type-body-sm text-mist-2">
                    {slide.description}
                  </p>
                </div>
              </Container>
            </div>
          )
        })}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-3">
        <Container inset className="flex items-center gap-2 pb-8 type-counter">
          <IconButton label={labels.previous ?? ""} onClick={previous}>
            <LongArrowLeftIcon />
          </IconButton>
          <span className="min-w-[52px] text-center">
            0{index + 1} / 0{slides.length}
          </span>
          <IconButton label={labels.next ?? ""} onClick={next}>
            <LongArrowRightIcon />
          </IconButton>
          <PauseButton
            paused={paused}
            labels={labels}
            onToggle={togglePause}
            className="ml-3"
          />
        </Container>
      </div>
    </Section>
  )
}

"use client"

import * as React from "react"
import { cn } from "cn"

import { Reveal } from "@/components/motion/reveal"
import {
  SectionEyebrow,
  SectionHeading,
  SectionTitle,
} from "@/components/ui/section-heading"
import type { Dictionary } from "@/i18n/dictionaries/fr"
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap"

const DESKTOP = "(min-width: 64rem)"

function ProcessTimeline({
  process,
}: {
  process: Dictionary["home"]["process"]
}) {
  const root = React.useRef<HTMLOListElement>(null)

  useGSAP(
    () => {
      const build = (axis: "scaleX" | "scaleY") => () => {
        const nodes = gsap.utils.toArray<HTMLElement>("[data-step-node]")
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        })

        timeline.from("[data-step-line]", {
          [axis]: 0,
          duration: 1,
          ease: "none",
        })
        nodes.forEach((node, index) => {
          timeline.from(
            node,
            {
              backgroundColor: "#343045",
              color: "#edebe4",
              duration: 0.05,
            },
            index / nodes.length
          )
        })
      }

      const media = gsap.matchMedia()
      media.add(`${MOTION_OK} and ${DESKTOP}`, build("scaleX"))
      media.add(`${MOTION_OK} and (max-width: 63.99rem)`, build("scaleY"))
    },
    { scope: root }
  )

  return (
    <section
      data-slot="process-timeline"
      className="dark chevron-band bg-background py-[calc(var(--chevron)+5rem)] text-foreground"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading className="mb-14 lg:mb-6">
            <SectionEyebrow>{process.eyebrow}</SectionEyebrow>
            <SectionTitle>{process.title}</SectionTitle>
          </SectionHeading>
        </Reveal>

        <ol
          ref={root}
          className="relative grid gap-10 lg:min-h-112 lg:grid-cols-4 lg:gap-8"
        >
          <span
            aria-hidden
            className="absolute inset-y-0 left-5.5 w-0.5 bg-secondary lg:inset-x-0 lg:top-1/2 lg:bottom-auto lg:left-0 lg:h-0.5 lg:w-auto lg:-translate-y-1/2"
          >
            <span
              data-step-line
              className="block size-full origin-top bg-brand lg:origin-left"
            />
          </span>

          {process.steps.map((step, index) => {
            const above = index % 2 === 1
            return (
              <li
                key={step.title}
                className="relative grid grid-cols-[auto_1fr] gap-x-5 lg:grid-cols-1 lg:grid-rows-[1fr_auto_1fr]"
              >
                <span
                  data-step-node
                  className="z-10 flex size-11 items-center justify-center rounded-full bg-brand font-display text-xl text-brand-foreground lg:row-start-2"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div
                  className={cn(
                    "flex flex-col gap-2",
                    above
                      ? "lg:row-start-1 lg:self-end lg:pb-7"
                      : "lg:row-start-3 lg:pt-7"
                  )}
                >
                  <h3 className="font-display text-[2rem] leading-none">
                    {step.title}
                  </h3>
                  <p className="max-w-xs text-[0.95rem] leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export { ProcessTimeline }

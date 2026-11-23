"use client"

import { useRef } from "react"

import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap"
import { Container } from "@/components/ui/container"
import { MediaFrame } from "@/components/ui/media-frame"
import { Pill } from "@/components/ui/pill"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import type { WhyContent } from "@/content/types"

/** Distance from the top of the viewport at which cards stick. */
const STICKY_TOP = 112
/** What one fully stacked card does to those underneath. */
const LIFT = 14
const SHRINK = 0.05

type WhyStackProps = {
  content: WhyContent
  id?: string
  /** `bottom` when the previous section already leaves room above. */
  space?: "both" | "bottom"
}

/**
 * Sticky stacking cards. Each card slides over the previous ones, which scale
 * down and lift slightly. Under 761px, or with reduced motion, a plain list.
 */
export function WhyStack({ content, id, space = "both" }: WhyStackProps) {
  const list = useRef<HTMLOListElement>(null)

  useGSAP(
    () => {
      const element = list.current
      if (!element) return

      gsap
        .matchMedia()
        .add(
          "(prefers-reduced-motion: no-preference) and (min-width: 761px)",
          () => {
            const items = gsap.utils.toArray<HTMLElement>(
              "[data-card]",
              element
            )
            const setters = items.map((item) =>
              gsap.quickSetter(item.firstElementChild, "css")
            )
            const progress = items.map(() => 0)
            const height = () => items[0].offsetHeight
            const pitch = () =>
              height() + parseFloat(getComputedStyle(element).rowGap)

            const render = () => {
              let depth = 0
              for (let index = items.length - 1; index >= 0; index--) {
                const scale = 1 - SHRINK * depth
                setters[index]({
                  y: -LIFT * depth,
                  scaleX: scale,
                  scaleY: scale,
                })
                depth += progress[index]
              }
            }

            // Triggered from the list, which never sticks, so that measurements
            // hold wherever the page is scrolled when they are taken.
            items.slice(1).forEach((_, offset) => {
              const index = offset + 1
              const update = (self: ScrollTrigger) => {
                progress[index] = self.progress
                render()
              }
              ScrollTrigger.create({
                trigger: element,
                start: () =>
                  `top+=${index * pitch()} ${STICKY_TOP + height()}px`,
                end: () => `top+=${index * pitch()} ${STICKY_TOP}px`,
                scrub: true,
                invalidateOnRefresh: true,
                onUpdate: update,
                onRefresh: update,
              })
            })
          }
        )
    },
    { scope: list }
  )

  return (
    <Section id={id} lang={content.lang} space={space}>
      <Container>
        <SectionHeader
          align="start"
          eyebrow={content.eyebrow}
          title={content.title}
          titleClassName="max-w-[640px]"
        />
        <ol ref={list} className="mt-14 flex flex-col gap-8 stack:pb-24">
          {content.cards.map((card, index) => (
            <li
              key={card.title}
              data-card
              className="motion-safe:stack:sticky motion-safe:stack:top-sticky stack:h-[460px]"
            >
              <div className="flex h-full origin-top overflow-hidden rounded-panel border border-line bg-white shadow-panel">
                <div className="flex min-w-0 flex-[1_1_50%] flex-col justify-between gap-10 px-6 py-8 stack:px-12 stack:py-11">
                  <p className="type-eyebrow text-ink-2">
                    {`0${index + 1} / 0${content.cards.length}`}
                  </p>
                  <div>
                    <h3 className="mb-4 type-h2">{card.title}</h3>
                    <p className="max-w-[420px] type-lead text-ink-2">
                      {card.description}
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <li key={tag} className="flex">
                        <Pill>{tag}</Pill>
                      </li>
                    ))}
                  </ul>
                </div>
                <MediaFrame
                  {...card.media}
                  sizes="(min-width: 1248px) 576px, 50vw"
                  className="m-3 hidden flex-[1_1_50%] rounded-inset stack:block"
                />
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

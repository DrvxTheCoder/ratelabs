"use client"

import { useRef, useState, type ReactNode } from "react"
import { cn } from "cn"

import { EASE_SOFT, gsap, MOTION, useGSAP } from "@/components/motion/gsap"

export type CardStackItem = {
  id: string
  name: string
  description: string
  logo: ReactNode
}

type CardStackProps = {
  items: CardStackItem[]
  /** `{name}` is replaced by the item's name. */
  labels: { advance: string; show: string }
}

type Slot = { x: number; rotation: number; scale: number; zIndex: number }

const FRONT: Slot = { x: 0, rotation: 0, scale: 1, zIndex: 3 }
const RIGHT: Slot = { x: 32, rotation: 4, scale: 0.84, zIndex: 2 }
const LEFT: Slot = { x: -32, rotation: -4, scale: 0.84, zIndex: 2 }
const BACK: Slot = { x: 0, rotation: 0, scale: 0.8, zIndex: 1 }

function slotFor(position: number, active: number, count: number): Slot {
  const rank = (position - active + count) % count
  if (rank === 0) return FRONT
  if (rank === 1) return RIGHT
  return rank === count - 1 ? LEFT : BACK
}

function slotStyle({ x, rotation, scale, zIndex }: Slot) {
  return {
    zIndex,
    transform: `translateX(${x}px) rotate(${rotation}deg) scale(${scale})`,
  }
}

const cardFace =
  "absolute inset-x-7 inset-y-0 rounded-deck border border-line-2 bg-white shadow-deck"

/** Stack of cards: the front one flicks away and goes to the back. */
export function CardStack({ items, labels }: CardStackProps) {
  const [active, setActive] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const shown = useRef(0)
  const flick = useRef<(to: number, from: number) => void>(null)
  const refocus = useRef(false)
  const count = items.length

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", root.current)
      const faces = cards.map((card) => card.firstElementChild)

      gsap.matchMedia().add(MOTION, (context) => {
        const { reduce } = context.conditions as Record<string, boolean>
        let running: gsap.core.Timeline | undefined

        const settle = (to: number) =>
          cards.forEach((card, position) => {
            gsap.set(card, {
              ...slotFor(position, to, count),
              xPercent: 0,
              opacity: 1,
            })
            gsap.set(faces[position], { opacity: position === to ? 1 : 0 })
          })

        settle(shown.current)

        context.add("flick", (to: number, from: number) => {
          running?.kill()
          if (reduce) return settle(to)

          const timeline = gsap.timeline({
            defaults: { duration: 0.5, ease: "power3.out" },
          })
          running = timeline

          cards.forEach((card, position) => {
            const slot = slotFor(position, to, count)
            const face = faces[position]

            if (position !== from) {
              timeline
                .set(card, { zIndex: slot.zIndex }, 0)
                .to(card, { ...slot, xPercent: 0, opacity: 1 }, 0)
                .to(
                  face,
                  {
                    opacity: position === to ? 1 : 0,
                    duration: 0.3,
                    ease: EASE_SOFT,
                  },
                  position === to ? 0.15 : 0
                )
              return
            }

            // The outgoing card flies off to the right, then returns behind.
            timeline
              .set(card, { zIndex: 4 }, 0)
              .to(card, { x: 0, xPercent: 80, rotation: 14, scale: 1 }, 0)
              .to(card, { opacity: 0, duration: 0.35, ease: EASE_SOFT }, 0)
              .set(card, { zIndex: slot.zIndex }, 0.5)
              .set(face, { opacity: 0 }, 0.5)
              .to(card, { ...slot, xPercent: 0, opacity: 1 }, 0.5)
          })
        })

        flick.current = (to, from) => context.flick(to, from)
      })
    },
    { scope: root }
  )

  useGSAP(
    () => {
      const from = shown.current
      if (from === active) return
      shown.current = active
      flick.current?.(active, from)

      if (refocus.current) {
        refocus.current = false
        root.current
          ?.querySelectorAll<HTMLElement>("[data-card]")
          [active]?.focus({ preventScroll: true })
      }
    },
    { dependencies: [active], scope: root }
  )

  const advance = () => {
    refocus.current = Boolean(
      document.activeElement?.matches("[data-card]") &&
      root.current?.contains(document.activeElement)
    )
    setActive((active + 1) % count)
  }

  return (
    <div ref={root} className="flex w-full flex-col items-center">
      <div className="relative h-[250px] w-full max-w-[240px]">
        {count === 2 && (
          <div
            aria-hidden="true"
            className={cardFace}
            style={slotStyle(LEFT)}
          />
        )}
        {items.map((item, position) => {
          const front = position === active
          return (
            <button
              key={item.id}
              type="button"
              data-card
              onClick={advance}
              tabIndex={front ? 0 : -1}
              aria-hidden={!front}
              aria-label={labels.advance.replace("{name}", item.name)}
              className={cn(
                cardFace,
                "px-3.5 py-5",
                !front && "pointer-events-none"
              )}
              style={slotStyle(slotFor(position, 0, count))}
            >
              <span
                className="flex h-full flex-col items-center justify-center text-center"
                style={{ opacity: position === 0 ? 1 : 0 }}
              >
                <span className="block h-16">{item.logo}</span>
                <span className="mt-5 block type-tech">{item.name}</span>
                <span className="mt-2 block max-w-[150px] type-caption leading-[1.4] text-ink-2">
                  {item.description}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-1 flex items-center">
        {items.map((item, position) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(position)}
            aria-label={labels.show.replace("{name}", item.name)}
            aria-current={position === active}
            className="flex h-11 w-3.5 items-center justify-center"
          >
            <span
              className={cn(
                "block size-[9px] rounded-full border border-void",
                position === active && "bg-void"
              )}
            />
          </button>
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {items[active].name}
      </p>
    </div>
  )
}

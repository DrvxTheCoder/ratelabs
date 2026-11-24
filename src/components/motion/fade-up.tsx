"use client"

import { useRef, type ComponentProps } from "react"

import { useFadeUp } from "./use-fade-up"

type FadeUpProps = Omit<ComponentProps<"div">, "ref"> & {
  as?: "div" | "ul" | "header"
  /** Reveal the children one after the other instead of the element itself. */
  group?: boolean
}

/** Element that fades up the first time it scrolls into view. */
export function FadeUp({ as = "div", group = false, ...props }: FadeUpProps) {
  const root = useRef<HTMLDivElement>(null)
  const Tag = as as "div"

  useFadeUp(root, { group })

  return <Tag ref={root} data-fade={group ? "group" : "self"} {...props} />
}

"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"
import { Flip } from "gsap/Flip"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip, CustomEase)

/** The site's two curves, taken from the prototype. */
export const EASE = "ratel"
export const EASE_SOFT = "ratel-soft"
CustomEase.create(EASE, "0.2,0.7,0.2,1")
CustomEase.create(EASE_SOFT, "0.25,0.1,0.25,1")

/** Pass to `gsap.matchMedia().add()` so both branches are always considered. */
export const MOTION = {
  animate: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
}

export { Flip, gsap, ScrollTrigger, useGSAP }

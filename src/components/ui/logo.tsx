import type { ComponentProps, ComponentType } from "react"
import { cn } from "cn"

import { brandLogo } from "@/content/brand"

type LogoProps = ComponentProps<"span"> & {
  /** Master vector. Defaults to the one registered in `content/brand.ts`. */
  svg?: ComponentType<ComponentProps<"svg">>
}

/** Text stand-in until the master SVG is registered in `content/brand.ts`. */
export function Logo({ svg: Svg = brandLogo, className, ...props }: LogoProps) {
  return (
    <span
      className={cn("block type-wordmark whitespace-nowrap", className)}
      {...props}
    >
      {Svg ? (
        <Svg role="img" aria-label="Ratel Labs" className="h-[1.5em] w-auto" />
      ) : (
        "Ratel Labs"
      )}
    </span>
  )
}

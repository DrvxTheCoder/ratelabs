import type { ComponentProps } from "react"
import { cn } from "cn"

import { brandLogos } from "@/content/brand"

type LogoProps = Omit<ComponentProps<"span">, "children"> & {
  variant?: keyof typeof brandLogos
}

/** Brand lockup, coloured by `currentColor` and sized by its height. */
export function Logo({ variant = "submark", className, ...props }: LogoProps) {
  const Svg = brandLogos[variant]

  return (
    <span className={cn("block h-9 w-fit", className)} {...props}>
      <Svg role="img" aria-label="Ratel Labs" className="block h-full w-auto overflow-visible" />
    </span>
  )
}

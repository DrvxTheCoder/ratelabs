import type { ReactNode } from "react"
import { cn } from "cn"

import { FadeUp } from "@/components/motion/fade-up"

import { Eyebrow } from "./eyebrow"

type SectionHeaderProps = {
  eyebrow: string
  title: ReactNode
  lead?: string
  /** Usually a `<Button>`. */
  cta?: ReactNode
  align?: "center" | "start"
  className?: string
  titleClassName?: string
  leadClassName?: string
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  cta,
  align = "center",
  className,
  titleClassName,
  leadClassName,
}: SectionHeaderProps) {
  return (
    <FadeUp
      as="header"
      group
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={cn("mt-5 max-w-[680px] type-h2", titleClassName)}>
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-4 max-w-[520px] type-body text-ink-2",
            leadClassName
          )}
        >
          {lead}
        </p>
      )}
      {cta && <div className="mt-8">{cta}</div>}
    </FadeUp>
  )
}

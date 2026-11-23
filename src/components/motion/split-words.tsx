import { Fragment } from "react"
import { cn } from "cn"

type SplitWordsProps = {
  /** Designed lines. Each one wraps on its own when it runs out of room. */
  lines: string[]
  align?: "start" | "center"
}

/**
 * Splits a headline into animatable words while keeping it readable as text.
 *
 * Put the full sentence in the heading's `aria-label` (see `headlineText`): the
 * spans are hidden from assistive technology. Words are split on plain spaces
 * only, so "l'exploitation", "back-offices" and non-breaking spaces stay whole.
 */
export function SplitWords({ lines, align = "start" }: SplitWordsProps) {
  return (
    <span aria-hidden="true">
      {lines.map((line, index) => (
        <span
          key={index}
          data-line
          className={cn(
            "flex flex-wrap gap-x-[.14em]",
            align === "center" && "justify-center"
          )}
        >
          {line.split(" ").map((word, position) => (
            <Fragment key={position}>
              <span data-word className="inline-block">
                {word}
              </span>{" "}
            </Fragment>
          ))}
        </span>
      ))}
    </span>
  )
}

export function headlineText(lines: string[]) {
  return lines.join(" ")
}

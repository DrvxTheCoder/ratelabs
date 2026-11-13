import * as React from "react"
import { cn } from "cn"

type MarqueeProps = React.ComponentProps<"div"> & {
  /** Seconds for one full loop. */
  duration?: number
  /** Fade both edges into the background. */
  fade?: boolean
}

function Marquee({
  className,
  children,
  duration = 30,
  fade = false,
  style,
  ...props
}: MarqueeProps) {
  const track = (hidden?: boolean) => (
    <div
      data-slot="marquee-track"
      aria-hidden={hidden}
      className="flex min-w-full shrink-0 items-center justify-around gap-(--marquee-gap) [animation:marquee_var(--marquee-duration)_linear_infinite] group-hover/marquee:[animation-play-state:paused]"
    >
      {children}
    </div>
  )

  return (
    <div
      data-slot="marquee"
      className={cn(
        "group/marquee flex gap-(--marquee-gap) overflow-hidden [--marquee-gap:--spacing(12)]",
        fade &&
          "mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
      style={
        { "--marquee-duration": `${duration}s`, ...style } as React.CSSProperties
      }
      {...props}
    >
      {track()}
      {track(true)}
    </div>
  )
}

export { Marquee }

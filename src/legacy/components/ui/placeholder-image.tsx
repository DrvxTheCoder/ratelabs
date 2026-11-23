import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { LogoMark } from "@/legacy/components/ui/logo"

const placeholderImageVariants = cva(
  "relative isolate flex size-full items-center justify-center overflow-hidden",
  {
    variants: {
      tone: {
        dusk: "bg-[radial-gradient(120%_90%_at_15%_0%,#8e8fa5_0%,#343045_42%,#1e1e26_78%)] text-[#edebe4]",
        slate:
          "bg-[radial-gradient(110%_100%_at_85%_10%,#5c5c72_0%,#343045_50%,#1e1e26_100%)] text-[#edebe4]",
        ember:
          "bg-[radial-gradient(110%_100%_at_20%_10%,#f07a36_0%,#e8621a_55%,#b4460f_100%)] text-[#1e1e26]",
        bone: "bg-[radial-gradient(110%_100%_at_20%_0%,#ffffff_0%,#edebe4_55%,#d9d6cb_100%)] text-[#343045]",
      },
    },
    defaultVariants: {
      tone: "dusk",
    },
  }
)

type PlaceholderImageProps = React.ComponentProps<"div"> &
  VariantProps<typeof placeholderImageVariants> & {
    /** What the final image should show. Used as the accessible name too. */
    label: string
    showLabel?: boolean
  }

/** Stand-in for photography. Swap for `next/image` when assets are ready. */
function PlaceholderImage({
  className,
  tone,
  label,
  showLabel = true,
  ...props
}: PlaceholderImageProps) {
  return (
    <div
      data-slot="placeholder-image"
      role="img"
      aria-label={label}
      className={cn(placeholderImageVariants({ tone }), className)}
      {...props}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grain opacity-40 mix-blend-overlay"
      />
      <LogoMark aria-hidden role="presentation" className="size-14 opacity-25" />
      {showLabel && (
        <span
          aria-hidden
          className="absolute bottom-4 left-4 rounded-full bg-black/25 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
        >
          {label}
        </span>
      )}
    </div>
  )
}

export { PlaceholderImage, placeholderImageVariants }

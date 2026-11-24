import type { ComponentProps, ReactNode } from "react"
import Image from "next/image"
import { cn } from "cn"

import { ImageIcon } from "./icons"

/** An image slot. Without `src` it renders the art-directed placeholder. */
export type Media = {
  src?: string
  /** Empty string for decorative images. */
  alt: string
  /** Art direction for the missing picture; never shown once `src` is set. */
  caption?: string
  /** CSS background of the placeholder. */
  placeholder?: string
}

const DEFAULT_PLACEHOLDER = "linear-gradient(160deg, #34344a, #14141f)"

const warned = new Set<string>()

function warnMissing(caption = "untitled slot") {
  if (process.env.NODE_ENV === "production" || warned.has(caption)) return
  warned.add(caption)
  console.warn(`[MediaFrame] No image yet, showing placeholder: ${caption}`)
}

type MediaFrameProps = Media &
  Omit<ComponentProps<"div">, "children"> & {
    /** CSS aspect-ratio, e.g. `"4 / 3"`. Omit when the parent sets the height. */
    ratio?: string
    sizes?: string
    /** Only for the first hero slide. */
    preload?: boolean
    captionPosition?: "bottom" | "top-right" | "none"
    captionClassName?: string
    /** Layers painted over the picture (scrims, pills). */
    children?: ReactNode
  }

export function MediaFrame({
  src,
  alt,
  caption,
  placeholder = DEFAULT_PLACEHOLDER,
  ratio,
  sizes = "100vw",
  preload = false,
  captionPosition = "bottom",
  captionClassName,
  className,
  style,
  children,
  ...props
}: MediaFrameProps) {
  if (!src) warnMissing(caption)

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        aspectRatio: ratio,
        background: src ? undefined : placeholder,
        ...style,
      }}
      {...props}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          quality={90}
          className="object-cover"
        />
      )}
      {!src && caption && captionPosition !== "none" && (
        <MediaCaption position={captionPosition} className={captionClassName}>
          {caption}
        </MediaCaption>
      )}
      {children}
    </div>
  )
}

type MediaCaptionProps = ComponentProps<"p"> & {
  position: "bottom" | "top-right"
}

export function MediaCaption({
  position,
  className,
  children,
  ...props
}: MediaCaptionProps) {
  return (
    <p
      aria-hidden="true"
      className={cn(
        "absolute flex items-center gap-2 type-mono text-mist",
        position === "bottom"
          ? "inset-x-4 bottom-4"
          : "top-6 right-8 max-w-[calc(100%-4rem)]",
        className
      )}
      {...props}
    >
      <ImageIcon className="shrink-0" />
      <span>{children}</span>
    </p>
  )
}

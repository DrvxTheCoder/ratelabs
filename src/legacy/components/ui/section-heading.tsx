import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const sectionHeadingVariants = cva("flex flex-col gap-4", {
  variants: {
    align: {
      start: "items-start text-left",
      center: "items-center text-center",
    },
  },
  defaultVariants: {
    align: "start",
  },
})

function SectionHeading({
  className,
  align,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof sectionHeadingVariants>) {
  return (
    <div
      data-slot="section-heading"
      className={cn(sectionHeadingVariants({ align }), className)}
      {...props}
    />
  )
}

function SectionEyebrow({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="section-eyebrow"
      className={cn(
        "flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-brand-text uppercase",
        className
      )}
      {...props}
    >
      <svg aria-hidden viewBox="0 0 16 10" className="h-2 w-3.5 fill-current">
        <path d="M0 0 8 3l8-3v7l-8 3-8-3z" />
      </svg>
      {children}
    </p>
  )
}

function SectionTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="section-title"
      className={cn(
        "font-display text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.95] text-balance",
        className
      )}
      {...props}
    />
  )
}

export { SectionHeading, SectionEyebrow, SectionTitle, sectionHeadingVariants }

import type { ComponentProps, ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { ArrowUpRightIcon } from "./icons"
import { LocaleLink } from "./locale-link"

const button = cva(
  "inline-flex min-h-12 items-center gap-3 rounded-full type-copy whitespace-nowrap disabled:opacity-60",
  {
    variants: {
      variant: {
        /** The one primary action of a view. */
        accent: "bg-orange pr-3 pl-6 font-semibold text-void",
        solid: "bg-void pr-2 pl-[22px] font-medium text-offwhite",
      },
    },
    defaultVariants: { variant: "solid" },
  }
)

const badge = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        accent: "size-[30px] bg-void text-offwhite",
        solid: "size-8 bg-offwhite text-void",
      },
    },
  }
)

type SharedProps = {
  variant?: NonNullable<VariantProps<typeof button>["variant"]>
  className?: string
  children: ReactNode
}

type ButtonProps = SharedProps &
  (
    | ComponentProps<typeof LocaleLink>
    | ({ href?: undefined } & ComponentProps<"button">)
  )

/** Pill with a circular arrow badge. Renders a link when `href` is set. */
export function Button({
  variant = "solid",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(button({ variant }), className)
  const content = (
    <>
      {children}
      <span className={badge({ variant })} aria-hidden="true">
        <ArrowUpRightIcon />
      </span>
    </>
  )

  if (props.href !== undefined) {
    return (
      <LocaleLink className={classes} {...props}>
        {content}
      </LocaleLink>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}

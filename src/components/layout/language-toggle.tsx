"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { cn } from "cn"

import { defaultLocale, hasLocale, isPublished, locales } from "@/i18n/config"

type LanguageToggleProps = { label: string; className?: string }

/** "FR / EN". Links to the other locale once that locale is published. */
export function LanguageToggle({ label, className }: LanguageToggleProps) {
  const pathname = usePathname()
  const params = useParams<{ lang?: string }>()
  const current = hasLocale(params.lang ?? "")
    ? (params.lang as (typeof locales)[number])
    : defaultLocale
  const target = locales.find((locale) => locale !== current) ?? defaultLocale

  const text = locales.map((locale) => locale.toUpperCase()).join(" / ")
  const classes = cn(
    "inline-flex min-h-11 items-center type-counter text-mist",
    className
  )

  if (!isPublished(target) && process.env.NODE_ENV === "production") {
    return (
      <span aria-hidden="true" className={classes}>
        {text}
      </span>
    )
  }

  return (
    <Link
      href={pathname.replace(`/${current}`, `/${target}`)}
      hrefLang={target}
      aria-label={`${text}, ${label}`}
      className={classes}
    >
      {text}
    </Link>
  )
}

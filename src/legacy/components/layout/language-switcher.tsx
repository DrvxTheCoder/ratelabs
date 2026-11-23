"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { cn } from "cn"

import { localeLabels, locales } from "@/i18n/config"

type LanguageSwitcherProps = React.ComponentProps<"nav"> & {
  label: string
}

function LanguageSwitcher({
  className,
  label,
  ...props
}: LanguageSwitcherProps) {
  const pathname = usePathname()
  const { lang } = useParams<{ lang: string }>()

  return (
    <nav
      data-slot="language-switcher"
      aria-label={label}
      className={cn("flex items-center rounded-xl bg-muted p-1", className)}
      {...props}
    >
      {locales.map((locale) => (
        <Link
          key={locale}
          href={pathname.replace(`/${lang}`, `/${locale}`)}
          hrefLang={locale}
          lang={locale}
          aria-label={localeLabels[locale]}
          aria-current={locale === lang ? "true" : undefined}
          className="rounded-lg px-2.5 py-1 text-xs font-bold text-muted-foreground uppercase transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current]:bg-primary aria-[current]:text-primary-foreground"
        >
          {locale}
        </Link>
      ))}
    </nav>
  )
}

export { LanguageSwitcher }

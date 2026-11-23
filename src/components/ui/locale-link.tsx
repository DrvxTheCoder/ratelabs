"use client"

import type { ComponentProps } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { defaultLocale } from "@/i18n/config"

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /**
   * Internal path without the locale prefix (`/`, `/work`, `/#services`), or any
   * other URL (`mailto:`, `https:`), which renders a plain anchor.
   */
  href: string
}

export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { lang = defaultLocale } = useParams<{ lang?: string }>()

  if (!href.startsWith("/")) {
    const external = /^https?:/.test(href)
    return (
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noreferrer" })}
        {...(props as ComponentProps<"a">)}
      />
    )
  }

  const [path, hash] = href.split("#")
  const localized = `/${lang}${path === "/" ? "" : path}${hash ? `#${hash}` : ""}`

  return <Link href={localized} {...props} />
}

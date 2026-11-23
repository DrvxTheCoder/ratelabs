import { NextResponse, type NextRequest } from "next/server"

import { routes } from "@/content/site"
import {
  defaultLocale,
  hasLocale,
  publishedLocales,
  type Locale,
} from "@/i18n/config"

const NOT_FOUND_PAGE = "/page-not-found"

/** Best published match for the browser's languages. */
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? ""

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";q=")
      return {
        language: tag.split("-")[0].toLowerCase(),
        weight: quality ? Number(quality) : 1,
      }
    })
    .sort((a, b) => b.weight - a.weight)

  return (
    ranked
      .map((entry) => entry.language)
      .filter(hasLocale)
      .find((locale) => publishedLocales.includes(locale)) ?? defaultLocale
  )
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const [, segment, ...rest] = pathname.split("/")

  if (!hasLocale(segment)) {
    request.nextUrl.pathname = `/${preferredLocale(request)}${pathname}`
    return NextResponse.redirect(request.nextUrl)
  }

  const route = `/${rest.join("/")}`
  if ((routes as readonly string[]).includes(route)) return

  request.nextUrl.pathname = `/${segment}${NOT_FOUND_PAGE}`
  return NextResponse.rewrite(request.nextUrl, { status: 404 })
}

export const config = {
  matcher: ["/((?!api|_next|.*[.]).*)"],
}

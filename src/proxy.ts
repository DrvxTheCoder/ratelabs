import { NextResponse, type NextRequest } from "next/server"

import { defaultLocale, hasLocale, type Locale } from "@/i18n/config"
import { navLinks } from "@/lib/site"

const NOT_FOUND_PAGE = "/page-not-found"

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

  return ranked.map((entry) => entry.language).find(hasLocale) ?? defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const [, segment, ...rest] = pathname.split("/")

  if (!hasLocale(segment)) {
    request.nextUrl.pathname = `/${preferredLocale(request)}${pathname}`
    return NextResponse.redirect(request.nextUrl)
  }

  const route = `/${rest.join("/")}`
  if (navLinks.some((link) => link.href === route)) return

  request.nextUrl.pathname = `/${segment}${NOT_FOUND_PAGE}`
  return NextResponse.rewrite(request.nextUrl, { status: 404 })
}

export const config = {
  matcher: ["/((?!api|_next|.*[.]).*)"],
}

import type { MetadataRoute } from "next"

import { routes, siteConfig } from "@/content/site"
import { publishedLocales } from "@/i18n/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (locale: string, route: string) =>
    `${siteConfig.url}/${locale}${route === "/" ? "" : route}`

  return publishedLocales.flatMap((locale) =>
    routes.map((route) => ({
      url: url(locale, route),
      alternates: {
        languages: Object.fromEntries(
          publishedLocales.map((target) => [target, url(target, route)])
        ),
      },
    }))
  )
}

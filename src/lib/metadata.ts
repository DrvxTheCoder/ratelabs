import type { Metadata } from "next"

import { locales, type Locale } from "@/i18n/config"
import { getDictionary, getLocale } from "@/i18n/get-dictionary"
import type { Dictionary } from "@/i18n/dictionaries/fr"
import { siteConfig } from "@/lib/site"

export async function pageMetadata(
  page: keyof Dictionary["meta"],
  path: string
): Promise<Metadata> {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()])
  const { title, description } = dict.meta[page]
  const localized = (target: Locale) => `/${target}${path}`

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: {
      canonical: localized(locale),
      languages: Object.fromEntries(
        locales.map((target) => [target, localized(target)])
      ),
    },
    openGraph: {
      title,
      description,
      siteName: siteConfig.name,
      locale,
      type: "website",
      url: localized(locale),
    },
  }
}

import type { Metadata } from "next"

import { getContent, getLocale } from "@/content"
import { siteConfig } from "@/content/site"
import type { PageKey } from "@/content/types"
import { isPublished, publishedLocales, type Locale } from "@/i18n/config"

const openGraphLocales: Record<Locale, string> = { fr: "fr_FR", en: "en_US" }

export async function pageMetadata(
  page: PageKey,
  path: string
): Promise<Metadata> {
  const [content, locale] = await Promise.all([getContent(), getLocale()])
  const { title, description } = content.meta[page]
  const localized = (target: Locale) => `/${target}${path}`

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: {
      canonical: localized(locale),
      languages: Object.fromEntries(
        publishedLocales.map((target) => [target, localized(target)])
      ),
    },
    openGraph: {
      title,
      description,
      siteName: siteConfig.name,
      locale: openGraphLocales[locale],
      type: "website",
      url: localized(locale),
    },
    ...(!isPublished(locale) && { robots: { index: false, follow: false } }),
  }
}

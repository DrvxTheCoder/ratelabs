export const locales = ["fr", "en"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "fr"

/**
 * Locales visitors are sent to. A locale left out is a draft: its pages can be
 * opened directly and in development, but they are `noindex`, absent from the
 * sitemap, and the language toggle does not link to them in production.
 *
 * To publish English: finish `content/en.ts`, then add "en" here.
 */
export const publishedLocales: readonly Locale[] = ["fr"]

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function isPublished(locale: Locale) {
  return publishedLocales.includes(locale)
}

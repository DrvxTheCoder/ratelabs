import { notFound } from "next/navigation"
import { lang } from "next/root-params"

import { hasLocale, type Locale } from "@/i18n/config"

import type { SiteContent } from "./types"

/** One content file per locale: adding a language means adding one entry. */
const content: Record<Locale, () => Promise<SiteContent>> = {
  fr: () => import("./fr").then((module) => module.fr),
  en: () => import("./en").then((module) => module.en),
}

export async function getLocale(): Promise<Locale> {
  const locale = await lang()
  if (!hasLocale(locale)) notFound()
  return locale
}

export async function getContent(): Promise<SiteContent> {
  return content[await getLocale()]()
}

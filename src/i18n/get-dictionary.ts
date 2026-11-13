import { notFound } from "next/navigation"
import { lang } from "next/root-params"

import { hasLocale, type Locale } from "./config"
import type { Dictionary } from "./dictionaries/fr"

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import("./dictionaries/fr").then((module) => module.fr),
  en: () => import("./dictionaries/en").then((module) => module.en),
}

export async function getLocale(): Promise<Locale> {
  const locale = await lang()
  if (!hasLocale(locale)) notFound()
  return locale
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]()
}

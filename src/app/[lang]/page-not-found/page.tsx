import type { Metadata } from "next"

import { getDictionary } from "@/i18n/get-dictionary"

import NotFound from "../not-found"

export async function generateMetadata(): Promise<Metadata> {
  const { notFound } = await getDictionary()
  return { title: notFound.title, robots: { index: false } }
}

/** Static 404 target: the proxy rewrites unknown paths here. */
export default NotFound

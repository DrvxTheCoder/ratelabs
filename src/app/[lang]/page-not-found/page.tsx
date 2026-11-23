import type { Metadata } from "next"

import { getContent } from "@/content"

import NotFound from "../not-found"

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getContent()
  return { title: meta.notFound.title, robots: { index: false } }
}

/** Static 404 target: the proxy rewrites unknown paths here. */
export default NotFound

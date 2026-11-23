import { PageHeader } from "@/components/sections/page-header"
import { getContent } from "@/content"

export default async function NotFound() {
  const { notFound } = await getContent()

  return <PageHeader content={notFound} className="min-h-svh" />
}

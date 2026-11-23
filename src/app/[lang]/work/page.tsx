import { ClientMarquee } from "@/components/sections/client-marquee"
import { FinalCta } from "@/components/sections/final-cta"
import { PageHeader } from "@/components/sections/page-header"
import { Projects } from "@/components/sections/projects"
import { getContent } from "@/content"
import { flags } from "@/content/site"
import { pageMetadata } from "@/lib/metadata"

export function generateMetadata() {
  return pageMetadata("work", "/work")
}

export default async function WorkPage() {
  const { work, home } = await getContent()

  return (
    <>
      <PageHeader content={work.header} />
      <Projects
        content={home.projects}
        showHeader={false}
        className="pt-section"
      />
      {flags.clients && <ClientMarquee content={home.clients} />}
      <FinalCta content={home.finalCta} />
    </>
  )
}

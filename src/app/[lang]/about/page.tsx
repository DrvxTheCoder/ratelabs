import { Expertise } from "@/components/sections/expertise"
import { FinalCta } from "@/components/sections/final-cta"
import { PageHeader } from "@/components/sections/page-header"
import { TechStack } from "@/components/sections/tech-stack"
import { Values } from "@/components/sections/values"
import { WhyStack } from "@/components/sections/why-stack"
import { getContent } from "@/content"
import { pageMetadata } from "@/lib/metadata"

export function generateMetadata() {
  return pageMetadata("about", "/about")
}

export default async function AboutPage() {
  const { about, home } = await getContent()

  return (
    <>
      <PageHeader content={about.header} />
      <Expertise content={about.story} />
      <Values content={about.values} />
      <WhyStack content={home.why} space="bottom" />
      <TechStack content={home.stack} />
      <FinalCta content={home.finalCta} />
    </>
  )
}

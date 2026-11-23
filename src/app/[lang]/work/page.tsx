import { PageHero } from "@/legacy/components/sections/page-hero"
import { Ticker } from "@/legacy/components/sections/ticker"
import { WorkGrid } from "@/legacy/components/sections/work-grid"
import { getDictionary } from "@/i18n/get-dictionary"
import { pageMetadata } from "@/lib/metadata"

export function generateMetadata() {
  return pageMetadata("work", "/work")
}

export default async function WorkPage() {
  const dict = await getDictionary()

  return (
    <>
      <PageHero
        badge={dict.work.badge}
        title={dict.work.title}
        titleAccent={dict.work.titleAccent}
        lead={dict.work.lead}
      />
      <WorkGrid projects={dict.projects} filterLabel={dict.work.filterLabel} />
      <Ticker items={dict.home.ticker} />
      <div className="h-24 md:h-32" />
    </>
  )
}

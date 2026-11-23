import { Faq } from "@/legacy/components/sections/faq"
import { HomeHero } from "@/legacy/components/sections/home-hero"
import { HomeIntro } from "@/legacy/components/sections/home-intro"
import { ProcessTimeline } from "@/legacy/components/sections/process-timeline"
import { SelectedWork } from "@/legacy/components/sections/selected-work"
import { ServicesGrid } from "@/legacy/components/sections/services-grid"
import { Testimonials } from "@/legacy/components/sections/testimonials"
import { Ticker } from "@/legacy/components/sections/ticker"
import { getDictionary } from "@/i18n/get-dictionary"
import { pageMetadata } from "@/lib/metadata"

export function generateMetadata() {
  return pageMetadata("home", "")
}

export default async function HomePage() {
  const dict = await getDictionary()
  const { home } = dict

  return (
    <>
      <HomeHero hero={home.hero} clients={home.clients} />
      <HomeIntro intro={home.intro} />
      <ServicesGrid heading={home.services} services={dict.services} />
      <ProcessTimeline process={home.process} />
      <SelectedWork heading={home.work} projects={dict.projects.items} />
      <Ticker items={home.ticker} />
      <Testimonials testimonials={home.testimonials} />
      <Faq faq={home.faq} />
    </>
  )
}

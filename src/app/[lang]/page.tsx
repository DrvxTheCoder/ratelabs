import { Faq } from "@/components/sections/faq"
import { HomeHero } from "@/components/sections/home-hero"
import { HomeIntro } from "@/components/sections/home-intro"
import { ProcessTimeline } from "@/components/sections/process-timeline"
import { SelectedWork } from "@/components/sections/selected-work"
import { ServicesGrid } from "@/components/sections/services-grid"
import { Testimonials } from "@/components/sections/testimonials"
import { Ticker } from "@/components/sections/ticker"
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

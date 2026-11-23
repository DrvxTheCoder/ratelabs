import { ClientMarquee } from "@/components/sections/client-marquee"
import { Expertise } from "@/components/sections/expertise"
import { FinalCta } from "@/components/sections/final-cta"
import { HeroSlideshow } from "@/components/sections/hero-slideshow"
import { Projects } from "@/components/sections/projects"
import { SectorSlideshow } from "@/components/sections/sector-slideshow"
import { Services } from "@/components/sections/services"
import { TechStack } from "@/components/sections/tech-stack"
import { Testimonials } from "@/components/sections/testimonials"
import { WhyStack } from "@/components/sections/why-stack"
import { getContent } from "@/content"
import { flags } from "@/content/site"
import { pageMetadata } from "@/lib/metadata"

export function generateMetadata() {
  return pageMetadata("home", "")
}

export default async function HomePage() {
  const { home } = await getContent()

  return (
    <>
      <HeroSlideshow id="top" content={home.hero} />
      <Expertise content={home.expertise} />
      <Services id="services" content={home.services} />
      <SectorSlideshow id="secteurs" content={home.sectors} />
      <WhyStack id="methode" content={home.why} />
      {flags.clients && <ClientMarquee content={home.clients} />}
      <Projects id="realisations" content={home.projects} />
      <TechStack id="stack" content={home.stack} />
      {flags.testimonials && (
        <Testimonials id="temoignages" content={home.testimonials} />
      )}
      <FinalCta id="contact" content={home.finalCta} />
    </>
  )
}

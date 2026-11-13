import { ScrollText } from "@/components/motion/scroll-text"
import { StatsRow } from "@/components/sections/stats-row"
import { SectionEyebrow } from "@/components/ui/section-heading"
import type { Dictionary } from "@/i18n/dictionaries/fr"

function HomeIntro({ intro }: { intro: Dictionary["home"]["intro"] }) {
  return (
    <section
      data-slot="home-intro"
      className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-[5fr_7fr] lg:gap-20"
    >
      <div className="flex flex-col justify-between gap-10 lg:border-r lg:pr-16">
        <SectionEyebrow>{intro.eyebrow}</SectionEyebrow>
        <StatsRow stats={intro.stats} />
      </div>
      <ScrollText className="text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.2] font-medium tracking-tight">
        {intro.text}
      </ScrollText>
    </section>
  )
}

export { HomeIntro }

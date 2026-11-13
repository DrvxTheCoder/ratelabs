import { Parallax } from "@/components/motion/parallax"
import { Reveal } from "@/components/motion/reveal"
import { ScrollText } from "@/components/motion/scroll-text"
import { PageHero } from "@/components/sections/page-hero"
import { StatsRow } from "@/components/sections/stats-row"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { Marquee } from "@/components/ui/marquee"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import {
  SectionEyebrow,
  SectionHeading,
  SectionTitle,
} from "@/components/ui/section-heading"
import { getDictionary } from "@/i18n/get-dictionary"
import { pageMetadata } from "@/lib/metadata"
import { siteConfig } from "@/lib/site"

const TEAM_TONES = ["dusk", "bone", "ember", "slate"] as const

export function generateMetadata() {
  return pageMetadata("about", "/about")
}

export default async function AboutPage() {
  const dict = await getDictionary()
  const { about } = dict

  return (
    <>
      <PageHero
        badge={about.badge}
        title={about.title}
        titleAccent={about.titleAccent}
        lead={about.lead}
      />

      <div className="container-page">
        <Parallax className="aspect-4/3 rounded-3xl sm:aspect-16/9 lg:aspect-[2.1/1] lg:rounded-[2.5rem]">
          <PlaceholderImage label={about.media} tone="dusk" />
        </Parallax>
      </div>

      <section className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div className="flex flex-col justify-between gap-10 lg:border-r lg:pr-16">
          <SectionEyebrow>{about.story.eyebrow}</SectionEyebrow>
          <StatsRow stats={dict.home.intro.stats} />
        </div>
        <ScrollText className="text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.2] font-medium tracking-tight">
          {about.story.text}
        </ScrollText>
      </section>

      <section className="dark chevron-band bg-background py-[calc(var(--chevron)+5rem)] text-foreground">
        <div className="container-page">
          <Reveal>
            <SectionHeading className="mb-12">
              <SectionEyebrow>{about.values.eyebrow}</SectionEyebrow>
              <SectionTitle>{about.values.title}</SectionTitle>
            </SectionHeading>
          </Reveal>
          <Reveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.items.map((value, index) => (
              <Card key={value.title} className="min-h-64 justify-between">
                <CardContent className="font-display text-xl text-brand">
                  {String(index + 1).padStart(2, "0")}
                </CardContent>
                <CardContent className="flex flex-col gap-3">
                  <CardTitle>
                    <h3>{value.title}</h3>
                  </CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="container-page grid gap-10 py-24 md:py-32 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <Reveal>
          <SectionHeading className="lg:sticky lg:top-28">
            <SectionEyebrow>{about.team.eyebrow}</SectionEyebrow>
            <SectionTitle>{about.team.title}</SectionTitle>
          </SectionHeading>
        </Reveal>
        <Reveal stagger className="grid grid-cols-2 gap-4">
          {about.team.members.map((member, index) => (
            <figure key={member.role} className="flex flex-col gap-3">
              <div className="aspect-4/5 overflow-hidden rounded-3xl">
                <PlaceholderImage
                  label={`${about.team.memberName}, ${member.role}`}
                  tone={TEAM_TONES[index]}
                  showLabel={false}
                />
              </div>
              <figcaption>
                <p className="font-semibold">{about.team.memberName}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </section>

      <section className="pb-24 md:pb-32">
        <p className="container-page mb-6 text-center text-sm text-muted-foreground">
          {about.stack.label}
        </p>
        <Marquee fade duration={28} aria-label={about.stack.label}>
          {siteConfig.stack.map((item) => (
            <span
              key={item}
              className="font-display text-4xl whitespace-nowrap text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </Marquee>
      </section>
    </>
  )
}

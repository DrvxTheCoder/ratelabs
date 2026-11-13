import { Reveal } from "@/components/motion/reveal"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import {
  SectionEyebrow,
  SectionHeading,
  SectionTitle,
} from "@/components/ui/section-heading"
import type { Dictionary } from "@/i18n/dictionaries/fr"

type Testimonial = Dictionary["home"]["testimonials"]["items"][number]

function Attribution({ item }: { item: Testimonial }) {
  return (
    <footer className="text-sm">
      <cite className="block font-semibold not-italic">{item.author}</cite>
      <span className="text-muted-foreground">{item.company}</span>
    </footer>
  )
}

function QuoteCard({ item }: { item: Testimonial }) {
  return (
    <Card size="sm">
      <CardContent>
        <blockquote className="flex flex-col gap-5">
          <p className="text-base leading-relaxed">“{item.quote}”</p>
          <Attribution item={item} />
        </blockquote>
      </CardContent>
    </Card>
  )
}

function Testimonials({
  testimonials,
}: {
  testimonials: Dictionary["home"]["testimonials"]
}) {
  const [first, second, third] = testimonials.items

  return (
    <section
      data-slot="testimonials"
      className="container-page grid gap-10 py-24 md:py-32 lg:grid-cols-2 lg:gap-6"
    >
      <Reveal className="flex flex-col gap-8">
        <SectionHeading>
          <SectionEyebrow>{testimonials.eyebrow}</SectionEyebrow>
          <SectionTitle>{testimonials.title}</SectionTitle>
          <p className="text-muted-foreground">{testimonials.summary}</p>
        </SectionHeading>

        <Card className="dark relative min-h-96 flex-1 justify-end bg-background text-foreground">
          <PlaceholderImage
            label={testimonials.media}
            tone="slate"
            showLabel={false}
            className="absolute inset-0"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-[#1e1e26] via-[#1e1e26]/70 to-transparent"
          />
          <CardContent className="relative">
            <blockquote className="flex flex-col gap-5">
              <p className="font-display text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.02]">
                “{testimonials.featured.quote}”
              </p>
              <Attribution item={testimonials.featured} />
            </blockquote>
          </CardContent>
        </Card>
      </Reveal>

      <Reveal
        stagger
        className="grid content-end gap-4 sm:grid-cols-2 sm:items-start"
      >
        <div className="flex flex-col gap-4">
          <QuoteCard item={first} />
          <QuoteCard item={third} />
        </div>
        <div className="flex flex-col gap-4 sm:mt-14">
          <QuoteCard item={second} />
          <Card size="sm" className="bg-brand text-brand-foreground">
            <CardContent className="flex flex-col gap-2">
              <span className="font-display text-7xl leading-none">
                {testimonials.stat.value}
              </span>
              <span className="text-sm font-medium">
                {testimonials.stat.label}
              </span>
            </CardContent>
          </Card>
        </div>
      </Reveal>
    </section>
  )
}

export { Testimonials }

import { Card } from "@/components/ui/card"
import { CardGrid } from "@/components/ui/card-grid"
import { Container } from "@/components/ui/container"
import { QuoteIcon } from "@/components/ui/icons"
import { MediaFrame } from "@/components/ui/media-frame"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import type { TestimonialsContent } from "@/content/types"

type TestimonialsProps = { content: TestimonialsContent; id?: string }

export function Testimonials({ content, id }: TestimonialsProps) {
  return (
    <Section id={id} lang={content.lang}>
      <Container>
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.title}
          lead={content.lead}
        />
        <CardGrid className="mt-16">
          {content.items.map((item, index) => (
            <li key={index} className="flex">
              <Card as="figure" className="flex w-full flex-col p-3">
                <MediaFrame
                  {...item.media}
                  sizes="(min-width: 1104px) 360px, (min-width: 712px) 50vw, 100vw"
                  className="h-[300px] rounded-media"
                />
                <blockquote className="flex-1 px-4 pt-7 pb-2">
                  <QuoteIcon />
                  <p className="mt-[23px] type-lead leading-[1.55]">
                    {item.quote}
                  </p>
                </blockquote>
                <figcaption className="px-4 pt-2 pb-4">
                  <p className="type-body-sm font-semibold">{item.name}</p>
                  <p className="mt-0.5 type-caption text-ink-2">{item.role}</p>
                </figcaption>
              </Card>
            </li>
          ))}
        </CardGrid>
      </Container>
    </Section>
  )
}

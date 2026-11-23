import { Card } from "@/components/ui/card"
import { CardGrid } from "@/components/ui/card-grid"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Section } from "@/components/ui/section"
import type { ExpertiseContent } from "@/content/types"

/** Large centred statement, with optional key figures. */
export function Expertise({ content }: { content: ExpertiseContent }) {
  return (
    <Section
      lang={content.lang}
      space="none"
      className="pt-section pb-24 max-stack:pb-18"
    >
      <Container className="flex flex-col items-center text-center">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <h2 className="mt-7 max-w-[860px] type-statement">
          {content.statement}
        </h2>
        {content.stats && (
          <CardGrid min="stat" className="mt-18 w-full max-stack:mt-12">
            {content.stats.map((stat) => (
              <Card as="li" key={stat.label} className="px-6 py-10">
                <p className="type-stat">{stat.value}</p>
                <p className="mt-2.5 type-copy text-ink-2">{stat.label}</p>
              </Card>
            ))}
          </CardGrid>
        )}
      </Container>
    </Section>
  )
}

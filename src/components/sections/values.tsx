import { Card } from "@/components/ui/card"
import { CardGrid } from "@/components/ui/card-grid"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import type { ValuesContent } from "@/content/types"

export function Values({ content }: { content: ValuesContent }) {
  return (
    <Section lang={content.lang} className="pt-12">
      <Container>
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.title}
          lead={content.lead}
        />
        <CardGrid min="stat" className="mt-16">
          {content.items.map((value) => (
            <Card as="li" key={value.title} className="p-7">
              <h3 className="mb-2 type-title-sm">{value.title}</h3>
              <p className="type-copy text-ink-2">{value.description}</p>
            </Card>
          ))}
        </CardGrid>
      </Container>
    </Section>
  )
}

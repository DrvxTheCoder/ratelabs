import type { ComponentProps, ComponentType } from "react"

import {
  BusinessToolsIllustration,
  IntegrationsIllustration,
  MaintenanceIllustration,
  MobileAppIllustration,
  ModernisationIllustration,
  WebPlatformIllustration,
} from "@/components/illustrations"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CardGrid } from "@/components/ui/card-grid"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import type { ServiceId, ServicesContent } from "@/content/types"

const illustrations: Record<ServiceId, ComponentType<ComponentProps<"svg">>> = {
  platforms: WebPlatformIllustration,
  mobile: MobileAppIllustration,
  tools: BusinessToolsIllustration,
  integrations: IntegrationsIllustration,
  modernisation: ModernisationIllustration,
  maintenance: MaintenanceIllustration,
}

type ServicesProps = { content: ServicesContent; id?: string }

export function Services({ content, id }: ServicesProps) {
  return (
    <Section id={id} lang={content.lang} className="pt-12">
      <Container>
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.title}
          titleClassName="max-w-[720px]"
          lead={content.lead}
          cta={<Button href={content.cta.href}>{content.cta.label}</Button>}
        />
        <CardGrid className="mt-16">
          {content.items.map((service) => {
            const Illustration = illustrations[service.id]
            return (
              <Card as="li" key={service.id} className="p-7">
                <div className="flex h-[150px] items-center justify-center rounded-media bg-offwhite">
                  <Illustration />
                </div>
                <h3 className="mt-7 mb-2 type-title-sm">{service.title}</h3>
                <p className="type-copy text-ink-2">{service.description}</p>
              </Card>
            )
          })}
        </CardGrid>
      </Container>
    </Section>
  )
}

import { CardGrid } from "@/components/ui/card-grid"
import { Container } from "@/components/ui/container"
import { MediaFrame } from "@/components/ui/media-frame"
import { Pill } from "@/components/ui/pill"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import type { ProjectsContent } from "@/content/types"

type ProjectsProps = {
  content: ProjectsContent
  id?: string
  /** Off on pages whose header already introduces the list. */
  showHeader?: boolean
  className?: string
}

export function Projects({
  content,
  id,
  showHeader = true,
  className,
}: ProjectsProps) {
  const Title = showHeader ? "h3" : "h2"

  return (
    <Section id={id} lang={content.lang} className={className}>
      <Container>
        {showHeader && (
          <SectionHeader
            className="mb-16"
            eyebrow={content.eyebrow}
            title={content.title}
            lead={content.lead}
          />
        )}
        <CardGrid>
          {content.items.map((project) => (
            <li key={project.title}>
              <article>
                <MediaFrame
                  {...project.media}
                  sizes="(min-width: 1104px) 384px, (min-width: 712px) 50vw, 100vw"
                  className="h-[420px] rounded-card"
                >
                  <Pill variant="glass" className="absolute top-4 left-4">
                    {project.sector}
                  </Pill>
                </MediaFrame>
                <Title className="mt-5 mb-1.5 type-title">
                  {project.title}
                </Title>
                <p className="type-copy text-ink-2">{project.description}</p>
              </article>
            </li>
          ))}
        </CardGrid>
      </Container>
    </Section>
  )
}

import type { ComponentProps, ComponentType } from "react"

import {
  CoolifyLogo,
  DockerLogo,
  FigmaLogo,
  FramerLogo,
  GitlabLogo,
  GsapLogo,
  NextjsLogo,
  NodejsLogo,
  PostgresqlLogo,
  PrismaLogo,
  ReactLogo,
  ShadcnLogo,
  TailwindLogo,
  TraefikLogo,
  TypeScriptLogo,
} from "@/assets/logos"
import { FadeUp } from "@/components/motion/fade-up"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import type { StackContent, TechId } from "@/content/types"

import { CardStack } from "./card-stack"

const logos: Record<TechId, ComponentType<ComponentProps<"svg">>> = {
  figma: FigmaLogo,
  framer: FramerLogo,
  nextjs: NextjsLogo,
  react: ReactLogo,
  typescript: TypeScriptLogo,
  nodejs: NodejsLogo,
  tailwindcss: TailwindLogo,
  shadcn: ShadcnLogo,
  gsap: GsapLogo,
  postgresql: PostgresqlLogo,
  prisma: PrismaLogo,
  docker: DockerLogo,
  coolify: CoolifyLogo,
  traefik: TraefikLogo,
  gitlab: GitlabLogo,
}

type TechStackProps = {
  content: StackContent
  id?: string
}

export function TechStack({ content, id }: TechStackProps) {
  return (
    <Section id={id} lang={content.lang} className="overflow-x-clip">
      <Container>
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.title}
          titleClassName="max-w-[720px]"
          lead={content.lead}
          leadClassName="max-w-[540px]"
        />
        <FadeUp
          as="ul"
          group
          className="mt-18 flex flex-wrap items-start justify-center gap-x-2 gap-y-6 max-stack:gap-y-12"
        >
          {content.categories.map((category) => (
            <li
              key={category.title}
              className="flex min-w-0 flex-[1_1_210px] flex-col items-center"
            >
              <CardStack
                labels={content.labels}
                items={category.items.map((item) => {
                  const TechLogo = logos[item.id]
                  return { ...item, logo: <TechLogo className="size-16" /> }
                })}
              />
              <h3 className="mt-3.5 text-center type-category">
                {category.title}
              </h3>
            </li>
          ))}
        </FadeUp>
      </Container>
    </Section>
  )
}

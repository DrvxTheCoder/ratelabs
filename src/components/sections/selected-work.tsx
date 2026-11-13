import { ArrowRightIcon } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { TransitionLink } from "@/components/motion/page-transition"
import { ProjectCard, projectSpan } from "@/components/sections/project-card"
import { buttonVariants } from "@/components/ui/button"
import {
  SectionEyebrow,
  SectionHeading,
  SectionTitle,
} from "@/components/ui/section-heading"
import type { Dictionary } from "@/i18n/dictionaries/fr"

function SelectedWork({
  heading,
  projects,
}: {
  heading: Dictionary["home"]["work"]
  projects: Dictionary["projects"]["items"]
}) {
  return (
    <section data-slot="selected-work" className="container-page py-24 md:py-32">
      <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <SectionHeading className="max-w-3xl">
          <SectionEyebrow>{heading.eyebrow}</SectionEyebrow>
          <SectionTitle>{heading.title}</SectionTitle>
        </SectionHeading>
        <TransitionLink
          href="/work"
          className={buttonVariants({ variant: "outline" })}
        >
          {heading.cta}
          <ArrowRightIcon
            data-icon="inline-end"
            className="transition-transform group-hover/button:translate-x-0.5"
          />
        </TransitionLink>
      </Reveal>

      <div className="grid gap-x-4 gap-y-12 lg:grid-cols-12">
        {projects.slice(0, 4).map((project, index) => (
          <Reveal key={project.id} className={projectSpan(index)}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export { SelectedWork }

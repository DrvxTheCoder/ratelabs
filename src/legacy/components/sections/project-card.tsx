import * as React from "react"
import { cn } from "cn"

import { Badge } from "@/legacy/components/ui/badge"
import {
  PlaceholderImage,
  placeholderImageVariants,
} from "@/legacy/components/ui/placeholder-image"
import type { VariantProps } from "class-variance-authority"
import type { Dictionary } from "@/i18n/dictionaries/fr"

type Project = Dictionary["projects"]["items"][number]
type Tone = VariantProps<typeof placeholderImageVariants>["tone"]

const TONES: Tone[] = ["dusk", "ember", "slate", "bone"]

/** Alternates wide and narrow cards so rows read 7/5 then 5/7. */
function projectSpan(index: number) {
  return index % 4 === 0 || index % 4 === 3 ? "lg:col-span-7" : "lg:col-span-5"
}

type ProjectCardProps = React.ComponentProps<"article"> & {
  project: Project
  index: number
}

function ProjectCard({
  project,
  index,
  className,
  ...props
}: ProjectCardProps) {
  return (
    <article
      data-slot="project-card"
      className={cn("group flex flex-col gap-5", className)}
      {...props}
    >
      <div className="relative h-72 overflow-hidden rounded-3xl lg:h-104">
        <PlaceholderImage
          label={project.title}
          tone={TONES[index % TONES.length]}
          showLabel={false}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <Badge variant="secondary" className="absolute top-4 left-4">
          {project.sector}
        </Badge>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="flex min-w-0 flex-col gap-2">
          <h3 className="font-display text-[2.25rem] leading-[0.95]">
            {project.title}
          </h3>
          <p className="max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>
        <p className="flex shrink-0 items-baseline gap-2 sm:block sm:text-right">
          <span className="block font-display text-[2.25rem] leading-[0.95] text-brand-text">
            {project.metric}
          </span>
          <span className="block text-xs leading-snug text-muted-foreground sm:max-w-28">
            {project.metricLabel}
          </span>
        </p>
      </div>
    </article>
  )
}

export { ProjectCard, projectSpan }

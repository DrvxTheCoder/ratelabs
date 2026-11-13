"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "cn"

import { ProjectCard, projectSpan } from "@/components/sections/project-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Dictionary } from "@/i18n/dictionaries/fr"

type WorkGridProps = {
  projects: Dictionary["projects"]
  filterLabel: string
}

function WorkGrid({ projects, filterLabel }: WorkGridProps) {
  const [filter, setFilter] = React.useState("all")

  const visible = projects.items.filter(
    (project) => filter === "all" || project.category === filter
  )

  return (
    <Tabs
      data-slot="work-grid"
      value={filter}
      onValueChange={(value) => setFilter(value as string)}
      className="container-page gap-10 pb-24 md:pb-32"
    >
      <TabsList variant="pill" aria-label={filterLabel}>
        {projects.filters.map((item) => (
          <TabsTrigger key={item.id} value={item.id}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={filter} className="grid gap-x-4 gap-y-12 lg:grid-cols-12">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              className={cn(projectSpan(index))}
            >
              <ProjectCard
                project={project}
                index={projects.items.indexOf(project)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </TabsContent>
    </Tabs>
  )
}

export { WorkGrid }

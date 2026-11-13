import {
  ArrowRightIcon,
  CableIcon,
  LayoutDashboardIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  WorkflowIcon,
  type LucideIcon,
} from "lucide-react"
import { cn } from "cn"

import { Reveal } from "@/components/motion/reveal"
import { TransitionLink } from "@/components/motion/page-transition"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import {
  SectionEyebrow,
  SectionHeading,
  SectionTitle,
} from "@/components/ui/section-heading"
import type { Dictionary } from "@/i18n/dictionaries/fr"

const SERVICE_ICONS: Record<string, LucideIcon> = {
  platforms: LayoutDashboardIcon,
  internal: WorkflowIcon,
  mobile: SmartphoneIcon,
  integrations: CableIcon,
  modernization: RefreshCwIcon,
  support: ShieldCheckIcon,
}

type Service = Dictionary["services"][number]

function ServiceCard({
  service,
  cta,
  className,
}: {
  service: Service
  cta: string
  className?: string
}) {
  const Icon = SERVICE_ICONS[service.id]

  return (
    <Card
      className={cn(
        "group relative justify-between gap-8 transition-colors duration-300 hover:bg-accent",
        className
      )}
    >
      <CardContent className="flex flex-col gap-4">
        <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors duration-300 group-hover:bg-brand group-hover:text-brand-foreground">
          <Icon aria-hidden className="size-5" />
        </span>
        <CardTitle>
          <h3>{service.title}</h3>
        </CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardContent>
      <CardFooter className="border-0 bg-transparent pt-0">
        <TransitionLink
          href="/contact"
          className="inline-flex items-center gap-2 text-sm font-semibold outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
        >
          {cta}
          <ArrowRightIcon
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </TransitionLink>
      </CardFooter>
    </Card>
  )
}

function ServicesGrid({
  heading,
  services,
}: {
  heading: Dictionary["home"]["services"]
  services: Dictionary["services"]
}) {
  const [featured, ...rest] = services
  const FeaturedIcon = SERVICE_ICONS[featured.id]

  return (
    <section data-slot="services-grid" className="container-page pb-24 md:pb-32">
      <Reveal>
        <SectionHeading align="center" className="mb-12 md:mb-16">
          <SectionEyebrow>{heading.eyebrow}</SectionEyebrow>
          <SectionTitle>{heading.title}</SectionTitle>
        </SectionHeading>
      </Reveal>

      <Reveal stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="dark group relative min-h-112 justify-end bg-background text-foreground md:col-span-2 lg:col-span-3 lg:row-span-2">
          <PlaceholderImage
            label={heading.featuredMedia}
            showLabel={false}
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-[#1e1e26] via-[#1e1e26]/55 to-transparent"
          />
          <CardContent className="relative flex flex-col gap-4">
            <span className="flex size-11 items-center justify-center rounded-xl bg-brand text-brand-foreground">
              <FeaturedIcon aria-hidden className="size-5" />
            </span>
            <CardTitle className="text-[clamp(2.5rem,4vw,3.5rem)] leading-[0.95]">
              <h3>{featured.title}</h3>
            </CardTitle>
            <CardDescription className="max-w-md text-foreground/85">
              {featured.description}
            </CardDescription>
            <TransitionLink
              href="/contact"
              className="inline-flex items-center gap-2 pt-2 text-sm font-semibold outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
            >
              {heading.cta}
              <ArrowRightIcon
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </TransitionLink>
          </CardContent>
        </Card>

        {rest.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            cta={heading.cta}
            className={index < 2 ? "lg:col-span-3" : "lg:col-span-2"}
          />
        ))}
      </Reveal>
    </section>
  )
}

export { ServicesGrid }

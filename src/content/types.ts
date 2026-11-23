import type { Media } from "@/components/ui/media-frame"
import type { Locale } from "@/i18n/config"

/**
 * Every block of copy can carry the language it is written in. It is only set
 * when that differs from the page (an untranslated block), and ends up as the
 * section's `lang` attribute.
 */
type Block = { lang?: Locale }

export type LinkItem = { label: string; href: string }

export type HeaderContent = Block & {
  eyebrow: string
  title: string
  lead?: string
}

export type SlideshowLabels = {
  region: string
  /** `{n}` is replaced by the slide number ("01"). */
  goTo: string
  pause: string
  resume: string
  previous?: string
  next?: string
}

export type HeroSlide = {
  /** One entry per designed line of the headline. */
  lines: string[]
  lead: string
  cta: LinkItem
  media: Media
}

export type HeroContent = Block & {
  labels: SlideshowLabels
  slides: HeroSlide[]
}

export type Stat = { value: string; label: string }

export type ExpertiseContent = Block & {
  eyebrow: string
  statement: string
  stats?: Stat[]
}

export type ServiceId =
  | "platforms"
  | "mobile"
  | "tools"
  | "integrations"
  | "modernisation"
  | "maintenance"

export type Service = { id: ServiceId; title: string; description: string }

export type ServicesContent = HeaderContent & {
  cta: LinkItem
  items: Service[]
}

export type SectorSlide = { title: string; description: string; media: Media }

export type SectorsContent = Block & {
  eyebrow: string
  labels: SlideshowLabels
  slides: SectorSlide[]
}

export type WhyCard = {
  title: string
  description: string
  tags: string[]
  media: Media
}

export type WhyContent = HeaderContent & { cards: WhyCard[] }

export type ClientsContent = Block & { label: string }

export type Project = {
  sector: string
  title: string
  description: string
  media: Media
}

export type ProjectsContent = HeaderContent & { items: Project[] }

export type TechId =
  | "figma"
  | "framer"
  | "nextjs"
  | "react"
  | "typescript"
  | "nodejs"
  | "tailwindcss"
  | "shadcn"
  | "gsap"
  | "postgresql"
  | "prisma"
  | "docker"
  | "coolify"
  | "traefik"
  | "gitlab"

export type TechCategory = {
  title: string
  items: { id: TechId; name: string; description: string }[]
}

export type StackContent = HeaderContent & {
  labels: {
    advance: string
    /** `{name}` is replaced by the technology. */
    show: string
  }
  categories: TechCategory[]
}

export type Testimonial = {
  quote: string
  name: string
  role: string
  media: Media
}

export type TestimonialsContent = HeaderContent & { items: Testimonial[] }

export type FinalCtaContent = HeaderContent & { cta: LinkItem; media: Media }

export type PageHeaderContent = HeaderContent & { media: Media }

export type ValuesContent = HeaderContent & {
  items: { title: string; description: string }[]
}

export type ContactDetailsContent = Block & {
  email: string
  languages: string
  languagesValue: string
  social: string
  next: { title: string; steps: string[] }
}

export type ContactFormContent = Block & {
  title: string
  firstName: string
  lastName: string
  email: string
  company: string
  service: string
  servicePlaceholder: string
  serviceOther: string
  message: string
  messagePlaceholder: string
  submit: string
  submitting: string
  success: { title: string; description: string; again: string }
  errors: {
    required: string
    email: string
    message: string
    delivery: string
  }
}

export type NavContent = Block & {
  links: LinkItem[]
  cta: LinkItem
  labels: {
    skip: string
    home: string
    primary: string
    openMenu: string
    closeMenu: string
    menu: string
    /** Announced on the FR / EN toggle. */
    switchLanguage: string
  }
}

export type FooterContent = Block & {
  description: string
  columns: {
    navigation: { title: string; links: LinkItem[] }
    services: { title: string; links: LinkItem[] }
    contact: { title: string }
  }
  rights: string
}

export type PageKey = "home" | "work" | "about" | "contact" | "notFound"

export type SiteContent = {
  meta: Record<PageKey, { title: string; description: string }>
  nav: NavContent
  footer: FooterContent
  home: {
    hero: HeroContent
    expertise: ExpertiseContent
    services: ServicesContent
    sectors: SectorsContent
    why: WhyContent
    clients: ClientsContent
    projects: ProjectsContent
    stack: StackContent
    testimonials: TestimonialsContent
    finalCta: FinalCtaContent
  }
  work: { header: PageHeaderContent }
  about: {
    header: PageHeaderContent
    story: ExpertiseContent
    values: ValuesContent
  }
  contact: {
    header: PageHeaderContent
    details: ContactDetailsContent
    form: ContactFormContent
  }
  notFound: PageHeaderContent & { cta: LinkItem }
}

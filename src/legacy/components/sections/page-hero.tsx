import { WordReveal } from "@/legacy/components/motion/word-reveal"
import { Badge } from "@/legacy/components/ui/badge"

type PageHeroProps = {
  badge: string
  title: string
  titleAccent: string
  lead: string
}

function PageHero({ badge, title, titleAccent, lead }: PageHeroProps) {
  return (
    <section data-slot="page-hero" className="container-page pt-32 pb-14 md:pt-40">
      <Badge variant="secondary" className="fade-rise">
        <span aria-hidden className="size-1.5 rounded-full bg-brand" />
        {badge}
      </Badge>
      <h1 className="mt-6 max-w-[14em] font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.93] text-balance">
        <WordReveal text={title} accent={titleAccent} />
      </h1>
      <p
        className="fade-rise mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        style={{ "--delay": "350ms" } as React.CSSProperties}
      >
        {lead}
      </p>
    </section>
  )
}

export { PageHero }

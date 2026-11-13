import { ArrowRightIcon } from "lucide-react"

import { Parallax } from "@/components/motion/parallax"
import { TransitionLink } from "@/components/motion/page-transition"
import { WordReveal } from "@/components/motion/word-reveal"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Marquee } from "@/components/ui/marquee"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import { LogoMark } from "@/components/ui/logo"
import type { Dictionary } from "@/i18n/dictionaries/fr"

const CLIENT_SLOTS = [1, 2, 3, 4, 5, 6, 7, 8]

function HomeHero({ hero, clients }: Pick<Dictionary["home"], "hero" | "clients">) {
  return (
    <section data-slot="home-hero">
      <div className="container-page flex flex-col items-center pt-32 text-center md:pt-36">
        <Badge variant="secondary" className="fade-rise">
          <span aria-hidden className="size-1.5 rounded-full bg-brand" />
          {hero.badge}
        </Badge>

        <h1 className="mt-6 max-w-[13em] font-display text-[clamp(3.5rem,min(12vw,17vh),10rem)] leading-[0.93] text-balance">
          <WordReveal text={hero.title} accent={hero.titleAccent} />
        </h1>

        <p
          className="fade-rise mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          style={{ "--delay": "350ms" } as React.CSSProperties}
        >
          {hero.lead}
        </p>

        <div
          className="fade-rise mt-8 flex flex-wrap justify-center gap-3"
          style={{ "--delay": "450ms" } as React.CSSProperties}
        >
          <TransitionLink
            href="/contact"
            className={buttonVariants({ variant: "brand", size: "lg" })}
          >
            {hero.primary}
            <ArrowRightIcon
              data-icon="inline-end"
              className="transition-transform group-hover/button:translate-x-0.5"
            />
          </TransitionLink>
          <TransitionLink
            href="/work"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            {hero.secondary}
          </TransitionLink>
        </div>
      </div>

      <div className="mt-16 md:mt-20">
        <p className="container-page mb-6 text-center text-sm text-muted-foreground">
          {clients.label}
        </p>
        <Marquee fade duration={36} aria-label={clients.label}>
          {CLIENT_SLOTS.map((slot) => (
            <span
              key={slot}
              className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap text-muted-foreground"
            >
              <LogoMark aria-hidden role="presentation" className="size-6" />
              {clients.item} {String(slot).padStart(2, "0")}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-page mt-12 md:mt-16">
        <Parallax className="aspect-4/3 rounded-3xl sm:aspect-16/9 lg:aspect-[2.1/1] lg:rounded-[2.5rem]">
          <PlaceholderImage label={hero.media} />
        </Parallax>
      </div>
    </section>
  )
}

export { HomeHero }

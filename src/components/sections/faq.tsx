import { ArrowRightIcon } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { TransitionLink } from "@/components/motion/page-transition"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { buttonVariants } from "@/components/ui/button"
import { PlaceholderImage } from "@/components/ui/placeholder-image"
import {
  SectionEyebrow,
  SectionHeading,
  SectionTitle,
} from "@/components/ui/section-heading"
import type { Dictionary } from "@/i18n/dictionaries/fr"

function Faq({ faq }: { faq: Dictionary["home"]["faq"] }) {
  return (
    <section
      data-slot="faq"
      className="container-page grid gap-10 pb-24 md:pb-32 lg:grid-cols-[5fr_7fr] lg:gap-16"
    >
      <Reveal className="flex flex-col items-start gap-6">
        <SectionHeading>
          <SectionEyebrow>{faq.eyebrow}</SectionEyebrow>
          <SectionTitle>{faq.title}</SectionTitle>
        </SectionHeading>
        <p className="max-w-sm text-muted-foreground">{faq.lead}</p>
        <TransitionLink href="/contact" className={buttonVariants()}>
          {faq.cta}
          <ArrowRightIcon
            data-icon="inline-end"
            className="transition-transform group-hover/button:translate-x-0.5"
          />
        </TransitionLink>
        <div className="mt-2 hidden aspect-16/10 w-full overflow-hidden rounded-3xl lg:block">
          <PlaceholderImage label={faq.media} tone="bone" />
        </div>
      </Reveal>

      <Reveal>
        <Accordion defaultValue={[faq.items[0].question]}>
          {faq.items.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}

export { Faq }

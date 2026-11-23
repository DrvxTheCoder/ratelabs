import { ArrowUpRightIcon } from "lucide-react"

import { Reveal } from "@/legacy/components/motion/reveal"
import { ContactForm } from "@/legacy/components/sections/contact-form"
import { PageHero } from "@/legacy/components/sections/page-hero"
import { getDictionary } from "@/i18n/get-dictionary"
import { pageMetadata } from "@/lib/metadata"
import { siteConfig } from "@/lib/site"

export function generateMetadata() {
  return pageMetadata("contact", "/contact")
}

export default async function ContactPage() {
  const dict = await getDictionary()
  const { contact } = dict

  return (
    <>
      <PageHero
        badge={contact.badge}
        title={contact.title}
        titleAccent={contact.titleAccent}
        lead={contact.lead}
      />

      <section className="container-page grid gap-12 pb-24 md:pb-32 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <Reveal className="flex flex-col gap-10">
          <dl className="grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">
                {contact.details.email}
              </dt>
              <dd className="mt-1 text-lg font-semibold">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="underline-offset-4 hover:underline"
                >
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                {contact.details.languages}
              </dt>
              <dd className="mt-1 text-lg font-semibold">
                {contact.details.languagesValue}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                {contact.details.social}
              </dt>
              <dd className="mt-1 flex gap-4 text-lg font-semibold">
                {siteConfig.social.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
                  >
                    {item.label}
                    <ArrowUpRightIcon aria-hidden className="size-4" />
                  </a>
                ))}
              </dd>
            </div>
          </dl>

          <div className="border-t pt-8">
            <h2 className="font-display text-4xl leading-none">
              {contact.next.title}
            </h2>
            <ol className="mt-6 flex flex-col gap-5">
              {contact.next.steps.map((step, index) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-display text-base text-primary-foreground">
                    {index + 1}
                  </span>
                  <p className="pt-1.5 leading-relaxed text-muted-foreground">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal>
          <ContactForm copy={contact.form} services={dict.services} />
        </Reveal>
      </section>
    </>
  )
}

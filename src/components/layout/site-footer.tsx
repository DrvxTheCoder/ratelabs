import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { TransitionLink } from "@/components/motion/page-transition"
import { buttonVariants } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { getDictionary } from "@/i18n/get-dictionary"
import { navLinks, siteConfig } from "@/lib/site"

const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground"

async function SiteFooter() {
  const dict = await getDictionary()

  return (
    <footer
      data-slot="site-footer"
      className="dark chevron-top bg-background pt-[calc(var(--chevron)+5rem)] text-foreground"
    >
      <div className="container-page">
        <Reveal className="flex flex-col items-center gap-6 pb-20 text-center md:pb-28">
          <h2 className="max-w-[12em] font-display text-[clamp(3.25rem,9vw,8rem)] leading-[0.92] text-balance">
            {dict.cta.title}
          </h2>
          <p className="max-w-md text-lg text-muted-foreground">
            {dict.cta.lead}
          </p>
          <TransitionLink
            href="/contact"
            className={buttonVariants({ variant: "brand", size: "lg" })}
          >
            {dict.cta.button}
            <ArrowRightIcon
              data-icon="inline-end"
              className="transition-transform group-hover/button:translate-x-0.5"
            />
          </TransitionLink>
        </Reveal>

        <div className="grid gap-10 border-t py-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.4fr_1fr]">
          <div className="flex flex-col items-start gap-5">
            <Logo className="h-16" />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {dict.footer.tagline}
            </p>
          </div>

          <nav aria-label={dict.footer.navigation}>
            <h3 className="mb-4 text-xs font-semibold tracking-[0.14em] uppercase">
              {dict.footer.navigation}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <TransitionLink href={link.href} className={linkClass}>
                    {dict.nav[link.key]}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-[0.14em] uppercase">
              {dict.footer.services}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {dict.services.map((service) => (
                <li key={service.id} className="text-sm text-muted-foreground">
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-[0.14em] uppercase">
              {dict.footer.contact}
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                  {siteConfig.email}
                </a>
              </li>
              {siteConfig.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${linkClass} inline-flex items-center gap-1`}
                  >
                    {item.label}
                    <ArrowUpRightIcon className="size-3.5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="border-t py-6 text-xs text-muted-foreground">
          © {siteConfig.name}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  )
}

export { SiteFooter }

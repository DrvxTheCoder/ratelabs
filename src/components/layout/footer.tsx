import { Container } from "@/components/ui/container"
import { LocaleLink } from "@/components/ui/locale-link"
import { Logo } from "@/components/ui/logo"
import { siteConfig } from "@/content/site"
import type { FooterContent } from "@/content/types"

type FooterItem = { label: string; href?: string }

function FooterColumn({
  title,
  items,
}: {
  title: string
  items: FooterItem[]
}) {
  return (
    <div>
      <h2 className="mb-4 type-eyebrow-sm text-ash">{title}</h2>
      <ul className="flex flex-col gap-2.5 type-copy">
        {items.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <LocaleLink
                href={item.href}
                className="relative block after:absolute after:-inset-x-2 after:-inset-y-[5px]"
              >
                {item.label}
              </LocaleLink>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer({ content }: { content: FooterContent }) {
  const { navigation, services, contact } = content.columns

  return (
    <footer
      lang={content.lang}
      data-surface="dark"
      className="bg-void pt-20 pb-8 text-offwhite"
    >
      <Container>
        <div className="flex flex-wrap justify-between gap-12">
          <div className="max-w-[340px] flex-[1_1_280px]">
            <Logo variant="primary" className="h-20" />
            <p className="mt-4 type-copy text-mist">{content.description}</p>
          </div>
          <div className="flex flex-wrap gap-x-18 gap-y-10">
            <nav aria-label={navigation.title}>
              <FooterColumn title={navigation.title} items={navigation.links} />
            </nav>
            <FooterColumn title={services.title} items={services.links} />
            <FooterColumn
              title={contact.title}
              items={[
                {
                  label: siteConfig.email,
                  href: `mailto:${siteConfig.email}`,
                },
                ...siteConfig.social,
              ]}
            />
          </div>
        </div>
        <p className="mt-16 border-t border-line-dark pt-6 type-mono text-ash">
          {content.rights}
        </p>
      </Container>
    </footer>
  )
}

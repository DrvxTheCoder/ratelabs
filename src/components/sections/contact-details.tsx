import type { ReactNode } from "react"

import { LocaleLink } from "@/components/ui/locale-link"
import { siteConfig } from "@/content/site"
import type { ContactDetailsContent } from "@/content/types"

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="type-eyebrow-sm text-ink-2">{label}</dt>
      <dd className="mt-2 type-title">{children}</dd>
    </div>
  )
}

export function ContactDetails({
  content,
}: {
  content: ContactDetailsContent
}) {
  const profiles = siteConfig.social.filter((item) => item.href)

  return (
    <div lang={content.lang} className="flex flex-col gap-10">
      <dl className="grid gap-8 sm:grid-cols-2">
        <Detail label={content.email}>
          <LocaleLink
            href={`mailto:${siteConfig.email}`}
            className="underline decoration-1 underline-offset-4"
          >
            {siteConfig.email}
          </LocaleLink>
        </Detail>
        <Detail label={content.languages}>{content.languagesValue}</Detail>
        {profiles.length > 0 && (
          <Detail label={content.social}>
            <span className="flex flex-wrap gap-4">
              {profiles.map((item) => (
                <LocaleLink
                  key={item.label}
                  href={item.href!}
                  className="underline decoration-1 underline-offset-4"
                >
                  {item.label}
                </LocaleLink>
              ))}
            </span>
          </Detail>
        )}
      </dl>

      <div className="border-t border-line-2 pt-10">
        <h2 className="type-h2">{content.next.title}</h2>
        <ol className="mt-8 flex flex-col gap-6">
          {content.next.steps.map((step, index) => (
            <li key={step} className="flex items-baseline gap-5">
              <span aria-hidden="true" className="type-eyebrow text-ink-2">
                0{index + 1}
              </span>
              <p className="max-w-[420px] type-body text-ink-2">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

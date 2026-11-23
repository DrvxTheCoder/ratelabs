import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { MediaFrame } from "@/components/ui/media-frame"
import { Section } from "@/components/ui/section"
import type { FinalCtaContent } from "@/content/types"

type FinalCtaProps = { content: FinalCtaContent; id?: string }

export function FinalCta({ content, id }: FinalCtaProps) {
  return (
    <Section
      id={id}
      lang={content.lang}
      surface="dark"
      space="none"
      className="relative isolate flex min-h-[520px] items-center justify-center overflow-hidden px-gutter py-24 text-center"
    >
      <MediaFrame
        {...content.media}
        captionPosition="none"
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 scrim-band" />
      </MediaFrame>
      <div className="flex max-w-[720px] flex-col items-center">
        <Eyebrow tone="dark" star={false}>
          {content.eyebrow}
        </Eyebrow>
        <h2 className="mt-5 mb-4 type-cta">{content.title}</h2>
        {content.lead && (
          <p className="mb-9 max-w-[480px] type-body text-mist-2">
            {content.lead}
          </p>
        )}
        <Button variant="accent" href={content.cta.href}>
          {content.cta.label}
        </Button>
      </div>
    </Section>
  )
}

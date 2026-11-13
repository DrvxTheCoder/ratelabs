import { TransitionLink } from "@/components/motion/page-transition"
import { buttonVariants } from "@/components/ui/button"
import { SectionEyebrow } from "@/components/ui/section-heading"
import { getDictionary } from "@/i18n/get-dictionary"

export default async function NotFound() {
  const { notFound } = await getDictionary()

  return (
    <section className="container-page flex min-h-[70svh] flex-col items-center justify-center gap-6 pt-32 pb-20 text-center">
      <SectionEyebrow>{notFound.eyebrow}</SectionEyebrow>
      <h1 className="max-w-[12em] font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.93] text-balance">
        {notFound.title}
      </h1>
      <p className="max-w-md text-lg text-muted-foreground">{notFound.lead}</p>
      <TransitionLink href="/" className={buttonVariants({ size: "lg" })}>
        {notFound.button}
      </TransitionLink>
    </section>
  )
}

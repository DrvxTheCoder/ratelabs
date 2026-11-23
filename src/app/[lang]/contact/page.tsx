import { ContactDetails } from "@/components/sections/contact-details"
import { ContactForm } from "@/components/sections/contact-form"
import { PageHeader } from "@/components/sections/page-header"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { getContent } from "@/content"
import { pageMetadata } from "@/lib/metadata"

export function generateMetadata() {
  return pageMetadata("contact", "/contact")
}

export default async function ContactPage() {
  const { contact, home } = await getContent()

  return (
    <>
      <PageHeader content={contact.header} />
      <Section space="both">
        <Container className="grid gap-16 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <ContactDetails content={contact.details} />
          <ContactForm content={contact.form} services={home.services.items} />
        </Container>
      </Section>
    </>
  )
}

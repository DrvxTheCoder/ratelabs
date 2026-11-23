"use client"

import { useActionState, useCallback, useEffect, useRef, useState } from "react"

import { submitContact, type ContactState } from "@/app/[lang]/contact/actions"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Field,
  FormError,
  Input,
  Select,
  Textarea,
} from "@/components/ui/field"
import { siteConfig } from "@/content/site"
import type { ContactFormContent, Service } from "@/content/types"

const initialState: ContactState = { status: "idle" }

type ContactFormProps = {
  content: ContactFormContent
  services: Pick<Service, "title">[]
}

function FormFields({
  content,
  services,
  onSuccess,
}: ContactFormProps & { onSuccess: () => void }) {
  const [state, action, pending] = useActionState(submitContact, initialState)

  useEffect(() => {
    if (state.status === "success") onSuccess()
  }, [state.status, onSuccess])

  const values = "values" in state ? state.values : {}
  const errors = state.status === "invalid" ? state.errors : {}

  const serviceOptions = [
    ...services.map((service) => service.title),
    content.serviceOther,
  ]

  const errorFor = (name: keyof typeof errors) => {
    const code = errors[name]
    return code && content.errors[code]
  }

  const textField = (
    name: "firstName" | "lastName" | "email" | "company",
    label: string,
    autoComplete: string,
    type = "text"
  ) => (
    <Field label={label} error={errorFor(name)}>
      {(control) => (
        <Input
          {...control}
          name={name}
          type={type}
          autoComplete={autoComplete}
          defaultValue={values[name]}
        />
      )}
    </Field>
  )

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {textField("firstName", content.firstName, "given-name")}
        {textField("lastName", content.lastName, "family-name")}
      </div>
      {textField("email", content.email, "email", "email")}
      {textField("company", content.company, "organization")}

      <Field label={content.service}>
        {(control) => (
          <Select
            // React resets the form after each submission: remount the select so
            // it picks up the value that was sent.
            key={values.service}
            {...control}
            name="service"
            defaultValue={values.service ?? ""}
          >
            <option value="">{content.servicePlaceholder}</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        )}
      </Field>

      <Field label={content.message} error={errorFor("message")}>
        {(control) => (
          <Textarea
            {...control}
            name="message"
            placeholder={content.messagePlaceholder}
            defaultValue={values.message}
          />
        )}
      </Field>

      {state.status === "failed" && (
        <FormError>
          {content.errors.delivery}{" "}
          <a href={`mailto:${siteConfig.email}`} className="underline">
            {siteConfig.email}
          </a>
        </FormError>
      )}

      <Button
        type="submit"
        variant="accent"
        disabled={pending}
        className="mt-2 self-start"
      >
        {pending ? content.submitting : content.submit}
      </Button>
    </form>
  )
}

export function ContactForm({ content, services }: ContactFormProps) {
  const [sent, setSent] = useState(false)
  const onSuccess = useCallback(() => setSent(true), [])
  const confirmation = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (sent) confirmation.current?.focus()
  }, [sent])

  return (
    <Card lang={content.lang} className="p-7 stack:p-10">
      {sent ? (
        <div
          role="status"
          className="flex min-h-96 flex-col items-start justify-center"
        >
          <h2 ref={confirmation} tabIndex={-1} className="type-h2 outline-none">
            {content.success.title}
          </h2>
          <p className="mt-4 mb-8 type-body text-ink-2">
            {content.success.description}
          </p>
          <Button onClick={() => setSent(false)}>
            {content.success.again}
          </Button>
        </div>
      ) : (
        <>
          <h2 className="mb-8 type-h2">{content.title}</h2>
          <FormFields
            content={content}
            services={services}
            onSuccess={onSuccess}
          />
        </>
      )}
    </Card>
  )
}

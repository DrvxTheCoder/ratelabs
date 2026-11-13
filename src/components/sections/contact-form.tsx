"use client"

import * as React from "react"
import { CheckIcon, Loader2Icon, SendIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import {
  submitContact,
  type ContactState,
} from "@/app/[lang]/contact/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Dictionary } from "@/i18n/dictionaries/fr"
import { siteConfig } from "@/lib/site"

const initialState: ContactState = { status: "idle" }

type Copy = Dictionary["contact"]["form"]

type ContactFormProps = {
  copy: Copy
  services: Dictionary["services"]
}

function FormFields({
  copy,
  services,
  onSuccess,
}: ContactFormProps & { onSuccess: () => void }) {
  const [state, action, pending] = React.useActionState(
    submitContact,
    initialState
  )

  React.useEffect(() => {
    if (state.status === "success") onSuccess()
  }, [state.status, onSuccess])

  const values = "values" in state ? state.values : {}
  const errors = state.status === "invalid" ? state.errors : {}

  const serviceItems = [
    ...services.map((service) => ({
      value: service.title,
      label: service.title,
    })),
    { value: copy.serviceOther, label: copy.serviceOther },
  ]

  const textField = (
    name: "firstName" | "lastName" | "email" | "company",
    label: string,
    autoComplete: string,
    type = "text"
  ) => {
    const error = errors[name]
    return (
      <Field data-invalid={Boolean(error) || undefined}>
        <FieldLabel htmlFor={name}>{label}</FieldLabel>
        <Input
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete}
          defaultValue={values[name]}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        {error && <FieldError id={`${name}-error`}>{copy.errors[error]}</FieldError>}
      </Field>
    )
  }

  return (
    <form action={action} noValidate>
      <FieldGroup className="gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {textField("firstName", copy.firstName, "given-name")}
          {textField("lastName", copy.lastName, "family-name")}
        </div>
        {textField("email", copy.email, "email", "email")}
        {textField("company", copy.company, "organization")}

        <Field>
          <FieldLabel htmlFor="service">{copy.service}</FieldLabel>
          <Select
            name="service"
            items={serviceItems}
            defaultValue={values.service || null}
          >
            <SelectTrigger id="service" className="w-full">
              <SelectValue placeholder={copy.servicePlaceholder} />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {serviceItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field data-invalid={Boolean(errors.message) || undefined}>
          <FieldLabel htmlFor="message">{copy.message}</FieldLabel>
          <Textarea
            id="message"
            name="message"
            placeholder={copy.messagePlaceholder}
            defaultValue={values.message}
            aria-invalid={Boolean(errors.message) || undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <FieldError id="message-error">
              {copy.errors[errors.message]}
            </FieldError>
          )}
        </Field>

        {state.status === "failed" && (
          <FieldError>
            {copy.errors.delivery}{" "}
            <a href={`mailto:${siteConfig.email}`} className="underline">
              {siteConfig.email}
            </a>
          </FieldError>
        )}

        <Button
          type="submit"
          variant="brand"
          size="lg"
          disabled={pending}
          className="w-full"
        >
          {pending ? copy.submitting : copy.submit}
          {pending ? (
            <Loader2Icon data-icon="inline-end" className="animate-spin" />
          ) : (
            <SendIcon data-icon="inline-end" />
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}

function ContactForm({ copy, services }: ContactFormProps) {
  const [sent, setSent] = React.useState(false)
  const onSuccess = React.useCallback(() => setSent(true), [])

  return (
    <Card data-slot="contact-form">
      <CardContent className="flex flex-col gap-6">
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div
              key="success"
              role="status"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="flex min-h-96 flex-col items-start justify-center gap-4"
            >
              <span className="flex size-14 items-center justify-center rounded-2xl bg-brand text-brand-foreground">
                <CheckIcon aria-hidden className="size-7" />
              </span>
              <CardTitle className="text-5xl leading-[0.95]">
                <h2>{copy.success.title}</h2>
              </CardTitle>
              <p className="text-muted-foreground">{copy.success.description}</p>
              <Button variant="outline" onClick={() => setSent(false)}>
                {copy.success.again}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="flex flex-col gap-6"
            >
              <CardTitle className="text-5xl leading-[0.95]">
                <h2>{copy.title}</h2>
              </CardTitle>
              <FormFields
                copy={copy}
                services={services}
                onSuccess={onSuccess}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

export { ContactForm }

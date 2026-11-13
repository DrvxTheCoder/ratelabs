"use server"

import * as z from "zod"

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "required"),
  lastName: z.string().trim().min(1, "required"),
  email: z.email("email"),
  company: z.string().trim().min(1, "required"),
  service: z.string().trim().optional(),
  message: z.string().trim().min(20, "message"),
})

type ContactValues = Partial<Record<keyof typeof contactSchema.shape, string>>

export type ContactErrorCode = "required" | "email" | "message"

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "invalid"
      values: ContactValues
      errors: Partial<Record<keyof ContactValues, ContactErrorCode>>
    }
  | { status: "failed"; values: ContactValues }

/**
 * Posts the lead to CONTACT_WEBHOOK_URL (CRM, Slack, email service...). Without
 * it, production reports a failure so a lead is never silently dropped.
 */
async function deliver(values: z.infer<typeof contactSchema>) {
  const url = process.env.CONTACT_WEBHOOK_URL

  if (!url) {
    if (process.env.NODE_ENV === "production") return false
    console.info("[contact] CONTACT_WEBHOOK_URL is not set:", values)
    return true
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    return response.ok
  } catch (error) {
    console.error("[contact] Delivery failed:", error)
    return false
  }
}

export async function submitContact(
  _previous: ContactState,
  formData: FormData
): Promise<ContactState> {
  const values = Object.fromEntries(
    Object.keys(contactSchema.shape).map((key) => [
      key,
      String(formData.get(key) ?? ""),
    ])
  ) as ContactValues

  const parsed = contactSchema.safeParse(values)

  if (!parsed.success) {
    const errors: Partial<Record<keyof ContactValues, ContactErrorCode>> = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactValues
      errors[field] ??= issue.message as ContactErrorCode
    }
    return { status: "invalid", values, errors }
  }

  const delivered = await deliver(parsed.data)
  return delivered ? { status: "success" } : { status: "failed", values }
}

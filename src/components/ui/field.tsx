import { useId, type ComponentProps, type ReactNode } from "react"
import { cn } from "cn"

import { ChevronDownIcon } from "./icons"

const control =
  "w-full rounded-card border border-ash bg-offwhite px-4 type-body text-void placeholder:text-ink-2 aria-invalid:border-void aria-invalid:shadow-[inset_0_0_0_1px_var(--color-void)]"

type ControlProps = {
  id: string
  "aria-invalid"?: true
  "aria-describedby"?: string
}

type FieldProps = {
  label: string
  error?: string
  /** Receives the attributes that tie the control to its label and error. */
  children: (control: ControlProps) => ReactNode
}

export function Field({ label, error, children }: FieldProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="type-copy font-medium">
        {label}
      </label>
      {children({
        id,
        ...(error && { "aria-invalid": true, "aria-describedby": errorId }),
      })}
      {error && <FormError id={errorId}>{error}</FormError>}
    </div>
  )
}

export function FormError({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      role="alert"
      className={cn("type-caption font-semibold text-void", className)}
      {...props}
    />
  )
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(control, "h-12", className)} {...props} />
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      rows={6}
      className={cn(control, "resize-y py-3", className)}
      {...props}
    />
  )
}

export function Select({
  className,
  children,
  ...props
}: ComponentProps<"select">) {
  return (
    <span className="relative block">
      <select
        className={cn(control, "h-12 appearance-none pr-12", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
    </span>
  )
}

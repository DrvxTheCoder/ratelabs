import type { ComponentProps, ComponentType } from "react"

export type Client = {
  name: string
  /** Official logo. Until it exists, `name` is set as a text wordmark. */
  logo?: ComponentType<ComponentProps<"svg">>
  /** Type treatment of the text wordmark. */
  wordmark: string
}

/** PLACEHOLDERS: text stand-ins, and permission to name each client is pending. */
export const clients: Client[] = [
  {
    name: "Senexus Group",
    wordmark:
      "font-display text-[30px] font-extrabold tracking-[.03em] uppercase",
  },
  {
    name: "Touba Oil",
    wordmark: "text-[24px] font-bold tracking-[-.01em]",
  },
  {
    name: "Touba Gaz",
    wordmark: "font-display text-[30px] font-bold tracking-[.05em] uppercase",
  },
  {
    name: "DIT School",
    wordmark: "text-[24px] font-semibold tracking-[.02em]",
  },
  {
    name: "Connect'Interim",
    wordmark: "text-[23px] font-medium tracking-[-.01em]",
  },
  {
    name: "IPM Tawfeikh",
    wordmark: "font-mono text-[20px] font-bold tracking-[.02em]",
  },
]

export const siteConfig = {
  name: "Ratel Labs",
  url: "https://ratellabs.net",
  email: "hello@ratellabs.net",
  /** Leave `href` undefined until the real profile URL is known. */
  social: [
    { label: "LinkedIn", href: undefined },
    { label: "GitHub", href: undefined },
  ] as { label: string; href?: string }[],
}

/** Every public route, without the locale prefix. Drives the proxy and sitemap. */
export const routes = ["/", "/work", "/about", "/contact"] as const

/** One switch per section that still relies on placeholder content. */
export const flags = {
  /** Text wordmarks: needs logos and the clients' permission. */
  clients: true,
  /** Bracketed placeholders: needs real quotes. */
  testimonials: true,
}

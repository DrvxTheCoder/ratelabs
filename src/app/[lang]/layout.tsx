import { Archivo } from "next/font/google"

import "../globals.css"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { PageTransition } from "@/components/motion/page-transition"
import { locales } from "@/i18n/config"
import { getDictionary, getLocale } from "@/i18n/get-dictionary"

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
})

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function RootLayout({
  children,
}: LayoutProps<"/[lang]">) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()])

  return (
    <html
      lang={locale}
      className={`${archivo.variable} antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-svh flex-col overflow-x-clip">
        <a
          href="#main"
          className="fixed top-3 left-3 z-60 -translate-y-20 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus-visible:translate-y-0"
        >
          {dict.nav.skip}
        </a>
        <PageTransition>
          <SiteHeader nav={dict.nav} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </PageTransition>
      </body>
    </html>
  )
}

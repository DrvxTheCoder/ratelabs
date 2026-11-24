import "../globals.css"

import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { Scrollbar } from "@/components/layout/scrollbar"
import { MotionRoot } from "@/components/motion/motion-root"
import { PageTransition } from "@/components/motion/page-transition"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { getContent, getLocale } from "@/content"
import { locales } from "@/i18n/config"

import { fontVariables } from "../fonts"

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const [locale, { nav, footer }] = await Promise.all([
    getLocale(),
    getContent(),
  ])

  return (
    <html lang={locale} className={fontVariables}>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="fixed top-3 left-3 z-70 -translate-y-20 rounded-full bg-void px-5 py-3 type-copy font-medium text-offwhite focus-visible:translate-y-0"
        >
          {nav.labels.skip}
        </a>
        <PageTransition>
          <Navbar nav={nav} />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer content={footer} />
        </PageTransition>
        <Scrollbar />
        <MotionRoot />
        <SmoothScroll />
      </body>
    </html>
  )
}

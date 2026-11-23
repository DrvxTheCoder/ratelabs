import { JetBrains_Mono, Work_Sans } from "next/font/google"
import localFont from "next/font/local"

/**
 * Headlines. Self-hosted because Google has folded "Big Shoulders Display" into
 * "Big Shoulders", whose display cut is about 6% wider than the approved design.
 * License: src/assets/fonts/OFL.txt.
 */
const bigShouldersDisplay = localFont({
  src: "../assets/fonts/big-shoulders-display-latin.woff2",
  weight: "100 900",
  variable: "--font-big-shoulders",
})

/** Body and UI. */
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
})

/** Eyebrows, counters, pills, captions. */
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const fontVariables = [
  bigShouldersDisplay.variable,
  workSans.variable,
  jetBrainsMono.variable,
].join(" ")

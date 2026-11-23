import { Big_Shoulders, JetBrains_Mono, Work_Sans } from "next/font/google"

/** Headlines. The `opsz` axis lets us pin the display cut (see globals.css). */
const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
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
  bigShoulders.variable,
  workSans.variable,
  jetBrainsMono.variable,
].join(" ")

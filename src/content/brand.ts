import { Logomark } from "@/assets/brand/logomark"
import { PrimaryLogo } from "@/assets/brand/primary"
import { Submark } from "@/assets/brand/submark"

/** Brand lockups. Master files are in `assets/brand`; all use `currentColor`. */
export const brandLogos = {
  /** Flat lockup: stays legible at navbar size. */
  submark: Submark,
  /** Folded lockup with ".net": needs room. */
  primary: PrimaryLogo,
  /** "RL" symbol, for where the name is already known. */
  logomark: Logomark,
}

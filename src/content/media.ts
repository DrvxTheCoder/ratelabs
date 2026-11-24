import type { Media } from "@/components/ui/media-frame"

type Slot = { src?: string; placeholder: string }

/**
 * Every image slot on the site, shared by all locales. To swap a placeholder for
 * a photo, drop the file in `public/images` and set `src` here, e.g.
 * `src: "/images/hero-dev-team.jpg"`. Nothing else has to change.
 */
const slots = {
  // Hero slideshow (full bleed, 1440 × 780)
  heroDevTeam: {
    src: "/images/hero-dev-team.jpg",
    placeholder:
      "linear-gradient(160deg, #2b2b3b 0%, #14141f 55%, #09090f 100%)",
  },
  heroTablet: {
    placeholder:
      "linear-gradient(200deg, #3a3d4d 0%, #1b1c28 60%, #0b0b12 100%)",
  },
  heroSite: {
    placeholder:
      "linear-gradient(120deg, #33334a 0%, #1a1a28 55%, #0d0d16 100%)",
  },
  heroExchange: {
    placeholder:
      "linear-gradient(170deg, #35354a 0%, #171724 65%, #09090f 100%)",
  },

  // Sector slideshow (full bleed, 1440 × 600)
  sectorEnergy: {
    placeholder:
      "linear-gradient(120deg, #33334a 0%, #1a1a28 50%, #0d0d16 100%)",
  },
  sectorLogistics: {
    placeholder:
      "linear-gradient(150deg, #3a3d4d 0%, #1b1c28 55%, #0b0b12 100%)",
  },
  sectorIndustry: {
    placeholder:
      "linear-gradient(130deg, #30304a 0%, #171724 55%, #0a0a11 100%)",
  },
  sectorRetail: {
    placeholder:
      "linear-gradient(110deg, #35354a 0%, #181826 55%, #09090f 100%)",
  },

  // "Pourquoi" stacking cards (about 576 × 434)
  whyFraming: {
    placeholder: "linear-gradient(150deg, #3a3a50 0%, #1a1a28 70%)",
  },
  whyEngineering: {
    placeholder: "linear-gradient(160deg, #33384b 0%, #161622 70%)",
  },
  whyDelivery: {
    placeholder: "linear-gradient(140deg, #3d3a4f 0%, #1a1824 70%)",
  },
  whySupport: {
    placeholder: "linear-gradient(155deg, #34344a 0%, #12121d 70%)",
  },

  // Project cards (384 × 420)
  projectLpg: {
    src: "/images/touba-app.jpg",
    placeholder: "linear-gradient(160deg, #34344a 0%, #14141f 100%)",
  },
  projectHr: {
    placeholder: "linear-gradient(160deg, #3b3b52 0%, #171724 100%)",
  },
  projectMoving: {
    placeholder: "linear-gradient(160deg, #30304a 0%, #12121d 100%)",
  },

  // Testimonials (360 × 300)
  portraitOffice: {
    placeholder: "linear-gradient(160deg, #34344a 0%, #14141f 100%)",
  },
  portraitMeeting: {
    placeholder: "linear-gradient(160deg, #3b3b52 0%, #171724 100%)",
  },
  portraitSite: {
    placeholder: "linear-gradient(160deg, #30304a 0%, #12121d 100%)",
  },

  // Full-bleed bands: final call to action and inner-page headers
  finalCta: {
    placeholder: "linear-gradient(180deg, #2a2a3b 0%, #0f0f18 100%)",
  },
  workHeader: {
    placeholder: "linear-gradient(180deg, #2a2a3b 0%, #0f0f18 100%)",
  },
  aboutHeader: {
    placeholder: "linear-gradient(180deg, #2a2a3b 0%, #0f0f18 100%)",
  },
  contactHeader: {
    placeholder: "linear-gradient(180deg, #2a2a3b 0%, #0f0f18 100%)",
  },
  notFoundHeader: {
    placeholder: "linear-gradient(180deg, #2a2a3b 0%, #0f0f18 100%)",
  },
} satisfies Record<string, Slot>

export type MediaId = keyof typeof slots

/** Joins a shared slot with the locale's own alt text and caption. */
export function media(
  id: MediaId,
  text: { alt: string; caption?: string }
): Media {
  const slot: Slot = slots[id]
  return { ...slot, ...text }
}

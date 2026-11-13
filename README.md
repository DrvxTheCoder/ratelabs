# Ratel Labs

Marketing site for Ratel Labs, in French and English.

Next.js 16 (App Router, Cache Components), Tailwind CSS 4, shadcn/ui on Base UI,
GSAP and Motion.

## Getting started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. The proxy redirects `/` to `/fr` or `/en` based on
the browser language.

Copy `.env.example` to `.env.local` and set `CONTACT_WEBHOOK_URL` so the contact
form can deliver messages.

## Where things live

| Path | Contents |
| --- | --- |
| `src/i18n/dictionaries/` | All page copy. `fr.ts` is the source, `en.ts` is type-checked against it. |
| `src/lib/site.ts` | Email, social links, tech stack, navigation. |
| `src/app/globals.css` | Brand tokens and shared utilities (`font-display`, `chevron-band`). |
| `src/components/ui/` | shadcn components, customized, plus `marquee`, `logo`, `placeholder-image` and `section-heading`. |
| `src/components/motion/` | GSAP page transition, scroll reveals and counters. |
| `src/components/sections/` | Page sections. |

## Replacing placeholders

- **Images:** swap `PlaceholderImage` for `next/image`.
- **Logo:** `src/components/ui/logo.tsx` holds paths traced from the brand board.
  Replace them with the master vector.
- **Font:** the brand font, Acumin Variable Concept, needs an Adobe licence.
  Archivo at its narrowest width stands in for it. To switch, load Acumin with
  `next/font/local` and update `font-display` in `globals.css`.

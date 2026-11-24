# Ratel Labs

Marketing site for Ratel Labs. Next.js 16 (App Router, Cache Components), Tailwind CSS 4, GSAP.

## Getting started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. The proxy redirects `/` to the visitor's best published locale.

Copy `.env.example` to `.env.local` and set `CONTACT_WEBHOOK_URL` so the contact form can deliver messages.

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Where things live

| Path | Contents |
| --- | --- |
| `src/app/globals.css` | Design tokens and type scale: the only place colours, sizes and radii are defined |
| `src/content/` | All copy and data. `types.ts` is the contract, `fr.ts` the source, `en.ts` a scaffold |
| `src/content/media.ts` | Every image slot |
| `src/content/site.ts` | Contact details, routes, section flags |
| `src/components/ui/` | Primitives: Button, Eyebrow, SectionHeader, Card, CardGrid, MediaFrame, Pill, Field... |
| `src/components/sections/` | Page sections. Each takes one content object; pages only compose them |
| `src/components/layout/` | Navbar, mobile menu, footer, language toggle |
| `src/components/motion/` | GSAP setup, slideshow engine, word reveal |
| `src/components/illustrations/`, `src/assets/logos/` | Inline SVGs, taken from the approved prototype |

What is still a placeholder is listed in [PLACEHOLDERS.md](./PLACEHOLDERS.md).

## Adding a page

1. Add its copy to `src/content/types.ts` and `fr.ts`, and an image slot to `media.ts`.
2. Create `src/app/[lang]/<route>/page.tsx` from a `PageHeader`, existing sections and `FinalCta`.
3. Add the route to `routes` in `src/content/site.ts` (proxy and sitemap read it).

## Motion rules

- All motion is GSAP, inside `useGSAP` and `gsap.matchMedia()`. Import from `components/motion/gsap`.
- Animate `transform`, `opacity` and `filter` only. For layout changes use Flip, as the navbar does.
- Scroll entrances use `FadeUp` (or `useFadeUp`); `SectionHeader` and `CardGrid` already include it.
- Page transitions live in `page-transition.tsx`. Use `LocaleLink` for internal links, and `entranceDelay()` for entrances that play on mount.
- Smooth scrolling is Lenis, driven by the GSAP ticker in `smooth-scroll.tsx`. Mark nested scroll areas with `data-lenis-prevent`.
- Every animation needs a reduced-motion outcome: content visible, slideshows paused, nothing moving.
- Pages stay mounted but hidden after navigation (Cache Components), so effects must survive being cleaned up and run again. Never rely on an id being unique across pages.

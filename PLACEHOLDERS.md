# Placeholders

Everything on the site that is not real, verified or cleared yet, and where to change it. Close them one by one.

## Must be settled before launch

| What | State | Where |
| --- | --- | --- |
| Stats: 120+ projets, 9 ans, 99,98 % | **Unverified**, carried over from the old site | `stats` at the top of `src/content/fr.ts` |
| Testimonials (3) | **Bracketed placeholder text**, no quotes, names or companies invented | `home.testimonials` in `src/content/fr.ts`. Hide the section: `flags.testimonials = false` in `src/content/site.ts` |
| Client wordmarks: Senexus Group, Touba Oil, Touba Gaz, DIT School, Connect'Interim, IPM Tawfeikh | **Text stand-ins; permission to name each client is pending** | `src/content/clients.ts` (set `logo` to an SVG component). Hide the section: `flags.clients = false` |
| Reply-time promise: "sous un jour ouvré", 30-minute call | **Unverified**, carried over from the old contact page | `contact` in `src/content/fr.ts` and `src/content/en.ts` |
| English site | **Scaffold only.** Untranslated blocks are `todo(...)` and show French. `/en` is `noindex`, out of the sitemap, and not linked in production | `src/content/en.ts`, then add `"en"` to `publishedLocales` in `src/i18n/config.ts` |
| `CONTACT_WEBHOOK_URL` | Required in production, otherwise the form reports a delivery failure | `.env` (see `.env.example`) |

## Brand assets

| What | State | Where |
| --- | --- | --- |
| Open Graph image | None | Add `src/app/[lang]/opengraph-image.*` |
| LinkedIn, GitHub URLs | Missing: shown as plain text in the footer, hidden on the contact page | `siteConfig.social` in `src/content/site.ts` |

## Photography

Every image slot renders a dark gradient. To fill one, put the file in `public/images` and set its `src` in **`src/content/media.ts`**; the caption disappears by itself. Alt texts and art direction are next to the copy in `src/content/fr.ts`.

| Slot | Page | Art direction |
| --- | --- | --- |
| `heroTablet` | Home, hero 2 | Deux consultantes devant une tablette, salon vitré |
| `heroSite` | Home, hero 3 | Deux ingénieurs sur site industriel, casques, ciel dégagé |
| `heroExchange` | Home, hero 4 | Échange client / consultant autour d'un ordinateur portable |
| `sectorEnergy` | Home, secteurs 1 | Deux ingénieurs sur site industriel, casques, ciel dégagé |
| `sectorLogistics` | Home, secteurs 2 | Entrepôt, opérateur avec tablette, rayonnages |
| `sectorIndustry` | Home, secteurs 3 | Atelier de production, ingénieur et opérateur devant une machine |
| `sectorRetail` | Home, secteurs 4 | Responsable de magasin avec tablette, rayonnages en arrière-plan |
| `whyFraming` | Home, À propos | Atelier de cadrage, équipe devant un mur vitré annoté |
| `whyEngineering` | Home, À propos | Développeur au poste de travail, deux écrans |
| `whyDelivery` | Home, À propos | Démo client en salle de réunion, écran partagé |
| `whySupport` | Home, À propos | Poste de supervision, tableaux de bord en temps réel |
| `projectHr` | Home, Réalisations | Capture d'écran sur poste de travail |
| `projectMoving` | Home, Réalisations | Capture d'écran sur mobile |
| `portraitOffice` | Home, témoignage 1 | Portrait client, bureau, lumière naturelle |
| `portraitMeeting` | Home, témoignage 2 | Portrait client, salle de réunion |
| `portraitSite` | Home, témoignage 3 | Portrait client, atelier ou site de production |
| `finalCta` | Home, Réalisations, À propos | Background, under a 45 % Void overlay. No direction yet |
| `workHeader`, `aboutHeader`, `contactHeader`, `notFoundHeader` | Inner-page headers | Background, under a 45 % Void overlay. No direction yet |

## Copy to review

The homepage is verbatim from the prototype. These lines are not in it: they were adapted from the old site to drop agency, team and mascot claims.

- `about.header` and `about.story`
- `work.header.lead` ("entreprises B2B" became "entreprises")
- `notFound`
- `meta` titles and descriptions

Project cards show the sector, never the client, until naming is cleared.

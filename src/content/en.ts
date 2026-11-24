import { fr } from "./fr"
import { media } from "./media"
import type { SiteContent } from "./types"

/**
 * TODO(en): marks a block that has no English copy yet. It renders the French
 * block, tagged `lang="fr"` for assistive technology, until it is translated.
 * Search this file for `todo(` to find what is left.
 */
function todo<T extends object>(block: T): T & { lang: "fr" } {
  return { ...block, lang: "fr" }
}

/**
 * English scaffold. The entries written out below are the English copy of the
 * previous site whose French source has not changed; everything new is a
 * `todo()`. When none are left, add "en" to `publishedLocales`.
 */
export const en: SiteContent = {
  meta: {
    // TODO(en): translate home, work, about and notFound.
    home: fr.meta.home,
    work: fr.meta.work,
    about: fr.meta.about,
    contact: {
      title: "Contact | Ratel Labs",
      description:
        "Tell us about your software project. We reply within one business day.",
    },
    notFound: fr.meta.notFound,
  },

  nav: {
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/#services" },
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    cta: { label: "Start a project", href: "/contact" },
    labels: {
      skip: "Skip to content",
      home: "Ratel Labs, home",
      primary: "Main navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menu: "Menu",
      switchLanguage: "Switch the site to French",
    },
  },

  footer: todo(fr.footer),

  home: {
    hero: todo(fr.home.hero),
    expertise: todo(fr.home.expertise),
    services: todo(fr.home.services),
    sectors: todo(fr.home.sectors),
    why: todo(fr.home.why),
    clients: todo(fr.home.clients),
    projects: todo(fr.home.projects),
    stack: todo(fr.home.stack),
    testimonials: todo(fr.home.testimonials),
    finalCta: todo(fr.home.finalCta),
  },

  work: { header: todo(fr.work.header) },

  about: {
    header: todo(fr.about.header),
    story: todo(fr.about.story),
    values: {
      eyebrow: "Our values",
      title: "What guides our work",
      items: [
        {
          title: "Tenacity",
          description:
            "A hard problem isn't a reason to stop. It's the reason we're here.",
        },
        {
          title: "Clarity",
          description:
            "Honest estimates, regular demos and nothing left in the dark.",
        },
        {
          title: "Ownership",
          description:
            "We stand behind what we ship, including after it goes live.",
        },
        {
          title: "Craft",
          description:
            "Readable, tested, documented code that others can pick up.",
        },
      ],
    },
  },

  contact: {
    header: {
      eyebrow: "Contact",
      title: "Let's talk about your next software.",
      lead: "Tell us what you need in a few lines. We'll get back to you within one business day.",
      media: media("contactHeader", { alt: "" }),
    },
    details: {
      email: "Email",
      languages: "Languages",
      languagesValue: "French and English",
      social: "Find us",
      next: {
        title: "What happens next?",
        steps: [
          "We read your message and reply within one business day.",
          "A 30-minute call to understand your context.",
          "A clear proposal with scope, schedule and budget.",
        ],
      },
    },
    form: {
      title: "Leave us a message",
      firstName: "First name",
      lastName: "Last name",
      email: "Work email",
      company: "Company",
      service: "Service you need",
      servicePlaceholder: "Choose a service",
      serviceOther: "I'm not sure yet",
      message: "Your project",
      messagePlaceholder: "Context, goals, deadlines…",
      submit: "Send message",
      submitting: "Sending…",
      success: {
        title: "Message received",
        description:
          "Thank you. We'll get back to you within one business day.",
        again: "Send another message",
      },
      errors: {
        required: "This field is required.",
        email: "Enter a valid email address.",
        message: "Tell us a little more (20 characters minimum).",
        delivery: "Sending failed. Write to us directly at",
      },
    },
  },

  notFound: todo(fr.notFound),
}

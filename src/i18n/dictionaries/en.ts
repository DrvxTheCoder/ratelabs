import type { Dictionary } from "./fr"

export const en: Dictionary = {
  meta: {
    home: {
      title: "Ratel Labs | B2B software development agency",
      description:
        "Ratel Labs designs, builds and maintains custom web platforms, internal tools and integrations for B2B companies.",
    },
    work: {
      title: "Work | Ratel Labs",
      description:
        "Platforms, internal tools, mobile apps and integrations delivered for B2B companies.",
    },
    about: {
      title: "About | Ratel Labs",
      description:
        "A team of tenacious engineers, named after the honey badger, who stay on the problem until it is solved.",
    },
    contact: {
      title: "Contact | Ratel Labs",
      description:
        "Tell us about your software project. We reply within one business day.",
    },
  },
  nav: {
    home: "Home",
    work: "Work",
    about: "About",
    contact: "Contact",
    cta: "Start a project",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuTitle: "Navigation",
    language: "Change language",
    skip: "Skip to content",
    primary: "Main navigation",
  },
  placeholder: {
    image: "Image coming soon",
  },
  home: {
    hero: {
      badge: "B2B software development agency",
      title: "The software your business",
      titleAccent: "runs on.",
      lead: "We design, build and maintain custom web platforms, internal tools and integrations. Like the animal we’re named after, we don’t let go until it works.",
      primary: "Start a project",
      secondary: "See our work",
      media: "The Ratel Labs team at work",
    },
    clients: {
      label: "Trusted with business-critical systems",
      item: "Client logo",
    },
    intro: {
      eyebrow: "Who we are",
      text: "We are a team of engineers and designers working with B2B companies. From the first workshop to production, we turn complex processes into reliable software your teams actually want to use.",
      stats: [
        { value: 120, suffix: "+", label: "Projects delivered" },
        { value: 25, suffix: "", label: "Engineers and designers" },
        { value: 9, suffix: " yrs", label: "Of experience" },
      ],
    },
    services: {
      eyebrow: "Our services",
      title: "Solutions built to last",
      cta: "Talk to us",
      featuredMedia: "Design workshop",
    },
    process: {
      eyebrow: "How we work",
      title: "Four steps, no surprises",
      steps: [
        {
          title: "Discovery",
          description:
            "Workshops with your teams, an audit of what exists and a costed scope.",
        },
        {
          title: "Design",
          description:
            "Architecture, user flows and prototypes validated by your users.",
        },
        {
          title: "Build",
          description:
            "Two-week sprints, regular demos and automated tests throughout.",
        },
        {
          title: "Launch and support",
          description:
            "Progressive rollout, monitoring and ongoing improvements.",
        },
      ],
    },
    work: {
      eyebrow: "Selected work",
      title: "Software in production, not mockups",
      cta: "All our work",
    },
    ticker: [
      "Web platforms",
      "Internal tools",
      "Mobile apps",
      "APIs and integrations",
      "Modernization",
    ],
    testimonials: {
      eyebrow: "Testimonials",
      title: "What our clients say",
      summary: "Average rating of 4.9/5 on recent projects",
      media: "Project meeting",
      featured: {
        quote:
          "They took over a project two vendors had abandoned. Six months later, our entire network runs on it.",
        author: "Head of Operations",
        company: "Logistics group, 400 employees",
      },
      items: [
        {
          quote:
            "Finally, a team that asks the right questions before writing the first line of code.",
          author: "Chief Information Officer",
          company: "Mid-size manufacturer",
        },
        {
          quote:
            "The demos every two weeks changed everything. We always knew exactly where the project stood.",
          author: "Head of Product",
          company: "SaaS company",
        },
        {
          quote: "The migration happened without a single hour of client downtime.",
          author: "Chief Technology Officer",
          company: "Financial services",
        },
      ],
      stat: {
        value: "94%",
        label: "of our clients come back for a second project",
      },
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked questions",
      lead: "Can’t find your answer? Write to us and we’ll reply within one business day.",
      cta: "Ask a question",
      media: "Colleagues working around a laptop",
      items: [
        {
          question: "How much does a custom project cost?",
          answer:
            "It depends on the scope. We start with a short discovery phase, after which you receive a detailed estimate and schedule. You then decide what happens next, with no commitment.",
        },
        {
          question: "How long does a project take?",
          answer:
            "A first usable version usually ships in three to four months. We deliver in increments so your teams can test early.",
        },
        {
          question: "Who owns the code?",
          answer:
            "You do. Source code, documentation and access are all transferred to you. You are never locked in to our agency.",
        },
        {
          question: "Can you take over existing software?",
          answer:
            "Yes, it’s a large part of what we do. We audit what exists, stabilize what needs it, then modernize step by step.",
        },
        {
          question: "Do you provide maintenance after launch?",
          answer:
            "Yes. We offer maintenance contracts covering monitoring, security updates and planned improvements.",
        },
      ],
    },
  },
  services: [
    {
      id: "platforms",
      title: "Custom web platforms",
      description:
        "Client portals, B2B marketplaces and SaaS products, designed to handle the load and grow with you.",
    },
    {
      id: "internal",
      title: "Internal tools",
      description:
        "Lightweight ERPs, back offices and workflows that finally replace your spreadsheets.",
    },
    {
      id: "mobile",
      title: "Mobile apps",
      description: "iOS and Android apps for your field teams and your clients.",
    },
    {
      id: "integrations",
      title: "APIs and integrations",
      description:
        "Connecting your ERP, CRM and third-party tools so data keeps moving.",
    },
    {
      id: "modernization",
      title: "Modernization",
      description:
        "Migrating your ageing software without interrupting the business.",
    },
    {
      id: "support",
      title: "Maintenance and growth",
      description:
        "Monitoring, security and continuous improvements after launch.",
    },
  ],
  projects: {
    filters: [
      { id: "all", label: "All" },
      { id: "platform", label: "Platforms" },
      { id: "internal", label: "Internal tools" },
      { id: "mobile", label: "Mobile" },
      { id: "integration", label: "Integrations" },
    ],
    items: [
      {
        id: "supplier-portal",
        category: "platform",
        sector: "Logistics",
        title: "Multi-country supplier portal",
        description:
          "One platform for orders, documents and invoicing across 1,200 suppliers.",
        metric: "-40%",
        metricLabel: "processing time",
      },
      {
        id: "field-ops",
        category: "mobile",
        sector: "Energy",
        title: "Field service app",
        description:
          "An offline-first app for technicians, synced with central scheduling.",
        metric: "3,000",
        metricLabel: "jobs per month",
      },
      {
        id: "pricing-engine",
        category: "internal",
        sector: "Manufacturing",
        title: "Sales quoting engine",
        description:
          "Complex quotes generated in minutes from business rules and the ERP catalogue.",
        metric: "×5",
        metricLabel: "quotes per salesperson",
      },
      {
        id: "erp-sync",
        category: "integration",
        sector: "Retail",
        title: "ERP and e-commerce integration hub",
        description:
          "Stock, prices and orders synced in real time across four systems.",
        metric: "99.98%",
        metricLabel: "uptime",
      },
      {
        id: "compliance-saas",
        category: "platform",
        sector: "Financial services",
        title: "Document compliance SaaS",
        description:
          "A complete SaaS product, from the first mockup to market launch.",
        metric: "8 months",
        metricLabel: "from idea to launch",
      },
      {
        id: "planning-tool",
        category: "internal",
        sector: "Healthcare",
        title: "Team scheduling tool",
        description:
          "An internal tool replacing 30 spreadsheets with one shared live view.",
        metric: "-12 h",
        metricLabel: "of data entry per week",
      },
    ],
  },
  work: {
    badge: "Work",
    title: "Real software, in production,",
    titleAccent: "with real clients.",
    lead: "A few recent projects for B2B companies. Some clients prefer to stay discreet, so we show the sector rather than the name.",
    filterLabel: "Filter projects",
    empty: "No projects in this category yet.",
  },
  about: {
    badge: "About",
    title: "Named after the most",
    titleAccent: "stubborn animal alive.",
    lead: "The ratel, or honey badger, doesn’t back down and never lets go. That’s exactly the mindset we bring to your hardest projects.",
    media: "The Ratel Labs office",
    story: {
      eyebrow: "Our story",
      text: "Ratel Labs started from a simple observation: too many B2B software projects stop the moment things get difficult. We built an agency to do the opposite. Stay, understand, solve and ship.",
    },
    values: {
      eyebrow: "Our values",
      title: "What guides our work",
      items: [
        {
          title: "Tenacity",
          description:
            "A hard problem isn’t a reason to stop. It’s the reason we’re here.",
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
    team: {
      eyebrow: "Our team",
      title: "The people behind the code",
      memberName: "First Last",
      members: [
        { role: "Chief Technology Officer" },
        { role: "Head of Delivery" },
        { role: "Lead Product Designer" },
        { role: "Lead Engineer" },
      ],
    },
    stack: {
      label: "Technologies we use every day",
    },
  },
  contact: {
    badge: "Contact",
    title: "Let’s talk about your",
    titleAccent: "next software.",
    lead: "Tell us what you need in a few lines. We’ll get back to you within one business day.",
    details: {
      email: "Email",
      languages: "Languages",
      languagesValue: "French and English",
      social: "Find us",
    },
    next: {
      title: "What happens next?",
      steps: [
        "We read your message and reply within one business day.",
        "A 30-minute call to understand your context.",
        "A clear proposal with scope, schedule and budget.",
      ],
    },
    form: {
      title: "Leave us a message",
      firstName: "First name",
      lastName: "Last name",
      email: "Work email",
      company: "Company",
      service: "Service you need",
      servicePlaceholder: "Choose a service",
      serviceOther: "I’m not sure yet",
      message: "Your project",
      messagePlaceholder: "Context, goals, deadlines…",
      submit: "Send message",
      submitting: "Sending…",
      success: {
        title: "Message received",
        description: "Thank you. We’ll get back to you within one business day.",
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
  cta: {
    title: "Your next software starts here.",
    lead: "A new project, a system to take over or just a question: let’s talk.",
    button: "Start a project",
  },
  footer: {
    tagline: "Software development agency for B2B companies. We don’t let go.",
    navigation: "Navigation",
    services: "Services",
    contact: "Contact",
    rights: "All rights reserved.",
  },
  notFound: {
    eyebrow: "Error 404",
    title: "This page got away.",
    lead: "The ratel is still after it. In the meantime, head back home.",
    button: "Back to home",
  },
}

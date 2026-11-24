import { media } from "./media"
import { siteConfig } from "./site"
import type { ServicesContent, SiteContent, Stat } from "./types"

/** UNVERIFIED: carried over from the previous site. Confirm before launch. */
const stats: Stat[] = [
  { value: "120+", label: "Projets livrés" },
  { value: "9 ans", label: "D'expérience en production" },
  { value: "99,98 %", label: "Disponibilité moyenne" },
]

const services: ServicesContent["items"] = [
  {
    id: "platforms",
    title: "Plateformes web sur mesure",
    description:
      "Portails clients, back-offices et produits SaaS pensés pour absorber la charge et évoluer avec votre activité.",
  },
  {
    id: "mobile",
    title: "Applications mobiles",
    description:
      "Applications iOS et Android pour vos équipes terrain et vos clients, fiables même avec une connexion limitée.",
  },
  {
    id: "tools",
    title: "Outils métier",
    description:
      "ERP légers, workflows et tableaux de bord qui remplacent enfin vos tableurs.",
  },
  {
    id: "integrations",
    title: "API et intégrations",
    description:
      "Connexion de votre ERP, CRM et outils existants pour que la donnée circule sans ressaisie.",
  },
  {
    id: "modernisation",
    title: "Modernisation",
    description:
      "Migration de vos logiciels vieillissants vers des architectures modernes, sans interrompre l'activité.",
  },
  {
    id: "maintenance",
    title: "Maintenance et évolution",
    description:
      "Supervision, sécurité et améliorations continues après la mise en production.",
  },
]

export const fr: SiteContent = {
  meta: {
    home: {
      title: "Ratel Labs | Logiciels sur mesure pour les entreprises",
      description:
        "Plateformes web, applications mobiles et intégrations sur mesure, conçues et maintenues pour durer.",
    },
    work: {
      title: "Réalisations | Ratel Labs",
      description:
        "Quelques projets livrés pour des organisations qui s'en servent chaque jour.",
    },
    about: {
      title: "À propos | Ratel Labs",
      description:
        "Ratel Labs conçoit, développe et maintient des logiciels sur mesure pour les entreprises.",
    },
    contact: {
      title: "Contact | Ratel Labs",
      description:
        "Parlez-nous de votre projet logiciel. Réponse sous un jour ouvré.",
    },
    notFound: {
      title: "Page introuvable | Ratel Labs",
      description: "Cette page n'existe pas ou a été déplacée.",
    },
  },

  nav: {
    links: [
      { label: "Accueil", href: "/" },
      { label: "Services", href: "/#services" },
      { label: "Réalisations", href: "/work" },
      { label: "À propos", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    cta: { label: "Démarrer un projet", href: "/contact" },
    labels: {
      skip: "Aller au contenu",
      home: "Ratel Labs, retour à l'accueil",
      primary: "Navigation principale",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      menu: "Menu",
      switchLanguage: "Passer le site en anglais",
    },
  },

  footer: {
    description: "Développement de logiciels sur mesure pour les entreprises.",
    columns: {
      navigation: {
        title: "Navigation",
        links: [
          { label: "Accueil", href: "/" },
          { label: "Réalisations", href: "/work" },
          { label: "À propos", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
      services: {
        title: "Services",
        links: [
          { label: "Plateformes web", href: "/#services" },
          { label: "Applications mobiles", href: "/#services" },
          { label: "API et intégrations", href: "/#services" },
          { label: "Maintenance", href: "/#services" },
        ],
      },
      contact: { title: "Contact" },
    },
    rights: "© 2026 Ratel Labs. Tous droits réservés.",
  },

  home: {
    hero: {
      labels: {
        region: "Présentation",
        goTo: "Aller à la diapositive {n}",
        pause: "Mettre le diaporama en pause",
        resume: "Reprendre le diaporama",
      },
      slides: [
        {
          lines: ["Des logiciels fiables", "pour les entreprises exigeantes."],
          lead: "Plateformes web, applications mobiles et intégrations sur mesure, conçues et maintenues pour durer.",
          cta: { label: "Démarrer un projet", href: "/#contact" },
          media: media("heroDevTeam", {
            alt: "Équipe de développeurs échangeant devant du code affiché à l'écran",
          }),
        },
        {
          lines: ["Des plateformes web", "conçues pour durer."],
          lead: "Portails, back-offices et outils métier sur mesure, de la conception à l'exploitation.",
          cta: { label: "Découvrir nos services", href: "/#services" },
          media: media("heroTablet", {
            alt: "Deux consultantes devant une tablette dans un salon vitré",
            caption:
              "PHOTO — Deux consultantes devant une tablette, salon vitré",
          }),
        },
        {
          lines: ["Des logiciels déjà", "en production."],
          lead: "Énergie, logistique, industrie : des systèmes utilisés chaque jour par des équipes réelles.",
          cta: { label: "Voir les réalisations", href: "/#realisations" },
          media: media("heroSite", {
            alt: "Deux ingénieurs casqués sur un site industriel",
            caption:
              "PHOTO — Deux ingénieurs sur site industriel, casques, ciel dégagé",
          }),
        },
        {
          lines: ["Une méthode claire,", "du cadrage au lancement."],
          lead: "Ateliers, sprints courts et démos régulières : vous savez toujours où en est votre projet.",
          cta: { label: "Découvrir notre méthode", href: "/#methode" },
          media: media("heroExchange", {
            alt: "Échange entre un client et un consultant autour d'un ordinateur portable",
            caption:
              "PHOTO — Échange client / consultant autour d'un ordinateur portable",
          }),
        },
      ],
    },

    expertise: {
      eyebrow: "Expertise",
      statement:
        "Nous concevons des systèmes qui simplifient vos opérations, fiabilisent vos données et accompagnent votre croissance.",
      stats,
    },

    services: {
      eyebrow: "Services",
      title: "Des solutions numériques conçues pour durer",
      lead: "Un accompagnement de bout en bout, du cadrage à l'exploitation, pour des logiciels sur lesquels vos équipes peuvent compter.",
      cta: { label: "Parler de votre projet", href: "/#contact" },
      items: services,
    },

    sectors: {
      eyebrow: "Secteurs",
      labels: {
        region: "Secteurs",
        goTo: "Afficher le secteur {n}",
        pause: "Mettre en pause le diaporama des secteurs",
        resume: "Reprendre le diaporama des secteurs",
        previous: "Secteur précédent",
        next: "Secteur suivant",
      },
      slides: [
        {
          title: "Énergie",
          description:
            "Logiciels de production, de suivi et de pilotage pour les opérateurs dont l'activité ne s'arrête jamais.",
          media: media("sectorEnergy", {
            alt: "Deux ingénieurs casqués sur un site industriel",
            caption:
              "PHOTO — Deux ingénieurs sur site industriel, casques, ciel dégagé",
          }),
        },
        {
          title: "Logistique",
          description:
            "Suivi des stocks, des mouvements et des livraisons, sur le terrain comme au bureau.",
          media: media("sectorLogistics", {
            alt: "Opérateur avec une tablette dans un entrepôt",
            caption: "PHOTO — Entrepôt, opérateur avec tablette, rayonnages",
          }),
        },
        {
          title: "Industrie",
          description:
            "Outils de suivi de production et de maintenance qui fiabilisent vos opérations.",
          media: media("sectorIndustry", {
            alt: "Ingénieur et opérateur devant une machine d'atelier",
            caption:
              "PHOTO — Atelier de production, ingénieur et opérateur devant une machine",
          }),
        },
        {
          title: "Distribution",
          description:
            "Commandes, stocks et intégrations pour des réseaux de vente qui grandissent.",
          media: media("sectorRetail", {
            alt: "Responsable de magasin avec une tablette",
            caption:
              "PHOTO — Responsable de magasin avec tablette, rayonnages en arrière-plan",
          }),
        },
      ],
    },

    why: {
      eyebrow: "Pourquoi Ratel Labs",
      title:
        "Une exécution rigoureuse pour des produits qui tiennent dans le temps",
      cards: [
        {
          title: "Cadrage structuré",
          description:
            "Ateliers avec vos équipes, audit de l'existant et périmètre clairement défini avant d'écrire la première ligne de code.",
          tags: ["Ateliers", "Audit", "Périmètre"],
          media: media("whyFraming", {
            alt: "Atelier de cadrage devant un mur vitré annoté",
            caption:
              "PHOTO — Atelier de cadrage, équipe devant un mur vitré annoté",
          }),
        },
        {
          title: "Ingénierie fiable",
          description:
            "Architectures sobres, code testé et choix techniques documentés pour limiter la dette et les mauvaises surprises.",
          tags: ["Architecture", "Tests", "Documentation"],
          media: media("whyEngineering", {
            alt: "Développeur à son poste de travail devant deux écrans",
            caption: "PHOTO — Développeur au poste de travail, deux écrans",
          }),
        },
        {
          title: "Livraison transparente",
          description:
            "Sprints courts, démos régulières et tests automatisés : vous voyez le produit avancer à chaque étape.",
          tags: ["Sprints", "Démos", "CI/CD"],
          media: media("whyDelivery", {
            alt: "Démonstration client en salle de réunion",
            caption: "PHOTO — Démo client en salle de réunion, écran partagé",
          }),
        },
        {
          title: "Suivi sur la durée",
          description:
            "Mise en production progressive, supervision et évolutions continues une fois le logiciel lancé.",
          tags: ["Supervision", "Sécurité", "Évolutions"],
          media: media("whySupport", {
            alt: "Poste de supervision avec des tableaux de bord",
            caption:
              "PHOTO — Poste de supervision, tableaux de bord en temps réel",
          }),
        },
      ],
    },

    clients: { label: "Ils nous font confiance" },

    projects: {
      eyebrow: "Réalisations",
      title: "Des logiciels en production, pas des maquettes",
      lead: "Quelques projets livrés pour des organisations qui s'en servent chaque jour.",
      items: [
        {
          sector: "Énergie",
          title: "Module de production GPL",
          description:
            "Suivi de la production, des stocks et des mouvements pour un opérateur gazier.",
          media: media("projectLpg", {
            alt: "Écran du module de production GPL",
            caption: "Capture d'écran sur poste de travail",
          }),
        },
        {
          sector: "Ressources humaines",
          title: "Plateforme RH multi-entités",
          description:
            "Une solution modulaire qui centralise la gestion du personnel d'un groupe.",
          media: media("projectHr", {
            alt: "Écran de la plateforme RH multi-entités",
            caption: "Capture d'écran sur poste de travail",
          }),
        },
        {
          sector: "Logistique",
          title: "Application mobile de déménagement et dépôt-vente",
          description:
            "Une application web mobile pour piloter les demandes, les stocks et les livraisons.",
          media: media("projectMoving", {
            alt: "Écran mobile de l'application de déménagement et dépôt-vente",
            caption: "Capture d'écran sur mobile",
          }),
        },
      ],
    },

    stack: {
      eyebrow: "Technologies",
      title: "Une stack moderne, choisie pour la fiabilité",
      lead: "Des technologies éprouvées et largement adoptées, pour des logiciels faciles à maintenir et à faire évoluer.",
      labels: {
        advance: "Afficher la technologie suivante",
        show: "Afficher {name}",
      },
      categories: [
        {
          title: "Design",
          items: [
            {
              id: "figma",
              name: "Figma",
              description: "UX, UI et prototypes interactifs.",
            },
            {
              id: "framer",
              name: "Framer",
              description: "Sites et prototypes animés, du design au code.",
            },
          ],
        },
        {
          title: "Langage | Framework",
          items: [
            {
              id: "nextjs",
              name: "Next.js",
              description: "Interfaces rapides et faciles à maintenir.",
            },
            {
              id: "react",
              name: "React",
              description:
                "Composants réutilisables pour des interfaces vivantes.",
            },
            {
              id: "typescript",
              name: "TypeScript",
              description: "Un code typé, plus sûr et plus lisible.",
            },
            {
              id: "nodejs",
              name: "Node.js",
              description: "Logique métier et intégrations.",
            },
          ],
        },
        {
          title: "Style | Interaction",
          items: [
            {
              id: "tailwindcss",
              name: "Tailwind CSS",
              description: "Un design system cohérent et maintenable.",
            },
            {
              id: "shadcn",
              name: "shadcn/ui",
              description: "Composants accessibles et personnalisables.",
            },
            {
              id: "gsap",
              name: "GSAP",
              description: "Animations et micro-interactions fluides.",
            },
          ],
        },
        {
          title: "Base de données | ORM",
          items: [
            {
              id: "postgresql",
              name: "PostgreSQL",
              description: "Stockage fiable et sauvegardé.",
            },
            {
              id: "prisma",
              name: "Prisma",
              description: "Accès aux données typé, migrations maîtrisées.",
            },
          ],
        },
        {
          title: "Déploiement",
          items: [
            {
              id: "docker",
              name: "Docker",
              description: "Des environnements reproductibles.",
            },
            {
              id: "coolify",
              name: "Coolify",
              description: "Déploiement auto-hébergé et supervision.",
            },
            {
              id: "traefik",
              name: "Traefik",
              description: "Routage et certificats HTTPS automatiques.",
            },
            {
              id: "gitlab",
              name: "GitLab",
              description: "Code source, CI/CD et revues de code.",
            },
          ],
        },
      ],
    },

    /** PLACEHOLDERS: hide the section with `flags.testimonials`. */
    testimonials: {
      eyebrow: "Témoignages",
      title: "Ce que disent nos clients",
      lead: "Des retours de dirigeants et d'équipes qui utilisent nos logiciels au quotidien.",
      items: [
        {
          quote:
            "[Témoignage à insérer : deux ou trois phrases sur le résultat obtenu, le gain de temps ou la fiabilité du logiciel livré.]",
          name: "[Prénom Nom]",
          role: "[Fonction, Entreprise]",
          media: media("portraitOffice", {
            alt: "",
            caption: "PHOTO — Portrait client, bureau, lumière naturelle",
          }),
        },
        {
          quote:
            "[Témoignage à insérer : deux ou trois phrases sur la qualité de l'accompagnement et la tenue des délais.]",
          name: "[Prénom Nom]",
          role: "[Fonction, Entreprise]",
          media: media("portraitMeeting", {
            alt: "",
            caption: "PHOTO — Portrait client, salle de réunion",
          }),
        },
        {
          quote:
            "[Témoignage à insérer : deux ou trois phrases sur l'adoption par les équipes et la maintenance après la mise en production.]",
          name: "[Prénom Nom]",
          role: "[Fonction, Entreprise]",
          media: media("portraitSite", {
            alt: "",
            caption: "PHOTO — Portrait client, atelier ou site de production",
          }),
        },
      ],
    },

    finalCta: {
      eyebrow: "Démarrer",
      title: "Prêt à lancer votre prochain logiciel ?",
      lead: "Un projet, un système à reprendre ou une simple question : parlons-en.",
      cta: { label: "Démarrer un projet", href: `mailto:${siteConfig.email}` },
      media: media("finalCta", { alt: "" }),
    },
  },

  work: {
    header: {
      eyebrow: "Réalisations",
      title: "Du concret, en production, chez nos clients.",
      lead: "Quelques projets récents pour des entreprises. Certains clients préfèrent rester discrets : nous présentons donc le secteur plutôt que le nom.",
      media: media("workHeader", { alt: "" }),
    },
  },

  about: {
    header: {
      eyebrow: "À propos",
      title: "Nous restons sur le problème jusqu'à ce qu'il soit réglé.",
      lead: "Ratel Labs conçoit, développe et maintient des logiciels sur mesure pour les entreprises, du cadrage à l'exploitation.",
      media: media("aboutHeader", { alt: "" }),
    },
    story: {
      eyebrow: "Notre histoire",
      statement:
        "Ratel Labs est née d'un constat simple : trop de projets logiciels s'arrêtent au moment où ça devient difficile. Nous faisons l'inverse : rester, comprendre, résoudre et livrer.",
    },
    values: {
      eyebrow: "Nos valeurs",
      title: "Ce qui guide notre travail",
      items: [
        {
          title: "Ténacité",
          description:
            "Un problème difficile n'est pas une raison de s'arrêter. C'est la raison de notre présence.",
        },
        {
          title: "Clarté",
          description:
            "Des estimations honnêtes, des démos régulières et aucune zone d'ombre.",
        },
        {
          title: "Responsabilité",
          description:
            "Nous assumons ce que nous livrons, y compris après la mise en production.",
        },
        {
          title: "Exigence",
          description:
            "Un code lisible, testé et documenté, que d'autres pourront reprendre.",
        },
      ],
    },
  },

  contact: {
    header: {
      eyebrow: "Contact",
      title: "Parlons de votre prochain logiciel.",
      lead: "Décrivez-nous votre besoin en quelques lignes. Nous revenons vers vous sous un jour ouvré.",
      media: media("contactHeader", { alt: "" }),
    },
    details: {
      email: "E-mail",
      languages: "Langues",
      languagesValue: "Français et anglais",
      social: "Retrouvez-nous",
      next: {
        title: "Et ensuite ?",
        steps: [
          "Nous lisons votre message et revenons vers vous sous un jour ouvré.",
          "Un appel de 30 minutes pour comprendre votre contexte.",
          "Une proposition claire, avec périmètre, planning et budget.",
        ],
      },
    },
    form: {
      title: "Laissez-nous un message",
      firstName: "Prénom",
      lastName: "Nom",
      email: "E-mail professionnel",
      company: "Entreprise",
      service: "Service recherché",
      servicePlaceholder: "Choisir un service",
      serviceOther: "Je ne sais pas encore",
      message: "Votre projet",
      messagePlaceholder: "Contexte, objectifs, échéances…",
      submit: "Envoyer le message",
      submitting: "Envoi en cours…",
      success: {
        title: "Message bien reçu",
        description: "Merci. Nous revenons vers vous sous un jour ouvré.",
        again: "Envoyer un autre message",
      },
      errors: {
        required: "Ce champ est obligatoire.",
        email: "Saisissez une adresse e-mail valide.",
        message: "Dites-nous en un peu plus (20 caractères minimum).",
        delivery: "L'envoi a échoué. Écrivez-nous directement à",
      },
    },
  },

  notFound: {
    eyebrow: "Erreur 404",
    title: "Cette page est introuvable.",
    lead: "Elle a peut-être été déplacée ou supprimée. Vous pouvez repartir de l'accueil.",
    cta: { label: "Retour à l'accueil", href: "/" },
    media: media("notFoundHeader", { alt: "" }),
  },
}

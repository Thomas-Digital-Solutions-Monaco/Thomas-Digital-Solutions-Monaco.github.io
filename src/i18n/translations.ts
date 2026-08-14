// ============================================================
//  TDSM — ALL TRANSLATABLE CONTENT (English + French).
//  ▸▸ Edit services / projects / experience text HERE. ◂◂
//  Both languages are kept side by side so nothing drifts.
// ============================================================

export type Lang = "en" | "fr";
export type Platform = "ios" | "android" | "mac" | "windows";

export interface Service {
  icon: string;
  title: string;
  desc: string;
}
export interface Project {
  name: string;
  category: string;
  tagline: string;
  desc: string;
  platforms: Platform[];
  accent: string;
}
export interface Exp {
  year: string;
  role: string;
  place: string;
  text: string;
}
export interface Stat {
  label: string;
  value: string;
}

export interface Translation {
  nav: {
    home: string;
    about: string;
    services: string;
    work: string;
    contact: string;
    cta: string;
  };
  hero: {
    badge: string;
    words: string[];
    lead: string;
    tail: string;
    subtext: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
  };
  about: {
    eyebrow: string;
    headA: string;
    acc1: string;
    mid: string;
    acc2: string;
    end: string;
    subtext: string;
    stats: Stat[];
  };
  services: {
    eyebrow: string;
    heading: string;
    subtext: string;
    items: Service[];
  };
  work: {
    eyebrow: string;
    heading: string;
    all: string;
    comingSoon: string;
    items: Project[];
  };
  experience: {
    eyebrow: string;
    heading: string;
    items: Exp[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    subtext: string;
    name: string;
    email: string;
    message: string;
    namePh: string;
    emailPh: string;
    messagePh: string;
    send: string;
    sending: string;
    sent: string;
    error: string;
  };
  footer: {
    rights: string;
  };
}

// Project accent colours (shared across both languages, kept red-family).
const A = { streakly: "#d81e2c", governor: "#9b1c31", dearfolk: "#e0764a" };

export const translations: Record<Lang, Translation> = {
  // ---------------------------------------------------------
  //  ENGLISH
  // ---------------------------------------------------------
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      work: "Work",
      contact: "Contact",
      cta: "Start a project",
    },
    hero: {
      badge: "Digital Studio",
      words: ["Apps", "Websites", "Automations", "Experiences"],
      lead: "We build ",
      tail: " that move business forward.",
      subtext:
        "TDSM designs and ships mobile, desktop and web apps — from the first idea all the way to the App Store, Google Play and beyond.",
      ctaPrimary: "Start a project →",
      ctaSecondary: "View our work",
      scroll: "scroll",
    },
    about: {
      eyebrow: "About TDSM",
      headA: "A Monaco-based studio pairing ",
      acc1: "engineering rigor",
      mid: " with ",
      acc2: "design polish",
      end: ".",
      subtext:
        "Thomas Digital Solutions Monaco helps businesses on the Riviera and beyond ship reliable products — from beautiful mobile apps to the automation and infrastructure running quietly behind the scenes.",
      stats: [
        { label: "Apps in development", value: "3" },
        { label: "Years of experience", value: "6" },
        { label: "Platforms supported", value: "4" },
      ],
    },
    services: {
      eyebrow: "What we do",
      heading: "Services engineered end-to-end",
      subtext:
        "From a single feature to your whole product — one accountable team across mobile, desktop and cloud.",
      items: [
        {
          icon: "📱",
          title: "Mobile App Development",
          desc: "Native-feeling iOS & Android apps, designed and built to ship on the App Store and Google Play.",
        },
        {
          icon: "💻",
          title: "Desktop & Cross-Platform",
          desc: "Mac and Windows applications from a shared codebase — consistent everywhere your users are.",
        },
        {
          icon: "⚙️",
          title: "Automation & Integration",
          desc: "Scripting, workflows and API integrations that remove repetitive work and connect your tools.",
        },
        {
          icon: "☁️",
          title: "Cloud & DevOps",
          desc: "Azure infrastructure and CI/CD pipelines so your product ships continuously and safely.",
        },
      ],
    },
    work: {
      eyebrow: "Selected work",
      heading: "Apps we're building",
      all: "All",
      comingSoon: "Coming soon",
      items: [
        {
          name: "Streakly",
          category: "Mobile",
          tagline: "Habit tracker",
          desc: "Build better habits and keep your streaks alive with a clean, motivating daily tracker.",
          platforms: ["ios", "android"],
          accent: A.streakly,
        },
        {
          name: "Governor",
          category: "Cross-platform",
          tagline: "Rule-powered to-do",
          desc: "A smart to-do app where rules automate your lists — the same experience on every device.",
          platforms: ["ios", "android", "mac", "windows"],
          accent: A.governor,
        },
        {
          name: "Dearfolk",
          category: "Mobile",
          tagline: "Stay close to your people",
          desc: "Gentle reminders to call and see the friends and family who matter, for real social connection.",
          platforms: ["ios", "android"],
          accent: A.dearfolk,
        },
      ],
    },
    experience: {
      eyebrow: "Journey",
      heading: "Experience & milestones",
      items: [
        {
          year: "2026 — now",
          role: "Digital Solutions Engineer",
          place: "TDSM · Monaco",
          text: "Founding TDSM to deliver web, automation and endpoint engineering to businesses on the Riviera.",
        },
        {
          year: "2023 — 2026",
          role: "Engineer Consultant",
          place: "Independent consultancy",
          text: "Ran my own consulting company, delivering engineering, automation and device-management projects for clients.",
        },
      ],
    },
    contact: {
      eyebrow: "Get in touch",
      heading: "Let's build something",
      subtext:
        "Tell us about your project and we'll reply within one business day.",
      name: "Full name",
      email: "Email",
      message: "Message",
      namePh: "Jane Doe",
      emailPh: "jane@company.com",
      messagePh: "What can we help you build?",
      send: "Send message →",
      sending: "Sending…",
      sent: "✓ Thanks! Your message has been received.",
      error: "Something went wrong — please email us directly.",
    },
    footer: { rights: "All rights reserved." },
  },

  // ---------------------------------------------------------
  //  FRANÇAIS
  // ---------------------------------------------------------
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      services: "Services",
      work: "Réalisations",
      contact: "Contact",
      cta: "Démarrer un projet",
    },
    hero: {
      badge: "Studio digital",
      words: ["applications", "sites web", "automatisations", "expériences"],
      lead: "Nous concevons des ",
      tail: " qui font avancer votre entreprise.",
      subtext:
        "TDSM conçoit et livre des applications mobiles, desktop et web — de la première idée jusqu'à l'App Store, Google Play et au-delà.",
      ctaPrimary: "Démarrer un projet →",
      ctaSecondary: "Voir nos réalisations",
      scroll: "défiler",
    },
    about: {
      eyebrow: "À propos de TDSM",
      headA: "Un studio monégasque alliant ",
      acc1: "rigueur d'ingénierie",
      mid: " et ",
      acc2: "finition soignée",
      end: ".",
      subtext:
        "Thomas Digital Solutions Monaco aide les entreprises de la Riviera et d'ailleurs à livrer des produits fiables — de superbes applications mobiles jusqu'à l'automatisation et l'infrastructure qui tournent en coulisses.",
      stats: [
        { label: "Applications en développement", value: "3" },
        { label: "Années d'expérience", value: "6" },
        { label: "Plateformes prises en charge", value: "4" },
      ],
    },
    services: {
      eyebrow: "Ce que nous faisons",
      heading: "Des services conçus de bout en bout",
      subtext:
        "D'une seule fonctionnalité à votre produit complet — une équipe responsable sur mobile, desktop et cloud.",
      items: [
        {
          icon: "📱",
          title: "Développement d'applications mobiles",
          desc: "Des applications iOS & Android au rendu natif, conçues pour l'App Store et Google Play.",
        },
        {
          icon: "💻",
          title: "Desktop & multiplateforme",
          desc: "Des applications Mac et Windows depuis une base de code partagée — cohérentes partout.",
        },
        {
          icon: "⚙️",
          title: "Automatisation & intégration",
          desc: "Scripts, workflows et intégrations d'API qui suppriment les tâches répétitives et relient vos outils.",
        },
        {
          icon: "☁️",
          title: "Cloud & DevOps",
          desc: "Infrastructure Azure et pipelines CI/CD pour livrer votre produit en continu et en toute sécurité.",
        },
      ],
    },
    work: {
      eyebrow: "Réalisations",
      heading: "Les applications que nous créons",
      all: "Toutes",
      comingSoon: "Bientôt disponible",
      items: [
        {
          name: "Streakly",
          category: "Mobile",
          tagline: "Suivi d'habitudes",
          desc: "Adoptez de meilleures habitudes et gardez vos séries actives grâce à un suivi quotidien clair et motivant.",
          platforms: ["ios", "android"],
          accent: A.streakly,
        },
        {
          name: "Governor",
          category: "Multiplateforme",
          tagline: "To-do piloté par des règles",
          desc: "Une application de tâches où des règles automatisent vos listes — la même expérience sur chaque appareil.",
          platforms: ["ios", "android", "mac", "windows"],
          accent: A.governor,
        },
        {
          name: "Dearfolk",
          category: "Mobile",
          tagline: "Restez proche des vôtres",
          desc: "De doux rappels pour appeler et voir les amis et la famille qui comptent, pour un vrai lien social.",
          platforms: ["ios", "android"],
          accent: A.dearfolk,
        },
      ],
    },
    experience: {
      eyebrow: "Parcours",
      heading: "Expérience & étapes clés",
      items: [
        {
          year: "2026 — aujourd'hui",
          role: "Ingénieur solutions digitales",
          place: "TDSM · Monaco",
          text: "Fondation de TDSM pour offrir web, automatisation et ingénierie des postes de travail aux entreprises de la Riviera.",
        },
        {
          year: "2023 — 2026",
          role: "Ingénieur consultant",
          place: "Société de conseil indépendante",
          text: "Direction de ma propre société de conseil, avec des projets d'ingénierie, d'automatisation et de gestion de parc.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      heading: "Créons quelque chose ensemble",
      subtext:
        "Parlez-nous de votre projet et nous répondrons sous un jour ouvré.",
      name: "Nom complet",
      email: "E-mail",
      message: "Message",
      namePh: "Jean Dupont",
      emailPh: "jean@entreprise.com",
      messagePh: "Que pouvons-nous construire pour vous ?",
      send: "Envoyer le message →",
      sending: "Envoi…",
      sent: "✓ Merci ! Votre message a bien été reçu.",
      error: "Une erreur est survenue — écrivez-nous directement.",
    },
    footer: { rights: "Tous droits réservés." },
  },
};

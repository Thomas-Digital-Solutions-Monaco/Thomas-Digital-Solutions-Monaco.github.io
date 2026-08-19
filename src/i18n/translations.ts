// ============================================================
//  TDSM — ALL TRANSLATABLE CONTENT (English + French).
// ============================================================

export type Lang = "en" | "fr";
export type Platform = "ios" | "android" | "mac" | "windows";
export type StatId = "apps" | "experience" | "platforms" | "github";
export type SvcId = "mobile" | "desktop" | "automation" | "cloud";

export interface Service { id: SvcId; title: string; desc: string; detail: string; points: string[]; }
export interface Project {
  name: string; category: string; tagline: string; desc: string;
  platforms: Platform[]; accent: string;
}
export interface Exp { year: string; role: string; place: string; text: string; }
export interface Stat { id: StatId; label: string; value: string; }

export interface Previews {
  appsTitle: string; experienceTitle: string; platformsTitle: string; githubTitle: string;
  appsHint: string; githubHint: string; viewActivity: string; hint: string; close: string;
}

export interface Translation {
  nav: { home: string; about: string; services: string; work: string; activity: string; contact: string; cta: string; };
  hero: { badge: string; words: string[]; lead: string; tail: string; subtext: string; ctaPrimary: string; ctaSecondary: string; scroll: string; };
  radar: {
    live: string; title: string; subtext: string;
    kApps: string; kPlatforms: string; kYears: string; kCommits: string;
    nextEvent: string; today: string; feedTitle: string; days: string; day: string;
    starts: string; liveNow: string; hint: string;
  };
  about: {
    eyebrow: string; headA: string; acc1: string; mid: string; acc2: string; end: string; subtext: string;
    stats: Stat[]; previews: Previews;
  };
  services: { eyebrow: string; heading: string; subtext: string; items: Service[]; cta: string; hint: string; close: string; };
  work: { eyebrow: string; heading: string; all: string; comingSoon: string; items: Project[]; };
  experience: { eyebrow: string; heading: string; items: Exp[]; };
  activity: { eyebrow: string; heading: string; subtext: string; total: string; loading: string; error: string; viewProfile: string; less: string; more: string; months: string[]; };
  contact: { eyebrow: string; heading: string; subtext: string; name: string; email: string; message: string; namePh: string; emailPh: string; messagePh: string; send: string; note: string; or: string; direct: string; };
  footer: { rights: string; };
}

const A = { streakly: "#d81e2c", governor: "#9b1c31", dearfolk: "#e0764a" };

export const translations: Record<Lang, Translation> = {
  en: {
    nav: { home: "Home", about: "About", services: "Services", work: "Work", activity: "Activity", contact: "Contact", cta: "Start a project" },
    hero: {
      badge: "Digital Studio",
      words: ["Apps", "Websites", "Automations", "Experiences"],
      lead: "We build", tail: "that move business forward.",
      subtext: "TDSM designs and ships mobile, desktop and web apps — from the first idea all the way to the App Store, Google Play and beyond.",
      ctaPrimary: "Start a project →", ctaSecondary: "View our work", scroll: "scroll",
    },
    radar: {
      live: "LIVE", title: "TDSM",
      subtext: "A live pulse of the studio and the Principality — build activity and Monaco's headline events, in real time.",
      kApps: "Apps in dev", kPlatforms: "Platforms", kYears: "Years", kCommits: "Contributions / yr",
      nextEvent: "Next Monaco event", today: "Monaco time", feedTitle: "Monaco radar",
      days: "days", day: "day", starts: "starts in", liveNow: "LIVE NOW",
      hint: "Click a stat for a quick preview",
    },
    about: {
      eyebrow: "About TDSM",
      headA: "A Monaco-based studio pairing ", acc1: "engineering rigor", mid: " with ", acc2: "design polish", end: ".",
      subtext: "Thomas Digital Solutions Monaco helps businesses on the Riviera and beyond ship reliable products — from beautiful mobile apps to the automation and infrastructure running quietly behind the scenes.",
      stats: [
        { id: "apps", label: "Apps in development", value: "3" },
        { id: "experience", label: "Years of experience", value: "6" },
        { id: "platforms", label: "Platforms supported", value: "4" },
      ],
      previews: {
        appsTitle: "Apps in development", experienceTitle: "Experience", platformsTitle: "Platforms supported", githubTitle: "GitHub activity",
        appsHint: "The apps we're currently building.",
        githubHint: "A snapshot of recent open-source activity, synced live from GitHub.",
        viewActivity: "See full activity →",
        hint: "Click any card for a quick preview", close: "Close",
      },
    },
    services: {
      eyebrow: "What we do", heading: "Services engineered end-to-end",
      subtext: "From a single feature to your whole product — one accountable team across mobile, desktop and cloud.",
      cta: "Start a project →", hint: "Click any service to learn more", close: "Close",
      items: [
        {
          id: "mobile", title: "Mobile App Development",
          desc: "Native-feeling iOS & Android apps, designed and built to ship on the App Store and Google Play.",
          detail: "We take mobile products from idea to store listing — thoughtful UX, smooth animations and a codebase built to last. Using React Native and Expo, we ship a single codebase to both platforms without compromising the native feel.",
          points: ["iOS & Android from one codebase", "App Store & Google Play submission", "Offline-first, push notifications & deep links", "Analytics and crash reporting baked in"],
        },
        {
          id: "desktop", title: "Desktop & Cross-Platform",
          desc: "Mac and Windows applications from a shared codebase — consistent everywhere your users are.",
          detail: "When your users live on the desktop, we deliver fast, native-feeling Mac and Windows apps that stay in sync with your mobile and web experiences — one design system, everywhere.",
          points: ["macOS & Windows builds", "Auto-updates & code signing", "Shared logic with your mobile/web apps", "System tray, shortcuts & OS integrations"],
        },
        {
          id: "automation", title: "Automation & Integration",
          desc: "Scripting, workflows and API integrations that remove repetitive work and connect your tools.",
          detail: "We connect the tools you already use and automate the busywork in between — from device management and onboarding flows to custom API integrations that keep your data moving without manual steps.",
          points: ["Custom API & webhook integrations", "Device & endpoint automation (Intune, scripting)", "Scheduled jobs & event-driven workflows", "Dashboards to monitor it all"],
        },
        {
          id: "cloud", title: "Cloud & DevOps",
          desc: "Azure infrastructure and CI/CD pipelines so your product ships continuously and safely.",
          detail: "We set up the plumbing that lets you ship with confidence: infrastructure as code, automated pipelines and monitoring — so every release is repeatable, observable and safe to roll back.",
          points: ["Azure infrastructure as code", "CI/CD pipelines (GitHub Actions)", "Monitoring, logging & alerting", "Zero-downtime deploys & rollbacks"],
        },
      ],
    },
    work: {
      eyebrow: "Selected work", heading: "Apps we're building", all: "All", comingSoon: "Coming soon",
      items: [
        { name: "Streakly", category: "Mobile", tagline: "Habit tracker", desc: "Build better habits and keep your streaks alive with a clean, motivating daily tracker.", platforms: ["ios", "android"], accent: A.streakly },
        { name: "Governor", category: "Cross-platform", tagline: "Rule-powered to-do", desc: "A smart to-do app where rules automate your lists — the same experience on every device.", platforms: ["ios", "android", "mac", "windows"], accent: A.governor },
        { name: "Dearfolk", category: "Mobile", tagline: "Stay close to your people", desc: "Gentle reminders to call and see the friends and family who matter, for real social connection.", platforms: ["ios", "android"], accent: A.dearfolk },
      ],
    },
    experience: {
      eyebrow: "Journey", heading: "Experience & milestones",
      items: [
        { year: "2026 — now", role: "Digital Solutions Engineer", place: "TDSM · Monaco", text: "Founding TDSM to deliver web, automation and endpoint engineering to businesses on the Riviera." },
      ],
    },
    activity: {
      eyebrow: "Open source", heading: "GitHub activity",
      subtext: "A live view of my contributions over the last year — synced straight from GitHub.",
      total: "contributions in the last year", loading: "Loading contributions…",
      error: "Couldn't load GitHub activity right now.", viewProfile: "View profile on GitHub →",
      less: "Less", more: "More",
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    contact: {
      eyebrow: "Get in touch", heading: "Let's build something",
      subtext: "Fill in the form and it opens in your email app, ready to send.",
      name: "Full name", email: "Your email", message: "Message",
      namePh: "Jane Doe", emailPh: "jane@company.com", messagePh: "What can we help you build?",
      send: "Open in email app →",
      note: "This opens your default email app (Outlook, Gmail, Mail…) with everything pre-filled.",
      or: "or email us directly at", direct: "contact@tdsm.mc",
    },
    footer: { rights: "All rights reserved." },
  },

  fr: {
    nav: { home: "Accueil", about: "À propos", services: "Services", work: "Réalisations", activity: "Activité", contact: "Contact", cta: "Démarrer un projet" },
    hero: {
      badge: "Studio digital",
      words: ["applications", "sites web", "automatisations", "expériences"],
      lead: "Nous concevons des", tail: "qui font avancer votre entreprise.",
      subtext: "TDSM conçoit et livre des applications mobiles, desktop et web — de la première idée jusqu'à l'App Store, Google Play et au-delà.",
      ctaPrimary: "Démarrer un projet →", ctaSecondary: "Voir nos réalisations", scroll: "défiler",
    },
    radar: {
      live: "EN DIRECT", title: "TDSM",
      subtext: "Le pouls en temps réel du studio et de la Principauté — activité de développement et grands événements monégasques.",
      kApps: "Apps en dev", kPlatforms: "Plateformes", kYears: "Années", kCommits: "Contributions / an",
      nextEvent: "Prochain événement", today: "Heure de Monaco", feedTitle: "Radar Monaco",
      days: "jours", day: "jour", starts: "dans", liveNow: "EN COURS",
      hint: "Cliquez sur une statistique pour un aperçu",
    },
    about: {
      eyebrow: "À propos de TDSM",
      headA: "Un studio monégasque alliant ", acc1: "rigueur d'ingénierie", mid: " et ", acc2: "finition soignée", end: ".",
      subtext: "Thomas Digital Solutions Monaco aide les entreprises de la Riviera et d'ailleurs à livrer des produits fiables — de superbes applications mobiles jusqu'à l'automatisation et l'infrastructure qui tournent en coulisses.",
      stats: [
        { id: "apps", label: "Applications en développement", value: "3" },
        { id: "experience", label: "Années d'expérience", value: "6" },
        { id: "platforms", label: "Plateformes prises en charge", value: "4" },
      ],
      previews: {
        appsTitle: "Applications en développement", experienceTitle: "Expérience", platformsTitle: "Plateformes prises en charge", githubTitle: "Activité GitHub",
        appsHint: "Les applications que nous développons actuellement.",
        githubHint: "Un aperçu de l'activité open-source récente, synchronisé en direct depuis GitHub.",
        viewActivity: "Voir toute l'activité →",
        hint: "Cliquez sur une carte pour un aperçu rapide", close: "Fermer",
      },
    },
    services: {
      eyebrow: "Ce que nous faisons", heading: "Des services conçus de bout en bout",
      subtext: "D'une seule fonctionnalité à votre produit complet — une équipe responsable sur mobile, desktop et cloud.",
      cta: "Démarrer un projet →", hint: "Cliquez sur un service pour en savoir plus", close: "Fermer",
      items: [
        {
          id: "mobile", title: "Développement d'applications mobiles",
          desc: "Des applications iOS & Android au rendu natif, conçues pour l'App Store et Google Play.",
          detail: "Nous menons les produits mobiles de l'idée à la mise en ligne — UX soignée, animations fluides et une base de code durable. Avec React Native et Expo, nous livrons une seule base de code sur les deux plateformes sans sacrifier le rendu natif.",
          points: ["iOS & Android depuis une seule base de code", "Publication sur l'App Store & Google Play", "Offline-first, notifications push & deep links", "Analytics et rapports de crash intégrés"],
        },
        {
          id: "desktop", title: "Desktop & multiplateforme",
          desc: "Des applications Mac et Windows depuis une base de code partagée — cohérentes partout.",
          detail: "Quand vos utilisateurs vivent sur le bureau, nous livrons des applications Mac et Windows rapides, au rendu natif, synchronisées avec vos expériences mobiles et web — un seul design system, partout.",
          points: ["Builds macOS & Windows", "Mises à jour automatiques & signature de code", "Logique partagée avec vos apps mobile/web", "Barre système, raccourcis & intégrations OS"],
        },
        {
          id: "automation", title: "Automatisation & intégration",
          desc: "Scripts, workflows et intégrations d'API qui suppriment les tâches répétitives et relient vos outils.",
          detail: "Nous connectons les outils que vous utilisez déjà et automatisons les tâches répétitives — de la gestion de parc et des parcours d'onboarding aux intégrations d'API sur mesure qui font circuler vos données sans étape manuelle.",
          points: ["Intégrations API & webhooks sur mesure", "Automatisation des postes (Intune, scripts)", "Tâches planifiées & workflows événementiels", "Tableaux de bord pour tout superviser"],
        },
        {
          id: "cloud", title: "Cloud & DevOps",
          desc: "Infrastructure Azure et pipelines CI/CD pour livrer votre produit en continu et en toute sécurité.",
          detail: "Nous mettons en place la tuyauterie qui permet de livrer sereinement : infrastructure as code, pipelines automatisés et supervision — pour que chaque release soit reproductible, observable et réversible en toute sécurité.",
          points: ["Infrastructure Azure as code", "Pipelines CI/CD (GitHub Actions)", "Supervision, logs & alertes", "Déploiements sans interruption & rollbacks"],
        },
      ],
    },
    work: {
      eyebrow: "Réalisations", heading: "Les applications que nous créons", all: "Toutes", comingSoon: "Bientôt disponible",
      items: [
        { name: "Streakly", category: "Mobile", tagline: "Suivi d'habitudes", desc: "Adoptez de meilleures habitudes et gardez vos séries actives grâce à un suivi quotidien clair et motivant.", platforms: ["ios", "android"], accent: A.streakly },
        { name: "Governor", category: "Multiplateforme", tagline: "To-do piloté par des règles", desc: "Une application de tâches où des règles automatisent vos listes — la même expérience sur chaque appareil.", platforms: ["ios", "android", "mac", "windows"], accent: A.governor },
        { name: "Dearfolk", category: "Mobile", tagline: "Restez proche des vôtres", desc: "De doux rappels pour appeler et voir les amis et la famille qui comptent, pour un vrai lien social.", platforms: ["ios", "android"], accent: A.dearfolk },
      ],
    },
    experience: {
      eyebrow: "Parcours", heading: "Expérience & étapes clés",
      items: [
        { year: "2026 — aujourd'hui", role: "Ingénieur solutions digitales", place: "TDSM · Monaco", text: "Fondation de TDSM pour offrir web, automatisation et ingénierie des postes de travail aux entreprises de la Riviera." },
      ],
    },
    activity: {
      eyebrow: "Open source", heading: "Activité GitHub",
      subtext: "Une vue en direct de mes contributions sur la dernière année — synchronisée depuis GitHub.",
      total: "contributions sur la dernière année", loading: "Chargement des contributions…",
      error: "Impossible de charger l'activité GitHub pour le moment.", viewProfile: "Voir le profil sur GitHub →",
      less: "Moins", more: "Plus",
      months: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
    },
    contact: {
      eyebrow: "Contact", heading: "Créons quelque chose ensemble",
      subtext: "Remplissez le formulaire : il s'ouvre dans votre messagerie, prêt à envoyer.",
      name: "Nom complet", email: "Votre e-mail", message: "Message",
      namePh: "Jean Dupont", emailPh: "jean@entreprise.com", messagePh: "Que pouvons-nous construire pour vous ?",
      send: "Ouvrir dans ma messagerie →",
      note: "Cela ouvre votre application e-mail par défaut (Outlook, Gmail, Mail…) avec tout pré-rempli.",
      or: "ou écrivez-nous directement à", direct: "contact@tdsm.mc",
    },
    footer: { rights: "Tous droits réservés." },
  },
};

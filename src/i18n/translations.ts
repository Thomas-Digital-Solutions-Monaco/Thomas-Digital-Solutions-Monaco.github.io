import type { CornerKey, StopKind } from "../constants/monacoCircuit";

export type Lang = "en" | "fr";
export type Platform = "ios" | "android" | "mac" | "windows";
export type StatId = "apps" | "experience" | "platforms" | "github";
export type SvcId = "mobile" | "desktop" | "automation" | "cloud";

export interface Service { id: SvcId; title: string; desc: string; detail: string; points: string[]; }
export interface Project { name: string; category: string; tagline: string; desc: string; platforms: Platform[]; accent: string; }
export interface Exp { year: string; role: string; place: string; text: string; }
export interface Stat { id: StatId; label: string; value: string; }
export interface Previews { appsTitle: string; experienceTitle: string; platformsTitle: string; githubTitle: string; appsHint: string; githubHint: string; hint: string; close: string; }

export interface Translation {
  nav: { home: string; about: string; services: string; work: string; activity: string; contact: string; cta: string; };
  circuit: { hud: string; restart: string; hint: string; overview: string; resume: string; corners: Record<CornerKey, string>; sections: Record<StopKind, string>; };
  settings: { title: string; motion: string; on: string; off: string; speed: string; slow: string; normal: string; fast: string; };
  hero: { badge: string; words: string[]; lead: string; tail: string; subtext: string; ctaPrimary: string; ctaSecondary: string; };
  radar: { live: string; title: string; kApps: string; kPlatforms: string; kYears: string; kCommits: string; nextEvent: string; today: string; news: string; days: string; day: string; starts: string; liveNow: string; };
  about: { eyebrow: string; headA: string; acc1: string; mid: string; acc2: string; end: string; subtext: string; stats: Stat[]; previews: Previews; };
  services: { eyebrow: string; heading: string; items: Service[]; cta: string; hint: string; close: string; };
  work: { eyebrow: string; heading: string; comingSoon: string; items: Project[]; };
  experience: { eyebrow: string; heading: string; items: Exp[]; };
  activity: { eyebrow: string; heading: string; total: string; loading: string; error: string; viewProfile: string; months: string[]; };
  contact: { eyebrow: string; heading: string; subtext: string; name: string; email: string; message: string; namePh: string; emailPh: string; messagePh: string; send: string; or: string; direct: string; };
}

const A = { streakly: "#d81e2c", governor: "#9b1c31", dearfolk: "#e0764a" };

export const translations: Record<Lang, Translation> = {
  en: {
    nav: { home: "Home", about: "About", services: "Services", work: "Work", activity: "Activity", contact: "Contact", cta: "Start a project" },
    circuit: { hud: "Corner", restart: "🏁 Victory lap — restart", hint: "Scroll / swipe to drive the lap", overview: "Full track", resume: "Scroll or tap to resume",
      corners: { start: "Start / Finish", devote: "Sainte Dévote", beaurivage: "Beau Rivage", casino: "Casino Square", hairpin: "Fairmont Hairpin", portier: "Portier", tunnel: "The Tunnel", rascasse: "Rascasse → Finish" },
      sections: { home: "Home", live: "TDSM Live", about: "About", services: "Services", work: "Work", experience: "Journey", activity: "Activity", contact: "Contact" } },
    settings: { title: "Animation", motion: "Motion", on: "On", off: "Off", speed: "Speed", slow: "Slow", normal: "Normal", fast: "Fast" },
    hero: { badge: "Digital Studio", words: ["Apps", "Websites", "Automations", "Experiences"], lead: "We build", tail: "that move business forward.",
      subtext: "TDSM designs and ships mobile, desktop and web apps — from the first idea to the App Store, Google Play and beyond.",
      ctaPrimary: "Start a project →", ctaSecondary: "View our work" },
    radar: { live: "LIVE", title: "TDSM", kApps: "Apps", kPlatforms: "Platforms", kYears: "Years", kCommits: "Contribs / yr",
      nextEvent: "Next event", today: "Monaco time", news: "Live from Monaco", days: "days", day: "day", starts: "in", liveNow: "LIVE NOW" },
    about: { eyebrow: "About TDSM", headA: "A Monaco studio pairing ", acc1: "engineering rigor", mid: " with ", acc2: "design polish", end: ".",
      subtext: "TDSM helps businesses on the Riviera ship reliable products — from beautiful mobile apps to the automation running quietly behind the scenes.",
      stats: [ { id: "apps", label: "Apps in dev", value: "3" }, { id: "experience", label: "Years", value: "6" }, { id: "platforms", label: "Platforms", value: "4" } ],
      previews: { appsTitle: "Apps in development", experienceTitle: "Experience", platformsTitle: "Platforms supported", githubTitle: "GitHub activity", appsHint: "The apps we're currently building.", githubHint: "Recent open-source activity, synced live from GitHub.", hint: "Click a card for a preview", close: "Close" } },
    services: { eyebrow: "What we do", heading: "Services engineered end-to-end", cta: "Start a project →", hint: "Click any service to learn more", close: "Close",
      items: [
        { id: "mobile", title: "Mobile App Development", desc: "Native-feeling iOS & Android apps for the App Store and Google Play.", detail: "We take mobile products from idea to store listing with React Native and Expo — one codebase, both platforms, without compromising the native feel.", points: ["iOS & Android, one codebase", "App Store & Google Play", "Offline-first, push & deep links", "Analytics & crash reporting"] },
        { id: "desktop", title: "Desktop & Cross-Platform", desc: "Mac and Windows apps from a shared codebase — consistent everywhere.", detail: "Fast, native-feeling Mac and Windows apps that stay in sync with your mobile and web experiences — one design system, everywhere.", points: ["macOS & Windows builds", "Auto-updates & code signing", "Shared logic with mobile/web", "Shortcuts & OS integrations"] },
        { id: "automation", title: "Automation & Integration", desc: "Workflows and API integrations that remove repetitive work.", detail: "We connect the tools you already use and automate the busywork between them — from device management to custom API integrations.", points: ["API & webhook integrations", "Device automation (Intune)", "Scheduled & event workflows", "Dashboards to monitor it all"] },
        { id: "cloud", title: "Cloud & DevOps", desc: "Azure infrastructure and CI/CD so you ship continuously and safely.", detail: "Infrastructure as code, automated pipelines and monitoring — so every release is repeatable, observable and safe to roll back.", points: ["Azure infrastructure as code", "CI/CD (GitHub Actions)", "Monitoring & alerting", "Zero-downtime deploys"] },
      ] },
    work: { eyebrow: "Selected work", heading: "Apps we're building", comingSoon: "Coming soon",
      items: [
        { name: "Streakly", category: "Mobile", tagline: "Habit tracker", desc: "Build better habits and keep your streaks alive with a clean, motivating daily tracker.", platforms: ["ios", "android"], accent: A.streakly },
        { name: "Governor", category: "Cross-platform", tagline: "Rule-powered to-do", desc: "A smart to-do app where rules automate your lists — the same experience on every device.", platforms: ["ios", "android", "mac", "windows"], accent: A.governor },
        { name: "Dearfolk", category: "Mobile", tagline: "Stay close to your people", desc: "Gentle reminders to call and see the friends and family who matter, for real social connection.", platforms: ["ios", "android"], accent: A.dearfolk },
      ] },
    experience: { eyebrow: "Journey", heading: "Experience & milestones", items: [ { year: "2026 — now", role: "Digital Solutions Engineer", place: "TDSM · Monaco", text: "Founding TDSM to deliver web, automation and endpoint engineering to businesses on the Riviera." } ] },
    activity: { eyebrow: "Open source", heading: "GitHub activity", total: "contributions in the last year", loading: "Loading contributions…", error: "Couldn't load GitHub activity.", viewProfile: "View profile on GitHub →", months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] },
    contact: { eyebrow: "Get in touch", heading: "Let's build something", subtext: "Fill in the form and it opens in your email app.", name: "Full name", email: "Your email", message: "Message", namePh: "Jane Doe", emailPh: "jane@company.com", messagePh: "What can we help you build?", send: "Open in email app →", or: "or email us at", direct: "contact@tdsm.mc" },
  },
  fr: {
    nav: { home: "Accueil", about: "À propos", services: "Services", work: "Réalisations", activity: "Activité", contact: "Contact", cta: "Démarrer un projet" },
    circuit: { hud: "Virage", restart: "🏁 Tour d'honneur — recommencer", hint: "Défilez / balayez pour lancer le tour", overview: "Circuit complet", resume: "Défilez ou touchez pour reprendre",
      corners: { start: "Départ / Arrivée", devote: "Sainte Dévote", beaurivage: "Beau Rivage", casino: "Place du Casino", hairpin: "Épingle du Fairmont", portier: "Le Portier", tunnel: "Le Tunnel", rascasse: "Rascasse → Arrivée" },
      sections: { home: "Accueil", live: "TDSM Live", about: "À propos", services: "Services", work: "Réalisations", experience: "Parcours", activity: "Activité", contact: "Contact" } },
    settings: { title: "Animation", motion: "Animation", on: "Activée", off: "Désactivée", speed: "Vitesse", slow: "Lente", normal: "Normale", fast: "Rapide" },
    hero: { badge: "Studio digital", words: ["applications", "sites web", "automatisations", "expériences"], lead: "Nous concevons des", tail: "qui font avancer votre entreprise.",
      subtext: "TDSM conçoit et livre des applications mobiles, desktop et web — de la première idée jusqu'à l'App Store, Google Play et au-delà.",
      ctaPrimary: "Démarrer un projet →", ctaSecondary: "Voir nos réalisations" },
    radar: { live: "EN DIRECT", title: "TDSM", kApps: "Apps", kPlatforms: "Plateformes", kYears: "Années", kCommits: "Contribs / an",
      nextEvent: "Prochain", today: "Heure de Monaco", news: "En direct de Monaco", days: "jours", day: "jour", starts: "dans", liveNow: "EN COURS" },
    about: { eyebrow: "À propos de TDSM", headA: "Un studio monégasque alliant ", acc1: "rigueur d'ingénierie", mid: " et ", acc2: "finition soignée", end: ".",
      subtext: "TDSM aide les entreprises de la Riviera à livrer des produits fiables — de superbes applications mobiles jusqu'à l'automatisation en coulisses.",
      stats: [ { id: "apps", label: "Apps en dev", value: "3" }, { id: "experience", label: "Années", value: "6" }, { id: "platforms", label: "Plateformes", value: "4" } ],
      previews: { appsTitle: "Applications en développement", experienceTitle: "Expérience", platformsTitle: "Plateformes prises en charge", githubTitle: "Activité GitHub", appsHint: "Les applications que nous développons.", githubHint: "Activité open-source récente, synchronisée depuis GitHub.", hint: "Cliquez sur une carte pour un aperçu", close: "Fermer" } },
    services: { eyebrow: "Ce que nous faisons", heading: "Des services conçus de bout en bout", cta: "Démarrer un projet →", hint: "Cliquez sur un service pour en savoir plus", close: "Fermer",
      items: [
        { id: "mobile", title: "Applications mobiles", desc: "Des apps iOS & Android au rendu natif, pour l'App Store et Google Play.", detail: "De l'idée à la mise en ligne avec React Native et Expo — une seule base de code, les deux plateformes, sans sacrifier le rendu natif.", points: ["iOS & Android, une base", "App Store & Google Play", "Offline-first, push & deep links", "Analytics & rapports de crash"] },
        { id: "desktop", title: "Desktop & multiplateforme", desc: "Des apps Mac et Windows depuis une base partagée — cohérentes partout.", detail: "Des applications Mac et Windows rapides, au rendu natif, synchronisées avec vos expériences mobiles et web.", points: ["Builds macOS & Windows", "Mises à jour & signature", "Logique partagée mobile/web", "Raccourcis & intégrations OS"] },
        { id: "automation", title: "Automatisation & intégration", desc: "Workflows et intégrations d'API qui suppriment les tâches répétitives.", detail: "Nous relions vos outils et automatisons les tâches entre eux — de la gestion de parc aux intégrations d'API sur mesure.", points: ["Intégrations API & webhooks", "Automatisation (Intune)", "Workflows planifiés", "Tableaux de bord"] },
        { id: "cloud", title: "Cloud & DevOps", desc: "Infrastructure Azure et CI/CD pour livrer en continu et en sécurité.", detail: "Infrastructure as code, pipelines automatisés et supervision — pour que chaque release soit reproductible et réversible.", points: ["Infrastructure Azure as code", "CI/CD (GitHub Actions)", "Supervision & alertes", "Déploiements sans interruption"] },
      ] },
    work: { eyebrow: "Réalisations", heading: "Les applications que nous créons", comingSoon: "Bientôt disponible",
      items: [
        { name: "Streakly", category: "Mobile", tagline: "Suivi d'habitudes", desc: "Adoptez de meilleures habitudes et gardez vos séries actives.", platforms: ["ios", "android"], accent: A.streakly },
        { name: "Governor", category: "Multiplateforme", tagline: "To-do piloté par des règles", desc: "Une app de tâches où des règles automatisent vos listes.", platforms: ["ios", "android", "mac", "windows"], accent: A.governor },
        { name: "Dearfolk", category: "Mobile", tagline: "Restez proche des vôtres", desc: "De doux rappels pour appeler et voir ceux qui comptent.", platforms: ["ios", "android"], accent: A.dearfolk },
      ] },
    experience: { eyebrow: "Parcours", heading: "Expérience & étapes clés", items: [ { year: "2026 — aujourd'hui", role: "Ingénieur solutions digitales", place: "TDSM · Monaco", text: "Fondation de TDSM pour offrir web, automatisation et ingénierie des postes de travail aux entreprises de la Riviera." } ] },
    activity: { eyebrow: "Open source", heading: "Activité GitHub", total: "contributions sur la dernière année", loading: "Chargement…", error: "Impossible de charger l'activité GitHub.", viewProfile: "Voir le profil sur GitHub →", months: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."] },
    contact: { eyebrow: "Contact", heading: "Créons quelque chose ensemble", subtext: "Remplissez le formulaire : il s'ouvre dans votre messagerie.", name: "Nom complet", email: "Votre e-mail", message: "Message", namePh: "Jean Dupont", emailPh: "jean@entreprise.com", messagePh: "Que pouvons-nous construire ?", send: "Ouvrir ma messagerie →", or: "ou écrivez-nous à", direct: "contact@tdsm.mc" },
  },
};

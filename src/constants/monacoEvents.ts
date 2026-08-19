// ============================================================
//  Monaco events — used by the "TDSM" radar countdowns.
//  ▸▸ Update these dates once a year. No free official live API,
//     so dates are maintained here by hand. ◂◂
//
//  Confirmed from official sources (Aug 2026):
//    • Monaco Yacht Show 2026 — 23–26 Sep 2026 (monacoyachtshow.com)
//    • Rallye Monte-Carlo 2027 — 18–24 Jan 2027 (acm.mc)
//    • Monaco Grand Prix 2027  — 4–6 Jun 2027 (formula1.com / ACM)
// ============================================================

export interface MonacoEvent {
  id: string;
  icon: string;
  name: string;
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
  url: string;
}

export const monacoEvents: MonacoEvent[] = [
  {
    id: "vuelta",
    icon: "🚲",
    name: "La Vuelta",
    start: "2026-08-20",
    end: "2026-08-23",
    url: "https://lavueltamonaco.gouv.mc/",
  },
  {
    id: "yachtshow",
    icon: "🛥️",
    name: "Monaco Yacht Show",
    start: "2026-09-23",
    end: "2026-09-26",
    url: "https://www.monacoyachtshow.com/en",
  },
  {
    id: "rallye",
    icon: "🏔️",
    name: "Rallye Monte-Carlo",
    start: "2027-01-18",
    end: "2027-01-24",
    url: "https://acm.mc/en/epreuves/rallye-automobile-monte-carlo/",
  },
  {
    id: "gp",
    icon: "🏎️",
    name: "Monaco Grand Prix",
    start: "2027-06-04",
    end: "2027-06-06",
    url: "https://www.formula1.com/en/racing/2027/monaco",
  },

  // ── OPTIONAL: cycling Grand Tours rarely route through Monaco.
  // Enable + set real dates only if a given year's route passes through.
  // { id: "tdf", icon: "🚴", name: "Tour de France (Monaco stage)", start: "20XX-07-XX", end: "20XX-07-XX", url: "https://www.letour.fr/en/" },
];

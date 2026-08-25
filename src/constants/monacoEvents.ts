export interface MonacoEvent { id: string; icon: string; name: string; start: string; end: string; url: string; }
export const monacoEvents: MonacoEvent[] = [
  { id: "yachtshow", icon: "🛥️", name: "Monaco Yacht Show", start: "2026-09-23", end: "2026-09-26", url: "https://www.monacoyachtshow.com/en" },
  { id: "rallye", icon: "🏔️", name: "Rallye Monte-Carlo", start: "2027-01-18", end: "2027-01-24", url: "https://acm.mc/en/epreuves/rallye-automobile-monte-carlo/" },
  { id: "gp", icon: "🏎️", name: "Monaco Grand Prix", start: "2027-06-04", end: "2027-06-06", url: "https://www.formula1.com/en/racing/2027/monaco" },
];

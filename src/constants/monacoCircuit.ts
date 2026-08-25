export const circuitViewBox = "0 0 600 300";
export const circuitPath =
  "M 85 178 " +
  "C 112 108 165 56 236 50 " +
  "C 292 45 320 122 348 152 " +
  "C 378 184 420 140 452 122 " +
  "C 496 96 534 102 556 128 " +
  "C 572 146 560 152 549 148 " +
  "C 535 143 540 170 557 175 " +
  "C 573 179 565 194 553 203 " +
  "C 502 230 448 242 388 248 " +
  "C 312 256 236 252 168 250 " +
  "C 133 249 116 248 108 246 " +
  "C 90 244 79 229 84 211 " +
  "C 87 196 74 186 85 178 " +
  "Z";
export type CornerKey = "start" | "devote" | "beaurivage" | "casino" | "hairpin" | "portier" | "tunnel" | "rascasse";
export type StopKind = "home" | "live" | "about" | "services" | "work" | "experience" | "activity" | "contact";
export interface Corner { id: StopKind; section: string; key: CornerKey; x: number; y: number; }
export const circuitCorners: Corner[] = [
  { id: "home", section: "#home", key: "start", x: 85, y: 178 },
  { id: "live", section: "#live", key: "devote", x: 236, y: 50 },
  { id: "about", section: "#about", key: "beaurivage", x: 348, y: 152 },
  { id: "services", section: "#services", key: "casino", x: 452, y: 122 },
  { id: "work", section: "#work", key: "hairpin", x: 560, y: 158 },
  { id: "experience", section: "#experience", key: "portier", x: 553, y: 203 },
  { id: "activity", section: "#activity", key: "tunnel", x: 388, y: 248 },
  { id: "contact", section: "#contact", key: "rascasse", x: 108, y: 246 },
];
export const flavourLabels: { x: number; y: number; name: string }[] = [
  { x: 400, y: 130, name: "Massenet" }, { x: 556, y: 116, name: "Mirabeau" },
  { x: 320, y: 256, name: "Nouvelle Chicane" }, { x: 250, y: 254, name: "Tabac" },
  { x: 176, y: 252, name: "Piscine" }, { x: 78, y: 210, name: "A. Noghès" },
];
export const WIDE = { x: 38, y: 22, w: 548, h: 262 };

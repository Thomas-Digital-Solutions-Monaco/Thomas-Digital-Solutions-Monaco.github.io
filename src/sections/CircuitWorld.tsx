import { useEffect, useRef, useState } from "react";
import { circuitPath, circuitCorners, flavourLabels, WIDE } from "../constants";
import { useI18n } from "../i18n/LanguageContext";
import type { StatId, SvcId } from "../i18n/translations";
import TopDownCar from "../components/TopDownCar";
import StopContent from "../components/StopContent";
import StatPreview from "../components/StatPreview";
import ServicePreview from "../components/ServicePreview";

const N = circuitCorners.length;

// ── size knobs (tweak these) ──────────────────────────────────────────────
const FW = 190;            // camera "zoomed" width — smaller = closer zoom
const CAR_SCALE = 1.2;     // F1 car size on the track
const HALO_R = 4.5;        // red glow radius behind the car (small = clearer car)
const MOBILE_Q = "(max-width: 820px)";
// ──────────────────────────────────────────────────────────────────────────

/**
 * Per-corner gap between the CORNER pill (top) and the glass panel.
 *   • base class  = PHONE  (≤ 820px, your mobile drive mode)
 *   • dvd: class  = LAPTOP (≥ 821px)  ← requires  screens:{ dvd:"821px" }  in tailwind.config.js
 * Edit any single line to nudge just that panel, independently per device.
 */
const PANEL_PT: Record<string, string> = {
  home:       "pt-[11.5rem] dvd:pt-36",
  live:       "pt-[9.5rem]  dvd:pt-52",   // TDSM Live
  about:      "pt-[9.5rem]  dvd:pt-44",
  services:   "pt-[8.7rem]  dvd:pt-40",   // What we do (tallest)
  work:       "pt-[8.5rem]  dvd:pt-36",   // Selected work
  experience: "pt-[12.5rem] dvd:pt-56",   // Journey
  activity:   "pt-[12.5rem] dvd:pt-56",   // GitHub activity
  contact:    "pt-[10rem]   dvd:pt-44",
};

const FH = (FW * WIDE.h) / WIDE.w;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const wrap = (f: number) => ((f % 1) + 1) % 1;

const CircuitWorld = () => {
  const { t } = useI18n();
  const c = t.circuit;

  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const panelWrapRef = useRef<HTMLDivElement>(null);
  const panelScrollRef = useRef<HTMLDivElement>(null);

  const lenRef = useRef(0);
  const fracsRef = useRef<number[]>([]);
  const idxRef = useRef(0);
  const animating = useRef(false);
  const cooldown = useRef(false);
  const overviewRef = useRef(false);

  const [idx, setIdx] = useState(0);
  const [dots, setDots] = useState<{ x: number; y: number }[]>([]);
  const [hint, setHint] = useState(true);
  const [overview, setOverview] = useState(false);

  const [openStat, setOpenStat] = useState<StatId | null>(null);
  const [openSvc, setOpenSvc] = useState<SvcId | null>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  const onStat = (id: StatId, e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 }); setOpenStat(id);
  };
  const onSvc = (id: SvcId, e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 }); setOpenSvc(id);
  };

  const api = useRef<{ overviewToggle: () => void; goTo: (i: number) => void; restart: () => void }>({ overviewToggle: () => {}, goTo: () => {}, restart: () => {} });

  useEffect(() => {
    document.body.classList.add("deck-lock");
    const p = pathRef.current!;
    const L = p.getTotalLength();
    lenRef.current = L;
    if (trailRef.current) trailRef.current.style.strokeDasharray = String(L);
    const isMobile = () => window.matchMedia(MOBILE_Q).matches;

    const point = (frac: number) => p.getPointAtLength(wrap(frac) * lenRef.current);

    const setCar = (frac: number) => {
      const pt = point(frac);
      const pt2 = p.getPointAtLength(Math.min(lenRef.current, wrap(frac) * lenRef.current + 1));
      const ang = (Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180) / Math.PI;
      carRef.current?.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${ang})`);
      if (trailRef.current) trailRef.current.style.strokeDashoffset = String(lenRef.current * (1 - wrap(frac)));
    };

    // zoom: 1 = close (FW×FH around focus), 0 = WIDE (full track)
    const setViewBox = (zoom: number, focusFrac: number, stopId?: string) => {
      const b = smooth(zoom);
      const fp = point(focusFrac);
      const vx = lerp(WIDE.x, fp.x - FW / 2, b);
      const vy = lerp(WIDE.y, fp.y - FH / 2, b);
      const vw = lerp(WIDE.w, FW, b);
      const vh = lerp(WIDE.h, FH, b);
      svgRef.current?.setAttribute("viewBox", `${vx} ${vy} ${vw} ${vh}`);
      if (veilRef.current) veilRef.current.style.background = `rgba(6,7,15,${stopId === "activity" ? zoom * 0.55 : 0})`;
    };

    const setPanel = (op: number) => {
      const el = panelWrapRef.current;
      if (!el) return;
      el.style.opacity = String(op);
      el.style.transform = `translateY(${(1 - op) * 16}px) scale(${0.98 + op * 0.02})`;
      el.style.pointerEvents = op > 0.9 ? "auto" : "none";
    };

    const rest = (i: number) => { setCar(fracsRef.current[i]); setViewBox(1, fracsRef.current[i], circuitCorners[i].id); setPanel(1); };

    const SAMPLES = 900;
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i <= SAMPLES; i++) pts.push(p.getPointAtLength((i / SAMPLES) * L));
    fracsRef.current = circuitCorners.map((cn) => {
      let best = 0, bd = Infinity;
      for (let i = 0; i <= SAMPLES; i++) { const dx = pts[i].x - cn.x, dy = pts[i].y - cn.y; const d = dx * dx + dy * dy; if (d < bd) { bd = d; best = i; } }
      return best / SAMPLES;
    });
    setDots(circuitCorners.map((_, i) => point(fracsRef.current[i])));
    rest(0);

    const raf = (dur: number, onFrame: (k: number) => void, onDone?: () => void) => {
      const t0 = performance.now();
      const step = (now: number) => { const k = clamp((now - t0) / dur); onFrame(k); if (k < 1) requestAnimationFrame(step); else onDone?.(); };
      requestAnimationFrame(step);
    };

    /* ── one locked drive ──
       DESKTOP: panel out → zoom OUT to full track → drive → zoom IN → panel in
       MOBILE:  panel out → drive at the SAME zoom (camera follows) → panel in   */
    const travel = (to: number, dir: 1 | -1) => {
      if (animating.current) return;
      const from = idxRef.current;
      if (to === from) return;
      animating.current = true;
      setHint(false);
      overviewRef.current = false; setOverview(false);
      const fr = fracsRef.current;
      const dist = dir > 0 ? wrap(fr[to] - fr[from]) : wrap(fr[from] - fr[to]);
      const swap = () => { idxRef.current = to; setIdx(to); if (panelScrollRef.current) panelScrollRef.current.scrollTop = 0; };
      const finish = () => { rest(to); animating.current = false; cooldown.current = true; setTimeout(() => (cooldown.current = false), 220); };

      if (isMobile()) {
        raf(260, (k) => setPanel(1 - smooth(k)), () => {
          swap();
          const T = clamp(700 + dist * 3000, 700, 2600);
          raf(T, (k) => { const f = fr[from] + dir * dist * smooth(k); setCar(f); setViewBox(1, f); },
            () => raf(340, (k) => setPanel(smooth(k)), finish));
        });
      } else {
        raf(420, (k) => { setPanel(1 - smooth(Math.min(1, k * 1.6))); setViewBox(1 - smooth(k), fr[from], circuitCorners[from].id); }, () => {
          swap();
          const T = clamp(900 + dist * 3400, 900, 3000);
          raf(T, (k) => setCar(fr[from] + dir * dist * smooth(k)), () => {
            raf(520, (k) => { setViewBox(smooth(k), fr[to], circuitCorners[to].id); if (k > 0.5) setPanel(smooth((k - 0.5) / 0.5)); }, finish);
          });
        });
      }
    };

    const next = () => travel(idxRef.current < N - 1 ? idxRef.current + 1 : 0, 1);
    const prev = () => { if (idxRef.current > 0) travel(idxRef.current - 1, -1); };
    const restart = () => travel(0, 1);

    const goTo = (target: number) => {
      if (target === idxRef.current && !overviewRef.current) return;
      if (overviewRef.current) {
        animating.current = true; overviewRef.current = false; setOverview(false); setHint(false);
        const from = idxRef.current, fr = fracsRef.current;
        const dir: 1 | -1 = target >= from ? 1 : -1;
        const dist = dir > 0 ? wrap(fr[target] - fr[from]) : wrap(fr[from] - fr[target]);
        idxRef.current = target; setIdx(target);
        if (panelScrollRef.current) panelScrollRef.current.scrollTop = 0;
        raf(clamp(800 + dist * 2200, 800, 2400), (k) => { const f = fr[from] + dir * dist * smooth(k); setCar(f); setViewBox(smooth(k), f); },
          () => raf(300, (k) => setPanel(smooth(k)), () => { rest(target); animating.current = false; cooldown.current = true; setTimeout(() => (cooldown.current = false), 220); }));
        return;
      }
      travel(target, target > idxRef.current ? 1 : -1);
    };

    const enterOverview = () => {
      if (animating.current) return;
      animating.current = true; overviewRef.current = true; setOverview(true); setHint(false);
      const cur = idxRef.current;
      raf(600, (k) => { setPanel(1 - smooth(k)); setViewBox(1 - smooth(k), fracsRef.current[cur], circuitCorners[cur].id); }, () => (animating.current = false));
    };
    const exitOverview = () => {
      if (animating.current) return;
      animating.current = true; overviewRef.current = false; setOverview(false);
      const cur = idxRef.current;
      raf(600, (k) => { setPanel(smooth(k)); setViewBox(smooth(k), fracsRef.current[cur], circuitCorners[cur].id); }, () => { animating.current = false; cooldown.current = true; setTimeout(() => (cooldown.current = false), 220); });
    };
    const overviewToggle = () => (overviewRef.current ? exitOverview() : enterOverview());

    api.current = { overviewToggle, goTo, restart };

    const panelCanScroll = (dir: 1 | -1) => {
      const el = panelScrollRef.current;
      if (!el) return false;
      return dir > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 2 : el.scrollTop > 2;
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 8) return;
      if (overviewRef.current) { e.preventDefault(); if (!animating.current) exitOverview(); return; }
      if (animating.current || cooldown.current) { e.preventDefault(); return; }
      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      if (panelCanScroll(dir)) return;
      e.preventDefault();
      dir > 0 ? next() : prev();
    };
    window.addEventListener("wheel", onWheel, { passive: false });

    let sy = 0, sx = 0;
    const onTS = (e: TouchEvent) => { sy = e.touches[0].clientY; sx = e.touches[0].clientX; };
    const onTE = (e: TouchEvent) => {
      if (overviewRef.current) { if (!animating.current) exitOverview(); return; }
      if (animating.current || cooldown.current) return;
      const dy = sy - e.changedTouches[0].clientY, dx = sx - e.changedTouches[0].clientX;
      if (Math.abs(dy) < 45 || Math.abs(dy) < Math.abs(dx)) return;
      const dir: 1 | -1 = dy > 0 ? 1 : -1;
      if (panelCanScroll(dir)) return;
      dir > 0 ? next() : prev();
    };
    window.addEventListener("touchstart", onTS, { passive: true });
    window.addEventListener("touchend", onTE, { passive: true });

    const onKey = (e: KeyboardEvent) => {
      if (overviewRef.current) { if (["ArrowDown","ArrowUp","PageDown","PageUp"," ","Escape"].includes(e.key)) { e.preventDefault(); if (!animating.current) exitOverview(); } return; }
      if (animating.current || cooldown.current) return;
      if (["ArrowDown","PageDown"," "].includes(e.key)) { e.preventDefault(); next(); }
      else if (["ArrowUp","PageUp"].includes(e.key)) { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", onKey);

    const onAnchor = (e: Event) => {
      const el = (e.target as HTMLElement).closest("a[href^='#']");
      if (!el) return;
      const id = el.getAttribute("href")!.slice(1);
      const stop = circuitCorners.findIndex((cn) => cn.id === id);
      if (stop >= 0) { e.preventDefault(); goTo(stop); }
    };
    document.addEventListener("click", onAnchor);

    const onResize = () => { lenRef.current = p.getTotalLength(); if (overviewRef.current) setViewBox(0, fracsRef.current[idxRef.current]); else rest(idxRef.current); };
    window.addEventListener("resize", onResize);

    return () => {
      document.body.classList.remove("deck-lock");
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTS);
      window.removeEventListener("touchend", onTE);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onAnchor);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cornerName = c.corners[circuitCorners[idx].key];
  const panelPt = PANEL_PT[circuitCorners[idx].id] ?? "pt-[4.5rem] dvd:pt-24";

  return (
    <div className="fixed inset-0 overflow-hidden stage-ground" onClick={(e) => { if (overviewRef.current && !(e.target as HTMLElement).closest("circle,a,button")) api.current.overviewToggle(); }}>
      <svg ref={svgRef} viewBox={`${WIDE.x} ${WIDE.y} ${WIDE.w} ${WIDE.h}`} preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full">
        <defs>
          <filter id="carGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.1" floodColor="#d81e2c" floodOpacity="0.8" />
          </filter>
        </defs>

        <path d={circuitPath} fill="none" stroke="rgb(var(--line))" strokeWidth="11" strokeLinejoin="round" strokeLinecap="round" />
        <path d={circuitPath} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1" strokeLinecap="round" strokeDasharray="4 8" />
        <path ref={trailRef} d={circuitPath} fill="none" stroke="rgb(var(--brand))" strokeWidth="11" strokeLinejoin="round" strokeLinecap="round" />
        <path ref={pathRef} d={circuitPath} fill="none" stroke="none" />

        {dots[0] && <rect x={dots[0].x - 2.5} y={dots[0].y - 13} width="5" height="26" fill="rgb(var(--ink))" opacity="0.55" />}
        {flavourLabels.map((l) => (<text key={l.name} x={l.x} y={l.y - 7} textAnchor="middle" fontSize="6.5" fontWeight="600" fill="rgb(var(--mist))" opacity="0.5">{l.name}</text>))}
        {dots.map((d, i) => {
          const isActive = i === idx;
          return (
            <g key={i}>
              <text x={d.x} y={d.y - 13} textAnchor="middle" fontSize={isActive ? 9 : 7} fontWeight="800" fill="rgb(var(--brand))" opacity={isActive ? 1 : 0.55} style={{ transition: "opacity .3s, font-size .3s" }}>{c.corners[circuitCorners[i].key]}</text>
              <circle cx={d.x} cy={d.y} r={isActive ? 7 : 5.5} fill={isActive ? "rgb(var(--brand))" : "rgb(var(--panel))"} stroke="rgb(var(--brand))" strokeWidth="2.5" style={{ cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); api.current.goTo(i); }}>
                <title>{c.corners[circuitCorners[i].key]}</title>
              </circle>
            </g>
          );
        })}

        {/* car — small halo so the F1 shape stays readable */}
        <g ref={carRef}>
          <circle r={HALO_R} className="car-glow" fill="#d81e2c" opacity="0.25" />
          <g filter="url(#carGlow)"><TopDownCar scale={CAR_SCALE} /></g>
        </g>
      </svg>

      <div ref={veilRef} className="pointer-events-none absolute inset-0 transition-colors" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/55 via-paper/15 to-paper/65 dark:from-[#0b0d17]/70 dark:via-transparent dark:to-[#0f1015]/78" />

      {/* HUD */}
      <div className="pointer-events-none absolute inset-x-0 top-20 z-30 flex justify-center px-4 dvd:top-24">
        <div className="flex max-w-[70vw] items-center gap-2.5 rounded-full border border-line bg-panel/85 px-4 py-2 text-xs shadow-soft backdrop-blur-md">
          <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wide text-brand"><span className="live-dot h-1.5 w-1.5 rounded-full bg-brand" />{c.hud} {idx + 1}/{N}</span>
          <span className="truncate font-semibold text-ink">{cornerName}</span>
        </div>
      </div>

      {/* Full-track button */}
      <div className="absolute right-4 top-20 z-30 dvd:right-6 dvd:top-24">
        <button onClick={() => api.current.overviewToggle()} className="inline-flex items-center rounded-full border border-line bg-panel/85 px-3 py-2.5 text-sm font-semibold text-ink shadow-soft backdrop-blur-md transition-colors hover:border-brand hover:text-brand">
          <span aria-hidden>{overview ? "↩" : "⤢"}</span>
        </button>
      </div>

      {/* stop panel — per-corner top padding via PANEL_PT (phone base / dvd: laptop) */}
      <div ref={panelWrapRef} className={`absolute inset-0 z-20 flex items-start justify-center px-4 pb-6 ${panelPt}`} style={{ opacity: 0 }}>
        <div className="w-full max-w-2xl">
          <div className="rounded-3xl border border-line bg-panel/85 p-5 shadow-glow backdrop-blur-md dvd:p-7">
            <div ref={panelScrollRef} className="max-h-[68vh] overflow-y-auto px-1 dvd:max-h-[70vh]">
              <StopContent kind={circuitCorners[idx].id} onStat={onStat} onSvc={onSvc} onRestart={() => api.current.restart()} />
            </div>
          </div>
        </div>
      </div>

      {overview && (
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex justify-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/85 px-4 py-2 text-sm font-semibold text-brand shadow-soft backdrop-blur-md">
            <span className="live-dot h-2 w-2 rounded-full bg-brand" />{c.resume}
          </p>
        </div>
      )}

      {hint && !overview && (
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex justify-center px-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/85 px-4 py-2 text-sm font-semibold text-brand shadow-soft backdrop-blur-md">
            <span className="live-dot h-2 w-2 rounded-full bg-brand" />{c.hint} ↓
          </p>
        </div>
      )}

      <StatPreview stat={openStat} origin={origin} onClose={() => setOpenStat(null)} />
      <ServicePreview svc={openSvc} origin={origin} onClose={() => setOpenSvc(null)} />
    </div>
  );
};

export default CircuitWorld;

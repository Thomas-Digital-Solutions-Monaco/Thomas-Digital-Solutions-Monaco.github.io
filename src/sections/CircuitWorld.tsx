import { useEffect, useRef, useState } from "react";
import { circuitPath, circuitCorners, flavourLabels, WIDE } from "../constants";
import { useI18n } from "../i18n/LanguageContext";
import type { StatId, SvcId } from "../i18n/translations";
import TopDownCar from "../components/TopDownCar";
import StopContent from "../components/StopContent";
import StatPreview from "../components/StatPreview";
import ServicePreview from "../components/ServicePreview";

const N = circuitCorners.length;
const WORK = circuitCorners.findIndex((c) => c.id === "work");
const FW = 190;
const FH = (FW * WIDE.h) / WIDE.w;
const CAR_SCALE = 1.5; // bigger so the F1 silhouette reads clearly

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
  const workScrollRef = useRef<HTMLDivElement>(null);

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

    const point = (frac: number) => p.getPointAtLength(wrap(frac) * lenRef.current);

    const setCar = (frac: number) => {
      const pt = point(frac);
      const pt2 = p.getPointAtLength(Math.min(lenRef.current, wrap(frac) * lenRef.current + 1));
      const ang = (Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180) / Math.PI;
      carRef.current?.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${ang})`);
      if (trailRef.current) trailRef.current.style.strokeDashoffset = String(lenRef.current * (1 - wrap(frac)));
    };

    const setCamera = (zoom: number, focusFrac: number, stopId?: string) => {
      const b = smooth(zoom);
      const fp = point(focusFrac);
      const vx = lerp(WIDE.x, fp.x - FW / 2, b);
      const vy = lerp(WIDE.y, fp.y - FH / 2, b);
      const vw = lerp(WIDE.w, FW, b);
      const vh = lerp(WIDE.h, FH, b);
      svgRef.current?.setAttribute("viewBox", `${vx} ${vy} ${vw} ${vh}`);
      if (panelWrapRef.current) {
        panelWrapRef.current.style.opacity = String(zoom);
        panelWrapRef.current.style.transform = `translateY(${(1 - zoom) * 20}px) scale(${0.97 + zoom * 0.03})`;
        panelWrapRef.current.style.pointerEvents = zoom > 0.9 ? "auto" : "none";
      }
      if (veilRef.current) veilRef.current.style.background = `rgba(6,7,15,${stopId === "activity" ? zoom * 0.55 : 0})`;
    };

    const rest = (i: number) => { setCar(fracsRef.current[i]); setCamera(1, fracsRef.current[i], circuitCorners[i].id); };

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

    const travel = (to: number, dir: 1 | -1, skipOut = false) => {
      if (animating.current) return;
      const from = idxRef.current;
      animating.current = true;
      setHint(false);
      overviewRef.current = false; setOverview(false);
      const fr = fracsRef.current;
      const dist = to === from ? 0 : dir > 0 ? wrap(fr[to] - fr[from]) : wrap(fr[from] - fr[to]);
      const T_OUT = skipOut ? 0 : 420;
      const T_TRAVEL = to === from ? 0 : clamp(900 + dist * 4200, 900, 3200);
      const T_IN = 560;
      const total = T_OUT + T_TRAVEL + T_IN;
      const t0 = performance.now();
      let swapped = false;
      const step = (now: number) => {
        const e = now - t0;
        if (e < T_OUT) { setCar(fr[from]); setCamera(1 - e / T_OUT, fr[from], circuitCorners[from].id); }
        else if (e < T_OUT + T_TRAVEL) { if (!swapped) { swapped = true; idxRef.current = to; setIdx(to); } setCar(fr[from] + dir * dist * smooth((e - T_OUT) / T_TRAVEL)); setCamera(0, fr[to]); }
        else if (e < total) { setCar(fr[to]); setCamera(smooth((e - T_OUT - T_TRAVEL) / T_IN), fr[to], circuitCorners[to].id); }
        else { idxRef.current = to; setIdx(to); rest(to); animating.current = false; cooldown.current = true; setTimeout(() => (cooldown.current = false), 240); return; }
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const next = () => travel(idxRef.current < N - 1 ? idxRef.current + 1 : 0, 1);
    const prev = () => { if (idxRef.current > 0) travel(idxRef.current - 1, -1); };
    const goTo = (target: number) => {
      if (overviewRef.current) { travel(target, target >= idxRef.current ? 1 : -1, true); return; }
      if (target !== idxRef.current) travel(target, target > idxRef.current ? 1 : -1);
    };
    const restart = () => travel(0, 1);

    const enterOverview = () => {
      if (animating.current) return;
      animating.current = true;
      overviewRef.current = true; setOverview(true); setHint(false);
      const cur = idxRef.current, t0 = performance.now(), D = 620;
      const run = (now: number) => { const k = smooth(clamp((now - t0) / D)); setCamera(1 - k, fracsRef.current[cur], circuitCorners[cur].id); if (k < 1) requestAnimationFrame(run); else animating.current = false; };
      requestAnimationFrame(run);
    };
    const exitOverview = () => {
      if (animating.current) return;
      animating.current = true;
      overviewRef.current = false; setOverview(false);
      const cur = idxRef.current, t0 = performance.now(), D = 620;
      const run = (now: number) => { const k = smooth(clamp((now - t0) / D)); setCamera(k, fracsRef.current[cur], circuitCorners[cur].id); if (k < 1) requestAnimationFrame(run); else { animating.current = false; cooldown.current = true; setTimeout(() => (cooldown.current = false), 200); } };
      requestAnimationFrame(run);
    };
    const overviewToggle = () => (overviewRef.current ? exitOverview() : enterOverview());

    api.current = { overviewToggle, goTo, restart };

    const workCanScroll = (dir: 1 | -1) => {
      if (idxRef.current !== WORK || !workScrollRef.current) return false;
      const el = workScrollRef.current;
      return dir > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 2 : el.scrollTop > 2;
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 8) return;
      if (overviewRef.current) { e.preventDefault(); if (!animating.current) exitOverview(); return; }
      if (animating.current || cooldown.current) { e.preventDefault(); return; }
      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      if (workCanScroll(dir)) return;
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
      if (workCanScroll(dir)) return;
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

    const onResize = () => { lenRef.current = p.getTotalLength(); if (overviewRef.current) setCamera(0, fracsRef.current[idxRef.current]); else rest(idxRef.current); };
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
  const isWork = idx === WORK;

  return (
    <div className="fixed inset-0 overflow-hidden stage-ground" onClick={(e) => { if (overviewRef.current && !(e.target as HTMLElement).closest("circle,a,button")) api.current.overviewToggle(); }}>
      <svg ref={svgRef} viewBox={`${WIDE.x} ${WIDE.y} ${WIDE.w} ${WIDE.h}`} preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full">
        <defs>
          <filter id="carGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.4" floodColor="#d81e2c" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* asphalt base */}
        <path d={circuitPath} fill="none" stroke="rgb(var(--line))" strokeWidth="11" strokeLinejoin="round" strokeLinecap="round" />
        {/* white kerb edges (both sides) */}
        <path d={circuitPath} fill="none" stroke="#f4f4f8" strokeOpacity="0.55" strokeWidth="12.6" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="0.5 6" />
        {/* dashed white centre line (racing markings) */}
        <path d={circuitPath} fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="1" strokeLinecap="round" strokeDasharray="4 7" />
        {/* travelled red racing line */}
        <path ref={trailRef} d={circuitPath} fill="none" stroke="rgb(var(--brand))" strokeWidth="11" strokeLinejoin="round" strokeLinecap="round" />
        {/* measuring ref (invisible, exact geometry) */}
        <path ref={pathRef} d={circuitPath} fill="none" stroke="none" />

        {/* start/finish line */}
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

        {/* the car — glowing halo behind + detailed F1 on top */}
        <g ref={carRef}>
          <circle r={11 * CAR_SCALE} className="car-glow" fill="#d81e2c" opacity="0.22" />
          <g filter="url(#carGlow)"><TopDownCar scale={CAR_SCALE} /></g>
        </g>
      </svg>

      <div ref={veilRef} className="pointer-events-none absolute inset-0 transition-colors" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/55 via-paper/15 to-paper/65 dark:from-[#0b0d17]/70 dark:via-transparent dark:to-[#0f1015]/78" />

      <div className="pointer-events-none absolute inset-x-0 top-24 z-30 flex justify-center px-4 sm:top-28">
        <div className="flex max-w-[92vw] items-center gap-2.5 rounded-full border border-line bg-panel/85 px-4 py-2 text-xs shadow-soft backdrop-blur-md">
          <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wide text-brand"><span className="live-dot h-1.5 w-1.5 rounded-full bg-brand" />{c.hud} {idx + 1}/{N}</span>
          <span className="truncate font-semibold text-ink">{cornerName}</span>
        </div>
      </div>

      <div className="absolute right-4 top-24 z-30 sm:right-6 sm:top-28">
        <button onClick={() => api.current.overviewToggle()} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-panel/85 px-3 py-2 text-xs font-semibold text-ink shadow-soft backdrop-blur-md transition-colors hover:border-brand hover:text-brand" title={c.overview}>
          <span aria-hidden>{overview ? "↩" : "⤢"}</span><span className="hidden sm:inline">{c.overview}</span>
        </button>
      </div>

      <div ref={panelWrapRef} className="absolute inset-0 z-20 flex items-center px-4 pb-10 pt-40 sm:pt-44" style={{ opacity: 0 }}>
        <div className="mx-auto w-full max-w-2xl">
          <div className="rounded-3xl border border-line bg-panel/85 p-6 shadow-glow backdrop-blur-md sm:p-7">
            {isWork ? (
              <div ref={workScrollRef} className="max-h-[62vh] overflow-y-auto pr-1">
                <StopContent kind="work" onStat={onStat} onSvc={onSvc} onRestart={() => api.current.restart()} />
              </div>
            ) : (
              <StopContent kind={circuitCorners[idx].id} onStat={onStat} onSvc={onSvc} onRestart={() => api.current.restart()} />
            )}
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
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex flex-col items-center gap-2 px-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/85 px-4 py-2 text-sm font-semibold text-brand shadow-soft backdrop-blur-md">
            <span className="live-dot h-2 w-2 rounded-full bg-brand" />{c.hint} ↓
          </p>
          <p className="rounded-full bg-panel/70 px-3 py-1 text-[11px] text-mist backdrop-blur-md">{c.jump}</p>
        </div>
      )}

      <StatPreview stat={openStat} origin={origin} onClose={() => setOpenStat(null)} />
      <ServicePreview svc={openSvc} origin={origin} onClose={() => setOpenSvc(null)} />
    </div>
  );
};

export default CircuitWorld;

import { useEffect, useState, type FormEvent } from "react";
import { company, techLogos } from "../constants";
import type { StopKind } from "../constants";
import { useI18n } from "../i18n/LanguageContext";
import type { StatId, SvcId } from "../i18n/translations";
import ServiceIcon from "./ServiceIcon";
import StoreBadge from "./StoreBadge";
import GitHubHeatmap from "./GitHubHeatmap";
import RadarPanel from "./RadarPanel";

type Btn = React.MouseEvent<HTMLButtonElement>;
interface Props { kind: StopKind; onStat: (id: StatId, e: Btn) => void; onSvc: (id: SvcId, e: Btn) => void; onRestart: () => void; }

const StopContent = ({ kind, onStat, onSvc, onRestart }: Props) => {
  const { t } = useI18n();

  const [wi, setWi] = useState(0);
  const words = t.hero.words;
  useEffect(() => {
    if (kind !== "home") return;
    const id = setInterval(() => setWi((i) => (i + 1) % words.length), 5000);
    return () => clearInterval(id);
  }, [kind, words]);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `New enquiry from ${form.name || "your website"}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}\n`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  const field = "rounded-lg border border-line bg-cream px-3 py-2 text-sm text-ink outline-none focus:border-brand";

  if (kind === "home")
    return (
      <div>
        <p className="eyebrow mb-3"><span className="h-2 w-2 rounded-full bg-brand" />{company.location} · {t.hero.badge}</p>
        <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          <span className="block">{t.hero.lead}</span>
          <span className="block h-[1.15em] overflow-hidden"><span key={wi} className="word-swap inline-block whitespace-nowrap gradient-text">{words[wi]}</span></span>
          <span className="block">{t.hero.tail}</span>
        </h1>
        <p className="subtext mt-4 max-w-md">{t.hero.subtext}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="#contact" className="btn btn-primary">{t.hero.ctaPrimary}</a>
          <a href="#work" className="btn btn-ghost">{t.hero.ctaSecondary}</a>
        </div>
      </div>
    );

  if (kind === "live") return <RadarPanel onStat={onStat} />;

  if (kind === "about") {
    const a = t.about;
    return (
      <div className="space-y-5">
        <div>
          <p className="eyebrow mb-3">{a.eyebrow}</p>
          <h2 className="heading max-w-xl">{a.headA}<span className="text-brand">{a.acc1}</span>{a.mid}<span className="text-brand2">{a.acc2}</span>{a.end}</h2>
          <p className="subtext mt-3 max-w-lg">{a.subtext}</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {a.stats.map((s) => (
            <button key={s.id} onClick={(e) => onStat(s.id, e)} className="card cursor-pointer p-3 text-center hover:border-brand/60">
              <p className="text-3xl font-extrabold gradient-text">{s.value}</p><p className="mt-1 text-[11px] leading-tight text-mist">{s.label}</p>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
          {techLogos.map((tech) => (<img key={tech.name} src={tech.url} alt={tech.name} title={tech.name} loading="lazy" className="tech-logo h-6 w-6" onError={(e) => (e.currentTarget.style.visibility = "hidden")} />))}
        </div>
      </div>
    );
  }

  if (kind === "services")
    return (
      <div>
        <p className="eyebrow mb-3">{t.services.eyebrow}</p>
        <h2 className="heading max-w-xl">{t.services.heading}</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {t.services.items.map((s) => (
            <button key={s.id} onClick={(e) => onSvc(s.id, e)} className="card group cursor-pointer p-3.5 text-left hover:border-brand/60">
              <span className="mb-2 grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white"><ServiceIcon id={s.id} className="h-5 w-5" /></span>
              <h3 className="text-sm font-semibold text-ink">{s.title}</h3>
              <p className="mt-1 text-xs leading-snug text-mist">{s.desc}</p>
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-mist">{t.services.hint}</p>
      </div>
    );

  if (kind === "work")
    return (
      <div>
        <p className="eyebrow mb-3">{t.work.eyebrow}</p>
        <h2 className="heading">{t.work.heading}</h2>
        <div className="mt-4 space-y-3">
          {t.work.items.map((p) => (
            <div key={p.name} className="card flex items-center gap-3 p-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-xl font-black text-white" style={{ backgroundColor: p.accent }}>{p.name.charAt(0)}</span>
              <div className="min-w-0">
                <p className="font-bold text-ink">{p.name} <span className="text-xs font-medium text-mist">· {p.tagline}</span></p>
                <p className="text-xs text-mist">{p.desc}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">{p.platforms.map((pl) => <StoreBadge key={pl} platform={pl} comingSoon={t.work.comingSoon} />)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  if (kind === "experience")
    return (
      <div>
        <p className="eyebrow mb-3">{t.experience.eyebrow}</p>
        <h2 className="heading">{t.experience.heading}</h2>
        <div className="mt-4 border-l-2 border-line pl-5">
          {t.experience.items.map((e, i) => (
            <div key={i} className="relative pb-2 last:pb-0">
              <span className="absolute -left-[27px] top-1 h-3.5 w-3.5 rounded-full bg-brand ring-4 ring-panel" />
              <p className="text-sm font-semibold text-brand">{e.year}</p>
              <h3 className="mt-0.5 font-semibold text-ink">{e.role} <span className="text-mist">· {e.place}</span></h3>
              <p className="mt-1 text-sm text-mist">{e.text}</p>
            </div>
          ))}
        </div>
      </div>
    );

  if (kind === "activity")
    return (
      <div>
        <p className="eyebrow mb-3">{t.activity.eyebrow}</p>
        <h2 className="heading">{t.activity.heading}</h2>
        <div className="mt-4 card p-4"><GitHubHeatmap /></div>
      </div>
    );

  return (
    <div>
      <p className="eyebrow mb-3">{t.contact.eyebrow}</p>
      <h2 className="heading">{t.contact.heading}</h2>
      <p className="subtext mt-2">{t.contact.subtext}</p>
      <form onSubmit={submit} className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input name="name" value={form.name} onChange={change} required placeholder={t.contact.namePh} className={field} />
        <input name="email" type="email" value={form.email} onChange={change} required placeholder={t.contact.emailPh} className={field} />
        <textarea name="message" value={form.message} onChange={change} required rows={3} placeholder={t.contact.messagePh} className={`${field} sm:col-span-2 resize-none`} />
        <button type="submit" className="btn btn-primary sm:col-span-2">{t.contact.send}</button>
      </form>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-mist">{t.contact.or} <a href={`mailto:${company.email}`} className="font-semibold text-brand hover:underline">{t.contact.direct}</a></p>
        <button onClick={onRestart} className="btn btn-ghost px-3 py-2 text-xs">{t.circuit.restart}</button>
      </div>
    </div>
  );
};

export default StopContent;

import { useI18n } from "../i18n/LanguageContext";
import { platformsList } from "../constants";
import type { StatId } from "../i18n/translations";
import Modal from "./Modal";
import GitHubHeatmap from "./GitHubHeatmap";
const StatPreview = ({ stat, origin, onClose }: { stat: StatId | null; origin: { x: number; y: number } | null; onClose: () => void; }) => {
  const { t } = useI18n(); const p = t.about.previews;
  const title = stat === "apps" ? p.appsTitle : stat === "experience" ? p.experienceTitle : stat === "platforms" ? p.platformsTitle : p.githubTitle;
  return (
    <Modal open={stat !== null} onClose={onClose} title={title} closeLabel={p.close} origin={origin}>
      {stat === "apps" && (<div className="space-y-3"><p className="text-sm text-mist">{p.appsHint}</p>{t.work.items.map((proj) => (<div key={proj.name} className="flex items-center gap-3 rounded-xl border border-line bg-cream p-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-lg font-black text-white" style={{ backgroundColor: proj.accent }}>{proj.name.charAt(0)}</span><div><p className="font-semibold text-ink">{proj.name}</p><p className="text-sm text-mist">{proj.tagline}</p></div><span className="ml-auto text-xs uppercase text-brand">{proj.platforms.join(" · ")}</span></div>))}</div>)}
      {stat === "experience" && (<div>{t.experience.items.map((e, i) => (<div key={i} className="flex gap-3"><div className="flex flex-col items-center"><span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-brand" />{i < t.experience.items.length - 1 && <span className="w-0.5 flex-1 bg-line" />}</div><div className="flex-1 pb-6"><p className="text-sm font-semibold text-brand">{e.year}</p><p className="font-semibold text-ink">{e.role} <span className="text-mist">· {e.place}</span></p><p className="mt-1 text-sm text-mist">{e.text}</p></div></div>))}</div>)}
      {stat === "platforms" && (<div className="grid grid-cols-2 gap-3">{platformsList.map((pl) => { const count = t.work.items.filter((proj) => proj.platforms.includes(pl.id as never)).length; return (<div key={pl.id} className="rounded-xl border border-line bg-cream p-4"><p className="font-semibold text-ink">{pl.name}</p><p className="text-xs text-mist">{pl.note}</p><p className="mt-2 text-xs font-semibold text-brand">{count} {count === 1 ? "app" : "apps"}</p></div>); })}</div>)}
      {stat === "github" && (<div className="space-y-3"><p className="text-sm text-mist">{p.githubHint}</p><GitHubHeatmap /></div>)}
    </Modal>
  );
};
export default StatPreview;

import { useI18n } from "../i18n/LanguageContext";
import type { SvcId } from "../i18n/translations";
import Modal from "./Modal";
import ServiceIcon from "./ServiceIcon";
const ServicePreview = ({ svc, origin, onClose }: { svc: SvcId | null; origin: { x: number; y: number } | null; onClose: () => void; }) => {
  const { t } = useI18n(); const item = t.services.items.find((s) => s.id === svc);
  return (
    <Modal open={svc !== null} onClose={onClose} title={item?.title ?? ""} closeLabel={t.services.close} origin={origin}>
      {item && (<div className="space-y-4"><div className="flex items-center gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand"><ServiceIcon id={item.id} className="h-6 w-6" /></span><p className="text-sm font-medium text-mist">{item.desc}</p></div><p className="text-sm leading-relaxed text-ink">{item.detail}</p><ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">{item.points.map((pt) => (<li key={pt} className="flex items-start gap-2 text-sm text-mist"><span className="mt-0.5 text-brand">✓</span><span>{pt}</span></li>))}</ul><a href="#contact" onClick={onClose} className="btn btn-primary w-full">{t.services.cta}</a></div>)}
    </Modal>
  );
};
export default ServicePreview;

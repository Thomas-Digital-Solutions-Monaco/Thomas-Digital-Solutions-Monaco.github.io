import { useEffect, type ReactNode } from "react";

const Modal = ({
  open,
  onClose,
  title,
  closeLabel,
  origin,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  closeLabel: string;
  origin?: { x: number; y: number } | null;
  children: ReactNode;
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const style =
    origin && typeof window !== "undefined"
      ? ({
          ["--ox" as string]: `${(origin.x / window.innerWidth) * 100}%`,
          ["--oy" as string]: `${(origin.y / window.innerHeight) * 100}%`,
        } as React.CSSProperties)
      : undefined;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div style={style} className="modal-pop relative z-10 w-full max-w-lg rounded-2xl border border-line bg-panel p-6 shadow-glow">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-ink">{title}</h3>
          <button
            onClick={onClose}
            aria-label={closeLabel}
            className="grid h-8 w-8 place-items-center rounded-lg border border-line text-mist transition-colors hover:border-brand hover:text-brand"
          >
            ✕
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto px-1">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

import { company, socials } from "../constants";
import { useI18n } from "../i18n/LanguageContext";

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="border-t border-line bg-cream">
      <div className="section flex flex-col items-center justify-between gap-6 py-10 sm:flex-row sm:items-end">
        {/* left: copyright + horizontal logo */}
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <p className="text-sm text-mist">
            © {new Date().getFullYear()} {company.name}. {t.footer.rights}
          </p>

          {/* ── HORIZONTAL LOGO: drop your wide logo at public/logo-horizontal.png ──
              Your source is 1672×941. Displayed responsively up to ~64px tall
              (h-12 on mobile, h-16 on larger screens); width scales automatically.
              A dashed placeholder shows until you add the file. */}
          <img
            src="/logo-horizontal.png"
            alt={`${company.name} logo`}
            className="h-12 w-auto sm:h-16"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fb = e.currentTarget
                .nextElementSibling as HTMLElement | null;
              if (fb) fb.style.display = "inline-flex";
            }}
          />
          <span
            className="h-12 items-center rounded-lg border border-dashed border-line px-4 text-[11px] uppercase tracking-wider text-mist sm:h-16"
            style={{ display: "none" }}
          >
            {company.short} · horizontal logo
          </span>
        </div>

        {/* right: social links */}
        <div className="flex gap-6">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-mist transition-colors hover:text-brand"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

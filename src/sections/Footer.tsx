import { company, socials } from "../constants";
import { useI18n } from "../i18n/LanguageContext";

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="border-t border-line bg-cream">
      <div className="section flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
        <p className="text-sm text-mist">
          © {new Date().getFullYear()} {company.name}. {t.footer.rights}
        </p>
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

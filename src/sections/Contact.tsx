import { useState, type FormEvent } from "react";
import { company } from "../constants";
import { useI18n } from "../i18n/LanguageContext";

/**
 * Contact form with NO backend and NO third-party service.
 * On submit it builds a mailto: link and opens the visitor's own email app
 * (Outlook, Gmail, Apple Mail…) with the subject and body pre-filled.
 */
const Contact = () => {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `New enquiry from ${form.name || "your website"}`;
    const body =
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n\n` +
      `${form.message}\n`;
    const href =
      `mailto:${company.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
    // Opens the user's default email client.
    window.location.href = href;
  };

  const field = "rounded-xl border border-line bg-cream px-4 py-3 text-ink outline-none focus:border-brand";

  return (
    <section id="contact" data-snap className="section py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="eyebrow mb-4 justify-center">{t.contact.eyebrow}</p>
          <h2 className="heading">{t.contact.heading}</h2>
          <p className="subtext mt-4">{t.contact.subtext}</p>
        </div>

        <form onSubmit={onSubmit} className="card mt-10 flex flex-col gap-5 p-8">
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium">{t.contact.name}</span>
            <input name="name" value={form.name} onChange={onChange} required placeholder={t.contact.namePh} className={field} />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium">{t.contact.email}</span>
            <input name="email" type="email" value={form.email} onChange={onChange} required placeholder={t.contact.emailPh} className={field} />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium">{t.contact.message}</span>
            <textarea name="message" value={form.message} onChange={onChange} required rows={5} placeholder={t.contact.messagePh} className={`${field} resize-none`} />
          </label>

          <button type="submit" className="btn btn-primary w-full">
            {t.contact.send}
          </button>

          <p className="text-center text-xs text-mist">{t.contact.note}</p>
          <p className="text-center text-sm text-mist">
            {t.contact.or}{" "}
            <a href={`mailto:${company.email}`} className="font-semibold text-brand hover:underline">
              {t.contact.direct}
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Contact;

import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { company } from "../constants";
import { useI18n } from "../i18n/LanguageContext";

type Status = "idle" | "sending" | "sent" | "error";

const Contact = () => {
  const { t } = useI18n();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const serviceId = import.meta.env.VITE_APP_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.info("[TDSM] EmailJS not configured — form data:", form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      return;
    }
    try {
      await emailjs.send(
        serviceId,
        templateId,
        { from_name: form.name, to_name: company.short, from_email: form.email, to_email: company.email, message: form.message },
        publicKey
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
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

        <form ref={formRef} onSubmit={onSubmit} className="card mt-10 flex flex-col gap-5 p-8">
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
          <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-60">
            {status === "sending" ? t.contact.sending : t.contact.send}
          </button>
          {status === "sent" && <p className="text-center text-sm text-brand">{t.contact.sent}</p>}
          {status === "error" && <p className="text-center text-sm text-red-600">{t.contact.error} {company.email}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;

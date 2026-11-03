import React, { useState } from "react";
import { MailIcon } from "lucide-react";
import { contactInfo } from "../data/contact";

/**
 * Kontaktformulär. Just nu använder det en mailto-fallback så inget
 * backend-stöd behövs. När CMS/SMTP är på plats bytt action till
 * /api/contact eller motsvarande endpoint.
 */
const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Namn: ${name}\nE-post: ${email}\n\n${message}`;
    const mailto = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject || "Fråga till klubben")}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const inputStyle: React.CSSProperties = {
    background: "#fff",
    border: "1px solid var(--border, #e2e8f0)",
    borderRadius: "var(--radius, 10px)",
    color: "var(--ink-2, #0f172b)",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      aria-label="Kontaktformulär"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "var(--slate, #62748e)" }}>
            Namn
          </span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent,#3774a3)] focus-visible:ring-offset-0"
            style={inputStyle}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "var(--slate, #62748e)" }}>
            E-post
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent,#3774a3)] focus-visible:ring-offset-0"
            style={inputStyle}
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "var(--slate, #62748e)" }}>
          Ämne
        </span>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent,#3774a3)] focus-visible:ring-offset-0"
          style={inputStyle}
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "var(--slate, #62748e)" }}>
          Meddelande
        </span>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="px-4 py-3 text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent,#3774a3)] focus-visible:ring-offset-0 resize-y"
          style={inputStyle}
        />
      </label>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-2">
        <p className="text-xs" style={{ color: "var(--slate, #62748e)" }}>
          Formuläret öppnar din e-postklient med meddelandet ifyllt.
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent,#3774a3)] focus-visible:ring-offset-2"
          style={{
            background: "var(--accent, #3774a3)",
            boxShadow: "var(--shadow-card, 0 1px 3px rgba(2,6,23,0.06), 0 8px 24px rgba(2,6,23,0.07))",
          }}
        >
          <MailIcon size={16} strokeWidth={1.8} />
          Skicka meddelande
        </button>
      </div>
    </form>
  );
};

export default ContactForm;

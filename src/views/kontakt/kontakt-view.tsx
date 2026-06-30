import React from "react";
import { contactInfo as localContact } from "../../data/contact";
import { useContactInfo, useGlobalLivePreview } from "../../hooks/useCMS";

const KontaktView: React.FC = () => {
  const { data: cmsContact } = useContactInfo(localContact);
  const liveContact = useGlobalLivePreview(cmsContact);
  const contactInfo = {
    ...localContact,
    email: liveContact.email ?? localContact.email,
    facebook: liveContact.facebook?.url ? liveContact.facebook : localContact.facebook,
    youtube: liveContact.youtube?.url ? liveContact.youtube : localContact.youtube,
    radioFrequencies: liveContact.radioFrequencies?.length ? liveContact.radioFrequencies : localContact.radioFrequencies,
    emergencyContacts: liveContact.emergencyContacts?.length ? liveContact.emergencyContacts : localContact.emergencyContacts,
  };

  return (
    <div className="w-full">
      <section className="max-w-[900px] mx-auto px-4 md:px-14 pt-16 md:pt-24 pb-8">
        <p className="font-serif italic text-lg" style={{ color: "var(--slate, #62748e)" }}>Kontakt</p>
        <h1
          className="font-serif font-bold leading-[0.96] tracking-tight mt-1"
          style={{ fontSize: "clamp(36px, 4vw, 64px)", color: "var(--ink-2, #0f172b)", letterSpacing: "-0.02em" }}
        >
          Kontakta oss
        </h1>
      </section>

      <div className="max-w-[900px] mx-auto px-4 md:px-14 pb-16">
        <p className="text-base mb-12" style={{ color: "var(--slate, #62748e)" }}>
          E-post:{" "}
          <a
            href={`mailto:${contactInfo.email}`}
            className="underline hover:opacity-70 transition-opacity"
            style={{ color: "var(--ink, #020618)" }}
            data-payload-field="email"
          >
            {contactInfo.email}
          </a>
        </p>

        {/* Social media */}
        <section className="mb-12" style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}>
          <h2 className="font-serif font-bold text-xl md:text-[32px] leading-none mt-6 mb-6" style={{ color: "var(--ink-2, #0f172b)" }}>
            Sociala medier
          </h2>
          <div className="flex flex-col gap-3">
            <a data-payload-field="facebookUrl" href={contactInfo.facebook.url} target="_blank" rel="noopener noreferrer" className="text-sm underline hover:opacity-70 transition-opacity" style={{ color: "var(--ink, #020618)" }}>
              {contactInfo.facebook.label}
            </a>
            <a data-payload-field="youtubeUrl" href={contactInfo.youtube.url} target="_blank" rel="noopener noreferrer" className="text-sm underline hover:opacity-70 transition-opacity" style={{ color: "var(--ink, #020618)" }}>
              {contactInfo.youtube.label}
            </a>
          </div>
        </section>

        {/* Radio frequencies */}
        <section className="mb-12" style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}>
          <h2 className="font-serif font-bold text-xl md:text-[32px] leading-none mt-6 mb-6" style={{ color: "var(--ink-2, #0f172b)" }}>
            Radiofrekvenser
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactInfo.radioFrequencies.map((freq: any) => (
              <div key={freq.label} className="flex flex-col gap-1">
                <p className="font-serif italic text-sm" style={{ color: "var(--ink-2, #0f172b)" }}>{freq.label}</p>
                <p className="text-sm font-mono" style={{ color: "var(--slate, #62748e)" }}>{freq.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency contacts */}
        <section style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}>
          <h2 className="font-serif font-bold text-xl md:text-[32px] leading-none mt-6 mb-6" style={{ color: "var(--ink-2, #0f172b)" }}>
            Nödkontakter
          </h2>
          <div className="flex flex-col gap-5">
            {contactInfo.emergencyContacts.map((contact: any) => (
              <div key={contact.label} className="flex flex-col gap-1">
                <p className="text-sm font-semibold" style={{ color: "var(--ink, #020618)" }}>{contact.label}</p>
                <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>{contact.description}</p>
                {"phone" in contact && contact.phone && (
                  <a href={`tel:${contact.phone}`} className="text-sm font-mono underline hover:opacity-70 transition-opacity" style={{ color: "var(--ink, #020618)" }}>
                    {contact.phone}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default KontaktView;

import React from "react";
import { contactInfo as localContact } from "../../data/contact";
import { useContactInfo, useGlobalLivePreview } from "../../hooks/useCMS";

const KontaktView: React.FC = () => {
  const { data: cmsContact } = useContactInfo(localContact);
  const liveContact = useGlobalLivePreview(cmsContact);
  const contactInfo = {
    ...localContact,
    email: liveContact.email ?? localContact.email,
    radioFrequencies: liveContact.radioFrequencies?.length ? liveContact.radioFrequencies : localContact.radioFrequencies,
    emergencyContacts: liveContact.emergencyContacts?.length ? liveContact.emergencyContacts : localContact.emergencyContacts,
  };

  return (
    <main>
      <section className="pt-24 pb-0 px-6 md:px-28">
        <p className="eyebrow">Kontakt</p>
        <h1 className="display mt-[-4px]">Kontakta oss</h1>
        <p className="text-lg text-slate max-w-2xl mt-8 leading-relaxed">
          E-post:{" "}
          <a href={`mailto:${contactInfo.email}`} className="text-ink underline hover:text-accent transition-colors">
            {contactInfo.email}
          </a>
        </p>
      </section>

      <div className="site-container mt-20 flex flex-col gap-16">
        {/* Social media */}
        <div className="pt-0">
          <h3 className="h-section mb-8">Sociala medier</h3>
          <div className="flex flex-col gap-3">
            <a href={contactInfo.facebook.url} target="_blank" rel="noopener noreferrer" className="text-ink underline hover:text-accent transition-colors text-base">
              {contactInfo.facebook.label}
            </a>
            <a href={contactInfo.youtube.url} target="_blank" rel="noopener noreferrer" className="text-ink underline hover:text-accent transition-colors text-base">
              {contactInfo.youtube.label}
            </a>
          </div>
        </div>

        {/* Radio frequencies */}
        <div className="pt-0">
          <h3 className="h-section mb-8">Radiofrekvenser</h3>
          <div className="grid grid-cols-2 gap-4">
            {contactInfo.radioFrequencies.map((freq: any) => (
              <div key={freq.label} className="flex flex-col gap-1">
                <p className="font-serif italic text-base text-ink-2">{freq.label}</p>
                <p className="text-base text-slate">{freq.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency contacts */}
        <div className="pt-0">
          <h3 className="h-section mb-8">Nödkontakter</h3>
          <div className="flex flex-col gap-4">
            {contactInfo.emergencyContacts.map((contact: any) => (
              <div key={contact.label} className="flex flex-col gap-1">
                <p className="text-base font-semibold text-ink">{contact.label}</p>
                <p className="text-base text-slate">{contact.description}</p>
                {"phone" in contact && contact.phone && (
                  <a href={`tel:${contact.phone}`} className="text-ink underline hover:text-accent transition-colors text-base">
                    {contact.phone}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default KontaktView;

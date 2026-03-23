import React from "react";
import Separator from "../../components/separator";
import { contactInfo as localContact } from "../../data/contact";
import { useContactInfo, useCMSLivePreview } from "../../hooks/useCMS";

const KontaktView: React.FC = () => {
  const { data: cmsContact, setData: setCmsContact } = useContactInfo(localContact);
  useCMSLivePreview((data) => setCmsContact(data));
  const contactInfo = {
    ...localContact,
    email: cmsContact.email ?? localContact.email,
    radioFrequencies: cmsContact.radioFrequencies?.length ? cmsContact.radioFrequencies : localContact.radioFrequencies,
    emergencyContacts: cmsContact.emergencyContacts?.length ? cmsContact.emergencyContacts : localContact.emergencyContacts,
  };
  return (
    <div className="max-w-2xl px-4 flex gap-16 flex-col w-full">
      {/* Header */}
      <section className="flex flex-col gap-6">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">
            Kontakt
          </p>
          <h2 className="font-serif text-3xl">Kontakta oss</h2>
        </div>
        <div className="flex flex-col gap-4 text-muted-foreground text-sm leading-relaxed">
          <p>
            E-post:{" "}
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-foreground hover:text-primary transition-colors underline"
            >
              {contactInfo.email}
            </a>
          </p>
        </div>
      </section>

      <Separator />

      {/* Social media */}
      <section className="flex flex-col gap-6">
        <h3 className="font-serif text-xl">Sociala medier</h3>
        <div className="flex flex-col gap-3">
          <a
            href={contactInfo.facebook.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors underline text-sm"
          >
            {contactInfo.facebook.label}
          </a>
          <a
            href={contactInfo.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors underline text-sm"
          >
            {contactInfo.youtube.label}
          </a>
        </div>
      </section>

      <Separator />

      {/* Radio frequencies */}
      <section className="flex flex-col gap-6">
        <h3 className="font-serif text-xl">Radiofrekvenser</h3>
        <div className="grid grid-cols-2 gap-4">
          {contactInfo.radioFrequencies.map((freq: any) => (
            <div key={freq.label} className="flex flex-col gap-1">
              <p className="text-muted-foreground italic font-serif text-sm">
                {freq.label}
              </p>
              <p className="text-foreground text-sm">{freq.value}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Emergency contacts */}
      <section className="flex flex-col gap-6">
        <h3 className="font-serif text-xl">Nödkontakter</h3>
        <div className="flex flex-col gap-4">
          {contactInfo.emergencyContacts.map((contact: any) => (
            <div key={contact.label} className="flex flex-col gap-1">
              <p className="font-semibold text-sm">{contact.label}</p>
              <p className="text-muted-foreground text-sm">
                {contact.description}
              </p>
              {"phone" in contact && contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="text-foreground hover:text-primary transition-colors underline text-sm"
                >
                  {contact.phone}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default KontaktView;

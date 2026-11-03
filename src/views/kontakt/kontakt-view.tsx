import React from "react";
import { Link } from "react-router";
import { contactInfo as localContact } from "../../data/contact";
import PageHero from "../../components/page-hero";
import DataTable from "../../components/data-table";
import { useContactInfo, useGlobalLivePreview } from "../../hooks/useCMS";
import SEO from "../../components/seo";

const KontaktView: React.FC = () => {
  const { data: cmsContact } = useContactInfo(localContact);
  const liveContact = useGlobalLivePreview(cmsContact);
  const live = liveContact as typeof liveContact & {
    besoksadress?: string | null;
    organisationsnummer?: string | null;
  };
  const contactInfo = {
    ...localContact,
    email: live.email ?? localContact.email,
    besoksadress: live.besoksadress || localContact.besoksadress,
    organisationsnummer: live.organisationsnummer || localContact.organisationsnummer,
    facebook: live.facebook?.url ? live.facebook : localContact.facebook,
    youtube: live.youtube?.url ? live.youtube : localContact.youtube,
    radioFrequencies: live.radioFrequencies?.length ? live.radioFrequencies : localContact.radioFrequencies,
    emergencyContacts: live.emergencyContacts?.length ? live.emergencyContacts : localContact.emergencyContacts,
  };

  return (
    <div className="w-full">
      <SEO
        title="Kontakt"
        path="/kontakt"
        description="Kontakta Åre Skärm- och Drakflygklubb — mailadress, sociala medier, besöksadress, organisationsnummer och flygradiofrekvens."
      />
      <PageHero eyebrow="Kontakt" title="Kontakta oss" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-10 pb-16">
        <div className="flex flex-col gap-3 mb-12" style={{ color: "var(--slate, #62748e)" }}>
          <p className="text-base">
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
          {contactInfo.besoksadress && (
            <p className="text-base whitespace-pre-line" data-payload-field="besoksadress">
              <span style={{ color: "var(--slate, #62748e)" }}>Besöksadress: </span>
              <span style={{ color: "var(--ink, #020618)" }}>{contactInfo.besoksadress}</span>
            </p>
          )}
          {contactInfo.organisationsnummer && (
            <p className="text-base" data-payload-field="organisationsnummer">
              <span style={{ color: "var(--slate, #62748e)" }}>Organisationsnummer: </span>
              <span style={{ color: "var(--ink, #020618)" }}>{contactInfo.organisationsnummer}</span>
            </p>
          )}
          <p className="text-base">
            <Link to="/om/stadgar" className="underline hover:opacity-70 transition-opacity" style={{ color: "var(--ink, #020618)" }}>
              Klubbens stadgar
            </Link>
          </p>
        </div>

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
          <DataTable
            columns={[
              { key: "label", label: "Användning" },
              { key: "value", label: "Frekvens", align: "right", mono: true },
            ]}
            rows={contactInfo.radioFrequencies.map((freq: any) => ({
              label: freq.label,
              value: freq.value,
            }))}
          />
        </section>

        {/* Emergency contacts */}
        <section style={{ borderTop: "1px solid var(--border, #e2e8f0)" }}>
          <h2 className="font-serif font-bold text-xl md:text-[32px] leading-none mt-6 mb-6" style={{ color: "var(--ink-2, #0f172b)" }}>
            Nödkontakter
          </h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
            style={{
              padding: "4px",
            }}
          >
            {contactInfo.emergencyContacts.map((contact: any) => (
              <div
                key={contact.label}
                className="flex flex-col gap-2 p-4 md:p-5"
                style={{
                  background: "rgba(220, 38, 38, 0.04)",
                  borderLeft: "3px solid var(--signal-danger, #dc2626)",
                  borderRadius: "var(--radius, 10px)",
                }}
              >
                <p className="text-sm font-semibold" style={{ color: "var(--ink, #020618)" }}>{contact.label}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--slate-3, #45556c)" }}>{contact.description}</p>
                {"phone" in contact && contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-base font-mono tabular-nums font-semibold underline hover:opacity-70 transition-opacity mt-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal-danger,#dc2626)] focus-visible:ring-offset-2 rounded-sm"
                    style={{ color: "var(--signal-danger, #dc2626)" }}
                  >
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

import React from "react";
import { membershipInfo as localMembership } from "../../data/membership";
import { useMembershipInfo, useGlobalLivePreview } from "../../hooks/useCMS";

const BliMedlemView: React.FC = () => {
  const { data: cmsMembership } = useMembershipInfo(localMembership);
  const liveMembership = useGlobalLivePreview(cmsMembership);
  const membershipInfo = {
    ...localMembership,
    description: liveMembership.description ?? localMembership.description,
    price: liveMembership.price ?? localMembership.price,
    validity: liveMembership.validity ?? localMembership.validity,
    shopUrl: liveMembership.shopUrl ?? localMembership.shopUrl,
    benefits: liveMembership.benefits?.length
      ? liveMembership.benefits
      : localMembership.benefits,
    licenseRequirements: liveMembership.licenseRequirements?.length
      ? liveMembership.licenseRequirements
      : localMembership.licenseRequirements,
  };

  return (
    <div className="w-full">
      {/* Editorial header */}
      <section className="px-4 sm:px-8 md:px-16 lg:px-[110px] pt-16 md:pt-24 pb-8">
        <p
          className="font-serif italic text-2xl md:text-[40px] leading-none"
          style={{ color: "var(--ink-2, #0f172b)" }}
        >
          Medlemskap
        </p>
        <h1
          className="font-serif font-bold leading-[0.96] tracking-tight mt-1"
          style={{
            fontSize: "clamp(48px, 6vw, 96px)",
            color: "var(--ink-2, #0f172b)",
            letterSpacing: "-0.02em",
          }}
        >
          Bli medlem
        </h1>
        <p
          className="max-w-2xl mt-8 text-base md:text-lg leading-relaxed"
          style={{ color: "var(--slate, #62748e)" }}
        >
          {membershipInfo.description}
        </p>
      </section>

      <div className="max-w-[1480px] mx-auto px-4 md:px-14">
        {/* Price card */}
        <section
          className="mt-8 md:mt-12 p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16"
          style={{
            background: "var(--ink, #020618)",
            borderRadius: 0,
          }}
        >
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p
              className="font-serif font-bold text-white"
              style={{ fontSize: "clamp(48px, 5vw, 96px)", lineHeight: 0.96 }}
              data-payload-field="price"
            >
              {membershipInfo.price?.replace(/ \/ år$/, "") ?? "600 kr"}
            </p>
            <p className="text-white/60 text-sm" data-payload-field="validity">
              {membershipInfo.validity}
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center md:items-start">
            <a
              href={membershipInfo.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-serif transition-all hover:-translate-y-px"
              style={{ background: "#fff", color: "var(--ink, #020618)" }}
              data-payload-field="shopUrl"
            >
              Köp medlemskap
            </a>
            <p className="text-white/50 text-xs">
              Betalning sker via Svensk Flygnings webbshop
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="mt-16 md:mt-24">
          <div style={{ borderTop: "1px solid var(--border, #e2e8f0)" }} className="pt-6">
            <h2
              className="font-serif font-bold text-xl md:text-[32px] leading-none mb-8"
              style={{ color: "var(--ink-2, #0f172b)" }}
            >
              Vad ingår i medlemskapet
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {membershipInfo.benefits.map((benefit: any) => {
                const text = typeof benefit === "string" ? benefit : benefit?.text ?? "";
                return (
                  <li
                    key={text}
                    className="flex gap-3 items-baseline text-base leading-relaxed"
                    style={{ color: "var(--slate, #62748e)" }}
                  >
                    <span
                      className="shrink-0 w-3 h-px mt-3"
                      style={{ background: "var(--slate-2, #90a1b9)" }}
                    />
                    {text}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* License requirements */}
        <section className="mt-16 md:mt-24">
          <div style={{ borderTop: "1px solid var(--border, #e2e8f0)" }} className="pt-6">
            <h2
              className="font-serif font-bold text-xl md:text-[32px] leading-none mb-8"
              style={{ color: "var(--ink-2, #0f172b)" }}
            >
              Licenskrav
            </h2>
            <div className="flex flex-col">
              <div
                className="grid grid-cols-2 gap-4 py-3"
                style={{ borderBottom: "1px solid var(--border, #e2e8f0)" }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--ink, #020618)" }}
                >
                  Nivå
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--ink, #020618)" }}
                >
                  Krav
                </p>
              </div>
              {membershipInfo.licenseRequirements.map((req: any) => (
                <div
                  key={req.level}
                  className="grid grid-cols-2 gap-4 py-4"
                  style={{ borderBottom: "1px solid var(--border, #e2e8f0)" }}
                >
                  <p className="text-sm" style={{ color: "var(--ink, #020618)" }}>
                    {req.level}
                  </p>
                  <p className="text-sm" style={{ color: "var(--slate, #62748e)" }}>
                    {req.requirements}
                  </p>
                </div>
              ))}
            </div>
            {membershipInfo.licenseNote && (
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ color: "var(--slate, #62748e)" }}
              >
                {membershipInfo.licenseNote}
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BliMedlemView;

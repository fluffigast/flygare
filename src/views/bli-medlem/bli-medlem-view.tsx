import React from "react";
import { membershipInfo as localMembership } from "../../data/membership";
import { useMembershipInfo, useGlobalLivePreview } from "../../hooks/useCMS";

const BliMedlemView: React.FC = () => {
  const { data: cmsMembership } = useMembershipInfo(localMembership);
  const liveMembership = useGlobalLivePreview(cmsMembership);
  const info = {
    ...localMembership,
    price: liveMembership.price ?? localMembership.price,
    validity: liveMembership.validity ?? localMembership.validity,
    shopUrl: liveMembership.shopUrl ?? localMembership.shopUrl,
    benefits: liveMembership.benefits?.length ? liveMembership.benefits : localMembership.benefits,
    licenseRequirements: liveMembership.licenseRequirements?.length ? liveMembership.licenseRequirements : localMembership.licenseRequirements,
  };

  return (
    <main>
      <section className="pt-24 pb-0 px-6 md:px-28">
        <p className="eyebrow">Bli medlem</p>
        <h1 className="display mt-[-4px]">Bli en del av klubben</h1>
        <p className="text-lg text-slate max-w-2xl mt-8 leading-relaxed">
          Medlemskapet ger dig tillgång till Skandinaviens mest spektakulära flygplats.
        </p>
      </section>

      <div className="site-container mt-20 flex flex-col gap-16">
        {/* Price card */}
        <section className="bg-ink text-white p-8 md:p-12 flex flex-col gap-4 items-center text-center">
          <p className="font-serif text-4xl">{info.price}</p>
          <p className="text-white/50 text-sm">{info.validity}</p>
          <a href={info.shopUrl} className="pill-btn bg-white text-ink hover:bg-paper mt-2">
            Köp medlemskap
          </a>
        </section>

        {/* Benefits */}
        <div className="border-t border-hairline pt-6">
          <h3 className="h-section mb-8">Vad ingår</h3>
          <ul className="flex flex-col gap-3">
            {info.benefits.map((benefit: any) => (
              <li key={benefit} className="text-sm text-slate leading-relaxed flex gap-3 items-baseline">
                <span className="text-ink shrink-0">&bull;</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* License requirements */}
        <div className="border-t border-hairline pt-6">
          <h3 className="h-section mb-8">Licenskrav</h3>
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-4 py-2 border-b border-hairline">
              <p className="text-sm font-semibold text-ink">Nivå</p>
              <p className="text-sm font-semibold text-ink">Krav</p>
            </div>
            {info.licenseRequirements.map((req: any) => (
              <div key={req.level} className="grid grid-cols-2 gap-4 py-3 border-b border-hairline">
                <p className="text-sm text-ink">{req.level}</p>
                <p className="text-sm text-slate">{req.requirements}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BliMedlemView;

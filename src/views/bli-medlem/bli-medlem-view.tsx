import React from "react";
import Separator from "../../components/separator";
import Button from "../../components/button";
import { membershipInfo as localMembership } from "../../data/membership";
import { useMembershipInfo } from "../../hooks/useCMS";

const BliMedlemView: React.FC = () => {
  const { data: cmsMembership } = useMembershipInfo(localMembership);
  const membershipInfo = {
    ...localMembership,
    price: cmsMembership.price ?? localMembership.price,
    validity: cmsMembership.validity ?? localMembership.validity,
    shopUrl: cmsMembership.shopUrl ?? localMembership.shopUrl,
    benefits: cmsMembership.benefits?.length ? cmsMembership.benefits : localMembership.benefits,
    licenseRequirements: cmsMembership.licenseRequirements?.length ? cmsMembership.licenseRequirements : localMembership.licenseRequirements,
  };
  return (
    <div className="max-w-2xl px-4 flex gap-16 flex-col w-full">
      {/* Header */}
      <section className="flex flex-col gap-6">
        <div>
          <p className="font-serif italic text-muted-foreground text-sm">
            Flyg med oss
          </p>
          <h2 className="font-serif text-3xl">Bli en del av klubben</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Medlemskapet ger dig tillgång till Skandinaviens mest spektakulära flygplats.
          </p>
        </div>
      </section>

      {/* Price card */}
      <section className="bg-primary text-primary-foreground rounded-lg p-8 flex flex-col gap-4 items-center text-center">
        <p className="font-serif text-4xl">{membershipInfo.price}</p>
        <p className="text-primary-foreground/50 text-sm">
          {membershipInfo.validity}
        </p>
        <Button href={membershipInfo.shopUrl}>Köp medlemskap</Button>
      </section>

      <Separator />

      {/* Benefits */}
      <section className="flex flex-col gap-6">
        <h3 className="font-serif text-xl">Vad ingår</h3>
        <ul className="flex flex-col gap-3">
          {membershipInfo.benefits.map((benefit) => (
            <li
              key={benefit}
              className="text-muted-foreground text-sm leading-relaxed flex gap-3 items-baseline"
            >
              <span className="text-foreground shrink-0">&bull;</span>
              {benefit}
            </li>
          ))}
        </ul>
      </section>

      <Separator />

      {/* License requirements */}
      <section className="flex flex-col gap-6">
        <h3 className="font-serif text-xl">Licenskrav</h3>
        <div className="flex flex-col gap-1">
          {/* Table header */}
          <div className="grid grid-cols-2 gap-4 py-2 border-b border-border">
            <p className="text-sm font-semibold">Nivå</p>
            <p className="text-sm font-semibold">Krav</p>
          </div>
          {/* Table rows */}
          {membershipInfo.licenseRequirements.map((req) => (
            <div
              key={req.level}
              className="grid grid-cols-2 gap-4 py-3 border-b border-border"
            >
              <p className="text-sm">{req.level}</p>
              <p className="text-muted-foreground text-sm">
                {req.requirements}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BliMedlemView;

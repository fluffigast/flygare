import React from "react";

export interface HeroBannerProps {
  imageUrl?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  imageUrl = "https://placehold.co/1920x1080",
}) => {
  return (
    <section className="bg-primary text-primary-foreground aspect-3/1 overflow-hidden">
      <img
        src={imageUrl}
        alt="Hero banner"
        className="w-full h-full object-cover"
      />
    </section>
  );
};

export default HeroBanner;

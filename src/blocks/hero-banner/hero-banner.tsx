import React from "react";
import { getRandomPlaceholderImage } from "../../utils/placeholder";

export interface HeroBannerProps {
  imageUrl?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  imageUrl = getRandomPlaceholderImage(),
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

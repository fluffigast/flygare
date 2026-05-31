import React from "react";
import { getPlaceholderImage } from "../../utils/placeholder";

export interface HeroBannerProps {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  titleField?: string;
  subtitleField?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  imageUrl = getPlaceholderImage("hero-default"),
  title,
  subtitle,
  titleField,
  subtitleField,
}) => {
  return (
    <section className="bg-primary text-primary-foreground aspect-[3/1] md:aspect-[4/1] overflow-hidden relative">
      <img
        src={imageUrl}
        alt="Hero banner"
        className="w-full h-full object-cover"
      />
      {(title || subtitle) && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12 lg:p-16">
          {title && (
            <h1
              className="font-serif text-3xl md:text-5xl lg:text-6xl text-white max-w-2xl leading-tight"
              {...(titleField ? { "data-payload-field": titleField } : {})}
            >
              {title}
            </h1>
          )}
          {subtitle && (
            <p
              className="text-white/70 text-sm md:text-base mt-3 max-w-lg"
              {...(subtitleField ? { "data-payload-field": subtitleField } : {})}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default HeroBanner;

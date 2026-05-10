import React from "react";

export interface HeroBannerProps {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  imageUrl = "https://placehold.co/1920x1080",
  title,
  subtitle,
}) => {
  return (
    <section className="bg-primary text-primary-foreground aspect-video overflow-hidden relative">
      <img
        src={imageUrl}
        alt="Hero banner"
        className="w-full h-full object-cover"
      />
      {(title || subtitle) && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12 lg:p-16">
          {title && (
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white max-w-2xl leading-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-white/70 text-sm md:text-base mt-3 max-w-lg">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default HeroBanner;

import React from "react";
import { cn } from "../../utils/cn";

export interface FeaturedSectionProps {
  title: string;
  content: string;
  imageUrl: string;
  alignment: "left" | "right";
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  title,
  content,
  imageUrl,
  alignment = "left",
}) => {
  return (
    <section className="flex flex-col md:flex-row items-stretch gap-6 rounded-lg overflow-hidden">
      <div
        className={cn(
          "flex-1 flex flex-col gap-4 justify-center py-4",
          alignment === "left" ? "order-1" : "md:order-2"
        )}
      >
        <h2>{title}</h2>
        <p className="text-muted-foreground whitespace-pre-line">{content}</p>
      </div>
      <div
        className={cn(
          "flex-1 min-h-[300px] overflow-hidden rounded-lg bg-muted",
          alignment === "left" ? "order-2" : "md:order-1"
        )}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default FeaturedSection;

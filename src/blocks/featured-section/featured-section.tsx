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
    <section className="flex flex-row items-stretch gap-4">
      <div
        className={cn(
          "flex-1 flex flex-col gap-4 p-8",
          alignment === "left" ? "order-1" : "order-2"
        )}
      >
        <h2>{title}</h2>
        <p className="text-muted-foreground">{content}</p>
      </div>
      <div
        className={cn(
          "flex-2 h-full overflow-hidden",
          alignment === "left" ? "order-2" : "order-1"
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

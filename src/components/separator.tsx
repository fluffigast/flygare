import React from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";
import { cn } from "../utils/cn";

export interface SeparatorProps {
  direction?: "horizontal" | "vertical";
}

const Separator: React.FC<SeparatorProps> = ({ direction = "horizontal" }) => {
  return (
    <SeparatorPrimitive.Root
      decorative
      orientation={direction === "horizontal" ? "horizontal" : "vertical"}
      className={cn(
        "shrink-0 bg-border",
        direction === "horizontal" ? "h-px w-full" : "h-full w-px"
      )}
    />
  );
};

export default Separator;

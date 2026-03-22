import React from "react";
import { cn } from "../utils/cn";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  /**
   * Tailwind spacing scale (same as `gap-{n}`): `4` → `1rem`.
   * Pass `null` to skip setting `gap` (e.g. use `className="gap-px"`).
   */
  gap?: number | null;
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  function Stack(
    { className, direction = "column", gap = 4, style, ...rest },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          direction === "row" ? "flex-row" : "flex-col",
          className
        )}
        style={{
          ...style,
          ...(gap !== null ? { gap: `${gap * 0.25}rem` } : {}),
        }}
        {...rest}
      />
    );
  }
);

export const VStack = React.forwardRef<HTMLDivElement, StackProps>(
  function VStack({ className, gap = 4, style, ...rest }, ref) {
    return (
      <Stack
        ref={ref}
        className={cn("items-center", className)}
        direction="column"
        gap={gap}
        style={style}
        {...rest}
      />
    );
  }
);

export const HStack = React.forwardRef<HTMLDivElement, StackProps>(
  function HStack({ className, gap = 4, style, ...rest }, ref) {
    return (
      <Stack
        ref={ref}
        className={cn("justify-center", className)}
        direction="row"
        gap={gap}
        style={style}
        {...rest}
      />
    );
  }
);

export default Stack;

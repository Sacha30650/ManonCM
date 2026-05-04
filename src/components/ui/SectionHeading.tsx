import type { ReactNode } from "react";

import { FadeInWhenVisible } from "@/components/motion/FadeInWhenVisible";

type SectionHeadingProps = {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
};

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  children,
}: SectionHeadingProps) {
  return (
    <FadeInWhenVisible
      className={`flex flex-col gap-5 ${align === "center" ? "items-center text-center" : ""}`}
    >
      {kicker && (
        <span className="text-xs font-medium uppercase tracking-[0.32em] text-accent-soft">
          {kicker}
        </span>
      )}
      <h2 className="text-display text-section text-text-primary">{title}</h2>
      {description && (
        <p
          className={`max-w-2xl text-base text-text-secondary md:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
      {children}
    </FadeInWhenVisible>
  );
}

import type { MethodStep as MethodStepType } from "@/data/method";

import { FadeInWhenVisible } from "@/components/motion/FadeInWhenVisible";

type Props = {
  step: MethodStepType;
  isLast?: boolean;
};

export function MethodStepRow({ step, isLast }: Props) {
  return (
    <FadeInWhenVisible className="relative grid grid-cols-[auto_1fr] gap-6 md:gap-12">
      <div className="relative flex flex-col items-center">
        <span className="text-display text-6xl text-accent leading-none md:text-7xl">
          {step.number}
        </span>
        {!isLast && (
          <span
            className="mt-4 h-full w-px flex-1 bg-gradient-to-b from-accent/60 via-border to-transparent"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="pb-16 md:pb-20">
        <h3 className="text-display text-2xl text-text-primary md:text-3xl">{step.title}</h3>
        <ul className="mt-4 flex flex-col gap-2 text-sm text-text-secondary md:text-base">
          {step.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-soft"
                aria-hidden="true"
              />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </FadeInWhenVisible>
  );
}

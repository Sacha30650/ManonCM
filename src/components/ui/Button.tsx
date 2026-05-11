import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-background hover:bg-accent-hover hover:shadow-[0_12px_40px_-12px_rgba(255,107,157,0.7)] hover:-translate-y-0.5",
  secondary:
    "border border-border bg-transparent text-text-primary hover:border-accent hover:text-accent hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-text-primary hover:text-accent",
};

type ButtonAsButton = {
  as?: "button";
  href?: never;
  variant?: Variant;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

type ButtonAsLink = {
  as: "link";
  href: string;
  variant?: Variant;
  children: ReactNode;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href">;

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", children, className, ...rest } = props;
  const classes = `${baseClasses} ${variants[variant]} ${className ?? ""}`.trim();

  if (props.as === "link") {
    const { href, external, as: _as, ...linkRest } = rest as ButtonAsLink & {
      as?: "link";
    };
    void _as;
    if (external) {
      return (
        <a
          {...linkRest}
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const { as: _btnAs, ...buttonRest } = rest as ComponentPropsWithoutRef<"button"> & {
    as?: "button";
  };
  void _btnAs;
  return (
    <button {...buttonRest} className={classes}>
      {children}
    </button>
  );
}

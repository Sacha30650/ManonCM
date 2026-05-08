"use client";

import Script from "next/script";

type CalendlyEmbedProps = {
  url: string;
  className?: string;
  height?: number;
};

const PARAMS =
  "primary_color=ff6b9d&background_color=0a0a0a&text_color=fafafa&hide_event_type_details=0&hide_gdpr_banner=1";

export function CalendlyEmbed({ url, className, height = 720 }: CalendlyEmbedProps) {
  const dataUrl = url.includes("?") ? `${url}&${PARAMS}` : `${url}?${PARAMS}`;

  return (
    <div className={className}>
      <div
        className="calendly-inline-widget overflow-hidden rounded-3xl border border-border bg-surface"
        data-url={dataUrl}
        style={{ minWidth: "320px", height: `${height}px` }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </div>
  );
}

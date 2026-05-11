"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type CalendlyEmbedProps = {
  url: string;
  className?: string;
  height?: number;
};

type CalendlyAPI = {
  initInlineWidget: (opts: {
    url: string;
    parentElement: HTMLElement;
    prefill?: Record<string, unknown>;
    utm?: Record<string, unknown>;
  }) => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyAPI;
  }
}

const PARAMS =
  "primary_color=ff6b9d&background_color=0a0a0a&text_color=fafafa&hide_event_type_details=0&hide_gdpr_banner=1";

export function CalendlyEmbed({ url, className, height = 720 }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const dataUrl = url.includes("?") ? `${url}&${PARAMS}` : `${url}?${PARAMS}`;

  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || !window.Calendly) return;

    containerRef.current.innerHTML = "";
    window.Calendly.initInlineWidget({
      url: dataUrl,
      parentElement: containerRef.current,
    });
  }, [scriptLoaded, dataUrl]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <div
        ref={containerRef}
        className={`overflow-hidden rounded-3xl border border-border bg-surface ${className ?? ""}`}
        style={{ minWidth: "320px", height: `${height}px` }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onReady={() => setScriptLoaded(true)}
      />
    </>
  );
}

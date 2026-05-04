"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import type { FAQ } from "@/data/faq";

export function FAQItem({ item, defaultOpen = false }: { item: FAQ; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-accent"
        aria-expanded={open}
      >
        <span className="text-lg font-medium text-text-primary md:text-xl">{item.question}</span>
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-accent transition-all duration-300 group-hover:border-accent ${
            open ? "rotate-45 bg-accent text-background" : ""
          }`}
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-14 text-base text-text-secondary md:text-lg">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

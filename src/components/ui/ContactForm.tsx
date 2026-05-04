"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { budgetRanges, contactSchema, projectTypes, type ContactInput } from "@/lib/validations";

const inputClass =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-0";

const labelClass = "text-xs font-semibold uppercase tracking-[0.24em] text-accent-soft";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { website: "" },
  });

  async function onSubmit(values: ContactInput) {
    setStatus("loading");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Une erreur est survenue.");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Nom <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Manon D."
            className={inputClass}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-accent">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="manon@exemple.com"
            className={inputClass}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-accent">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="projectType" className={labelClass}>
            Type de projet <span className="text-accent">*</span>
          </label>
          <select
            id="projectType"
            className={inputClass}
            aria-invalid={!!errors.projectType}
            {...register("projectType")}
            defaultValue=""
          >
            <option value="" disabled>
              Sélectionne…
            </option>
            {projectTypes.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p className="text-xs text-accent">{errors.projectType.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className={labelClass}>
            Budget approximatif
          </label>
          <select id="budget" className={inputClass} {...register("budget")} defaultValue="">
            <option value="">Optionnel</option>
            {budgetRanges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="Décris ton projet, tes objectifs, ton secteur d'activité…"
          className={`${inputClass} resize-y`}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && <p className="text-xs text-accent">{errors.message.message}</p>}
      </div>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("website")}
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-background transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_16px_50px_-12px_rgba(255,107,157,0.7)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Envoi en cours…" : "Envoyer mon message"}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </button>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent-soft"
            role="status"
          >
            Message envoyé ! Manon revient vers toi sous 24h.
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            role="alert"
          >
            {errorMessage ?? "Une erreur est survenue. Tu peux aussi écrire à almudever.manon@gmail.com."}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

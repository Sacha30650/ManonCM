"use client";

import { useState } from "react";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Connexion impossible.");
      }
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-3xl border border-border bg-surface p-8 md:p-10"
    >
      <div className="flex flex-col gap-2 text-center">
        <span className="text-eyebrow text-accent-soft">Make my visu</span>
        <h1 className="text-display text-3xl text-text-primary">Admin</h1>
        <p className="text-sm text-text-secondary">
          Entrez le mot de passe pour gérer le contenu du site.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-2">
        <label htmlFor="password" className="text-eyebrow text-text-muted">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          className="rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !password}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-background transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}

import type { Metadata } from "next";
import { cookies } from "next/headers";

import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { LoginForm } from "@/components/admin/LoginForm";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import { getHero } from "@/data/hero";
import { packs, unitItems } from "@/data/pricing";
import { projects } from "@/data/projects";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const jar = await cookies();
  const isAuthed = verifyToken(jar.get(ADMIN_COOKIE.name)?.value);

  if (!isAuthed) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-24">
        <LoginForm />
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-24 pt-28 md:pt-32">
      <AdminDashboard
        hero={getHero()}
        projects={projects}
        pricing={{ packs, unitItems }}
      />
    </main>
  );
}

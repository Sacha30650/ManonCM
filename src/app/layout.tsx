import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import Script from "next/script";

import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";

import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-anton",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://makemyvisu.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Make my visu — Créatrice de visuels & contenus Instagram | Affiches, flyers, posts pro",
    template: "%s | Make my visu",
  },
  description:
    "Créatrice de visuels marketing en PACA. Affiches événementielles, flyers, contenus Instagram pour restaurants, coachs et commerces. Bilan stratégique offert.",
  keywords: [
    "graphiste freelance Vaucluse",
    "création visuels Instagram",
    "flyer événementiel restaurant",
    "community manager Avignon",
    "affiche soirée club",
    "visuels marketing PACA",
  ],
  authors: [{ name: "Make my visu" }],
  creator: "Make my visu",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Make my visu",
    title: "Make my visu — Créatrice de visuels & contenus Instagram",
    description:
      "Affiches, flyers et contenus Instagram pour transformer ta communication en machine à attirer des clients.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Make my visu — Créatrice de visuels & contenus Instagram",
    description:
      "Affiches, flyers et contenus Instagram pour transformer ta communication en machine à attirer des clients.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Make my visu",
    image: `${siteUrl}/og-image.png`,
    "@id": siteUrl,
    url: siteUrl,
    email: "almudever.manon@gmail.com",
    description:
      "Créatrice de visuels marketing : affiches, flyers, contenus Instagram pour restaurants, coachs et commerces.",
    areaServed: { "@type": "AdministrativeArea", name: "PACA, France" },
    priceRange: "€€",
    sameAs: ["https://www.instagram.com/"],
  };

  return (
    <html lang="fr" className={`${anton.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background text-text-primary antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
        <Script
          id="schema-professional-service"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

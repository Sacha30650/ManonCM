import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://manon-almu.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/portfolio`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/tarifs`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    {
      url: `${siteUrl}/mentions-legales`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}

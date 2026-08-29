import type { MetadataRoute } from "next";
import { getAllChapters } from "@/lib/content";

const BASE_URL = "https://frontend-from-first-principles.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const chapters = getAllChapters();

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...chapters.map((chapter) => ({
      url: `${BASE_URL}/${chapter.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

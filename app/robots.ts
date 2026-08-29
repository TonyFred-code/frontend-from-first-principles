import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://frontend-from-first-principles.vercel.app/sitemap.xml",
  };
}

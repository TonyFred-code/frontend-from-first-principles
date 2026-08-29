import { getAllChapters } from "@/lib/content";

const BASE_URL = "https://frontend-from-first-principles.vercel.app";

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const chapters = getAllChapters();

  const items = chapters
    .map(
      (chapter) => `
    <item>
      <title>${escapeXml(chapter.title)}</title>
      <link>${BASE_URL}/${chapter.slug}</link>
      <guid>${BASE_URL}/${chapter.slug}</guid>
      <description>${escapeXml(chapter.description)}</description>
      <pubDate>${new Date(chapter.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Frontend from First Principles</title>
    <link>${BASE_URL}</link>
    <description>A deep-dive into how browsers actually work — from parsing HTML to compositing pixels.</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}

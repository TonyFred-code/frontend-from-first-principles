import Link from "next/link";
import { getAllChapters } from "@/lib/content";

export default function HomePage() {
  const chapters = getAllChapters();

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <p className="font-mono text-sm text-blueprint-line mb-2">
        {chapters.length} chapters — a browser field manual
      </p>
      <h1 className="font-display text-4xl text-signal-orange mb-10">
        Frontend, First Principles
      </h1>

      <ol className="space-y-8">
        {chapters.map((chapter, index) => (
          <li
            key={chapter.slug}
            className="flex gap-4 border-b border-blueprint-line pb-8 last:border-0"
          >
            <span className="font-mono text-signal-orange text-lg shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <Link
                href={`/${chapter.slug}`}
                className="font-display text-2xl hover:text-signal-red transition-colors"
              >
                {chapter.title}
              </Link>
              <p className="mt-1 text-blueprint-line">{chapter.description}</p>
              <span className="font-mono text-xs text-blueprint-line">
                {chapter.readTime}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

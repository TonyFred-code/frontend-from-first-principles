"use client";

import Link from "next/link";
import { useProgress } from "@/lib/useProgress";
import type { ChapterFrontmatter } from "@/lib/content";

export function ChapterList({ chapters }: { chapters: ChapterFrontmatter[] }) {
  const { completed } = useProgress();
  const doneCount = chapters.filter((c) => completed.has(c.slug)).length;

  return (
    <>
      <p className="font-mono text-sm text-line mb-2">
        {doneCount} of {chapters.length} chapters completed
      </p>
      <h1 className="font-display text-4xl text-signal-orange mb-10">
        Frontend, First Principles
      </h1>

      <ol className="space-y-8">
        {chapters.map((chapter, index) => {
          const isDone = completed.has(chapter.slug);
          return (
            <li
              key={chapter.slug}
              className="flex gap-4 border-b border-line pb-8 last:border-0"
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
                {isDone && (
                  <span className="ml-2 font-mono text-xs text-signal-orange">
                    ✓ done
                  </span>
                )}
                <p className="mt-1 text-line">{chapter.description}</p>
                <span className="font-mono text-xs text-line">
                  {chapter.readTime}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}

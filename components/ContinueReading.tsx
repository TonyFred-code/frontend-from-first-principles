"use client";

import Link from "next/link";
import { useProgress } from "@/lib/useProgress";
import type { ChapterFrontmatter } from "@/lib/content";

export function ContinueReading({
  chapters,
}: {
  chapters: ChapterFrontmatter[];
}) {
  const { completed } = useProgress();

  const nextChapter = chapters.find((c) => !completed.has(c.slug));

  if (!nextChapter) {
    return (
      <div className="border border-line rounded p-4 mb-10 font-mono text-sm text-signal-orange">
        You&apos;ve completed the series. Nice work.
      </div>
    );
  }

  // Nothing completed yet — don't clutter the homepage with a "continue" prompt for a series not yet started
  if (completed.size === 0) return null;

  return (
    <Link
      href={`/${nextChapter.slug}`}
      className="block border border-line rounded p-4 mb-10 hover:border-signal-orange transition-colors"
    >
      <p className="font-mono text-xs text-line mb-1">Continue reading</p>
      <p className="font-display text-xl text-signal-orange">
        {nextChapter.title}
      </p>
    </Link>
  );
}

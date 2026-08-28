"use client";

import { useProgress } from "@/lib/useProgress";

export function ChapterCheckbox({ slug }: { slug: string }) {
  const { completed, toggleChapter } = useProgress();
  const isDone = completed.has(slug);

  return (
    <label className="flex items-center gap-2 font-mono text-sm cursor-pointer">
      <input
        type="checkbox"
        checked={isDone}
        onChange={() => toggleChapter(slug)}
        className="accent-signal-orange"
      />
      {isDone ? "Completed" : "Mark as complete"}
    </label>
  );
}

"use client";

import { useScrollProgress } from "@/lib/useScrollProgress";
import { usePathname } from "next/navigation";

export function ScrollProgress() {
  const pathname = usePathname();
  const progress = useScrollProgress();

  const isChapterPage = pathname !== "/";
  if (!isChapterPage) return null;

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-signal-orange z-50 transition-[width]"
      style={{ width: `${progress * 100}%` }}
    />
  );
}

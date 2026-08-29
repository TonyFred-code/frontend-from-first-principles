"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ChapterFrontmatter } from "@/lib/content";

export function ChapterKeyboardNav({
  prev,
  next,
}: {
  prev: ChapterFrontmatter | null;
  next: ChapterFrontmatter | null;
}) {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isTyping = ["INPUT", "TEXTAREA"].includes(target.tagName);
      if (isTyping) return;

      if (e.key === "ArrowLeft" && prev) router.push(`/${prev.slug}`);
      if (e.key === "ArrowRight" && next) router.push(`/${next.slug}`);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [prev, next, router]);

  return null;
}

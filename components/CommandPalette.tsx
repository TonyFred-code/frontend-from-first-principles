"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import type { ChapterFrontmatter } from "@/lib/content";
import { Search, X } from "lucide-react";

export function CommandPalette({
  chapters,
}: {
  chapters: ChapterFrontmatter[];
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function closePalette() {
    setOpen(false);
    setSearch("");
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") closePalette();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function goTo(slug: string) {
    router.push(`/${slug}`);
    closePalette();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-background/80 z-100 flex items-start justify-center pt-24"
      onClick={closePalette}
    >
      <Command
        className="w-full max-w-lg bg-panel border border-line rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-line">
          <span className="font-mono text-xs text-line">Jump to a chapter</span>
          <button onClick={closePalette} aria-label="Close">
            <X className="w-4 h-4 text-line" />
          </button>
        </div>
        <div className="flex items-center gap-2 px-4">
          <Search className="w-4 h-4 text-line shrink-0" />
          <Command.Input
            ref={inputRef}
            value={search}
            onValueChange={setSearch}
            placeholder="Jump to a chapter..."
            className="w-full py-3 bg-transparent font-mono text-sm outline-none text-foreground"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="shrink-0"
            >
              <X className="w-4 h-4 text-line" />
            </button>
          )}
        </div>
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="px-2 py-4 text-sm text-line font-mono">
            No chapters found.
          </Command.Empty>
          {chapters.map((chapter) => (
            <Command.Item
              key={chapter.slug}
              value={chapter.title}
              onSelect={() => goTo(chapter.slug)}
              className="px-3 py-2 rounded cursor-pointer data-[selected=true]:bg-background font-display text-lg"
            >
              {chapter.title}
            </Command.Item>
          ))}
        </Command.List>
      </Command>
    </div>
  );
}

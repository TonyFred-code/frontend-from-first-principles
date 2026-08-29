"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

const SHORTCUTS = [
  { keys: "⌘K / Ctrl+K", description: "Open command palette" },
  { keys: "←  →", description: "Previous / next chapter" },
  { keys: "?", description: "Show this help" },
  { keys: "Esc", description: "Close any open overlay" },
];

export function ShortcutsHelp() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isTyping = ["INPUT", "TEXTAREA"].includes(target.tagName);
      if (isTyping) return;

      if (e.key === "?") setOpen((prev) => !prev);
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-background/80 z-100 flex items-center justify-center"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-panel border border-line rounded-lg p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          {" "}
          <h2 className="font-display text-xl text-signal-orange">
            Keyboard shortcuts
          </h2>{" "}
          <button onClick={() => setOpen(false)} aria-label="Close">
            <X className="w-4 h-4 text-line" />+{" "}
          </button>{" "}
        </div>
        <dl className="space-y-2">
          {SHORTCUTS.map((s) => (
            <div
              key={s.keys}
              className="flex justify-between font-mono text-sm"
            >
              <dt className="text-line">{s.description}</dt>
              <dd className="text-foreground">{s.keys}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

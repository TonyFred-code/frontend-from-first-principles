"use client";

import { ArrowUp } from "lucide-react";
import { useScrollProgress } from "@/lib/useScrollProgress";

export function ScrollToTop() {
  const progress = useScrollProgress();
  const visible = progress > 0.2 && progress < 1;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 p-3 rounded-full bg-panel border border-line transition-opacity ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 text-signal-orange" />
    </button>
  );
}

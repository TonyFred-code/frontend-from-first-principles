"use client";

import { useEffect, useRef, useState } from "react";
import type { Heading } from "@/lib/content";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSlug(visible.target.id);
      },
      { rootMargin: "-100px 0px -70% 0px" },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden lg:block sticky top-12 self-start w-56 font-mono text-xs">
      <p className="text-line mb-2">on this page</p>
      <ul className="space-y-2 border-l border-line pl-3">
        {headings.map((h) => (
          <li key={h.slug}>
            <a
              href={`#${h.slug}`}
              className={
                activeSlug === h.slug
                  ? "text-signal-orange"
                  : "text-line hover:text-foreground transition-colors"
              }
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function MobileTableOfContents({ headings }: { headings: Heading[] }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  if (headings.length === 0) return null;

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, slug: string) {
    e.preventDefault();
    const target = document.getElementById(slug);
    const details = detailsRef.current;
    if (!target) return;

    let settled = false;

    const closeWithoutSnap = () => {
      if (settled) return;
      settled = true;
      window.removeEventListener("scrollend", closeWithoutSnap);

      if (details) {
        const beforeTop = target.getBoundingClientRect().top;
        details.open = false;
        const afterTop = target.getBoundingClientRect().top;
        window.scrollBy(0, afterTop - beforeTop);
      }
    };

    window.addEventListener("scrollend", closeWithoutSnap);
    // Safari fallback: scrollend isn't supported there yet
    setTimeout(closeWithoutSnap, 800);

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <details
      ref={detailsRef}
      className="lg:hidden mt-6 mb-8 border border-line rounded-md"
    >
      <summary className="cursor-pointer font-mono text-xs text-line px-3 py-2 select-none">
        on this page
      </summary>
      <ul className="px-3 pb-3 space-y-2 font-mono text-xs">
        {headings.map((h) => (
          <li key={h.slug}>
            <a
              href={`#${h.slug}`}
              onClick={(e) => handleClick(e, h.slug)}
              className="text-foreground hover:text-signal-orange transition-colors"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

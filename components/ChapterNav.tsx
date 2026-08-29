import Link from "next/link.js";
import type { ChapterFrontmatter } from "@/lib/content";

export function ChapterNav({
  prev,
  next,
}: {
  prev: ChapterFrontmatter | null;
  next: ChapterFrontmatter | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav className="mt-16 pt-8 border-t border-line grid grid-cols-2 gap-4">
      <div>
        {prev && (
          <Link href={`/${prev.slug}`} className="group block">
            <span className="font-mono text-xs text-line">← prev</span>
            <p className="text-signal-orange group-hover:text-signal-red transition-colors">
              {prev.title}
            </p>
          </Link>
        )}
      </div>
      <div className="text-right">
        {next && (
          <Link href={`/${next.slug}`} className="group block">
            <span className="font-mono text-xs text-line">next →</span>
            <p className="text-signal-orange group-hover:text-signal-red transition-colors">
              {next.title}
            </p>
          </Link>
        )}
      </div>
    </nav>
  );
}

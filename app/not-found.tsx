import Link from "next/link.js";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="font-mono text-xs text-line">404</p>
      <h1 className="font-display text-4xl text-signal-orange mt-2 mb-4">
        Page not found
      </h1>
      <p className="text-line mb-8">
        That chapter doesn&apos;t exist, or the render pipeline dropped it
        somewhere between layout and paint.
      </p>
      <Link
        href="/"
        className="font-mono text-sm text-signal-orange hover:text-signal-red transition-colors"
      >
        ← back to chapters
      </Link>
    </div>
  );
}

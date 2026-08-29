"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="font-mono text-xs text-line">error</p>
      <h1 className="font-display text-4xl text-signal-red mt-2 mb-4">
        Something broke
      </h1>
      <p className="text-line mb-8">
        An unexpected error occurred while rendering this page.
      </p>
      <button
        onClick={() => reset()}
        className="font-mono text-sm text-signal-orange hover:text-signal-red transition-colors"
      >
        try again
      </button>
    </div>
  );
}

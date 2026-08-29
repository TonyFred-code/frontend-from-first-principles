"use client";

import { useRef, useState, type ComponentProps } from "react";
import { Check, Copy } from "lucide-react";

export function Pre(props: ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = preRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative group">
      <pre
        ref={preRef}
        {...props}
        className={`overflow-x-auto max-w-full ${props.className ?? ""}`}
      />
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded bg-panel border border-line opacity-100 pointer-events-auto transition-opacity [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:pointer-events-none [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:pointer-events-auto"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-signal-orange" />
        ) : (
          <Copy className="w-4 h-4 text-line" />
        )}
      </button>
    </div>
  );
}

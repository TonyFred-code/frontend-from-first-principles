"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getSnapshot() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
}

function getServerSnapshot() {
  return 0;
}

export function useScrollProgress() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

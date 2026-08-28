"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "completed-chapters";
const listeners = new Set<() => void>();

function readCompleted(): string[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) ?? "[]";
}

function getServerSnapshot() {
  return "[]";
}

export function useProgress() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const completed = new Set<string>(JSON.parse(raw));

  function toggleChapter(slug: string) {
    const current = new Set(readCompleted());
    if (current.has(slug)) {
      current.delete(slug);
    } else {
      current.add(slug);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...current]));
    listeners.forEach((callback) => callback());
  }

  return { completed, toggleChapter };
}

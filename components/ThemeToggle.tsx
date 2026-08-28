"use client";

import { Monitor, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const options = [
  { value: "light", icon: SunIcon },
  { value: "dark", icon: MoonIcon },
  { value: "system", icon: Monitor },
] as const;

function subscribe() {
  return () => {};
}
function getSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!mounted) return <div className="w-24 h-8" />;

  const activeIndex = options.findIndex((o) => o.value === theme);

  return (
    <div className="relative flex items-center gap-0.5 p-0.5 rounded-full border border-line bg-panel">
      <span
        aria-hidden="true"
        className="absolute top-0.5 left-0.5 h-7 w-7 rounded-full bg-signal-orange transition-transform duration-200 ease-out"
        style={{
          transform: `translateX(${Math.max(activeIndex, 0) * 30}px)`,
        }}
      />
      {options.map(({ value, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => setTheme(value)}
          aria-label={value}
          className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full cursor-pointer"
        >
          <Icon
            className={`block h-4 w-4 shrink-0 transition-colors duration-150 ${
              theme === value ? "text-background" : "text-line"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

type Theme = "light" | "dark";
const KEY = "flygare-theme";

/**
 * Toggle mellan light/dark. Persisteras i localStorage. Default följer
 * prefers-color-scheme.
 */
const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem(KEY) as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem(KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent,#3774a3)] focus-visible:ring-offset-2"
      style={{
        color: "var(--slate-3, #45556c)",
        background: "transparent",
      }}
      aria-label={theme === "dark" ? "Växla till ljust tema" : "Växla till mörkt tema"}
      title={theme === "dark" ? "Ljust tema" : "Mörkt tema"}
    >
      {theme === "dark" ? <SunIcon size={18} strokeWidth={1.6} /> : <MoonIcon size={18} strokeWidth={1.6} />}
    </button>
  );
};

export default ThemeToggle;

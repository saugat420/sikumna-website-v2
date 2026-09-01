"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("sikumna-theme", theme);
  window.dispatchEvent(new CustomEvent("sikumna-theme-change", { detail: theme }));
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const sync = () => setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    sync();
    window.addEventListener("sikumna-theme-change", sync);
    return () => window.removeEventListener("sikumna-theme-change", sync);
  }, []);

  function toggleTheme() {
    const nextTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={label} title={label} data-theme={theme}>
    <Sun className="theme-icon theme-icon-sun" size={19} aria-hidden="true" />
    <Moon className="theme-icon theme-icon-moon" size={18} aria-hidden="true" />
  </button>;
}

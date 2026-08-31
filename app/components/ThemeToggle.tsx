"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem("sikumna-theme", theme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  function toggleTheme() {
    const nextTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle color theme" data-theme={theme}>
    <Sun className="theme-icon theme-icon-sun" size={19} aria-hidden="true" />
    <Moon className="theme-icon theme-icon-moon" size={18} aria-hidden="true" />
  </button>;
}

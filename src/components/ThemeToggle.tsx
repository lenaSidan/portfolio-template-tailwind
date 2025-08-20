"use client";
import styles from "@/styles/themeToggle.module.css";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = stored ? stored === "dark" : systemDark;
    setIsDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      /* aria-pressed={isDark} — можно вернуть, если отключите Edge Tools webhint */
      aria-label={isDark ? "Выключить тёмную тему" : "Включить тёмную тему"}
      className={`${styles.switch} ${isDark ? styles.on : ""}`}
      onClick={toggle}
    >
      <span aria-hidden="true" className={styles.knob} />
    </button>
  );
}

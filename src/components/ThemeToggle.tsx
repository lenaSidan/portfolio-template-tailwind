"use client";
import styles from "@/styles/themeToggle.module.css";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = storedTheme || (systemDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const switchTheme = (selectedTheme: "light" | "dark") => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    document.documentElement.classList.toggle("dark", selectedTheme === "dark");
  };

  return (
    <div className={styles.themeToggle}>
      <button
        className={`${styles.circle} ${styles.light} ${theme === "light" ? styles.active : styles.inactive}`}
        onClick={() => switchTheme("light")}
        aria-label="Switch to light theme"
      />
      <button
        className={`${styles.circle} ${styles.dark} ${theme === "dark" ? styles.active : styles.inactive}`}
        onClick={() => switchTheme("dark")}
        aria-label="Switch to dark theme"
      />
    </div>
  );
};

export default ThemeToggle;

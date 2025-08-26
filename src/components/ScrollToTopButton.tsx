"use client";
import { useEffect, useState } from "react";
import styles from "../styles/scrollToTopButton.module.css";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={styles.button}
      aria-label="Scroll to top"
      title="Up"
    >
      {/* стрелка вверх */}
      <span aria-hidden="true" className={styles.icon}>
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M12 6l-7 7 1.4 1.4L11 10.8V20h2v-9.2l4.6 3.6L19 13z" />
        </svg>
      </span>
    </button>
  );
}

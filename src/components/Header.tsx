"use client";
import styles from "@/styles/header.module.css";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { t, i18n } = useTranslation("common");
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <nav className={styles.nav}>
      <button
        type="button"
        className={`${styles.menuButton} ${menuOpen ? styles.open : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`${styles.navList} ${menuOpen ? styles.open : ""}`}>
        <li>
          <Link href="/">{t("home")}</Link>
        </li>
        <li>
          <Link href="/article" locale={router.locale}>
            {t("articles")}
          </Link>
        </li>
        <li>
          <Link href="/event" locale={router.locale}>
            {t("events")}
          </Link>
        </li>
        <li>
          <Link href="/about">{t("about")}</Link>
        </li>
      </ul>

      <div className={styles.toggleGroup}>
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <div
        className={`${styles.menuOverlay} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen(false)}
      />
    </nav>
  );
};

export default Header;

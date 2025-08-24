"use client";
import styles from "@/styles/header.module.css";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

type Props = { overHero?: boolean };

const Header = ({ overHero = false }: Props) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  // --- helper: активный путь (игнорируем локаль, хвост /, query, hash)
  const stripLocale = (p: string) => p.replace(/^\/(ru|de)(?=\/|$)/, "");
  const normalize = (p: string) =>
    stripLocale(p.split(/[?#]/)[0]).replace(/\/+$/, "") || "/";

  const current = normalize(router.asPath);
  const isActive = (href: string) => {
    const target = normalize(href);
    // активным считаем сам раздел и все его "внутренние" страницы
    return current === target || current.startsWith(target + "/");
  };

  useEffect(() => {
    if (!overHero) return;
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        setSolid(!e.isIntersecting || e.intersectionRatio < 0.15);
      },
      { threshold: [0, 0.15, 1], rootMargin: "-10px 0px 0px 0px" }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [overHero]);

  // закрывать мобильное меню при клике по ссылке
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={[
        styles.nav,
        overHero ? styles.onHero : "",
        solid ? styles.solid : "",
      ].join(" ")}
    >
      <button
        type="button"
        className={`${styles.menuButton} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span></span><span></span><span></span>
      </button>

      <ul className={`${styles.navList} ${menuOpen ? styles.open : ""}`}>
        <li>
          <Link
            href="/"
            locale={router.locale}
            aria-current={isActive("/") ? "page" : undefined}
            onClick={closeMenu}
          >
            {t("home")}
          </Link>
        </li>
        <li>
          <Link
            href="/article"
            locale={router.locale}
            aria-current={isActive("/article") ? "page" : undefined}
            onClick={closeMenu}
          >
            {t("button1")}
          </Link>
        </li>
        <li>
          <Link
            href="/event"
            locale={router.locale}
            aria-current={isActive("/event") ? "page" : undefined}
            onClick={closeMenu}
          >
            {t("button2")}
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            locale={router.locale}
            aria-current={isActive("/contact") ? "page" : undefined}
            onClick={closeMenu}
          >
            {t("button3")}
          </Link>
        </li>
      </ul>

      <div className={styles.toggleGroup}>
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <div
        className={`${styles.menuOverlay} ${menuOpen ? styles.open : ""}`}
        onClick={closeMenu}
      />
    </nav>
  );
};

export default Header;

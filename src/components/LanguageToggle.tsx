"use client";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import styles from "@/styles/languageToggle.module.css";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const router = useRouter();

  const changeLanguage = (lang: "ru" | "de") => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
      router.push(router.pathname, router.asPath, { locale: lang });
    }
  };

  return (
    <div className={styles.toggleWrapper}>
      <button
        className={`${styles.circle} ${i18n.language === "de" ? styles.active : styles.inactive}`}
        onClick={() => changeLanguage("de")}
      >
        DE
      </button>
      <button
        className={`${styles.circle} ${i18n.language === "ru" ? styles.active : styles.inactive}`}
        onClick={() => changeLanguage("ru")}
      >
        RU
      </button>
    </div>
  );
};

export default LanguageToggle;


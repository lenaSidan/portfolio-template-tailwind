"use client";
import styles from "@/styles/footer.module.css";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
  const { t, i18n } = useTranslation("common");
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link href="/about" locale={router.locale}>
          {t("about")}
        </Link>
        <Link href="/contact" locale={router.locale}>
          {t("contact")}
        </Link>
        <Link href="/impressum" locale={router.locale}>
          {t("impressum")}
        </Link>
        <Link href="/privacy" locale={router.locale}>
          {t("privacyPolicy")}
        </Link>
      </div>

  

      <p className={styles.copy}>
        © {new Date().getFullYear()} {t("allRightsReserved")}
      </p>
    </footer>
  );
};

export default Footer;

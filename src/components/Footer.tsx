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
      <nav className={styles.links} aria-label={t("footerNav") as string}>
        <Link href="/about-project" locale={router.locale}>
          {t("project")}
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
      </nav>

      <p className={styles.copy}>
        © {new Date().getFullYear()} {t("allRightsReserved")}
      </p>
    </footer>
  );
};

export default Footer;

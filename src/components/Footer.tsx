"use client";
import styles from "@/styles/footer.module.css";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  // Нормализация пути: убираем локаль, query/хэш и завершающий слэш
  const stripLocale = (p: string) => p.replace(/^\/(ru|de)(?=\/|$)/, "");
  const normalize = (p: string) =>
    stripLocale(p.split(/[?#]/)[0]).replace(/\/+$/, "") || "/";

  const current = normalize(router.asPath);
  const isActive = (href: string) => {
    const target = normalize(href);
    return current === target || current.startsWith(target + "/");
  };

  return (
    <footer className={styles.footer}>
      <nav className={styles.links} aria-label={t("footerNav") as string}>
        <Link
          href="/about-project"
          locale={router.locale}
          aria-current={isActive("/about-project") ? "page" : undefined}
        >
          {t("project")}
        </Link>

        <Link
          href="/contact"
          locale={router.locale}
          aria-current={isActive("/contact") ? "page" : undefined}
        >
          {t("contact")}
        </Link>

        <Link
          href="/impressum"
          locale={router.locale}
          aria-current={isActive("/impressum") ? "page" : undefined}
        >
          {t("impressum")}
        </Link>

        <Link
          href="/privacy-policy"
          locale={router.locale}
          aria-current={isActive("/privacy-policy") ? "page" : undefined}
        >
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

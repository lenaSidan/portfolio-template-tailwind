"use client";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const { t, i18n } = useTranslation("common");
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">{t("home")}</Link>
        </li>
        <li>
          <Link href="/article" locale={router.locale}>
            {t("articles")}
          </Link>
        </li>
        <li>
          <Link href="/about">{t("about")}</Link>
        </li>
      </ul>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => changeLanguage("ru")}>🇷🇺 RU</button>
        <button onClick={() => changeLanguage("de")}>🇩🇪 DE</button>
      </div>
    </nav>
  );
};

export default Header;

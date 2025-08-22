import ArticlesList from "@/components/ArticlesList"; // если у тебя компонент называется ArticleList — см. примечание ниже
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/articlesIndex.module.css";

export default function AllArticlesPage() {
  const { locale } = useRouter();
  const lang = locale === "de" ? "de" : "ru";

  return (
    <>
      <Head>
        <title>{lang === "ru" ? "Все статьи" : "Alle Artikel"}</title>
      </Head>

      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
          {lang === "ru" ? "Все статьи" : "Alle Artikel"}
        </h1>

        <ArticlesList />

        <p className={styles.back}>
          <a href="/">{lang === "ru" ? "← Назад на главную" : "← Zurück zur Startseite"}</a>
        </p>
      </main>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "ru", ["common"])),
  },
});

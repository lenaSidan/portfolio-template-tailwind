import ArticlesList from "@/src/components/ArticlesList";
import Header from "@/src/components/Header";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";

export default function AllArticlesPage() {
    const { locale } = useRouter();
  return (
    <>
      <Head>
        <title>Все статьи | Metalwind</title>
      </Head>
      <Header />
      <main style={{ padding: "2rem" }}>
        <ArticlesList />
        <a href="/">{locale === "ru" ? "← Назад на главную" : "← Zurück zur Startseite"}</a>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "ru", ["common"])),
    },
  };
};

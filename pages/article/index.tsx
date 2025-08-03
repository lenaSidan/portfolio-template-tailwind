import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import Header from "@/src/components/Header";
import ArticlesList from "@/src/components/ArticlesList";

export default function AllArticlesPage() {
  return (
    <>
      <Head>
        <title>Все статьи | Metalwind</title>
      </Head>
      <Header />
      <main style={{ padding: "2rem" }}>
        <ArticlesList />
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

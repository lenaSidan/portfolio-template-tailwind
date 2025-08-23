import Head from "next/head";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createClient } from "next-sanity";
import { useRouter } from "next/router";
import styles from "@/styles/aboutProjectIndex.module.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutProject from "@/components/AboutProject";
import { aboutProjectQuery } from "@/sanity/queries/aboutProject";

type ML = { ru?: string; de?: string };
type ProjectData = {
  title: ML;
  text?: ML;
  ctaPrimary?: { label?: ML; href?: string };
} | null;

export default function AboutProjectPage({ aboutProject }: { aboutProject: ProjectData }) {
  const { locale } = useRouter();
  const lang = (locale === "de" ? "de" : "ru") as "ru" | "de";

  return (
    <>
      <Head>
        <title>{lang === "ru" ? "О проекте" : "Über das Projekt"}</title>
      </Head>

 <div className={styles.page}>
      <Header />
        <main className={styles.main}>
          <h1 className={styles.title}>
          {lang === "ru" ? "О проекте" : "Über das Projekt"}
        </h1>
        {aboutProject ? (
          <AboutProject aboutProject={aboutProject} />
        ) : (
          <p>{lang === "ru" ? "Раздел пока пуст." : "Dieser Bereich ist noch leer."}</p>
        )}

        <p className={styles.back}>
          <a href="/">{lang === "ru" ? "← Назад на главную" : "← Zurück zur Startseite"}</a>
        </p>
      </main>
      <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
    useCdn: true,
  });

  const aboutProject = await client.fetch(aboutProjectQuery);

  return {
    props: {
      aboutProject: aboutProject ?? null,
      ...(await serverSideTranslations(locale ?? "ru", ["common"])),
    },
    revalidate: 60,
  };
};
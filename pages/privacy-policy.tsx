import styles from "@/styles/aboutProjectIndex.module.css";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createClient } from "next-sanity";
import Head from "next/head";
import { useRouter } from "next/router";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import { privacyPolicyQuery } from "@/sanity/queries/privacy-policy";

type ML = { ru?: string; de?: string };
type PolicyData = {
  title: ML;
  text?: ML;
  ctaPrimary?: { label?: ML; href?: string };
} | null;

export default function PrivacyPolicyPage({ privacyPolicy }: { privacyPolicy: PolicyData }) {
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
          <h1 className={styles.title}>{lang === "ru" ? "О проекте" : "Über das Projekt"}</h1>
          {privacyPolicy ? (
            <PrivacyPolicy privacyPolicy={privacyPolicy} />
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

  const privacyPolicy = await client.fetch(privacyPolicyQuery);

  return {
    props: {
      privacyPolicy: privacyPolicy ?? null,
      ...(await serverSideTranslations(locale ?? "ru", ["common"])),
    },
    revalidate: 60,
  };
};

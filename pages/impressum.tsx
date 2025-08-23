import Head from "next/head";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createClient } from "next-sanity";
import { useRouter } from "next/router";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Impressum from "@/components/Impressum";
import { impressumQuery } from "@/sanity/queries/impressum";
import styles from "@/styles/aboutProjectIndex.module.css";

type ML = { ru?: string; de?: string };
type ImpressumData = {
  title: ML;
  text?: ML;
  ctaPrimary?: { label?: ML; href?: string };
  _updatedAt: string;
} | null;

export default function ImpressumPage({ impressum }: { impressum: ImpressumData }) {
  const { locale } = useRouter();
  const lang = (locale === "de" ? "de" : "ru") as "ru" | "de";

  const pageTitle = lang === "ru" ? "Impressum (Правовая информация)" : "Impressum";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <h1 className={styles.title}>{pageTitle}</h1>

          {impressum ? (
            // ⬇️ ПЕРЕДАЁМ ДОКУМЕНТ В КОМПОНЕНТ
            <Impressum doc={impressum} />
          ) : (
            <p>{lang === "ru" ? "Раздел пока пуст." : "Dieser Bereich ist noch leer."}</p>
          )}

          <p className={styles.back}>
            <Link href="/" locale={locale}>
              {lang === "ru" ? "← Назад на главную" : "← Zurück zur Startseite"}
            </Link>
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

  const doc = await client.fetch(impressumQuery);

  return {
    props: {
      // ⬇️ возвращаем в нужный проп
      impressum: doc ?? null,
      ...(await serverSideTranslations(locale ?? "ru", ["common"])),
    },
    revalidate: 60,
  };
};

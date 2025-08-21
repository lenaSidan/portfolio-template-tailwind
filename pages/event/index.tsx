import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import EventsList from "@/components/EventsList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "@/styles/eventsIndex.module.css";

export default function AllEventsPage() {
  const { locale } = useRouter();
  const lang = locale === "de" ? "de" : "ru";

  return (
    <>
      <Header />
      <Head>
        <title>{lang === "ru" ? "Мероприятия" : "Veranstaltungen"}</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{lang === "ru" ? "Все мероприятия" : "Alle Veranstaltungen"}</h1>

        <EventsList />

        <p className={styles.back}>
          <Link href="/" locale={locale}>
            {lang === "ru" ? "← Назад на главную" : "← Zurück zur Startseite"}
          </Link>
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

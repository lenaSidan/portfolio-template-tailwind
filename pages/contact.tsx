import styles from "@/styles/aboutProjectIndex.module.css";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createClient } from "next-sanity";
import Head from "next/head";
import { useRouter } from "next/router";

import ContactView from "@/components/ContactView";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { contactPageQuery } from "@/sanity/queries/contactPage";

type ContactData = any | null;

export default function ContactPage({ contact }: { contact: ContactData }) {
  const { locale } = useRouter();
  const lang = locale === "de" ? "de" : "ru";

  return (
    <>
      <Head>
        <title>{lang === "ru" ? "Контакты" : "Kontakt"}</title>
      </Head>
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          {contact ? <ContactView doc={contact} /> : <p>{lang === "ru" ? "Раздел пуст." : "Bereich ist leer."}</p>}
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

  const contact = await client.fetch(contactPageQuery);

  return {
    props: {
      contact: contact ?? null,
      ...(await serverSideTranslations(locale ?? "ru", ["common"])),
    },
    revalidate: 60,
  };
};

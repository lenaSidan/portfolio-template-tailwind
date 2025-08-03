import EventsList from "@/src/components/EventsList";
import Header from "@/src/components/Header";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";


export default function AllEventsPage() {
  const { locale } = useRouter();
  return (
    <>
      <Head>
        <title>{locale === "ru" ? "Мероприятия" : "Events"}</title>
      </Head>
      <Header />
      <main style={{ padding: "2rem" }}>
        <EventsList />
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

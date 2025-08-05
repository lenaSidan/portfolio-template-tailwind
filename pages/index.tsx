import FeaturedArticleBlock from "@/src/components/FeaturedArticleBlock";
import FeaturedEventBlock from "@/src/components/FeaturedEventBlock";
import Header from "@/src/components/Header";
import Intro from "@/src/components/Intro";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createClient } from "next-sanity";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Footer from "@/src/components/Footer";
import styles from "@/styles/Home.module.css"

type IntroData = {
  _id: string;
  title: { ru: string; de: string };
  text: { ru: string; de: string };
};

type FeaturedEvent = {
  title: { ru: string; de: string };
  date: { ru: string; de: string };
  location: { ru: string; de: string };
  summary: { ru: string; de: string };
  image?: {
    asset: { _ref: string; _type: "reference" };
    alt?: { ru?: string; de?: string };
  };
};

type FeaturedArticle = {
  title: { ru: string; de: string };
  summary: { ru: string; de: string };
  image?: {
    asset: { _ref: string; _type: "reference" };
    alt?: { ru?: string; de?: string };
  };
};

export default function Home({
  intro,
  featuredEvent,
  featuredArticle,
}: {
  intro: IntroData;
  featuredEvent: FeaturedEvent;
  featuredArticle: FeaturedArticle;
}) {
  const { locale } = useRouter();
  const lang = locale === "de" ? "de" : "ru";
   const { t, i18n } = useTranslation("common");
  return (
    <>
      <Header />
      <main  className={styles.mainContent }>
        <h1>{t("siteTitle")}</h1>
        <Intro intro={intro} />
        <FeaturedArticleBlock article={featuredArticle} lang={lang} />
        <FeaturedEventBlock event={featuredEvent} lang={lang} />
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
    useCdn: true,
  });

  const [rawIntro, rawEvent, rawArticle] = await Promise.all([
    client.fetch(`*[_type == "intro"][0]`),
    client.fetch(`*[_type == "event" && featuredOnHome == true][0]`),
    client.fetch(`*[_type == "article" && featuredOnHome == true][0]`),
  ]);

  return {
    props: {
      intro: JSON.parse(JSON.stringify(rawIntro)),
      featuredEvent: JSON.parse(JSON.stringify(rawEvent)),
      featuredArticle: JSON.parse(JSON.stringify(rawArticle)),
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
    },
  };
}

import FeaturedArticleBlock from "@/components/FeaturedArticleBlock";
import FeaturedEventBlock from "@/components/FeaturedEventBlock";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import styles from "@/styles/home.module.css";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createClient } from "next-sanity";
import { useRouter } from "next/router";

type IntroData = {
  _id: string;
  title: { ru: string; de: string };
  text: { ru: string; de: string };
};

type ML = { ru?: string; de?: string };

type FeaturedEvent = {
  _id: string;
  title: ML;
  summary?: ML;
  start?: string;
  end?: string;
  timezone?: string;
  venue?: { name?: ML; city?: string | ML };
  cta?: { href?: string; label?: ML };
  image?: {
    asset?: { _ref?: string; _type?: "reference"; url?: string; _id?: string };
    alt?: ML;
  };
  slug?: string; 
};

type FeaturedArticle = {
  title: ML;
  summary: ML;
  image?: {
    asset: { _ref: string; _type: "reference" };
    alt?: ML;
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
      <Header overHero />
      <main className={styles.mainContent}>
        {/* <h1>{t("siteTitle")}</h1> */}
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

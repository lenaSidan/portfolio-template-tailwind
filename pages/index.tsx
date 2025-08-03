import Header from "@/src/components/Header";
import Intro from "@/src/components/Intro";
import { urlFor } from "@/src/sanity/lib/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createClient } from "next-sanity";
import { useRouter } from "next/router";

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
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: {
      ru?: string;
      de?: string;
    };
  };
};
type FeaturedArticle = {
  title: { ru: string; de: string };
  summary: { ru: string; de: string };
  image?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: {
      ru?: string;
      de?: string;
    };
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

  return (
    <>
      <Header />
      <main>
        <h1>Welcome to the site!</h1>
        <Intro intro={intro} />
        <div>
          {featuredArticle && (
            <div>
              <h2>{featuredArticle.title[lang]}</h2>
              {featuredArticle.image && (
                <img src={urlFor(featuredArticle.image).width(1200).url()} alt={featuredArticle.image.alt?.[lang] || ""} />
              )}
              <p>{featuredArticle.summary[lang]}</p>
              <a href="/article">{lang === "ru" ? "Все статьи →" : "Alle Articles →"}</a>
            </div>
          )}
        </div>
        <div>
          {featuredEvent && (
            <div>
              <h2>{featuredEvent.title[lang]}</h2>
              {featuredEvent.image && (
                <img src={urlFor(featuredEvent.image).width(1200).url()} alt={featuredEvent.image.alt?.[lang] || ""} />
              )}
              <p>{featuredEvent.date[lang]}</p>
              <p>{featuredEvent.location[lang]}</p>
              <p>{featuredEvent.summary[lang]}</p>
              <a href="/event">{lang === "ru" ? "Все мероприятия →" : "Alle Veranstaltungen →"}</a>
            </div>
          )}
        </div>
      </main>
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
      ...(await serverSideTranslations(locale ?? "ru", ["common"])),
    },
  };
}

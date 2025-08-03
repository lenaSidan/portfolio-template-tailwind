import ArticleList from "@/src/components/ArticlesList";
import Header from "@/src/components/Header";
import Intro from "@/src/components/Intro";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createClient } from "next-sanity";

type IntroData = {
  _id: string;
  title: {
    ru: string;
    de: string;
  };
  text: {
    ru: string;
    de: string;
  };
};

export default function Home({ intro }: { intro: IntroData }) {
  return (
    <>
      <Header />
      <main>
        <h1>Welcome to the site!</h1>
        <Intro intro={intro} />
        <ArticleList />
      </main>
      {/* <Footer /> */}
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

  const rawIntro = await client.fetch(`*[_type == "intro"][0]`);
  const intro = JSON.parse(JSON.stringify(rawIntro)); // <-- ✅ фикс

  return {
    props: {
      intro,
      ...(await serverSideTranslations(locale ?? "ru", ["common"])),
    },
  };
}

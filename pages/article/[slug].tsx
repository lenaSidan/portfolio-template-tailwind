import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

type Article = {
  _id: string;
  title: { ru: string; de: string };
  content: { ru: any; de: any };
  slug: { current: string };
  image?: { asset?: { _ref: string }; alt?: string };
};

export default function ArticlePage({ article }: { article: Article }) {
  const { locale } = useRouter();
  const lang = locale === "de" ? "de" : "ru";

  return (
    <main>
      <h1>{article.title[lang]}</h1>
      {article.image?.asset && (
        <img src={urlFor(article.image).url()} alt={article.image.alt || ""} style={{ maxWidth: "100%" }} />
      )}
      <PortableText value={article.content[lang]} />
      <a href="/article">{lang === "ru" ? "← Назад" : "← Zurück"}</a>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles: Article[] = await client.fetch(`*[_type == "article"]{ slug }`);
  const paths = articles.flatMap((article) => [
    { params: { slug: article.slug.current, locale: "ru" } },
    { params: { slug: article.slug.current, locale: "de" } },
  ]);

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const article = await client.fetch(`*[_type == "article" && slug.current == $slug][0]`, { slug });

  if (!article) return { notFound: true };

  return {
    props: {
      article,
      ...(await serverSideTranslations(locale ?? "ru", ["common"])),
    },
    revalidate: 60,
  };
};

import { PortableText, PortableTextComponents } from "@portabletext/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { groq } from "next-sanity";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import styles from "@/styles/articlePage.module.css";

type ML = { ru?: string; de?: string };

type GalleryItem = {
  asset?: { url?: string };
  alt?: string | ML;
  caption?: string | ML;
};

type ArticleDoc = {
  _id: string;
  title: ML;
  content?: { ru?: any; de?: any };
  image?: { asset?: { url?: string }; alt?: string | ML };
  gallery?: GalleryItem[];
  slug: string;
};

const oneArticleQuery = groq`
*[_type == "article" && slug.current == $slug][0]{
  _id,
  title,
  content,
  image{ asset->{url}, alt },
  gallery[]{ asset->{url}, alt, caption },
  "slug": slug.current
}
`;

const slugsQuery = groq`
*[_type == "article" && defined(slug.current)]{ "slug": slug.current }
`;

export default function ArticlePage({ article }: { article: ArticleDoc }) {
  const { locale } = useRouter();
  const lang = (locale === "de" ? "de" : "ru") as "ru" | "de";

  const title = article.title?.[lang] ?? article.title?.ru ?? article.title?.de ?? "";

  const heroUrl = article.image?.asset?.url || (article.image ? urlFor(article.image).width(1600).url() : "");

  // Компоненты PortableText с поддержкой картинок внутри текста
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        const src = value?.asset?.url || (value ? urlFor(value).width(1400).url() : "");
        const alt = (typeof value?.alt === "string" ? value.alt : value?.alt?.[lang]) || "";
        const caption = (typeof value?.caption === "string" ? value.caption : value?.caption?.[lang]) || "";

        if (!src) return null;
        return (
          <figure className={styles.ptImage}>
            <img src={src} alt={alt} loading="lazy" decoding="async" />
            {caption && <figcaption>{caption}</figcaption>}
          </figure>
        );
      },
    },
    block: {
      h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
      h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
      normal: ({ children }) => <p className={styles.p}>{children}</p>,
      blockquote: ({ children }) => <blockquote className={styles.blockquote}>{children}</blockquote>,
    },
    list: {
      bullet: ({ children }) => <ul className={styles.ul}>{children}</ul>,
      number: ({ children }) => <ol className={styles.ol}>{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li className={styles.li}>{children}</li>,
      number: ({ children }) => <li className={styles.li}>{children}</li>,
    },
  };

  return (
    <>
      <Header />
      <main className={styles.container}>
        <Head>
          <title>{title}</title>
        </Head>

        <h1 className={styles.title}>{title}</h1>

        {heroUrl && (
          <div className={styles.imageWrap}>
            <img
              className={styles.image}
              src={heroUrl}
              alt={
                (typeof article.image?.alt === "string" ? article.image?.alt : (article.image?.alt as ML)?.[lang]) || ""
              }
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        {/* Галерея (если заполнена) */}
        {article.gallery?.length ? (
          <div className={styles.gallery}>
            {article.gallery.map((g, i) => {
              const src = g.asset?.url;
              if (!src) return null;
              const alt = (typeof g.alt === "string" ? g.alt : (g.alt as ML)?.[lang]) || "";
              const caption = (typeof g.caption === "string" ? g.caption : (g.caption as ML)?.[lang]) || "";
              return (
                <figure className={styles.galleryItem} key={i}>
                  <img src={src} alt={alt} loading="lazy" decoding="async" />
                  {caption && <figcaption>{caption}</figcaption>}
                </figure>
              );
            })}
          </div>
        ) : null}

        {/* Основной текст */}
        {article.content?.[lang] && (
          <article className={styles.content}>
            <PortableText value={article.content[lang]} components={components} />
          </article>
        )}

        {/* Кнопки действий */}
        <div className={styles.actions}>
          <Link href="/article" locale={locale} className={`${styles.btn} ${styles.btnLight}`}>
            {lang === "ru" ? "← Все статьи" : "← Alle Artikel"}
          </Link>
          <Link href="/" locale={locale} className={`${styles.btn} ${styles.btnGhost}`}>
            {lang === "ru" ? "← Главная" : "← Startseite"}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const rows: { slug: string }[] = await client.fetch(slugsQuery);
  const paths = (locales ?? []).flatMap((loc) => rows.map(({ slug }) => ({ params: { slug }, locale: loc })));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = Array.isArray(params?.slug) ? params!.slug[0] : (params?.slug as string);
  const article = await client.fetch(oneArticleQuery, { slug });
  if (!article) return { notFound: true };

  return {
    props: {
      article,
      ...(await serverSideTranslations(locale ?? "ru", ["common"])),
    },
    revalidate: 60,
  };
};

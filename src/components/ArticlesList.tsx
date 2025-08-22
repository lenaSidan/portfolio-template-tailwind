import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { articlesQuery } from "@/sanity/queries/articles";

import styles from "@/styles/articleList.module.css";

type ML = { ru?: string; de?: string };

type Article = {
  _id: string;
  title: ML;
  summary: ML;
  slug: { current: string };
  image?: {
    asset?: { _ref?: string };
    alt?: string;
  };
};

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const { locale } = useRouter();
  const lang = (locale === "de" ? "de" : "ru") as "ru" | "de";

  useEffect(() => {
    client.fetch(articlesQuery).then((data) => setArticles(Array.isArray(data) ? data : []));
  }, []);

  return (
    <section className={styles.section}>

      <div className={styles.grid}>
        {articles.map((article) => {
          const slug = article.slug?.current;
          const title = article.title?.[lang] ?? article.title?.ru ?? article.title?.de ?? "";
          const summary = article.summary?.[lang] ?? article.summary?.ru ?? article.summary?.de ?? "";

          const imgUrl = article.image?.asset
            ? urlFor(article.image).width(800).height(520).fit("crop").url()
            : "";

          return (
            <article key={article._id} className={styles.card}>
              {imgUrl && (
                <div className={styles.imageWrap}>
                  <img
                    className={styles.image}
                    src={imgUrl}
                    alt={article.image?.alt || ""}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}

              <div className={styles.body}>
                <h3 className={styles.title}>{title}</h3>
                {summary && <p className={styles.summary}>{summary}</p>}

                {slug && (
                  <div className={styles.actions}>
                    <Link
                      href={`/article/${slug}`}
                      locale={locale}
                      className="btn btn-primary"
                      aria-label={lang === "ru" ? `Подробнее: ${title}` : `Mehr lesen: ${title}`}
                    >
                      {lang === "ru" ? "Подробнее" : "Mehr lesen"} →
                    </Link>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

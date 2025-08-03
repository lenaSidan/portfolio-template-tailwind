import { client } from "@/src/sanity/lib/client";
import { urlFor } from "@/src/sanity/lib/image";
import { articlesQuery } from "@/src/sanity/queries/articles";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Article = {
  _id: string;
  title: { ru: string; de: string };
  summary: { ru: string; de: string };
  slug: { current: string };
  image?: {
    asset?: {
      _ref: string;
    };
    alt?: string;
  };
};

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    client.fetch(articlesQuery).then((data) => setArticles(data));
  }, []);

  return (
    <section>
      <h2>{locale === "ru" ? "Статьи" : "Artikel"}</h2>
      {articles.map((article) => {
        const slug = article.slug?.current;
        return (
          <div key={article._id} style={{ marginBottom: "2rem" }}>
            {article.image && (
              <img
                src={urlFor(article.image).width(800).url()}
                alt={article.image.alt || ""}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            )}
            <h3>{article.title[locale as "ru" | "de"]}</h3>
            <p>{article.summary[locale as "ru" | "de"]}</p>
            {slug && (
              <Link
                href={`/${locale}/article/${slug}`}
                locale={locale}
                style={{
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  background: "#ccc",
                  borderRadius: "4px",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                {locale === "ru" ? "Подробнее" : "Mehr lesen"}
              </Link>
            )}
          </div>
        );
      })}
    </section>
  );
}

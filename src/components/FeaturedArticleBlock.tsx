import { urlFor } from "@/sanity/lib/image";
import styles from "@/styles/featuredArticleBlock.module.css";

export default function FeaturedArticleBlock({
  article,
  lang,
}: {
  article: any;
  lang: "ru" | "de";
}) {
  if (!article) return null;

  return (
    <div className={styles.articleBlock}>
      <h2>{article.title[lang]}</h2>
      {article.image && (
        <img
          src={urlFor(article.image).width(1200).url()}
          alt={article.image.alt?.[lang] || ""}
        />
      )}
      <p>{article.summary[lang]}</p>
      <a href="/article">
        {lang === "ru" ? "Все статьи →" : "Alle Artikel →"}
      </a>
    </div>
  );
}

import { urlFor } from "@/sanity/lib/image";
import styles from "@/styles/featuredArticleBlock.module.css";

export default function FeaturedArticleBlock({ article, lang }: { article: any; lang: "ru" | "de" }) {
  if (!article) return null;

  return (
    <section className={styles.articleBlock}>
      <h2 className={styles.title}>{article.title[lang]}</h2>
      <div className={styles.divider} />

      {article.image && (
        <div className={styles.imageWrap}>
          <img
            className={styles.image}
            src={urlFor(article.image).width(1200).url()}
            alt={article.image.alt?.[lang] || ""}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <p className={styles.summary}>{article.summary[lang]}</p>

      <a href="/article" className={styles.cta}>
        {lang === "ru" ? "Все статьи" : "Alle Artikel"} <span aria-hidden>→</span>
      </a>
    </section>
  );
}

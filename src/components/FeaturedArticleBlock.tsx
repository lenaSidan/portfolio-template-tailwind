import { urlFor } from "@/sanity/lib/image";
import styles from "@/styles/featuredArticleBlock.module.css";
import Link from "next/link";

const build = (img: any, w: number, fmt?: "webp" | "jpg") => {
  let b = urlFor(img)
    .width(w)
    .quality(fmt === "webp" ? 72 : 80);
  if (fmt === "webp") b = b.format("webp");
  return b.url();
};

export default function FeaturedArticleBlock({ article, lang }: { article: any; lang: "ru" | "de" }) {
  if (!article) return null;

  const hasImg = !!article.image?.asset?._ref;
  const smallWebp = hasImg ? build(article.image, 800, "webp") : "";
  const largeWebp = hasImg ? build(article.image, 1200, "webp") : "";
  const smallJpg = hasImg ? build(article.image, 800, "jpg") : "";
  const largeJpg = hasImg ? build(article.image, 1200, "jpg") : "";

  return (
    <section className={styles.featured}>
      <div className={styles.grid}>
        {hasImg && (
          <div className={styles.media}>
            <picture>
              <source media="(min-width: 1200px)" srcSet={largeWebp} type="image/webp" />
              <source media="(min-width: 1200px)" srcSet={largeJpg} />
              <source srcSet={smallWebp} type="image/webp" />
              <img
                className={styles.image}
                src={smallJpg}
                srcSet={`${smallJpg} 800w, ${largeJpg} 1200w`}
                sizes="(max-width:1200px) 92vw, 560px"
                alt={article.image.alt?.[lang] || ""}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        )}

        <div className={styles.content}>
          <span className={styles.kicker}>{lang === "ru" ? "Рекомендуем" : "Empfohlen"}</span>
          <h2 className={styles.title}>{article.title[lang]}</h2>
          <p className={styles.summary}>{article.summary[lang]}</p>

          <div className={styles.actions}>
            <Link href="/article" className={`${styles.btn} ${styles.btnLight}`}>
              {lang === "ru" ? "Все статьи" : "Alle Artikel"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

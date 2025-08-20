import { urlFor } from "@/sanity/lib/image";
import styles from "@/styles/featuredEventBlock.module.css";

export default function FeaturedEventBlock({
  event,
  lang,
}: {
  event: any;
  lang: "ru" | "de";
}) {
  if (!event) return null;

  const dateText = event.date?.[lang];
  const dateISO = event.dateISO || event.date?.iso || undefined;
  const place = event.location?.[lang];

  return (
    <section className={styles.eventBlock}>
      <h2 className={styles.title}>{event.title[lang]}</h2>
      <div className={styles.divider} />

      {event.image && (
        <div className={styles.imageWrap}>
          <img
            className={styles.image}
            src={urlFor(event.image).width(1200).url()}
            alt={event.image?.alt?.[lang] || ""}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      {(dateText || place) && (
        <div className={styles.meta}>
          {dateText && (
            <time className={styles.metaItem} dateTime={dateISO}>
              {dateText}
            </time>
          )}
          {place && <span className={styles.metaItem}>{place}</span>}
        </div>
      )}

      {event.summary?.[lang] && (
        <p className={styles.summary}>{event.summary[lang]}</p>
      )}

      <a href="/event" className={styles.cta}>
        {lang === "ru" ? "Все мероприятия" : "Alle Veranstaltungen"}
        <span aria-hidden> →</span>
      </a>
    </section>
  );
}

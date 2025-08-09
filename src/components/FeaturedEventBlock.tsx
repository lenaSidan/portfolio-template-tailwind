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

  return (
    <div className={styles.eventBlock}>
      <h2>{event.title[lang]}</h2>
      {event.image && (
        <img
          src={urlFor(event.image).width(1200).url()}
          alt={event.image.alt?.[lang] || ""}
        />
      )}
      <p>{event.date[lang]}</p>
      <p>{event.location[lang]}</p>
      <p>{event.summary[lang]}</p>
      <a href="/event">
        {lang === "ru" ? "Все мероприятия →" : "Alle Veranstaltungen →"}
      </a>
    </div>
  );
}          
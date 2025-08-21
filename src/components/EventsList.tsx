"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { eventsListQuery } from "@/sanity/queries/events";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/eventsList.module.css";

type ML = { ru?: string; de?: string };
type Venue = { name?: ML; city?: ML | string };
type Item = {
  _id: string;
  title: ML;
  summary?: ML;
  start?: string;
  end?: string;
  timezone?: string;
  venue?: Venue;
  image?: { asset?: { url?: string } };
  slug?: string;         // slug.current из GROQ мы кладём в alias "slug"
  date?: ML;             // legacy текстовое поле
  location?: ML;         // legacy
};

export default function EventsList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const { locale } = useRouter();
  const lang = (locale === "de" ? "de" : "ru") as "ru" | "de";

  useEffect(() => {
    let alive = true;
    setLoading(true);

    client
      .fetch(eventsListQuery)
      .then((res) => {
        if (!alive) return;
        setItems(Array.isArray(res) ? res : []);
      })
      .catch(() => {
        if (!alive) return;
        setItems([]);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  // дата/время одним понятным текстом
  const when = (e: Item): string | null => {
    if (!e.start) return e.date?.[lang] ?? null; // legacy подпорка
    const tz = e.timezone || "Europe/Berlin";
    const start = new Date(e.start);
    const end = e.end ? new Date(e.end) : null;

    const d = new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "ru-RU", {
      timeZone: tz,
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(start);

    const t = new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "ru-RU", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
    });

    return end ? `${d} • ${t.format(start)} — ${t.format(end)}` : `${d} • ${t.format(start)}`;
  };

  // заглушки
  if (loading) {
    return (
      <section className={styles.wrap}>
        <h2 className={styles.heading}>{lang === "ru" ? "События" : "Veranstaltungen"}</h2>
        <ul className={styles.list}>
          {[...Array(3)].map((_, i) => (
            <li key={i} className={`${styles.card} ${styles.skeleton}`} />
          ))}
        </ul>
      </section>
    );
  }

  if (!items.length) {
    return (
      <section className={styles.wrap}>
        <h2 className={styles.heading}>{lang === "ru" ? "События" : "Veranstaltungen"}</h2>
        <p className={styles.empty}>
          {lang === "ru" ? "Пока нет событий." : "Zurzeit keine Veranstaltungen."}
        </p>
      </section>
    );
  }

  return (
    <section className={styles.wrap}>
      <h2 className={styles.heading}>{lang === "ru" ? "События" : "Veranstaltungen"}</h2>

      <ul className={styles.list}>
        {items.map((event) => {
          const title = event.title?.[lang] ?? event.title?.ru ?? event.title?.de ?? "";
          const city =
            typeof event.venue?.city === "string"
              ? event.venue.city
              : (event.venue?.city?.[lang] ?? event.venue?.city?.ru ?? event.venue?.city?.de ?? "");

          const whenText = when(event);
          const summary = event.summary?.[lang] ?? "";

          const detailsHref = event.slug ? `/event/${event.slug}` : undefined;

          return (
            <li key={event._id} className={styles.card}>
              <div className={styles.cardBody}>
                <h3 className={styles.title}>{title}</h3>

                <ul className={styles.meta}>
                  {whenText && <li className={styles.chip}>{whenText}</li>}
                  {city && <li className={styles.chip}>{city}</li>}
                </ul>

                {summary && <p className={styles.summary}>{summary}</p>}

                {detailsHref && (
                  <Link
                    href={detailsHref}
                    locale={locale}
                    className={styles.more}
                    aria-label={lang === "ru" ? `Подробнее: ${title}` : `Mehr lesen: ${title}`}
                  >
                    {lang === "ru" ? "Подробнее" : "Mehr lesen"} →
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

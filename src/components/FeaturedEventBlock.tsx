"use client";

import { urlFor } from "@/sanity/lib/image";
import styles from "@/styles/featuredEventBlock.module.css";
import Link from "next/link";

type ML = { ru?: string; de?: string };

type EventVenue = {
  name?: ML;
  city?: string | ML; // может быть строкой или мультиязычным объектом
  address?: ML;
  mapUrl?: string;
  website?: string;
};

type FeaturedEvent = {
  _id: string;
  title: ML;
  summary?: ML;
  start?: string; // ISO
  end?: string; // ISO
  timezone?: string; // IANA
  venue?: EventVenue;
  cta?: { href?: string; label?: ML };
  image?: { asset?: { _id?: string; url?: string }; alt?: ML };
  slug?: string | { current?: string };
  // наследие:
  date?: ML;
  location?: ML;
};

export default function FeaturedEventBlock({ event, lang }: { event: FeaturedEvent | null; lang: "ru" | "de" }) {
  if (!event) return null;

  // ---------- ТЕКСТЫ ----------
  const title = event.title?.[lang] ?? event.title?.ru ?? event.title?.de ?? "";

  const summary = event.summary?.[lang] ?? event.summary?.ru ?? event.summary?.de ?? "";

  // ---------- ДАТА/ВРЕМЯ ----------
  const intlLocale = lang === "de" ? "de-DE" : "ru-RU";

  const whenText = (() => {
    if (!event.start) return event.date?.[lang] ?? null;

    const tz = event.timezone || "Europe/Berlin";
    const start = new Date(event.start);
    const end = event.end ? new Date(event.end) : null;

    const dateFmt = new Intl.DateTimeFormat(intlLocale, {
      timeZone: tz,
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const timeFmt = new Intl.DateTimeFormat(intlLocale, {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
    });

    const datePart = dateFmt.format(start);
    const timePart = end ? `${timeFmt.format(start)} — ${timeFmt.format(end)}` : timeFmt.format(start);

    return `${datePart} • ${timePart}`;
  })();

  // ---------- МЕСТО ----------
  const venueName = event.venue?.name?.[lang] ?? event.venue?.name?.ru ?? event.venue?.name?.de ?? null;

  const venueCity =
    typeof event.venue?.city === "string"
      ? event.venue.city
      : ((event.venue?.city as ML)?.[lang] ?? (event.venue?.city as ML)?.ru ?? (event.venue?.city as ML)?.de ?? "");

  const venueText = venueName
    ? venueCity
      ? `${venueName}, ${venueCity}`
      : venueName
    : (event.location?.[lang] ?? null);

  // ---------- CTA / ССЫЛКИ ----------
  const ctaHref = event.cta?.href || "";
  const ctaLabel = event.cta?.label?.[lang] || (lang === "de" ? "Kontakt" : "Контакт");

  const detailsHref = event.slug ? { pathname: "/event/[slug]", query: { slug: event.slug } } : undefined;

  // ---------- КАРТИНКА ----------
  const imgUrl = event.image ? urlFor(event.image).width(1280).height(960).fit("crop").url() : null;
  const imgAlt = event.image?.alt?.[lang] ?? "";

  const eyebrow = lang === "de" ? "Empfohlen" : "Рекомендуем";

  const slugStr = typeof event.slug === "string" ? event.slug : (event.slug as { current?: string })?.current || "";

  return (
    <section className={styles.band} aria-labelledby={`evt-${event._id}`}>
      <div className={styles.inner}>
        <div className={styles.colContent}>
          <div className={styles.eyebrow}>{eyebrow}</div>

          <h2 id={`evt-${event._id}`} className={styles.title}>
            {title}
          </h2>

          <ul className={styles.meta}>
            {whenText && <li className={styles.chip}>{whenText}</li>}
            {venueText && <li className={styles.chip}>{venueText}</li>}
          </ul>

          {summary && <p className={styles.summary}>{summary}</p>}

          <div className={styles.actions}>
            {ctaHref && (
              <Link href={ctaHref} className={`${styles.btn} ${styles.btnLight}`}>
                {ctaLabel}
              </Link>
            )}

            {slugStr && (
              <Link
                href={`/event/${slugStr}`} // ← даём готовую строку вместо объекта
                locale={lang} // 'ru' | 'de'
                className={`${styles.btn} ${styles.btnGhost}`}
                aria-label={lang === "ru" ? `Подробнее: ${title}` : `Mehr lesen: ${title}`}
              >
                {lang === "ru" ? "Подробнее" : "Mehr lesen"} →
              </Link>
            )}
          </div>
        </div>

        {imgUrl && (
          <div className={styles.colImage}>
            <img className={styles.image} src={imgUrl} alt={imgAlt} loading="lazy" decoding="async" />
          </div>
        )}
      </div>
    </section>
  );
}

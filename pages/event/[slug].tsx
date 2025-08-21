// pages/event/[slug].tsx
import { PortableText } from "@portabletext/react";
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
import styles from "@/styles/eventPage.module.css";

type ML = { ru?: string; de?: string };

type Venue = {
  name?: ML;
  city?: ML | string;
  address?: ML;
  mapUrl?: string;
  website?: string;
};

type EventDoc = {
  _id: string;
  title: ML;
  summary?: ML;
  content?: { ru?: any; de?: any };
  start?: string;
  end?: string;
  timezone?: string;
  venue?: Venue;
  image?: { asset?: { url?: string }; alt?: ML };
  slug: string;
  // legacy
  date?: ML;
  location?: ML;
};

const oneEventQuery = groq`
*[_type == "event" && slug.current == $slug][0]{
  _id, title, summary, content,
  start, end, timezone,
  venue,
  image{ asset->{url}, alt },
  "slug": slug.current,
  // legacy (на всякий случай)
  date, location
}
`;

const slugsQuery = groq`
*[_type == "event" && defined(slug.current)]{ "slug": slug.current }
`;

export default function EventPage({ event }: { event: EventDoc }) {
  const { locale } = useRouter();
  const lang = (locale === "de" ? "de" : "ru") as "ru" | "de";

  const title = event.title?.[lang] ?? event.title?.ru ?? event.title?.de ?? "";
  const summary = event.summary?.[lang] ?? event.summary?.ru ?? event.summary?.de ?? "";

  // когда
  const when = (() => {
    if (!event.start) return event.date?.[lang] ?? null; // legacy
    const tz = event.timezone || "Europe/Berlin";
    const start = new Date(event.start);
    const end = event.end ? new Date(event.end) : null;

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
  })();

  // где
  const venueName = event.venue?.name?.[lang] ?? event.venue?.name?.ru ?? event.venue?.name?.de ?? "";
  const venueCity =
    typeof event.venue?.city === "string"
      ? event.venue?.city
      : (event.venue?.city?.[lang] ?? event.venue?.city?.ru ?? event.venue?.city?.de ?? "");
  const venueLine =
    venueName || venueCity ? [venueName, venueCity].filter(Boolean).join(", ") : (event.location?.[lang] ?? ""); // legacy запасной вариант

  // изображение
  const imgUrl = event.image?.asset?.url || (event.image ? urlFor(event.image).width(1600).url() : "");
  const imgAlt = event.image?.alt?.[lang] ?? "";

  return (
    <>
      <Header />
      <main className={styles.container}>
        <Head>
          <title>{title}</title>
        </Head>

        <h1 className={styles.title}>{title}</h1>

        <ul className={styles.meta}>
          {when && <li className={styles.chip}>{when}</li>}
          {venueLine && <li className={styles.chip}>{venueLine}</li>}
        </ul>

        {imgUrl && (
          <div className={styles.imageWrap}>
            <img className={styles.image} src={imgUrl} alt={imgAlt} loading="lazy" decoding="async" />
          </div>
        )}

        {summary && <p className={styles.summary}>{summary}</p>}

        {event.content?.[lang] && (
          <div className={styles.content}>
            <PortableText value={event.content[lang]} />
          </div>
        )}
        <div className={styles.actions}>
          <div className={styles.back}>
            <Link href="/event" locale={locale} className={`${styles.btn} ${styles.btnLight}`}>
              {lang === "ru" ? "← Все мероприятия" : "← Alle Veranstaltungen"}
            </Link>
          </div>
          <div className={styles.mainPage}>
            <Link href="/" locale={locale} className={`${styles.btn} ${styles.btnGhost}`}>
              {lang === "ru" ? "← Главная" : "← Startseite"}
            </Link>
          </div>
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
  const event = await client.fetch(oneEventQuery, { slug });
  if (!event) return { notFound: true };

  return {
    props: {
      event,
      ...(await serverSideTranslations(locale ?? "ru", ["common"])),
    },
    revalidate: 60,
  };
};

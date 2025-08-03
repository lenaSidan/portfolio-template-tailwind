import { client } from "@/src/sanity/lib/client";
import { urlFor } from "@/src/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

type EventItem = {
  _id: string;
  title: { ru: string; de: string };
  date: { ru: string; de: string };
  location: { ru: string; de: string };
  summary: { ru: string; de: string };
  content: { ru: any; de: any };
  image?: {
    asset?: { _ref: string };
    alt?: { ru: string; de: string };
  };
  slug: { current: string };
};

type Props = {
  event: EventItem;
};

export default function EventPage({ event }: Props) {
  const { locale } = useRouter();
  const lang = locale === "de" ? "de" : "ru";

  return (
    <main>
      <h1>{event.title[lang]}</h1>
      {event.image && <img src={urlFor(event.image).width(1200).url()} alt={event.image.alt?.[lang] || ""} />}
      
      <p>
        <strong>{event.date[lang]}</strong>
      </p>
      <p>{event.location[lang]}</p>

      <PortableText value={event.content[lang]} />
      <a href="/event">{lang === "ru" ? "← Назад" : "← Zurück"}</a>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events: EventItem[] = await client.fetch(`*[_type == "event"]{ slug }`);
  const paths = events.flatMap((event) => [
    { params: { slug: event.slug.current, locale: "ru" } },
    { params: { slug: event.slug.current, locale: "de" } },
  ]);

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const event = await client.fetch(`*[_type == "event" && slug.current == $slug][0]`, { slug });

  if (!event) return { notFound: true };

  return {
    props: {
      event,
      ...(await serverSideTranslations(locale ?? "ru", ["common"])),
    },
    revalidate: 60,
  };
};

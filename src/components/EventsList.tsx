import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { urlFor } from "../sanity/lib/image";
import { eventsQuery } from "../sanity/queries/events";

type EventItem = {
  _id: string;
  title: { ru: string; de: string };
  date: { ru: string; de: string };
  location: { ru: string; de: string };
  summary: { ru: string; de: string };
  slug: { current: string };
  image?: {
    asset?: {
      _ref: string;
    };
    alt?: { ru: string; de: string };
  };
};

type Props = {
  events: EventItem[];
};

export default function EventsList() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    client.fetch(eventsQuery).then((data) => setEvents(data));
  }, []);

  return (
    <section>
      <h2>{locale === "ru" ? "События" : "Veranstaltungen"}</h2>
      {events.map((event) => {
        const slug = event.slug?.current;
        return (
          <div key={event._id}>
            {event.image && (
              <img src={urlFor(event.image).width(800).url()} alt={event.image.alt?.[locale as "ru" | "de"] || ""} />
            )}
            <h3>{event.title[locale as "ru" | "de"]}</h3>
            <p>{event.date[locale as "ru" | "de"]}</p>
            <p>{event.location[locale as "ru" | "de"]}</p>
            <p>{event.summary[locale as "ru" | "de"]}</p>

            {slug && (
              <Link href={`/${locale}/event/${slug}`} locale={locale}>
                {locale === "ru" ? "Подробнее" : "Mehr lesen"}
              </Link>
            )}
          </div>
        );
      })}
    </section>
  );
}

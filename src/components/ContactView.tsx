"use client";

import styles from "@/styles/contactView.module.css";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { useRouter } from "next/router";

type ML<T = any> = { ru?: T; de?: T };

type ContactDoc = {
  title: ML<string>;
  intro?: ML<any>;
  address?: {
    street?: ML<string>;
    city?: ML<string>;
    postalCode?: string;
    country?: ML<string>;
    mapUrl?: string;
  };
  email?: string;
  phone?: string;
  hours?: ML<string>;
  persons?: {
    name: string;
    role?: ML<string>;
    email?: string;
    phone?: string;
    photo?: { asset?: { url?: string }; alt?: string };
  }[];
  social?: { title?: string; url?: string }[];
  ctaPrimary?: { label?: ML<string>; href?: string };
  gdpr?: ML<any>;
  _updatedAt?: string;
};

export default function ContactView({ doc }: { doc: ContactDoc }) {
  const { locale = "ru", asPath } = useRouter();
  const l = (locale === "de" ? "de" : "ru") as "ru" | "de";

  const title = doc.title?.[l] ?? doc.title?.ru ?? doc.title?.de ?? "Kontakt";
  const introBlocks = doc.intro?.[l];

  const street = doc.address?.street?.[l] ?? doc.address?.street?.ru ?? doc.address?.street?.de ?? "";
  const city = doc.address?.city?.[l] ?? doc.address?.city?.ru ?? doc.address?.city?.de ?? "";
  const country = doc.address?.country?.[l] ?? doc.address?.country?.ru ?? doc.address?.country?.de ?? "";
  const addressLine = [street, [doc.address?.postalCode, city].filter(Boolean).join(" "), country]
    .filter(Boolean)
    .join(", ");

  const hours = doc.hours?.[l] ?? "";
  const lastUpdated =
    doc._updatedAt &&
    new Date(doc._updatedAt).toLocaleDateString(l === "de" ? "de-DE" : "ru-RU", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

  /** ---------- УМНЫЙ CTA ---------- */

  const rawHref = (doc.ctaPrimary?.href || "").trim();
  const label =
    doc.ctaPrimary?.label?.[l] ??
    (doc.email ? (l === "ru" ? "Написать" : "Schreiben") : undefined);

  // Нормализуем путь для сравнения (убираем /ru или /de в начале, хвост /, query/hash)
  const stripLocale = (p: string) => p.replace(/^\/(ru|de)(?=\/|$)/, "");
  const normalizePath = (p: string) => stripLocale(p.split(/[?#]/)[0]).replace(/\/+$/, "") || "/";

  const currentPath = normalizePath(asPath);
  const isInternal = rawHref.startsWith("/");
  const isSamePage =
    isInternal && normalizePath(rawHref) === currentPath; // /contact на /contact (с учётом локали)

  // если пусто или ссылка «на саму себя», пытаемся сделать mailto:
  const subject = encodeURIComponent(l === "ru" ? "Сообщение с сайта" : "Nachricht von der Website");
  const body = encodeURIComponent(
    l === "ru"
      ? "Здравствуйте! Пишу через страницу контактов."
      : "Guten Tag! Ich schreibe über die Kontaktseite."
  );

  let ctaHref = rawHref;
  if (!ctaHref || isSamePage) {
    if (doc.email) {
      ctaHref = `mailto:${doc.email}?subject=${subject}&body=${body}`;
    } else {
      ctaHref = ""; // скрыть кнопку, если даже email не указан
    }
  }

  const isHttp = /^https?:\/\//i.test(ctaHref);
  const isMailOrTel = /^(mailto:|tel:)/i.test(ctaHref);

  /** -------------------------------- */

  return (
    <section className={styles.container} aria-labelledby="contacts-title">
      <h1 id="contacts-title" className={styles.title}>
        {title}
      </h1>

      {/* Intro */}
      {introBlocks && (
        <div className={`${styles.card} ${styles.intro}`}>
          <PortableText value={introBlocks} />
        </div>
      )}

      {/* Grid */}
      <div className={styles.grid}>
        {/* Контакты/адрес */}
        <div className={styles.card}>
          <h2 className={styles.h2}>{l === "ru" ? "Контакты" : "Kontakt"}</h2>
          <ul className={styles.list}>
            {doc.email && (
              <li>
                <strong>E-mail:</strong>{" "}
                <a className="link" href={`mailto:${doc.email}`}>
                  {doc.email}
                </a>
              </li>
            )}
            {doc.phone && (
              <li>
                <strong>{l === "ru" ? "Телефон" : "Telefon"}:</strong>{" "}
                <a className="link" href={`tel:${doc.phone}`}>
                  {doc.phone}
                </a>
              </li>
            )}
            {addressLine && (
              <li>
                <strong>{l === "ru" ? "Адрес" : "Adresse"}:</strong> {addressLine}{" "}
                {doc.address?.mapUrl && (
                  <>
                    ·{" "}
                    <a className="link" href={doc.address.mapUrl} target="_blank" rel="noopener noreferrer">
                      {l === "ru" ? "Показать на карте" : "Karte öffnen"}
                    </a>
                  </>
                )}
              </li>
            )}
            {hours && (
              <li>
                <strong>{l === "ru" ? "Часы работы" : "Öffnungszeiten"}:</strong>
                <div className={styles.pre}>{hours}</div>
              </li>
            )}
          </ul>
        </div>

        {/* Соцсети */}
        {!!doc.social?.length && (
          <div className={styles.card}>
            <h2 className={styles.h2}>{l === "ru" ? "Мы в соцсетях" : "Social"}</h2>
            <ul className={styles.social}>
              {doc.social.map((s, i) => (
                <li key={i}>
                  <a className="link" href={s.url ?? "#"} target="_blank" rel="noopener noreferrer">
                    {s.title || s.url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Люди */}
        {!!doc.persons?.length && (
          <div className={styles.card}>
            <h2 className={styles.h2}>{l === "ru" ? "Контактные лица" : "Ansprechpersonen"}</h2>
            <ul className={styles.people}>
              {doc.persons.map((p, i) => (
                <li key={i} className={styles.person}>
                  {p.photo?.asset?.url && (
                    <img className={styles.avatar} src={p.photo.asset.url} alt={p.photo.alt || p.name} />
                  )}
                  <div>
                    <div className={styles.personName}>{p.name}</div>
                    {p.role?.[l] && <div className={styles.muted}>{p.role[l]}</div>}
                    <div className={styles.personLinks}>
                      {p.email && (
                        <a className="link" href={`mailto:${p.email}`}>
                          {p.email}
                        </a>
                      )}
                      {p.phone && (
                        <a className="link" href={`tel:${p.phone}`}>
                          {p.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* CTA */}
      {label && ctaHref && (
        <p className={styles.actions}>
          {ctaHref.startsWith("/") && !isMailOrTel ? (
            // внутренняя ссылка (в т.ч. якорь на другой странице)
            <Link className="btn btn-primary" href={ctaHref}>
              {label}
            </Link>
          ) : (
            // внешняя / mailto / tel / якорь на этой же странице
            <a
              className="btn btn-primary"
              href={ctaHref}
              {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {label}
            </a>
          )}
        </p>
      )}

      {/* GDPR / обновление */}
      <div className={styles.footerNote}>
        {doc.gdpr?.[l] && <PortableText value={doc.gdpr[l]} />}
        {lastUpdated && (
          <div className={styles.updated}>
            {l === "ru" ? "Последнее обновление: " : "Letzte Aktualisierung: "}
            {lastUpdated}
          </div>
        )}
      </div>
    </section>
  );
}

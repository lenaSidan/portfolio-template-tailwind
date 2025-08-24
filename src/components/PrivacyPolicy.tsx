"use client";

import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/impressum.module.css";

type ML<T = any> = { ru?: T; de?: T };
type PolicyDoc = {
  title: ML<string>;
  text?: ML<any>;
  ctaPrimary?: { label?: ML<string>; href?: string };
  _updatedAt: string;
};

export default function PrivacyPolicy({ privacyPolicy }: { privacyPolicy: PolicyDoc }) {
  const { locale = "ru" } = useRouter();
  const l = (locale === "de" ? "de" : "ru") as "ru" | "de";

  const title = privacyPolicy.title?.[l] ?? privacyPolicy.title?.ru ?? privacyPolicy.title?.de ?? "";
  const lastUpdated = new Date(privacyPolicy._updatedAt).toLocaleDateString(
    l === "de" ? "de-DE" : "ru-RU",
    { year: "numeric", month: "long", day: "2-digit" }
  );

  const body = privacyPolicy.text?.[l];

  // внутренняя или внешняя ссылка для CTA
  const href = privacyPolicy.ctaPrimary?.href;
  const label = privacyPolicy.ctaPrimary?.label?.[l];
  const isExternal = !!href && /^(https?:)?\/\//.test(href);

  return (
    <section className={styles.section} aria-labelledby="imp-title">
      <div className={styles.inner}>
        

        {body && (
          <div className={styles.body}>
            <PortableText value={body} />
          </div>
        )}

        <p className={styles.updated}>
          {l === "ru" ? "Последнее обновление: " : "Letzte Aktualisierung: "}
          {lastUpdated}
        </p>

        {href && label && (
          <div className={styles.actions}>
            {isExternal ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                {label}
              </a>
            ) : (
              <Link href={href} className="btn btn-primary">
                {label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
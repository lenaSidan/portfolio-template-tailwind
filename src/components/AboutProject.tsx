"use client";

import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/aboutProject.module.css";

type ML<T = any> = { ru?: T; de?: T };
type ProjectData = {
  title: ML<string>;
  text?: ML<any>; // Portable Text (blockContent)
  ctaPrimary?: { label?: ML<string>; href?: string };
};

export default function AboutProject({ aboutProject }: { aboutProject?: ProjectData | null }) {
  const { locale = "ru" } = useRouter();
  const l = (locale === "de" ? "de" : "ru") as "ru" | "de";

  if (!aboutProject) return null;

  const title =
    aboutProject.title?.[l] ?? aboutProject.title?.ru ?? aboutProject.title?.de ?? "";

  const body = aboutProject.text?.[l]; // массив блоков
  const ctaHref = aboutProject.ctaPrimary?.href;
  const ctaLabel = aboutProject.ctaPrimary?.label?.[l];
  const isExternal = !!ctaHref && /^(https?:)?\/\//.test(ctaHref);

  return (
    <section aria-labelledby="about-title">
      <div className={styles.content}>
        <div className={styles.inner}>

          {body && (
            <div className={styles.text}>
              <PortableText value={body} />
            </div>
          )}

          {ctaHref && ctaLabel && (
            <div className={styles.actions}>
              {isExternal ? (
                <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  {ctaLabel}
                </a>
              ) : (
                <Link href={ctaHref} className="btn btn-primary">
                  {ctaLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

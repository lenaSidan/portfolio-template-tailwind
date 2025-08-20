"use client";
import { urlFor } from "@/sanity/lib/image";
import styles from "@/styles/intro.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

type ML = { ru?: string; de?: string };
type IntroData = {
  title: ML;
  text?: ML;
  align?: "left" | "right";
  heroImage?: { asset?: { _ref?: string }; alt?: ML };
  ctaPrimary?: { label?: ML; href?: string };
  ctaSecondary?: { label?: ML; href?: string };
};

export default function HeroIntro({ intro }: { intro: IntroData }) {
  const { locale = "ru" } = useRouter();
  const l = locale as "ru" | "de";

  const imgUrl = intro.heroImage?.asset?._ref ? urlFor(intro.heroImage).width(2200).quality(75).url() : "";

  const alignRight = intro.align === "right";

  // 👉 ref на секцию героя — чтобы узнать её точную высоту
  const heroRef = useRef<HTMLElement | null>(null);

  const scrollPastHero = () => {
  if (!heroRef.current) return;

  // реальная высота хедера
  const nav = document.querySelector('nav') as HTMLElement | null;
  const headerH = nav ? nav.offsetHeight : 0;
  const GAP = 52; // маленький «воздух» под шапкой

  const next = heroRef.current.nextElementSibling as HTMLElement | null;

  const targetTop = next
    ? next.getBoundingClientRect().top + window.scrollY - headerH - GAP
    : heroRef.current.getBoundingClientRect().bottom + window.scrollY - headerH - GAP;

  window.scrollTo({ top: targetTop, behavior: 'smooth' });
};
  // подпись на кнопке (локализация)
  const scrollLabel = l === "de" ? "Weiter scrollen" : "Прокрутите вниз";

  // helpers для разных размеров и форматов
  const imgUrlFor = (image: any, w: number, fmt?: "webp" | "jpg") => {
    let b = urlFor(image)
      .width(w)
      .quality(fmt === "webp" ? 72 : 80);
    if (fmt === "webp") b = b.format("webp");
    return b.url();
  };
  const imgSmallWebp = intro.heroImage ? imgUrlFor(intro.heroImage, 800, "webp") : "";
  const imgMediumWebp = intro.heroImage ? imgUrlFor(intro.heroImage, 1200, "webp") : "";
  const imgLargeWebp = intro.heroImage ? imgUrlFor(intro.heroImage, 2200, "webp") : "";

  const imgSmallJpg = intro.heroImage ? imgUrlFor(intro.heroImage, 800, "jpg") : "";
  const imgMediumJpg = intro.heroImage ? imgUrlFor(intro.heroImage, 1200, "jpg") : "";
  const imgLargeJpg = intro.heroImage ? imgUrlFor(intro.heroImage, 2200, "jpg") : "";

  return (
    <section ref={heroRef} className={`${styles.hero} ${alignRight ? styles.alignRight : styles.alignLeft}`} data-hero>
      {intro.heroImage?.asset?._ref && (
        <div className={styles.media} aria-hidden="true">
          <picture>
            {/* большие экраны */}
            <source media="(min-width: 1200px)" srcSet={imgLargeWebp} type="image/webp" />
            <source media="(min-width: 1200px)" srcSet={imgLargeJpg} />

            {/* планшеты / средние */}
            <source media="(min-width: 768px)" srcSet={imgMediumWebp} type="image/webp" />
            <source media="(min-width: 768px)" srcSet={imgMediumJpg} />

            {/* мобильные */}
            <source srcSet={imgSmallWebp} type="image/webp" />

            {/* фолбэк <img> + srcset/sizes для не-WebP браузеров */}
            <img
              src={imgSmallJpg}
              srcSet={`${imgSmallJpg} 800w, ${imgMediumJpg} 1200w, ${imgLargeJpg} 2200w`}
              sizes="100vw"
              alt=""
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
          <div className={styles.shade} />
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.inner}>
          <h1 className={styles.title}>{intro.title?.[l]}</h1>
          {intro.text?.[l] && <p className={styles.text}>{intro.text[l]}</p>}

          {(intro.ctaPrimary?.label?.[l] || intro.ctaSecondary?.label?.[l]) && (
            <div className={styles.actions}>
              {intro.ctaPrimary?.href && intro.ctaPrimary.label?.[l] && (
                <Link href={intro.ctaPrimary.href} className="btn btn-primary">
                  {intro.ctaPrimary.label[l]!}
                </Link>
              )}
              {intro.ctaSecondary?.href && intro.ctaSecondary.label?.[l] && (
                <Link href={intro.ctaSecondary.href} className="btn btn-outline">
                  {intro.ctaSecondary.label[l]!}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <button type="button" className={styles.scroll} onClick={scrollPastHero} aria-label={scrollLabel}>
        <span className={styles.scrollText}>{scrollLabel}</span>
        <span aria-hidden="true" className={styles.chevron} />
      </button>
    </section>
  );
}

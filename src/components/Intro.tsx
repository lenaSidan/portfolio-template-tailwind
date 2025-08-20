'use client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/styles/intro.module.css'
import { urlFor } from '@/sanity/lib/image'   // тот же helper, что и в Events

type ML = { ru?: string; de?: string }
type IntroData = {
  title: ML
  text?: ML
  align?: 'left' | 'right'
  heroImage?: {
    asset?: { _ref?: string }      // важен _ref!
    alt?: ML
  }
  ctaPrimary?: { label?: ML; href?: string }
  ctaSecondary?: { label?: ML; href?: string }
}

export default function HeroIntro({ intro }: { intro: IntroData }) {
  const { locale = 'ru' } = useRouter()
  const l = (locale as 'ru' | 'de')

  const imgUrl =
    intro.heroImage?.asset?._ref
      ? urlFor(intro.heroImage).width(2200).quality(75).url()
      : ''

  const alignRight = intro.align === 'right'

  return (
    <section className={`${styles.hero} ${alignRight ? styles.alignRight : styles.alignLeft}`}>
      {imgUrl && (
        <div className={styles.media} aria-hidden="true">
          <img src={imgUrl} alt="" />
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
    </section>
  )
}

'use client'
import { useRouter } from 'next/router'
import styles from '@/styles/intro.module.css'

type IntroData = {
  _id: string
  title: { ru: string; de: string }
  text: { ru: string; de: string }
}

export default function Intro({ intro }: { intro: IntroData }) {
  const { locale } = useRouter()

  return (
    <section className={styles.introSection}>
      <h1>{intro.title[locale as 'ru' | 'de']}</h1>
      <p>{intro.text[locale as 'ru' | 'de']}</p>
    </section>
  )
}

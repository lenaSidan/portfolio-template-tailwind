'use client'
import { useRouter } from 'next/router'

type IntroData = {
  _id: string
  title: { ru: string; de: string }
  text: { ru: string; de: string }
}

export default function Intro({ intro }: { intro: IntroData }) {
  const { locale } = useRouter()

  return (
    <section>
      <h1>{intro.title[locale as 'ru' | 'de']}</h1>
      <p>{intro.text[locale as 'ru' | 'de']}</p>
    </section>
  )
}

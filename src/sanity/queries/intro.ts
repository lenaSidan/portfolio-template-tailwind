import { groq } from "next-sanity";

export const introQuery = groq`
  *[_type == "intro"][0]{
    title,
    text,
    align,
    heroImage,                     // ← весь объект image, без asset->url
    ctaPrimary{ label, href },
    ctaSecondary{ label, href }
  }
`

import { groq } from 'next-sanity'

export const aboutProjectQuery = groq`
  *[_type == "aboutProject"][0]{
    title,
    text,
    ctaPrimary{ label, href }
  }
`
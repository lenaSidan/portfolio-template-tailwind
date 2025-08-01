import {groq} from 'next-sanity'

export const introQuery = groq`
  *[_type == "intro"][0]{
    title,
    text
  }
`

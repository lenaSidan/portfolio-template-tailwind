import { groq } from 'next-sanity'

export const privacyPolicyQuery = groq`
  *[_type == "privacyPolicy"][0]{
    title,
    text,
    ctaPrimary{ label, href },
    _updatedAt
  }
`
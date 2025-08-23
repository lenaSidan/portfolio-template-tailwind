import { groq } from "next-sanity";

export const impressumQuery = groq`
  *[_type == "impressum"][0]{
    title,
    text,
    ctaPrimary{ label, href },
    _updatedAt
  }
`;

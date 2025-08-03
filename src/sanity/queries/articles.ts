import { groq } from "next-sanity";

export const articlesQuery = groq`
  *[_type == "article"] | order(_createdAt desc){
    _id,
    title,
    summary,
    slug,
    image {
      asset->{
        url
      },
      alt
    }
  }
`;

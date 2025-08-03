import { groq } from "next-sanity";

export const eventsQuery = groq`
 *[_type == "event"] | order(_createdAt desc){
    _id,
    title,
    date,
    location,
    summary,
    slug,
    image {
      asset ->{
       url
      },
      alt
    }
  }
`;

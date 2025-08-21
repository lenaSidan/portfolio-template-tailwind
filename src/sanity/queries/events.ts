import { groq } from "next-sanity";

export const eventsListQuery = groq`
  *[_type == "event"] 
  | order(coalesce(start, _createdAt) desc){
    _id,
    title, 
    summary,
    start, end, timezone,
    venue,             // { name{ru,de}, city{ru,de} | string, ... }
    image{ asset->{_id, url}, alt },
    "slug": slug.current,

    // legacy-поля (если остались старые документы)
    date,
    location
  }
`;

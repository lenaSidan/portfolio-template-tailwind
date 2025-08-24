import { groq } from "next-sanity";

export const contactPageQuery = groq`
*[_type == "contactPage"][0]{
  title, intro, address{
    street, city, postalCode, country, mapUrl
  },
  email, phone, hours,
  persons[]{
    name,
    role,
    email,
    phone,
    photo{ asset->{url}, alt }
  },
  social[]{ title, url },
  ctaPrimary{ label, href },
  gdpr,
  _updatedAt
}
`;

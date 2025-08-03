import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "featuredOnHome",
       title: "Показать на главной / Auf der Startseite zeigen",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "ru", title: "Russian", type: "string" },
        { name: "de", title: "German", type: "string" },
      ],
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "object",
      fields: [
        { name: "ru", title: "Russian", type: "string" },
        { name: "de", title: "German", type: "string" },
      ],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        { name: "ru", title: "Russian", type: "string" },
        { name: "de", title: "German", type: "string" },
      ],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "object",
          title: "Alternative text",
          fields: [
            { name: "ru", title: "Russian", type: "string" },
            { name: "de", title: "German", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "object",
      fields: [
        { name: "ru", title: "Russian", type: "text" },
        { name: "de", title: "German", type: "text" },
      ],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "object",
      fields: [
        { name: "ru", title: "Russian", type: "blockContent" },
        { name: "de", title: "German", type: "blockContent" },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.de",
        maxLength: 96,
      },
    }),
  ],
});

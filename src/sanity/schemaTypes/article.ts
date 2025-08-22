// /schemas/articleType.ts
import { defineType, defineField } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",

  // ✅ Заготовки для новых документов (placeholders)
  initialValue: () => ({
    featuredOnHome: false,
    title: {
      ru: "Заголовок вашей статьи — коротко и ясно",
      de: "Titel Ihres Artikels – kurz und klar",
    },
    summary: {
      ru:
        "Краткое содержание статьи в 2–3 предложениях. " +
        "Сформулируйте ценность и главное, что читатель получит. " +
        "Этот текст показывается в списках и карточках.",
      de:
        "Kurze Zusammenfassung in 2–3 Sätzen. " +
        "Formulieren Sie den Nutzen und das Wesentliche für die Lesenden. " +
        "Dieser Text erscheint in Listen und Karten.",
    },
    image: {
      alt: {
        ru: "Обложка статьи (замените на своё изображение)",
        de: "Artikelbild (durch eigenes Bild ersetzen)",
      },
    },
  }),

  // Как документ выглядит в списке
  preview: {
    select: {
      titleRu: "title.ru",
      titleDe: "title.de",
      media: "image",
    },
    prepare({ titleRu, titleDe, media }) {
      return {
        title: titleDe || titleRu || "Article",
        media,
      };
    },
  },

  fields: [
    defineField({
      name: "featuredOnHome",
      title: "Показать на главной / Auf der Startseite zeigen",
      type: "boolean",
      initialValue: false,
      description: "Отметьте, чтобы показывать статью в блоке на главной странице.",
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "object",
      description: "Короткий и понятный заголовок статьи.",
      fields: [
        { name: "ru", title: "Russian", type: "string", validation: (r) => r.required() },
        { name: "de", title: "German", type: "string", validation: (r) => r.required() },
      ],
    }),

    defineField({
      name: "summary",
      title: "Summary",
      type: "object",
      description: "2–3 предложения — краткое содержание статьи. Показывается в списках/превью.",
      fields: [
        { name: "ru", title: "Russian", type: "text", rows: 3 },
        { name: "de", title: "German", type: "text", rows: 3 },
      ],
    }),

    defineField({
      name: "content",
      title: "Content",
      type: "object",
      description: "Основной текст статьи. Используйте заголовки, параграфы, изображения.",
      fields: [
        { name: "ru", title: "Russian", type: "blockContent" },
        { name: "de", title: "German", type: "blockContent" },
      ],
    }),

    defineField({
      name: "image",
      title: "Image (cover)",
      type: "image",
      options: { hotspot: true },
      description: "Обложка статьи. Рекомендация: 1600×900+ (JPG/WebP).",
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "object",
          description: "Короткое описание изображения для доступности и SEO.",
          fields: [
            { name: "ru", title: "Russian", type: "string" },
            { name: "de", title: "German", type: "string" },
          ],
        },
      ],
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.de", maxLength: 96 },
    }),
  ],
});
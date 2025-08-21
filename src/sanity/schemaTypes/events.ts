import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",

  // 👉 заготовки для новых документов
  initialValue: () => {
    const now = new Date();
    const startDemo = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 14,
      19,
      0,
      0
    ).toISOString();

    return {
      featuredOnHome: false,
      timezone: "Europe/Berlin",
      start: startDemo,
      end: null,
      title: {
        ru: "Название вашего мероприятия — коротко и ясно",
        de: "Titel Ihrer Veranstaltung – kurz und klar",
      },
      summary: {
        ru:
          "В двух-трёх предложениях расскажите, что это за событие, кому подходит и чем полезно. " +
          "Укажите формат, дату/время и площадку; при желании — программу или ожидаемый результат. " +
          "Это примерный текст — замените его на свой.",
        de:
          "Beschreiben Sie in zwei bis drei Sätzen, worum es geht, für wen es ist und welchen Nutzen es hat. " +
          "Nennen Sie Format, Datum/Uhrzeit und Location; optional Programm oder Ergebnis. " +
          "Dieser Beispieltext dient nur als Platzhalter – ersetzen Sie ihn durch Ihren.",
      },
      venue: {
        name: {
          ru: "Название площадки (бар, клуб, галерея)",
          de: "Name der Location (Bar, Club, Galerie)",
        },
        city: {
          ru: "Город проведения",
          de: "Stadt der Veranstaltung",
        },
        address: {
          ru: "Адрес: улица и дом (опционально)",
          de: "Adresse: Straße und Hausnummer (optional)",
        },
        mapUrl: "",
        website: "",
      },
      image: {
        alt: {
          ru: "Обложка события (замените на свою фотографию)",
          de: "Titelbild der Veranstaltung (durch eigenes Foto ersetzen)",
        },
      },
      cta: {
        href: "/contact",
        label: { ru: "Контакт", de: "Kontakt" },
      },
    };
  },

  // 👉 превью в списке
  preview: {
    select: {
      titleRu: "title.ru",
      titleDe: "title.de",
      start: "start",
      cityRu: "venue.city.ru",
      cityDe: "venue.city.de",
    },
    prepare({ titleRu, titleDe, start, cityRu, cityDe }) {
      const date = start
        ? new Date(start).toLocaleString("de-DE", {
            dateStyle: "medium",
            timeStyle: "short",
          })
        : "";
      const title = titleDe || titleRu || "Event";
      const subtitle = [date, cityDe || cityRu].filter(Boolean).join(" • ");
      return { title, subtitle };
    },
  },

  fields: [
    defineField({
      name: "featuredOnHome",
      title: "Показать на главной / Auf der Startseite zeigen",
      type: "boolean",
      initialValue: false,
      description:
        "Отметьте, чтобы именно это событие показывалось в блоке на главной (выбор вручную).",
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "object",
      description: "Короткий и понятный заголовок события.",
      fields: [
        { name: "ru", title: "Russian", type: "string", validation: (r) => r.required() },
        { name: "de", title: "German", type: "string", validation: (r) => r.required() },
      ],
    }),

    defineField({
      name: "start",
      title: "Start (datetime, ISO)",
      type: "datetime",
      description: "Дата и время начала (локальные для выбранной тайм-зоны).",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "end",
      title: "End (datetime, ISO)",
      type: "datetime",
      description: "Опционально. Если заполнено — покажем интервал.",
    }),

    defineField({
      name: "timezone",
      title: "Timezone (IANA)",
      type: "string",
      initialValue: "Europe/Berlin",
      options: {
        list: [
          { title: "Europe/Berlin", value: "Europe/Berlin" },
          { title: "Europe/Moscow", value: "Europe/Moscow" },
          { title: "UTC", value: "UTC" },
        ],
        layout: "dropdown",
      },
      description: "Тайм-зона события (IANA).",
    }),

    // Место проведения
    defineField({
      name: "venue",
      title: "Venue",
      type: "object",
      description: "Площадка/место проведения.",
      fields: [
        {
          name: "name",
          title: "Name",
          type: "object",
          description: "Название площадки (бар, клуб, галерея).",
          fields: [
            { name: "ru", title: "Russian", type: "string" },
            { name: "de", title: "German", type: "string" },
          ],
        },
        {
          name: "city",
          title: "City (multilingual)",
          type: "object",
          description: "Город (если нужно — в двух языках).",
          fields: [
            { name: "ru", title: "Русский", type: "string" },
            { name: "de", title: "Deutsch", type: "string" },
          ],
        },
        {
          name: "address",
          title: "Address (optional)",
          type: "object",
          description: "Улица, дом, ориентиры — опционально.",
          fields: [
            { name: "ru", title: "Russian", type: "string" },
            { name: "de", title: "German", type: "string" },
          ],
        },
        { name: "mapUrl", title: "Map URL (Google/Apple)", type: "url" },
        { name: "website", title: "Venue website", type: "url" },
      ],
    }),

    // Картинка
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Обложка события. Лучше 1600×900+, JPG/WebP.",
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

    // Краткое описание
    defineField({
      name: "summary",
      title: "Summary",
      type: "object",
      description: "2–3 предложения: контекст, польза, результат.",
      fields: [
        { name: "ru", title: "Russian", type: "text" },
        { name: "de", title: "German", type: "text" },
      ],
    }),

    // Основной контент
    defineField({
      name: "content",
      title: "Content",
      type: "object",
      fields: [
        { name: "ru", title: "Russian", type: "blockContent" },
        { name: "de", title: "German", type: "blockContent" },
      ],
    }),

    // CTA (один раз, необязательная ссылка)
    defineField({
      name: "cta",
      title: "CTA (button)",
      type: "object",
      description:
        "Куда вести пользователя из блока события. Можно оставить пустым — тогда кнопка не показывается.",
      fields: [
        {
          name: "href",
          title: "Link",
          type: "url",
          validation: (rule) =>
            rule
              .uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] })
              .warning(
                "Рекомендуется указать ссылку. Если оставить пустым — кнопка не появится на сайте."
              ),
        },
        {
          name: "label",
          title: "Label",
          type: "object",
          fields: [
            { name: "ru", title: "Russian", type: "string", initialValue: "Контакт" },
            { name: "de", title: "German", type: "string", initialValue: "Kontakt" },
          ],
        },
      ],
    }),

    // Слаг
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.de", maxLength: 96 },
    }),
  ],
});

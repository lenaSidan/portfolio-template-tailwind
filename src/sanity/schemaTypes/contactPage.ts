import {defineType, defineField} from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contacts / Контакты",
  type: "document",

  // Готовые плейсхолдеры (их можно сразу опубликовать и потом править)
  initialValue: () => ({
    title: { ru: "Контакты", de: "Kontakt" },
    intro: {
      ru: [
        { _type: "block", children: [{ _type: "span", text: "Свяжитесь с нами — ответим в течение 1–2 рабочих дней." }] }
      ],
      de: [
        { _type: "block", children: [{ _type: "span", text: "Kontaktieren Sie uns – Antwort in 1–2 Werktagen." }] }
      ],
    },
    address: {
      street: { ru: "Улица, дом", de: "Straße, Nr." },
      city:   { ru: "Город",      de: "Stadt" },
      postalCode: "12345",
      country: { ru: "Германия", de: "Deutschland" },
    },
    email: "info@example.com",
    phone: "+49 30 1234567",
    hours: {
      ru: "Пн–Пт: 10:00–18:00\nСб–Вс: выходной",
      de: "Mo–Fr: 10:00–18:00\nSa–So: geschlossen",
    },
    ctaPrimary: {
      label: { ru: "Написать", de: "Schreiben" },
      href: "/contact", // можно заменить на mailto: или форму
    },
    social: [
      { title: "Instagram", url: "https://instagram.com/…" },
      { title: "Facebook",  url: "https://facebook.com/…" }
    ],
    gdpr: {
      ru: [
        { _type: "block", children: [{ _type: "span", text: "Отправляя форму, вы соглашаетесь с обработкой персональных данных." }] }
      ],
      de: [
        { _type: "block", children: [{ _type: "span", text: "Mit dem Absenden erklären Sie sich mit der Verarbeitung personenbezogener Daten einverstanden." }] }
      ],
    },
  }),

  preview: {
    select: { email: "email", phone: "phone", titleDe: "title.de", titleRu: "title.ru" },
    prepare({email, phone, titleDe, titleRu}) {
      return {
        title: titleDe || titleRu || "Contacts",
        subtitle: [email, phone].filter(Boolean).join(" • ")
      };
    },
  },

  fields: [
    defineField({
      name: "title",
      title: "Заголовок (мультиязычный) / Titel",
      type: "object",
      description: "Короткий заголовок страницы.",
      fields: [
        defineField({ name: "ru", title: "Русский", type: "string", validation: r => r.required() }),
        defineField({ name: "de", title: "Deutsch", type: "string", validation: r => r.required() }),
      ],
    }),

    defineField({
      name: "intro",
      title: "Вступление / Intro",
      description: "1–2 абзаца: для чего писать, сроки ответа.",
      type: "object",
      fields: [
        defineField({ name: "ru", title: "Русский", type: "blockContent" }),
        defineField({ name: "de", title: "Deutsch", type: "blockContent" }),
      ],
    }),

    defineField({
      name: "address",
      title: "Адрес / Adresse",
      type: "object",
      description: "Структурированный адрес (для карты и выдачи).",
      fields: [
        defineField({
          name: "street",
          title: "Улица / Straße",
          type: "object",
          fields: [
            defineField({ name: "ru", title: "Русский", type: "string" }),
            defineField({ name: "de", title: "Deutsch", type: "string" }),
          ],
        }),
        defineField({
          name: "city",
          title: "Город / Stadt",
          type: "object",
          fields: [
            defineField({ name: "ru", title: "Русский", type: "string" }),
            defineField({ name: "de", title: "Deutsch", type: "string" }),
          ],
        }),
        defineField({ name: "postalCode", title: "Индекс / PLZ", type: "string" }),
        defineField({
          name: "country",
          title: "Страна / Land",
          type: "object",
          fields: [
            defineField({ name: "ru", title: "Русский", type: "string" }),
            defineField({ name: "de", title: "Deutsch", type: "string" }),
          ],
        }),
        defineField({ name: "mapUrl", title: "Ссылка на карту (Google/Apple)", type: "url" }),
      ],
    }),

    defineField({
      name: "email",
      title: "E-mail",
      type: "string",
      validation: r => r.required().email(),
      description: "Куда приходят письма с формы/обращений.",
    }),

    defineField({
      name: "phone",
      title: "Телефон",
      type: "string",
      description: "Формат свободный (с кодом страны).",
    }),

    defineField({
      name: "hours",
      title: "Часы работы / Öffnungszeiten",
      type: "object",
      fields: [
        defineField({ name: "ru", title: "Русский", type: "text" }),
        defineField({ name: "de", title: "Deutsch", type: "text" }),
      ],
    }),

    defineField({
      name: "persons",
      title: "Контактные лица (опционально)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Имя", type: "string", validation: r => r.required() }),
            defineField({
              name: "role", title: "Роль / должность", type: "object",
              fields: [
                defineField({ name: "ru", title: "Русский", type: "string" }),
                defineField({ name: "de", title: "Deutsch", type: "string" }),
              ],
            }),
            defineField({ name: "email", title: "E-mail", type: "string", validation: r => r.email() }),
            defineField({ name: "phone", title: "Телефон", type: "string" }),
            defineField({
              name: "photo", title: "Фото", type: "image", options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt", type: "string" }],
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "email", media: "photo" }
          }
        }
      ],
    }),

    defineField({
      name: "social",
      title: "Соцсети / Links",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Название", type: "string" }),
          defineField({ name: "url", title: "URL", type: "url" }),
        ],
        preview: { select: { title: "title", subtitle: "url" } }
      }],
    }),

    defineField({
      name: "ctaPrimary",
      title: "CTA-кнопка (опционально)",
      type: "object",
      description: "Кнопка внизу страницы — ссылка на форму/почту.",
      fields: [
        defineField({
          name: "label",
          title: "Текст кнопки",
          type: "object",
          fields: [
            defineField({ name: "ru", title: "Русский", type: "string" }),
            defineField({ name: "de", title: "Deutsch", type: "string" }),
          ],
        }),
        defineField({
          name: "href",
          title: "Ссылка",
          type: "url",
          validation: (r) => r.uri({ allowRelative: true, scheme: ["http","https","mailto","tel"] }),
        }),
      ],
    }),

    defineField({
      name: "gdpr",
      title: "Согласие (GDPR) для формы (опц.)",
      description: "Текст согласия под кнопкой формы.",
      type: "object",
      fields: [
        defineField({ name: "ru", title: "Русский", type: "blockContent" }),
        defineField({ name: "de", title: "Deutsch", type: "blockContent" }),
      ],
    }),
  ],
});

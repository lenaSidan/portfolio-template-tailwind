import { defineType, defineField } from 'sanity'

export const aboutProject = defineType({
  name: 'aboutProject',
  title: 'About Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок (мультиязычный)',
      type: 'object',
      fields: [
        defineField({ name: 'ru', title: 'Русский', type: 'string' }),
        defineField({ name: 'de', title: 'Deutsch', type: 'string' }),
      ],
      validation: (Rule) => Rule.required(),
      description: 'Короткий заголовок блока.',
    }),
    defineField({
      name: "text",
      title: "Текст (мультиязычный)",
      description: "1–2 абзаца о проекте.",
      type: "object",
      fields: [
        defineField({ name: "ru", title: "Русский", type: "blockContent" }),
        defineField({ name: "de", title: "Немецкий", type: "blockContent" }),
      ],
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'Кнопка (опционально)',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Текст кнопки',
          type: 'object',
          fields: [
            defineField({ name: 'ru', title: 'Русский', type: 'string' }),
            defineField({ name: 'de', title: 'Deutsch', type: 'string' }),
          ],
        }),
        defineField({
          name: 'href',
          title: 'Ссылка',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
          description: 'Можно относительную (/aboutProject) или абсолютную.',
        }),
      ],
    }),
  ],
})
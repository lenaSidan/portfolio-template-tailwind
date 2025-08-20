import {defineType, defineField} from 'sanity'

export const intro = defineType({
  name: 'intro',
  title: 'Intro',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок (мультиязычный)',
      type: 'object',
      fields: [
        defineField({ name: 'ru', title: 'Русский', type: 'string' }),
        defineField({ name: 'de', title: 'Немецкий', type: 'string' }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'text',
      title: 'Текст (мультиязычный)',
      type: 'object',
      fields: [
        defineField({ name: 'ru', title: 'Русский', type: 'text' }),
        defineField({ name: 'de', title: 'Немецкий', type: 'text' }),
      ],
    }),

    /* Новые поля */
    defineField({
      name: 'heroImage',
      title: 'Изображение (Hero)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'ALT (мультиязычный)',
          type: 'object',
          fields: [
            defineField({ name: 'ru', title: 'Русский', type: 'string' }),
            defineField({ name: 'de', title: 'Немецкий', type: 'string' }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'align',
      title: 'Панель слева/справа',
      type: 'string',
      options: {
        list: [
          { title: 'Слева', value: 'left' },
          { title: 'Справа', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),

    defineField({
      name: 'ctaPrimary',
      title: 'Кнопка 1 (опционально)',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Текст кнопки (мультиязычный)',
          type: 'object',
          fields: [
            defineField({ name: 'ru', title: 'Русский', type: 'string' }),
            defineField({ name: 'de', title: 'Немецкий', type: 'string' }),
          ],
        }),
        defineField({ name: 'href', title: 'Ссылка', type: 'string' }),
      ],
    }),

    defineField({
      name: 'ctaSecondary',
      title: 'Кнопка 2 (опционально)',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Текст кнопки (мультиязычный)',
          type: 'object',
          fields: [
            defineField({ name: 'ru', title: 'Русский', type: 'string' }),
            defineField({ name: 'de', title: 'Немецкий', type: 'string' }),
          ],
        }),
        defineField({ name: 'href', title: 'Ссылка', type: 'string' }),
      ],
    }),
  ],
})

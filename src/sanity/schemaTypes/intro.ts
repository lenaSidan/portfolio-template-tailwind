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
        defineField({
          name: 'ru',
          title: 'Русский',
          type: 'string',
        }),
        defineField({
          name: 'de',
          title: 'Немецкий',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'text',
      title: 'Текст (мультиязычный)',
      type: 'object',
      fields: [
        defineField({
          name: 'ru',
          title: 'Русский',
          type: 'text',
        }),
        defineField({
          name: 'de',
          title: 'Немецкий',
          type: 'text',
        }),
      ],
    }),
  ],
})

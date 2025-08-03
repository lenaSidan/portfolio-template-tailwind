import {defineField, defineType} from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {name: 'ru', title: 'Russian', type: 'string'},
        {name: 'de', title: 'German', type: 'string'},
      ],
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'object',
      fields: [
        {name: 'ru', title: 'Russian', type: 'text'},
        {name: 'de', title: 'German', type: 'text'},
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        {name: 'ru', title: 'Russian', type: 'blockContent'},
        {name: 'de', title: 'German', type: 'blockContent'},
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.de',
        maxLength: 96,
      },
    }),
  ],
})

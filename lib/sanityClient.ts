import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'gkysofgy',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
})

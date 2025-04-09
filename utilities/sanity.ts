import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: '3t26pmqp',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
});

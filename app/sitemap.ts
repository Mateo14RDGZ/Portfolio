import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { CONCEPT_PROJECTS } from '@/lib/project-data'
import { NOTES } from '@/lib/notes-data'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/proyectos`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...CONCEPT_PROJECTS.map((project) => ({
      url: `${SITE_URL}/proyectos/${project.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/trabajo-destacado`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacidad`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/en`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/notas`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...NOTES.map((note) => ({
      url: `${SITE_URL}/notas/${note.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.55,
    })),
  ]
}

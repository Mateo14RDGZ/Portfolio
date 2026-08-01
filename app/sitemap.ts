import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { CONCEPT_PROJECTS } from '@/lib/project-data'

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
  ]
}

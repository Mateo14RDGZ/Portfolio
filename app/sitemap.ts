import type { MetadataRoute } from 'next'

const SITE_URL = 'https://portfolio-mrdgz14.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/privacidad`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}

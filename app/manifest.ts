import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mateo Rodríguez — MR14',
    short_name: 'MR14',
    description: 'Desarrollador web full-stack en Uruguay: sitios web, tiendas online y sistemas a medida.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#dfe8c8',
    theme_color: '#dfe8c8',
    lang: 'es-UY',
    icons: [
      {
        src: '/mr14-logo-vector.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}

import type { Metadata } from 'next'
import { CaseStudy } from '@/components/case-study'
import { PageTransition } from '@/components/page-transition'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Sistema de gestión para automotora · Caso de estudio',
  description:
    'Caso de estudio de una aplicación web empresarial para gestionar vehículos, clientes, financiaciones, pagos, comprobantes y reportes.',
  alternates: { canonical: '/trabajo-destacado' },
  openGraph: {
    type: 'article',
    url: `${SITE_URL}/trabajo-destacado`,
    siteName: SITE_NAME,
    title: 'Sistema de gestión para automotora · Caso de estudio',
    description: SITE_DESCRIPTION,
    images: ['/opengraph-image'],
  },
}

const caseStudySchema = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Sistema de Gestión para Automotora',
  headline: 'Trabajo destacado',
  url: `${SITE_URL}/trabajo-destacado`,
  inLanguage: 'es-UY',
  author: {
    '@type': 'Person',
    name: 'Mateo Rodríguez',
    url: SITE_URL,
  },
  description:
    'Aplicación web desarrollada a medida para centralizar vehículos, clientes, financiaciones, pagos, comprobantes y reportes dentro de una única plataforma.',
}

export default function FeaturedWorkPage() {
  return (
    <PageTransition animatePage>
      <a
        href="#case-study-title"
        className="primary-action sr-only bg-primary text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:px-4 focus:py-2 focus:text-sm"
      >
        Ir al caso de estudio
      </a>
      <SiteHeader />
      <main id="top" className="pt-[4.5rem] sm:pt-24">
        <CaseStudy />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
    </PageTransition>
  )
}

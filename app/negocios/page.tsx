import type { Metadata } from 'next'
import { PageTransition } from '@/components/page-transition'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { NegociosHero } from '@/components/negocios/hero'
import { NegociosIncludes } from '@/components/negocios/includes'
import { NegociosExamples } from '@/components/negocios/examples'
import { NegociosProcess } from '@/components/negocios/process'
import { NegociosPricing } from '@/components/negocios/pricing'
import { NegociosAbout } from '@/components/negocios/about'
import { NegociosFaq } from '@/components/negocios/faq'
import { NegociosFinalCta } from '@/components/negocios/final-cta'
import { NEGOCIOS_FAQ } from '@/lib/negocios-data'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Páginas web para negocios en Uruguay',
  description:
    'Páginas web profesionales para negocios en Uruguay desde $7.990. Diseño web a medida, responsive y con contacto directo por WhatsApp.',
  keywords: ['páginas web Uruguay', 'diseño web Uruguay', 'páginas web para negocios', 'desarrollo web Uruguay'],
  alternates: { canonical: '/negocios' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/negocios`,
    title: 'Páginas web para negocios en Uruguay · MR14',
    description: 'Páginas web profesionales para negocios desde $7.990. Diseño personalizado, responsive y contacto directo por WhatsApp.',
  },
}

const negociosSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Diseño y desarrollo de páginas web para negocios',
  name: 'Páginas web para negocios',
  url: `${SITE_URL}/negocios`,
  inLanguage: 'es-UY',
  description: 'Páginas web profesionales para negocios en Uruguay: diseño personalizado, responsive y contacto directo por WhatsApp.',
  provider: { '@type': 'Person', name: 'Mateo Rodríguez', url: SITE_URL },
  areaServed: { '@type': 'Country', name: 'Uruguay' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: NEGOCIOS_FAQ.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export default function NegociosPage() {
  return (
    <PageTransition animatePage>
      <a
        href="#incluye"
        className="primary-action bg-primary text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:px-4 focus:py-2 focus:text-sm"
      >
        Ir al contenido
      </a>

      <SiteHeader />

      <main className="flex flex-col">
        <NegociosHero />
        <NegociosIncludes />
        <NegociosExamples />
        <NegociosProcess />
        <NegociosPricing />
        <NegociosAbout />
        <NegociosFaq />
        <NegociosFinalCta />
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(negociosSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </PageTransition>
  )
}

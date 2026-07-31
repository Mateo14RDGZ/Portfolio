import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Services } from '@/components/services'
import { Projects } from '@/components/projects'
import { Technologies } from '@/components/technologies'
import { Process } from '@/components/process'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'
import { PageTransition } from '@/components/page-transition'
import { QualityPanel } from '@/components/quality-panel'
import { Faq } from '@/components/faq'
import { FAQ_ITEMS } from '@/lib/faq-data'

const siteUrl = 'https://portfolio-mrdgz14.vercel.app/'

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
      url: siteUrl,
      name: 'Mateo Rodríguez / MR14',
      inLanguage: 'es-UY',
      publisher: { '@id': `${siteUrl}#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}#organization`,
      name: 'MR14',
      url: siteUrl,
      logo: `${siteUrl}icon.png`,
      founder: { '@id': `${siteUrl}#person` },
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}#person`,
      name: 'Mateo Rodríguez',
      url: siteUrl,
      email: 'mailto:mrdgz14dev@gmail.com',
      jobTitle: 'Desarrollador web full-stack',
      worksFor: { '@id': `${siteUrl}#organization` },
      knowsAbout: [
        'Next.js',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Node.js',
        'PostgreSQL',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}#service`,
      name: 'Mateo Rodríguez — Diseño y desarrollo web',
      url: siteUrl,
      description:
        'Servicio de diseño y desarrollo web full-stack para negocios, prestado de forma remota desde Uruguay.',
      areaServed: {
        '@type': 'Country',
        name: 'Uruguay',
      },
      availableLanguage: 'es',
      founder: { '@id': `${siteUrl}#person` },
      parentOrganization: { '@id': `${siteUrl}#organization` },
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export default function HomePage() {
  return (
    <PageTransition>
      <a
        href="#about"
        className="bg-primary text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:px-4 focus:py-2 focus:text-sm"
      >
        Ir al contenido
      </a>

      <SiteHeader />

      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Technologies />
        <QualityPanel />
        <Process />
        <Faq />
        <Contact />
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        // Structured data helps search engines describe the service correctly.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </PageTransition>
  )
}

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

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Mateo Rodríguez — Diseño y desarrollo web',
  description:
    'Desarrollador web full-stack freelance especializado en sitios rápidos y modernos para pequeños negocios.',
  areaServed: 'Todo el mundo',
  founder: {
    '@type': 'Person',
    name: 'Mateo Rodríguez',
    jobTitle: 'Desarrollador web full-stack',
  },
  knowsAbout: [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Node.js',
    'PostgreSQL',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </PageTransition>
  )
}

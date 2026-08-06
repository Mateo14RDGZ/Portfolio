import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { CaseStudyPreview } from '@/components/case-study-preview'
import { Services } from '@/components/services'
import { Projects } from '@/components/projects'
import { Technologies } from '@/components/technologies'
import { Process } from '@/components/process'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'
import { PageTransition } from '@/components/page-transition'
import { QualityPanel } from '@/components/quality-panel'
import { Faq } from '@/components/faq'
import { WhyMe } from '@/components/why-me'
import { NotesPreview } from '@/components/notes-preview'
import { MobileQuickContact } from '@/components/mobile-quick-contact'
import { Specializations } from '@/components/specializations'
import { QuickIdeaCta } from '@/components/quick-idea-cta'
import { FAQ_ITEMS } from '@/lib/faq-data'
import { SITE_URL } from '@/lib/site'

const siteUrl = `${SITE_URL}/`

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
      url: siteUrl,
      name: 'Mateo Rodríguez · Desarrollador web en Uruguay',
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
      email: 'mailto:contacto@mateordgz.dev',
      jobTitle: 'Desarrollador web full-stack en Uruguay',
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
      name: 'Mateo Rodríguez · Desarrollador web en Uruguay',
      url: siteUrl,
      description:
        'Diseño y desarrollo de sitios web, tiendas online y sistemas a medida para negocios en Uruguay.',
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
        className="primary-action bg-primary text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:px-4 focus:py-2 focus:text-sm"
      >
        Ir al contenido
      </a>

      <SiteHeader />
      <MobileQuickContact />

      {/*
        Mobile reorders this flow via `order` only (Hero -> Services ->
        Especializaciones -> CTA contextual -> Proyecto destacado -> Sobre mí
        -> Tecnologías -> Calidad -> Faq -> Contacto), and drops
        Habilidades/Notas/Proceso from the mobile flow entirely (Proceso's
        content now lives inside Faq). DOM order stays exactly as it was
        before Phase 4 - `sm:order-none` resets every section back to it at
        640px+, so desktop's order is untouched. flex-col only changes how
        `order` is interpreted; these are already full-width stacked
        sections, so it has no visual effect on its own.
      */}
      <main className="flex flex-col">
        <div className="order-1 sm:order-none"><Hero /></div>
        <div className="order-2 sm:order-none"><Services /></div>
        <div className="order-3 sm:order-none"><Specializations /></div>
        <div className="order-4 sm:order-none"><QuickIdeaCta /></div>
        <div className="order-5 sm:order-none"><CaseStudyPreview /></div>
        <div className="order-6 sm:order-none"><About /></div>
        <div className="order-7 sm:order-none"><WhyMe /></div>
        <div className="hidden sm:order-none sm:block"><Projects /></div>
        <div className="order-8 sm:order-none"><Technologies /></div>
        <div className="order-9 sm:order-none"><QualityPanel /></div>
        <div className="hidden sm:order-none sm:block"><Process /></div>
        <div className="order-10 sm:order-none"><Faq /></div>
        <div className="hidden sm:order-none sm:block"><NotesPreview /></div>
        <div className="order-11 sm:order-none"><Contact /></div>
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

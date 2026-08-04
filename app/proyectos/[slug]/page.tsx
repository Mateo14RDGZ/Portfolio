import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { ConceptLanding } from '@/components/concept-landing'
import { conceptFontVariables } from '@/lib/concept-fonts'
import { CONCEPT_PROJECTS, getConceptProject, type ConceptProject } from '@/lib/project-data'
import { SITE_URL, SITE_NAME } from '@/lib/site'

// Each case study is its own dynamic import (not ssr:false - this is
// primary, SEO-critical content) so visiting one never ships another's JS
// or fonts. Cimbra hasn't been migrated to its own case-study folder yet,
// so it still renders through the legacy ConceptLanding component/font
// module for now.
const BrumaLanding = dynamic(() =>
  import('@/components/case-studies/bruma/bruma-landing').then((m) => m.BrumaLanding),
)
const AstraLanding = dynamic(() =>
  import('@/components/case-studies/astra/astra-landing').then((m) => m.AstraLanding),
)

export function generateStaticParams() {
  return CONCEPT_PROJECTS.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getConceptProject(slug)
  if (!project) return {}
  return {
    title: `${project.name} · Caso de diseño`,
    description: project.description,
    alternates: { canonical: `/proyectos/${project.slug}` },
    robots: { index: true, follow: true },
    openGraph: { url: `${SITE_URL}/proyectos/${project.slug}`, title: `${project.name} · Caso de diseño ${SITE_NAME}`, description: project.description, images: [{ url: project.image, alt: project.imageAlt }] },
  }
}

const caseStudySchema = (project: ConceptProject) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.name,
  headline: project.name,
  url: `${SITE_URL}/proyectos/${project.slug}`,
  inLanguage: 'es-UY',
  author: { '@type': 'Person', name: 'Mateo Rodríguez', url: SITE_URL },
  description: `${project.description} Caso de diseño ficticio: marca y contenido no corresponden a un negocio real.`,
})

export default async function ConceptProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getConceptProject(slug)
  if (!project) notFound()

  return (
    <>
      {slug === 'bruma-cafe' ? (
        <BrumaLanding />
      ) : slug === 'astra' ? (
        <AstraLanding />
      ) : (
        <div className={conceptFontVariables}>
          <ConceptLanding project={project} />
        </div>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema(project)) }}
      />
    </>
  )
}

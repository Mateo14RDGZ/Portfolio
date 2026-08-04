import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ConceptLanding } from '@/components/concept-landing'
import { conceptFontVariables } from '@/lib/concept-fonts'
import { CONCEPT_PROJECTS, getConceptProject } from '@/lib/project-data'
import { SITE_URL } from '@/lib/site'

export function generateStaticParams() {
  return CONCEPT_PROJECTS.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getConceptProject(slug)
  if (!project) return {}
  return {
    title: `${project.name} · Proyecto conceptual`,
    description: project.description,
    alternates: { canonical: `/proyectos/${project.slug}` },
    robots: { index: true, follow: true },
    openGraph: { url: `${SITE_URL}/proyectos/${project.slug}`, title: `${project.name} · Proyecto conceptual MR14`, description: project.description, images: [{ url: project.image, alt: project.imageAlt }] },
  }
}

export default async function ConceptProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getConceptProject(slug)
  if (!project) notFound()
  return <div className={conceptFontVariables}><ConceptLanding project={project} /></div>
}

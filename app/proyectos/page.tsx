import type { Metadata } from 'next'
import { PageTransition } from '@/components/page-transition'
import { ProjectsGallery } from '@/components/projects-gallery'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Proyectos de diseño y desarrollo web',
  description: 'Proyecto empresarial destacado y landings conceptuales diseñadas y desarrolladas por Mateo Rodríguez, desarrollador web en Uruguay.',
  alternates: { canonical: '/proyectos' },
  openGraph: { url: `${SITE_URL}/proyectos`, title: 'Proyectos de diseño y desarrollo web · MR14', description: 'Casos y demostraciones de diseño y desarrollo web.' },
}

export default function ProjectsPage() {
  return (
    <PageTransition animatePage>
      <SiteHeader />
      <main id="top" className="pt-[4.5rem] sm:pt-24"><ProjectsGallery /></main>
      <SiteFooter />
    </PageTransition>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageTransition } from '@/components/page-transition'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { NOTES } from '@/lib/notes-data'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Notas sobre desarrollo web para negocios',
  description: 'Guías breves de Mateo Rodríguez sobre sitios web, tiendas online, sistemas a medida, rendimiento y lanzamiento.',
  alternates: { canonical: '/notas' },
  openGraph: { url: `${SITE_URL}/notas`, title: 'Notas sobre desarrollo web para negocios', description: 'Guías breves sobre decisiones digitales para negocios.' },
}

export default function NotesPage() {
  return (
    <PageTransition animatePage>
      <SiteHeader />
      <main className="mx-auto min-h-[100dvh] max-w-6xl px-5 pt-32 pb-16 sm:px-10 sm:pt-40 sm:pb-24">
        <p className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">Notas</p>
        <h1 className="mt-4 max-w-4xl text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.82] font-semibold tracking-[-0.075em]">Decisiones digitales, explicadas sin vueltas.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">Ideas prácticas para quienes necesitan presentar, vender o gestionar mejor su negocio en internet.</p>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {NOTES.map((note) => <article key={note.slug} className="flex min-h-72 flex-col border border-foreground bg-card p-6"><p className="font-mono text-[10px] tracking-[0.16em] text-primary uppercase">{note.publishedAt} · {note.readingTime}</p><h2 className="mt-6 text-3xl leading-[0.95] font-semibold tracking-[-0.05em]">{note.title}</h2><p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{note.description}</p><Link href={`/notas/${note.slug}`} className="mt-7 inline-flex min-h-11 items-center justify-between border-t border-foreground pt-4 text-sm font-semibold">Leer nota <ArrowUpRight className="size-4" /></Link></article>)}
        </div>
      </main>
      <SiteFooter />
    </PageTransition>
  )
}

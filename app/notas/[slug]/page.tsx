import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { PageTransition } from '@/components/page-transition'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getNote, NOTES } from '@/lib/notes-data'
import { SITE_URL } from '@/lib/site'

export function generateStaticParams() {
  return NOTES.map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) return {}
  return { title: note.title, description: note.description, alternates: { canonical: `/notas/${note.slug}` }, openGraph: { url: `${SITE_URL}/notas/${note.slug}`, title: note.title, description: note.description } }
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) notFound()
  return (
    <PageTransition animatePage>
      <SiteHeader />
      <main className="mx-auto min-h-[100dvh] max-w-4xl px-5 pt-32 pb-16 sm:px-10 sm:pt-40 sm:pb-24">
        <Link href="/notas" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"><ArrowLeft className="size-4" /> Volver a notas</Link>
        <article className="mt-10 border-t border-foreground pt-5"><p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">{note.publishedAt} · {note.readingTime}</p><h1 className="mt-5 max-w-3xl text-[clamp(3.3rem,7vw,6.6rem)] leading-[0.84] font-semibold tracking-[-0.075em]">{note.title}</h1><p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground">{note.description}</p><div className="mt-14 space-y-12">{note.content.map((section) => <section key={section.heading} className="max-w-2xl"><h2 className="text-3xl font-semibold tracking-[-0.045em]">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-lg leading-relaxed text-muted-foreground">{paragraph}</p>)}</section>)}</div><div className="mt-16 border-t border-foreground pt-6"><h2 className="text-3xl font-semibold tracking-[-0.05em]">¿Necesitás vender, reservar o gestionar mejor tu negocio?</h2><Link href="/#contact" className="primary-action mt-6 inline-flex min-h-12 items-center gap-3 bg-primary px-5 font-semibold text-primary-foreground">Contame qué necesitás <ArrowUpRight className="size-4" /></Link></div></article>
      </main>
      <SiteFooter />
    </PageTransition>
  )
}

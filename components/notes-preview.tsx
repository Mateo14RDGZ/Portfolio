import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { RevealItem, StaggerGroup } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { NOTES } from '@/lib/notes-data'

export function NotesPreview() {
  return (
    <section id="notas" className="mx-auto my-6 max-w-6xl scroll-mt-24 px-5 py-16 sm:my-10 sm:px-10 sm:py-20">
      <SectionHeading
        eyebrow="Notas"
        title="Ideas claras antes de empezar una web."
        description="Guías breves sobre decisiones que aparecen antes, durante y después de un proyecto digital."
      />

      <StaggerGroup className="mt-10 grid gap-4 lg:grid-cols-3" gap={0.07}>
        {NOTES.map((note) => (
          <RevealItem key={note.slug} className="h-full">
            <article className="group flex h-full flex-col border border-foreground bg-card p-5 transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-background sm:p-6">
              <p className="font-mono text-[10px] tracking-[0.16em] text-primary uppercase">{note.readingTime}</p>
              <h3 className="mt-5 text-2xl leading-[0.95] font-semibold tracking-[-0.045em]">{note.title}</h3>
              <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{note.description}</p>
              <Link href={`/notas/${note.slug}`} className="mt-7 inline-flex min-h-11 items-center justify-between border-t border-foreground pt-4 text-sm font-semibold">
                Leer nota <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </article>
          </RevealItem>
        ))}
      </StaggerGroup>
    </section>
  )
}

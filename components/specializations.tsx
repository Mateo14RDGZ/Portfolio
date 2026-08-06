'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { track } from '@vercel/analytics'
import { CONCEPT_PROJECTS } from '@/lib/project-data'
import { SectionHeading } from '@/components/section-heading'

/**
 * Mobile-only. No desktop equivalent exists, so this section is simply absent
 * there (`sm:hidden` on the root) rather than duplicated against anything.
 * Reuses CONCEPT_PROJECTS (the same data /proyectos renders) instead of
 * hardcoding a second copy of these project descriptions.
 */
export function Specializations() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => {
      const index = Math.round(el.scrollLeft / el.clientWidth)
      setActive(Math.max(0, Math.min(CONCEPT_PROJECTS.length - 1, index)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  function goTo(index: number) {
    const el = trackRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(CONCEPT_PROJECTS.length - 1, index))
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <section aria-labelledby="specializations-title" className="scroll-mt-24 overflow-hidden bg-background py-12 sm:hidden">
      <div className="px-5">
        <SectionHeading
          id="specializations-title"
          eyebrow="Especializaciones"
          title="No solo hago páginas lindas."
          description="Tres formas distintas de resolver un problema de negocio: identidad de marca, experiencia interactiva y producto digital."
        />
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="Especializaciones"
        tabIndex={0}
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CONCEPT_PROJECTS.map((project) => (
          <Link
            key={project.slug}
            href={`/proyectos/${project.slug}`}
            onClick={() => track('specialization_click', { project: project.slug })}
            className="group relative block aspect-square w-[78vw] shrink-0 snap-center overflow-hidden rounded-[1.75rem_0.5rem_1.75rem_0.5rem] border border-border transition-transform duration-150 ease-out active:scale-[0.98]"
          >
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              loading="lazy"
              sizes="78vw"
              className="object-cover transition-transform duration-500 group-active:scale-105"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/70">{project.specialization}</p>
              <h3 className="mt-1.5 text-2xl leading-tight font-semibold tracking-[-0.03em]">{project.name}</h3>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold">
                Ver caso <ArrowUpRight className="size-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Especialización anterior"
            className="grid size-11 place-items-center rounded-full border border-border text-foreground transition-transform duration-150 ease-out active:scale-90 disabled:opacity-30 disabled:active:scale-100"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === CONCEPT_PROJECTS.length - 1}
            aria-label="Siguiente especialización"
            className="grid size-11 place-items-center rounded-full border border-border text-foreground transition-transform duration-150 ease-out active:scale-90 disabled:opacity-30 disabled:active:scale-100"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>

        <div role="tablist" aria-label="Ir a especialización" className="flex items-center gap-2">
          {CONCEPT_PROJECTS.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={project.name}
              onClick={() => goTo(index)}
              className="grid size-6 place-items-center"
            >
              <span className={`block size-2 rounded-full transition-[width,background-color] duration-200 ease-out ${index === active ? 'w-5 bg-primary' : 'bg-foreground/25'}`} />
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 px-5 font-mono text-[10px] leading-relaxed tracking-[0.04em] text-muted-foreground uppercase">
        Proyectos conceptuales — marca y contenido ficticios, mismo nivel de ejecución que un proyecto real.
      </p>
    </section>
  )
}

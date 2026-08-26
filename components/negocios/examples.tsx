'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Layers3 } from 'lucide-react'
import { track } from '@vercel/analytics'
import { SectionHeading } from '@/components/section-heading'
import { Reveal, RevealItem, StaggerGroup } from '@/components/reveal'
import { EASE, useCompactMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { CONCEPT_PROJECTS } from '@/lib/project-data'

/** Same per-slug identity (rounding, color, accent) as the /proyectos gallery cards. */
const CONCEPT_CARD: Record<string, { shape: string; imageShape: string; badge: string; label: string }> = {
  'vapor-cafe': {
    shape: 'rounded-[2.7rem_0.45rem_2.7rem_0.45rem] border-[#4A3324]/12 bg-[#F3F0EA] text-[#1D1B18]',
    imageShape: 'rounded-[2rem_0.3rem_2rem_0.3rem]',
    badge: 'rounded-full border border-white/30 bg-[#1D1B18]/75 text-[#F3F0EA]',
    label: 'text-[#4A3324]',
  },
  astra: {
    shape: 'rounded-none border-[#10151B]/12 bg-[#F1F3F6] text-[#10151B]',
    imageShape: 'rounded-none',
    badge: 'border border-[#10151B]/15 bg-[#F1F3F6]/90 text-[#10151B] backdrop-blur-md',
    label: 'text-[#4F7FA0]',
  },
  'cimbra-estudio': {
    shape: 'rounded-[2.7rem] border-[#1C222B]/10 bg-[#ECEFF3] text-[#1C222B]',
    imageShape: 'rounded-[2rem]',
    badge: 'rounded-full bg-[#ECEFF3]/90 text-[#1C222B] shadow-[4px_4px_10px_rgba(28,34,43,0.14)]',
    label: 'text-[#FF6B4A]',
  },
}

/**
 * The three completed concept projects (real screenshots, same per-slug card
 * identity as the /proyectos gallery, linking to their full case study).
 */
export function NegociosExamples() {
  const reduceMotion = useReducedMotion()
  const compactMotion = useCompactMotion()

  return (
    <section id="ejemplos" className="relative scroll-mt-24 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Ejemplos"
          title="Ejemplos de lo que puedo crear para tu negocio."
          description="Proyectos conceptuales completos que ya construí, con el mismo nivel de cuidado que le pondría a la web real de tu negocio."
        />

        <StaggerGroup className="mt-9 grid gap-5 sm:mt-12 lg:grid-cols-3" gap={0.09}>
          {CONCEPT_PROJECTS.map((project) => {
            const card = CONCEPT_CARD[project.slug]
            return (
              <RevealItem key={project.slug} className="h-full">
                <motion.article
                  whileHover={reduceMotion || compactMotion ? undefined : { y: -5 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className={cn('flex h-full flex-col overflow-hidden border', card.shape)}
                >
                  <Link
                    href={`/proyectos/${project.slug}`}
                    onClick={() => track('negocios_example_click', { project: project.slug })}
                    className={cn('relative mx-4 mt-4 aspect-[1.25] overflow-hidden sm:mx-5 sm:mt-5', card.imageShape)}
                    aria-label={`Ver caso de diseño ${project.name}`}
                  >
                    <Image src={project.image} alt={project.imageAlt} fill loading="lazy" sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.025]" />
                    <span className={cn('absolute top-4 left-4 px-3 py-2 text-[8px] tracking-[0.14em] uppercase', card.badge)}>Caso de diseño</span>
                  </Link>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className={cn('text-[9px] tracking-[0.15em] uppercase', card.label)}>{project.category.split(' · ')[0]}</p>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight">{project.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed opacity-70">{project.description}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-current/12 pt-4">
                      <span className="flex items-center gap-2 text-[9px] tracking-[0.12em] uppercase opacity-60"><Layers3 className="size-3.5" /> Landing completa</span>
                      <Link href={`/proyectos/${project.slug}`} onClick={() => track('negocios_example_click', { project: project.slug, source: 'arrow' })} className="grid size-10 place-items-center rounded-full border border-current/30 transition-colors hover:bg-current/10" aria-label={`Abrir ${project.name}`}>
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              </RevealItem>
            )
          })}
        </StaggerGroup>

        <Reveal delay={0.1}>
          <p className="mt-6 font-mono text-[10px] leading-relaxed tracking-[0.04em] text-muted-foreground uppercase">
            Proyectos conceptuales — marca y contenido ficticios, no corresponden a clientes reales.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

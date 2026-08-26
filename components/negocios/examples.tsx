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
import { NEGOCIOS_EXAMPLES } from '@/lib/negocios-data'
import { CONCEPT_PROJECTS } from '@/lib/project-data'

const ACCENT_BLOCK: Record<string, string> = {
  primary: 'bg-primary/12',
  accent: 'bg-accent/35',
  secondary: 'bg-secondary/60',
}

const ACCENT_ICON: Record<string, string> = {
  primary: 'bg-primary text-primary-foreground',
  accent: 'bg-accent text-foreground',
  secondary: 'bg-secondary text-foreground',
}

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
 * Two groups: the three completed concept projects (real screenshots, same
 * per-slug card identity as the /proyectos gallery, linking to their full
 * case study) followed by three quick abstract mockups for rubros that
 * don't have a built project yet - built from the site's own layout
 * language (bars/blocks standing in for headline/photo/CTA) rather than
 * invented business photography, and labelled as a demo on every card.
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
          description="Proyectos conceptuales completos que ya construí, más demostraciones rápidas para otros rubros — todo con el mismo nivel de cuidado que le pondría a la web real de tu negocio."
        />

        <Reveal delay={0.05}>
          <p className="mt-9 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase sm:mt-12">
            Proyectos conceptuales completos
          </p>
        </Reveal>

        <StaggerGroup className="mt-4 grid gap-5 lg:grid-cols-3" gap={0.09}>
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

        <Reveal delay={0.05}>
          <p className="mt-14 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase sm:mt-20">
            Ejemplos rápidos para otros rubros
          </p>
        </Reveal>

        <StaggerGroup className="mt-4 grid gap-5 lg:grid-cols-3" gap={0.09}>
          {NEGOCIOS_EXAMPLES.map((example) => (
            <RevealItem key={example.slug} className="h-full">
              <motion.article
                whileHover={reduceMotion || compactMotion ? undefined : { y: -5 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex h-full flex-col overflow-hidden rounded-[2rem_0.5rem_2rem_0.5rem] border border-foreground bg-background"
              >
                {/* Fake browser chrome */}
                <div className="flex items-center gap-2 border-b border-foreground bg-card px-4 py-3">
                  <span className="flex gap-1.5" aria-hidden="true">
                    <span className="size-2 rounded-full bg-foreground/25" />
                    <span className="size-2 rounded-full bg-foreground/25" />
                    <span className="size-2 rounded-full bg-foreground/25" />
                  </span>
                  <span className="ml-2 truncate rounded-full border border-foreground/15 bg-background px-3 py-1 font-mono text-[9px] tracking-[0.08em] text-foreground/55">
                    {example.domain}
                  </span>
                </div>

                {/* Abstract mockup body */}
                <div className={cn('flex flex-1 flex-col gap-3 p-5', ACCENT_BLOCK[example.accent])}>
                  <div className="grid aspect-video place-items-center rounded-xl bg-background/70">
                    <span className={cn('grid size-12 place-items-center rounded-full', ACCENT_ICON[example.accent])}>
                      <example.icon className="size-5" />
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="h-2.5 w-3/5 rounded-full bg-foreground/18" />
                    <span className="h-2.5 w-4/5 rounded-full bg-foreground/12" />
                    <span className="h-2.5 w-2/5 rounded-full bg-foreground/12" />
                  </div>
                  <span className="mt-1 h-8 w-32 rounded-full bg-primary" />
                </div>

                <div className="flex flex-1 flex-col gap-3 border-t border-foreground p-5 sm:p-6">
                  <span className="w-fit rounded-full border border-foreground/25 px-2.5 py-1 font-mono text-[8px] tracking-[0.14em] text-muted-foreground uppercase">
                    Proyecto demostrativo
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight">{example.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{example.tagline}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {example.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-foreground/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            </RevealItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1}>
          <p className="mt-6 font-mono text-[10px] leading-relaxed tracking-[0.04em] text-muted-foreground uppercase">
            Todos los proyectos de esta sección son conceptuales — marca y contenido ficticios, no corresponden a clientes reales.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

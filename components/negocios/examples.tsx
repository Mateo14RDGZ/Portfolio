'use client'

import { motion, useReducedMotion } from 'motion/react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal, RevealItem, StaggerGroup } from '@/components/reveal'
import { EASE, useCompactMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { NEGOCIOS_EXAMPLES } from '@/lib/negocios-data'

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

/**
 * Abstract browser-frame previews, not real screenshots - there are no real
 * client cases yet, so each card is built from the site's own layout
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
          description="Demostraciones conceptuales pensadas para distintos rubros, con el mismo nivel de cuidado que le pondría a la web real de tu negocio."
        />

        <StaggerGroup className="mt-9 grid gap-5 sm:mt-12 lg:grid-cols-3" gap={0.09}>
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
            Demostraciones conceptuales — no corresponden a clientes reales. Muestran el nivel de diseño con el que trabajo.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

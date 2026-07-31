'use client'

import { motion } from 'motion/react'
import { CheckCircle2, Gauge } from 'lucide-react'
import { RevealItem, StaggerGroup } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { EASE } from '@/lib/motion'

const SCORES = [
  { label: 'Rendimiento', value: 84 },
  { label: 'Accesibilidad', value: 97 },
  { label: 'Buenas prácticas', value: 100 },
  { label: 'SEO', value: 100 },
]

export function QualityPanel() {
  return (
    <section className="relative bg-secondary py-16 sm:py-24" aria-labelledby="quality-title">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Calidad comprobable"
              title="Lo que prometo también se puede medir."
              description="Resultados de una auditoría Lighthouse móvil realizada sobre este mismo portfolio publicado. Sin cifras decorativas ni métricas inventadas."
            />
            <div className="mt-7 flex items-center gap-3 text-sm text-foreground/65">
              <CheckCircle2 className="size-4 text-primary" />
              Medición del 31 de julio de 2026 · Lighthouse
            </div>
          </div>

          <StaggerGroup className="grid grid-cols-2 overflow-hidden border border-foreground bg-background" gap={0.08}>
            {SCORES.map((score, index) => (
              <RevealItem key={score.label} className={index % 2 === 0 ? 'border-r border-foreground' : ''}>
                <motion.div
                  whileHover={{ backgroundColor: '#ff5d3a' }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className={`${index < 2 ? 'border-b border-foreground' : ''} group min-h-44 p-5 sm:min-h-52 sm:p-7`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/60">
                      {score.label}
                    </span>
                    <Gauge className="size-4 text-primary transition-colors group-hover:text-foreground" />
                  </div>
                  <p className="mt-8 text-[clamp(3.2rem,8vw,6rem)] leading-none font-semibold tracking-[-0.08em]">
                    {score.value}
                  </p>
                  <div className="mt-4 h-1 overflow-hidden bg-foreground/15">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: score.value / 100 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 1, ease: EASE }}
                      className="h-full origin-left bg-foreground"
                    />
                  </div>
                </motion.div>
              </RevealItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}

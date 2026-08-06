'use client'

import {
  Headphones,
  LifeBuoy,
  PenTool,
  Search,
  Smartphone,
  UserRoundCog,
  Zap,
} from 'lucide-react'
import { RevealItem, StaggerGroup } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SectionBackdrop } from '@/components/aurora-backdrop'
import { useMobileFirst } from '@/lib/motion'

// Mobile-only condensed picks: the ones About's single remaining pillar
// doesn't already cover (rendimiento and comunicación directa stay there).
const COMPACT_BENEFIT_TITLES = ['Desarrollo personalizado', 'Optimizado para SEO', 'Soporte continuo']

const BENEFITS = [
  {
    icon: PenTool,
    title: 'Diseño moderno',
    copy: 'Diseños actuales y cuidados que transmiten calidad de manera natural.',
  },
  {
    icon: Smartphone,
    title: 'Sitios web responsive',
    copy: 'Creados primero para móviles y probados en dispositivos reales, desde teléfonos pequeños hasta monitores ultrapanorámicos.',
  },
  {
    icon: Zap,
    title: 'Alto rendimiento',
    copy: 'Imágenes optimizadas, JavaScript mínimo y Core Web Vitals comprobados antes de cada lanzamiento.',
  },
  {
    icon: Search,
    title: 'Optimizado para SEO',
    copy: 'Marcado semántico, metadatos, mapas del sitio y datos estructurados para que los buscadores entiendan tu negocio.',
  },
  {
    icon: UserRoundCog,
    title: 'Desarrollo personalizado',
    copy: 'Sin plantillas recicladas de otros clientes. Tu sitio se diseña según las necesidades de tu negocio.',
  },
  {
    icon: Headphones,
    title: 'Comunicación directa',
    copy: 'Un único contacto: yo. Respuestas rápidas y claras, sin jerga innecesaria.',
  },
  {
    icon: LifeBuoy,
    title: 'Soporte continuo',
    copy: 'El lanzamiento es solo el comienzo. Sigo disponible para actualizaciones, correcciones y nuevas etapas de crecimiento.',
  },
]

export function WhyMe() {
  const isMobileFirst = useMobileFirst()

  // Mobile reads About+WhyMe as one continuous block: no second heading, no
  // backdrop, no card strip — just 3 short lines continuing About's pillar.
  if (isMobileFirst) {
    const compactBenefits = BENEFITS.filter((benefit) => COMPACT_BENEFIT_TITLES.includes(benefit.title))
    return (
      <div className="mx-auto max-w-6xl px-5 pb-10 sm:hidden">
        <StaggerGroup className="flex flex-col" gap={0.1}>
          {compactBenefits.map((benefit) => (
            <RevealItem key={benefit.title} className="flex items-start gap-4 border-t border-foreground/12 py-4">
              <span className="text-primary grid size-9 shrink-0 place-items-center rounded-full bg-secondary">
                <benefit.icon className="size-4" />
              </span>
              <div>
                <h3 className="text-sm font-semibold tracking-tight">{benefit.title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{benefit.copy}</p>
              </div>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    )
  }

  return (
    <section className="relative hidden overflow-hidden py-20 sm:block sm:py-36">
      <SectionBackdrop />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Por qué trabajar conmigo"
          title="Trato directo, decisiones claras y una web que podés seguir mejorando."
          description="Trabajo de forma cercana: entendemos el objetivo, definimos un plan y mantenemos una comunicación simple durante todo el proyecto."
          align="center"
        />

        <StaggerGroup
          className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:mt-16 sm:grid sm:gap-px sm:overflow-visible sm:rounded-3xl sm:border sm:border-border sm:bg-border sm:px-0 sm:pb-0 sm:grid-cols-2 lg:grid-cols-3"
          gap={0.07}
        >
          {BENEFITS.map((benefit) => (
            <RevealItem key={benefit.title} className="h-full w-[74vw] shrink-0 snap-center sm:w-auto sm:shrink">
              <div className="group bg-background hover:bg-card flex h-full flex-col gap-4 rounded-2xl border border-border p-6 min-[380px]:p-7 sm:rounded-none sm:border-none sm:p-8 transition-colors duration-500">
                <span className="bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground grid size-11 place-items-center rounded-2xl transition-[color,background-color,transform] duration-300 group-hover:scale-105">
                  <benefit.icon className="size-5" />
                </span>
                <h3 className="text-lg font-medium tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  {benefit.copy}
                </p>
              </div>
            </RevealItem>
          ))}

          {/* Closing cell spans the remainder of the last row on desktop (7 benefits + this cell = 8, not a multiple of 3) */}
          <RevealItem className="h-full w-[74vw] shrink-0 snap-center sm:w-auto sm:shrink lg:col-span-2">
            <div className="bg-card flex h-full flex-col justify-center gap-3 rounded-2xl border border-border p-6 min-[380px]:p-7 sm:rounded-none sm:border-none sm:p-8">
              <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase">
                Y una cosa más
              </span>
              <p className="text-lg leading-snug font-medium tracking-tight text-balance">
                Todo te pertenece: el código, el dominio y las cuentas. Sin
                dependencias ni ataduras.
              </p>
            </div>
          </RevealItem>
        </StaggerGroup>
      </div>
    </section>
  )
}

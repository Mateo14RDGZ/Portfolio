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
  return (
    <section className="relative overflow-hidden py-20 sm:py-36">
      <SectionBackdrop />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Por qué trabajar conmigo"
          title="Trato directo, decisiones claras y una web que podés seguir mejorando."
          description="Trabajo de forma cercana: entendemos el objetivo, definimos un plan y mantenemos una comunicación simple durante todo el proyecto."
          align="center"
        />

        <StaggerGroup
          className="mt-11 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
          gap={0.07}
        >
          {BENEFITS.map((benefit) => (
            <RevealItem key={benefit.title} className="h-full">
              <div className="group bg-background hover:bg-card flex h-full flex-col gap-4 p-6 min-[380px]:p-7 sm:p-8 transition-colors duration-500">
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

          {/* Closing cell spans the remainder of the last row (7 benefits + this cell = 8, not a multiple of 3) */}
          <RevealItem className="h-full lg:col-span-2">
            <div className="bg-card flex h-full flex-col justify-center gap-3 p-6 min-[380px]:p-7 sm:p-8">
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

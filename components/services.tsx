'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, Building2, Check, Globe, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RevealItem, StaggerGroup } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'
import { EASE } from '@/lib/motion'

type Plan = {
  name: string
  icon: typeof Globe
  positioning: string
  designedFor: string
  features: string[]
  featured?: boolean
}

const PLANS: Plan[] = [
  {
    name: 'Plan Presencia Web',
    icon: Globe,
    positioning:
      'Perfecto para negocios que necesitan una presencia profesional en internet.',
    designedFor: 'Para tu primer sitio web',
    features: [
      'Sitio de una página diseñado para convertir',
      'Diseño responsive pensado primero para móviles',
      'Formulario de contacto y enlace directo a WhatsApp',
      'Google Maps y horario comercial',
      'Configuración básica de SEO en página',
      'Publicación en tu propio dominio',
    ],
  },
  {
    name: 'Plan Empresa',
    icon: Building2,
    positioning:
      'Ideal para empresas que necesitan un sitio web completo con varias secciones.',
    designedFor: 'Para empresas en crecimiento',
    featured: true,
    features: [
      'Hasta 8 páginas personalizadas',
      'Secciones de servicios, equipo y portfolio',
      'Blog o área de noticias editable',
      'SEO avanzado y datos estructurados',
      'Panel de analítica conectado',
      'Auditoría de velocidad y accesibilidad',
      'Dos rondas de revisiones',
    ],
  },
  {
    name: 'Plan Premium',
    icon: Sparkles,
    positioning:
      'Aplicaciones web a medida con funciones avanzadas y soluciones personalizadas.',
    designedFor: 'Para productos a medida',
    features: [
      'Aplicación full-stack personalizada',
      'Cuentas de usuario y acceso seguro',
      'Diseño de bases de datos e integraciones',
      'Pagos, reservas o paneles de control',
      'Correos y flujos de trabajo automatizados',
      'Soporte continuo y mejoras',
      'Comunicación directa prioritaria',
    ],
  },
]

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden rounded-t-[3.5rem] bg-accent py-16 sm:rounded-t-[6rem] sm:py-24"
    >
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Servicios"
          title="Tres formas de trabajar juntos."
          description="Cada proyecto comienza con una conversación, no con una lista de precios. Elige el plan que mejor encaje con la situación actual de tu negocio y adaptaré el alcance a tus necesidades."
          align="center"
        />

        <StaggerGroup
          className="mt-9 grid gap-4 sm:mt-12 lg:grid-cols-3 lg:items-stretch"
          gap={0.13}
        >
          {PLANS.map((plan, index) => (
            <RevealItem key={plan.name} className="h-full">
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
                className={cn(
                  'group relative flex h-full flex-col overflow-hidden border border-foreground p-6 min-[380px]:p-7 sm:p-8',
                  index === 0 && 'rounded-[3rem_0.75rem_0.75rem_0.75rem]',
                  index === 1 && 'rounded-[0.75rem_3rem_0.75rem_0.75rem]',
                  index === 2 && 'rounded-[0.75rem_0.75rem_3rem_0.75rem]',
                  plan.featured
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background',
                )}
              >
                {/* Hover glow */}
                {plan.featured ? (
                  <Badge className="absolute top-6 right-6 rounded-none bg-foreground text-background">
                    Más solicitado
                  </Badge>
                ) : null}

                <div className="relative flex flex-col gap-6">
                  <span
                    className={cn(
                      'grid size-12 place-items-center border border-current transition-transform duration-300 group-hover:-rotate-6',
                      plan.featured
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-primary',
                    )}
                  >
                    <plan.icon className="size-5" />
                  </span>

                  <div className="flex flex-col gap-2.5">
                    <span className={cn('font-mono text-[0.7rem] tracking-[0.16em] uppercase', plan.featured ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                      {plan.designedFor}
                    </span>
                    <h3 className="text-2xl font-medium tracking-tight">
                      {plan.name}
                    </h3>
                    <p className={cn('leading-relaxed text-pretty', plan.featured ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                      {plan.positioning}
                    </p>
                  </div>
                </div>

                <ul className="relative mt-8 flex flex-1 flex-col gap-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <span className="bg-primary/12 text-primary mt-0.5 grid size-5 shrink-0 place-items-center rounded-full">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/85 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.featured ? 'default' : 'outline'}
                  className="group/cta relative mt-9 h-12 w-full rounded-full text-sm font-medium"
                  nativeButton={false}
                  render={<a href="#contact" />}
                >
                  Solicitar información
                  <ArrowUpRight
                    data-icon="inline-end"
                    className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                  />
                </Button>
              </motion.article>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

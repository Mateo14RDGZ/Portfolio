'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, Building2, Check, Globe, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Reveal, RevealItem, StaggerGroup } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'
import { EASE } from '@/lib/motion'

type Plan = {
  name: string
  icon: typeof Globe
  price: string
  positioning: string
  designedFor: string
  features: string[]
  featured?: boolean
}

const PLANS: Plan[] = [
  {
    name: 'CLASSIC',
    icon: Globe,
    price: 'Desde USD 450',
    positioning:
      'Ideal para emprendimientos y pequeños negocios que quieren tener una presencia profesional en internet.',
    designedFor: 'Tu primer sitio web',
    features: [
      'Sitio web de una página',
      'Diseño responsive',
      'Formulario de contacto',
      'Google Maps y horarios',
      'SEO básico',
      'Publicación en tu dominio',
    ],
  },
  {
    name: 'GOLD',
    icon: Building2,
    price: 'Desde USD 950',
    positioning:
      'Pensado para empresas que necesitan una web más completa para mostrar sus servicios y generar confianza.',
    designedFor: 'Sitio web profesional',
    featured: true,
    features: [
      'Hasta 8 páginas',
      'Servicios, portfolio y contacto',
      'Galería de imágenes',
      'Blog (opcional)',
      'SEO avanzado',
      'Optimización de velocidad',
      'Google Analytics',
      'Dos rondas de cambios',
    ],
  },
  {
    name: 'BLACK',
    icon: Sparkles,
    price: 'Desde USD 1.800',
    positioning:
      'Para empresas que necesitan funcionalidades específicas o un sistema completamente personalizado.',
    designedFor: 'Solución a medida',
    features: [
      'Tiendas online',
      'Catálogo de productos',
      'Métodos de pago',
      'Sistemas de reservas',
      'Paneles administrativos',
      'Gestión de usuarios',
      'Automatizaciones',
      'Integraciones con APIs',
      'Desarrollo completamente personalizado',
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
                  'group relative flex h-full flex-col overflow-hidden border border-foreground p-6 font-semibold min-[380px]:p-7 sm:p-8',
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
                    <span className={cn('font-mono text-[0.7rem] font-bold tracking-[0.16em] uppercase', plan.featured ? 'text-primary-foreground/75' : 'text-muted-foreground')}>
                      {plan.designedFor}
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="font-mono text-sm font-semibold tracking-[-0.02em]">
                      {plan.price}
                    </p>
                    <p className={cn('font-semibold leading-relaxed text-pretty', plan.featured ? 'text-primary-foreground/90' : 'text-muted-foreground')}>
                      {plan.positioning}
                    </p>
                  </div>
                </div>

                <ul className="relative mt-8 flex flex-1 flex-col gap-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <span
                        className={cn(
                          'mt-0.5 grid size-5 shrink-0 place-items-center rounded-full',
                          plan.featured
                            ? 'bg-foreground text-primary'
                            : 'bg-primary/12 text-primary',
                        )}
                      >
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/90 font-semibold leading-relaxed">
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

        <Reveal delay={0.15} className="mx-auto mt-7 max-w-3xl text-center">
          <p className="text-sm leading-relaxed text-foreground/65">
            Valores orientativos en dólares estadounidenses. El presupuesto final
            depende del contenido, las integraciones y el alcance acordado; siempre
            recibirás un precio cerrado antes de comenzar.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

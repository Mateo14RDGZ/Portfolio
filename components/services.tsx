'use client'

import { ArrowUpRight, Building2, Check, Globe, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RevealItem, StaggerGroup } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'
import { track } from '@vercel/analytics'

type PlanGroup = { title: string; features: string[] }

type Plan = {
  name: 'CLASSIC' | 'GOLD' | 'BLACK'
  icon: typeof Globe
  positioning: string
  designedFor: string
  features: string[]
  groups?: PlanGroup[]
  note?: string
  featured?: boolean
}

const PLANS: Plan[] = [
  {
    name: 'CLASSIC', icon: Globe, designedFor: 'Tu primer sitio web',
    positioning: 'Ideal para emprendimientos y pequeños negocios que quieren tener una presencia profesional en internet.',
    features: ['Sitio web de una página', 'Diseño responsive', 'Formulario de contacto', 'Google Maps y horarios', 'SEO básico', 'Publicación en tu dominio'],
  },
  {
    name: 'GOLD', icon: Building2, designedFor: 'Sitio web profesional', featured: true,
    positioning: 'Pensado para empresas que necesitan una web más completa para mostrar sus servicios y generar confianza.',
    features: ['Hasta 8 páginas', 'Servicios, portfolio y contacto', 'Galería de imágenes', 'Blog (opcional)', 'SEO avanzado', 'Optimización de velocidad', 'Google Analytics', 'Dos rondas de cambios'],
  },
  {
    name: 'BLACK', icon: Sparkles, designedFor: 'Solución a medida', features: [],
    positioning: 'Para negocios que necesitan vender online, automatizar procesos o desarrollar una solución específica.',
    groups: [
      { title: 'A. Tienda online', features: ['Catálogo de productos', 'Carrito y proceso de compra', 'Pagos online', 'Gestión de pedidos y productos'] },
      { title: 'B. Desarrollo a medida', features: ['Sistemas de reservas', 'Paneles administrativos', 'Automatizaciones', 'Gestión de usuarios', 'Integraciones', 'Sistemas personalizados'] },
    ],
    note: 'El alcance, el plazo y el presupuesto se definen según las funciones que necesite cada proyecto.',
  },
]

function PlanBack({ plan }: { plan: Plan }) {
  const Icon = plan.icon
  const highlights = plan.groups?.flatMap((group) => group.features).slice(0, 4) ?? plan.features.slice(0, 4)
  const corners = plan.name === 'CLASSIC' ? 'rounded-[3rem_0.75rem_0.75rem_0.75rem]' : plan.name === 'GOLD' ? 'rounded-[0.75rem_3rem_0.75rem_0.75rem]' : 'rounded-[0.75rem_0.75rem_3rem_0.75rem]'

  return (
    <div aria-hidden="true" className={cn('plan-flip-face plan-flip-back', corners, `plan-flip-back-${plan.name.toLowerCase()}`)}>
      <div className="flex h-full flex-col justify-between p-6 min-[380px]:p-7 sm:p-8">
        <div>
          <span className="grid size-12 place-items-center border border-current bg-white/10"><Icon className="size-5" /></span>
          <p className="mt-8 font-mono text-[0.7rem] font-bold tracking-[0.16em] uppercase opacity-75">Plan {plan.name}</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight">{plan.designedFor}</h3>
          <p className="mt-4 max-w-sm font-semibold leading-relaxed opacity-85">{plan.positioning}</p>
        </div>
        <div className="border-t border-current/30 pt-5">
          <p className="font-mono text-[0.65rem] font-bold tracking-[0.15em] uppercase opacity-70">Incluye</p>
          <p className="mt-3 text-sm leading-relaxed">{highlights.join(' · ')}</p>
        </div>
      </div>
    </div>
  )
}

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden rounded-t-[3.5rem] bg-accent py-16 sm:rounded-t-[6rem] sm:py-24">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Servicios"
          title="Tres formas de trabajar juntos."
          description="Cada proyecto comienza con una conversación, no con una lista de precios. Elegí el plan que mejor encaje con la situación actual de tu negocio y voy a adaptar el alcance a tus necesidades."
          align="center"
        />

        <StaggerGroup className="mt-9 grid gap-4 sm:mt-12 lg:grid-cols-3 lg:items-stretch" gap={0.13}>
          {PLANS.map((plan, index) => {
            const Icon = plan.icon
            return (
              <RevealItem key={plan.name} className="h-full">
                <div className="plan-flip-card h-full">
                  <article className="plan-flip-inner relative h-full">
                    <div className={cn(
                      'plan-flip-face plan-flip-front group flex h-full flex-col overflow-hidden border border-foreground bg-background p-6 font-semibold min-[380px]:p-7 sm:p-8',
                      index === 0 && 'rounded-[3rem_0.75rem_0.75rem_0.75rem]',
                      index === 1 && 'rounded-[0.75rem_3rem_0.75rem_0.75rem] bg-primary text-primary-foreground',
                      index === 2 && 'rounded-[0.75rem_0.75rem_3rem_0.75rem]',
                    )}>
                      {plan.featured ? <Badge className="absolute top-6 right-6 rounded-none bg-foreground text-background">Más solicitado</Badge> : null}
                      <div className="relative flex flex-col gap-6">
                        <span className={cn('grid size-12 place-items-center border border-current transition-transform duration-300 group-hover:-rotate-6', plan.featured ? 'bg-primary text-primary-foreground' : 'bg-secondary text-primary')}><Icon className="size-5" /></span>
                        <div className="flex flex-col gap-2.5">
                          <span className={cn('font-mono text-[0.7rem] font-bold tracking-[0.16em] uppercase', plan.featured ? 'text-primary-foreground/75' : 'text-muted-foreground')}>{plan.designedFor}</span>
                          <h3 className="text-2xl font-bold tracking-tight">Plan {plan.name}</h3>
                          <p className={cn('font-semibold leading-relaxed text-pretty', plan.featured ? 'text-primary-foreground/90' : 'text-muted-foreground')}>{plan.positioning}</p>
                        </div>
                      </div>
                      <div className="relative mt-6 flex flex-col gap-5">
                        {plan.groups ? plan.groups.map((group) => <div key={group.title} className="border-t border-foreground/30 pt-4 first:border-t-0 first:pt-0"><h4 className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-foreground/75">{group.title}</h4><ul className="flex flex-col gap-3">{group.features.map((feature) => <PlanFeature key={feature} feature={feature} featured={plan.featured} />)}</ul></div>) : <ul className="flex flex-col gap-3.5">{plan.features.map((feature) => <PlanFeature key={feature} feature={feature} featured={plan.featured} />)}</ul>}
                        {plan.note ? <p className="mt-auto border-t border-foreground/30 pt-4 text-xs font-semibold leading-relaxed text-foreground/75">{plan.note}</p> : null}
                      </div>
                      <Button variant="outline" className={cn('group/cta relative mt-6 h-12 w-full rounded-full text-sm font-bold', plan.featured && 'border-foreground bg-foreground text-background shadow-[0_10px_30px_rgba(41,21,50,0.2)] hover:border-background hover:bg-background hover:text-foreground focus-visible:ring-background/70')} nativeButton={false} render={<a href="#contact" onClick={() => track('plan_information_click', { plan: plan.name })} aria-label={`Solicitar información sobre el plan ${plan.name}`} />}>
                        Solicitar información <ArrowUpRight data-icon="inline-end" className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                      </Button>
                    </div>
                    <PlanBack plan={plan} />
                  </article>
                </div>
              </RevealItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}

function PlanFeature({ feature, featured }: { feature: string; featured?: boolean }) {
  return <li className="flex items-start gap-3 text-sm"><span className={cn('mt-0.5 grid size-5 shrink-0 place-items-center rounded-full', featured ? 'bg-foreground text-primary' : 'bg-primary/12 text-primary')}><Check className="size-3" strokeWidth={3} aria-hidden /></span><span className="font-semibold leading-relaxed text-foreground/90">{feature}</span></li>
}

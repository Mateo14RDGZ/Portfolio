'use client'

import { useRef } from 'react'
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

const PLAN_CUES: Record<Plan['name'], string[]> = {
  CLASSIC: [
    'Tenés una propuesta clara para presentar.',
    'Querés facilitar el contacto desde el primer día.',
    'Buscás una presencia profesional sin sumar complejidad.',
  ],
  GOLD: [
    'Tenés varios servicios o historias para mostrar.',
    'Necesitás respaldar tu propuesta con más contenido.',
    'Querés una web preparada para acompañar el crecimiento.',
  ],
  BLACK: [
    'Vendés online o necesitás ordenar una operación.',
    'Tu negocio requiere flujos y herramientas específicas.',
    'La solución se define alrededor de cómo trabajás.',
  ],
}

function PlanBack({ plan }: { plan: Plan }) {
  const Icon = plan.icon
  const highlights = plan.groups?.flatMap((group) => group.features) ?? plan.features
  const decisionCues = PLAN_CUES[plan.name]
  const corners = plan.name === 'CLASSIC' ? 'rounded-[3rem_0.75rem_0.75rem_0.75rem]' : plan.name === 'GOLD' ? 'rounded-[0.75rem_3rem_0.75rem_0.75rem]' : 'rounded-[0.75rem_0.75rem_3rem_0.75rem]'

  return (
    <div aria-hidden="true" className={cn('plan-flip-face plan-flip-back', corners, `plan-flip-back-${plan.name.toLowerCase()}`)}>
      <div className="flex h-full flex-col p-6 min-[380px]:p-7 sm:p-8">
        <div>
          <div className="flex items-start justify-between gap-4">
            <span className="grid size-12 place-items-center border border-current bg-white/10"><Icon className="size-5" /></span>
            <span className="font-mono text-[0.6rem] font-bold tracking-[0.16em] uppercase opacity-65">Alcance / MR14</span>
          </div>
          <p className="mt-6 font-mono text-[0.7rem] font-bold tracking-[0.16em] uppercase opacity-75">Plan {plan.name}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight">{plan.designedFor}</h3>
          <p className="mt-3 max-w-sm text-sm font-semibold leading-relaxed opacity-85">{plan.positioning}</p>
        </div>
        <div className="mt-6 border-y border-current/30 py-4">
          <p className="font-mono text-[0.63rem] font-bold tracking-[0.15em] uppercase opacity-70">Este plan tiene sentido si...</p>
          <ul className="mt-3 grid gap-2">
            {decisionCues.map((cue) => <li key={cue} className="flex gap-2 text-xs font-semibold leading-relaxed"><Check className="mt-0.5 size-3.5 shrink-0" strokeWidth={3} />{cue}</li>)}
          </ul>
        </div>
        <div className="mt-6 pt-1">
          <div className="flex items-center justify-between gap-4 font-mono text-[0.63rem] font-bold tracking-[0.15em] uppercase opacity-70">
            <span>Incluye</span><span>{highlights.length} puntos clave</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {highlights.map((item) => <span key={item} className="border border-current/35 px-2.5 py-1.5 text-[0.68rem] font-bold leading-tight">{item}</span>)}
          </div>
          <p className="mt-5 hidden border-t border-current/30 pt-3 font-mono text-[0.58rem] font-bold tracking-[0.15em] uppercase opacity-65 lg:block">Mové el cursor para volver</p>
        </div>
      </div>
    </div>
  )
}

export function Services() {
  const pointerStart = useRef<Record<string, { x: number; y: number; angle: number }>>({})
  const cardRefs = useRef<Partial<Record<Plan['name'], HTMLDivElement>>>({})
  const settledAngle = useRef<Partial<Record<Plan['name'], number>>>({})

  function setCardAngle(plan: Plan['name'], angle: number) {
    const card = cardRefs.current[plan]
    card?.style.setProperty('--plan-flip-angle', `${angle}deg`)
  }

  function beginPlanSwipe(event: React.PointerEvent<HTMLDivElement>, plan: Plan['name']) {
    const angle = settledAngle.current[plan] ?? 0
    pointerStart.current[plan] = {
      x: event.clientX,
      y: event.clientY,
      angle,
    }
    event.currentTarget.classList.add('plan-flip-card--dragging')
  }

  function movePlanSwipe(event: React.PointerEvent<HTMLDivElement>, plan: Plan['name']) {
    const start = pointerStart.current[plan]
    if (!start) return

    const horizontalDistance = event.clientX - start.x
    const verticalDistance = event.clientY - start.y
    if (Math.abs(verticalDistance) > Math.abs(horizontalDistance)) return

    // The card follows the finger, but is limited to its two carousel faces.
    const angle = Math.max(-180, Math.min(180, start.angle + horizontalDistance * 0.9))
    setCardAngle(plan, angle)
  }

  function finishPlanSwipe(event: React.PointerEvent<HTMLDivElement>, plan: Plan['name']) {
    const start = pointerStart.current[plan]
    delete pointerStart.current[plan]
    event.currentTarget.classList.remove('plan-flip-card--dragging')
    if (!start) return

    const horizontalDistance = event.clientX - start.x
    const verticalDistance = event.clientY - start.y
    if (Math.abs(horizontalDistance) <= Math.abs(verticalDistance)) {
      setCardAngle(plan, start.angle)
      return
    }

    const releaseAngle = Math.max(-180, Math.min(180, start.angle + horizontalDistance * 0.9))
    const finalAngle = Math.abs(releaseAngle) >= 90 ? (releaseAngle < 0 ? -180 : 180) : 0
    settledAngle.current[plan] = finalAngle
    setCardAngle(plan, finalAngle)
  }

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
                <div className="flex h-full flex-col">
                  <div
                    className="plan-flip-card h-full"
                    ref={(node) => { cardRefs.current[plan.name] = node ?? undefined }}
                    onPointerDown={(event) => beginPlanSwipe(event, plan.name)}
                    onPointerMove={(event) => movePlanSwipe(event, plan.name)}
                    onPointerUp={(event) => finishPlanSwipe(event, plan.name)}
                    onPointerCancel={(event) => {
                      const start = pointerStart.current[plan.name]
                      delete pointerStart.current[plan.name]
                      event.currentTarget.classList.remove('plan-flip-card--dragging')
                      if (start) setCardAngle(plan.name, start.angle)
                    }}
                  >
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
                  <p className="mt-3 text-center font-mono text-[0.58rem] font-bold tracking-[0.15em] text-foreground/65 uppercase lg:hidden">
                    Deslizá para ver más información
                  </p>
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

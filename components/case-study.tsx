'use client'

import Link from 'next/link'
import { OptimizedImage } from '@/components/optimized-image'
import { track } from '@vercel/analytics'
import {
  motion,
  useReducedMotion,
} from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  MonitorSmartphone,
} from 'lucide-react'
import { Reveal, RevealItem, StaggerGroup } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

type StoryStage = {
  number: string
  title: string
  copy: string
  src: string
  alt: string
  annotations: string[]
  bridge: string
  imagePosition?: string
  compact?: boolean
}

const STORY_STAGES: StoryStage[] = [
  {
    number: '01',
    title: 'Todo empieza en un solo lugar',
    copy: 'El escritorio reúne indicadores operativos y financieros, vehículos, clientes, vencimientos, pagos recientes y comprobantes pendientes. Cada perfil ve la información que necesita para trabajar.',
    src: '/case-study/dashboard.webp',
    alt: 'Dashboard administrativo de la versión demostrativa del sistema de gestión',
    annotations: ['Indicadores operativos', 'Vencimientos', 'Acceso por roles'],
    bridge: 'Visión general',
  },
  {
    number: '02',
    title: 'Cada vehículo, bajo control',
    copy: 'El inventario permite registrar y consultar unidades, buscar, filtrar por estado, revisar documentación y asignar cada vehículo al cliente correspondiente.',
    src: '/case-study/vehiculos.webp',
    alt: 'Pantalla de gestión de vehículos con inventario, filtros y estados ficticios',
    annotations: ['Inventario', 'Estados', 'Asignación'],
    bridge: 'Del indicador al inventario',
  },
  {
    number: '03',
    title: 'Cada operación conectada a su cliente',
    copy: 'La ficha reúne los datos de contacto, los vehículos asociados y la creación del acceso personal al sistema. Así, la operación y la persona permanecen vinculadas durante todo el recorrido.',
    src: '/case-study/clientes.webp',
    alt: 'Gestión de clientes con vehículos asociados y datos ficticios',
    annotations: ['Ficha del cliente', 'Vehículos asociados', 'Acceso personal'],
    bridge: 'De la asignación a la ficha',
  },
  {
    number: '04',
    title: 'Una operación adaptada a cada caso',
    copy: 'El sistema contempla ventas al contado y financiadas, entrega inicial, planes de cuotas, importes personalizados y permutas. Las validaciones acompañan la operación antes de confirmarla.',
    src: '/case-study/financiacion.webp',
    alt: 'Resumen demostrativo de una financiación con cuotas y datos ficticios',
    annotations: ['Contado o financiación', 'Cuotas personalizadas', 'Permutas'],
    bridge: 'De la ficha a la operación',
  },
  {
    number: '05',
    title: 'Cada cuota tiene seguimiento',
    copy: 'Pagos pendientes, vencimientos y cuotas atrasadas se consultan desde una misma vista. También se contemplan importes personalizados, excedentes y el traslado de saldos a la cuota siguiente.',
    src: '/case-study/pagos.webp',
    alt: 'Seguimiento demostrativo de pagos, cuotas y vencimientos',
    annotations: ['Plan de cuotas', 'Estados', 'Ajuste de saldos'],
    bridge: 'Del plan a los vencimientos',
  },
  {
    number: '06',
    title: 'Del comprobante a la confirmación',
    copy: 'El cliente puede enviar un comprobante y el personal puede revisarlo, aprobarlo o rechazarlo, registrar el importe real y agregar notas antes de cerrar el pago.',
    src: '/case-study/comprobantes.webp',
    alt: 'Vista previa de un comprobante totalmente ficticio dentro del entorno demostrativo',
    annotations: ['Comprobante asociado', 'Revisión', 'Aprobar o rechazar'],
    bridge: 'De la cuota a su comprobante',
  },
  {
    number: '07',
    title: 'Información lista para decidir',
    copy: 'Los reportes reúnen clientes, pagos, permutas, inventario y estado financiero. Se pueden filtrar por rango de fechas y exportar en PDF, CSV o JSON.',
    src: '/case-study/reportes.webp',
    alt: 'Reportes administrativos con filtros y datos ficticios',
    annotations: ['Filtros', 'Exportación', 'Seguimiento'],
    bridge: 'De la operación a los indicadores',
  },
  {
    number: '08',
    title: 'El cliente también tiene su espacio',
    copy: 'Desde el celular puede ver el progreso de su financiación, el próximo vencimiento, pagos pendientes, cuotas vencidas, historial y el envío de comprobantes.',
    src: '/case-study/cliente-mobile.webp',
    alt: 'Escritorio móvil del cliente con información ficticia de su financiación',
    annotations: ['Próximo vencimiento', 'Progreso', 'Historial'],
    bridge: 'La operación, en manos del cliente',
    imagePosition: 'object-top',
    compact: true,
  },
]

const TECHNOLOGY_GROUPS = [
  { label: 'Frontend', items: ['React', 'Vite', 'React Router', 'Tailwind CSS', 'Axios', 'Recharts'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'API REST'] },
  { label: 'Base de datos', items: ['PostgreSQL', 'Prisma ORM'] },
  { label: 'Seguridad', items: ['JWT', 'bcrypt', 'express-validator', 'Helmet', 'CORS', 'Rate limiting'] },
  { label: 'Plataforma', items: ['PWA', 'Service worker', 'Vercel', 'jsPDF', 'jsPDF AutoTable'] },
]

const CAPABILITIES = [
  'Gestión de vehículos y clientes',
  'Ventas al contado y financiadas',
  'Planes de cuotas personalizados',
  'Permutas',
  'Pagos y vencimientos',
  'Ajuste de excedentes y saldos',
  'Comprobantes',
  'Roles y permisos',
  'Reportes y exportaciones',
  'Dashboard según el tipo de usuario',
  'Experiencia responsive',
  'PWA instalable',
]

const introFacts = [
  '3 niveles de acceso',
  'Vehículos y clientes',
  'Contado y financiación',
  'Responsive',
  'PWA instalable',
]

function ScreenFrame({
  stage,
  priority = false,
  className,
  annotate = true,
}: {
  stage: StoryStage
  priority?: boolean
  className?: string
  annotate?: boolean
}) {
  return (
    <figure
      className={cn(
        'relative overflow-hidden rounded-[1.5rem_0.45rem_1.5rem_0.45rem] border border-background/25 bg-[#f8fafc] shadow-[0_16px_42px_rgba(12,5,18,0.28)] sm:rounded-[2.4rem_0.7rem_2.4rem_0.7rem] sm:shadow-[0_28px_80px_rgba(12,5,18,0.34)]',
        className,
      )}
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-foreground/15 bg-background px-3 sm:h-9 sm:px-4" aria-hidden="true">
        <span className="size-2 rounded-full bg-primary" />
        <span className="size-2 rounded-full bg-accent" />
        <span className="size-2 rounded-full bg-secondary" />
        <span className="ml-3 h-1.5 w-20 rounded-full bg-foreground/12" />
      </div>
      <div className={cn('relative bg-[#f8fafc]', stage.compact ? 'mx-auto aspect-[0.58] max-h-[62vh] max-w-sm' : 'aspect-[1.44]')}>
        <OptimizedImage
          src={stage.src}
          alt={stage.alt}
          fill
          priority={priority}
          sizes={stage.compact ? '(max-width: 1024px) 86vw, 390px' : '(max-width: 1024px) 94vw, 62vw'}
          objectPosition={stage.imagePosition ?? 'top'}
          className="object-cover"
        />
      </div>
      {annotate ? (
        <figcaption className="relative flex flex-wrap gap-1.5 border-t border-foreground/15 bg-background p-3 sm:absolute sm:right-5 sm:bottom-5 sm:left-5 sm:border-0 sm:bg-transparent sm:p-0">
          {stage.annotations.map((annotation, index) => (
            <span
              key={annotation}
              className={cn(
                'rounded-full border px-2.5 py-1 font-mono text-[8px] tracking-[0.12em] uppercase shadow-sm backdrop-blur-md sm:px-3 sm:text-[9px]',
                index === 0
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-foreground/20 bg-background/90 text-foreground',
              )}
            >
              {annotation}
            </span>
          ))}
        </figcaption>
      ) : null}
    </figure>
  )
}

function DesktopStory() {
  const reduceMotion = useReducedMotion()
  const [activeStage, setActiveStage] = useState(0)
  const stageRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveStage(Number((visible.target as HTMLElement).dataset.stage))
      },
      { rootMargin: '-34% 0px -38% 0px', threshold: [0.15, 0.35, 0.6] },
    )

    stageRefs.current.forEach((node) => {
      if (node) observer.observe(node)
    })
    return () => observer.disconnect()
  }, [])

  const stage = STORY_STAGES[activeStage]

  return (
    <div className="hidden lg:grid lg:grid-cols-[minmax(0,1.32fr)_minmax(22rem,0.68fr)] lg:gap-16">
      <div
        id="case-story-visual"
        className="flex h-[calc(100vh-9rem)] flex-col justify-center self-start py-5"
        style={{ position: 'sticky', top: '7rem' }}
      >
          <div className="mb-5 flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">{stage.bridge}</p>
              <p className="mt-1 text-sm text-background/55">{stage.number} / {STORY_STAGES.length.toString().padStart(2, '0')}</p>
            </div>
            <div className="w-44">
              <div className="mb-2 flex justify-between font-mono text-[9px] tracking-[0.14em] text-background/55 uppercase">
                <span>Recorrido</span>
                <span>{Math.round(((activeStage + 1) / STORY_STAGES.length) * 100)}%</span>
              </div>
              <div className="h-px bg-background/20">
                <motion.div
                  className="h-px origin-left bg-primary"
                  animate={{ scaleX: (activeStage + 1) / STORY_STAGES.length }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: EASE }}
                />
              </div>
            </div>
          </div>

          <div className="relative min-h-0 flex-1">
            {STORY_STAGES.map((screen, index) => {
              const isActive = index === activeStage
              return (
                <motion.div
                  key={screen.number}
                  className="absolute inset-0 flex items-center"
                  initial={false}
                  animate={
                    isActive
                      ? { opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 0rem)', scale: 1, filter: 'blur(0px)' }
                      : { opacity: 0, clipPath: 'inset(0% 0% 100% 0% round 2.4rem)', scale: 1.012, filter: 'blur(3px)' }
                  }
                  transition={reduceMotion ? { duration: 0.01 } : { duration: 0.72, ease: EASE }}
                  style={{ zIndex: isActive ? 2 : 1, pointerEvents: isActive ? 'auto' : 'none' }}
                  aria-hidden={!isActive}
                >
                  <ScreenFrame stage={screen} priority={index === 0} className="w-full" />
                </motion.div>
              )
            })}
          </div>

          <div className="mt-5 grid grid-cols-8 gap-2" aria-label={`Etapa ${activeStage + 1} de ${STORY_STAGES.length}`}>
            {STORY_STAGES.map((item, index) => (
              <button
                key={item.number}
                type="button"
                onClick={() => document.getElementById(`case-stage-${item.number}`)?.scrollIntoView({ behavior: 'auto', block: 'center' })}
                aria-label={`Ir a la etapa ${item.number}: ${item.title}`}
                aria-current={index === activeStage ? 'step' : undefined}
                className={cn(
                  'h-1 rounded-full transition-colors duration-300',
                  index <= activeStage ? 'bg-primary' : 'bg-background/20 hover:bg-background/45',
                )}
              />
            ))}
          </div>
      </div>

      <div className="py-[24vh]">
        {STORY_STAGES.map((item, index) => (
          <div
            key={item.number}
            id={`case-stage-${item.number}`}
            ref={(node) => { stageRefs.current[index] = node }}
            data-stage={index}
            className={cn(
              'flex min-h-[64vh] flex-col justify-center border-t border-background/20 py-16 first:border-t-0',
              index === 3 || index === 4 ? 'min-h-[73vh]' : '',
              index === 7 ? 'min-h-[70vh]' : '',
            )}
          >
            <div className="flex items-center gap-4">
              <span className={cn('font-mono text-xs tracking-[0.18em]', index === activeStage ? 'text-primary' : 'text-background/40')}>{item.number}</span>
              <span className="h-px flex-1 bg-background/20" />
            </div>
            <h3 className={cn('mt-7 text-4xl leading-[0.98] font-semibold text-balance transition-colors duration-500', index === activeStage ? 'text-background' : 'text-background/42')}>{item.title}</h3>
            <p className={cn('mt-5 text-base leading-relaxed transition-colors duration-500', index === activeStage ? 'text-background/72' : 'text-background/35')}>{item.copy}</p>
            <p className={cn('mt-8 font-mono text-[9px] tracking-[0.16em] uppercase transition-colors duration-500', index === activeStage ? 'text-primary' : 'text-background/25')}>{item.bridge}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function MobileStory() {
  return (
    <div className="lg:hidden">
      {STORY_STAGES.map((stage, index) => (
        <Reveal key={stage.number} className="border-t border-background/25 py-10 first:border-t-0 first:pt-3 min-[430px]:py-12">
          <article id={`mobile-case-stage-${stage.number}`}>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.17em] uppercase">
              <span className="text-primary">{stage.number}</span>
              <span className="h-px flex-1 bg-background/25" />
              <span className="text-background/45">{stage.bridge}</span>
            </div>
            <h3 className="mt-5 text-[2rem] leading-[0.98] font-semibold text-balance min-[390px]:text-4xl">{stage.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-background/68 min-[390px]:text-base">{stage.copy}</p>
            <ScreenFrame stage={stage} priority={index === 0} className="mt-6" />
          </article>
        </Reveal>
      ))}
    </div>
  )
}

export function CaseStudy() {
  return (
    <section id="case-study" aria-labelledby="case-study-title" className="relative scroll-mt-20 bg-foreground py-12 text-background sm:py-24">
      <div aria-hidden="true" className="absolute top-0 right-0 h-1.5 w-1/3 bg-primary" />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Caso de estudio"
          title="Trabajo destacado"
          description="Una aplicación web empresarial completa, desarrollada para acompañar una operación desde el ingreso del vehículo hasta el último pago."
          id="case-study-title"
          className="border-background/45 [&_h2]:text-background [&_p]:text-background/68 [&_span]:text-primary"
        />

        <Reveal className="mt-8 sm:mt-14">
          <div className="grid gap-6 border-t border-background/25 pt-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:gap-16">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase sm:text-xs">Sistema de Gestión para Automotora</p>
              <h3 className="mt-4 max-w-4xl text-[2.35rem] leading-[0.94] font-semibold tracking-[-0.045em] text-balance min-[390px]:text-4xl sm:text-6xl lg:text-7xl">Una operación completa, conectada.</h3>
            </div>
            <p className="self-end text-base leading-relaxed text-background/70 sm:text-lg">Aplicación web desarrollada a medida para centralizar vehículos, clientes, financiaciones, pagos, comprobantes y reportes en una única plataforma.</p>
          </div>
        </Reveal>

        <Reveal className="relative mt-8 sm:mt-14">
          <div aria-hidden="true" className="absolute -inset-2 rounded-[2rem_0.55rem_2rem_0.55rem] bg-accent sm:-inset-5 sm:rounded-[3rem_0.8rem_3rem_0.8rem]" />
          <div className="relative overflow-hidden rounded-[1.75rem_0.5rem_1.75rem_0.5rem] border border-foreground/35 bg-background shadow-[0_20px_58px_rgba(8,3,12,0.32)] sm:rounded-[2.5rem_0.7rem_2.5rem_0.7rem] sm:shadow-[0_34px_100px_rgba(8,3,12,0.38)]">
            <div className="relative aspect-[1.2] sm:aspect-[1.55] lg:aspect-[1.78]">
              <Image
                src="/case-study/dashboard.webp"
                alt="Composición del dashboard administrativo de la versión demostrativa"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1400px) 94vw, 1320px"
                className="object-cover object-top"
              />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/65 to-transparent" />
              <div className="absolute right-3 bottom-3 w-[27%] min-w-24 overflow-hidden rounded-[1.6rem] border-[5px] border-foreground bg-background shadow-2xl sm:right-6 sm:bottom-6 sm:w-[20%] sm:border-[8px] lg:right-10 lg:bottom-10">
                <OptimizedImage src="/case-study/cliente-mobile.webp" alt="Vista móvil demostrativa del cliente" width={382} height={826} sizes="(max-width: 640px) 27vw, 260px" className="h-auto w-full" />
              </div>
              <div className="absolute bottom-4 left-4 hidden max-w-[62%] flex-wrap gap-2 sm:flex lg:bottom-8 lg:left-8">
                {introFacts.map((fact, index) => (
                  <span key={fact} className={cn('rounded-full border px-3 py-1.5 font-mono text-[9px] tracking-[0.12em] uppercase backdrop-blur-md', index === 0 ? 'border-primary bg-primary text-primary-foreground' : 'border-background/35 bg-foreground/75 text-background')}>{fact}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <StaggerGroup className="mt-6 grid grid-cols-2 gap-2 sm:mt-8 sm:grid-cols-5 sm:gap-0 sm:border-y sm:border-background/25" gap={0.035}>
          {introFacts.map((fact, index) => (
            <RevealItem
              key={fact}
              className={cn(
                'flex min-h-[4.5rem] items-center rounded-[1rem_0.3rem_1rem_0.3rem] border border-background/20 bg-background/[0.045] px-3.5 py-3 font-mono text-[8px] leading-relaxed tracking-[0.11em] uppercase sm:min-h-20 sm:rounded-none sm:border-y-0 sm:border-l-0 sm:bg-transparent sm:px-4 sm:py-4 sm:text-[9px] sm:tracking-[0.13em]',
                index < introFacts.length - 1 ? 'sm:border-r' : 'sm:border-r-0',
                index === introFacts.length - 1 ? 'col-span-2 sm:col-span-1' : '',
              )}
            >
              <span className="flex items-start gap-2.5">
                <span className="shrink-0 text-primary">0{index + 1}</span>
                <span>{fact}</span>
              </span>
            </RevealItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-8 flex items-center justify-center gap-3 text-background/55 sm:mt-12">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Recorré el sistema</span>
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: EASE }}><ArrowDown className="size-4" aria-hidden="true" /></motion.span>
        </Reveal>

        <div className="mt-6 sm:mt-14">
          <DesktopStory />
          <MobileStory />
        </div>

        <div className="border-t border-background/25 pt-12 sm:pt-24">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">Resultado / 09</p>
                <h3 className="mt-5 text-4xl leading-[0.96] font-semibold text-balance sm:text-6xl">Una operación completa, conectada.</h3>
                <p className="mt-5 max-w-xl leading-relaxed text-background/68">Un sistema que conecta toda la operación, desde el ingreso del vehículo hasta el último pago.</p>
              </div>
              <div className="relative min-h-[18rem] min-[390px]:min-h-[21rem] sm:min-h-[32rem]">
                <ScreenFrame stage={STORY_STAGES[0]} annotate={false} className="absolute top-0 right-0 w-[88%]" />
                <ScreenFrame stage={STORY_STAGES[4]} annotate={false} className="absolute bottom-0 left-0 w-[56%]" />
                <div className="absolute right-[3%] bottom-0 w-[23%] min-w-24 overflow-hidden rounded-[2rem] border-[6px] border-foreground bg-background shadow-2xl">
                  <OptimizedImage src="/case-study/cliente-mobile.webp" alt="Vista móvil del cliente dentro de la composición final" width={382} height={826} sizes="220px" className="h-auto w-full" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 border-t border-background/25 pt-9 sm:mt-24 sm:gap-10 sm:pt-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <Reveal>
            <p className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">Arquitectura verificada</p>
            <h3 className="mt-5 text-4xl font-semibold sm:text-5xl">Tecnología por capas.</h3>
            <p className="mt-4 max-w-md leading-relaxed text-background/65">La interfaz, la API, los datos y la seguridad están separados para que cada parte cumpla una función clara.</p>
          </Reveal>
          <StaggerGroup className="overflow-hidden rounded-[1.35rem_0.4rem_1.35rem_0.4rem] border border-background/20 bg-background/[0.035] sm:rounded-none sm:border-x-0 sm:border-b-0 sm:bg-transparent" gap={0.05}>
            {TECHNOLOGY_GROUPS.map((group, index) => (
              <RevealItem key={group.label}>
                <div className="grid gap-4 border-b border-background/20 p-4 last:border-b-0 sm:grid-cols-[9rem_1fr] sm:items-start sm:border-background/25 sm:px-0 sm:py-5">
                  <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-primary uppercase">
                    <span>0{index + 1}</span>
                    <span className="h-px w-5 bg-primary/55 sm:hidden" aria-hidden="true" />
                    <span>{group.label}</span>
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-background/80 sm:gap-x-4 sm:gap-y-2 sm:text-base sm:text-background/76">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-background/20 bg-background/[0.055] px-3 py-2 leading-none sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:leading-normal"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealItem>
            ))}
          </StaggerGroup>
        </div>

        <div className="mt-12 border-t border-background/25 pt-9 sm:mt-24 sm:pt-10">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <Reveal>
              <p className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">Alcance funcional</p>
              <h3 className="mt-5 text-4xl font-semibold sm:text-5xl">Más que una colección de pantallas.</h3>
            </Reveal>
            <StaggerGroup className="grid border-t border-background/25 sm:grid-cols-2" gap={0.04}>
              {CAPABILITIES.map((capability, index) => (
                <RevealItem key={capability} className={cn('flex min-h-16 items-center gap-3 border-b border-background/25 py-3 text-sm font-medium sm:text-base', index % 2 === 0 ? 'sm:pr-6' : 'sm:border-l sm:pl-6')}>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-4" aria-hidden="true" /></span>
                  {capability}
                </RevealItem>
              ))}
            </StaggerGroup>
          </div>
        </div>

        <Reveal className="mt-12 sm:mt-16">
          <p className="rounded-[1.6rem_0.45rem_1.6rem_0.45rem] border border-background/25 bg-background/[0.05] p-5 text-sm leading-relaxed text-background/68 sm:p-6">Por motivos de confidencialidad, las imágenes corresponden a una versión demostrativa con datos ficticios y no representan información real del cliente.</p>
        </Reveal>

        <Reveal className="mt-12 overflow-hidden rounded-[2rem_0.55rem_2rem_0.55rem] bg-accent p-5 text-foreground min-[390px]:p-6 sm:mt-24 sm:rounded-[3rem_0.75rem_3rem_0.75rem] sm:p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <MonitorSmartphone className="size-8 text-primary" aria-hidden="true" />
              <h3 className="mt-6 max-w-3xl text-[2.15rem] leading-[0.95] font-semibold text-balance min-[390px]:text-4xl sm:mt-8 sm:text-6xl">¿Necesitás un sistema para tu negocio?</h3>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">Puedo desarrollar una solución adaptada a la forma en la que trabajás, desde una herramienta interna hasta una aplicación completa.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/#contact" onClick={() => track('case_study_cta_click', { action: 'contact' })} className="primary-action group flex min-h-14 items-center justify-between gap-8 bg-primary px-5 font-semibold text-primary-foreground">Contame tu idea <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
              <Link href="/#call-booking" onClick={() => track('booking_started', { source: 'case_study' })} className="group flex min-h-14 items-center justify-between gap-8 border border-foreground px-5 font-semibold transition-colors hover:bg-foreground hover:text-background"><span className="flex items-center gap-2"><CalendarDays className="size-5" />Agendar una reunión</span><ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

export type RecommendedPlan = 'CLASSIC' | 'GOLD' | 'BLACK'

type Answers = {
  business: string
  objective: string
  sections: string
  features: string[]
  timing: string
}

type Option = {
  value: string
  label: string
  detail: string
}

const INITIAL_ANSWERS: Answers = {
  business: '',
  objective: '',
  sections: '',
  features: [],
  timing: '',
}

const BUSINESS_OPTIONS: Option[] = [
  { value: 'emprendimiento', label: 'Emprendimiento', detail: 'Estoy dando los primeros pasos.' },
  { value: 'profesional', label: 'Profesional independiente', detail: 'Vendo servicios con mi nombre o marca.' },
  { value: 'empresa', label: 'Empresa', detail: 'Necesito presentar una oferta más amplia.' },
  { value: 'comercio', label: 'Comercio o tienda', detail: 'Vendo productos físicos o digitales.' },
]

const STANDARD_SECTIONS: Option[] = [
  { value: '1', label: 'Una página', detail: 'Todo el contenido en un recorrido compacto.' },
  { value: '2-5', label: 'Entre 2 y 5', detail: 'Una estructura pequeña con páginas separadas.' },
  { value: '6-8', label: 'Entre 6 y 8', detail: 'Una web empresarial con contenido amplio.' },
  { value: '9+', label: 'Más de 8', detail: 'Arquitectura extensa o áreas personalizadas.' },
]

function getObjectiveOptions(business: string): Option[] {
  if (business === 'comercio') {
    return [
      { value: 'venta', label: 'Vender directamente online', detail: 'Cobrar y gestionar pedidos desde la web.' },
      { value: 'catalogo', label: 'Mostrar productos y recibir consultas', detail: 'Un catálogo claro sin compra inmediata.' },
      { value: 'local', label: 'Llevar clientes al local', detail: 'Destacar productos, ubicación y horarios.' },
      { value: 'operaciones', label: 'Centralizar pedidos u operaciones', detail: 'Reducir tareas manuales y ordenar el negocio.' },
    ]
  }

  if (business === 'empresa') {
    return [
      { value: 'confianza', label: 'Presentar servicios y generar confianza', detail: 'Explicar mejor la empresa y su propuesta.' },
      { value: 'clientes', label: 'Conseguir oportunidades comerciales', detail: 'Convertir visitas en consultas calificadas.' },
      { value: 'reclutamiento', label: 'Atraer talento o socios', detail: 'Comunicar cultura, equipo y oportunidades.' },
      { value: 'operaciones', label: 'Digitalizar un proceso', detail: 'Usuarios, datos, reservas o herramientas internas.' },
    ]
  }

  if (business === 'profesional') {
    return [
      { value: 'presencia', label: 'Presentar mi marca profesional', detail: 'Explicar qué hago y cómo contactarme.' },
      { value: 'clientes', label: 'Conseguir más consultas', detail: 'Transformar visitas en conversaciones reales.' },
      { value: 'reservas', label: 'Recibir reservas o solicitudes', detail: 'Organizar citas sin intercambiar mensajes.' },
      { value: 'contenido', label: 'Publicar contenido o trabajos', detail: 'Mostrar experiencia, portfolio o artículos.' },
    ]
  }

  return [
    { value: 'validar', label: 'Validar mi idea', detail: 'Salir al mercado con una propuesta clara.' },
    { value: 'presencia', label: 'Tener presencia profesional', detail: 'Explicar el negocio y cómo contactarlo.' },
    { value: 'clientes', label: 'Conseguir mis primeros clientes', detail: 'Convertir visitas en oportunidades.' },
    { value: 'venta', label: 'Vender un producto o servicio', detail: 'Cobrar o gestionar pedidos desde la web.' },
  ]
}

function getSectionOptions(answers: Answers): Option[] {
  if (answers.business === 'comercio' || ['venta', 'catalogo'].includes(answers.objective)) {
    return [
      { value: '1', label: 'Una página + selección breve', detail: 'Una propuesta central y pocos productos.' },
      { value: '2-5', label: '2–5 páginas o categorías', detail: 'Un catálogo pequeño y fácil de recorrer.' },
      { value: '6-8', label: '6–8 páginas o categorías', detail: 'Una oferta variada con contenido propio.' },
      { value: '9+', label: 'Más de 8 o catálogo amplio', detail: 'Muchos productos, categorías o filtros.' },
    ]
  }

  if (['operaciones', 'reservas'].includes(answers.objective)) {
    return [
      { value: '1', label: 'Una experiencia principal', detail: 'Un flujo directo para una tarea concreta.' },
      { value: '2-5', label: 'Entre 2 y 5 áreas', detail: 'Varias vistas conectadas en un mismo sistema.' },
      { value: '6-8', label: 'Entre 6 y 8 áreas', detail: 'Roles o procesos con mayor profundidad.' },
      { value: '9+', label: 'Más de 8 áreas', detail: 'Una plataforma extensa y personalizada.' },
    ]
  }

  return STANDARD_SECTIONS
}

function getFeatureOptions(answers: Answers): Option[] {
  if (answers.business === 'comercio') {
    return [
      { value: 'catalogo', label: 'Catálogo administrable', detail: 'Productos, categorías, filtros y búsquedas.' },
      { value: 'pagos', label: 'Pagos online', detail: 'Carrito, cobro y confirmación de compra.' },
      { value: 'stock', label: 'Stock, envíos o retiro', detail: 'Disponibilidad y opciones de entrega.' },
      { value: 'integraciones', label: 'Integraciones externas', detail: 'Facturación, CRM, logística u otras APIs.' },
    ]
  }

  if (answers.business === 'empresa') {
    return [
      { value: 'casos', label: 'Casos, servicios o equipo', detail: 'Contenido para respaldar la propuesta.' },
      { value: 'idiomas', label: 'Más de un idioma', detail: 'Una experiencia preparada para otros mercados.' },
      { value: 'crm', label: 'Formularios conectados al CRM', detail: 'Consultas organizadas automáticamente.' },
      { value: 'panel', label: 'Usuarios o panel interno', detail: 'Acceso privado, datos y operaciones.' },
    ]
  }

  if (answers.business === 'profesional') {
    return [
      { value: 'contacto', label: 'Contacto directo', detail: 'Formulario, teléfono y redes principales.' },
      { value: 'portfolio', label: 'Portfolio o galería', detail: 'Trabajos, servicios o resultados destacados.' },
      { value: 'blog', label: 'Blog editable', detail: 'Contenido para demostrar experiencia y posicionar.' },
      { value: 'reservas', label: 'Agenda y reservas', detail: 'Disponibilidad y confirmaciones automáticas.' },
    ]
  }

  return [
    { value: 'contacto', label: 'Contacto y mapa', detail: 'Formulario, ubicación y horarios.' },
    { value: 'galeria', label: 'Galería o trabajos', detail: 'Contenido visual para generar confianza.' },
    { value: 'blog', label: 'Blog editable', detail: 'Publicaciones para crecer con contenido.' },
    { value: 'pagos', label: 'Pagos o reservas', detail: 'Cobros, agenda o confirmaciones automáticas.' },
  ]
}

function getTimingOptions(answers: Answers): Option[] {
  const complex =
    answers.business === 'comercio' ||
    ['venta', 'operaciones', 'reservas'].includes(answers.objective) ||
    answers.sections === '9+'

  return [
    { value: 'urgente', label: 'Lo antes posible', detail: complex ? 'Podemos definir una primera fase prioritaria.' : 'Me gustaría comenzar en las próximas semanas.' },
    { value: '1-2', label: 'En 1–2 meses', detail: complex ? 'Tiempo razonable para definir alcance y contenidos.' : 'Tengo margen para preparar bien el contenido.' },
    { value: '3-6', label: 'En 3–6 meses', detail: 'Estoy planificando con anticipación.' },
    { value: 'flexible', label: 'Sin fecha definida', detail: 'Primero quiero entender alcance y opciones.' },
  ]
}

function getStep(step: number, answers: Answers) {
  if (step === 0) return { eyebrow: 'Tipo de negocio', title: '¿Qué estás construyendo?', options: BUSINESS_OPTIONS }
  if (step === 1) return { eyebrow: 'Objetivo personalizado', title: '¿Qué resultado necesitas conseguir?', options: getObjectiveOptions(answers.business) }
  if (step === 2) return { eyebrow: 'Tamaño del proyecto', title: answers.business === 'comercio' ? '¿Qué tamaño tendrá tu catálogo?' : '¿Qué tamaño imaginas?', options: getSectionOptions(answers) }
  if (step === 3) return { eyebrow: 'Funciones para tu caso', title: '¿Qué necesita esta solución?', options: getFeatureOptions(answers) }
  return { eyebrow: 'Fecha aproximada', title: '¿Cuándo quieres ponerlo en marcha?', options: getTimingOptions(answers) }
}

function getOptionLabel(options: readonly Option[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value
}

function recommendPlan(answers: Answers): { plan: RecommendedPlan; reason: string } {
  const needsCustomDevelopment =
    answers.business === 'comercio' ||
    ['venta', 'catalogo', 'operaciones', 'reservas'].includes(answers.objective) ||
    answers.sections === '9+' ||
    answers.features.some((feature) =>
      ['catalogo', 'pagos', 'stock', 'integraciones', 'panel', 'reservas'].includes(feature),
    )

  const business = getOptionLabel(BUSINESS_OPTIONS, answers.business).toLowerCase()
  const objective = getOptionLabel(getObjectiveOptions(answers.business), answers.objective).toLowerCase()

  if (needsCustomDevelopment) {
    return {
      plan: 'BLACK',
      reason: `Para un contexto de ${business} orientado a ${objective}, las funciones elegidas necesitan una solución diseñada a medida.`,
    }
  }

  const needsProfessionalSite =
    answers.business === 'empresa' ||
    answers.objective === 'confianza' ||
    answers.objective === 'clientes' ||
    answers.objective === 'reclutamiento' ||
    answers.objective === 'contenido' ||
    ['2-5', '6-8'].includes(answers.sections) ||
    answers.features.some((feature) => ['casos', 'idiomas', 'crm', 'portfolio', 'blog', 'galeria'].includes(feature))

  if (needsProfessionalSite) {
    return {
      plan: 'GOLD',
      reason: `Tu perfil de ${business} y el objetivo de ${objective} requieren una web completa para presentar, convencer y convertir.`,
    }
  }

  return {
    plan: 'CLASSIC',
    reason: `Para ${objective}, una presencia compacta cubre lo esencial de tu ${business} sin sumar complejidad innecesaria.`,
  }
}

function createSummary(answers: Answers, plan: RecommendedPlan) {
  const featureLabels = answers.features.length
    ? answers.features.map((value) => getOptionLabel(getFeatureOptions(answers), value)).join(', ')
    : 'Sin funciones adicionales'

  return [
    'Resumen del selector MR14:',
    `Tipo de negocio: ${getOptionLabel(BUSINESS_OPTIONS, answers.business)}.`,
    `Objetivo: ${getOptionLabel(getObjectiveOptions(answers.business), answers.objective)}.`,
    `Secciones: ${getOptionLabel(getSectionOptions(answers), answers.sections)}.`,
    `Funciones: ${featureLabels}.`,
    `Fecha aproximada: ${getOptionLabel(getTimingOptions(answers), answers.timing)}.`,
    `Plan recomendado: ${plan}.`,
    '',
    'Quiero recibir una recomendación sobre el alcance de mi proyecto.',
  ].join('\n')
}

type PlanFinderProps = {
  onComplete: (result: { plan: RecommendedPlan; summary: string }) => void
  onReset: () => void
  onViewForm: () => void
}

export function PlanFinder({ onComplete, onReset, onViewForm }: PlanFinderProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS)
  const [result, setResult] = useState<ReturnType<typeof recommendPlan> | null>(null)

  const current = getStep(step, answers)
  const progress = result ? 100 : ((step + 1) / 5) * 100

  function finish(nextAnswers: Answers) {
    const nextResult = recommendPlan(nextAnswers)
    setAnswers(nextAnswers)
    setResult(nextResult)
    onComplete({
      plan: nextResult.plan,
      summary: createSummary(nextAnswers, nextResult.plan),
    })
  }

  function selectSingle(value: string) {
    const nextAnswers: Answers =
      step === 0
        ? { business: value, objective: '', sections: '', features: [], timing: '' }
        : step === 1
          ? { ...answers, objective: value, sections: '', features: [], timing: '' }
          : step === 2
            ? { ...answers, sections: value, features: [], timing: '' }
            : { ...answers, timing: value }
    setAnswers(nextAnswers)

    if (step === 4) finish(nextAnswers)
    else window.setTimeout(() => setStep((currentStep) => currentStep + 1), 180)
  }

  function toggleFeature(value: string) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      features: currentAnswers.features.includes(value)
        ? currentAnswers.features.filter((feature) => feature !== value)
        : [...currentAnswers.features, value],
    }))
  }

  function reset() {
    setAnswers(INITIAL_ANSWERS)
    setResult(null)
    setStep(0)
    onReset()
  }

  return (
    <section aria-labelledby="plan-finder-title" className="overflow-hidden rounded-[2.75rem_0.6rem_2.75rem_0.6rem] border border-background/30 bg-background text-foreground shadow-[0_28px_80px_rgba(0,0,0,0.2)]">
      <div className="grid border-b border-foreground/20 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="bg-accent p-7 sm:p-10 lg:p-12">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Selector de plan</span>
          <h2 id="plan-finder-title" className="mt-4 text-4xl leading-[0.95] font-semibold tracking-[-0.05em] sm:text-5xl">
            Encuentra tu punto de partida.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-foreground/65">
            Cada respuesta adapta la siguiente pregunta para construir una recomendación realmente personal.
          </p>

          <div className="mt-8" aria-label={`Paso ${Math.min(step + 1, 5)} de 5`}>
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/55">
              <span>{result ? 'Completado' : `Paso ${step + 1} / 5`}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-foreground/10">
              <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} transition={{ duration: 0.45, ease: EASE }} />
            </div>
          </div>
        </div>

        <div className="min-h-[430px] p-6 min-[380px]:p-7 sm:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex h-full flex-col justify-center"
                aria-live="polite"
              >
                <span className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Sparkles className="size-5" />
                </span>
                <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Mi recomendación</p>
                <p className="mt-2 text-6xl font-bold tracking-[-0.06em] sm:text-7xl">{result.plan}</p>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{result.reason}</p>
                <p className="mt-3 text-sm text-muted-foreground">El formulario ya quedó completado con tus respuestas.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button type="button" onClick={onViewForm} className="h-12 rounded-full px-6 font-bold">
                    Ver formulario completado <ArrowRight data-icon="inline-end" />
                  </Button>
                  <Button type="button" variant="outline" onClick={reset} className="h-12 rounded-full px-6 font-bold">
                    <RotateCcw data-icon="inline-start" /> Repetir selector
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.32, ease: EASE }}
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{current.eyebrow}</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{current.title}</h3>
                {step > 0 ? (
                  <p className="mt-3 text-xs font-semibold text-muted-foreground">
                    Ruta personalizada · {getOptionLabel(BUSINESS_OPTIONS, answers.business)}
                    {step > 1 ? ` · ${getOptionLabel(getObjectiveOptions(answers.business), answers.objective)}` : ''}
                  </p>
                ) : null}

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {current.options.map((option) => {
                    const isFeatureStep = step === 3
                    const active = isFeatureStep
                      ? answers.features.includes(option.value)
                      : answers[step === 0 ? 'business' : step === 1 ? 'objective' : step === 2 ? 'sections' : 'timing'] === option.value

                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={active}
                        onClick={() => isFeatureStep ? toggleFeature(option.value) : selectSingle(option.value)}
                        className={cn(
                          'group min-h-24 rounded-[1.5rem_0.35rem_1.5rem_0.35rem] border p-4 text-left outline-none transition-all duration-300 focus-visible:ring-3 focus-visible:ring-ring',
                          active
                            ? 'border-primary bg-primary text-primary-foreground shadow-[0_12px_28px_rgba(255,93,58,0.2)]'
                            : 'border-foreground/25 bg-card hover:-translate-y-1 hover:border-primary',
                        )}
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span className="font-bold">{option.label}</span>
                          <span className={cn('grid size-5 shrink-0 place-items-center rounded-full border', active ? 'border-primary-foreground bg-primary-foreground text-primary' : 'border-foreground/30')}>
                            {active ? <Check className="size-3" strokeWidth={3} /> : null}
                          </span>
                        </span>
                        <span className={cn('mt-2 block text-xs leading-relaxed', active ? 'text-primary-foreground/80' : 'text-muted-foreground')}>{option.detail}</span>
                      </button>
                    )
                  })}
                </div>

                <div className="mt-7 flex items-center justify-between gap-3">
                  <Button type="button" variant="ghost" disabled={step === 0} onClick={() => setStep((currentStep) => Math.max(0, currentStep - 1))} className="h-11 rounded-full px-4">
                    <ArrowLeft data-icon="inline-start" /> Atrás
                  </Button>
                  {step === 3 ? (
                    <Button type="button" onClick={() => setStep(4)} className="h-11 rounded-full px-5 font-bold">
                      Continuar <ArrowRight data-icon="inline-end" />
                    </Button>
                  ) : null}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-3 px-6 py-4 text-xs text-muted-foreground sm:px-10">
        <Building2 className="size-4 shrink-0 text-primary" />
        La recomendación es orientativa. El alcance final se define contigo antes de comenzar.
      </div>
    </section>
  )
}

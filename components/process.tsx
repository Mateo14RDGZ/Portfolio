'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { Plus } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { viewportOnce, EASE, useCompactMotion } from '@/lib/motion'

const STEPS = [
  {
    title: 'Consulta inicial',
    copy: 'Conversamos sobre tu negocio, tus clientes y el objetivo del proyecto. Es una instancia sin costo para entender si tiene sentido avanzar.',
  },
  {
    title: 'Propuesta clara',
    copy: 'Te envío una propuesta con alcance, plazo y presupuesto. Antes de empezar, sabés exactamente qué incluye el trabajo.',
  },
  {
    title: 'Diseño',
    copy: 'Vas a ver el diseño real: tipografía, colores, estructura y recorridos. Lo ajustamos antes de comenzar con el código.',
  },
  {
    title: 'Desarrollo',
    copy: 'Construyo el sitio o sistema con una versión mobile cuidada desde el principio y avances claros durante el proceso.',
  },
  {
    title: 'Entrega y acompañamiento',
    copy: 'Completo las pruebas acordadas, publico la web y te explico cómo gestionar lo esencial. También quedo disponible para mantenimiento y mejoras posteriores.',
  },
]

export function Process() {
  const compactMotion = useCompactMotion()
  const containerRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 60%'],
  })
  // Spring-smoothed so the line glides rather than snapping to scroll.
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })
  const scaleY = useTransform(progress, [0, 1], [0, 1])

  return (
    <section
      id="process"
      className="relative mx-auto my-6 max-w-6xl scroll-mt-24 rounded-[0.75rem_4rem_0.75rem_4rem] bg-card px-5 py-16 sm:my-10 sm:px-10 sm:py-20"
    >
      <SectionHeading
        eyebrow="Proceso"
        title="De la consulta a la entrega, sin sorpresas."
        description="Trato directo, una propuesta entendible y un proceso ordenado para que sepas qué está pasando en cada etapa."
      />

      <div className="mt-9 border-t border-foreground sm:hidden">
        {STEPS.map((step, i) => (
          <details key={step.title} className="group border-b border-foreground">
            <summary className="flex min-h-18 cursor-pointer list-none items-center gap-4 py-4 pr-1 font-medium [&::-webkit-details-marker]:hidden">
              <span className="font-mono text-xs font-semibold text-primary">{String(i + 1).padStart(2, '0')}</span>
              <span className="flex-1 text-lg tracking-tight">{step.title}</span>
              <Plus className="size-4 shrink-0 transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="max-w-xl pb-5 pl-8 pr-4 leading-relaxed text-muted-foreground">{step.copy}</p>
          </details>
        ))}
      </div>

      <ol ref={containerRef} className="relative mt-12 hidden flex-col gap-0 border-t border-foreground sm:flex sm:pl-0">
        {/* Rail */}
        <motion.div aria-hidden style={{ scaleX: compactMotion ? 1 : scaleY }} className="absolute top-0 left-0 h-1 w-full origin-left bg-primary" />

        {STEPS.map((step, i) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, x: compactMotion ? 12 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: compactMotion ? 0.4 : 0.52, ease: EASE, delay: compactMotion ? 0 : i * 0.04 }}
            className="group relative grid border-b border-foreground py-7 sm:grid-cols-[10rem_1fr] sm:py-9"
          >
            {/* Node */}
            <span
              aria-hidden
              className="mb-3 font-mono text-xs font-semibold text-primary sm:mb-0"
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
                {step.title}
              </h3>
              <p className="text-muted-foreground max-w-xl leading-relaxed text-pretty">
                {step.copy}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { SectionHeading } from '@/components/section-heading'
import { viewportOnce, EASE } from '@/lib/motion'

const STEPS = [
  {
    title: 'Reunión inicial',
    copy: 'Una llamada de 30 minutos para entender tu negocio, tus clientes y cómo sería un resultado exitoso.',
  },
  {
    title: 'Planificación',
    copy: 'Defino el mapa del sitio, el contenido necesario y el alcance técnico; después envío un plan cerrado antes de comenzar el desarrollo.',
  },
  {
    title: 'Diseño',
    copy: 'Verás pronto el diseño real —tipografía, colores y estructura— y lo perfeccionaremos juntos antes de comenzar con el código.',
  },
  {
    title: 'Desarrollo',
    copy: 'Next.js y TypeScript escritos a mano, con diseño responsive desde el primer momento y enlaces semanales de avance.',
  },
  {
    title: 'Pruebas',
    copy: 'Comprobaciones en distintos navegadores y dispositivos reales, además de revisiones de accesibilidad y rendimiento. Nada se publica con errores.',
  },
  {
    title: 'Lanzamiento',
    copy: 'Configuro el dominio, la analítica y el SEO. Después te explico todo para que sepas exactamente cómo gestionar tu nuevo sitio.',
  },
]

export function Process() {
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
      className="relative mx-auto my-8 max-w-6xl scroll-mt-24 rounded-[0.75rem_4rem_0.75rem_4rem] bg-card px-5 py-20 sm:my-16 sm:px-10 sm:py-28"
    >
      <SectionHeading
        eyebrow="Proceso"
        title="Seis pasos. Sin sorpresas."
        description="Siempre sabrás en qué etapa estamos, qué necesito de ti y qué sucederá después."
      />

      <ol ref={containerRef} className="relative mt-11 flex flex-col gap-0 border-t border-foreground sm:mt-16 sm:pl-0">
        {/* Rail */}
        <motion.div aria-hidden style={{ scaleX: scaleY }} className="absolute top-0 left-0 h-1 w-full origin-left bg-primary" />

        {STEPS.map((step, i) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: EASE, delay: i * 0.04 }}
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

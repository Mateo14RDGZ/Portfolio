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
      className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-28 sm:py-36"
    >
      <SectionHeading
        eyebrow="Proceso"
        title="Seis pasos. Sin sorpresas."
        description="Siempre sabrás en qué etapa estamos, qué necesito de ti y qué sucederá después."
      />

      <ol ref={containerRef} className="relative mt-16 flex flex-col gap-12 pl-12 sm:pl-16">
        {/* Rail */}
        <div
          aria-hidden
          className="bg-border absolute top-2 bottom-2 left-[15px] w-px sm:left-[23px]"
        >
          <motion.div
            style={{ scaleY }}
            className="from-primary to-primary/30 h-full w-full origin-top bg-gradient-to-b"
          />
        </div>

        {STEPS.map((step, i) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: EASE, delay: i * 0.04 }}
            className="group relative"
          >
            {/* Node */}
            <span
              aria-hidden
              className="border-background bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground absolute top-0.5 -left-12 grid size-8 place-items-center rounded-full border-4 font-mono text-xs font-semibold transition-colors duration-500 sm:-left-16 sm:size-12 sm:text-sm"
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className="flex flex-col gap-2 pt-0.5 sm:pt-2.5">
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

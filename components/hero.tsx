'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDownRight, ArrowUpRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuroraBackdrop } from '@/components/aurora-backdrop'
import { EASE } from '@/lib/motion'

const STATS = [
  { value: '30+', label: 'Sitios publicados' },
  { value: '6 años', label: 'Creando para la web' },
  { value: '<1.5s', label: 'Tiempo medio de carga' },
]

const HEADLINE = ['Sitios web que', 'generan confianza', 'antes de hablar.']

export function Hero() {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  // Gentle parallax so the hero content settles as the user scrolls away.
  const y = useTransform(scrollY, [0, 600], [0, reduceMotion ? 0 : 90])
  const opacity = useTransform(scrollY, [0, 450], [1, reduceMotion ? 1 : 0.15])

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-20 sm:pt-36"
    >
      <AuroraBackdrop />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6"
      >
        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="glass border-border flex w-fit items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-2"
        >
          <span className="relative flex size-2">
            <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-60" />
            <span className="bg-primary relative inline-flex size-2 rounded-full" />
          </span>
          <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase">
            Disponible para nuevos proyectos
          </span>
        </motion.div>

        {/* Headline: each line masks up into place */}
        <h1 className="max-w-4xl text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.04em]">
          {HEADLINE.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, ease: EASE, delay: 0.25 + i * 0.11 }}
                className={
                  i === 1
                    ? 'text-primary block'
                    : 'text-gradient block'
                }
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
            className="text-muted-foreground max-w-md text-lg leading-relaxed text-pretty"
          >
            Soy Mateo, desarrollador full-stack freelance. Diseño y creo sitios
            web rápidos y modernos que convierten las visitas de pequeños
            negocios en clientes. Una persona, un proceso claro y sin costes de agencia.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.72 }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              className="group h-13 rounded-full px-7 text-base font-medium shadow-[0_0_40px_-8px] shadow-primary/50 transition-all duration-300 hover:shadow-[0_0_60px_-6px] hover:shadow-primary/60"
              nativeButton={false}
              render={<a href="#work" />}
            >
              Ver proyectos
              <ArrowDownRight
                data-icon="inline-end"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </Button>
            <Button
              variant="outline"
              className="group glass h-13 rounded-full px-7 text-base font-medium"
              nativeButton={false}
              render={<a href="#contact" />}
            >
              Contáctame
              <ArrowUpRight
                data-icon="inline-end"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Button>
          </motion.div>
        </div>

        {/* Proof strip */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
          className="border-border mt-4 grid grid-cols-2 gap-8 border-t pt-8 sm:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="text-2xl font-medium tracking-tight sm:text-3xl">
                {stat.value}
              </dt>
              <dd className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                {stat.label}
              </dd>
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <dt className="flex items-center gap-1" aria-label="5 de 5 estrellas">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="fill-primary text-primary size-4" />
              ))}
            </dt>
            <dd className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
              Valoración de clientes
            </dd>
          </div>
        </motion.dl>
      </motion.div>
    </section>
  )
}

'use client'

import { motion } from 'motion/react'
import { ArrowDownRight, Asterisk } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const DIRECTIONS = [
  {
    number: '01',
    title: 'Sitios que presentan y venden',
    copy: 'Para profesionales y negocios que necesitan explicar bien qué hacen, generar confianza y convertir visitas en conversaciones.',
    shape: 'rounded-[3rem_1rem_3rem_1rem]',
    color: 'bg-accent',
  },
  {
    number: '02',
    title: 'Reservas y operaciones simples',
    copy: 'Experiencias web para ordenar turnos, consultas, solicitudes o procesos que hoy viven entre mensajes y hojas de cálculo.',
    shape: 'rounded-[50%_50%_1rem_1rem]',
    color: 'bg-primary',
  },
  {
    number: '03',
    title: 'Productos digitales pequeños',
    copy: 'Paneles, herramientas internas y primeras versiones de una idea, construidas para aprender rápido sin montar una estructura enorme.',
    shape: 'rounded-[1rem_4rem_1rem_4rem]',
    color: 'bg-secondary',
  },
]

export function Projects() {
  return (
    <section id="work" className="scroll-mt-24 bg-foreground py-16 text-background sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Lo que puedo construir"
          title="Todavía no hay un archivo. Hay una dirección."
          description="No voy a inventar proyectos ni resultados. Este espacio va a crecer con trabajo real; mientras tanto, estas son las clases de problemas que quiero resolver."
          className="border-background/50 [&_h2]:text-background [&_p]:text-background/65 [&_span]:text-primary"
        />

        <div className="mt-9 grid gap-4 sm:mt-12 lg:grid-cols-3">
          {DIRECTIONS.map((item, index) => (
            <motion.article
              key={item.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className={`${item.color} ${item.shape} flex min-h-[25rem] flex-col justify-between p-7 text-foreground sm:p-9`}
            >
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em]">
                <span>{item.number}</span><Asterisk className="size-5" />
              </div>
              <div>
                <h3 className="max-w-xs text-3xl leading-none font-semibold tracking-[-0.05em] sm:text-4xl">{item.title}</h3>
                <p className="mt-5 max-w-sm leading-relaxed text-foreground/70">{item.copy}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <a href="#contact" className="mt-8 flex min-h-16 items-center justify-between rounded-full border border-background/60 px-6 text-sm font-semibold transition-colors hover:bg-background hover:text-foreground">
          ¿Tienes un problema distinto? Cuéntamelo <ArrowDownRight />
        </a>
      </div>
    </section>
  )
}

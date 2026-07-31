'use client'

import { motion } from 'motion/react'
import { Quote, Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { RevealItem, StaggerGroup } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { EASE } from '@/lib/motion'

const TESTIMONIALS = [
  {
    quote:
      'Pasamos de tener un sitio que nadie encontraba a llenar las reservas de los fines de semana. Mateo hizo mejores preguntas que la agencia con la que hablamos primero y entregó todo en tres semanas.',
    name: 'Elena Moretti',
    role: 'Propietaria, Casa Nera',
    initials: 'EM',
  },
  {
    quote:
      'Precios claros, plazos claros y sin tecnicismos. Reconstruyó nuestro proceso de reservas y las solicitudes de citas prácticamente se duplicaron en dos meses.',
    name: 'Dr. Samuel Ortiz',
    role: 'Director, Lumen Dental',
    initials: 'SO',
  },
  {
    quote:
      'El panel sustituyó cuatro hojas de cálculo y una reunión semanal. Seis meses después, sigue respondiendo en menos de un día cada vez que necesitamos un ajuste.',
    name: 'Priya Raman',
    role: 'Responsable de operaciones, Ledger Insights',
    initials: 'PR',
  },
]

export function Testimonials() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-36">
      <SectionHeading
        eyebrow="Testimonios"
        title="Pequeños negocios, una gran diferencia."
        description="Algunas palabras de quienes confiaron algo importante a un profesional freelance."
      />

      <StaggerGroup className="mt-11 grid gap-5 sm:mt-16 sm:gap-6 lg:grid-cols-3" gap={0.12}>
        {TESTIMONIALS.map((item) => (
          <RevealItem key={item.name} className="h-full">
            <motion.figure
              whileHover={{ y: -8 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="group border-border glass relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border p-6 min-[380px]:p-7 sm:gap-6 sm:p-8"
            >
              <div
                aria-hidden
                className="bg-primary/12 absolute -top-24 -right-20 size-52 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              />

              <div className="relative flex items-center justify-between">
                <Quote className="text-primary size-7" />
                <div className="flex gap-0.5" aria-label="5 de 5 estrellas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="fill-primary text-primary size-3.5" />
                  ))}
                </div>
              </div>

              <blockquote className="relative flex-1 text-lg leading-relaxed text-pretty">
                {item.quote}
              </blockquote>

              <figcaption className="border-border relative flex items-center gap-3.5 border-t pt-6">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-secondary text-primary font-mono text-xs">
                    {item.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-muted-foreground text-sm">{item.role}</span>
                </div>
              </figcaption>
            </motion.figure>
          </RevealItem>
        ))}
      </StaggerGroup>
    </section>
  )
}

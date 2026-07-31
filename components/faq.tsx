'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { EASE } from '@/lib/motion'
import { FAQ_ITEMS } from '@/lib/faq-data'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <SectionHeading
            eyebrow="Antes de comenzar"
            title="Preguntas claras. Respuestas directas."
            description="Lo esencial sobre inversión, tiempos y forma de trabajo, antes de que tengas que preguntarlo."
          />

          <div className="border-t border-foreground">
            {FAQ_ITEMS.map((item, index) => {
              const active = open === index
              return (
                <div key={item.question} className="border-b border-foreground">
                  <button
                    type="button"
                    aria-expanded={active}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpen(active ? null : index)}
                    className="group flex min-h-20 w-full items-center justify-between gap-5 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                  >
                    <span className="text-lg font-medium tracking-tight sm:text-xl">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: active ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="grid size-10 shrink-0 place-items-center rounded-full border border-foreground transition-colors group-hover:bg-foreground group-hover:text-background"
                    >
                      <Plus className="size-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {active ? (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 pr-14 leading-relaxed text-muted-foreground sm:text-lg">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

export function Hero() {
  return (
    <section id="top" className="min-h-[100svh] border-b border-foreground pt-[4.5rem] sm:pt-24">
      <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-[1400px] grid-rows-[auto_1fr_auto] sm:min-h-[calc(100svh-6rem)] lg:grid-cols-[1fr_0.7fr] lg:grid-rows-[1fr_auto]">
        <div className="flex flex-col justify-between border-foreground p-5 sm:p-8 lg:border-r lg:p-12">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-xs uppercase tracking-[0.18em]">
            Desarrollador independiente · Uruguay · 2026
          </motion.p>

          <h1 className="my-12 text-[clamp(4rem,16vw,10rem)] leading-[0.76] font-semibold tracking-[-0.085em] uppercase lg:my-0">
            <span className="block">Webs</span>
            <span className="block text-primary">con</span>
            <span className="block">pulso.</span>
          </h1>

          <div className="grid gap-6 border-t border-foreground pt-5 sm:grid-cols-2">
            <p className="max-w-sm text-lg leading-snug font-medium sm:text-xl">
              Diseño y desarrollo sitios que se sienten propios, no prestados de una plantilla.
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:justify-self-end">
              Estrategia, identidad visual y código en una sola mesa. Sin capas de agencia. Sin soluciones de catálogo.
            </p>
          </div>
        </div>

        <div className="relative grid min-h-[45vh] place-items-center overflow-hidden border-t border-foreground bg-accent p-8 lg:min-h-0 lg:border-t-0">
          <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.18em]">Identidad / MR14</span>
          <motion.div initial={{ rotate: -8, scale: 0.85 }} animate={{ rotate: 3, scale: 1 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} className="relative aspect-square w-[min(88%,34rem)]">
            <Image src="/mr14-logo-transparent.png" alt="Monograma MR14 de Mateo Rodríguez" fill priority sizes="(max-width: 1024px) 80vw, 40vw" className="object-contain" />
          </motion.div>
          <span className="absolute right-4 bottom-4 font-mono text-[10px] uppercase tracking-[0.18em]">Marca personal / 14</span>
        </div>

        <div className="col-span-full grid border-t border-foreground sm:grid-cols-2">
          <a href="#work" className="flex min-h-20 items-center justify-between border-foreground px-5 text-lg font-semibold transition-colors hover:bg-foreground hover:text-background sm:border-r sm:px-8">
            Ver trabajo seleccionado <ArrowDownRight />
          </a>
          <a href="#contact" className="flex min-h-20 items-center justify-between border-t border-foreground bg-primary px-5 text-lg font-semibold text-primary-foreground transition-colors hover:bg-foreground sm:border-t-0 sm:px-8">
            Contarme tu idea <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  )
}

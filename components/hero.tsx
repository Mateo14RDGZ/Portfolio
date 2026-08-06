'use client'

import { motion } from 'motion/react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { LogoMark } from '@/components/logo-mark'
import Link from 'next/link'

export function Hero() {
  return (
    <section id="top" className="border-b border-foreground pt-[4.5rem] sm:min-h-[100svh] sm:pt-24">
      <div className="mx-auto grid grid-cols-1 max-w-[1400px] sm:min-h-[calc(100svh-6rem)] lg:grid-cols-[1fr_0.7fr] lg:grid-rows-[1fr_auto]">
        <div className="flex flex-col justify-between border-foreground p-5 sm:p-8 lg:border-r lg:p-12">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-xs uppercase tracking-[0.18em]">
            Desarrollador web independiente · Uruguay · 2026
          </motion.p>

          <h1 className="my-10 text-[clamp(3.65rem,16vw,10rem)] leading-[0.78] font-semibold tracking-[-0.08em] uppercase min-[390px]:my-12 lg:my-0">
            <span className="block">Cada</span>
            <span className="block text-primary">detalle</span>
            <span className="block">importa.</span>
          </h1>

          <div className="grid gap-6 border-t border-foreground pt-5 sm:grid-cols-2">
            <p className="max-w-sm text-lg leading-snug font-medium sm:text-xl">
              Diseño y desarrollo sitios web y sistemas a medida para negocios en Uruguay.
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:justify-self-end">
              Estrategia, identidad visual y código en una sola mesa. Sin capas de agencia. Sin soluciones de catálogo.
            </p>
          </div>
          <a href="#contact" className="primary-action mt-5 flex min-h-12 items-center justify-between bg-primary px-4 text-sm font-semibold text-primary-foreground sm:hidden">
            Contame tu idea <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div className="relative grid min-h-[12rem] place-items-center overflow-hidden border-t border-foreground bg-accent p-6 min-[390px]:min-h-[13rem] min-[390px]:p-8 lg:min-h-0 lg:border-t-0">
          <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.18em]">Identidad / MR14</span>
          <div className="relative aspect-square w-[min(40vw,8rem)] sm:w-[min(92%,36rem)]">
            <LogoMark
              animateIntro
              loopIntro={false}
              interactive={false}
              className="size-full"
              title="Monograma MR14 de Mateo Rodríguez"
            />
          </div>
          <span className="absolute right-4 bottom-4 font-mono text-[10px] uppercase tracking-[0.18em]">Marca personal / 14</span>
        </div>

        <div className="col-span-full grid border-t border-foreground sm:grid-cols-2">
          <Link href="/proyectos" className="flex min-h-[4.5rem] items-center justify-between border-foreground px-5 text-base font-semibold transition-colors hover:bg-foreground hover:text-background sm:min-h-20 sm:border-r sm:px-8 sm:text-lg">
            Ver proyectos <ArrowDownRight />
          </Link>
          <a href="#contact" className="primary-action flex min-h-[4.5rem] items-center justify-between border-t border-foreground bg-primary px-5 text-base font-semibold text-primary-foreground sm:min-h-20 sm:border-t-0 sm:px-8 sm:text-lg">
            Contarme tu idea <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  )
}

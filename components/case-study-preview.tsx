'use client'

import Image from 'next/image'
import Link from 'next/link'
import { track } from '@vercel/analytics'
import { ArrowUpRight, Layers3 } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Reveal } from '@/components/reveal'
import { EASE } from '@/lib/motion'

const FACTS = [
  '3 niveles de acceso',
  'Operación integral',
  'Responsive',
  'PWA instalable',
]

export function CaseStudyPreview() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="case-study"
      aria-labelledby="case-study-preview-title"
      className="relative scroll-mt-20 overflow-hidden bg-foreground py-12 text-background sm:py-20"
    >
      <div aria-hidden="true" className="absolute top-0 right-0 h-1.5 w-1/3 bg-primary" />
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <Reveal>
            <p className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase sm:text-xs">
              Caso de estudio / 01
            </p>
            <h2
              id="case-study-preview-title"
              className="mt-5 text-[clamp(3rem,14vw,6.4rem)] leading-[0.88] font-semibold tracking-[-0.06em] text-balance"
            >
              Trabajo destacado
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-snug font-medium text-background/90 sm:text-xl">
              Sistema de Gestión para Automotora
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-background/65 sm:text-base">
              Una aplicación web a medida que conecta vehículos, clientes, financiaciones, pagos,
              comprobantes y reportes en una única plataforma.
            </p>

            <div className="mt-7 flex flex-wrap gap-2" aria-label="Alcance del proyecto">
              {FACTS.map((fact) => (
                <span
                  key={fact}
                  className="rounded-full border border-background/25 px-3 py-1.5 font-mono text-[9px] tracking-[0.12em] uppercase text-background/75"
                >
                  {fact}
                </span>
              ))}
            </div>

            <Link
              href="/trabajo-destacado"
              onClick={() => track('case_study_opened', { source: 'home_preview' })}
              className="primary-action group mt-8 flex min-h-14 w-full items-center justify-between gap-5 bg-primary px-5 font-semibold text-primary-foreground sm:inline-flex sm:w-auto sm:min-w-64 sm:gap-8"
            >
              Explorar el caso completo
              <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>

          <Reveal>
            <Link
              href="/trabajo-destacado"
              onClick={() => track('case_study_opened', { source: 'home_visual' })}
              className="group relative block focus-visible:rounded-[2.7rem_0.7rem_2.7rem_0.7rem]"
              aria-label="Abrir el caso de estudio Sistema de Gestión para Automotora"
            >
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -5 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="relative"
              >
                <div aria-hidden="true" className="absolute -inset-2 rounded-[2rem_0.55rem_2rem_0.55rem] bg-accent transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1 sm:-inset-5 sm:rounded-[3rem_0.8rem_3rem_0.8rem]" />
                <div className="relative overflow-hidden rounded-[1.75rem_0.5rem_1.75rem_0.5rem] border border-background/25 bg-background shadow-[0_18px_48px_rgba(8,3,12,0.3)] sm:rounded-[2.5rem_0.7rem_2.5rem_0.7rem] sm:shadow-[0_28px_90px_rgba(8,3,12,0.38)]">
                  <div className="relative aspect-[1.32] sm:aspect-[1.65]">
                    <Image
                      src="/case-study/dashboard.webp"
                      alt="Dashboard administrativo del sistema de gestión para automotora con datos ficticios"
                      fill
                      priority
                      sizes="(max-width: 1024px) 94vw, 61vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.012]"
                    />
                    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/70 to-transparent" />
                    <div className="absolute right-3 bottom-3 w-[24%] min-w-24 overflow-hidden rounded-[1.4rem] border-[5px] border-foreground bg-background shadow-2xl sm:right-6 sm:bottom-6 sm:w-[18%] sm:border-[7px]">
                      <Image
                        src="/case-study/cliente-mobile.webp"
                        alt="Vista móvil demostrativa del cliente"
                        width={382}
                        height={826}
                        sizes="(max-width: 640px) 24vw, 180px"
                        className="h-auto w-full"
                      />
                    </div>
                    <span className="absolute bottom-4 left-4 hidden items-center gap-2 rounded-full border border-background/30 bg-foreground/80 px-3 py-2 font-mono text-[9px] tracking-[0.13em] uppercase backdrop-blur-md sm:inline-flex lg:bottom-7 lg:left-7">
                      <Layers3 className="size-3.5 text-primary" aria-hidden="true" />
                      Recorré el sistema
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

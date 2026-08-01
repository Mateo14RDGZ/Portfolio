'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowLeft, ArrowUpRight, Check, Menu } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { CSSProperties } from 'react'
import type { ConceptProject } from '@/lib/project-data'
import { EASE } from '@/lib/motion'

export function ConceptLanding({ project }: { project: ConceptProject }) {
  const reduceMotion = useReducedMotion()
  const style = {
    '--concept-page': project.theme.page,
    '--concept-ink': project.theme.ink,
    '--concept-accent': project.theme.accent,
    '--concept-soft': project.theme.soft,
  } as CSSProperties

  return (
    <main style={style} className="min-h-screen bg-[var(--concept-page)] text-[var(--concept-ink)]">
      <div className="border-b border-[var(--concept-ink)]/20 bg-[var(--concept-ink)] px-4 py-2.5 text-center font-mono text-[9px] tracking-[0.14em] text-[var(--concept-page)] uppercase">
        Proyecto conceptual · Marca y contenido ficticios · <Link href="/proyectos" className="underline underline-offset-4">Volver a proyectos</Link>
      </div>

      <header className="relative z-10 border-b border-[var(--concept-ink)]/25">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:h-24 sm:px-8 lg:px-12">
          <Link href="#inicio" className="text-xl font-semibold tracking-[-0.045em] sm:text-2xl">{project.name}</Link>
          <nav className="hidden items-center gap-8 font-mono text-[10px] tracking-[0.14em] uppercase md:flex" aria-label={`Navegación de ${project.name}`}>
            {project.nav.map((item, index) => <a key={item} href={index === project.nav.length - 1 ? '#contacto' : '#propuesta'}>{item}</a>)}
          </nav>
          <a href="#contacto" className="hidden min-h-11 items-center gap-2 rounded-full bg-[var(--concept-ink)] px-5 text-sm font-semibold text-[var(--concept-page)] sm:flex">Consultar <ArrowUpRight className="size-4" /></a>
          <span className="grid size-11 place-items-center sm:hidden" aria-hidden="true"><Menu /></span>
        </div>
      </header>

      <section id="inicio" className="mx-auto max-w-[1440px] px-5 py-6 sm:px-8 sm:py-10 lg:px-12">
        <div className="grid min-h-[calc(100svh-10rem)] overflow-hidden rounded-[2rem_0.55rem_2rem_0.55rem] border border-[var(--concept-ink)]/20 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: EASE }} className="flex flex-col justify-between bg-[var(--concept-soft)] p-6 sm:p-10 lg:p-14">
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase">{project.category.split(' · ')[0]} / Uruguay</p>
            <div className="py-14 lg:py-8">
              <h1 className="max-w-3xl text-[clamp(3.4rem,8vw,8.5rem)] leading-[0.82] font-semibold tracking-[-0.075em] text-balance">{project.statement}</h1>
              <p className="mt-7 max-w-lg text-base leading-relaxed opacity-70 sm:text-lg">{project.description}</p>
            </div>
            <a href="#propuesta" className="flex items-center gap-3 font-mono text-[10px] tracking-[0.14em] uppercase">Descubrir <ArrowDown className="size-4" /></a>
          </motion.div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, clipPath: 'inset(0 0 0 12%)' }} animate={{ opacity: 1, clipPath: 'inset(0 0 0 0%)' }} transition={{ duration: 0.9, delay: 0.12, ease: EASE }} className="relative min-h-[25rem] lg:min-h-0">
            <Image src={project.image} alt={project.imageAlt} fill priority sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" />
            <span className="absolute right-4 bottom-4 rounded-full bg-[var(--concept-page)] px-4 py-2 font-mono text-[9px] tracking-[0.13em] uppercase sm:right-7 sm:bottom-7">{project.objective}</span>
          </motion.div>
        </div>
      </section>

      <section id="propuesta" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-10 border-t border-[var(--concept-ink)]/25 pt-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase opacity-60">Una propuesta clara</p>
            <h2 className="mt-5 max-w-xl text-4xl leading-[0.92] font-semibold tracking-[-0.055em] sm:text-6xl">Menos ruido. Más motivos para elegir.</h2>
          </div>
          <div className="border-t border-[var(--concept-ink)]/25">
            {project.services.map((service) => (
              <article key={service.number} className="grid gap-4 border-b border-[var(--concept-ink)]/25 py-7 sm:grid-cols-[5rem_1fr] sm:py-9">
                <span className="font-mono text-[10px] tracking-[0.14em] text-[var(--concept-accent)]">{service.number}</span>
                <div><h3 className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">{service.title}</h3><p className="mt-3 max-w-xl leading-relaxed opacity-65">{service.copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--concept-ink)] px-5 py-16 text-[var(--concept-page)] sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1344px] gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div><p className="font-mono text-[10px] tracking-[0.16em] text-[var(--concept-soft)] uppercase">Pensado para convertir</p><h2 className="mt-5 text-4xl leading-[0.92] font-semibold tracking-[-0.055em] sm:text-6xl">Todo lo importante, a mano.</h2></div>
          <div className="grid grid-cols-2 gap-2">
            {project.details.map((detail) => <div key={detail} className="flex min-h-24 items-center gap-3 rounded-[1.25rem_0.35rem_1.25rem_0.35rem] border border-[var(--concept-page)]/20 p-4 text-sm font-medium sm:p-5 sm:text-base"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--concept-accent)]"><Check className="size-4" /></span>{detail}</div>)}
          </div>
        </div>
      </section>

      <section id="contacto" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="overflow-hidden rounded-[2.5rem_0.6rem_2.5rem_0.6rem] bg-[var(--concept-soft)] p-6 sm:p-12 lg:p-16">
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase">Próximo paso</p>
          <h2 className="mt-6 max-w-4xl text-5xl leading-[0.88] font-semibold tracking-[-0.065em] sm:text-7xl">{project.closingTitle}</h2>
          <div className="mt-9 flex flex-col gap-5 border-t border-[var(--concept-ink)]/25 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl leading-relaxed opacity-70">{project.closingCopy}</p>
            <Link href="/#contact" className="flex min-h-14 w-full items-center justify-between rounded-full bg-[var(--concept-accent)] px-5 font-semibold text-white sm:w-auto sm:min-w-56">Quiero una web así <ArrowUpRight className="size-5" /></Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--concept-ink)]/25 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-[1344px] flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between"><span className="font-semibold">{project.name}</span><span className="font-mono text-[9px] tracking-[0.13em] uppercase opacity-60">Demostración conceptual diseñada y desarrollada por MR14</span><Link href="/proyectos" className="flex items-center gap-2 font-semibold"><ArrowLeft className="size-4" /> Proyectos</Link></div>
      </footer>
    </main>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { track } from '@vercel/analytics'
import { ArrowUpRight, BadgeCheck, Layers3 } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { CONCEPT_PROJECTS } from '@/lib/project-data'
import { EASE } from '@/lib/motion'
import { Reveal, RevealItem, StaggerGroup } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

export function ProjectsGallery() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="bg-foreground py-12 text-background sm:py-24" aria-labelledby="projects-title">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Archivo seleccionado"
          title="Proyectos"
          description="Un sistema empresarial real y tres ejercicios conceptuales completos para mostrar cómo abordo negocios, públicos y objetivos diferentes."
          id="projects-title"
          className="border-background/45 [&_h2]:text-background [&_p]:text-background/68 [&_span]:text-primary"
        />

        <Reveal className="mt-10 sm:mt-16">
          <article className="overflow-hidden rounded-[2rem_0.55rem_2rem_0.55rem] border border-background/25 bg-background/[0.045] sm:rounded-[3rem_0.75rem_3rem_0.75rem]">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <Link href="/trabajo-destacado" className="group relative min-h-[20rem] overflow-hidden sm:min-h-[32rem]" aria-label="Ver caso de estudio del sistema de gestión para automotora">
                <Image src="/case-study/dashboard.webp" alt="Dashboard del sistema de gestión para automotora con datos ficticios" fill priority sizes="(max-width:1024px) 100vw, 62vw" className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.015]" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-primary px-3 py-2 font-mono text-[9px] tracking-[0.14em] text-primary-foreground uppercase sm:bottom-7 sm:left-7">
                  <BadgeCheck className="size-3.5" /> Proyecto desarrollado
                </span>
              </Link>
              <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">Trabajo destacado / 01</p>
                  <h2 className="mt-5 text-4xl leading-[0.92] font-semibold tracking-[-0.055em] text-balance sm:text-6xl">Sistema de Gestión para Automotora</h2>
                  <p className="mt-5 max-w-xl leading-relaxed text-background/68">Aplicación web empresarial para centralizar vehículos, clientes, financiaciones, pagos, comprobantes y reportes.</p>
                </div>
                <div className="mt-9">
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'PostgreSQL', 'PWA'].map((item) => <span key={item} className="rounded-full border border-background/20 px-3 py-1.5 font-mono text-[9px] tracking-[0.12em] uppercase">{item}</span>)}
                  </div>
                  <Link href="/trabajo-destacado" onClick={() => track('projects_click', { project: 'automotora' })} className="primary-action group mt-7 flex min-h-14 w-full items-center justify-between bg-primary px-5 font-semibold text-primary-foreground sm:w-fit sm:min-w-64">Ver caso de estudio <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-16 border-t border-background/25 pt-9 sm:mt-24 sm:pt-12">
          <Reveal>
            <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">Laboratorio visual / 02—04</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Proyectos conceptuales</h2>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-background/62 sm:justify-self-end sm:text-base">Marcas ficticias creadas desde cero para explorar estrategia, identidad, contenido y desarrollo. No representan trabajos encargados por clientes.</p>
            </div>
          </Reveal>

          <StaggerGroup className="mt-8 grid gap-4 lg:grid-cols-3" gap={0.08}>
            {CONCEPT_PROJECTS.map((project, index) => (
              <RevealItem key={project.slug}>
                <motion.article whileHover={reduceMotion ? undefined : { y: -5 }} transition={{ duration: 0.4, ease: EASE }} className="group flex h-full flex-col overflow-hidden rounded-[2rem_0.55rem_2rem_0.55rem] border border-background/25 bg-background/[0.045]">
                  <Link href={`/proyectos/${project.slug}`} className="relative aspect-[1.25] overflow-hidden" aria-label={`Ver landing conceptual ${project.name}`}>
                    <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]" />
                    <span className="absolute top-4 left-4 rounded-full border border-white/35 bg-black/45 px-3 py-2 font-mono text-[8px] tracking-[0.14em] text-white uppercase backdrop-blur-md">Proyecto conceptual</span>
                  </Link>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="font-mono text-[9px] tracking-[0.15em] text-primary uppercase">0{index + 2} / {project.category.split(' · ')[0]}</p>
                    <h3 className="mt-4 text-3xl font-semibold tracking-[-0.045em]">{project.name}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-background/62">{project.description}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-background/20 pt-5">
                      <span className="flex items-center gap-2 font-mono text-[9px] tracking-[0.12em] uppercase text-background/55"><Layers3 className="size-3.5 text-primary" /> Landing completa</span>
                      <Link href={`/proyectos/${project.slug}`} onClick={() => track('projects_click', { project: project.slug })} className="grid size-11 place-items-center rounded-full border border-background/35 transition-colors hover:bg-primary hover:text-primary-foreground" aria-label={`Abrir ${project.name}`}><ArrowUpRight className="size-4" /></Link>
                    </div>
                  </div>
                </motion.article>
              </RevealItem>
            ))}
          </StaggerGroup>
        </div>

        <Reveal className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-background/25 pt-9 sm:mt-20 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-2xl leading-tight font-medium sm:text-3xl">¿Querés que el próximo caso publicado sea el de tu negocio?</p>
          <Link href="/#contact" className="primary-action flex min-h-14 w-full items-center justify-between bg-primary px-5 font-semibold text-primary-foreground sm:w-auto sm:min-w-56">Contame tu idea <ArrowUpRight className="size-5" /></Link>
        </Reveal>
      </div>
    </section>
  )
}

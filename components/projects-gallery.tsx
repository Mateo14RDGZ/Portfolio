'use client'

import Image from 'next/image'
import Link from 'next/link'
import { track } from '@vercel/analytics'
import { ArrowUpRight, BadgeCheck, Layers3 } from 'lucide-react'
import { motion, type Variants, useReducedMotion } from 'motion/react'
import { CONCEPT_PROJECTS } from '@/lib/project-data'
import { EASE, useCompactMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { Reveal, RevealItem, StaggerGroup } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const stationaryCard: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
}

export function ProjectsGallery() {
  const reduceMotion = useReducedMotion()
  const compactMotion = useCompactMotion()

  return (
    <section className="bg-foreground py-12 text-background sm:py-24" aria-labelledby="projects-title">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Archivo seleccionado"
          title="Proyectos"
          description="Un sistema empresarial real y tres ejercicios conceptuales completos para mostrar cómo abordo negocios, públicos y objetivos diferentes."
          id="projects-title"
          as="h1"
          className="border-background/45 [&_h1]:text-background [&_h2]:text-background [&_p]:text-background/68 [&_span]:text-primary"
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

        <div className="mt-12 border-t border-background/25 pt-8 sm:mt-24 sm:pt-12">
          <Reveal>
            <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">Laboratorio visual / 02—04</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Proyectos conceptuales</h2>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-background/62 sm:justify-self-end sm:text-base">Proyectos conceptuales desarrollados para explorar estrategia, identidad, contenido y experiencias digitales adaptadas a negocios y públicos diferentes.</p>
            </div>
          </Reveal>

          <StaggerGroup className="mt-8 grid items-stretch gap-4 lg:grid-cols-3" gap={compactMotion ? 0 : 0.08}>
            {CONCEPT_PROJECTS.map((project, index) => (
              <RevealItem key={project.slug} className="h-full" variants={compactMotion ? stationaryCard : undefined}>
                <motion.article
                  whileHover={reduceMotion || compactMotion ? undefined : { y: -5 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className={cn(
                    'group flex h-full min-w-0 flex-col overflow-hidden border lg:min-h-[36rem]',
                    project.slug === 'ombu-cafe' && 'rounded-[2.7rem_0.45rem_2.7rem_0.45rem] border-[#f1e3ca]/35 bg-[#f1e3ca] text-[#302218] [font-family:var(--font-fraunces),Georgia,serif]',
                    project.slug === 'aster-automoviles' && 'rounded-none border-[#e7e3dc]/45 bg-[#e7e3dc] text-[#242522] [font-family:var(--font-space-grotesk),Arial,sans-serif]',
                    project.slug === 'cimbra-estudio' && 'rounded-[2.7rem] border-[#cbdcd7] bg-[#edf2ec] text-[#17332f] [font-family:var(--font-nunito-sans),Arial,sans-serif]',
                  )}
                >
                  <Link href={`/proyectos/${project.slug}`} className={cn('relative mx-4 mt-4 aspect-[1.25] overflow-hidden sm:mx-5 sm:mt-5 sm:aspect-[1.18]', project.slug === 'ombu-cafe' && 'rounded-[2rem_0.3rem_2rem_0.3rem]', project.slug === 'aster-automoviles' && 'rounded-none', project.slug === 'cimbra-estudio' && 'rounded-[2rem]')} aria-label={`Ver landing conceptual ${project.name}`}>
                    <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.025] motion-reduce:transition-none" />
                    <span className={cn('absolute top-4 left-4 px-3 py-2 text-[8px] tracking-[0.14em] uppercase', project.slug === 'ombu-cafe' && 'rounded-full border border-white/30 bg-[#302218]/75 text-[#fff7e8] [font-family:var(--font-fraunces),Georgia,serif]', project.slug === 'aster-automoviles' && 'bg-[#e7e3dc] text-[#242522] [font-family:var(--font-space-grotesk),Arial,sans-serif]', project.slug === 'cimbra-estudio' && 'rounded-full bg-[#edf2ec]/90 text-[#17332f] [font-family:var(--font-mazius-display),Georgia,serif]')}>Proyecto conceptual</span>
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-7">
                    <p className={cn('text-[9px] tracking-[0.15em] uppercase', project.slug === 'ombu-cafe' && 'text-[#8a5a3b] [font-family:var(--font-fraunces),Georgia,serif]', project.slug === 'aster-automoviles' && 'text-[#9a5d3b] [font-family:var(--font-space-grotesk),Arial,sans-serif]', project.slug === 'cimbra-estudio' && 'text-[#5b8580] [font-family:var(--font-mazius-display),Georgia,serif]')}>0{index + 2} / {project.category.split(' · ')[0]}</p>
                    <h3 className={cn('mt-4 max-w-full break-words text-[clamp(1.8rem,9vw,2.25rem)] tracking-[-0.05em] text-balance sm:text-3xl', project.slug === 'ombu-cafe' && 'font-semibold italic', project.slug === 'aster-automoviles' && 'font-semibold uppercase', project.slug === 'cimbra-estudio' && 'font-bold')}>{project.name}</h3>
                    <p className={cn('mt-3 flex-1 text-sm leading-relaxed', project.slug === 'ombu-cafe' && 'text-[#302218]/70', project.slug === 'aster-automoviles' && 'text-[#242522]/62', project.slug === 'cimbra-estudio' && 'text-[#17332f]/64')}>{project.description}</p>
                    <div className={cn('mt-6 flex items-center justify-between pt-5', project.slug === 'ombu-cafe' && 'border-t border-[#302218]/18', project.slug === 'aster-automoviles' && 'border-t border-[#242522]', project.slug === 'cimbra-estudio' && 'border-t border-[#17332f]/15')}>
                      <span className={cn('flex items-center gap-2 text-[9px] tracking-[0.12em] uppercase', project.slug === 'ombu-cafe' && 'text-[#302218]/58 [font-family:var(--font-fraunces),Georgia,serif]', project.slug === 'aster-automoviles' && 'text-[#242522]/55 [font-family:var(--font-space-grotesk),Arial,sans-serif]', project.slug === 'cimbra-estudio' && 'text-[#17332f]/55 [font-family:var(--font-mazius-display),Georgia,serif]')}><Layers3 className={cn('size-3.5', project.slug === 'ombu-cafe' && 'text-[#b75632]', project.slug === 'aster-automoviles' && 'text-[#9a5d3b]', project.slug === 'cimbra-estudio' && 'text-[#5b8580]')} /> Landing completa</span>
                      <Link href={`/proyectos/${project.slug}`} onClick={() => track('projects_click', { project: project.slug })} className={cn('grid size-11 place-items-center transition-colors', project.slug === 'ombu-cafe' && 'rounded-full border border-[#302218]/35 hover:bg-[#b75632] hover:text-[#fff7e8]', project.slug === 'aster-automoviles' && 'border border-[#242522] hover:bg-[#242522] hover:text-[#e7e3dc]', project.slug === 'cimbra-estudio' && 'rounded-full bg-[#5b8580] text-white hover:bg-[#17332f]')} aria-label={`Abrir ${project.name}`}><ArrowUpRight className="size-4" /></Link>
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

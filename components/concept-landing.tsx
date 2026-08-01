'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  Coffee,
  Menu,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { ConceptProject } from '@/lib/project-data'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

function ConceptNotice({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={cn(
        'relative z-50 px-4 py-2.5 text-center font-mono text-[9px] tracking-[0.14em] uppercase',
        dark ? 'bg-[#161713] text-[#eeeae2]' : 'bg-[#291532] text-[#eef2df]',
      )}
    >
      Proyecto conceptual · Marca y contenido ficticios ·{' '}
      <Link href="/proyectos" className="underline underline-offset-4">
        Volver a proyectos
      </Link>
    </div>
  )
}

function BackToProjects({ className }: { className?: string }) {
  return (
    <Link href="/proyectos" className={cn('inline-flex min-h-11 items-center gap-2 font-semibold', className)}>
      <ArrowLeft className="size-4" /> Proyectos MR14
    </Link>
  )
}

type StoryScene = {
  kicker: string
  label: string
  title: string
  copy: string
  position: string
  tone: string
}

function BrumaLanding({ project }: { project: ConceptProject }) {
  const reduceMotion = useReducedMotion()
  const [activeStep, setActiveStep] = useState(0)
  const stepRefs = useRef<Array<HTMLElement | null>>([])

  const scenes: StoryScene[] = [
    {
      kicker: '01 / Origen',
      label: 'La carta como punto de partida',
      title: 'Cafe de origen, preparado sin apuro.',
      copy:
        'La experiencia arranca mostrando de donde viene la propuesta. La carta se presenta breve, clara y con foco en lo que importa: ayudar a elegir rapido sin perder el caracter del lugar.',
      position: '58% 46%',
      tone: 'from-[#24170e]/78 via-[#24170e]/18 to-transparent',
    },
    {
      kicker: '02 / Metodo',
      label: 'Cada preparacion tiene su momento',
      title: 'Metodos visibles, sin ruido.',
      copy:
        'El recorrido baja al detalle de la preparacion. La narrativa acompana metodos, especialidades y pequenas decisiones que ayudan a sentir el ritmo de la cafeteria antes de llegar.',
      position: '80% 40%',
      tone: 'from-[#2c1a0d]/72 via-[#2c1a0d]/18 to-transparent',
    },
    {
      kicker: '03 / Visita',
      label: 'Reservar se siente natural',
      title: 'La reserva aparece justo a tiempo.',
      copy:
        'Cuando la historia avanza, la llamada a la accion deja de ser un boton suelto y se integra al relato. Horarios, ubicacion y reserva se muestran como una extension logica de la experiencia.',
      position: '46% 66%',
      tone: 'from-[#1f130b]/80 via-[#1f130b]/25 to-transparent',
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (current) setActiveStep(Number((current.target as HTMLElement).dataset.step))
      },
      { rootMargin: '-28% 0px -40% 0px', threshold: [0.2, 0.45, 0.7] },
    )

    stepRefs.current.forEach((node) => node && observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen bg-[#f1e3ca] text-[#302218] [font-family:var(--font-fraunces),Georgia,serif]">
      <ConceptNotice />

      <header className="border-b border-[#302218]/25">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:h-24 sm:px-8 lg:px-12">
          <Link href="#inicio" className="flex items-center gap-3 text-2xl font-semibold italic tracking-[-0.045em]">
            <span className="grid size-10 place-items-center rounded-full bg-[#b75632] text-[#fff7e8]">
              <Coffee className="size-5" />
            </span>
            Bruma Cafe
          </Link>
          <nav className="hidden gap-8 font-mono text-[10px] tracking-[0.14em] uppercase md:flex">
            <a href="#relato">La experiencia</a>
            <a href="#carta">La carta</a>
            <a href="#visitanos">Visitanos</a>
          </nav>
          <a href="#visitanos" className="hidden min-h-11 items-center gap-2 rounded-full bg-[#302218] px-5 text-sm font-semibold text-[#f1e3ca] sm:flex">
            Reservar <ArrowUpRight className="size-4" />
          </a>
          <Menu className="sm:hidden" aria-hidden="true" />
        </div>
      </header>

      <section id="inicio" className="relative overflow-hidden border-b border-[#302218]/15">
        <div className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-[1440px] gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-12 lg:py-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex flex-col justify-between gap-10"
          >
            <div className="space-y-6">
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase">Cafe de especialidad · Montevideo</p>
              <h1 className="max-w-3xl text-[clamp(4rem,11vw,9rem)] leading-[0.8] font-normal tracking-[-0.075em] text-balance">
                Cafe de origen,
                <em className="block font-light">preparado sin apuro.</em>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-[#302218]/74 sm:text-xl">
                Una experiencia digital calida, pensada para convertir la curiosidad de una busqueda local en una visita, una reserva o una consulta.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {project.details.map((detail, index) => (
                <div key={detail} className="rounded-[1.4rem_0.35rem_1.4rem_0.35rem] border border-[#302218]/18 bg-white/35 px-4 py-4">
                  <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#8a5a3b]">0{index + 1}</div>
                  <div className="mt-2 text-sm font-semibold leading-snug">{detail}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.figure
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, ease: EASE }}
            className="relative min-h-[30rem] overflow-hidden rounded-[3rem_0.8rem_3rem_0.8rem] border border-[#302218]/15 bg-[#24170e]"
          >
            <Image src={project.image} alt={project.imageAlt} fill priority sizes="(max-width:1024px) 100vw, 52vw" className="object-cover object-[68%_center]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#24170e]/45 via-transparent to-[#24170e]/12" />
            <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-4 text-[#fff7e8] sm:left-7 sm:right-7 sm:top-7">
              <div className="max-w-xs">
                <div className="font-mono text-[9px] tracking-[0.16em] uppercase opacity-70">Recorre el sistema</div>
                <div className="mt-2 text-2xl leading-tight font-semibold italic">La historia cambia con tu scroll.</div>
              </div>
              <div className="rounded-full border border-white/20 bg-black/20 px-4 py-2 font-mono text-[9px] tracking-[0.16em] uppercase backdrop-blur-md">
                Scroll storytelling
              </div>
            </div>
            <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between text-[#fff7e8] sm:right-7 sm:bottom-7 sm:left-7">
              <div className="max-w-sm rounded-[1.5rem_0.45rem_1.5rem_0.45rem] bg-black/25 p-4 backdrop-blur-md">
                <div className="font-mono text-[9px] tracking-[0.16em] uppercase opacity-65">Objetivo</div>
                <p className="mt-2 text-sm leading-relaxed">{project.objective}</p>
              </div>
              <ArrowDown className="hidden size-5 animate-bounce motion-reduce:animate-none sm:block" />
            </div>
          </motion.figure>
        </div>
      </section>

      <section id="relato" className="bg-[#2b1c13] text-[#fff7e8]">
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-16 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-12 lg:py-0">
          <div className="hidden lg:block lg:py-12">
            <div className="lg:sticky lg:top-8">
              <div className="relative overflow-hidden rounded-[3rem_0.6rem_3rem_0.6rem] border border-white/10 bg-[#24170e] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
                <Image
                  src={project.image}
                  alt="Narrative build canvas de Bruma Cafe"
                  fill
                  sizes="(max-width:1024px) 100vw, 52vw"
                  className="object-cover"
                  style={{ objectPosition: scenes[activeStep].position }}
                />
                <div className={cn('absolute inset-0 bg-gradient-to-t', scenes[activeStep].tone)} />
                <div className="absolute inset-0">
                  <motion.div
                    className="absolute left-5 top-5 right-5 rounded-[1.4rem_0.35rem_1.4rem_0.35rem] border border-white/12 bg-black/25 p-4 backdrop-blur-md"
                    initial={false}
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: [0.7, 1],
                            y: activeStep === 0 ? 0 : -4,
                          }
                    }
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.16em] uppercase text-[#e9c9a5]">
                      <span>{scenes[activeStep].kicker}</span>
                      <span>Construccion en vivo</span>
                    </div>
                    <p className="mt-2 max-w-md text-3xl leading-[0.92] font-semibold italic text-white">{scenes[activeStep].title}</p>
                  </motion.div>

                  <motion.div
                    className="absolute left-5 top-1/2 w-[42%] -translate-y-1/2 rounded-[2rem_0.5rem_2rem_0.5rem] border border-white/12 bg-[#f1e3ca]/92 p-4 text-[#302218] shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
                    initial={false}
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: activeStep >= 0 ? 1 : 0,
                            x: activeStep >= 0 ? 0 : -22,
                            y: activeStep === 0 ? '-50%' : activeStep === 1 ? '-56%' : '-62%',
                            scale: activeStep === 0 ? 1 : 1.02,
                          }
                    }
                    transition={{ duration: 0.65, ease: EASE }}
                  >
                    <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#8a5a3b]">{scenes[0].label}</div>
                    <div className="mt-2 text-lg font-semibold leading-tight">{project.details[0]}</div>
                    <p className="mt-2 text-sm leading-relaxed text-[#302218]/72">Carta breve, especialidades visibles y una lectura inmediata.</p>
                  </motion.div>

                  <motion.div
                    className="absolute right-5 top-[46%] w-[38%] rounded-[2rem_0.5rem_2rem_0.5rem] border border-white/12 bg-[#302218]/90 p-4 text-[#fff7e8] shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
                    initial={false}
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: activeStep >= 1 ? 1 : 0,
                            x: activeStep >= 1 ? 0 : 22,
                            y: activeStep === 0 ? '-50%' : activeStep === 1 ? '-42%' : '-36%',
                            scale: activeStep >= 1 ? 1 : 0.98,
                          }
                    }
                    transition={{ duration: 0.65, ease: EASE }}
                  >
                    <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#d9ad7f]">{scenes[1].label}</div>
                    <div className="mt-2 text-lg font-semibold leading-tight">{project.details[1]}</div>
                    <p className="mt-2 text-sm leading-relaxed text-white/72">Cada preparacion se siente como una parte natural de la experiencia.</p>
                  </motion.div>

                  <motion.div
                    className="absolute right-8 bottom-8 left-8 rounded-[2rem_0.5rem_2rem_0.5rem] border border-white/12 bg-white/92 p-4 text-[#302218] shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
                    initial={false}
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: activeStep >= 2 ? 1 : 0,
                            y: activeStep >= 2 ? 0 : 18,
                            scale: activeStep >= 2 ? 1 : 0.98,
                          }
                    }
                    transition={{ duration: 0.65, ease: EASE }}
                  >
                    <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.16em] uppercase text-[#8a5a3b]">
                      <span>{scenes[2].label}</span>
                      <span>Reserva y visita</span>
                    </div>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      <div className="rounded-[1.2rem_0.35rem_1.2rem_0.35rem] border border-[#302218]/12 bg-[#f1e3ca] p-3">
                        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#8a5a3b]">Horario</div>
                        <p className="mt-1 text-sm font-semibold">Reservas visibles desde la primera mirada</p>
                      </div>
                      <div className="rounded-[1.2rem_0.35rem_1.2rem_0.35rem] border border-[#302218]/12 bg-[#f1e3ca] p-3">
                        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#8a5a3b]">CTA</div>
                        <p className="mt-1 text-sm font-semibold">Ubicacion y reserva aparecen al final del recorrido</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div className="absolute inset-x-5 bottom-5 hidden h-1 overflow-hidden rounded-full bg-white/15 lg:block">
                    <motion.div className="h-full origin-left bg-[#d36b43]" animate={{ scaleX: (activeStep + 1) / scenes.length }} transition={{ duration: 0.55, ease: EASE }} />
                  </motion.div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between font-mono text-[9px] tracking-[0.14em] uppercase text-[#d9ad7f]">
                <span>Del grano a la mesa</span>
                <span>0{activeStep + 1} / 03</span>
              </div>
            </div>
          </div>

          <div id="carta" className="space-y-6 pb-12 pt-0 lg:py-[12vh]">
            {scenes.map((scene, index) => {
              const service = project.services[index]

              return (
                <motion.article
                  key={scene.kicker}
                  ref={(node) => {
                    stepRefs.current[index] = node
                  }}
                  data-step={index}
                  initial={reduceMotion ? false : { opacity: 0.2, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.55 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="min-h-[84svh] border-t border-white/12 py-10 first:border-0 first:pt-4 sm:min-h-[72svh] sm:py-14 lg:flex lg:flex-col lg:justify-center"
                >
                  <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.16em] uppercase text-[#d9ad7f]">
                    <span>{scene.kicker}</span>
                    <span>0{index + 1}</span>
                  </div>
                  <h2 className="mt-5 max-w-2xl text-5xl leading-[0.9] font-normal tracking-[-0.05em] text-balance sm:text-7xl">
                    <em>{scene.title}</em>
                  </h2>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#fff7e8]/72 sm:text-xl">{scene.copy}</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {project.details.slice(index, index + 2).map((detail) => (
                      <span key={detail} className="rounded-full border border-[#fff7e8]/20 px-4 py-2 font-mono text-[9px] tracking-[0.12em] uppercase text-[#fff7e8]/82">
                        {detail}
                      </span>
                    ))}
                  </div>
                  <motion.div
                    className="mt-8 overflow-hidden rounded-[2rem_0.45rem_2rem_0.45rem] border border-white/10 bg-black/20 lg:hidden"
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.35 }}
                    transition={{ duration: 0.7, ease: EASE }}
                  >
                    <div className="grid gap-0">
                      <div className="relative aspect-[0.88]">
                        <Image src={project.image} alt={`Escena ${index + 1} de Bruma Cafe`} fill sizes="100vw" className="object-cover" style={{ objectPosition: scene.position }} />
                        <div className={cn('absolute inset-0 bg-gradient-to-t', scene.tone)} />
                        <div className="absolute left-4 right-4 top-4 rounded-[1.2rem_0.35rem_1.2rem_0.35rem] border border-white/10 bg-black/25 p-3 backdrop-blur-md">
                          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#e9c9a5]">{scene.label}</div>
                          <p className="mt-2 text-2xl leading-[0.95] font-semibold italic text-white">{service.title}</p>
                        </div>
                      </div>
                      <div className="grid gap-3 bg-[#2b1c13] p-4">
                        <div className="rounded-[1.2rem_0.35rem_1.2rem_0.35rem] border border-white/10 bg-white/6 p-4">
                          <p className="text-sm leading-relaxed text-[#fff7e8]/76">{scene.copy}</p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-[1.2rem_0.35rem_1.2rem_0.35rem] border border-white/10 bg-white/6 p-4">
                            <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#d9ad7f]">Pieza 01</div>
                            <p className="mt-2 text-sm font-semibold leading-snug">{project.details[index]}</p>
                          </div>
                          <div className="rounded-[1.2rem_0.35rem_1.2rem_0.35rem] border border-white/10 bg-white/6 p-4">
                            <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#d9ad7f]">Pieza 02</div>
                            <p className="mt-2 text-sm font-semibold leading-snug">{project.details[(index + 1) % project.details.length]}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="visitanos" className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1344px] gap-10 border-y border-[#302218] py-10 sm:py-16 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
          <div className="grid size-32 place-items-center rounded-full border border-[#302218] text-center font-mono text-[9px] tracking-[0.13em] uppercase sm:size-44">
            <Clock3 className="size-7 text-[#b75632]" />
            <span>
              Una pausa
              <br />
              bien hecha
            </span>
          </div>
          <div>
            <h2 className="max-w-5xl text-5xl leading-[0.86] font-normal tracking-[-0.055em] sm:text-8xl">
              Tu mesa puede estar <em>esperando.</em>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-70">Consulta horarios, encontranos y reservá antes de venir.</p>
            <Link href="/#contact" className="group mt-8 inline-flex items-center gap-5 border-b border-[#302218] pb-2 text-xl font-semibold italic">
              Quiero una experiencia asi <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-[1344px] justify-between gap-5 border-t border-[#302218]/25 pt-6 text-sm">
          <BackToProjects />
          <span className="hidden font-mono text-[9px] tracking-[0.13em] uppercase opacity-55 sm:block">Demo conceptual por MR14</span>
        </div>
      </section>
    </main>
  )
}

function LineaNorteLanding({ project }: { project: ConceptProject }) {
  const reduceMotion = useReducedMotion()
  return (
    <main className="min-h-screen bg-[#e7e3dc] text-[#242522] [font-family:var(--font-space-grotesk),Arial,sans-serif]">
      <ConceptNotice dark />
      <header className="border-b border-[#242522]">
        <div className="mx-auto grid h-20 max-w-[1440px] grid-cols-[1fr_auto] items-center px-5 sm:h-24 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-12">
          <Link href="#inicio" className="text-xl font-semibold tracking-[-0.05em] uppercase sm:text-2xl">
            Linea-Norte
          </Link>
          <div className="flex items-center gap-7 lg:justify-between">
            <span className="hidden font-mono text-[9px] tracking-[0.16em] uppercase md:block">Arquitectura / Interiorismo / Direccion</span>
            <Menu className="size-6" />
          </div>
        </div>
      </header>

      <section id="inicio" className="border-b border-[#242522]">
        <div className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-[1440px] lg:grid-cols-[0.78fr_1.22fr]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex flex-col justify-between border-[#242522] p-5 sm:p-8 lg:border-r lg:p-12"
          >
            <div className="flex justify-between font-mono text-[9px] tracking-[0.16em] uppercase">
              <span>Estudio conceptual</span>
              <span>UY / 01</span>
            </div>
            <h1 className="my-16 text-[clamp(3.8rem,7.4vw,8rem)] leading-[0.79] font-medium tracking-[-0.085em] uppercase">
              Espacios
              <br />
              <span className="text-[#9a5d3b]">pensados</span>
              <br />
              desde el
              <br />
              lugar.
            </h1>
            <p className="max-w-sm text-sm leading-relaxed opacity-60">Arquitectura, interiorismo y direccion reunidos bajo una misma linea de trabajo.</p>
          </motion.div>
          <motion.div
            initial={reduceMotion ? false : { clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 1.05, delay: 0.15, ease: EASE }}
            className="relative min-h-[28rem] overflow-hidden lg:min-h-0"
          >
            <Image src={project.image} alt={project.imageAlt} fill priority sizes="(max-width:1024px) 100vw, 61vw" className="object-cover" />
            <div className="absolute top-0 bottom-0 left-[18%] w-px bg-white/50" />
            <div className="absolute top-0 bottom-0 left-[64%] w-px bg-white/50" />
            <span className="absolute right-5 bottom-5 bg-[#e7e3dc] px-4 py-3 font-mono text-[9px] tracking-[0.14em] uppercase">Costa / Vivienda 01</span>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#242522]">
        <div className="mx-auto grid max-w-[1440px] sm:grid-cols-4">
          {project.details.map((detail, index) => (
            <div key={detail} className="flex min-h-24 items-center justify-between border-b border-[#242522] px-5 py-5 font-mono text-[9px] tracking-[0.14em] uppercase last:border-b-0 sm:min-h-32 sm:border-r sm:border-b-0 sm:px-6 sm:last:border-r-0">
              <span className="text-[#9a5d3b]">0{index + 1}</span>
              <span>{detail}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <p className="font-mono text-[9px] tracking-[0.16em] text-[#9a5d3b] uppercase">Una practica integrada</p>
            <h2 className="mt-5 text-5xl leading-[0.88] font-semibold tracking-[-0.065em] sm:text-7xl">Una linea clara, de la idea a la obra.</h2>
          </div>
          <div className="border-t border-[#242522]">
            {project.services.map((service) => (
              <motion.article
                key={service.number}
                initial={reduceMotion ? false : { x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-12%' }}
                transition={{ duration: 0.65, ease: EASE }}
                className="group grid gap-5 border-b border-[#242522] py-8 sm:grid-cols-[5rem_1fr_auto] sm:items-center sm:py-11"
              >
                <span className="font-mono text-[10px] text-[#9a5d3b]">{service.number}</span>
                <div>
                  <h3 className="text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">{service.title}</h3>
                  <p className="mt-3 max-w-xl leading-relaxed opacity-60">{service.copy}</p>
                </div>
                <ArrowRight className="hidden size-7 transition-transform duration-300 group-hover:translate-x-2 sm:block" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid min-h-[70svh] border-y border-[#242522] lg:grid-cols-2">
        <div className="relative min-h-[24rem] overflow-hidden border-b border-[#242522] lg:border-r lg:border-b-0">
          <Image src={project.image} alt="Detalle material de una residencia conceptual" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover object-left grayscale transition duration-700 hover:grayscale-0" />
        </div>
        <div className="flex flex-col justify-between p-6 sm:p-12 lg:p-16">
          <span className="font-mono text-[9px] tracking-[0.16em] uppercase">Principio 01</span>
          <blockquote className="my-16 text-4xl leading-[0.94] font-medium tracking-[-0.05em] sm:text-6xl">“La arquitectura empieza cuando el lugar deja de ser fondo y pasa a tomar decisiones.”</blockquote>
          <span className="font-mono text-[9px] tracking-[0.16em] uppercase opacity-55">Material / Luz / Tiempo</span>
        </div>
      </section>

      <section className="bg-[#242522] px-5 py-16 text-[#e7e3dc] sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1344px] gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-[9px] tracking-[0.16em] text-[#c88762] uppercase">Nueva obra</p>
            <h2 className="mt-6 max-w-5xl text-5xl leading-[0.84] font-semibold tracking-[-0.075em] sm:text-8xl">Construyamos desde una idea clara.</h2>
          </div>
          <Link href="/#contact" className="flex min-h-14 w-full items-center justify-between border border-[#e7e3dc] px-5 font-semibold lg:w-auto lg:min-w-64">
            Quiero una web asi <ArrowUpRight className="size-5" />
          </Link>
        </div>
        <div className="mx-auto mt-14 flex max-w-[1344px] items-center justify-between border-t border-[#e7e3dc]/25 pt-6">
          <BackToProjects />
          <span className="font-mono text-[9px] tracking-[0.13em] uppercase opacity-50">LN / 2026</span>
        </div>
      </section>
    </main>
  )
}

function AuraDentalLanding({ project }: { project: ConceptProject }) {
  const reduceMotion = useReducedMotion()
  const benefits = [
    { icon: ShieldCheck, title: 'Informacion clara', copy: 'Sabes que se va a hacer y por que antes de empezar.' },
    { icon: CalendarDays, title: 'Agenda sencilla', copy: 'Eliges el momento que mejor se adapta a tu semana.' },
    { icon: Sparkles, title: 'Resultados naturales', copy: 'Tratamientos pensados para cuidar funcion y estetica.' },
  ]

  return (
    <main className="min-h-screen overflow-hidden bg-[#edf2ec] text-[#17332f] [font-family:var(--font-nunito-sans),Arial,sans-serif]">
      <ConceptNotice />
      <header className="relative z-20">
        <div className="mx-auto flex h-20 max-w-[1380px] items-center justify-between px-5 sm:h-24 sm:px-8">
          <Link href="#inicio" className="flex items-center gap-3 text-xl font-semibold tracking-[-0.04em]">
            <span className="grid size-10 place-items-center rounded-full bg-[#5b8580] text-white">
              <Sparkles className="size-5" />
            </span>
            Aura Dental
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a href="#tratamientos">Tratamientos</a>
            <a href="#experiencia">Como te cuidamos</a>
            <a href="#agenda">Agenda</a>
          </nav>
          <a href="#agenda" className="hidden min-h-11 items-center gap-2 rounded-full bg-[#17332f] px-5 text-sm font-semibold text-white sm:flex">
            Agendar <CalendarDays className="size-4" />
          </a>
          <Menu className="sm:hidden" />
        </div>
      </header>

      <section id="inicio" className="mx-auto max-w-[1380px] px-5 pt-4 pb-14 sm:px-8 sm:pt-8 sm:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: EASE }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#cbdcd7] px-4 py-2 text-xs font-semibold">
              <span className="size-2 rounded-full bg-[#5b8580]" /> Odontologia cercana
            </span>
            <h1 className="mt-7 text-[clamp(4rem,9vw,8.5rem)] leading-[0.85] font-extrabold tracking-[-0.065em] text-balance">
              Cuidar tu sonrisa puede sentirse <span className="text-[#5b8580]">simple.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#17332f]/68">
              Un espacio pensado para explicar cada paso, escuchar lo que necesitas y acompanarte con tranquilidad.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#agenda" className="flex min-h-14 items-center justify-between rounded-full bg-[#5b8580] px-6 font-semibold text-white sm:min-w-52">
                Agendar consulta <ArrowUpRight className="size-5" />
              </a>
              <a href="#tratamientos" className="flex min-h-14 items-center justify-between rounded-full border border-[#17332f]/30 px-6 font-semibold sm:min-w-52">
                Ver tratamientos <ChevronRight className="size-5" />
              </a>
            </div>
          </motion.div>
          <div className="relative mx-auto aspect-square w-full max-w-[42rem]">
            <motion.div aria-hidden="true" className="absolute inset-[3%] rounded-full border border-[#5b8580]/35" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
              <span className="absolute top-[8%] right-[12%] size-4 rounded-full bg-[#5b8580]" />
            </motion.div>
            <motion.div aria-hidden="true" className="absolute inset-[10%] rounded-full border border-dashed border-[#17332f]/20" animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 36, repeat: Infinity, ease: 'linear' }} />
            <div className="absolute inset-[16%] overflow-hidden rounded-[44%_56%_48%_52%/54%_44%_56%_46%] shadow-[0_30px_80px_rgba(23,51,47,0.18)]">
              <Image src={project.image} alt={project.imageAlt} fill priority sizes="(max-width:1024px) 86vw, 42vw" className="object-cover object-left" />
            </div>
            <motion.span animate={reduceMotion ? undefined : { y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: EASE }} className="absolute right-[2%] bottom-[18%] rounded-[1.25rem_0.35rem_1.25rem_0.35rem] bg-white p-4 shadow-xl">
              <span className="block font-mono text-[8px] tracking-[0.13em] uppercase opacity-50">Proxima hora</span>
              <span className="mt-1 block font-semibold">Agenda online</span>
            </motion.span>
          </div>
        </div>
      </section>

      <section id="tratamientos" className="bg-white/65 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[9px] tracking-[0.16em] text-[#5b8580] uppercase">Tratamientos</p>
              <h2 className="mt-4 text-5xl leading-[0.9] font-semibold tracking-[-0.06em] sm:text-7xl">Elige con informacion.</h2>
            </div>
            <p className="max-w-md leading-relaxed text-[#17332f]/62">Cada tratamiento se presenta con un objetivo claro, sin tecnicismos innecesarios.</p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {project.services.map((service, index) => (
              <motion.article
                key={service.number}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
                className={cn('group flex min-h-[22rem] flex-col justify-between rounded-[2.5rem_0.65rem_2.5rem_0.65rem] p-6 transition-colors duration-500 sm:p-8', index === 1 ? 'bg-[#5b8580] text-white' : 'border border-[#17332f]/18 bg-[#edf2ec] hover:bg-[#cbdcd7]')}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px]">{service.number}</span>
                  <span className="grid size-11 place-items-center rounded-full border border-current/25">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-semibold tracking-[-0.045em]">{service.title}</h3>
                  <p className="mt-4 leading-relaxed opacity-68">{service.copy}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="experiencia" className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="font-mono text-[9px] tracking-[0.16em] text-[#5b8580] uppercase">Tu experiencia</p>
            <h2 className="mt-4 text-5xl leading-[0.9] font-semibold tracking-[-0.06em] sm:text-7xl">Todo claro desde el principio.</h2>
          </div>
          <div className="grid gap-3">
            {benefits.map((benefit, index) => (
              <motion.article
                key={benefit.title}
                initial={reduceMotion ? false : { x: 22, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.09, ease: EASE }}
                className="grid gap-5 rounded-[1.75rem_0.45rem_1.75rem_0.45rem] border border-[#17332f]/18 bg-white/45 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6"
              >
                <span className="grid size-12 place-items-center rounded-full bg-[#cbdcd7]">
                  <benefit.icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed opacity-62">{benefit.copy}</p>
                </div>
                <span className="font-mono text-[9px] text-[#5b8580]">0{index + 1}</span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="agenda" className="px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="mx-auto overflow-hidden rounded-[3rem_0.75rem_3rem_0.75rem] bg-[#17332f] p-6 text-white sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="grid size-12 place-items-center rounded-full bg-[#5b8580]">
                <CalendarDays className="size-5" />
              </span>
              <h2 className="mt-8 max-w-4xl text-5xl leading-[0.86] font-semibold tracking-[-0.07em] sm:text-8xl">Tu proxima consulta, sin vueltas.</h2>
              <p className="mt-6 max-w-xl leading-relaxed text-white/65">Elegí un horario y contanos brevemente qué necesitás.</p>
            </div>
            <Link href="/#contact" className="flex min-h-14 w-full items-center justify-between rounded-full bg-[#edf2ec] px-6 font-semibold text-[#17332f] lg:w-auto lg:min-w-64">
              Quiero una web asi <ArrowUpRight className="size-5" />
            </Link>
          </div>
          <div className="mt-14 flex items-center justify-between border-t border-white/20 pt-6">
            <BackToProjects />
            <span className="hidden font-mono text-[9px] tracking-[0.13em] uppercase text-white/45 sm:block">Aura / Demo MR14</span>
          </div>
        </div>
      </section>
    </main>
  )
}

export function ConceptLanding({ project }: { project: ConceptProject }) {
  const style = {
    '--concept-page': project.theme.page,
    '--concept-ink': project.theme.ink,
    '--concept-accent': project.theme.accent,
    '--concept-soft': project.theme.soft,
  } as CSSProperties

  if (project.slug === 'bruma-cafe') return <BrumaLanding project={project} />
  if (project.slug === 'linea-norte') return <LineaNorteLanding project={project} />
  return <div style={style}><AuraDentalLanding project={project} /></div>
}

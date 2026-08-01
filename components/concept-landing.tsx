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
import type { CSSProperties } from 'react'
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
  tone: string
}

function BrumaLanding({ project }: { project: ConceptProject }) {
  const reduceMotion = useReducedMotion()

  const scenes: StoryScene[] = [
    {
      kicker: '01 / Origen',
      label: 'Carta como punto de partida',
      title: 'Café de origen, preparado sin apuro.',
      copy:
        'La experiencia arranca mostrando de dónde viene la propuesta. La carta se presenta breve, clara y con foco en lo que importa: elegir rápido sin perder el carácter del lugar.',
      tone: 'from-[#24170e]/78 via-[#24170e]/22 to-transparent',
    },
    {
      kicker: '02 / Método',
      label: 'Cada preparación tiene su momento',
      title: 'Métodos visibles, sin ruido.',
      copy:
        'El recorrido baja al detalle de la preparación. La narrativa acompaña métodos, especialidades y pequeñas decisiones que ayudan a sentir el ritmo de la cafetería antes de llegar.',
      tone: 'from-[#2c1a0d]/74 via-[#2c1a0d]/24 to-transparent',
    },
    {
      kicker: '03 / Visita',
      label: 'Reservar se siente natural',
      title: 'La reserva aparece justo a tiempo.',
      copy:
        'Cuando la historia avanza, la llamada a la acci?n deja de ser un bot?n suelto y se integra al relato. Horarios, ubicaci?n y reserva se muestran como una extensi?n l?gica de la experiencia.',
      tone: 'from-[#1f130b]/80 via-[#1f130b]/26 to-transparent',
    },
  ]

  const assembleItems = [
    {
      number: '01',
      title: 'Carta breve y directa',
      copy: 'El primer bloque arma la propuesta: lo justo para elegir r?pido y con contexto.',
    },
    {
      number: '02',
      title: 'Métodos y detalle',
      copy: 'El segundo bloque introduce ritmo, preparación y el lado más artesanal de la experiencia.',
    },
    {
      number: '03',
      title: 'Reserva y visita',
      copy: 'El cierre suma la acci?n final y deja la experiencia lista para convertir.',
    },
  ]

  const stepMeta = [
    { number: '01', label: 'Visi?n general' },
    { number: '02', label: 'Inventario' },
    { number: '03', label: 'Clientes' },
    { number: '04', label: 'Financiaci?n' },
    { number: '05', label: 'Pagos' },
    { number: '06', label: 'Comprobantes' },
    { number: '07', label: 'Reportes' },
    { number: '08', label: 'Cliente' },
  ] as const

  return (
    <main className="min-h-screen bg-[#f1e3ca] text-[#302218] [font-family:var(--font-fraunces),Georgia,serif]">
      <ConceptNotice />

      <header className="border-b border-[#302218]/25">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:h-24 sm:px-8 lg:px-12">
          <Link href="#inicio" className="flex items-center gap-3 text-2xl font-semibold italic tracking-[-0.045em]">
            <span className="grid size-10 place-items-center rounded-full bg-[#b75632] text-[#fff7e8]">
              <Coffee className="size-5" />
            </span>
            Cimarrón Café
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
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase">Café de especialidad · Montevideo</p>
              <h1 className="max-w-3xl text-[clamp(3.5rem,12vw,9rem)] leading-[0.8] font-normal tracking-[-0.075em] text-balance">
                Café de origen,
                <em className="block font-light">preparado sin apuro.</em>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-[#302218]/74 sm:text-xl">
                Una experiencia digital cálida, pensada para convertir la curiosidad de una búsqueda local en una visita, una reserva o una consulta.
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
                <div className="font-mono text-[9px] tracking-[0.16em] uppercase opacity-70">Recorr? el sistema</div>
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
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-16 lg:px-12 lg:py-16">
          <div className="max-w-2xl">
            <p className="font-mono text-[9px] tracking-[0.16em] text-[#d9ad7f] uppercase">Scroll storytelling</p>
            <h2 className="mt-4 text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.86] font-normal tracking-[-0.06em] text-balance">
              La web parece quieta, pero se arma con tu scroll.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/68 sm:text-lg">
              La escena principal se mantiene estable para que todo se lea como una sola pieza. A medida que avanz?s, cambian el foco, el estado y la historia,
              sin superponer bloques que rompan el ritmo.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.92fr_0.58fr] lg:items-start">
            <div className="lg:sticky lg:top-8">
              <div className="relative overflow-hidden rounded-[3rem_0.7rem_3rem_0.7rem] border border-white/10 bg-[#24170e] shadow-[0_36px_90px_rgba(0,0,0,0.28)]">
                <div className="relative aspect-[0.96] sm:aspect-[1.02]">
                  <Image
                    src={project.image}
                    alt="Cimarrón Café en vista principal"
                    fill
                    priority
                    sizes="(max-width:1024px) 100vw, 56vw"
                    className="object-cover object-[66%_center]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#24170e]/55 via-[#24170e]/14 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.14),transparent_34%),radial-gradient(circle_at_68%_28%,rgba(211,107,67,0.14),transparent_28%)]" />

                  <div className="absolute inset-x-4 top-4 rounded-[1.35rem_0.35rem_1.35rem_0.35rem] border border-white/10 bg-black/24 p-4 backdrop-blur-md sm:inset-x-6 sm:top-6 sm:p-5">
                    <div className="flex items-center justify-between gap-4 font-mono text-[9px] tracking-[0.16em] uppercase text-[#e9c9a5]">
                      <span>Cimarrón Café</span>
                      <span>Scroll guiado</span>
                    </div>
                    <p className="mt-2 max-w-md text-2xl leading-[0.94] font-semibold italic text-white sm:text-3xl">
                      Una historia fija que se va completando por capas.
                    </p>
                    <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/12">
                      <div className="h-full origin-left bg-[#d36b43]" style={{ transform: `scaleX(${reduceMotion ? 1 : 0.72})` }} />
                    </div>
                  </div>

                  <div className="absolute left-4 top-1/2 hidden w-[40%] -translate-y-1/2 rounded-[2rem_0.5rem_2rem_0.5rem] border border-white/10 bg-[#f1e3ca]/94 p-4 text-[#302218] shadow-[0_24px_60px_rgba(0,0,0,0.16)] backdrop-blur-md md:block">
                    <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#8a5a3b]">01 / Carta</div>
                    <p className="mt-2 text-lg leading-tight font-semibold">{assembleItems[0].title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#302218]/72">{assembleItems[0].copy}</p>
                  </div>

                  <div className="absolute right-4 top-[46%] hidden w-[34%] rounded-[2rem_0.5rem_2rem_0.5rem] border border-white/10 bg-[#302218]/92 p-4 text-[#fff7e8] shadow-[0_24px_60px_rgba(0,0,0,0.16)] backdrop-blur-md md:block">
                    <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#d9ad7f]">02 / Método</div>
                    <p className="mt-2 text-lg leading-tight font-semibold">{assembleItems[1].title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/72">{assembleItems[1].copy}</p>
                  </div>

                  <div className="absolute inset-x-4 bottom-4 rounded-[2rem_0.5rem_2rem_0.5rem] border border-white/12 bg-white/94 p-4 text-[#302218] shadow-[0_24px_60px_rgba(0,0,0,0.16)] backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-5">
                    <div className="flex items-center justify-between gap-4 font-mono text-[9px] tracking-[0.16em] uppercase text-[#8a5a3b]">
                      <span>03 / Visita</span>
                      <span>Reserva integrada</span>
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[1.2rem_0.35rem_1.2rem_0.35rem] border border-[#302218]/12 bg-[#f1e3ca] p-3">
                        <p className="text-sm font-semibold leading-snug">{assembleItems[2].title}</p>
                        <p className="mt-2 text-sm leading-relaxed text-[#302218]/70">{assembleItems[2].copy}</p>
                      </div>
                      <div className="flex items-center justify-between rounded-[1.2rem_0.35rem_1.2rem_0.35rem] border border-[#302218]/12 bg-[#f7ece0] p-3">
                        <div>
                          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#8a5a3b]">Acción final</div>
                          <p className="mt-1 text-sm font-semibold">La experiencia cierra lista para convertir</p>
                        </div>
                        <ArrowUpRight className="size-5 shrink-0" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-x-5 bottom-5 hidden h-1 overflow-hidden rounded-full bg-white/15 lg:block">
                    <div className="h-full origin-left bg-[#d36b43]" style={{ transform: `scaleX(${reduceMotion ? 1 : 0.86})` }} />
                  </div>
                </div>
              </div>
            </div>

            <div id="carta" className="space-y-4">
              {scenes.map((scene, index) => (
                <motion.article
                  key={scene.kicker}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-18% 0px -12% 0px' }}
                  transition={{ duration: 0.55, ease: EASE, delay: index * 0.04 }}
                  className="group rounded-[2rem_0.45rem_2rem_0.45rem] border border-white/10 bg-white/6 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:-translate-y-0.5 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-4 font-mono text-[9px] tracking-[0.16em] uppercase text-[#d9ad7f]">
                    <span>{scene.kicker}</span>
                    <span>{stepMeta[index].label}</span>
                  </div>
                  <h3 className="mt-4 max-w-xl text-3xl leading-[0.94] font-semibold tracking-[-0.04em] text-balance sm:text-4xl">
                    <em>{scene.title}</em>
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/68 sm:text-[1.05rem]">{scene.copy}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[assembleItems[index], assembleItems[Math.min(index + 1, assembleItems.length - 1)]].map((item, itemIndex) => (
                      <span
                        key={`${item.number}-${itemIndex}`}
                        className={cn(
                          'rounded-full border px-3 py-1 font-mono text-[9px] tracking-[0.14em] uppercase',
                          index === 0 && 'border-[#d9ad7f]/25 bg-[#f1e3ca]/8 text-[#f5e4cf]',
                          index === 1 && 'border-[#d36b43]/30 bg-[#d36b43]/10 text-[#ffd9c8]',
                          index >= 2 && 'border-white/15 bg-white/6 text-white/78',
                        )}
                      >
                        {item.title}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}

              <div className="grid gap-3 rounded-[2rem_0.45rem_2rem_0.45rem] border border-white/10 bg-[#f1e3ca] p-5 text-[#302218] shadow-[0_20px_50px_rgba(0,0,0,0.12)] sm:grid-cols-[1.2fr_0.8fr] sm:items-center sm:p-6">
                <div>
                  <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#8a5a3b]">Cierre</div>
                  <p className="mt-2 text-2xl leading-tight font-semibold">
                    Un sistema que acompa?a el recorrido sin interrumpirlo.
                  </p>
                </div>
                <div className="rounded-[1.3rem_0.35rem_1.3rem_0.35rem] border border-[#302218]/12 bg-white/55 p-4">
                  <p className="text-sm leading-relaxed text-[#302218]/80">
                    Del primer vistazo a la reserva final, la experiencia se entiende como una sola pieza, con el contenido apareciendo en el orden justo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/70">
            <BackToProjects />
            <span className="font-mono text-[9px] tracking-[0.13em] uppercase">Demo conceptual por MR14</span>
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
            <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-70">Consultá horarios, encontranos y reservá antes de venir.</p>
            <Link href="/#contact" className="group mt-8 inline-flex items-center gap-5 border-b border-[#302218] pb-2 text-xl font-semibold italic">
              Quiero una experiencia así <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
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
          <Link href="#inicio" className="text-xl font-semibold tracking-[-0.05em] uppercase sm:text-2xl [font-family:var(--font-geist-sans),Arial,sans-serif]">
            Linea-Norte
          </Link>
          <div className="flex items-center gap-7 lg:justify-between">
            <span className="hidden text-[9px] tracking-[0.2em] uppercase md:block [font-family:var(--font-geist-sans),Arial,sans-serif]">Arquitectura / Interiorismo / Dirección</span>
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
            <div className="flex justify-between text-[9px] tracking-[0.2em] uppercase [font-family:var(--font-geist-sans),Arial,sans-serif]">
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
            <span className="absolute right-5 bottom-5 bg-[#e7e3dc] px-4 py-3 text-[9px] tracking-[0.2em] uppercase [font-family:var(--font-geist-sans),Arial,sans-serif]">Costa / Vivienda 01</span>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#242522]">
        <div className="mx-auto grid max-w-[1440px] sm:grid-cols-4">
          {project.details.map((detail, index) => (
            <div key={detail} className="flex min-h-24 items-center justify-between border-b border-[#242522] px-5 py-5 text-[9px] tracking-[0.2em] uppercase last:border-b-0 sm:min-h-32 sm:border-r sm:border-b-0 sm:px-6 sm:last:border-r-0 [font-family:var(--font-geist-sans),Arial,sans-serif]">
              <span className="text-[#9a5d3b]">0{index + 1}</span>
              <span>{detail}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <p className="text-[9px] tracking-[0.2em] text-[#9a5d3b] uppercase [font-family:var(--font-geist-sans),Arial,sans-serif]">Una practica integrada</p>
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
                <span className="text-[10px] text-[#9a5d3b] [font-family:var(--font-geist-sans),Arial,sans-serif]">{service.number}</span>
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
          <span className="text-[9px] tracking-[0.2em] uppercase [font-family:var(--font-geist-sans),Arial,sans-serif]">Principio 01</span>
          <blockquote className="my-16 text-4xl leading-[0.94] font-medium tracking-[-0.05em] sm:text-6xl">“La arquitectura empieza cuando el lugar deja de ser fondo y pasa a tomar decisiones.”</blockquote>
          <span className="text-[9px] tracking-[0.2em] uppercase opacity-55 [font-family:var(--font-geist-sans),Arial,sans-serif]">Material / Luz / Tiempo</span>
        </div>
      </section>

      <section className="bg-[#242522] px-5 py-16 text-[#e7e3dc] sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1344px] gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[9px] tracking-[0.2em] text-[#c88762] uppercase [font-family:var(--font-geist-sans),Arial,sans-serif]">Nueva obra</p>
            <h2 className="mt-6 max-w-5xl text-5xl leading-[0.84] font-semibold tracking-[-0.075em] sm:text-8xl">Construyamos desde una idea clara.</h2>
          </div>
          <Link href="/#contact" className="flex min-h-14 w-full items-center justify-between border border-[#e7e3dc] px-5 font-semibold lg:w-auto lg:min-w-64">
            Quiero una web asi <ArrowUpRight className="size-5" />
          </Link>
        </div>
        <div className="mx-auto mt-14 flex max-w-[1344px] items-center justify-between border-t border-[#e7e3dc]/25 pt-6">
          <BackToProjects />
          <span className="text-[9px] tracking-[0.2em] uppercase opacity-50 [font-family:var(--font-geist-sans),Arial,sans-serif]">LN / 2026</span>
        </div>
      </section>
    </main>
  )
}

function AuraDentalLanding({ project }: { project: ConceptProject }) {
  const reduceMotion = useReducedMotion()
  const benefits = [
    { icon: ShieldCheck, title: 'Informaci?n clara', copy: 'Sab?s qu? se va a hacer y por qu? antes de empezar.' },
    { icon: CalendarDays, title: 'Agenda sencilla', copy: 'Eleg?s el momento que mejor se adapta a tu semana.' },
    { icon: Sparkles, title: 'Resultados naturales', copy: 'Tratamientos pensados para cuidar funci?n y est?tica.' },
  ]

  return (
    <main className="min-h-screen overflow-hidden bg-[#edf2ec] text-[#17332f] [font-family:var(--font-nunito-sans),Arial,sans-serif]">
      <ConceptNotice />
      <header className="relative z-20">
        <div className="mx-auto flex h-20 max-w-[1380px] items-center justify-between px-5 sm:h-24 sm:px-8">
          <Link href="#inicio" className="flex items-center gap-3 text-xl font-semibold tracking-[-0.04em] [font-family:var(--font-nunito-sans),Arial,sans-serif]">
            <span className="grid size-10 place-items-center rounded-full bg-[#5b8580] text-white">
              <Sparkles className="size-5" />
            </span>
            Aura Dental
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium md:flex [font-family:var(--font-nunito-sans),Arial,sans-serif]">
            <a href="#tratamientos">Tratamientos</a>
            <a href="#experiencia">C?mo te cuidamos</a>
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
            <span className="inline-flex items-center gap-2 rounded-full bg-[#cbdcd7] px-4 py-2 text-xs font-semibold [font-family:var(--font-mazius-display),var(--font-nunito-sans),Arial,sans-serif]">
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
              <span className="block font-mono text-[8px] tracking-[0.13em] uppercase opacity-50">Pr?xima hora</span>
              <span className="mt-1 block font-semibold">Agenda online</span>
            </motion.span>
          </div>
        </div>
      </section>

      <section id="tratamientos" className="bg-white/65 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] tracking-[0.2em] text-[#5b8580] uppercase [font-family:var(--font-mazius-display),var(--font-nunito-sans),Arial,sans-serif]">Tratamientos</p>
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
                  <span className="[font-family:var(--font-mazius-display),var(--font-nunito-sans),Arial,sans-serif] text-[10px]">{service.number}</span>
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
            <p className="text-[9px] tracking-[0.2em] text-[#5b8580] uppercase [font-family:var(--font-mazius-display),var(--font-nunito-sans),Arial,sans-serif]">Tu experiencia</p>
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
                <span className="[font-family:var(--font-mazius-display),var(--font-nunito-sans),Arial,sans-serif] text-[9px] text-[#5b8580]">0{index + 1}</span>
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
            <span className="hidden text-[9px] tracking-[0.2em] uppercase text-white/45 sm:block [font-family:var(--font-mazius-display),var(--font-nunito-sans),Arial,sans-serif]">Aura / Demo MR14</span>
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


'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowLeft, ArrowUpRight, CalendarDays, Coffee, Menu, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import type { ConceptProject } from '@/lib/project-data'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

type Tone = 'bruma' | 'linea' | 'aura'

function ConceptNotice({ tone, family }: { tone: Tone; family: string }) {
  return (
    <div
      style={{ fontFamily: family }}
      className={cn(
        'relative z-30 px-4 py-2.5 text-center text-[9px] tracking-[0.16em] uppercase',
        tone === 'bruma' && 'bg-[#291a12] text-[#f5e4cf]',
        tone === 'linea' && 'bg-[#161713] text-[#eeeae2]',
        tone === 'aura' && 'border-b border-[#17332f]/15 bg-[#cbdcd7] text-[#17332f]',
      )}
    >
      Proyecto conceptual · Marca y contenido ficticios ·{' '}
      <Link href="/proyectos" className="underline underline-offset-4">Volver a proyectos</Link>
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

/**
 * Every landing owns its layout, but shares a light scroll engine. It only
 * writes transforms/clip-paths and gets reverted on unmount to avoid leaks.
 */
function useScrollAssembly(root: React.RefObject<HTMLElement | null>, reducedMotion: boolean | null) {
  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return

    const context = gsap.context(() => {
      const compact = window.matchMedia('(max-width: 767px)').matches
      const media = gsap.utils.toArray<HTMLElement>('[data-parallax-media]')
      const panels = gsap.utils.toArray<HTMLElement>('[data-parallax-panel]')
      const reveals = gsap.utils.toArray<HTMLElement>('[data-scroll-reveal]')

      media.forEach((element, index) => {
        const direction = index % 2 === 0 ? 1 : -1
        gsap.fromTo(
          element,
          { scale: compact ? 1.08 : 1.16, yPercent: compact ? -3 * direction : -8 * direction },
          {
            scale: 1,
            yPercent: compact ? 3 * direction : 8 * direction,
            ease: 'none',
            scrollTrigger: {
              trigger: element.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: compact ? 0.45 : 0.8,
            },
          },
        )
      })

      panels.forEach((panel) => {
        gsap.fromTo(
          panel,
          { clipPath: compact ? 'inset(9% 4% 9% 4%)' : 'inset(13% 8% 13% 8%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              start: 'top 88%',
              end: 'center 48%',
              scrub: compact ? 0.45 : 0.7,
            },
          },
        )
      })

      reveals.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: compact ? 20 : 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 84%', once: true },
          },
        )
      })
    }, root)

    return () => context.revert()
  }, [reducedMotion, root])
}

function BrumaLanding({ project }: { project: ConceptProject }) {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  useScrollAssembly(root, reducedMotion)

  return (
    <main ref={root} className="overflow-hidden bg-[#f1e3ca] text-[#302218] [font-family:var(--font-fraunces),Georgia,serif]">
      <ConceptNotice tone="bruma" family="var(--font-fraunces), Georgia, serif" />
      <header className="relative z-20 border-b border-[#302218]/20 bg-[#f1e3ca]/94 backdrop-blur-sm">
        <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-5 sm:h-24 sm:px-8 lg:px-12">
          <Link href="#inicio" className="flex items-center gap-3 text-2xl font-semibold italic tracking-[-0.05em]">
            <span className="grid size-10 place-items-center rounded-full bg-[#b75632] text-[#fff7e8]"><Coffee className="size-5" /></span>
            Cimarrón Café
          </Link>
          <nav className="hidden items-center gap-8 text-[11px] tracking-[0.12em] uppercase md:flex">
            <a href="#origen">Origen</a><a href="#metodo">Método</a><a href="#visita">Visita</a>
          </nav>
          <a href="#visita" className="hidden min-h-11 items-center gap-2 rounded-full bg-[#302218] px-5 text-sm font-semibold text-[#f1e3ca] sm:flex">Reservar <ArrowUpRight className="size-4" /></a>
          <Menu className="sm:hidden" aria-hidden="true" />
        </div>
      </header>

      <section id="inicio" className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-[1480px] items-end gap-8 px-5 pt-10 pb-8 sm:px-8 sm:pt-14 sm:pb-12 lg:grid-cols-[0.76fr_1.24fr] lg:gap-12 lg:px-12">
        <div className="relative z-10 pb-3 lg:pb-10">
          <p className="text-[10px] tracking-[0.18em] uppercase">Café de especialidad · Montevideo</p>
          <h1 className="mt-7 max-w-3xl text-[clamp(4.1rem,8.8vw,9rem)] leading-[0.78] font-normal tracking-[-0.075em]">Café de origen,<em className="block font-light"> preparado sin apuro.</em></h1>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-[#302218]/72 sm:text-xl">Una web que avanza como una visita: primero el aroma, después el método y al final, la mesa.</p>
          <a href="#origen" className="mt-9 inline-flex items-center gap-3 border-b border-[#302218] pb-2 text-lg font-semibold italic">Empezá el recorrido <ArrowDown className="size-4" /></a>
        </div>
        <div data-parallax-panel className="relative min-h-[30rem] overflow-hidden rounded-[3.5rem_0.45rem_0.45rem_0.45rem] bg-[#25170f] sm:min-h-[40rem] lg:min-h-[calc(100svh-11rem)]">
          <div data-parallax-media className="absolute -inset-y-[12%] -inset-x-[8%]"><Image src={project.image} alt={project.imageAlt} fill priority sizes="(max-width:1024px) 100vw, 64vw" className="object-cover object-[60%_center]" /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#25170f]/64 via-transparent to-[#25170f]/14" />
          <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between text-[#fff7e8] sm:right-8 sm:bottom-8 sm:left-8">
            <p className="max-w-xs text-2xl leading-[0.9] font-semibold italic">Una pausa que se descubre mientras bajás.</p>
            <span className="hidden text-[9px] tracking-[0.16em] uppercase sm:block">01 / 03</span>
          </div>
        </div>
      </section>

      <section id="origen" className="bg-[#2b1b12] py-16 text-[#f5e4cf] sm:py-28">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div data-scroll-reveal className="grid gap-8 lg:grid-cols-[0.52fr_1.48fr] lg:items-end">
            <p className="text-[10px] tracking-[0.2em] text-[#d9ad7f] uppercase">01 / Origen</p>
            <h2 className="max-w-5xl text-[clamp(3.5rem,7vw,7.6rem)] leading-[0.8] tracking-[-0.07em]">La carta no se muestra: <em className="font-light">se abre.</em></h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div data-parallax-panel className="relative aspect-[1.12] overflow-hidden rounded-[0.35rem_3.5rem_0.35rem_0.35rem]">
              <div data-parallax-media className="absolute -inset-[10%]"><Image src={project.image} alt="Detalle conceptual de café filtrado" fill sizes="(max-width:1024px) 100vw, 58vw" className="object-cover object-[32%_center]" /></div>
            </div>
            <div data-scroll-reveal className="border-t border-[#f5e4cf]/25 pt-7 lg:border-t-0 lg:border-l lg:pl-10">
              <p className="max-w-lg text-2xl leading-tight sm:text-3xl">El contenido aparece con el orden natural de una conversación frente a la barra.</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {project.details.slice(0, 2).map((detail, index) => <div key={detail} className="border-b border-[#f5e4cf]/20 pb-4"><span className="text-[#d9ad7f]">0{index + 1}</span><p className="mt-2 text-lg font-semibold">{detail}</p></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="metodo" className="mx-auto max-w-[1480px] px-5 py-16 sm:px-8 sm:py-28 lg:px-12">
        <div data-scroll-reveal className="max-w-3xl"><p className="text-[10px] tracking-[0.2em] text-[#8a5a3b] uppercase">02 / Método</p><h2 className="mt-5 text-[clamp(3.4rem,6vw,6.8rem)] leading-[0.82] tracking-[-0.07em]">La preparación toma el centro.</h2></div>
        <div data-parallax-panel className="relative mt-10 min-h-[52svh] overflow-hidden rounded-[0.4rem_0.4rem_4rem_0.4rem] bg-[#25170f] sm:min-h-[72svh]">
          <div data-parallax-media className="absolute -inset-y-[12%] -inset-x-[5%]"><Image src={project.image} alt="Barista en preparación de café" fill sizes="100vw" className="object-cover object-[70%_center]" /></div>
          <div className="absolute right-5 bottom-5 left-5 grid gap-3 sm:right-8 sm:bottom-8 sm:left-auto sm:w-[27rem]">
            {project.services.map((item) => <article key={item.number} className="border border-white/15 bg-[#2b1b12]/88 p-4 text-[#f5e4cf] backdrop-blur-sm"><span className="text-[9px] tracking-[0.16em] text-[#d9ad7f] uppercase">{item.number}</span><h3 className="mt-2 text-xl font-semibold italic">{item.title}</h3><p className="mt-1 text-sm leading-relaxed text-[#f5e4cf]/70">{item.copy}</p></article>)}
          </div>
        </div>
      </section>

      <section id="visita" className="border-t border-[#302218]/20 px-5 py-16 sm:px-8 sm:py-28 lg:px-12">
        <div data-scroll-reveal className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-16">
          <span className="grid size-28 place-items-center rounded-full border border-[#302218] text-center text-[9px] tracking-[0.15em] uppercase">03<br />Visita</span>
          <div><h2 className="max-w-5xl text-[clamp(3.6rem,7vw,7.5rem)] leading-[0.8] tracking-[-0.075em]">{project.closingTitle}</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-[#302218]/70">{project.closingCopy}</p><Link href="/#contact" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#b75632] px-6 py-4 font-semibold text-[#fff7e8]">Quiero una web así <ArrowUpRight className="size-5" /></Link></div>
        </div>
        <div className="mx-auto mt-12 max-w-[1320px] border-t border-[#302218]/20 pt-5"><BackToProjects /></div>
      </section>
    </main>
  )
}

function LineaNorteLanding({ project }: { project: ConceptProject }) {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  useScrollAssembly(root, reducedMotion)

  return (
    <main ref={root} className="overflow-hidden bg-[#e7e3dc] text-[#242522] [font-family:var(--font-space-grotesk),Arial,sans-serif]">
      <ConceptNotice tone="linea" family="var(--font-space-grotesk), Arial, sans-serif" />
      <header className="border-b border-[#242522]"><div className="mx-auto grid h-20 max-w-[1480px] grid-cols-[1fr_auto] items-center px-5 sm:h-24 sm:px-8 lg:grid-cols-2 lg:px-12"><Link href="#inicio" className="text-xl font-semibold uppercase tracking-[-0.06em] sm:text-2xl">Línea-Norte</Link><div className="flex items-center justify-end gap-8 text-[10px] tracking-[0.18em] uppercase"><span className="hidden md:block">Arquitectura / Interiorismo / Dirección</span><Menu className="size-6" /></div></div></header>

      <section id="inicio" className="mx-auto grid max-w-[1480px] border-b border-[#242522] lg:grid-cols-[0.72fr_1.28fr]">
        <div className="flex min-h-[48svh] flex-col justify-between p-5 sm:p-8 lg:min-h-[calc(100svh-7rem)] lg:border-r lg:border-[#242522] lg:p-12"><div className="flex justify-between text-[9px] tracking-[0.2em] uppercase"><span>Estudio conceptual</span><span>UY / 01</span></div><h1 className="my-12 text-[clamp(4rem,7.5vw,8rem)] leading-[0.77] font-medium tracking-[-0.09em] uppercase">Espacios<br /><span className="text-[#9a5d3b]">pensados</span><br />desde el<br />lugar.</h1><p className="max-w-xs text-sm leading-relaxed text-[#242522]/62">Una página que deja que los materiales y el paisaje lleven el ritmo.</p></div>
        <div data-parallax-panel className="relative min-h-[30rem] overflow-hidden bg-[#242522] lg:min-h-0"><div data-parallax-media className="absolute -inset-y-[12%] -inset-x-[6%]"><Image src={project.image} alt={project.imageAlt} fill priority sizes="(max-width:1024px) 100vw, 65vw" className="object-cover grayscale" /></div><div className="absolute top-0 bottom-0 left-[23%] w-px bg-white/50" /><div className="absolute top-0 bottom-0 left-[68%] w-px bg-white/50" /><span className="absolute right-5 bottom-5 bg-[#e7e3dc] px-4 py-3 text-[9px] tracking-[0.2em] uppercase">Costa / Vivienda 01</span></div>
      </section>

      <section className="border-b border-[#242522]"><div className="mx-auto grid max-w-[1480px] sm:grid-cols-4">{project.details.map((detail, index) => <div key={detail} className="flex min-h-24 items-center justify-between border-b border-[#242522] px-5 text-[9px] tracking-[0.18em] uppercase last:border-b-0 sm:min-h-32 sm:border-r sm:border-b-0 sm:px-7 sm:last:border-r-0"><span className="text-[#9a5d3b]">0{index + 1}</span><span>{detail}</span></div>)}</div></section>

      <section className="mx-auto max-w-[1480px] px-5 py-16 sm:px-8 sm:py-28 lg:px-12"><div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr]"><div data-scroll-reveal className="lg:sticky lg:top-8 lg:self-start"><p className="text-[10px] tracking-[0.2em] text-[#9a5d3b] uppercase">Obras / Proceso</p><h2 className="mt-5 text-[clamp(3.5rem,5.8vw,6.7rem)] leading-[0.82] font-semibold tracking-[-0.08em]">La imagen crece con el lugar.</h2></div><div className="space-y-12 sm:space-y-20">{project.services.map((service, index) => <article key={service.number} data-scroll-reveal className={cn('grid gap-6 border-t border-[#242522] pt-5', index === 1 && 'lg:ml-[12%]', index === 2 && 'lg:mr-[10%]')}><div className="flex items-baseline justify-between text-[10px] tracking-[0.2em] uppercase"><span className="text-[#9a5d3b]">{service.number}</span><span>Plano / {String(index + 1).padStart(2, '0')}</span></div><div data-parallax-panel className={cn('relative overflow-hidden bg-[#242522]', index === 0 && 'aspect-[1.45]', index === 1 && 'aspect-[1.08]', index === 2 && 'aspect-[1.7]')}><div data-parallax-media className="absolute -inset-y-[14%] -inset-x-[8%]"><Image src={project.image} alt={`Vista conceptual para ${service.title}`} fill sizes="(max-width:1024px) 100vw, 62vw" className={cn('object-cover grayscale', index === 0 && 'object-[56%_center]', index === 1 && 'object-[26%_center]', index === 2 && 'object-[78%_center]')} /></div></div><div className="grid gap-3 sm:grid-cols-[minmax(0,0.65fr)_1fr]"><h3 className="text-3xl font-semibold tracking-[-0.055em] uppercase sm:text-4xl">{service.title}</h3><p className="leading-relaxed text-[#242522]/66">{service.copy}</p></div></article>)}</div></div></section>

      <section className="border-y border-[#242522] bg-[#242522] px-5 py-16 text-[#e7e3dc] sm:px-8 sm:py-24 lg:px-12"><div data-scroll-reveal className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="text-[10px] tracking-[0.2em] text-[#c88762] uppercase">Nueva obra</p><h2 className="mt-6 max-w-5xl text-[clamp(3.5rem,7vw,7.5rem)] leading-[0.8] font-semibold tracking-[-0.08em]">{project.closingTitle}</h2><p className="mt-6 max-w-xl leading-relaxed text-[#e7e3dc]/65">{project.closingCopy}</p></div><Link href="/#contact" className="flex min-h-14 items-center justify-between border border-[#e7e3dc] px-5 font-semibold lg:min-w-64">Quiero una web así <ArrowUpRight className="size-5" /></Link></div><div className="mx-auto mt-12 max-w-[1320px] border-t border-[#e7e3dc]/25 pt-5"><BackToProjects /></div></section>
    </main>
  )
}

function AuraDentalLanding({ project }: { project: ConceptProject }) {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  useScrollAssembly(root, reducedMotion)

  return (
    <main ref={root} className="overflow-hidden bg-[#edf2ec] text-[#17332f] [font-family:var(--font-nunito-sans),Arial,sans-serif]">
      <ConceptNotice tone="aura" family="var(--font-mazius-display), Georgia, serif" />
      <header className="relative z-20"><div className="mx-auto flex h-20 max-w-[1420px] items-center justify-between px-5 sm:h-24 sm:px-8 lg:px-12"><Link href="#inicio" className="flex items-center gap-3 text-xl font-semibold tracking-[-0.04em]"><span className="grid size-10 place-items-center rounded-full bg-[#5b8580] text-white"><Sparkles className="size-5" /></span>Aura Dental</Link><nav className="hidden gap-7 text-sm font-medium md:flex"><a href="#cuidado">El cuidado</a><a href="#tratamientos">Tratamientos</a><a href="#agenda">Agenda</a></nav><a href="#agenda" className="hidden min-h-11 items-center gap-2 rounded-full bg-[#17332f] px-5 text-sm font-semibold text-white sm:flex">Agendar <CalendarDays className="size-4" /></a><Menu className="sm:hidden" /></div></header>

      <section id="inicio" className="mx-auto grid max-w-[1420px] items-center gap-8 px-5 pt-8 pb-16 sm:px-8 sm:pt-12 sm:pb-24 lg:grid-cols-[0.84fr_1.16fr] lg:gap-16 lg:px-12"><div data-scroll-reveal><span className="inline-flex items-center gap-2 rounded-full bg-[#cbdcd7] px-4 py-2 text-xs font-semibold [font-family:var(--font-mazius-display),Georgia,serif]"><span className="size-2 rounded-full bg-[#5b8580]" /> Odontología cercana</span><h1 className="mt-7 max-w-3xl text-[clamp(4rem,8.8vw,8.5rem)] leading-[0.84] font-extrabold tracking-[-0.075em]">Cuidar tu sonrisa puede sentirse <span className="text-[#5b8580]">simple.</span></h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-[#17332f]/68">La información se ordena a medida que avanzás: sin ruido, sin sorpresas y a tu ritmo.</p><a href="#cuidado" className="mt-8 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#5b8580] px-6 font-semibold text-white">Conocé el recorrido <ArrowDown className="size-4" /></a></div>
        <div data-parallax-panel className="relative aspect-square overflow-hidden rounded-[50%_50%_44%_56%/43%_44%_56%_57%] bg-[#cbdcd7]"><div data-parallax-media className="absolute -inset-[12%]"><Image src={project.image} alt={project.imageAlt} fill priority sizes="(max-width:1024px) 100vw, 56vw" className="object-cover object-left" /></div><div className="absolute inset-0 border-[18px] border-[#edf2ec]/70" /><span className="absolute right-[8%] bottom-[12%] rounded-full bg-white px-4 py-3 text-sm font-semibold shadow-[0_20px_45px_rgba(23,51,47,0.15)]">Agenda online</span></div>
      </section>

      <section id="cuidado" className="relative bg-white/65 px-5 py-16 sm:px-8 sm:py-28 lg:px-12"><div className="absolute top-14 right-[8%] hidden size-40 rounded-full border border-[#5b8580]/20 lg:block" /><div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.72fr_1.28fr]"><div data-scroll-reveal><p className="text-[10px] tracking-[0.2em] text-[#5b8580] uppercase [font-family:var(--font-mazius-display),Georgia,serif]">Una experiencia clara</p><h2 className="mt-5 text-[clamp(3.4rem,6vw,6.8rem)] leading-[0.84] font-bold tracking-[-0.07em]">Todo acompaña una decisión tranquila.</h2></div><div className="border-l border-[#5b8580]/30 pl-6 sm:pl-10">{['Antes de la consulta', 'Durante el tratamiento', 'Después del cuidado'].map((step, index) => <article key={step} data-scroll-reveal className="relative border-b border-[#17332f]/12 py-7 last:border-b-0"><span className="absolute -left-[2.05rem] top-10 size-3 rounded-full border-2 border-white bg-[#5b8580] sm:-left-[2.58rem]" /><span className="text-[10px] text-[#5b8580] [font-family:var(--font-mazius-display),Georgia,serif]">0{index + 1}</span><h3 className="mt-2 text-2xl font-bold tracking-[-0.04em]">{step}</h3><p className="mt-2 max-w-xl leading-relaxed text-[#17332f]/64">{index === 0 ? 'Información simple para entender qué necesitás y cómo prepararte.' : index === 1 ? 'Tratamientos explicados con cercanía, en el orden que tiene sentido para vos.' : 'Indicaciones visibles y un canal directo para seguir acompañado.'}</p></article>)}</div></div></section>

      <section id="tratamientos" className="mx-auto max-w-[1420px] px-5 py-16 sm:px-8 sm:py-28 lg:px-12"><div data-scroll-reveal className="max-w-3xl"><p className="text-[10px] tracking-[0.2em] text-[#5b8580] uppercase [font-family:var(--font-mazius-display),Georgia,serif]">Tratamientos</p><h2 className="mt-5 text-[clamp(3.5rem,6.5vw,7rem)] leading-[0.84] font-bold tracking-[-0.07em]">Cada servicio aparece a su tiempo.</h2></div><div className="mt-12 space-y-10 sm:space-y-16">{project.services.map((service, index) => <article key={service.number} data-scroll-reveal className={cn('grid gap-6 lg:grid-cols-[0.42fr_0.58fr] lg:items-center', index === 1 && 'lg:pl-[12%]', index === 2 && 'lg:pr-[10%]')}><div data-parallax-panel className={cn('relative overflow-hidden bg-[#cbdcd7]', index === 0 && 'aspect-[1.3] rounded-[55%_45%_50%_50%/45%_55%_45%_55%]', index === 1 && 'aspect-[1.55] rounded-[42%_58%_50%_50%/58%_42%_58%_42%]', index === 2 && 'aspect-square rounded-[50%_50%_38%_62%/60%_44%_56%_40%]')}><div data-parallax-media className="absolute -inset-[12%]"><Image src={project.image} alt={`Atención dental conceptual: ${service.title}`} fill sizes="(max-width:1024px) 100vw, 44vw" className={cn('object-cover', index === 0 && 'object-[28%_center]', index === 1 && 'object-center', index === 2 && 'object-[70%_center]')} /></div></div><div><span className="grid size-12 place-items-center rounded-full border border-[#5b8580]/35 text-[#5b8580] [font-family:var(--font-mazius-display),Georgia,serif]">{service.number}</span><h3 className="mt-5 text-4xl font-bold tracking-[-0.055em]">{service.title}</h3><p className="mt-4 max-w-lg leading-relaxed text-[#17332f]/64">{service.copy}</p></div></article>)}</div></section>

      <section id="agenda" className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12"><div data-scroll-reveal className="mx-auto overflow-hidden rounded-[4rem_4rem_1.2rem_1.2rem] bg-[#17332f] px-6 py-14 text-white sm:px-12 sm:py-20 lg:max-w-[1320px] lg:px-16"><span className="grid size-12 place-items-center rounded-full bg-[#5b8580]"><CalendarDays className="size-5" /></span><h2 className="mt-8 max-w-5xl text-[clamp(3.5rem,7vw,7.5rem)] leading-[0.82] font-bold tracking-[-0.075em]">{project.closingTitle}</h2><p className="mt-6 max-w-xl leading-relaxed text-white/64">{project.closingCopy}</p><Link href="/#contact" className="mt-8 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#edf2ec] px-6 font-semibold text-[#17332f]">Quiero una web así <ArrowUpRight className="size-5" /></Link><div className="mt-12 border-t border-white/20 pt-5"><BackToProjects /></div></div></section>
    </main>
  )
}

export function ConceptLanding({ project }: { project: ConceptProject }) {
  if (project.slug === 'bruma-cafe') return <BrumaLanding project={project} />
  if (project.slug === 'linea-norte') return <LineaNorteLanding project={project} />
  return <AuraDentalLanding project={project} />
}

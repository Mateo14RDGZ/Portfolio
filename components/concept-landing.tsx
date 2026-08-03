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
    <div style={{ fontFamily: family }} className={cn('relative z-30 px-4 py-2.5 text-center text-[9px] tracking-[0.16em] uppercase', tone === 'bruma' && 'bg-[#291a12] text-[#f5e4cf]', tone === 'linea' && 'bg-[#161713] text-[#eeeae2]', tone === 'aura' && 'border-b border-[#17332f]/15 bg-[#cbdcd7] text-[#17332f]')}>
      Proyecto conceptual · Marca y contenido ficticios · <Link href="/proyectos" className="underline underline-offset-4">Volver a proyectos</Link>
    </div>
  )
}

function BackToProjects({ className }: { className?: string }) {
  return <Link href="/proyectos" className={cn('inline-flex min-h-11 items-center gap-2 font-semibold', className)}><ArrowLeft className="size-4" /> Proyectos MR14</Link>
}

/** Línea Norte is the only demo with a continuous GSAP scroll assembly. */
function useLineaAssembly(root: React.RefObject<HTMLElement | null>, reducedMotion: boolean | null) {
  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return

    const context = gsap.context(() => {
      const compact = window.matchMedia('(max-width: 767px)').matches
      const media = gsap.utils.toArray<HTMLElement>('[data-parallax-media]')
      const panels = gsap.utils.toArray<HTMLElement>('[data-parallax-panel]')
      const reveals = gsap.utils.toArray<HTMLElement>('[data-scroll-reveal]')

      media.forEach((element, index) => {
        const direction = index % 2 === 0 ? 1 : -1
        gsap.fromTo(element, { scale: compact ? 1.08 : 1.16, yPercent: compact ? -3 * direction : -8 * direction }, { scale: 1, yPercent: compact ? 3 * direction : 8 * direction, ease: 'none', scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: compact ? 0.45 : 0.8 } })
      })

      panels.forEach((panel) => {
        gsap.fromTo(panel, { clipPath: compact ? 'inset(9% 4% 9% 4%)' : 'inset(13% 8% 13% 8%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: panel, start: 'top 88%', end: 'center 48%', scrub: compact ? 0.45 : 0.7 } })
      })

      reveals.forEach((element) => {
        gsap.fromTo(element, { opacity: 0, y: compact ? 16 : 30, x: compact ? 0 : -14 }, { opacity: 1, y: 0, x: 0, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 84%', once: true } })
      })
    }, root)

    return () => context.revert()
  }, [reducedMotion, root])
}

function BrumaLanding({ project }: { project: ConceptProject }) {
  return (
    <main className="overflow-hidden bg-[#f4ead7] text-[#33231a] [font-family:var(--font-fraunces),Georgia,serif]">
      <ConceptNotice tone="bruma" family="var(--font-fraunces), Georgia, serif" />
      <header className="relative z-20 border-b border-[#33231a]/18 bg-[#f4ead7]"><div className="mx-auto flex h-20 max-w-[1360px] items-center justify-between px-5 sm:h-24 sm:px-8 lg:px-10"><Link href="#inicio" className="flex items-center gap-3 text-2xl font-semibold italic tracking-[-0.05em]"><span className="grid size-10 place-items-center rounded-full bg-[#a95634] text-[#fff8eb]"><Coffee className="size-5" /></span>Bruma Café</Link><nav className="hidden items-center gap-7 text-[10px] tracking-[0.15em] uppercase md:flex"><a href="#carta">La carta</a><a href="#ritual">El ritual</a><a href="#horarios">Horarios</a></nav><a href="#horarios" className="hidden min-h-11 items-center gap-2 border-b border-[#33231a] text-sm font-semibold sm:flex">Reservar mesa <ArrowUpRight className="size-4" /></a><Menu className="sm:hidden" aria-hidden="true" /></div></header>

      <section id="inicio" className="mx-auto max-w-[1360px] px-5 pt-7 pb-14 sm:px-8 sm:pt-10 sm:pb-20 lg:px-10"><div className="grid overflow-hidden border border-[#33231a]/18 lg:grid-cols-[0.9fr_1.1fr]"><div className="flex min-h-[31rem] flex-col justify-between p-6 sm:p-10 lg:min-h-[41rem] lg:p-12"><div><p className="text-[10px] tracking-[0.19em] uppercase">Café de especialidad · Ciudad Vieja</p><h1 className="mt-8 text-[clamp(4.1rem,7.2vw,7.7rem)] leading-[0.78] tracking-[-0.08em]">Para bajar un cambio.<em className="block font-light"> Y quedarte un rato.</em></h1></div><div className="max-w-md border-t border-[#33231a]/18 pt-5"><p className="text-lg leading-relaxed text-[#33231a]/72">Un sitio pensado como la barra de un café de barrio: cálido, directo y con ganas de que vuelvas.</p><a href="#carta" className="mt-7 inline-flex items-center gap-3 text-lg font-semibold italic">Ver lo que hay hoy <ArrowDown className="size-4" /></a></div></div><figure className="relative min-h-[25rem] overflow-hidden bg-[#322017] lg:min-h-0"><Image src="/concepts/bruma-cafe-editorial.png" alt="Café y medialuna en la barra de Bruma Café" fill priority sizes="(max-width:1024px) 100vw, 55vw" className="object-cover object-center" /><figcaption className="absolute right-5 bottom-5 left-5 flex items-end justify-between border-t border-white/35 pt-3 text-[#fff8eb]"><span className="text-xl italic">La mañana, servida.</span><span className="text-[9px] tracking-[0.15em] uppercase">08:30 — 18:00</span></figcaption></figure></div></section>

      <section id="carta" className="border-y border-[#33231a]/18 bg-[#d6b68c] py-14 sm:py-20"><div className="mx-auto max-w-[1160px] px-5 sm:px-8"><div className="flex flex-col gap-5 border-b border-[#33231a]/35 pb-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] tracking-[0.18em] uppercase">La carta de hoy</p><h2 className="mt-3 text-5xl tracking-[-0.06em] sm:text-7xl">Simple, bien hecho.</h2></div><p className="max-w-sm leading-relaxed text-[#33231a]/70">Lo necesario para empezar bien el día o cortarlo con algo rico a la tarde.</p></div><div className="mt-5 divide-y divide-[#33231a]/25">{project.services.map((item) => <article key={item.number} className="grid gap-3 py-5 sm:grid-cols-[5rem_1fr_auto] sm:items-center"><span className="text-[#8c4931]">{item.number}</span><div><h3 className="text-2xl font-semibold italic">{item.title}</h3><p className="mt-1 max-w-xl text-sm leading-relaxed text-[#33231a]/72">{item.copy}</p></div><span className="text-sm italic">Ver detalles →</span></article>)}</div></div></section>

      <section id="ritual" className="mx-auto grid max-w-[1360px] gap-8 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.55fr_1.45fr] lg:px-10"><div><p className="text-[10px] tracking-[0.18em] text-[#8c4931] uppercase">El ritual</p><h2 className="mt-4 text-5xl leading-[0.86] tracking-[-0.065em] sm:text-7xl">Una pausa que se siente local.</h2></div><div className="grid gap-px bg-[#33231a]/20 sm:grid-cols-2">{project.details.map((detail, index) => <div key={detail} className={cn('bg-[#f4ead7] p-6', index === 0 && 'sm:col-span-2')}><span className="text-[10px] tracking-[0.16em] text-[#a95634] uppercase">0{index + 1}</span><p className="mt-5 text-2xl font-semibold italic">{detail}</p><p className="mt-3 text-sm leading-relaxed text-[#33231a]/64">{index === 0 ? 'Encontrás lo importante sin recorrer una carta interminable.' : 'Información directa para decidir, llegar y quedarte tranquilo.'}</p></div>)}</div></section>

      <section id="horarios" className="bg-[#332017] px-5 py-16 text-[#fff8eb] sm:px-8 sm:py-24 lg:px-10"><div className="mx-auto grid max-w-[1160px] gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="text-[10px] tracking-[0.18em] text-[#d6b68c] uppercase">Visitanos</p><h2 className="mt-5 text-[clamp(3.8rem,7vw,7.5rem)] leading-[0.8] tracking-[-0.075em]">Tu mesa puede estar esperando.</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-[#fff8eb]/67">{project.closingCopy}</p></div><Link href="/#contact" className="inline-flex min-h-14 items-center justify-between gap-8 bg-[#a95634] px-6 font-semibold">Quiero una web así <ArrowUpRight className="size-5" /></Link></div><div className="mx-auto mt-12 max-w-[1160px] border-t border-white/20 pt-5"><BackToProjects /></div></section>
    </main>
  )
}

function LineaNorteLanding({ project }: { project: ConceptProject }) {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  useLineaAssembly(root, reducedMotion)

  return (
    <main ref={root} className="overflow-hidden bg-[#e7e3dc] text-[#242522] [font-family:var(--font-space-grotesk),Arial,sans-serif]">
      <ConceptNotice tone="linea" family="var(--font-space-grotesk), Arial, sans-serif" />
      <header data-scroll-reveal className="border-b border-[#242522]"><div className="mx-auto grid h-20 max-w-[1480px] grid-cols-[1fr_auto] items-center px-5 sm:h-24 sm:px-8 lg:grid-cols-2 lg:px-12"><Link href="#inicio" className="text-xl font-semibold uppercase tracking-[-0.06em] sm:text-2xl">Línea-Norte</Link><div className="flex items-center justify-end gap-8 text-[10px] tracking-[0.18em] uppercase"><span className="hidden md:block">Arquitectura / Interiorismo / Dirección</span><Menu className="size-6" /></div></div></header>
      <section id="inicio" className="mx-auto grid max-w-[1480px] border-b border-[#242522] lg:grid-cols-[0.72fr_1.28fr]"><div data-scroll-reveal className="flex min-h-[48svh] flex-col justify-between p-5 sm:p-8 lg:min-h-[calc(100svh-7rem)] lg:border-r lg:border-[#242522] lg:p-12"><div className="flex justify-between text-[9px] tracking-[0.2em] uppercase"><span>Estudio conceptual</span><span>UY / 01</span></div><h1 className="my-12 text-[clamp(4rem,7.5vw,8rem)] leading-[0.77] font-medium tracking-[-0.09em] uppercase">Espacios<br /><span className="text-[#9a5d3b]">pensados</span><br />desde el<br />lugar.</h1><p className="max-w-xs text-sm leading-relaxed text-[#242522]/62">Una página que deja que los materiales y el paisaje lleven el ritmo.</p></div><div data-parallax-panel className="relative min-h-[30rem] overflow-hidden bg-[#242522] lg:min-h-0"><div data-parallax-media className="absolute -inset-y-[12%] -inset-x-[6%]"><Image src={project.image} alt={project.imageAlt} fill priority sizes="(max-width:1024px) 100vw, 65vw" className="object-cover grayscale" /></div><div className="absolute top-0 bottom-0 left-[23%] w-px bg-white/50" /><div className="absolute top-0 bottom-0 left-[68%] w-px bg-white/50" /><span className="absolute right-5 bottom-5 bg-[#e7e3dc] px-4 py-3 text-[9px] tracking-[0.2em] uppercase">Costa / Vivienda 01</span></div></section>
      <section className="border-b border-[#242522]"><div data-scroll-reveal className="mx-auto grid max-w-[1480px] sm:grid-cols-4">{project.details.map((detail, index) => <div key={detail} className="flex min-h-24 items-center justify-between border-b border-[#242522] px-5 text-[9px] tracking-[0.18em] uppercase last:border-b-0 sm:min-h-32 sm:border-r sm:border-b-0 sm:px-7 sm:last:border-r-0"><span className="text-[#9a5d3b]">0{index + 1}</span><span>{detail}</span></div>)}</div></section>
      <section className="mx-auto max-w-[1480px] px-5 py-16 sm:px-8 sm:py-28 lg:px-12"><div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr]"><div data-scroll-reveal className="lg:sticky lg:top-8 lg:self-start"><p className="text-[10px] tracking-[0.2em] text-[#9a5d3b] uppercase">Obras / Proceso</p><h2 className="mt-5 text-[clamp(3.5rem,5.8vw,6.7rem)] leading-[0.82] font-semibold tracking-[-0.08em]">La imagen crece con el lugar.</h2></div><div className="space-y-12 sm:space-y-20">{project.services.map((service, index) => <article key={service.number} data-scroll-reveal className={cn('grid gap-6 border-t border-[#242522] pt-5', index === 1 && 'lg:ml-[12%]', index === 2 && 'lg:mr-[10%]')}><div className="flex items-baseline justify-between text-[10px] tracking-[0.2em] uppercase"><span className="text-[#9a5d3b]">{service.number}</span><span>Plano / {String(index + 1).padStart(2, '0')}</span></div><div data-parallax-panel className={cn('relative overflow-hidden bg-[#242522]', index === 0 && 'aspect-[1.45]', index === 1 && 'aspect-[1.08]', index === 2 && 'aspect-[1.7]')}><div data-parallax-media className="absolute -inset-y-[14%] -inset-x-[8%]"><Image src={project.image} alt={`Vista conceptual para ${service.title}`} fill sizes="(max-width:1024px) 100vw, 62vw" className={cn('object-cover grayscale', index === 0 && 'object-[56%_center]', index === 1 && 'object-[26%_center]', index === 2 && 'object-[78%_center]')} /></div></div><div className="grid gap-3 sm:grid-cols-[minmax(0,0.65fr)_1fr]"><h3 className="text-3xl font-semibold tracking-[-0.055em] uppercase sm:text-4xl">{service.title}</h3><p className="leading-relaxed text-[#242522]/66">{service.copy}</p></div></article>)}</div></div></section>
      <section className="border-y border-[#242522] bg-[#242522] px-5 py-16 text-[#e7e3dc] sm:px-8 sm:py-24 lg:px-12"><div data-scroll-reveal className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="text-[10px] tracking-[0.2em] text-[#c88762] uppercase">Nueva obra</p><h2 className="mt-6 max-w-5xl text-[clamp(3.5rem,7vw,7.5rem)] leading-[0.8] font-semibold tracking-[-0.08em]">{project.closingTitle}</h2><p className="mt-6 max-w-xl leading-relaxed text-[#e7e3dc]/65">{project.closingCopy}</p></div><Link href="/#contact" className="flex min-h-14 items-center justify-between border border-[#e7e3dc] px-5 font-semibold lg:min-w-64">Quiero una web así <ArrowUpRight className="size-5" /></Link></div><div className="mx-auto mt-12 max-w-[1320px] border-t border-[#e7e3dc]/25 pt-5"><BackToProjects /></div></section>
    </main>
  )
}

function AuraDentalLanding({ project }: { project: ConceptProject }) {
  const careSteps = ['Elegí un horario', 'Contanos qué necesitás', 'Seguimos tu tratamiento']
  return (
    <main className="overflow-hidden bg-[#f7faf7] text-[#17332f] [font-family:var(--font-nunito-sans),Arial,sans-serif]">
      <ConceptNotice tone="aura" family="var(--font-mazius-display), Georgia, serif" />
      <header className="border-b border-[#17332f]/12 bg-white"><div className="mx-auto flex h-20 max-w-[1260px] items-center justify-between px-5 sm:px-8 lg:h-24 lg:px-10"><Link href="#inicio" className="flex items-center gap-3 text-xl font-bold tracking-[-0.04em]"><span className="grid size-10 place-items-center rounded-xl bg-[#17332f] text-[#d9e7df]"><Sparkles className="size-5" /></span>Aura Dental</Link><nav className="hidden gap-7 text-sm font-semibold text-[#17332f]/70 md:flex"><a href="#recorrido">Cómo funciona</a><a href="#tratamientos">Atención</a><a href="#agenda">Agenda</a></nav><a href="#agenda" className="hidden min-h-11 items-center gap-2 rounded-lg bg-[#5b8580] px-5 text-sm font-bold text-white sm:flex">Agendar <CalendarDays className="size-4" /></a><Menu className="sm:hidden" /></div></header>

      <section id="inicio" className="mx-auto grid max-w-[1260px] gap-8 px-5 py-10 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10"><div><p className="text-[10px] font-bold tracking-[0.2em] text-[#5b8580] uppercase">Odontología con un plan claro</p><h1 className="mt-5 max-w-3xl text-[clamp(3.8rem,7vw,7rem)] leading-[0.86] font-extrabold tracking-[-0.075em]">Tu consulta, clara <span className="font-normal [font-family:var(--font-mazius-display),Georgia,serif]">desde el inicio.</span></h1><p className="mt-6 max-w-xl text-lg leading-relaxed text-[#17332f]/64">Una experiencia digital ordenada para que puedas agendar, entender el recorrido y tener tu información siempre a mano.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#agenda" className="inline-flex min-h-14 items-center gap-3 rounded-lg bg-[#17332f] px-6 font-bold text-white">Agendar consulta <ArrowDown className="size-4" /></a><a href="#recorrido" className="inline-flex min-h-14 items-center rounded-lg border border-[#17332f]/20 px-6 font-bold">Ver cómo funciona</a></div></div><div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr] lg:grid-cols-1"><figure className="relative min-h-[20rem] overflow-hidden rounded-2xl bg-[#cbdcd7] sm:min-h-[27rem]"><Image src={project.image} alt={project.imageAlt} fill priority sizes="(max-width:1024px) 100vw, 48vw" className="object-cover object-left" /><figcaption className="absolute right-4 bottom-4 left-4 rounded-xl bg-white/92 p-4 shadow-[0_18px_45px_rgba(23,51,47,0.14)]"><p className="text-xs font-bold text-[#5b8580]">PRÓXIMO PASO</p><p className="mt-1 font-bold">Elegí tu horario en menos de un minuto.</p></figcaption></figure><div className="grid grid-cols-2 gap-3"><div className="rounded-xl border border-[#17332f]/12 bg-white p-4"><span className="text-[10px] font-bold tracking-[0.16em] text-[#5b8580]">ATENCIÓN</span><p className="mt-3 text-lg font-extrabold">Información clara</p></div><div className="rounded-xl bg-[#d9e7df] p-4"><span className="text-[10px] font-bold tracking-[0.16em] text-[#5b8580]">SEGUIMIENTO</span><p className="mt-3 text-lg font-extrabold">A tu ritmo</p></div></div></div></section>

      <section id="recorrido" className="border-y border-[#17332f]/12 bg-[#d9e7df] px-5 py-16 sm:px-8 sm:py-24 lg:px-10"><div className="mx-auto max-w-[1260px]"><div className="grid gap-7 border-b border-[#17332f]/15 pb-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end"><div><p className="text-[10px] font-bold tracking-[0.2em] text-[#5b8580] uppercase">El recorrido</p><h2 className="mt-4 text-[clamp(3rem,5.5vw,5.8rem)] leading-[0.87] font-extrabold tracking-[-0.07em]">Saber qué sigue baja la ansiedad.</h2></div><p className="max-w-xl text-lg leading-relaxed text-[#17332f]/65">La web organiza lo esencial en una secuencia fácil de consultar, antes, durante y después de cada instancia.</p></div><ol className="mt-8 grid gap-3 lg:grid-cols-3">{careSteps.map((step, index) => <li key={step} className="group rounded-xl border border-[#17332f]/14 bg-[#f7faf7] p-5 transition-colors duration-300 hover:border-[#5b8580] hover:bg-white"><div className="flex items-center justify-between"><span className="grid size-9 place-items-center rounded-lg bg-[#17332f] text-xs font-bold text-white">0{index + 1}</span><span className="text-[10px] font-bold tracking-[0.15em] text-[#5b8580]">PASO</span></div><h3 className="mt-12 text-2xl font-extrabold tracking-[-0.045em]">{step}</h3><p className="mt-3 leading-relaxed text-[#17332f]/63">{index === 0 ? 'Un acceso visible y simple para encontrar el momento que te sirva.' : index === 1 ? 'Datos útiles para que la atención empiece con mejor contexto.' : 'Indicaciones y novedades disponibles cuando las necesitás.'}</p></li>)}</ol></div></section>

      <section id="tratamientos" className="mx-auto max-w-[1260px] px-5 py-16 sm:px-8 sm:py-24 lg:px-10"><div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-bold tracking-[0.2em] text-[#5b8580] uppercase">Atención diseñada para personas</p><h2 className="mt-4 max-w-3xl text-[clamp(3.1rem,5.7vw,6rem)] leading-[0.87] font-extrabold tracking-[-0.07em]">Una clínica que también se siente ordenada online.</h2></div><span className="rounded-full border border-[#17332f]/15 px-4 py-2 text-xs font-bold">Agenda · Información · Seguimiento</span></div><div className="mt-10 divide-y divide-[#17332f]/14 border-y border-[#17332f]/14">{project.services.map((service, index) => <article key={service.number} className="grid gap-4 py-7 sm:grid-cols-[5rem_0.8fr_1.2fr] sm:items-center"><span className="font-bold text-[#5b8580]">{service.number}</span><h3 className="text-2xl font-extrabold tracking-[-0.045em]">{service.title}</h3><p className="leading-relaxed text-[#17332f]/63">{service.copy}</p><span className="hidden text-right text-sm font-bold text-[#5b8580] sm:block">0{index + 1} / atención</span></article>)}</div></section>

      <section id="agenda" className="bg-[#17332f] px-5 py-16 text-white sm:px-8 sm:py-24 lg:px-10"><div className="mx-auto grid max-w-[1260px] gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end"><div><span className="grid size-12 place-items-center rounded-xl bg-[#5b8580]"><CalendarDays className="size-5" /></span><p className="mt-8 text-[10px] font-bold tracking-[0.2em] text-[#a8c9bc] uppercase">Agenda online</p><h2 className="mt-4 max-w-4xl text-[clamp(3.5rem,6.5vw,6.8rem)] leading-[0.84] font-extrabold tracking-[-0.075em]">Tu tiempo también merece una atención clara.</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">{project.closingCopy}</p></div><div className="rounded-2xl bg-white p-5 text-[#17332f] shadow-[0_25px_60px_rgba(0,0,0,0.22)]"><p className="text-[10px] font-bold tracking-[0.16em] text-[#5b8580]">RESERVAS</p><p className="mt-3 text-2xl font-extrabold tracking-[-0.045em]">Empezá por una conversación.</p><Link href="/#contact" className="mt-6 flex min-h-14 items-center justify-between rounded-lg bg-[#d9e7df] px-5 font-bold">Quiero una web así <ArrowUpRight className="size-5" /></Link></div></div><div className="mx-auto mt-12 max-w-[1260px] border-t border-white/20 pt-5"><BackToProjects /></div></section>
    </main>
  )
}

export function ConceptLanding({ project }: { project: ConceptProject }) {
  if (project.slug === 'bruma-cafe') return <BrumaLanding project={project} />
  if (project.slug === 'linea-norte') return <LineaNorteLanding project={project} />
  return <AuraDentalLanding project={project} />
}

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
    <div className={cn('relative z-50 px-4 py-2.5 text-center font-mono text-[9px] tracking-[0.14em] uppercase', dark ? 'bg-[#161713] text-[#eeeae2]' : 'bg-[#291532] text-[#eef2df]')}>
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

function BrumaLanding({ project }: { project: ConceptProject }) {
  const reduceMotion = useReducedMotion()
  const [activeStep, setActiveStep] = useState(0)
  const stepRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (current) setActiveStep(Number((current.target as HTMLElement).dataset.step))
    }, { rootMargin: '-30% 0px -42% 0px', threshold: [0.2, 0.45, 0.7] })
    stepRefs.current.forEach((node) => node && observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const positions = ['72% 48%', '88% 43%', '56% 68%']

  return (
    <main className="min-h-screen bg-[#f1e3ca] text-[#302218] [font-family:var(--font-fraunces),Georgia,serif]">
      <ConceptNotice />
      <header className="border-b border-[#302218]/25">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:h-24 sm:px-8 lg:px-12">
          <Link href="#inicio" className="flex items-center gap-3 text-2xl font-semibold italic tracking-[-0.045em]"><span className="grid size-10 place-items-center rounded-full bg-[#b75632] text-[#fff7e8]"><Coffee className="size-5" /></span>Bruma Café</Link>
          <nav className="hidden gap-8 font-mono text-[10px] tracking-[0.14em] uppercase md:flex"><a href="#relato">La experiencia</a><a href="#carta">La carta</a><a href="#visitanos">Visitanos</a></nav>
          <a href="#visitanos" className="hidden min-h-11 items-center gap-2 rounded-full bg-[#302218] px-5 text-sm font-semibold text-[#f1e3ca] sm:flex">Reservar <ArrowUpRight className="size-4" /></a>
          <Menu className="sm:hidden" aria-hidden="true" />
        </div>
      </header>

      <section id="inicio" className="relative min-h-[calc(100svh-7rem)] overflow-hidden">
        <Image src={project.image} alt={project.imageAlt} fill priority sizes="100vw" className="object-cover object-[68%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#24170e]/85 via-[#24170e]/25 to-transparent" />
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} className="relative mx-auto flex min-h-[calc(100svh-7rem)] max-w-[1440px] flex-col justify-between px-5 py-8 text-[#fff7e8] sm:px-8 sm:py-12 lg:px-12">
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase">Café de especialidad · Montevideo</p>
          <div className="max-w-4xl py-20">
            <p className="mb-5 text-lg italic text-[#e9c9a5]">Una pausa que empieza antes de llegar.</p>
            <h1 className="text-[clamp(4.1rem,11vw,10rem)] leading-[0.78] font-normal tracking-[-0.07em] text-balance">Café de origen, <em className="font-light">preparado sin apuro.</em></h1>
          </div>
          <a href="#relato" className="flex items-center gap-3 font-mono text-[10px] tracking-[0.16em] uppercase">Seguí la historia <ArrowDown className="size-4 animate-bounce motion-reduce:animate-none" /></a>
        </motion.div>
      </section>

      <section id="relato" className="bg-[#2b1c13] text-[#fff7e8]">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:px-12">
          <div className="py-10 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:py-12">
            <div className="w-full">
              <div className="mb-4 flex items-center justify-between font-mono text-[9px] tracking-[0.14em] uppercase text-[#d9ad7f]"><span>Del grano a la mesa</span><span>0{activeStep + 1} / 03</span></div>
              <motion.figure className="relative aspect-[0.92] overflow-hidden rounded-[3rem_0.6rem_3rem_0.6rem] sm:aspect-[1.25] lg:aspect-[1.1]" animate={reduceMotion ? undefined : { scale: [0.995, 1] }} transition={{ duration: 0.7, ease: EASE }}>
                <Image src={project.image} alt="Detalle narrativo de la preparación de café filtrado" fill sizes="(max-width:1024px) 100vw, 58vw" className="object-cover transition-[object-position,transform] duration-700 ease-out" style={{ objectPosition: positions[activeStep], transform: `scale(${1 + activeStep * 0.035})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2b1c13]/60 to-transparent" />
                <motion.div className="absolute right-5 bottom-5 left-5 h-1 overflow-hidden rounded-full bg-white/20"><motion.div className="h-full origin-left bg-[#d36b43]" animate={{ scaleX: (activeStep + 1) / 3 }} transition={{ duration: 0.55, ease: EASE }} /></motion.div>
              </motion.figure>
            </div>
          </div>
          <div id="carta" className="pb-12 lg:py-[18vh]">
            {project.services.map((service, index) => (
              <motion.article key={service.number} ref={(node) => { stepRefs.current[index] = node }} data-step={index} initial={reduceMotion ? false : { opacity: 0.35 }} whileInView={{ opacity: 1 }} viewport={{ amount: 0.55 }} className="flex min-h-[62svh] flex-col justify-center border-t border-[#fff7e8]/20 py-14 first:border-0">
                <span className="font-mono text-[10px] tracking-[0.16em] text-[#d36b43] uppercase">Capítulo {service.number}</span>
                <h2 className="mt-6 text-5xl leading-[0.88] font-normal tracking-[-0.045em] sm:text-7xl"><em>{service.title}</em></h2>
                <p className="mt-6 max-w-xl text-xl leading-relaxed text-[#fff7e8]/68">{service.copy}</p>
                <div className="mt-9 flex flex-wrap gap-2">{project.details.slice(index, index + 2).map((detail) => <span key={detail} className="rounded-full border border-[#fff7e8]/25 px-4 py-2 font-mono text-[9px] tracking-[0.12em] uppercase">{detail}</span>)}</div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="visitanos" className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1344px] gap-10 border-y border-[#302218] py-10 sm:py-16 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
          <div className="grid size-32 place-items-center rounded-full border border-[#302218] text-center font-mono text-[9px] tracking-[0.13em] uppercase sm:size-44"><Clock3 className="size-7 text-[#b75632]" /><span>Una pausa<br />bien hecha</span></div>
          <div><h2 className="max-w-5xl text-5xl leading-[0.86] font-normal tracking-[-0.055em] sm:text-8xl">Tu mesa puede estar <em>esperando.</em></h2><p className="mt-6 max-w-xl text-lg leading-relaxed opacity-70">Consultá horarios, encontranos y reservá antes de venir.</p><Link href="/#contact" className="group mt-8 inline-flex items-center gap-5 border-b border-[#302218] pb-2 text-xl font-semibold italic">Quiero una experiencia así <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link></div>
        </div>
        <div className="mx-auto mt-8 flex max-w-[1344px] justify-between gap-5 border-t border-[#302218]/25 pt-6 text-sm"><BackToProjects /><span className="hidden font-mono text-[9px] tracking-[0.13em] uppercase opacity-55 sm:block">Demo conceptual por MR14</span></div>
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
          <Link href="#inicio" className="text-xl font-semibold tracking-[-0.05em] uppercase sm:text-2xl">Línea—Norte</Link>
          <div className="flex items-center gap-7 lg:justify-between"><span className="hidden font-mono text-[9px] tracking-[0.16em] uppercase md:block">Arquitectura / Interiorismo / Dirección</span><Menu className="size-6" /></div>
        </div>
      </header>

      <section id="inicio" className="border-b border-[#242522]">
        <div className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-[1440px] lg:grid-cols-[0.78fr_1.22fr]">
          <motion.div initial={reduceMotion ? false : { opacity: 0, x: -35 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: EASE }} className="flex flex-col justify-between border-[#242522] p-5 sm:p-8 lg:border-r lg:p-12">
            <div className="flex justify-between font-mono text-[9px] tracking-[0.16em] uppercase"><span>Estudio conceptual</span><span>UY / 01</span></div>
            <h1 className="my-16 text-[clamp(3.8rem,7.4vw,8rem)] leading-[0.79] font-medium tracking-[-0.085em] uppercase">Espacios<br /><span className="text-[#9a5d3b]">pensados</span><br />desde el<br />lugar.</h1>
            <p className="max-w-sm text-sm leading-relaxed opacity-60">Arquitectura, interiorismo y dirección reunidos bajo una misma línea de trabajo.</p>
          </motion.div>
          <motion.div initial={reduceMotion ? false : { clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ duration: 1.05, delay: 0.15, ease: EASE }} className="relative min-h-[28rem] overflow-hidden lg:min-h-0">
            <Image src={project.image} alt={project.imageAlt} fill priority sizes="(max-width:1024px) 100vw, 61vw" className="object-cover" />
            <div className="absolute top-0 bottom-0 left-[18%] w-px bg-white/50" /><div className="absolute top-0 bottom-0 left-[64%] w-px bg-white/50" />
            <span className="absolute right-5 bottom-5 bg-[#e7e3dc] px-4 py-3 font-mono text-[9px] tracking-[0.14em] uppercase">Costa / Vivienda 01</span>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#242522]">
        <div className="mx-auto grid max-w-[1440px] sm:grid-cols-4">
          {project.details.map((detail, index) => <div key={detail} className="flex min-h-24 items-center justify-between border-b border-[#242522] px-5 py-5 font-mono text-[9px] tracking-[0.14em] uppercase last:border-b-0 sm:min-h-32 sm:border-r sm:border-b-0 sm:px-6 sm:last:border-r-0"><span className="text-[#9a5d3b]">0{index + 1}</span><span>{detail}</span></div>)}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-8 lg:self-start"><p className="font-mono text-[9px] tracking-[0.16em] text-[#9a5d3b] uppercase">Una práctica integrada</p><h2 className="mt-5 text-5xl leading-[0.88] font-semibold tracking-[-0.065em] sm:text-7xl">Una línea clara, de la idea a la obra.</h2></div>
          <div className="border-t border-[#242522]">
            {project.services.map((service) => <motion.article key={service.number} initial={reduceMotion ? false : { x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: '-12%' }} transition={{ duration: 0.65, ease: EASE }} className="group grid gap-5 border-b border-[#242522] py-8 sm:grid-cols-[5rem_1fr_auto] sm:items-center sm:py-11"><span className="font-mono text-[10px] text-[#9a5d3b]">{service.number}</span><div><h3 className="text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">{service.title}</h3><p className="mt-3 max-w-xl leading-relaxed opacity-60">{service.copy}</p></div><ArrowRight className="hidden size-7 transition-transform duration-300 group-hover:translate-x-2 sm:block" /></motion.article>)}
          </div>
        </div>
      </section>

      <section className="grid min-h-[70svh] border-y border-[#242522] lg:grid-cols-2">
        <div className="relative min-h-[24rem] overflow-hidden border-b border-[#242522] lg:border-r lg:border-b-0"><Image src={project.image} alt="Detalle material de una residencia conceptual" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover object-left grayscale transition duration-700 hover:grayscale-0" /></div>
        <div className="flex flex-col justify-between p-6 sm:p-12 lg:p-16"><span className="font-mono text-[9px] tracking-[0.16em] uppercase">Principio 01</span><blockquote className="my-16 text-4xl leading-[0.94] font-medium tracking-[-0.05em] sm:text-6xl">“La arquitectura empieza cuando el lugar deja de ser fondo y pasa a tomar decisiones.”</blockquote><span className="font-mono text-[9px] tracking-[0.16em] uppercase opacity-55">Material / Luz / Tiempo</span></div>
      </section>

      <section className="bg-[#242522] px-5 py-16 text-[#e7e3dc] sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1344px] gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="font-mono text-[9px] tracking-[0.16em] text-[#c88762] uppercase">Nueva obra</p><h2 className="mt-6 max-w-5xl text-5xl leading-[0.84] font-semibold tracking-[-0.075em] sm:text-8xl">Construyamos desde una idea clara.</h2></div><Link href="/#contact" className="flex min-h-14 w-full items-center justify-between border border-[#e7e3dc] px-5 font-semibold lg:w-auto lg:min-w-64">Quiero una web así <ArrowUpRight className="size-5" /></Link></div>
        <div className="mx-auto mt-14 flex max-w-[1344px] items-center justify-between border-t border-[#e7e3dc]/25 pt-6"><BackToProjects /><span className="font-mono text-[9px] tracking-[0.13em] uppercase opacity-50">LN / 2026</span></div>
      </section>
    </main>
  )
}

function AuraDentalLanding({ project }: { project: ConceptProject }) {
  const reduceMotion = useReducedMotion()
  const benefits = [
    { icon: ShieldCheck, title: 'Información clara', copy: 'Sabés qué se va a hacer y por qué antes de empezar.' },
    { icon: CalendarDays, title: 'Agenda sencilla', copy: 'Elegís el momento que mejor se adapta a tu semana.' },
    { icon: Sparkles, title: 'Resultados naturales', copy: 'Tratamientos pensados para cuidar función y estética.' },
  ]
  return (
    <main className="min-h-screen overflow-hidden bg-[#edf2ec] text-[#17332f] [font-family:var(--font-nunito-sans),Arial,sans-serif]">
      <ConceptNotice />
      <header className="relative z-20">
        <div className="mx-auto flex h-20 max-w-[1380px] items-center justify-between px-5 sm:h-24 sm:px-8">
          <Link href="#inicio" className="flex items-center gap-3 text-xl font-semibold tracking-[-0.04em]"><span className="grid size-10 place-items-center rounded-full bg-[#5b8580] text-white"><Sparkles className="size-5" /></span>Aura Dental</Link>
          <nav className="hidden items-center gap-7 text-sm font-medium md:flex"><a href="#tratamientos">Tratamientos</a><a href="#experiencia">Cómo te cuidamos</a><a href="#agenda">Agenda</a></nav>
          <a href="#agenda" className="hidden min-h-11 items-center gap-2 rounded-full bg-[#17332f] px-5 text-sm font-semibold text-white sm:flex">Agendar <CalendarDays className="size-4" /></a><Menu className="sm:hidden" />
        </div>
      </header>

      <section id="inicio" className="mx-auto max-w-[1380px] px-5 pt-4 pb-14 sm:px-8 sm:pt-8 sm:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: EASE }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#cbdcd7] px-4 py-2 text-xs font-semibold"><span className="size-2 rounded-full bg-[#5b8580]" /> Odontología cercana</span>
            <h1 className="mt-7 text-[clamp(4rem,9vw,8.5rem)] leading-[0.85] font-extrabold tracking-[-0.065em] text-balance">Cuidar tu sonrisa puede sentirse <span className="text-[#5b8580]">simple.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#17332f]/68">Un espacio pensado para explicar cada paso, escuchar lo que necesitás y acompañarte con tranquilidad.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#agenda" className="flex min-h-14 items-center justify-between rounded-full bg-[#5b8580] px-6 font-semibold text-white sm:min-w-52">Agendar consulta <ArrowUpRight className="size-5" /></a><a href="#tratamientos" className="flex min-h-14 items-center justify-between rounded-full border border-[#17332f]/30 px-6 font-semibold sm:min-w-52">Ver tratamientos <ChevronRight className="size-5" /></a></div>
          </motion.div>
          <div className="relative mx-auto aspect-square w-full max-w-[42rem]">
            <motion.div aria-hidden="true" className="absolute inset-[3%] rounded-full border border-[#5b8580]/35" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}><span className="absolute top-[8%] right-[12%] size-4 rounded-full bg-[#5b8580]" /></motion.div>
            <motion.div aria-hidden="true" className="absolute inset-[10%] rounded-full border border-dashed border-[#17332f]/20" animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 36, repeat: Infinity, ease: 'linear' }} />
            <div className="absolute inset-[16%] overflow-hidden rounded-[44%_56%_48%_52%/54%_44%_56%_46%] shadow-[0_30px_80px_rgba(23,51,47,0.18)]"><Image src={project.image} alt={project.imageAlt} fill priority sizes="(max-width:1024px) 86vw, 42vw" className="object-cover object-left" /></div>
            <motion.span animate={reduceMotion ? undefined : { y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: EASE }} className="absolute right-[2%] bottom-[18%] rounded-[1.25rem_0.35rem_1.25rem_0.35rem] bg-white p-4 shadow-xl"><span className="block font-mono text-[8px] tracking-[0.13em] uppercase opacity-50">Próxima hora</span><span className="mt-1 block font-semibold">Agenda online</span></motion.span>
          </div>
        </div>
      </section>

      <section id="tratamientos" className="bg-white/65 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1320px]"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono text-[9px] tracking-[0.16em] text-[#5b8580] uppercase">Tratamientos</p><h2 className="mt-4 text-5xl leading-[0.9] font-semibold tracking-[-0.06em] sm:text-7xl">Elegí con información.</h2></div><p className="max-w-md leading-relaxed text-[#17332f]/62">Cada tratamiento se presenta con un objetivo claro, sin tecnicismos innecesarios.</p></div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">{project.services.map((service, index) => <motion.article key={service.number} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }} className={cn('group flex min-h-[22rem] flex-col justify-between rounded-[2.5rem_0.65rem_2.5rem_0.65rem] p-6 transition-colors duration-500 sm:p-8', index === 1 ? 'bg-[#5b8580] text-white' : 'border border-[#17332f]/18 bg-[#edf2ec] hover:bg-[#cbdcd7]')}><div className="flex items-center justify-between"><span className="font-mono text-[10px]">{service.number}</span><span className="grid size-11 place-items-center rounded-full border border-current/25"><ArrowUpRight className="size-4" /></span></div><div><h3 className="text-3xl font-semibold tracking-[-0.045em]">{service.title}</h3><p className="mt-4 leading-relaxed opacity-68">{service.copy}</p></div></motion.article>)}</div>
        </div>
      </section>

      <section id="experiencia" className="px-5 py-16 sm:px-8 sm:py-24"><div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20"><div><p className="font-mono text-[9px] tracking-[0.16em] text-[#5b8580] uppercase">Tu experiencia</p><h2 className="mt-4 text-5xl leading-[0.9] font-semibold tracking-[-0.06em] sm:text-7xl">Todo claro desde el principio.</h2></div><div className="grid gap-3">{benefits.map((benefit, index) => <motion.article key={benefit.title} initial={reduceMotion ? false : { x: 22, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.09, ease: EASE }} className="grid gap-5 rounded-[1.75rem_0.45rem_1.75rem_0.45rem] border border-[#17332f]/18 bg-white/45 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6"><span className="grid size-12 place-items-center rounded-full bg-[#cbdcd7]"><benefit.icon className="size-5" /></span><div><h3 className="text-xl font-semibold">{benefit.title}</h3><p className="mt-1 text-sm leading-relaxed opacity-62">{benefit.copy}</p></div><span className="font-mono text-[9px] text-[#5b8580]">0{index + 1}</span></motion.article>)}</div></div></section>

      <section id="agenda" className="px-5 pb-16 sm:px-8 sm:pb-24"><div className="mx-auto overflow-hidden rounded-[3rem_0.75rem_3rem_0.75rem] bg-[#17332f] p-6 text-white sm:p-12 lg:p-16"><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><span className="grid size-12 place-items-center rounded-full bg-[#5b8580]"><CalendarDays className="size-5" /></span><h2 className="mt-8 max-w-4xl text-5xl leading-[0.86] font-semibold tracking-[-0.07em] sm:text-8xl">Tu próxima consulta, sin vueltas.</h2><p className="mt-6 max-w-xl leading-relaxed text-white/65">Elegí un horario y contanos brevemente qué necesitás.</p></div><Link href="/#contact" className="flex min-h-14 w-full items-center justify-between rounded-full bg-[#edf2ec] px-6 font-semibold text-[#17332f] lg:w-auto lg:min-w-64">Quiero una web así <ArrowUpRight className="size-5" /></Link></div><div className="mt-14 flex items-center justify-between border-t border-white/20 pt-6"><BackToProjects /><span className="hidden font-mono text-[9px] tracking-[0.13em] uppercase text-white/45 sm:block">Aura / Demo MR14</span></div></div></section>
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

'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  MoveRight,
  Play,
  Sparkles,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import type { ConceptProject } from '@/lib/project-data'
import { ConceptNotice } from '@/components/case-studies/shared/concept-notice'
import { ProjectBack } from '@/components/case-studies/shared/project-back'
import { cn } from '@/lib/utils'

const easing = [0.16, 1, 0.3, 1] as const

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.62, delay, ease: easing }}
    >
      {children}
    </motion.div>
  )
}

function CimbraLanding() {
  const tiles = [
    { title: 'Movimiento con intención', copy: 'Clases de reformer, fuerza y movilidad en grupos reducidos.', className: 'md:col-span-2 bg-[#f2f4ef]' },
    { title: '50 min', copy: 'Cada clase tiene un ritmo claro.', className: 'bg-[#c9dcff]' },
    { title: 'Reservá tu lugar', copy: 'Una agenda simple para sostener tu rutina.', className: 'bg-[#1b3a9b] text-white' },
    { title: 'Reformer', copy: 'Precisión, fuerza y control.', className: 'bg-[#e7e1d2]' },
    { title: 'Fuerza funcional', copy: 'Trabajo progresivo que acompaña tu cuerpo.', className: 'md:col-span-2 bg-[#d9eeea]' },
    { title: 'Movilidad', copy: 'Un espacio para recuperar amplitud y energía.', className: 'bg-[#f8b89f]' },
    { title: '8 años', copy: 'Formando parte del barrio.', className: 'bg-[#c9dcff]' },
    { title: '1.200+', copy: 'Clases dictadas por mes.', className: 'md:col-span-2 bg-[#e7e1d2]' },
    { title: '12', copy: 'Instructores certificados.', className: 'bg-[#1b3a9b] text-white' },
  ]
  const plans = [
    { name: 'Clase suelta', price: '$ 890', copy: 'Para probar sin compromiso.', featured: false },
    { name: 'Plan 8 clases', price: '$ 5.900', copy: 'Una clase por semana, con vigencia de 45 días.', featured: true },
    { name: 'Ilimitado', price: '$ 8.900', copy: 'Todas las clases que quieras sostener tu ritmo.', featured: false },
  ]
  const faqs = [
    ['¿Necesito experiencia previa?', 'No. Cada clase se adapta a tu nivel y el instructor ajusta la carga de trabajo desde el primer día.'],
    ['¿Qué me tengo que llevar?', 'Ropa cómoda y medias con antideslizante. El resto del equipo lo ponemos nosotros.'],
    ['¿Puedo cancelar una clase reservada?', 'Sí, hasta 6 horas antes sin cargo. Después de ese horario se descuenta del paquete.'],
  ]
  return (
    <main className="min-h-screen overflow-x-clip bg-[#f8f9f6] text-[#14212e] [font-family:var(--font-nunito-sans),Arial,sans-serif]">
      <ConceptNotice className="bg-[#14212e] text-[#e9f2ff]" />
      <header className="border-b border-[#14212e]/12 bg-[#f8f9f6]"><div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-10"><Link href="#inicio" className="text-xl font-extrabold tracking-[-.06em]">cimbra<span className="text-[#2364e6]">.</span></Link><nav className="hidden gap-7 text-sm font-bold md:flex"><a href="#clases">Clases</a><a href="#estudio">El estudio</a><a href="#agenda">Agenda</a></nav><a href="#agenda" className="rounded-xl bg-[#14212e] px-4 py-2 text-sm font-bold text-white">Reservar</a></div></header>
      <section id="inicio" className="mx-auto grid grid-cols-1 max-w-[1320px] gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:px-10 lg:py-12"><Reveal className="flex min-h-[430px] flex-col justify-between rounded-[2rem] bg-[#2364e6] p-7 text-white sm:p-10"><div className="flex items-center justify-between text-xs font-bold uppercase tracking-[.14em]"><span>Cimbra Estudio de Movimiento</span><MoveRight className="size-5" /></div><div><h1 className="max-w-lg text-[clamp(3.8rem,6.8vw,7.2rem)] leading-[.82] font-black tracking-[-.09em]">Tu cuerpo sabe el camino.</h1><p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">Un estudio para entrenar con atención, construir fuerza y volver a moverte bien.</p></div><a href="#clases" className="inline-flex min-h-12 w-fit items-center gap-3 rounded-xl bg-white px-5 text-sm font-extrabold text-[#14212e]">Ver clases <ArrowUpRight className="size-4" /></a></Reveal><Reveal delay={.08} className="relative min-h-[430px] overflow-hidden rounded-[2rem] bg-[#d9eeea]"><Image src="/concepts/cimbra-hero.webp" alt="Estudio de Pilates contemporáneo de Cimbra" fill priority sizes="(max-width:1023px) 100vw, 60vw" className="object-cover" /><div className="absolute right-4 bottom-4 rounded-2xl bg-[#f8f9f6]/92 px-4 py-3 text-sm font-extrabold text-[#14212e] backdrop-blur-sm">Cuerpo en movimiento.</div></Reveal></section>
      <section id="clases" className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 sm:py-24 lg:px-10"><Reveal><h2 className="max-w-2xl text-[clamp(3.1rem,5.7vw,6.2rem)] leading-[.84] font-black tracking-[-.08em]">Todo lo que necesitás para sostener una práctica.</h2></Reveal><div className="mt-9 grid grid-cols-1 auto-rows-[170px] gap-4 sm:grid-cols-2 md:auto-rows-[190px] lg:grid-cols-4">{tiles.map((tile, index) => <Reveal key={tile.title} delay={index * .035} className={cn('group rounded-[1.6rem] p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6', tile.className)}><article className="flex h-full flex-col justify-between"><span className="grid size-9 place-items-center rounded-xl border border-current/15 text-xs font-black">0{index + 1}</span><div><h3 className="text-2xl font-black tracking-[-.055em]">{tile.title}</h3><p className="mt-2 max-w-xs text-sm leading-relaxed opacity-75">{tile.copy}</p></div></article></Reveal>)}</div></section>
      <section id="estudio" className="bg-[#e7e1d2] px-5 py-16 sm:px-8 sm:py-24 lg:px-10"><div className="mx-auto grid grid-cols-1 max-w-[1180px] gap-6 lg:grid-cols-[1.1fr_.9fr]"><Reveal className="rounded-[2rem] bg-[#14212e] p-7 text-white sm:p-10"><Sparkles className="size-6 text-[#c9dcff]" /><h2 className="mt-14 max-w-lg text-[clamp(3rem,5vw,5.4rem)] leading-[.84] font-black tracking-[-.075em]">Un estudio que se adapta a tu punto de partida.</h2><p className="mt-6 max-w-md leading-relaxed text-white/70">La información se ordena para que puedas elegir una clase, entender su foco y reservar sin perder tiempo.</p></Reveal><div className="grid gap-6"><Reveal delay={.06} className="rounded-[2rem] bg-[#f8b89f] p-7"><CalendarDays className="size-6" /><h3 className="mt-12 text-3xl font-black tracking-[-.06em]">Agenda visible</h3><p className="mt-3 max-w-sm text-sm leading-relaxed">Horarios, cupos y nivel de cada clase a un toque de distancia.</p></Reveal><Reveal delay={.12} className="rounded-[2rem] border border-[#14212e]/12 bg-[#f8f9f6] p-7"><Check className="size-6 text-[#2364e6]" /><h3 className="mt-10 text-3xl font-black tracking-[-.06em]">Rutinas que suman</h3><p className="mt-3 max-w-sm text-sm leading-relaxed">Propuestas para empezar, profundizar y sostener una práctica que tenga sentido para vos.</p></Reveal></div></div></section>
      <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 sm:py-24 lg:px-10"><Reveal><p className="text-sm font-extrabold text-[#2364e6]">PLANES</p><h2 className="mt-4 max-w-2xl text-[clamp(2.6rem,4.6vw,4.2rem)] leading-[.86] font-black tracking-[-.07em]">Elegí el ritmo que se adapta a vos.</h2></Reveal><div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">{plans.map((plan, index) => <Reveal key={plan.name} delay={index * .05} className={cn('flex flex-col justify-between rounded-[1.6rem] border p-6 sm:p-7', plan.featured ? 'border-[#2364e6] bg-[#2364e6] text-white sm:row-span-2' : 'border-[#14212e]/12 bg-[#f8f9f6]')}>{plan.featured && <span className="mb-3 w-fit rounded-full bg-white/20 px-3 py-1 text-[10px] font-extrabold tracking-[.1em] uppercase">Más elegido</span>}<h3 className="text-xl font-black tracking-[-.04em]">{plan.name}</h3><p className="mt-3 text-3xl font-black tracking-[-.04em]">{plan.price}</p><p className={cn('mt-3 text-sm leading-relaxed', plan.featured ? 'text-white/80' : 'opacity-70')}>{plan.copy}</p></Reveal>)}</div></section>
      <section id="agenda" className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 sm:py-24 lg:px-10"><div className="grid gap-6 md:grid-cols-[1.1fr_.9fr]"><Reveal className="rounded-[2rem] bg-[#d9eeea] p-7 sm:p-10"><p className="text-sm font-extrabold text-[#2364e6]">PRIMERA CLASE</p><h2 className="mt-4 max-w-xl text-[clamp(3rem,5vw,5.4rem)] leading-[.85] font-black tracking-[-.075em]">Empezá con el movimiento que te haga bien.</h2><Link href="/#contact" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl bg-[#14212e] px-5 text-sm font-extrabold text-white">Quiero una web así <ArrowUpRight className="size-4" /></Link></Reveal><Reveal delay={.08} className="rounded-[2rem] bg-[#2364e6] p-7 text-white sm:p-10"><Play className="size-6" /><h3 className="mt-14 text-3xl font-black tracking-[-.06em]">Conocé Cimbra Estudio de Movimiento</h3><p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">Una experiencia visual diseñada para un estudio que necesita informar, inspirar y convertir visitas en reservas.</p></Reveal></div></section>
      <section className="border-t border-[#14212e]/12 px-5 py-16 sm:px-8 sm:py-24 lg:px-10"><div className="mx-auto max-w-[1180px]"><Reveal><h2 className="max-w-2xl text-[clamp(2.6rem,4.6vw,4.2rem)] leading-[.88] font-black tracking-[-.07em]">Preguntas antes de tu primera clase.</h2></Reveal><div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">{faqs.map(([question, answer], index) => <Reveal key={question} delay={index * .05}><span aria-hidden="true" className="text-4xl font-black text-[#2364e6]">0{index + 1}</span><h3 className="mt-3 text-xl font-black tracking-[-.04em]">{question}</h3><p className="mt-2 text-sm leading-relaxed opacity-70">{answer}</p></Reveal>)}</div></div><div className="mx-auto mt-14 max-w-[1180px] border-t border-[#14212e]/14 pt-5"><ProjectBack /></div></section>
    </main>
  )
}

export function ConceptLanding({ project }: { project: ConceptProject }) {
  void project
  return <CimbraLanding />
}

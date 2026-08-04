'use client'

import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CarFront,
  Check,
  ChevronDown,
  Coffee,
  MapPin,
  Menu,
  MoveRight,
  Phone,
  Play,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { AsterHeroFallback } from '@/components/aster-hero-fallback'
import type { ConceptProject } from '@/lib/project-data'
import { cn } from '@/lib/utils'

const easing = [0.16, 1, 0.3, 1] as const

// Loaded only on the Aster page, only once the browser needs it - keeps the
// three.js chunk out of every other route's bundle. AsterHeroFallback has no
// three.js import, so it's safe to pull in eagerly above as the loading
// placeholder - no extra network fetch just to show a placeholder.
const Aster3DHero = dynamic(() => import('@/components/aster-3d-hero'), {
  ssr: false,
  loading: () => <AsterHeroFallback />,
})

function ConceptNotice({ className }: { className: string }) {
  return (
    <div className={cn('relative z-30 px-5 py-3 text-center text-[10px] font-medium tracking-[0.13em] uppercase', className)}>
      Proyecto conceptual. Marca y contenido ficticios.{' '}
      <Link href="/proyectos" className="underline underline-offset-4">Volver a proyectos</Link>
    </div>
  )
}

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

function ProjectBack({ className }: { className?: string }) {
  return <Link href="/proyectos" className={cn('inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-transform duration-300 hover:translate-x-1', className)}><ArrowLeft className="size-4" /> Volver a proyectos</Link>
}

function OmbuLanding() {
  const menu = [
    ['Espresso de la casa', 'Cacao, nuez y caramelo', '$ 150', false],
    ['Filtro de temporada', 'Notas florales y cítricas', '$ 190', true],
    ['Flat white', 'Doble espresso y leche texturada', '$ 180', false],
    ['Tostada de pan madre', 'Manteca batida y conserva', '$ 240', false],
  ] as const
  const stats = [
    ['+12', 'orígenes distintos por año'],
    ['600', 'tazas servidas cada semana'],
    ['4.9', 'valoración de la vecindad'],
  ]
  const testimonials = [
    ['“El lugar donde empezamos los sábados.”', 'Lucía y Santiago, vecinos'],
    ['“El filtro de temporada cambió mi forma de tomar café.”', 'Rodrigo, cliente habitual'],
    ['“Pido el flat white y me quedo una hora trabajando.”', 'Marina, freelance'],
  ]
  const faqs = [
    ['¿Puedo reservar?', 'Sí. Para grupos de cuatro personas o más, escribinos y coordinamos el horario.'],
    ['¿La carta cambia?', 'El café de filtro rota con las cosechas. La carta está actualizada antes de abrir.'],
    ['¿Hay opciones vegetales?', 'Trabajamos con alternativas vegetales para bebidas y una selección breve de pastelería.'],
  ]

  return (
    <main className="overflow-x-clip bg-[#edf0df] text-[#23201b] [font-family:var(--font-fraunces),Georgia,serif]">
      <ConceptNotice className="bg-[#29261f] text-[#edf0df]" />
      <header className="border-b border-[#23201b]/15 bg-[#edf0df]">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="#inicio" className="flex items-center gap-3 text-[1.7rem] leading-none tracking-[-0.06em]"><span className="grid size-9 place-items-center rounded-full border border-[#23201b]/35"><Coffee className="size-4" /></span>Ombú Café</Link>
          <nav className="hidden gap-8 text-sm md:flex"><a href="#carta">Carta</a><a href="#origen">El café</a><a href="#visita">Visitanos</a></nav>
          <a href="#visita" className="hidden border-b border-[#23201b] pb-1 text-sm sm:block">Reservar mesa</a><Menu className="size-6 md:hidden" aria-hidden="true" />
        </div>
      </header>

      <section id="inicio" className="mx-auto grid grid-cols-1 max-w-[1440px] lg:grid-cols-[0.82fr_1.18fr]">
        <div className="flex min-h-[550px] flex-col justify-between px-5 py-10 sm:px-8 sm:py-14 lg:min-h-[calc(100dvh-118px)] lg:px-12">
          <Reveal><p className="text-[11px] tracking-[0.18em] uppercase text-[#605a4c]">Café de especialidad, Montevideo</p></Reveal>
          <Reveal delay={0.06}><h1 className="max-w-xl text-[clamp(4.4rem,8vw,8.6rem)] leading-[0.78] tracking-[-0.085em]">Preparado<br />sin <em className="font-light">apuro.</em></h1></Reveal>
          <Reveal delay={0.12} className="max-w-sm"><p className="text-lg leading-relaxed text-[#4e493e]">Una pausa breve, una taza bien hecha y una carta que acompaña cada momento del día.</p><a href="#carta" className="mt-7 inline-flex items-center gap-3 text-base font-semibold">Conocer la carta <MoveRight className="size-4" /></a></Reveal>
        </div>
        <figure className="relative min-h-[420px] overflow-hidden bg-[#343027] lg:min-h-0"><Image src="/concepts/ombu-hero.webp" alt="Taza de café de especialidad sobre una barra de piedra" fill priority sizes="(max-width:1023px) 100vw, 62vw" className="object-cover" /><figcaption className="absolute right-5 bottom-5 left-5 flex justify-between border-t border-white/35 pt-3 text-sm text-white"><span>La primera taza del día.</span><span>08:30 - 18:00</span></figcaption></figure>
      </section>

      <section className="border-y border-dashed border-[#23201b]/40 bg-[#e3ddc4] px-5 py-5 sm:px-8 lg:px-12">
        <Reveal className="mx-auto flex max-w-[1220px] flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-[11px] tracking-[0.03em] text-[#4e493e] sm:justify-between">
          {stats.map(([value, label], index) => (
            <span key={label} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true" className="text-[#8a5a3b]">✳</span>}
              <b className="[font-family:var(--font-fraunces),Georgia,serif] text-base text-[#23201b] italic">{value}</b> {label}
            </span>
          ))}
        </Reveal>
      </section>

      <section id="origen" className="border-b border-[#23201b]/15 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid grid-cols-1 max-w-[1220px] gap-12 lg:grid-cols-[0.85fr_0.62fr_0.53fr] lg:items-end">
          <Reveal><p className="text-[11px] tracking-[0.18em] uppercase text-[#766953]">El origen</p><h2 className="mt-5 max-w-md text-[clamp(3.2rem,6vw,5.4rem)] leading-[0.84] tracking-[-0.075em]">El café cuenta de dónde viene.</h2></Reveal>
          <Reveal delay={0.08}><p className="max-w-xl text-xl leading-relaxed text-[#4e493e]">Elegimos lotes de origen definido y los preparamos de la forma que mejor expresa su perfil. Sin una lista infinita, sin nombres complicados.</p><div className="mt-10 grid grid-cols-3 gap-3 border-t border-[#23201b]/15 pt-5 text-sm"><span><b className="block text-2xl font-normal">01</b>cosecha</span><span><b className="block text-2xl font-normal">02</b>tueste</span><span><b className="block text-2xl font-normal">03</b>taza</span></div></Reveal>
          <Reveal delay={0.14} className="relative aspect-[0.85] overflow-hidden rounded-[1.4rem_0.3rem] bg-[#343027] max-lg:hidden"><Image src="/concepts/ombu-hero.webp" alt="Detalle de la barra de café de Ombú" fill loading="lazy" sizes="20vw" className="object-cover object-[82%_48%]" /></Reveal>
        </div>
      </section>

      <section id="carta" className="bg-[#c9c2a4] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1220px]"><Reveal><h2 className="max-w-2xl text-[clamp(3.4rem,6vw,6.5rem)] leading-[0.82] tracking-[-0.075em]">La carta de todos los días.</h2></Reveal><div className="mt-12 grid grid-cols-1 gap-x-12 border-t border-[#23201b]/25 sm:grid-cols-2">{menu.map(([name, description, price, featured], index) => <Reveal key={name} delay={index * 0.04} className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-[#23201b]/25 py-6"><div><h3 className="flex flex-wrap items-center gap-2.5 text-2xl italic">{name}{featured && <span className="rounded-full bg-[#b75632] px-2.5 py-1 text-[10px] leading-none font-sans tracking-[0.1em] text-[#fff7e8] uppercase not-italic">Recomendado</span>}</h3><p className="mt-2 text-sm text-[#4e493e]">{description}</p></div><span className="text-sm">{price}</span></Reveal>)}</div><p className="mt-7 text-sm text-[#4e493e]">También hay pastelería de estación y alternativas vegetales. Preguntá qué salió hoy.</p></div>
      </section>

      <section className="mx-auto grid grid-cols-1 max-w-[1440px] gap-7 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.12fr_0.88fr] lg:px-12"><Reveal className="relative aspect-[1.1] overflow-hidden bg-[#453c30] sm:aspect-[1.5]"><Image src="/concepts/ombu-cafe-editorial.webp" alt="Barista preparando café en una barra de Ombú Café" fill loading="lazy" sizes="(max-width:1023px) 100vw, 55vw" className="object-cover" /></Reveal><Reveal delay={0.08} className="flex flex-col justify-center py-4 lg:px-12"><h2 className="text-[clamp(3.1rem,5vw,5.8rem)] leading-[0.84] tracking-[-0.075em]">Una rutina que se vuelve ritual.</h2><p className="mt-6 max-w-md text-lg leading-relaxed text-[#4e493e]">Barra, mesa o ventana. La experiencia está pensada para que puedas quedarte el rato que precisás.</p></Reveal></section>

      <section className="border-y border-[#23201b]/15 bg-[#c9c2a4] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[760px] space-y-12">
          {testimonials.map(([quote, name], index) => (
            <Reveal key={name} delay={index * 0.06} className={cn('border-t border-[#23201b]/25 pt-6', index % 2 === 1 && 'ml-auto max-w-[90%] text-right')}>
              <p className="text-[clamp(1.4rem,3.2vw,2rem)] leading-snug italic">{quote}</p>
              <span className="mt-4 block text-sm text-[#605a4c]">— {name}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-[#23201b]/15 px-5 py-20 sm:px-8 sm:py-28 lg:px-12"><div className="mx-auto grid grid-cols-1 max-w-[1220px] gap-12 lg:grid-cols-[0.75fr_1.25fr]"><Reveal><h2 className="text-[clamp(3rem,5vw,5.7rem)] leading-[0.85] tracking-[-0.075em]">Preguntas que aparecen antes de venir.</h2></Reveal><div>{faqs.map(([question, answer]) => <details key={question} className="group border-t border-[#23201b]/20 py-5 last:border-b"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-xl"><span>{question}</span><ChevronDown className="size-5 transition-transform duration-300 group-open:rotate-180" /></summary><p className="max-w-xl pt-4 leading-relaxed text-[#4e493e]">{answer}</p></details>)}</div></div></section>

      <section id="visita" className="bg-[#29261f] px-5 py-20 text-[#edf0df] sm:px-8 sm:py-28 lg:px-12"><div className="mx-auto grid grid-cols-1 max-w-[1220px] gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><Reveal><p className="text-[11px] tracking-[0.18em] uppercase text-[#c9c2a4]">Ombú Café de Especialidad</p><h2 className="mt-5 max-w-3xl text-[clamp(3.7rem,6.6vw,7.2rem)] leading-[0.8] tracking-[-0.08em]">Pasá cuando necesites una pausa.</h2></Reveal><Reveal delay={0.08} className="space-y-3 text-base text-[#edf0df]/75"><p className="flex gap-3"><MapPin className="mt-0.5 size-4" />Ciudad Vieja, Montevideo</p><p>Lunes a sábado, 08:30 - 18:00</p><Link href="/#contact" className="mt-6 inline-flex min-h-12 items-center gap-3 border border-[#edf0df]/45 px-5 text-[#edf0df]">Quiero una web así <ArrowUpRight className="size-4" /></Link></Reveal></div><div className="mx-auto mt-14 max-w-[1220px] border-t border-[#edf0df]/20 pt-5"><ProjectBack /></div></section>
    </main>
  )
}

function AsterLanding() {
  const vehicles = [
    { name: 'Arco E-9', type: 'SUV eléctrico', copy: '612 km de autonomía estimada', price: 'Desde USD 38.900', image: '/concepts/aster-hero.webp', imageClass: 'object-[58%_center]' },
    { name: 'Norte S1', type: 'Gran turismo', copy: 'Tracción total y 4 plazas', price: 'Desde USD 52.400', image: '/concepts/aster-vehicle-norte-s1.webp', imageClass: 'object-center' },
    { name: 'Vector 4', type: 'SUV familiar', copy: 'Espacio, tecnología y carga rápida', price: 'Desde USD 44.100', image: '/concepts/aster-vehicle-vector-4.webp', imageClass: 'object-center' },
  ]
  const trust = [
    ['3 años', 'de garantía de fábrica'],
    ['150+', 'puntos de carga rápida en el país'],
    ['24/7', 'asistencia en ruta incluida'],
  ]
  const faq = [['¿Aceptan usados?', 'Tomamos tu vehículo como parte de pago después de una evaluación presencial.'], ['¿Hay financiación?', 'Las alternativas dependen de la unidad y se simulan antes de avanzar con la reserva.'], ['¿Puedo coordinar una prueba?', 'Sí. Elegís una unidad, nos contás tu disponibilidad y confirmamos el recorrido.'], ['¿Qué cubre la garantía?', '3 años o 100.000 km en motor y batería, con revisiones incluidas en nuestros centros.']]
  return (
    <main className="min-h-screen overflow-x-clip bg-[#080a14] text-[#eff3ff] [font-family:var(--font-space-grotesk),Arial,sans-serif]">
      <ConceptNotice className="border-b border-white/10 bg-[#10142a] text-[#b9c6ed]" />
      <header className="relative z-10 border-b border-white/10 bg-[#080a14]/85 backdrop-blur-xl"><div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12"><Link href="#inicio" className="flex items-center gap-3 text-lg font-semibold tracking-[-0.06em]"><span className="grid size-9 place-items-center rounded-xl border border-cyan-200/30 bg-cyan-200/10"><CarFront className="size-4 text-cyan-100" /></span>ASTER</Link><nav className="hidden gap-7 text-xs text-[#b9c6ed] md:flex"><a href="#unidades">Unidades</a><a href="#tecnologia">Tecnología</a><a href="#compra">Comprar</a></nav><a href="#compra" className="hidden rounded-full border border-cyan-100/30 bg-cyan-100/10 px-4 py-2 text-xs sm:block">Coordinar llamada</a><Menu className="size-6 md:hidden" /></div></header>
      <section id="inicio" className="relative isolate overflow-hidden border-b border-white/10"><div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_15%,rgba(79,70,229,.32),transparent_31%),radial-gradient(circle_at_20%_85%,rgba(6,182,212,.14),transparent_27%)]" /><div className="mx-auto grid grid-cols-1 min-h-[calc(100dvh-118px)] max-w-[1440px] items-end gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-12 lg:py-12"><Reveal className="pb-2"><p className="text-[11px] tracking-[0.18em] uppercase text-cyan-200">Aster Automóviles Eléctricos</p><h1 className="mt-6 max-w-xl text-[clamp(3.8rem,6.7vw,7.3rem)] leading-[0.82] font-medium tracking-[-0.08em]">La próxima<br /><span className="text-[#96a9ff]">decisión</span> se siente hoy.</h1><p className="mt-6 max-w-md text-lg leading-relaxed text-[#b9c6ed]">Un concesionario digital pensado para elegir con información clara, comparar y avanzar a tu ritmo.</p><a href="#unidades" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#d8e7ff] px-5 text-sm font-semibold text-[#0a1021] transition-transform duration-300 hover:-translate-y-1">Ver unidades <ArrowUpRight className="size-4" /></a></Reveal><Reveal delay={0.1} className="relative aspect-[1.15] min-h-[360px] overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.04] shadow-[0_30px_100px_rgba(0,0,0,.45)]"><Aster3DHero /><div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080a14]/65 via-transparent to-transparent" /><div className="pointer-events-none absolute right-4 bottom-4 left-4 grid grid-cols-3 overflow-hidden rounded-2xl border border-white/15 bg-[#111a34]/70 text-xs text-[#dce6ff] backdrop-blur-xl"><div className="p-4"><b className="block text-lg text-white">612</b>km estimados</div><div className="border-x border-white/10 p-4"><b className="block text-lg text-white">0-100</b>en 4,3 s</div><div className="p-4"><b className="block text-lg text-white">350</b>kW de carga</div></div></Reveal></div></section>
        <section id="unidades" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"><Reveal><p className="text-[11px] tracking-[0.18em] uppercase text-[#8cf1ff]">Unidades seleccionadas</p><h2 className="mt-5 max-w-2xl text-[clamp(3.2rem,5.6vw,6.2rem)] leading-[0.84] tracking-[-0.075em]">Cada forma de moverte, en foco.</h2></Reveal><div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">{vehicles.map((vehicle, index) => <Reveal key={vehicle.name} delay={index * 0.06} className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[0.045] p-5 transition duration-500 hover:-translate-y-1 hover:border-cyan-100/35 hover:bg-white/[0.07]"><div className="relative aspect-[1.35] overflow-hidden rounded-[1rem] bg-[#121a30]"><Image src={vehicle.image} alt={`Vehículo ${vehicle.name} de Aster Automóviles Eléctricos`} fill loading="lazy" sizes="(max-width:1023px) 100vw, 33vw" className={cn('object-cover transition duration-700 group-hover:scale-[1.035]', vehicle.imageClass)} /></div><p className="mt-5 text-xs uppercase tracking-[0.14em] text-[#9eaccf]">{vehicle.type}</p><h3 className="mt-2 text-3xl tracking-[-0.06em]">{vehicle.name}</h3><p className="mt-3 max-w-xs text-sm leading-relaxed text-[#b9c6ed]">{vehicle.copy}</p><div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4"><span className="text-sm font-semibold text-white">{vehicle.price}</span><span className="inline-flex items-center gap-2 text-sm text-cyan-100">Ver ficha <MoveRight className="size-4" /></span></div></Reveal>)}</div></section>
      <section className="overflow-hidden border-y border-white/10 bg-[#0a0e1c] py-4"><div className="flex w-max gap-14 animate-marquee motion-reduce:animate-none">{[0, 1].map((rep) => <div key={rep} aria-hidden={rep === 1 || undefined} className="flex shrink-0 items-center gap-14 pr-14 font-mono text-xs tracking-[0.14em] text-[#9eaccf] uppercase">{trust.map(([value, label]) => <span key={label} className="flex items-center gap-3"><b className="text-sm text-white">{value}</b>{label}<span aria-hidden="true" className="text-cyan-200">◆</span></span>)}</div>)}</div></section>
      <section id="tecnologia" className="border-y border-white/10 bg-[#0c1020] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"><div className="mx-auto grid grid-cols-1 max-w-[1240px] gap-10 lg:grid-cols-[.8fr_1.2fr]"><Reveal><h2 className="text-[clamp(3rem,5.3vw,5.8rem)] leading-[0.84] tracking-[-0.075em]">Tecnología que se entiende cuando la usás.</h2><p className="mt-6 max-w-md leading-relaxed text-[#aebbd8]">La información técnica no queda escondida. Se ordena para comparar, evaluar y tomar una decisión con tiempo.</p></Reveal><div className="grid gap-4 sm:grid-cols-2">{[['Asistencia activa', 'Sistemas pensados para acompañar cada trayecto.'], ['Carga planificada', 'Datos claros para organizar una recarga en ruta.'], ['Conectividad', 'Controles y estado de la unidad desde una sola interfaz.'], ['Seguridad', 'Tecnología de apoyo para cuidar cada movimiento.']].map(([title, copy], index) => <Reveal key={title} delay={index * .05}><article className="h-full rounded-[1.4rem] border border-white/10 bg-[linear-gradient(145deg,rgba(118,113,255,.16),rgba(9,12,26,.4))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.12)]"><Sparkles className="size-5 text-cyan-100" /><h3 className="mt-12 text-xl">{title}</h3><p className="mt-3 text-sm leading-relaxed text-[#b9c6ed]">{copy}</p></article></Reveal>)}</div></div></section>
      <section id="compra" className="mx-auto grid grid-cols-1 max-w-[1240px] gap-8 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.15fr_.85fr] lg:px-0"><Reveal className="rounded-[1.8rem] border border-white/12 bg-[#111936] p-7 sm:p-10"><p className="text-[11px] tracking-[0.18em] uppercase text-[#8cf1ff]">Una compra, sin vueltas</p><h2 className="mt-5 text-[clamp(3rem,5vw,5.5rem)] leading-[.86] tracking-[-.075em]">Elegí, compará y coordiná.</h2><div className="mt-10 grid gap-5 sm:grid-cols-3">{[['Elegí una unidad', 'Filtrá por formato, uso y tipo de energía.'], ['Simulá alternativas', 'Revisá contado, financiación o entrega de usado.'], ['Coordiná una prueba', 'Definimos juntos el próximo paso.']].map(([title, copy]) => <div key={title} className="border-t border-white/15 pt-4"><h3>{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#aebbd8]">{copy}</p></div>)}</div></Reveal><Reveal delay={.08} className="rounded-[1.8rem] border border-cyan-100/20 bg-cyan-100/[.08] p-7 sm:p-10"><ShieldCheck className="size-6 text-cyan-100" /><h3 className="mt-10 text-2xl">Acompañamiento desde la consulta.</h3><p className="mt-3 text-sm leading-relaxed text-[#b9c6ed]">Una conversación inicial ayuda a entender qué unidad puede encajar con la forma en que te movés.</p><Link href="/#contact" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/25 px-5 text-sm hover:bg-white/10">Hablar con el equipo <Phone className="size-4" /></Link></Reveal></section>
      <section className="border-t border-white/10 px-5 py-16 sm:px-8 lg:px-12"><div className="mx-auto max-w-[1240px]"><p className="font-mono text-[11px] tracking-[0.18em] text-[#8cf1ff] uppercase">Ficha técnica / 04</p><h2 className="mt-3 text-3xl tracking-[-.05em]">Preguntas frecuentes</h2><div className="mt-7 border-t border-white/10">{faq.map(([question, answer]) => <div key={question} className="grid gap-1.5 border-b border-white/10 py-5 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8"><h3 className="font-mono text-sm text-[#dce6ff]">{question}</h3><p className="text-sm leading-relaxed text-[#aebbd8]">{answer}</p></div>)}</div><div className="mt-10 border-t border-white/10 pt-5"><ProjectBack className="text-[#dce6ff]" /></div></div></section>
    </main>
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
  if (project.slug === 'ombu-cafe') return <OmbuLanding />
  if (project.slug === 'aster-automoviles') return <AsterLanding />
  return <CimbraLanding />
}

'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { CalendarCheck2, Clock3, Globe2, Mail, Video } from 'lucide-react'
import { EASE } from '@/lib/motion'

const CAL_NAMESPACE = 'mr14-project-call'
const CAL_TIMEZONE = 'America/Montevideo'
const CAL_LINK = (process.env.NEXT_PUBLIC_CAL_LINK ?? '')
  .trim()
  .replace(/^https?:\/\/(?:www\.)?cal\.com\//, '')
  .replace(/^\/+|\/+$/g, '')

const CalEmbed = dynamic(
  () => import('@calcom/embed-react').then((module) => module.default),
  {
    ssr: false,
    loading: () => <CalendarSkeleton />,
  },
)

const CAL_COLORS = {
  'cal-brand': '#ff5d3a',
  'cal-brand-emphasis': '#e84b2a',
  'cal-brand-text': '#291532',
  'cal-brand-subtle': '#ffd2c8',
  'cal-brand-accent': '#291532',
  'cal-text': '#5d4963',
  'cal-text-emphasis': '#291532',
  'cal-text-subtle': '#6f5a75',
  'cal-text-muted': '#8b7a90',
  'cal-bg': '#eef2df',
  'cal-bg-emphasis': '#dfe8c8',
  'cal-bg-subtle': '#e5ebd4',
  'cal-bg-muted': '#d7e0c1',
  'cal-border': '#b5bea1',
  'cal-border-emphasis': '#291532',
  'cal-border-subtle': '#c8d1b3',
  'cal-border-muted': '#d5ddc2',
  'cal-border-booker': '#291532',
  'cal-border-booker-width': '1px',
  radius: '0.5rem',
  'radius-md': '0.75rem',
  'radius-lg': '1rem',
  'radius-xl': '1.25rem',
  'radius-2xl': '1.5rem',
  'radius-3xl': '2rem',
  'radius-full': '9999px',
} as const

function CalendarSkeleton() {
  return (
    <div className="min-h-[820px] animate-pulse p-4 sm:min-h-[720px] sm:p-8" aria-label="Cargando calendario">
      <div className="h-7 w-48 rounded-full bg-foreground/10" />
      <div className="mt-8 grid grid-cols-7 gap-2">
        {Array.from({ length: 42 }).map((_, index) => (
          <span key={index} className="aspect-square rounded-xl bg-foreground/[0.07]" />
        ))}
      </div>
    </div>
  )
}

function MissingCalendarLink() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center px-6 py-14 text-center sm:min-h-96">
      <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
        <CalendarCheck2 className="size-6" />
      </span>
      <h4 className="mt-5 text-2xl font-semibold tracking-tight">Agenda en preparación</h4>
      <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
        Mientras termino de conectar los horarios, puedes solicitar tu reunión directamente por correo.
      </p>
      <a
        href="mailto:mrdgz14dev@gmail.com?subject=Quiero%20agendar%20una%20reuni%C3%B3n"
        className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-foreground px-5 font-semibold text-background transition-transform hover:-translate-y-0.5"
      >
        <Mail className="size-4" /> Solicitar una reunión
      </a>
    </div>
  )
}

export function CallBooking() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const element = sectionRef.current
    if (!element || !CAL_LINK) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShouldLoad(true)
        observer.disconnect()
      },
      { rootMargin: '500px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldLoad || !CAL_LINK) return

    let active = true
    void import('@calcom/embed-react').then(async ({ getCalApi }) => {
      if (!active) return
      const cal = await getCalApi({ namespace: CAL_NAMESPACE })
      if (!active) return

      // Supported by the current embed API; the published package types lag behind this option.
      const timezoneVisibility = { showTimezoneWhenEventDetailsHidden: true }
      cal('ui', {
        ...timezoneVisibility,
        theme: 'light',
        layout: 'month_view',
        hideEventTypeDetails: true,
        styles: {
          body: { background: '#eef2df' },
        },
        cssVarsPerTheme: {
          light: CAL_COLORS,
          dark: CAL_COLORS,
        },
      })
    })

    return () => {
      active = false
    }
  }, [shouldLoad])

  return (
    <motion.div
      ref={sectionRef}
      id="call-booking"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.75, ease: EASE }}
      className="-mx-2 mt-14 min-w-0 scroll-mt-24 overflow-hidden rounded-[2.25rem_0.5rem_2.25rem_0.5rem] bg-accent p-2 text-foreground shadow-[0_30px_90px_rgba(0,0,0,0.22)] min-[430px]:mx-0 sm:mt-20 sm:scroll-mt-28 sm:rounded-[3rem_0.75rem_3rem_0.75rem] sm:p-7 lg:p-9"
    >
      <div className="grid gap-6 px-3 pt-5 pb-6 min-[380px]:px-4 sm:gap-7 sm:px-3 sm:pt-3 sm:pb-7 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
            Reserva directa
          </span>
          <h3 className="mt-3 max-w-3xl text-[2.15rem] leading-[0.95] font-semibold tracking-[-0.05em] text-balance min-[380px]:text-4xl sm:text-5xl lg:text-6xl">
            Agendemos una reunión.
          </h3>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            Reserva una videollamada para contarme sobre tu proyecto, resolver dudas y definir el mejor próximo paso. Sin compromiso.
          </p>
        </div>

        <ul className="grid gap-2 text-sm sm:grid-cols-3 lg:grid-cols-1">
          {[
            { icon: Clock3, text: '25 minutos' },
            { icon: Globe2, text: 'Hora de Montevideo' },
            { icon: Video, text: 'Videollamada' },
          ].map((item) => (
            <li key={item.text} className="flex min-h-11 items-center gap-2.5 rounded-full border border-foreground/30 bg-background/35 px-4 font-semibold">
              <item.icon className="size-4 text-primary" /> {item.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="cal-embed-shell relative isolate min-w-0 max-w-full touch-pan-y overflow-x-hidden rounded-[1.85rem_0.4rem_1.85rem_0.4rem] border border-foreground bg-card shadow-[0_18px_55px_rgba(41,21,50,0.13)] sm:rounded-[2.35rem_0.5rem_2.35rem_0.5rem]">
        <div className="flex min-h-14 items-center justify-between gap-4 border-b border-foreground/25 bg-background/60 px-4 sm:min-h-16 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="relative flex size-2.5 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-35" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
            </span>
            <span className="truncate font-mono text-[9px] font-semibold uppercase tracking-[0.16em] sm:text-[10px]">
              Disponibilidad en tiempo real
            </span>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/55 min-[390px]:block">
            America / Montevideo
          </span>
        </div>

        <div className="min-w-0 max-w-full overflow-hidden">
          {CAL_LINK ? (
            shouldLoad ? (
              <CalEmbed
                namespace={CAL_NAMESPACE}
                calLink={CAL_LINK}
                config={{
                  layout: 'month_view',
                  theme: 'light',
                  timezone: CAL_TIMEZONE,
                  locale: 'es',
                  lang: 'es',
                  language: 'es',
                }}
                className="min-h-[780px] w-full min-w-0 max-w-full overflow-hidden sm:min-h-[660px]"
                style={{ width: '100%', minWidth: 0, maxWidth: '100%', minHeight: '660px', overflow: 'hidden' }}
              />
            ) : (
              <CalendarSkeleton />
            )
          ) : (
            <MissingCalendarLink />
          )}
        </div>
      </div>

      <p className="px-3 pt-5 pb-2 text-center text-xs leading-relaxed text-foreground/60">
        La disponibilidad se actualiza en tiempo real y contempla automáticamente los eventos ocupados del calendario conectado.
      </p>
    </motion.div>
  )
}

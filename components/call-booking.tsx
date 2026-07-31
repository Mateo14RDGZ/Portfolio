'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, CalendarDays, Clock3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CONTACT_EMAIL = 'mrdgz14dev@gmail.com'

function calendarDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

export function CallBooking() {
  const [startsAt, setStartsAt] = useState('')
  const bookingUrl = useMemo(() => {
    if (!startsAt) return ''
    const start = new Date(startsAt)
    if (Number.isNaN(start.getTime())) return ''
    const end = new Date(start.getTime() + 25 * 60 * 1000)
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: 'Llamada inicial con MR14',
      dates: `${calendarDate(start)}/${calendarDate(end)}`,
      details: 'Conversación inicial de 25 minutos sobre tu proyecto web. Mateo confirmará el horario por correo.',
      add: CONTACT_EMAIL,
    })
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }, [startsAt])

  return (
    <div id="call-booking" className="mt-12 grid scroll-mt-28 overflow-hidden border border-background/40 bg-background/5 lg:grid-cols-[1fr_1.2fr]">
      <div className="p-6 sm:p-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
          Próximo paso
        </span>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-background sm:text-4xl">
          Propón una llamada de 25 minutos.
        </h3>
        <p className="mt-4 max-w-xl leading-relaxed text-background/65">
          Elige el horario que mejor te quede. Se abrirá Google Calendar con Mateo invitado; confirmaré la disponibilidad por correo.
        </p>
      </div>

      <div className="flex flex-col justify-center gap-4 border-t border-background/40 bg-background p-6 text-foreground sm:p-8 lg:border-t-0 lg:border-l">
        <label htmlFor="call-time" className="flex items-center gap-2 text-sm font-semibold">
          <CalendarDays className="size-4 text-primary" />
          Día y hora preferidos
        </label>
        <input
          id="call-time"
          type="datetime-local"
          value={startsAt}
          onChange={(event) => setStartsAt(event.target.value)}
          className="h-13 w-full rounded-xl border border-foreground/35 bg-transparent px-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock3 className="size-3.5" /> Duración estimada: 25 minutos
        </div>
        <Button
          disabled={!bookingUrl}
          nativeButton={false}
          render={
            <a href={bookingUrl || undefined} target="_blank" rel="noopener noreferrer" />
          }
          className="group h-13 w-full rounded-none"
        >
          Añadir propuesta al calendario
          <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </div>
    </div>
  )
}

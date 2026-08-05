'use client'

import { useMemo, useState, useSyncExternalStore } from 'react'
import { Check, Clock, Minus, Plus, X } from 'lucide-react'
import { PressableCard, SegmentedControl } from '@/components/case-studies/cimbra/cimbra-motion'
import {
  HORARIOS,
  horarioEstudio,
  NIVELES,
  nivelFiltros,
  onboarding,
  stats,
  type Clase,
  type PanelValue,
} from '@/components/case-studies/cimbra/data'

const CARD = 'rounded-[20px] bg-[#ECEFF3] shadow-[6px_6px_14px_rgba(28,34,43,0.14),-6px_-6px_14px_rgba(255,255,255,0.85)]'
const SELECT = 'rounded-[10px] border border-[#1C222B]/15 bg-white/70 px-2.5 py-1.5 text-sm font-medium text-[#1C222B] outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B4A]/50'

/**
 * Reads real system time once, client-side only. Returns `null` during SSR
 * so nothing is rendered until hydration (avoids a text mismatch between
 * server and client clocks) - this is a one-time read, not a live ticker,
 * so a no-op subscribe is correct: there is nothing to subscribe to.
 */
function useAbiertoAhora() {
  return useSyncExternalStore(
    () => () => {},
    () => {
      const now = new Date()
      return horarioEstudio.diasAbiertos.includes(now.getDay()) && now.getHours() >= horarioEstudio.apertura && now.getHours() < horarioEstudio.cierre
    },
    () => null,
  )
}

function HorarioSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)} className={SELECT} autoFocus>
      {HORARIOS.map((hora) => (
        <option key={hora} value={hora}>
          {hora}
        </option>
      ))}
    </select>
  )
}

function OcupacionBar({ clase }: { clase: Clase }) {
  const pct = Math.round(((clase.capacidad - clase.cuposDisponibles) / clase.capacidad) * 100)
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1C222B]/8">
      <div className="h-full rounded-full bg-[#FF6B4A]" style={{ width: `${pct}%` }} />
    </div>
  )
}

/**
 * Inicio: the dashboard summary, now the home of the one interaction meant
 * to be memorable - staff can create a class or move an existing one to a
 * different horario and watch the schedule actually respond (reorders by
 * time, occupancy recalculates, the "Próxima clase" card updates). All of
 * it is local React state - no backend needed for the point to land.
 */
export function CimbraPanelInicio({
  onNavigate,
  createOpen,
  onCreateOpenChange,
  clases,
  onClasesChange,
}: {
  onNavigate: (panel: PanelValue) => void
  createOpen: boolean
  onCreateOpenChange: (open: boolean) => void
  clases: Clase[]
  onClasesChange: (updater: (prev: Clase[]) => Clase[]) => void
}) {
  const [onboardingOpen, setOnboardingOpen] = useState(true)
  const [done, setDone] = useState<Set<string>>(new Set())
  const [filtro, setFiltro] = useState<(typeof nivelFiltros)[number]>('Todas')
  const [editingHoraId, setEditingHoraId] = useState<string | null>(null)
  const [lastAction, setLastAction] = useState<string | null>(null)
  const [form, setForm] = useState<{ name: string; hora: string; nivel: string; capacidad: number }>({
    name: '',
    hora: HORARIOS[0],
    nivel: NIVELES[0],
    capacidad: 6,
  })
  const abiertoAhora = useAbiertoAhora()

  const clasesOrdenadas = useMemo(() => [...clases].sort((a, b) => a.hora.localeCompare(b.hora)), [clases])
  const clasesFiltradas = filtro === 'Todas' ? clasesOrdenadas : clasesOrdenadas.filter((clase) => clase.nivel === filtro)
  const proximaClase = clasesOrdenadas.find((clase) => clase.cuposDisponibles > 0) ?? clasesOrdenadas[0]

  const ocupacionPromedio = useMemo(() => {
    const totalCapacidad = clases.reduce((sum, c) => sum + c.capacidad, 0)
    const totalOcupado = clases.reduce((sum, c) => sum + (c.capacidad - c.cuposDisponibles), 0)
    return totalCapacidad === 0 ? 0 : Math.round((totalOcupado / totalCapacidad) * 100)
  }, [clases])

  function reservar(id: string) {
    onClasesChange((prev) => prev.map((c) => (c.id === id ? { ...c, cuposDisponibles: Math.max(0, c.cuposDisponibles - 1) } : c)))
    setLastAction('Reserva confirmada.')
  }

  function moverHorario(id: string, hora: string) {
    onClasesChange((prev) => prev.map((c) => (c.id === id ? { ...c, hora } : c)))
    setEditingHoraId(null)
    setLastAction('Horario actualizado - la agenda se reordenó sola.')
  }

  function crearClase() {
    if (!form.name.trim()) return
    const nueva: Clase = {
      id: `${Date.now()}`,
      name: form.name.trim(),
      hora: form.hora,
      instructor: 'Por asignar',
      nivel: form.nivel as Clase['nivel'],
      cuposDisponibles: form.capacidad,
      capacidad: form.capacidad,
    }
    onClasesChange((prev) => [...prev, nueva])
    setForm({ name: '', hora: HORARIOS[0], nivel: NIVELES[0] as string, capacidad: 6 })
    onCreateOpenChange(false)
    setLastAction(`“${nueva.name}” se agregó a la agenda de hoy, ${nueva.hora}.`)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#1C222B]/65 uppercase">Resumen</p>
          <h2 className="mt-2 text-xl font-bold" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
            Inicio
          </h2>
        </div>
        {abiertoAhora !== null && (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${
              abiertoAhora ? 'bg-[#FF6B4A]/12 text-[#C22300]' : 'bg-[#1C222B]/8 text-[#1C222B]/65'
            }`}
          >
            <span className={`size-1.5 rounded-full ${abiertoAhora ? 'bg-[#C22300]' : 'bg-[#1C222B]/70'}`} />
            {abiertoAhora ? 'Abierto ahora' : 'Cerrado ahora'}
          </span>
        )}
      </div>

      {onboardingOpen && (
        <div className={`mt-6 mb-6 p-5 ${CARD}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#1C222B]">Primeros pasos</p>
              <p className="mt-1 text-xs text-[#1C222B]/65">Un recorrido rápido por lo que hay detrás del panel.</p>
            </div>
            <button
              type="button"
              onClick={() => setOnboardingOpen(false)}
              aria-label="Cerrar primeros pasos"
              className="flex size-7 shrink-0 items-center justify-center rounded-full text-[#1C222B]/65 transition-colors duration-150 hover:bg-[#1C222B]/8"
            >
              <X className="size-4" />
            </button>
          </div>
          <ul className="mt-4 flex flex-col gap-1.5">
            {onboarding.map((item) => {
              const isDone = done.has(item.id)
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setDone((prev) => new Set(prev).add(item.id))
                      onNavigate(item.panel)
                    }}
                    className="flex w-full items-center gap-3 rounded-[12px] px-2.5 py-2 text-left text-sm transition-colors duration-150 hover:bg-[#1C222B]/5"
                  >
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-150 ${
                        isDone ? 'border-[#FF6B4A] bg-[#FF6B4A] text-white' : 'border-[#1C222B]/25 text-transparent'
                      }`}
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className={isDone ? 'text-[#1C222B]/65 line-through' : 'text-[#1C222B]/80'}>{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {/* Featured, live-computed - the one stat that visibly reacts to what staff just did. Coral is reserved for active/important state per the design system's own rule, so this is the one tile allowed to use it. */}
        <div className="rounded-[20px] bg-[#FF6B4A] px-4 py-4 text-[#1C222B] sm:col-span-1">
          <p className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
            {ocupacionPromedio}%
          </p>
          <p className="mt-1 text-xs font-medium text-[#1C222B]/85">Ocupación promedio (en vivo)</p>
        </div>
        {stats.map((stat) => (
          <PressableCard key={stat.label} className="px-4 py-4">
            <p className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-[#1C222B]/65">{stat.label}</p>
          </PressableCard>
        ))}
      </div>

      {proximaClase && (
        <div className="mt-6 flex items-center justify-between gap-4 rounded-[20px] border border-[#1C222B]/8 bg-white/50 px-4 py-3.5">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.12em] text-[#1C222B]/65 uppercase">Próxima clase</p>
            <p className="mt-1 text-sm font-semibold text-[#1C222B]">
              {proximaClase.name} · {proximaClase.hora} <span className="font-normal text-[#1C222B]/65">con {proximaClase.instructor}</span>
            </p>
          </div>
          <p className="shrink-0 text-sm font-semibold text-[#C22300]">{proximaClase.cuposDisponibles} cupos</p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-[#1C222B]">Clases de hoy</h2>
        <div className="flex flex-wrap items-center gap-2">
          <SegmentedControl options={[...nivelFiltros]} value={filtro} onChange={(value) => setFiltro(value as (typeof nivelFiltros)[number])} />
          <button
            type="button"
            onClick={() => onCreateOpenChange(!createOpen)}
            className="inline-flex items-center gap-1.5 rounded-[12px] bg-[#1C222B] px-3 py-2 text-xs font-semibold text-white transition-transform duration-150 active:scale-[0.97]"
          >
            <Plus className="size-3.5" />
            Nueva clase
          </button>
        </div>
      </div>

      {createOpen && (
        <div className={`mt-4 p-4 ${CARD}`}>
          <p className="text-sm font-semibold text-[#1C222B]">Crear clase para hoy</p>
          <div className="mt-3 flex flex-col gap-3">
            <input
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Nombre de la clase"
              className={`${SELECT} w-full`}
            />
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#1C222B]/65">Horario</span>
                <HorarioSelect value={form.hora} onChange={(hora) => setForm((prev) => ({ ...prev, hora }))} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#1C222B]/65">Cupos</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Restar cupo"
                    onClick={() => setForm((prev) => ({ ...prev, capacidad: Math.max(1, prev.capacidad - 1) }))}
                    className="flex size-7 items-center justify-center rounded-[8px] border border-[#1C222B]/15 text-[#1C222B]/70"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-[#1C222B]">{form.capacidad}</span>
                  <button
                    type="button"
                    aria-label="Sumar cupo"
                    onClick={() => setForm((prev) => ({ ...prev, capacidad: Math.min(20, prev.capacidad + 1) }))}
                    className="flex size-7 items-center justify-center rounded-[8px] border border-[#1C222B]/15 text-[#1C222B]/70"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
            <SegmentedControl options={[...NIVELES]} value={form.nivel} onChange={(nivel) => setForm((prev) => ({ ...prev, nivel }))} />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={crearClase}
                disabled={!form.name.trim()}
                className="rounded-[12px] bg-[#FF6B4A] px-4 py-2 text-sm font-semibold text-white transition-transform duration-150 active:scale-[0.97] disabled:opacity-40"
              >
                Crear clase
              </button>
              <button type="button" onClick={() => onCreateOpenChange(false)} className="text-sm font-medium text-[#1C222B]/65">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {lastAction && (
        <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-[#1C222B]/65">
          <Check className="size-3.5 text-[#C22300]" strokeWidth={3} />
          {lastAction}
        </p>
      )}

      <ul className="mt-4 flex flex-col gap-2.5">
        {clasesFiltradas.map((clase) => (
          <li key={clase.id}>
            <PressableCard className="px-4 py-3.5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#1C222B]">{clase.name}</p>
                    {clase.cuposDisponibles === 0 && (
                      <span className="rounded-full bg-[#1C222B]/8 px-2 py-0.5 text-[10px] font-semibold text-[#1C222B]/65">Completo</span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-[#1C222B]/65">
                    {clase.instructor} · {clase.nivel}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  {editingHoraId === clase.id ? (
                    <HorarioSelect value={clase.hora} onChange={(hora) => moverHorario(clase.id, hora)} />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditingHoraId(clase.id)}
                      className="inline-flex items-center gap-1 rounded-[8px] px-1.5 py-1 text-sm font-semibold text-[#1C222B] transition-colors duration-150 hover:bg-[#1C222B]/6"
                    >
                      <Clock className="size-3.5 text-[#1C222B]/65" />
                      {clase.hora}
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-3">
                <OcupacionBar clase={clase} />
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-[11px] text-[#1C222B]/65">
                    {clase.cuposDisponibles} de {clase.capacidad} cupos libres
                  </p>
                  <button
                    type="button"
                    disabled={clase.cuposDisponibles === 0}
                    onClick={() => reservar(clase.id)}
                    className="text-xs font-semibold text-[#C22300] transition-transform duration-150 active:scale-[0.97] disabled:text-[#1C222B]/30"
                  >
                    {clase.cuposDisponibles === 0 ? 'Sin cupo' : 'Reservar'}
                  </button>
                </div>
              </div>
            </PressableCard>
          </li>
        ))}
        {clasesFiltradas.length === 0 && (
          <li className="rounded-[16px] px-4 py-6 text-center text-sm text-[#1C222B]/65">No hay clases de nivel &ldquo;{filtro}&rdquo; hoy.</li>
        )}
      </ul>
    </div>
  )
}

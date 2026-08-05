'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { PressableCard, SegmentedControl } from '@/components/case-studies/cimbra/cimbra-motion'
import { clases, nivelFiltros, onboarding, stats, type PanelValue } from '@/components/case-studies/cimbra/data'

/**
 * Inicio: a dashboard summary (stats + today's classes with a real level
 * filter) plus a dismissible onboarding checklist. Dismissing is real React
 * state - it does not come back once closed during this visit, and each
 * step is marked done the moment it actually gets you there.
 */
export function CimbraPanelInicio({ onNavigate }: { onNavigate: (panel: PanelValue) => void }) {
  const [onboardingOpen, setOnboardingOpen] = useState(true)
  const [done, setDone] = useState<Set<string>>(new Set())
  const [filtro, setFiltro] = useState<(typeof nivelFiltros)[number]>('Todas')

  const clasesFiltradas = filtro === 'Todas' ? clases : clases.filter((clase) => clase.level === filtro)

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-[#1C222B]/45 uppercase">Resumen</p>
      <h2 className="mt-2 text-xl font-bold" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
        Inicio
      </h2>

      {onboardingOpen && (
        <div className="mt-6 mb-6 rounded-[20px] bg-[#ECEFF3] p-5 shadow-[6px_6px_14px_rgba(28,34,43,0.14),-6px_-6px_14px_rgba(255,255,255,0.85)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#1C222B]">Primeros pasos</p>
              <p className="mt-1 text-xs text-[#1C222B]/55">Un recorrido rápido por lo que hay detrás del panel.</p>
            </div>
            <button
              type="button"
              onClick={() => setOnboardingOpen(false)}
              aria-label="Cerrar primeros pasos"
              className="flex size-7 shrink-0 items-center justify-center rounded-full text-[#1C222B]/40 transition-colors duration-150 hover:bg-[#1C222B]/8"
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
                    <span className={isDone ? 'text-[#1C222B]/45 line-through' : 'text-[#1C222B]/80'}>{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <PressableCard key={stat.label} className="px-4 py-4">
            <p className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-[#1C222B]/55">{stat.label}</p>
          </PressableCard>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-[#1C222B]">Clases de hoy</h2>
        <SegmentedControl options={[...nivelFiltros]} value={filtro} onChange={(value) => setFiltro(value as (typeof nivelFiltros)[number])} />
      </div>

      <ul className="mt-4 flex flex-col gap-2.5">
        {clasesFiltradas.map((clase) => (
          <li key={clase.name}>
            <PressableCard className="flex items-center justify-between gap-4 px-4 py-3.5">
              <div>
                <p className="text-sm font-semibold text-[#1C222B]">{clase.name}</p>
                <p className="mt-0.5 text-xs text-[#1C222B]/55">{clase.time}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#FF6B4A]">{clase.spots} cupos</p>
                <p className="mt-0.5 text-[11px] text-[#1C222B]/45">{clase.level}</p>
              </div>
            </PressableCard>
          </li>
        ))}
        {clasesFiltradas.length === 0 && (
          <li className="rounded-[16px] px-4 py-6 text-center text-sm text-[#1C222B]/45">No hay clases de nivel &ldquo;{filtro}&rdquo; hoy.</li>
        )}
      </ul>
    </div>
  )
}

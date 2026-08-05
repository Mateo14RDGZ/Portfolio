'use client'

import { useState } from 'react'
import { PressableCard, SegmentedControl } from '@/components/case-studies/cimbra/cimbra-motion'
import { componentes, designSystemNotes, paleta, planes, tipografia } from '@/components/case-studies/cimbra/data'

/**
 * Sistema: framed as the product's own internal design-system documentation
 * page (a page many real SaaS tools actually ship) rather than a case-study
 * "moodboard" section. The plan picker at the bottom is a genuinely working
 * selector, not a static illustration of one - the SegmentedControl below
 * updates real state and the copy panel below it reacts to the choice.
 */
export function CimbraPanelSistema() {
  const [plan, setPlan] = useState(planes.find((item) => item.featured)?.name ?? planes[0].name)
  const planActivo = planes.find((item) => item.name === plan) ?? planes[0]

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-[#1C222B]/45 uppercase">Documentación interna</p>
      <h2 className="mt-2 text-xl font-bold" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
        Sistema de diseño
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {paleta.map((color) => (
          <PressableCard key={color.hex} className="flex items-center gap-3 px-4 py-3.5">
            <span className="size-9 shrink-0 rounded-[10px] border border-[#1C222B]/10" style={{ backgroundColor: color.hex }} />
            <div>
              <p className="text-sm font-semibold text-[#1C222B]">
                {color.name} <span className="font-normal text-[#1C222B]/40">{color.hex}</span>
              </p>
              <p className="mt-0.5 text-xs text-[#1C222B]/55">{color.usage}</p>
            </div>
          </PressableCard>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <PressableCard className="px-5 py-5">
          <p className="text-[11px] font-semibold tracking-[0.1em] text-[#1C222B]/40 uppercase">{tipografia.display.name}</p>
          <p className="mt-3 text-2xl leading-snug font-bold" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
            {tipografia.display.sample}
          </p>
        </PressableCard>
        <PressableCard className="px-5 py-5">
          <p className="text-[11px] font-semibold tracking-[0.1em] text-[#1C222B]/40 uppercase">{tipografia.body.name}</p>
          <p className="mt-3 text-lg leading-snug">{tipografia.body.sample}</p>
        </PressableCard>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-[#1C222B]">Reglas</h3>
        <ul className="mt-3 flex flex-col gap-2.5">
          {designSystemNotes.map((note) => (
            <li key={note} className="border-t border-[#1C222B]/8 pt-2.5 text-sm leading-relaxed text-[#1C222B]/70 first:border-t-0 first:pt-0">
              {note}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-[#1C222B]">Componentes</h3>
        <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {componentes.map((component) => (
            <PressableCard key={component.name} className="px-4 py-3.5">
              <p className="text-sm font-semibold text-[#1C222B]">{component.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-[#1C222B]/55">{component.desc}</p>
            </PressableCard>
          ))}
        </ul>
      </div>

      <div className="mt-8 border-t border-[#1C222B]/8 pt-6">
        <h3 className="text-sm font-semibold text-[#1C222B]">Selector de plan (demo en vivo)</h3>
        <p className="mt-1 text-xs text-[#1C222B]/55">El mismo control segmentado del resto del sistema, aplicado a un caso real.</p>
        <div className="mt-4">
          <SegmentedControl options={planes.map((item) => item.name)} value={plan} onChange={setPlan} />
        </div>
        <PressableCard className="mt-4 flex items-center justify-between px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-[#1C222B]">{planActivo.name}</p>
            <p className="mt-0.5 text-xs text-[#1C222B]/55">{planActivo.copy}</p>
          </div>
          <p className="text-lg font-bold text-[#FF6B4A]">{planActivo.price}</p>
        </PressableCard>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Reveal, StaggerGroup, RevealItem } from '@/components/reveal'
import { cimbraFade, PressableCard, SegmentedControl } from '@/components/case-studies/cimbra/cimbra-motion'
import { paleta, tipografia, designSystemNotes, componentes, planes } from '@/components/case-studies/cimbra/data'

export function CimbraDesignSystem() {
  const [plan, setPlan] = useState(planes[1].name)

  return (
    <section id="cimbra-sistema" className="scroll-mt-20 bg-[#ECEFF3] px-6 py-20 text-[#1C222B] sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal variants={cimbraFade}>
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#C22300] uppercase">03 · Sistema de diseño</p>
          <h2 className="mt-5 max-w-xl text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.12] font-extrabold tracking-[-0.02em]" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
            Paleta, tipografía y componentes.
          </h2>
        </Reveal>

        {/* Paleta */}
        <StaggerGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4" gap={0.05}>
          {paleta.map((color) => (
            <RevealItem key={color.hex} variants={cimbraFade}>
              <PressableCard className="p-5">
                <div className="aspect-square w-full rounded-[16px]" style={{ backgroundColor: color.hex, boxShadow: color.hex === '#ECEFF3' ? 'inset 4px 4px 10px rgba(28,34,43,0.14), inset -4px -4px 10px rgba(255,255,255,0.85)' : undefined }} />
                <p className="mt-4 text-sm font-semibold">{color.name}</p>
                <p className="mt-1 font-mono text-xs text-[#1C222B]/65 uppercase">{color.hex}</p>
                <p className="mt-1 text-xs text-[#1C222B]/65">{color.usage}</p>
              </PressableCard>
            </RevealItem>
          ))}
        </StaggerGroup>

        {/* Tipografía */}
        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-[#1C222B]/10 pt-14 lg:grid-cols-2">
          <Reveal variants={cimbraFade}>
            <p className="text-xs font-bold tracking-[0.15em] text-[#C22300] uppercase">{tipografia.display.name} · {tipografia.display.role}</p>
            <p className="mt-4 text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] font-extrabold" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
              {tipografia.display.sample}
            </p>
          </Reveal>
          <Reveal variants={cimbraFade} delay={0.08}>
            <p className="text-xs font-bold tracking-[0.15em] text-[#C22300] uppercase">{tipografia.body.name} · {tipografia.body.role}</p>
            <p className="mt-4 text-2xl leading-snug font-medium" style={{ fontFamily: 'var(--font-cimbra-body)' }}>
              {tipografia.body.sample}
            </p>
          </Reveal>
        </div>

        {/* Reglas del sistema + Componentes */}
        <div className="mt-20 grid grid-cols-1 gap-14 border-t border-[#1C222B]/10 pt-14 lg:grid-cols-2">
          <Reveal variants={cimbraFade}>
            <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-cimbra-display)' }}>Reglas del sistema</h3>
            <ul className="mt-6 space-y-4">
              {designSystemNotes.map((note) => (
                <li key={note} className="border-t border-[#1C222B]/10 pt-4 text-sm leading-relaxed text-[#1C222B]/65 first:border-t-0 first:pt-0">
                  {note}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variants={cimbraFade} delay={0.08}>
            <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-cimbra-display)' }}>Componentes</h3>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <PressableCard as="button" className="px-5 py-3 text-sm font-semibold text-[#C22300]">Botón primario</PressableCard>
              <SegmentedControl options={planes.map((p) => p.name)} value={plan} onChange={setPlan} />
            </div>
            <div className="mt-6 space-y-6">
              {componentes.map((component) => (
                <p key={component.name} className="border-t border-[#1C222B]/10 pt-4 text-sm leading-relaxed text-[#1C222B]/65">
                  <b className="font-semibold text-[#1C222B]">{component.name}.</b> {component.desc}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Planes, aplicados al control segmentado de arriba */}
        <div className="mt-20 border-t border-[#1C222B]/10 pt-14">
          <Reveal variants={cimbraFade}>
            <p className="text-xs font-bold tracking-[0.15em] text-[#C22300] uppercase">Tarjeta de plan · aplicada</p>
          </Reveal>
          <StaggerGroup className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3" gap={0.06}>
            {planes.map((item) => (
              <RevealItem key={item.name} variants={cimbraFade}>
                <PressableCard className={item.name === plan ? 'p-6 ring-2 ring-[#FF6B4A]' : 'p-6'}>
                  {item.featured && <span className="mb-3 inline-block rounded-full bg-[#FF6B4A] px-3 py-1 text-[10px] font-bold tracking-[0.08em] text-[#1C222B] uppercase">Más elegido</span>}
                  <h4 className="text-lg font-bold" style={{ fontFamily: 'var(--font-cimbra-display)' }}>{item.name}</h4>
                  <p className="mt-2 text-2xl font-extrabold" style={{ fontFamily: 'var(--font-cimbra-display)' }}>{item.price}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#1C222B]/65">{item.copy}</p>
                </PressableCard>
              </RevealItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}

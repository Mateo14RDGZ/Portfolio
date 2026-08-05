'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { InfoToggle, TiltPanel, astraFade } from '@/components/case-studies/astra/astra-motion'
import { componentes, designSystemNotes, escenas, info, paleta, tipografia } from '@/components/case-studies/astra/data'

type Sample = { id: string; kind: 'color' | 'type' | 'component'; title: string; detail: string; sample?: string; hex?: string; font?: string }

const SAMPLES: Sample[] = [
  ...paleta.map((c) => ({ id: c.hex, kind: 'color' as const, title: c.name, detail: c.usage, hex: c.hex })),
  { id: 'display', kind: 'type', title: tipografia.display.name, detail: tipografia.display.role, sample: tipografia.display.sample, font: 'var(--font-astra-display)' },
  { id: 'body', kind: 'type', title: tipografia.body.name, detail: tipografia.body.role, sample: tipografia.body.sample, font: 'var(--font-astra-body)' },
  ...componentes.map((c) => ({ id: c.name, kind: 'component' as const, title: c.name, detail: c.desc })),
]

// Fixed, deterministic offsets - looks scattered on a table without any
// randomness that could differ between server and client render.
const TILT = [-3, 2, -2.5, 1.5, -1.5, 3, -2, 1, -1]
const LIFT = [0, 10, 4, 14, 2, 8, 0, 12, 6]

/**
 * Scene 3 replaces the old Sistema de diseño grid. The same facts (palette,
 * type, components) but presented as physical samples scattered on a table
 * instead of a tidy grid - picking one up (a click/tap) squares it and
 * brings it forward, an actual "examine this" gesture instead of a hover
 * tooltip.
 */
export function AstraSceneSala({ active }: { active: boolean }) {
  const [pickedUp, setPickedUp] = useState<string | null>(null)

  return (
    <div className="relative h-full w-full overflow-y-auto bg-[#F1F3F6] text-[#10151B]">
      <motion.div
        initial={false}
        animate={active ? 'visible' : 'hidden'}
        variants={astraFade}
        className="mx-auto flex min-h-full max-w-5xl flex-col justify-center px-6 py-24 sm:px-10"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-[11px] tracking-[0.28em] text-[#10151B]/65 uppercase">
            {escenas[2].n} · {escenas[2].label}
          </p>
          <InfoToggle text={info.sala} />
        </div>

        <div className="mt-10 flex flex-wrap items-start justify-center gap-5 sm:gap-7">
          {SAMPLES.map((sample, index) => {
            const isUp = pickedUp === sample.id
            const rotation = TILT[index % TILT.length]
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => setPickedUp((current) => (current === sample.id ? null : sample.id))}
                aria-pressed={isUp}
                aria-label={`Examinar muestra: ${sample.title}`}
                className="relative"
                style={{
                  marginTop: `${LIFT[index % LIFT.length]}px`,
                  transform: isUp ? 'rotate(0deg) scale(1.08)' : `rotate(${rotation}deg)`,
                  zIndex: isUp ? 10 : 1,
                  transition: 'transform 220ms cubic-bezier(0.23,1,0.32,1)',
                }}
              >
                <TiltPanel
                  className={`w-40 p-4 text-left sm:w-48 ${isUp ? 'shadow-[0_20px_45px_rgba(16,21,27,0.18)]' : 'shadow-[0_6px_18px_rgba(16,21,27,0.08)]'}`}
                >
                  {sample.kind === 'color' && (
                    <>
                      <div className="aspect-square w-full border border-[#10151B]/10" style={{ backgroundColor: sample.hex }} />
                      <p className="mt-3 text-sm font-medium">{sample.title}</p>
                      <p className="mt-0.5 font-mono text-[11px] text-[#10151B]/60 uppercase">{sample.hex}</p>
                    </>
                  )}
                  {sample.kind === 'type' && (
                    <>
                      <p className="text-[10px] tracking-[0.14em] text-[#10151B]/65 uppercase">{sample.title}</p>
                      <p className="mt-2 text-lg leading-snug" style={{ fontFamily: sample.font }}>
                        {sample.sample}
                      </p>
                    </>
                  )}
                  {sample.kind === 'component' && (
                    <>
                      <p className="text-sm font-medium">{sample.title}</p>
                      {isUp && <p className="mt-2 text-xs leading-relaxed text-[#10151B]/70">{sample.detail}</p>}
                    </>
                  )}
                  {sample.kind === 'color' && isUp && <p className="mt-2 text-xs leading-relaxed text-[#10151B]/70">{sample.detail}</p>}
                </TiltPanel>
              </button>
            )
          })}
        </div>

        <ul className="mx-auto mt-12 flex max-w-xl flex-col gap-3 border-t border-[#10151B]/10 pt-6">
          {designSystemNotes.map((note) => (
            <li key={note} className="text-xs leading-relaxed text-[#10151B]/65">
              {note}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

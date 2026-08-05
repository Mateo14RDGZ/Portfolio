'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { astraFade, InfoToggle } from '@/components/case-studies/astra/astra-motion'
import { camaras, escenas, info } from '@/components/case-studies/astra/data'

function DepthStack({ layers }: { layers: number }) {
  return (
    <div className="relative h-56 w-full sm:h-64" style={{ perspective: 1000 }}>
      {Array.from({ length: layers }).map((_, layer) => (
        <div
          key={layer}
          className="absolute inset-x-6 top-2 flex h-full flex-col gap-3 border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl transition-[opacity] duration-300 sm:inset-x-10"
          style={{
            transform: `translateZ(${-layer * 40}px) translateY(${layer * 14}px) scale(${1 - layer * 0.06})`,
            zIndex: layers - layer,
            opacity: 1 - layer * 0.32,
          }}
        >
          <div className="h-2 w-1/3 bg-white/20" />
          <div className="mt-auto grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
            <div className="h-6 bg-[#4F7FA0]/40" />
            <div className="h-6 bg-white/10" />
            <div className="h-6 bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Scene 4 replaces the old scroll-triggered Showcase. Same "responsive as
 * camera distance" idea, but now it's tap-driven, not scroll-driven -
 * choosing "Mobile" is itself the discovery, not a side effect of scrolling
 * past a sticky panel.
 */
export function AstraSceneProfundidad({ active }: { active: boolean }) {
  const [selected, setSelected] = useState<(typeof camaras)[number]['id']>(camaras[0].id)
  const camara = camaras.find((c) => c.id === selected) ?? camaras[0]

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#10151B]">
      <motion.div
        initial={false}
        animate={active ? 'visible' : 'hidden'}
        variants={astraFade}
        className="mx-auto flex h-full max-w-4xl flex-col justify-center px-6 py-16 sm:px-10"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-[11px] tracking-[0.28em] text-[#8FB4C9] uppercase">
            {escenas[3].n} · {escenas[3].label}
          </p>
          <InfoToggle text={info.profundidad} tone="dark" />
        </div>

        <DepthStack layers={camara.layers} />

        <div role="tablist" aria-label="Elegí una distancia de cámara" className="mt-8 flex justify-center gap-2">
          {camaras.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={c.id === selected}
              onClick={() => setSelected(c.id)}
              className={`border px-4 py-2 text-sm transition-colors duration-200 ${
                c.id === selected ? 'border-[#8FB4C9] bg-white/10 text-white' : 'border-white/15 text-white/50 hover:text-white/80'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl text-white" style={{ fontFamily: 'var(--font-astra-display)' }}>
            {camara.title}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/65">{camara.copy}</p>
        </div>
      </motion.div>
    </div>
  )
}

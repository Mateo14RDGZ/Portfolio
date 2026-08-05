'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { astraFade, CountUp, InfoToggle } from '@/components/case-studies/astra/astra-motion'
import { escenas, info, vehiculos } from '@/components/case-studies/astra/data'

/**
 * Scene 2 replaces the old Investigación section - a configurator, not a
 * moodboard. Switching units remounts the stat block (`key={vehicle.id}`)
 * so `CountUp` genuinely re-animates each spec instead of just swapping
 * text - the same signal a real configurator gives when you change trims.
 */
export function AstraSceneDato({ active }: { active: boolean }) {
  const [selectedId, setSelectedId] = useState<(typeof vehiculos)[number]['id']>(vehiculos[0].id)
  const vehicle = vehiculos.find((v) => v.id === selectedId) ?? vehiculos[0]

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#10151B]">
      <Image
        key={vehicle.id}
        src={vehicle.image}
        alt={`${vehicle.name}, vista lateral`}
        fill
        loading={active ? 'eager' : 'lazy'}
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10151B] via-[#10151B]/60 to-[#10151B]/70" />

      <motion.div
        initial={false}
        animate={active ? 'visible' : 'hidden'}
        variants={astraFade}
        className="relative flex h-full flex-col justify-between p-6 sm:p-10"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-[11px] tracking-[0.28em] text-[#8FB4C9] uppercase">
            {escenas[1].n} · {escenas[1].label}
          </p>
          <InfoToggle text={info.dato} tone="dark" />
        </div>

        <div>
          <div role="tablist" aria-label="Elegí una unidad" className="flex flex-wrap gap-2">
            {vehiculos.map((v) => (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={v.id === selectedId}
                onClick={() => setSelectedId(v.id)}
                className={`border px-4 py-2 text-sm transition-colors duration-200 ${
                  v.id === selectedId ? 'border-[#8FB4C9] bg-white/10 text-white' : 'border-white/15 text-white/50 hover:text-white/80'
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>

          <div key={vehicle.id} className="mt-6 flex flex-wrap items-end gap-x-10 gap-y-6 border-t border-white/10 pt-6">
            <div>
              <CountUp to={vehicle.range} suffix=" km" className="text-4xl text-white sm:text-5xl" style={{ fontFamily: 'var(--font-astra-display)' }} />
              <p className="mt-2 text-[10px] tracking-[0.16em] text-white/55 uppercase">Autonomía estimada</p>
            </div>
            <div>
              <span className="text-4xl text-white sm:text-5xl" style={{ fontFamily: 'var(--font-astra-display)' }}>
                {vehicle.accel}s
              </span>
              <p className="mt-2 text-[10px] tracking-[0.16em] text-white/55 uppercase">0–100 km/h</p>
            </div>
            <div>
              <CountUp to={vehicle.charge} suffix=" kW" className="text-4xl text-white sm:text-5xl" style={{ fontFamily: 'var(--font-astra-display)' }} />
              <p className="mt-2 text-[10px] tracking-[0.16em] text-white/55 uppercase">Carga rápida</p>
            </div>
          </div>
          <p className="mt-4 text-xs tracking-[0.1em] text-white/55 uppercase">{vehicle.type}</p>
        </div>
      </motion.div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { astraFade, CountUp, InfoToggle } from '@/components/case-studies/astra/astra-motion'
import { astraMeta, escenas, hotspots, info, vehiculos } from '@/components/case-studies/astra/data'

const vehicle = vehiculos[0]

/**
 * Scene 1 replaces the old Hero. Tilt on the image is decorative/atmospheric
 * only - the real discovery mechanic is the hotspots, which are plain
 * buttons that work identically on tap, click or keyboard. Mobile loses
 * nothing: it just doesn't get the ambient pointer-tilt, which was never
 * the point.
 */
export function AstraSceneObjeto({ active }: { active: boolean }) {
  const [openHotspot, setOpenHotspot] = useState<string | null>(null)
  const activeHotspot = hotspots.find((h) => h.id === openHotspot)

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#10151B]">
      <div className="absolute inset-0">
        <Image
          src={vehicle.image}
          alt="Arco E-9, SUV eléctrico, suspendido en una sala de exhibición con luz difusa"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10151B] via-[#10151B]/5 to-[#10151B]/50" />

      <motion.div
        initial={false}
        animate={active ? 'visible' : 'hidden'}
        variants={astraFade}
        className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-6 sm:p-10"
      >
        <div>
          <p className="text-[11px] tracking-[0.28em] text-[#8FB4C9] uppercase">
            {escenas[0].n} · {escenas[0].label}
          </p>
          <h1 className="mt-3 max-w-md text-[clamp(1.6rem,4.2vw,2.6rem)] leading-[1.08] text-white" style={{ fontFamily: 'var(--font-astra-display)' }}>
            {astraMeta.headline}
          </h1>
        </div>
        <div className="pointer-events-auto">
          <InfoToggle text={info.objeto} tone="dark" />
        </div>
      </motion.div>

      {/* Hotspots - the real discovery mechanic, tap/click/keyboard-equal */}
      {hotspots.map((hotspot) => (
        <button
          key={hotspot.id}
          type="button"
          style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
          onClick={() => setOpenHotspot((current) => (current === hotspot.id ? null : hotspot.id))}
          aria-expanded={openHotspot === hotspot.id}
          aria-label={`Ver dato: ${hotspot.label}`}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          <span
            className={`flex size-8 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-200 ${
              openHotspot === hotspot.id ? 'border-[#8FB4C9] bg-[#8FB4C9]/25' : 'border-white/45 bg-white/10 hover:border-white/70'
            }`}
          >
            <span className={`size-2 rounded-full ${openHotspot === hotspot.id ? 'bg-[#8FB4C9]' : 'bg-white'}`} />
          </span>
        </button>
      ))}

      <div className="pointer-events-none absolute inset-x-0 bottom-24 flex justify-center px-6 sm:bottom-28">
        <AnimatePresence mode="wait">
          {activeHotspot && (
            <motion.div
              key={activeHotspot.id}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className="pointer-events-auto flex items-center gap-4 border border-white/15 bg-white/[0.06] px-5 py-4 backdrop-blur-2xl"
            >
              <CountUp
                to={activeHotspot.value}
                suffix={activeHotspot.suffix}
                className="text-3xl text-white"
                style={{ fontFamily: 'var(--font-astra-display)' }}
              />
              <div className="max-w-[16rem] border-l border-white/15 pl-4">
                <p className="text-[10px] tracking-[0.16em] text-[#8FB4C9] uppercase">{activeHotspot.label}</p>
                <p className="mt-1 text-sm leading-snug text-white/70">{activeHotspot.copy}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

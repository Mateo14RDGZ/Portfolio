'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { astraFade, InfoToggle, TiltPanel } from '@/components/case-studies/astra/astra-motion'
import { cta, escenas, info, proceso, tecnologias } from '@/components/case-studies/astra/data'

/**
 * Scene 5 - the exit, not a marketing block. The vertical seam behind the
 * content is a purely decorative door motif; the actual CTA stays fully
 * visible and clickable at all times rather than gated behind a reveal, so
 * the one action that matters here never needs an extra step.
 */
export function AstraSceneCierre({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-y-auto bg-[#F1F3F6] text-[#10151B]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#10151B]/10" />

      <motion.div
        initial={false}
        animate={active ? 'visible' : 'hidden'}
        variants={astraFade}
        className="mx-auto flex min-h-full max-w-3xl flex-col justify-center px-6 py-24 sm:px-10"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-[11px] tracking-[0.28em] text-[#10151B]/65 uppercase">
            {escenas[4].n} · {escenas[4].label}
          </p>
          <InfoToggle text={info.cierre} />
        </div>

        <h2 className="mt-6 max-w-xl text-[clamp(1.9rem,5vw,3rem)] leading-[1.1] tracking-[-0.01em]" style={{ fontFamily: 'var(--font-astra-display)' }}>
          {cta.pregunta}
        </h2>

        <TiltPanel className="mt-8 inline-flex w-fit p-1">
          <Link
            href="/#contact"
            className="inline-flex h-12 items-center bg-[#10151B] px-6 text-sm text-white transition-opacity duration-300 hover:opacity-85"
          >
            {cta.linkLabel}
          </Link>
        </TiltPanel>

        <ol className="mt-16 flex flex-col gap-4 border-t border-[#10151B]/10 pt-8 sm:flex-row sm:gap-3">
          {proceso.map((step) => (
            <li key={step.n} className="flex-1 border-t border-[#10151B]/10 pt-3 first:border-t-0 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-3 sm:first:border-l-0">
              <span className="text-xs tracking-[0.14em] text-[#10151B]/65">{step.n}</span>
              <p className="mt-1 text-sm font-medium">{step.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-[#10151B]/60">{step.copy}</p>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-xs text-[#10151B]/65">Construido con {tecnologias.join(', ')}.</p>
      </motion.div>
    </div>
  )
}

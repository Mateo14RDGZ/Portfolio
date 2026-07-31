'use client'

import { motion, useReducedMotion } from 'motion/react'

/**
 * Ambient animated background for the hero: a faint grid, two slowly drifting
 * light blooms and a soft vignette. Purely decorative.
 */
export function AuroraBackdrop() {
  const reduceMotion = useReducedMotion()

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Structural grid */}
      <div className="grid-lines absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_35%,black,transparent)]" />

      {/* Drifting blooms */}
      <motion.div
        className="bg-primary/12 absolute -top-40 left-1/2 size-[42rem] rounded-full blur-[140px]"
        initial={{ x: '-60%', opacity: 0 }}
        animate={
          reduceMotion
            ? { x: '-50%', opacity: 1 }
            : { x: ['-60%', '-40%', '-60%'], opacity: 1 }
        }
        transition={{
          x: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 1.4 },
        }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 size-[34rem] rounded-full bg-[oklch(0.5_0.09_215)]/20 blur-[150px]"
        initial={{ y: 0, opacity: 0 }}
        animate={reduceMotion ? { opacity: 1 } : { y: [0, -60, 0], opacity: 1 }}
        transition={{
          y: { duration: 22, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 1.6, delay: 0.2 },
        }}
      />

      {/* Horizon line */}
      <div className="via-primary/25 absolute top-[62%] right-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent" />

      {/* Bottom fade into the page */}
      <div className="from-background absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t to-transparent" />
    </div>
  )
}

/** Reusable faint grid + fade used behind non-hero sections. */
export function SectionBackdrop() {
  return (
    <div
      aria-hidden
      className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]"
    />
  )
}

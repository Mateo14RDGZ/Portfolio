'use client'

import type { Variants } from 'motion/react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import Image, { type ImageProps } from 'next/image'

/**
 * Bruma's own signature entrance: a long, quiet fade with almost no
 * vertical travel - "light arriving slowly through a window" rather than
 * the site's usual brisk fade-up. Passed into the shared <Reveal
 * variants={...}> so the reduced-motion/viewport mechanics stay shared
 * while the feel stays project-specific. The 1.1s duration is intentional:
 * per the emil-design-eng skill, the "stay under 300ms" rule is for routine
 * UI feedback - marketing/explanatory content earns a slower entrance.
 */
export const brumaFade: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.22, 0.61, 0.36, 1] } },
}

/**
 * Custom easing curves for Bruma's own routine UI (the index overlay) -
 * stronger than CSS's built-in easings, per emil-design-eng. Entrance is
 * slower/deliberate (opening a contents page), exit is snappier
 * (asymmetric enter/exit is a core Kowalski principle: fast where the
 * system responds, slower where the user is asked to pause).
 */
export const BRUMA_EASE_OUT = [0.23, 1, 0.32, 1] as const
export const BRUMA_INDEX_ENTER_MS = 380
export const BRUMA_INDEX_EXIT_MS = 200

/**
 * A photograph with a very small, slow scroll parallax - never more than
 * ~12px, scoped to its own scroll-through-viewport progress. Always renders
 * the same DOM shape regardless of reduced-motion: branching the tree
 * itself (rendering <Image> directly vs. wrapping it in <motion.div>) would
 * mismatch between SSR - where `useReducedMotion` has no `window` and
 * resolves false - and a client whose OS preference resolves true,
 * triggering a hydration error. Reduced motion instead pins the transform
 * to a static value, changing behavior without changing structure.
 */
export function ParallaxImage(props: ImageProps & { wrapperClassName?: string }) {
  const { wrapperClassName, ...imageProps } = props
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-12, 12])

  return (
    <div ref={containerRef} className={wrapperClassName}>
      <motion.div style={{ y: reduceMotion ? 0 : y }} className="h-[calc(100%+24px)] w-full -translate-y-3">
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is required by ImageProps, enforced at compile time */}
        <Image {...imageProps} />
      </motion.div>
    </div>
  )
}

export function EditorialLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="group inline-flex items-center gap-2 text-sm font-medium">
      <span className="border-b border-current pb-0.5 transition-[padding-bottom] duration-300 group-hover:pb-1.5">{children}</span>
    </a>
  )
}

/**
 * A note living beside the main text - desktop: an always-open narrow
 * side column next to its paragraph. Mobile: a native <details> disclosure,
 * collapsed by default, so the technical/supporting notes (palette hex
 * values, findings, rules) don't add to the page's felt density on a
 * phone. Content is never removed from the DOM either way - <details>
 * keeps it present (and crawlable) regardless of open state, it only
 * changes what's visually expanded. No JS, no added motion: the native
 * disclosure marker is the only affordance.
 */
export function Marginalia({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <details className="border-t border-[#1D1B18]/12 py-4 sm:hidden">
        <summary className="cursor-pointer text-[10px] tracking-[0.18em] text-[#4A3324] uppercase">{label}</summary>
        <div className="mt-3 text-sm leading-relaxed text-[#1D1B18]/75">{children}</div>
      </details>
      <aside className="hidden border-l border-[#1D1B18]/20 pl-5 sm:block">
        <p className="text-[10px] tracking-[0.18em] text-[#4A3324] uppercase">{label}</p>
        <div className="mt-3 text-sm leading-relaxed text-[#1D1B18]/75">{children}</div>
      </aside>
    </>
  )
}

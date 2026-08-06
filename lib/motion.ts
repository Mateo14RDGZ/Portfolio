import { useSyncExternalStore } from 'react'
import type { Transition, Variants } from 'motion/react'

/** Shared easing curve used across the site for a consistent, premium feel. */
/** A crisp ease-out shared by Motion component transitions. */
export const motionTokens = {
  ease: [0.22, 1, 0.36, 1],
  duration: {
    fast: 0.2,
    normal: 0.45,
    slow: 0.65,
  },
  distance: {
    small: 12,
    normal: 20,
    large: 32,
  },
  stagger: {
    fast: 0.04,
    normal: 0.07,
  },
} as const

export const EASE = motionTokens.ease

/** Backwards-compatible aliases for existing component transitions. */
export const MOTION = {
  micro: motionTokens.duration.fast,
  quick: 0.32,
  medium: motionTokens.duration.normal,
  revealDistance: motionTokens.distance.normal,
} as const

export const smooth: Transition = {
  duration: MOTION.medium,
  ease: EASE,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: MOTION.revealDistance },
  visible: { opacity: 1, y: 0, transition: smooth },
}

export const compactFadeUp: Variants = {
  hidden: { opacity: 0, y: motionTokens.distance.small },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: smooth },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: smooth },
}

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: smooth },
}

/** Parent container that staggers its children's entrance. */
export function stagger(staggerChildren: number = motionTokens.stagger.normal, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: Math.min(Math.max(staggerChildren, 0.04), 0.08), delayChildren },
    },
  }
}

/** Viewport config so sections animate once, slightly before fully in view. */
export const viewportOnce = { once: true, margin: '-40px', amount: 0.12 } as const

const COMPACT_MOTION_QUERY = '(max-width: 767px), (hover: none) and (pointer: coarse)'

/**
 * A stable breakpoint signal for choosing lighter motion on touch and compact
 * screens. It changes only on a breakpoint transition, never on scroll.
 */
export function useCompactMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia(COMPACT_MOTION_QUERY)
      media.addEventListener('change', onStoreChange)
      return () => media.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia(COMPACT_MOTION_QUERY).matches,
    () => false,
  )
}

// Matches Tailwind's `sm` breakpoint exactly (min-width: 640px), so JS-branched
// content switches at the same boundary as the `sm:` CSS used alongside it.
const MOBILE_FIRST_QUERY = '(max-width: 639px)'

/**
 * Same mechanism as useCompactMotion, but for the Home page's Phase 4
 * mobile/desktop content branches (Services, About+WhyMe, Faq) specifically.
 * The server snapshot defaults to `true` (mobile-shaped) rather than `false`:
 * ~99% of this site's traffic is mobile, and only mobile Lighthouse/CLS is
 * measured, so any brief post-hydration correction lands on the minority
 * desktop path instead of the majority mobile one. Kept separate from
 * useCompactMotion so its default doesn't affect that hook's many existing
 * call sites.
 */
export function useMobileFirst() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia(MOBILE_FIRST_QUERY)
      media.addEventListener('change', onStoreChange)
      return () => media.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia(MOBILE_FIRST_QUERY).matches,
    () => true,
  )
}

import type { Transition, Variants } from 'motion/react'

/** Shared easing curve used across the site for a consistent, premium feel. */
export const EASE = [0.16, 1, 0.3, 1] as const

export const smooth: Transition = {
  duration: 0.7,
  ease: EASE,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: smooth },
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
export function stagger(staggerChildren = 0.09, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
  }
}

/** Viewport config so sections animate once, slightly before fully in view. */
export const viewportOnce = { once: true, margin: '-80px' } as const

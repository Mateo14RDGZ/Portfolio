'use client'

import { motion, type Variants } from 'motion/react'
import type { ElementType, ReactNode } from 'react'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Delay before this element animates in, in seconds. */
  delay?: number
  variants?: Variants
  as?: ElementType
}

/** Fades and lifts its children into view the first time they are scrolled to. */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}

type StaggerGroupProps = {
  children: ReactNode
  className?: string
  gap?: number
  delay?: number
}

/**
 * Wraps a list of `RevealItem`s and releases them one after another.
 * Children must use `RevealItem` (or any motion element with the same variants).
 */
export function StaggerGroup({
  children,
  className,
  gap = 0.09,
  delay = 0,
}: StaggerGroupProps) {
  return (
    <motion.div
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  )
}

/** A single child of `StaggerGroup`. */
export function RevealItem({
  children,
  className,
  variants = fadeUp,
}: {
  children: ReactNode
  className?: string
  variants?: Variants
}) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}

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
 * while the feel stays project-specific.
 */
export const brumaFade: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.22, 0.61, 0.36, 1] } },
}

/** A photograph with a very small, slow scroll parallax - never more than ~12px, scoped to its own scroll-through-viewport progress. */
export function ParallaxImage(props: ImageProps & { wrapperClassName?: string }) {
  const { wrapperClassName, ...imageProps } = props
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-12, 12])

  return (
    <div ref={containerRef} className={wrapperClassName}>
      {reduceMotion ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- alt is required by ImageProps, enforced at compile time
        <Image {...imageProps} />
      ) : (
        <motion.div style={{ y }} className="h-[calc(100%+24px)] w-full -translate-y-3">
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is required by ImageProps, enforced at compile time */}
          <Image {...imageProps} />
        </motion.div>
      )}
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

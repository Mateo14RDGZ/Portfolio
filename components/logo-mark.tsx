'use client'

import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ALL_PATHS } from '@/components/logo-path-data'
import { cn } from '@/lib/utils'

type LogoMarkProps = {
  className?: string
  animateIntro?: boolean
  interactive?: boolean
  onSequenceComplete?: () => void
  title?: string
}

const DRAW_EASE = [0.65, 0, 0.35, 1] as const

function FilledPaths() {
  return ALL_PATHS.map((path, index) => (
    <path key={index} d={path} fill="currentColor" fillRule="evenodd" />
  ))
}

/**
 * Exact MR14 silhouette plus true SVG center-line paths used for the one-shot draw.
 * The animated strokes never alter the geometry of the final approved mark.
 */
export function LogoMark({
  className,
  animateIntro = true,
  interactive = true,
  onSequenceComplete,
  title = 'MR14',
}: LogoMarkProps) {
  const reduceMotion = useReducedMotion()
  const shouldDraw = animateIntro && !reduceMotion
  const instanceId = useId().replace(/:/g, '')
  const clipId = `mr14-fill-${instanceId}`
  const shineId = `mr14-shine-${instanceId}`

  const strokeInitial = shouldDraw ? { pathLength: 0, opacity: 1 } : false

  return (
    <motion.svg
      viewBox="0 0 768 768"
      role="img"
      aria-label={title}
      className={cn('block overflow-visible text-[#171218]', className)}
      initial={false}
      whileHover={interactive ? { filter: 'drop-shadow(0 0 10px rgba(255,93,58,0.2))' } : undefined}
      transition={{ duration: 0.35, ease: DRAW_EASE }}
      style={{ transformOrigin: '50% 50%', willChange: 'filter' }}
    >
      <defs>
        <clipPath id={clipId}>
          <FilledPaths />
        </clipPath>
        <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.5" stopColor="white" stopOpacity="0.62" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Final mark: exact filled paths, introduced only after the drawing is complete. */}
      <motion.g
        initial={shouldDraw ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldDraw ? 0.4 : 0, delay: shouldDraw ? 1.95 : 0, ease: DRAW_EASE }}
      >
        <FilledPaths />
      </motion.g>

      {shouldDraw ? (
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="butt"
          strokeLinejoin="round"
        >
          {/* The two physical circle segments read as one continuous outer trace. */}
          <motion.path
            d="M 190 129 C 304 35 486 34 610 137 C 724 232 741 407 664 529"
            strokeWidth="28"
            pathLength="1"
            initial={strokeInitial}
            animate={{ pathLength: 1, opacity: 0 }}
            transition={{ pathLength: { duration: 1.2, ease: DRAW_EASE }, opacity: { duration: 0.08, delay: 2.35, ease: DRAW_EASE } }}
          />
          <motion.path
            d="M 99 275 C 40 420 91 582 218 656 C 344 729 507 710 610 620"
            strokeWidth="28"
            pathLength="1"
            initial={strokeInitial}
            animate={{ pathLength: 1, opacity: 0 }}
            transition={{ pathLength: { duration: 0.95, delay: 0.25, ease: DRAW_EASE }, opacity: { duration: 0.08, delay: 2.35, ease: DRAW_EASE } }}
          />

          {/* M begins before the circle completes, keeping the gesture connected. */}
          <motion.path
            d="M 126 213 L 126 505 M 126 213 L 264 382 L 384 254 L 384 659 M 151 162 L 295 302"
            strokeWidth="32"
            pathLength="1"
            initial={strokeInitial}
            animate={{ pathLength: 1, opacity: 0 }}
            transition={{ pathLength: { duration: 0.9, delay: 0.5, ease: DRAW_EASE }, opacity: { duration: 0.08, delay: 2.35, ease: DRAW_EASE } }}
          />

          {/* R continues from the shared central stem into its bowl and leg. */}
          <motion.path
            d="M 386 253 L 517 253 C 625 253 627 403 518 404 L 451 404 L 665 608 M 414 404 L 512 502"
            strokeWidth="32"
            pathLength="1"
            initial={strokeInitial}
            animate={{ pathLength: 1, opacity: 0 }}
            transition={{ pathLength: { duration: 0.9, delay: 1, ease: DRAW_EASE }, opacity: { duration: 0.08, delay: 2.35, ease: DRAW_EASE } }}
          />

          {/* 14 closes the construction with two compact strokes. */}
          <motion.path
            d="M 432 620 L 432 539 L 420 550 M 531 620 L 531 535 L 476 592 L 548 592"
            strokeWidth="22"
            pathLength="1"
            initial={strokeInitial}
            animate={{ pathLength: 1, opacity: 0 }}
            transition={{ pathLength: { duration: 0.6, delay: 1.5, ease: DRAW_EASE }, opacity: { duration: 0.08, delay: 2.35, ease: DRAW_EASE } }}
          />
        </g>
      ) : null}

      {/* A single restrained highlight closes the sequence; it never loops. */}
      {shouldDraw ? (
        <motion.rect
          x="-220"
          y="0"
          width="130"
          height="768"
          fill={`url(#${shineId})`}
          clipPath={`url(#${clipId})`}
          initial={{ x: -220, opacity: 0 }}
          animate={{ x: 960, opacity: [0, 0.48, 0] }}
          transition={{ duration: 0.6, delay: 2.43, ease: DRAW_EASE }}
          onAnimationComplete={onSequenceComplete}
        />
      ) : null}
    </motion.svg>
  )
}

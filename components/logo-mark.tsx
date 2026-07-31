'use client'

import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ALL_PATHS, CIRCLE_PATHS, MONOGRAM_PATHS, NUMBER_PATHS } from '@/components/logo-path-data'
import { cn } from '@/lib/utils'

type LogoMarkProps = {
  className?: string
  animateIntro?: boolean
  ambient?: boolean
  interactive?: boolean
  onSequenceComplete?: () => void
  title?: string
}

const DRAW_EASE = [0.16, 1, 0.3, 1] as const

function Paths({ paths }: { paths: readonly string[] }) {
  return paths.map((path, index) => <path key={index} d={path} fill="currentColor" fillRule="evenodd" />)
}

/** Exact vector silhouette of the approved MR14 mark, with an optional one-shot reveal. */
export function LogoMark({
  className,
  animateIntro = false,
  ambient = true,
  interactive = true,
  onSequenceComplete,
  title = 'MR14',
}: LogoMarkProps) {
  const reduceMotion = useReducedMotion()
  const shouldAnimate = animateIntro && !reduceMotion
  const shouldFloat = ambient && !animateIntro && !reduceMotion
  const instanceId = useId().replace(/:/g, '')
  const circleMaskId = `mr14-circle-${instanceId}`
  const monogramMaskId = `mr14-monogram-${instanceId}`
  const clipId = `mr14-clip-${instanceId}`
  const sweepId = `mr14-sweep-${instanceId}`
  const ambientSweepId = `mr14-ambient-sweep-${instanceId}`

  return (
    <motion.svg
      viewBox="0 0 768 768"
      role="img"
      aria-label={title}
      className={cn('block overflow-visible text-[#171218]', className)}
      initial={shouldAnimate ? { opacity: 0, scale: 0.985 } : false}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      whileHover={interactive ? { scale: 1.03, rotate: 1.2, filter: 'drop-shadow(0 0 12px rgba(255,93,58,0.2))' } : undefined}
      transition={{ duration: shouldAnimate ? 0.55 : 0.35, ease: DRAW_EASE }}
      style={{ transformOrigin: '50% 50%', willChange: 'transform' }}
    >
      <defs>
        <mask id={circleMaskId} maskUnits="userSpaceOnUse" x="0" y="0" width="768" height="768">
          <rect width="768" height="768" fill="black" />
          <motion.path
            d="M 185 132 C 302 35 489 34 614 143 C 730 244 742 424 659 548 C 566 686 379 727 229 650 C 90 578 39 412 99 272"
            fill="none"
            stroke="white"
            strokeWidth="64"
            strokeLinecap="round"
            pathLength="1"
            initial={{ pathLength: shouldAnimate ? 0 : 1 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: shouldAnimate ? 1.25 : 0, delay: shouldAnimate ? 0.35 : 0, ease: DRAW_EASE }}
          />
        </mask>

        <mask id={monogramMaskId} maskUnits="userSpaceOnUse" x="0" y="0" width="768" height="768">
          <rect width="768" height="768" fill="black" />
          <motion.path
            d="M 125 210 L 125 510 M 130 210 L 264 382 L 384 254 L 384 663 M 145 158 L 296 302"
            fill="none"
            stroke="white"
            strokeWidth="74"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            initial={{ pathLength: shouldAnimate ? 0 : 1 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: shouldAnimate ? 0.95 : 0, delay: shouldAnimate ? 1.42 : 0, ease: DRAW_EASE }}
          />
          <motion.path
            d="M 383 252 L 520 252 C 635 252 635 405 520 405 L 451 405 L 666 609 M 412 403 L 514 505"
            fill="none"
            stroke="white"
            strokeWidth="76"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            initial={{ pathLength: shouldAnimate ? 0 : 1 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: shouldAnimate ? 0.95 : 0, delay: shouldAnimate ? 2.12 : 0, ease: DRAW_EASE }}
          />
        </mask>

        <clipPath id={clipId}>
          <Paths paths={ALL_PATHS} />
        </clipPath>

        <linearGradient id={sweepId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.5" stopColor="white" stopOpacity="0.9" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={ambientSweepId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff5d3a" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ff8a70" stopOpacity="0.72" />
          <stop offset="1" stopColor="#ff5d3a" stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.g
        animate={shouldFloat ? { scale: [1, 1.012, 1], rotate: [-0.28, 0.28, -0.28] } : undefined}
        transition={shouldFloat ? { duration: 5.8, repeat: Infinity, ease: 'easeInOut' } : undefined}
        style={{ transformOrigin: '384px 384px' }}
      >
        <g mask={shouldAnimate ? `url(#${circleMaskId})` : undefined}>
          <Paths paths={CIRCLE_PATHS} />
        </g>
        <g mask={shouldAnimate ? `url(#${monogramMaskId})` : undefined}>
          <Paths paths={MONOGRAM_PATHS} />
        </g>
        <motion.g
          initial={{ opacity: shouldAnimate ? 0 : 1, y: shouldAnimate ? 8 : 0 }}
          animate={shouldFloat ? { opacity: [0.88, 1, 0.88], scale: [1, 1.035, 1] } : { opacity: 1, y: 0 }}
          transition={shouldFloat
            ? { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }
            : { duration: shouldAnimate ? 0.45 : 0, delay: shouldAnimate ? 2.92 : 0, ease: DRAW_EASE }}
          style={{ transformOrigin: '485px 575px' }}
        >
          <Paths paths={NUMBER_PATHS} />
        </motion.g>
      </motion.g>

      {shouldAnimate ? (
        <motion.rect
          x="-260"
          y="0"
          width="150"
          height="768"
          fill={`url(#${sweepId})`}
          clipPath={`url(#${clipId})`}
          initial={{ x: -260, opacity: 0 }}
          animate={{ x: 990, opacity: [0, 0.72, 0] }}
          transition={{ duration: 0.9, delay: 3.32, ease: 'easeInOut' }}
          onAnimationComplete={onSequenceComplete}
        />
      ) : null}

      {shouldFloat ? (
        <g aria-hidden="true">
          <motion.path
            d="M 185 132 C 302 35 489 34 614 143 C 730 244 742 424 659 548 C 566 686 379 727 229 650 C 90 578 39 412 99 272"
            fill="none"
            stroke="#ff6d4d"
            strokeWidth="20"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="0.13 0.87"
            clipPath={`url(#${clipId})`}
            animate={{ strokeDashoffset: [0, -1], opacity: [0.38, 0.72, 0.38] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.rect
            x="-260"
            y="0"
            width="165"
            height="768"
            fill={`url(#${ambientSweepId})`}
            clipPath={`url(#${clipId})`}
            animate={{ x: [-260, 990], opacity: [0, 0.5, 0] }}
            transition={{ duration: 3.9, repeat: Infinity, ease: 'linear' }}
          />
        </g>
      ) : null}
    </motion.svg>
  )
}

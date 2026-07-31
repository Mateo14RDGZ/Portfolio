'use client'

import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type LogoMarkProps = {
  className?: string
  animateIntro?: boolean
  interactive?: boolean
  onSequenceComplete?: () => void
  title?: string
}

type LogoStroke = {
  d: string
  revealWidth: number
  delay: number
  duration: number
}

const DRAW_EASE = [0.65, 0, 0.35, 1] as const
const LOGO_IMAGE = '/mr14-logo-vector.svg'
const SHINE_END = 2.72
const STATIC_HOLD_DURATION = 6
const FADE_DURATION = 0.18
const BLANK_DURATION = 0.1
const LOOP_DURATION = SHINE_END + STATIC_HOLD_DURATION + FADE_DURATION + BLANK_DURATION
const FADE_OUT_AT = (SHINE_END + STATIC_HOLD_DURATION) / LOOP_DURATION
const HIDDEN_AT = (SHINE_END + STATIC_HOLD_DURATION + FADE_DURATION) / LOOP_DURATION

/**
 * These centre lines only drive the reveal mask. The visible artwork is always
 * the approved vector master, including the final settled frame, so the
 * animation cannot alter the logo's proportions or intersections.
 */
const LOGO_STROKES: readonly LogoStroke[] = [
  {
    d: 'M 170 130 C 304 25 500 32 625 145 C 730 245 745 420 645 555',
    revealWidth: 90,
    delay: 0,
    duration: 1.2,
  },
  {
    d: 'M 95 240 C 35 420 91 600 225 672 C 365 745 525 710 635 600',
    revealWidth: 90,
    delay: 0.18,
    duration: 1.08,
  },
  {
    d: 'M 126 535 L 126 190 L 264 382 L 384 240 L 384 700 M 120 130 L 320 325',
    revealWidth: 130,
    delay: 0.46,
    duration: 0.96,
  },
  {
    d: 'M 370 235 L 535 235 C 650 235 650 420 520 420 L 435 420 L 720 640 M 395 385 L 535 530',
    revealWidth: 130,
    delay: 0.92,
    duration: 0.92,
  },
  {
    d: 'M 432 650 L 432 515 L 400 555 M 531 650 L 531 515 L 455 605 L 570 605',
    revealWidth: 90,
    delay: 1.42,
    duration: 0.62,
  },
] as const

function LogoImage({ mask }: { mask?: string }) {
  return (
    <image
      href={LOGO_IMAGE}
      x="0"
      y="0"
      width="768"
      height="768"
      preserveAspectRatio="xMidYMid meet"
      mask={mask}
    />
  )
}

export function LogoMark({
  className,
  animateIntro = false,
  interactive = true,
  onSequenceComplete,
  title = 'MR14',
}: LogoMarkProps) {
  const reduceMotion = useReducedMotion()
  const shouldDraw = animateIntro && !reduceMotion
  const instanceId = useId().replace(/:/g, '')
  const shineId = `mr14-shine-${instanceId}`
  const shineMaskId = `mr14-shine-mask-${instanceId}`
  const drawMaskId = `mr14-draw-mask-${instanceId}`

  return (
    <motion.svg
      viewBox="0 0 768 768"
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      role="img"
      aria-label={title}
      className={cn('block overflow-visible text-[#171218]', className)}
      initial={false}
      whileHover={interactive ? { scale: 1.018, rotate: 0.75 } : undefined}
      transition={{ duration: 0.38, ease: DRAW_EASE }}
      style={{
        transformOrigin: '50% 50%',
        backfaceVisibility: 'hidden',
      }}
    >
      <defs>
        <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.5" stopColor="white" stopOpacity="0.55" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask
          id={shineMaskId}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="768"
          height="768"
          style={{ maskType: 'alpha' }}
        >
          <LogoImage />
        </mask>
        {shouldDraw ? (
          <mask id={drawMaskId} maskUnits="userSpaceOnUse" x="0" y="0" width="768" height="768">
            <rect width="768" height="768" fill="black" />
            <g fill="none" stroke="white" strokeLinecap="butt" strokeLinejoin="round">
              {LOGO_STROKES.map((path) => (
                <motion.path
                  key={path.d}
                  d={path.d}
                  strokeWidth={path.revealWidth}
                  pathLength={1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 0, 1, 1, 0, 0] }}
                  transition={{
                    duration: LOOP_DURATION,
                    times: [
                      0,
                      path.delay / LOOP_DURATION,
                      (path.delay + path.duration) / LOOP_DURATION,
                      0.994,
                      0.995,
                      1,
                    ],
                    repeat: Infinity,
                    ease: DRAW_EASE,
                  }}
                />
              ))}
            </g>
          </mask>
        ) : null}
      </defs>

      {shouldDraw ? (
        <motion.g
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            duration: LOOP_DURATION,
            times: [0, FADE_OUT_AT, HIDDEN_AT, 1],
            repeat: Infinity,
            ease: DRAW_EASE,
          }}
        >
          <LogoImage mask={`url(#${drawMaskId})`} />
        </motion.g>
      ) : (
        <LogoImage />
      )}

      {shouldDraw ? (
        <motion.rect
          x="-210"
          y="0"
          width="150"
          height="768"
          fill={`url(#${shineId})`}
          mask={`url(#${shineMaskId})`}
          initial={{ x: -210, opacity: 0 }}
          animate={{
            x: [-210, -210, 1020, 1020, -210],
            opacity: [0, 0, 0.38, 0, 0],
          }}
          transition={{
            duration: LOOP_DURATION,
            times: [0, 2.08 / LOOP_DURATION, 2.4 / LOOP_DURATION, 2.72 / LOOP_DURATION, 1],
            repeat: Infinity,
            ease: DRAW_EASE,
          }}
          style={{ willChange: 'transform, opacity' }}
          onAnimationComplete={onSequenceComplete}
        />
      ) : null}
    </motion.svg>
  )
}

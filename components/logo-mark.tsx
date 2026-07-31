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
const LOGO_IMAGE = '/mr14-logo-transparent.png'
const LOOP_DURATION = 6
const SETTLED_AT = 2.06 / LOOP_DURATION
const FADE_OUT_AT = 5.28 / LOOP_DURATION
const HIDDEN_AT = 5.7 / LOOP_DURATION

/**
 * These centre lines only drive the reveal mask. The visible artwork is always
 * the approved transparent master, including the final settled frame, so the
 * animation cannot alter the logo's proportions or intersections.
 */
const LOGO_STROKES: readonly LogoStroke[] = [
  {
    d: 'M 190 129 C 304 35 486 34 610 137 C 724 232 741 407 664 529',
    revealWidth: 58,
    delay: 0,
    duration: 1.2,
  },
  {
    d: 'M 99 275 C 40 420 91 582 218 656 C 344 729 507 710 610 620',
    revealWidth: 58,
    delay: 0.18,
    duration: 1.08,
  },
  {
    d: 'M 126 505 L 126 213 L 264 382 L 384 254 L 384 659 M 151 162 L 295 302',
    revealWidth: 72,
    delay: 0.46,
    duration: 0.96,
  },
  {
    d: 'M 386 253 L 517 253 C 625 253 627 403 518 404 L 451 404 L 665 608 M 414 404 L 512 502',
    revealWidth: 72,
    delay: 0.92,
    duration: 0.92,
  },
  {
    d: 'M 432 620 L 432 539 L 420 550 M 531 620 L 531 535 L 476 592 L 548 592',
    revealWidth: 46,
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
                      0.98,
                      0.981,
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
        <>
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0, 0] }}
            transition={{
              duration: LOOP_DURATION,
              times: [0, 0.012, FADE_OUT_AT, HIDDEN_AT, 1],
              repeat: Infinity,
              ease: DRAW_EASE,
            }}
          >
            <LogoImage mask={`url(#${drawMaskId})`} />
          </motion.g>
          <motion.image
            href={LOGO_IMAGE}
            x="0"
            y="0"
            width="768"
            height="768"
            preserveAspectRatio="xMidYMid meet"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
            transition={{
              duration: LOOP_DURATION,
              times: [0, 1.82 / LOOP_DURATION, SETTLED_AT, FADE_OUT_AT, HIDDEN_AT, 1],
              repeat: Infinity,
              ease: DRAW_EASE,
            }}
          />
        </>
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

'use client'

import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type LogoMarkProps = {
  className?: string
  animateIntro?: boolean
  loopIntro?: boolean
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
const DRAW_END = 2.12
const SHINE_START = 2.14
const SHINE_END = 2.72
const STATIC_HOLD_DURATION = 6
const FADE_DURATION = 0.18
const BLANK_DURATION = 0.1
const LOOP_DURATION = SHINE_END + STATIC_HOLD_DURATION + FADE_DURATION + BLANK_DURATION
const FADE_OUT_AT = (SHINE_END + STATIC_HOLD_DURATION) / LOOP_DURATION
const HIDDEN_AT = (SHINE_END + STATIC_HOLD_DURATION + FADE_DURATION) / LOOP_DURATION

/**
 * Centre lines are deliberately grouped by the logo's actual visual strokes.
 * They provide a clean construction sequence; the approved SVG takes over at
 * the end so every settled frame remains pixel-perfect.
 */
const LOGO_STROKES: readonly LogoStroke[] = [
  {
    d: 'M 188 126 C 307 42 493 43 616 151 C 716 240 733 417 658 535',
    revealWidth: 29,
    delay: 0,
    duration: 1.2,
  },
  {
    d: 'M 83 267 C 35 420 95 599 221 670 C 365 746 526 710 615 607',
    revealWidth: 29,
    delay: 0.2,
    duration: 1.1,
  },
  {
    d: 'M 126 522 L 126 210 L 264 382 L 384 267 L 384 671',
    revealWidth: 34,
    delay: 0.46,
    duration: 0.98,
  },
  {
    d: 'M 151 150 L 290 290',
    revealWidth: 26,
    delay: 0.42,
    duration: 0.7,
  },
  {
    d: 'M 390 252 L 525 252 C 638 252 638 394 520 394 L 437 394 L 694 603',
    revealWidth: 34,
    delay: 0.94,
    duration: 0.92,
  },
  {
    d: 'M 413 404 L 501 494',
    revealWidth: 26,
    delay: 1.72,
    duration: 0.28,
  },
  {
    d: 'M 439 628 L 439 535 L 420 543 M 531 628 L 531 535 L 480 601 L 549 601',
    revealWidth: 20,
    delay: 1.42,
    duration: 0.6,
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
  loopIntro = true,
  interactive = true,
  onSequenceComplete,
  title = 'MR14',
}: LogoMarkProps) {
  const reduceMotion = useReducedMotion()
  const shouldDraw = animateIntro && !reduceMotion
  const instanceId = useId().replace(/:/g, '')
  const shineId = `mr14-shine-${instanceId}`
  const shineMaskId = `mr14-shine-mask-${instanceId}`

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
      </defs>

      {shouldDraw ? (
        <motion.g
          aria-hidden="true"
          initial={{ opacity: 1 }}
          animate={loopIntro ? { opacity: [1, 1, 0, 0, 0, 1] } : { opacity: [1, 1, 0] }}
          transition={
            loopIntro
              ? {
                  duration: LOOP_DURATION,
                  times: [0, (DRAW_END - 0.04) / LOOP_DURATION, DRAW_END / LOOP_DURATION, FADE_OUT_AT, HIDDEN_AT, 1],
                  repeat: Infinity,
                  ease: 'linear',
                }
              : { duration: DRAW_END, times: [0, 0.98, 1], ease: 'linear' }
          }
        >
          {LOGO_STROKES.map((path) => (
            <motion.path
              key={path.d}
              d={path.d}
              fill="none"
              stroke="currentColor"
              strokeWidth={path.revealWidth}
              strokeLinecap="butt"
              strokeLinejoin="round"
              pathLength={1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: loopIntro ? [0, 0, 1, 1, 0] : 1 }}
              transition={
                loopIntro
                  ? {
                      duration: LOOP_DURATION,
                      times: [
                        0,
                        path.delay / LOOP_DURATION,
                        (path.delay + path.duration) / LOOP_DURATION,
                        FADE_OUT_AT,
                        1,
                      ],
                      repeat: Infinity,
                      ease: DRAW_EASE,
                    }
                  : { delay: path.delay, duration: path.duration, ease: DRAW_EASE }
              }
            />
          ))}
        </motion.g>
      ) : (
        <LogoImage />
      )}

      {shouldDraw ? (
        <motion.g
          initial={{ opacity: 0 }}
          animate={loopIntro ? { opacity: [0, 0, 1, 1, 0, 0] } : { opacity: [0, 0, 1] }}
          transition={
            loopIntro
              ? {
                  duration: LOOP_DURATION,
                  times: [0, (DRAW_END - 0.04) / LOOP_DURATION, DRAW_END / LOOP_DURATION, FADE_OUT_AT, HIDDEN_AT, 1],
                  repeat: Infinity,
                  ease: 'linear',
                }
              : { duration: DRAW_END, times: [0, 0.98, 1], ease: 'linear' }
          }
        >
          <LogoImage />
        </motion.g>
      ) : null}

      {shouldDraw ? (
        <motion.rect
          x="-210"
          y="0"
          width="150"
          height="768"
          fill={`url(#${shineId})`}
          mask={`url(#${shineMaskId})`}
          initial={{ x: -210, opacity: 0 }}
          animate={
            loopIntro
              ? {
                  x: [-210, -210, 1020, 1020, -210],
                  opacity: [0, 0, 0.38, 0, 0],
                }
              : {
                  x: [-210, -210, 1020, 1020],
                  opacity: [0, 0, 0.38, 0],
                }
          }
          transition={
            loopIntro
              ? {
                  duration: LOOP_DURATION,
                  times: [0, SHINE_START / LOOP_DURATION, 2.42 / LOOP_DURATION, SHINE_END / LOOP_DURATION, 1],
                  repeat: Infinity,
                  ease: DRAW_EASE,
                }
              : {
                  duration: SHINE_END,
                  times: [0, SHINE_START / SHINE_END, 2.42 / SHINE_END, 1],
                  ease: DRAW_EASE,
                }
          }
          style={{ willChange: 'transform, opacity' }}
          onAnimationComplete={onSequenceComplete}
        />
      ) : null}
    </motion.svg>
  )
}

'use client'

import type { Variants } from 'motion/react'
import { motion, useReducedMotion, useMotionValue, useSpring, useInView, animate } from 'motion/react'
import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Astra's own signature entrance: panels "materialize" out of glass - a
 * quick blur-to-sharp resolve instead of the site's usual fade-up. Passed
 * into the shared <Reveal variants={...}> so the reduced-motion/viewport
 * mechanics stay shared while the feel stays project-specific.
 */
export const astraFade: Variants = {
  hidden: { opacity: 0, scale: 0.98, filter: 'blur(8px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

/** A glass surface: blurred backdrop, hairline border, optional dark (immersive-room) tone. */
export function GlassPanel({ children, className, tone = 'light' }: { children: ReactNode; className?: string; tone?: 'light' | 'dark' }) {
  return (
    <div
      className={cn(
        'backdrop-blur-2xl',
        tone === 'light' ? 'border border-[#10151B]/8 bg-white/55' : 'border border-white/10 bg-white/[0.04]',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** A glass panel that tilts in 3D toward the pointer - simulated depth via CSS transforms, no WebGL. */
export function TiltPanel({ children, className, tone = 'light' }: { children: ReactNode; className?: string; tone?: 'light' | 'dark' }) {
  const reduceMotion = useReducedMotion()
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 10)
    rotateX.set(py * -10)
  }

  function handlePointerLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={cn(
          'backdrop-blur-2xl',
          tone === 'light' ? 'border border-[#10151B]/8 bg-white/55' : 'border border-white/10 bg-white/[0.04]',
          className,
        )}
      >
        {children}
      </motion.div>
    </div>
  )
}

/** A number that counts up to its target once it enters view - reinforces these are real specs, not decoration. */
export function CountUp({ to, suffix = '', className, style }: { to: number; suffix?: string; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || !inView) return
    if (reduceMotion) {
      node.textContent = `${to}${suffix}`
      return
    }
    const controls = animate(0, to, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        node.textContent = `${Math.round(value)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, to, suffix, reduceMotion])

  return <span ref={ref} className={className} style={style}>0{suffix}</span>
}

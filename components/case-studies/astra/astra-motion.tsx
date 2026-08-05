'use client'

import type { Variants } from 'motion/react'
import { motion, useReducedMotion, useMotionValue, useSpring, useInView, animate, AnimatePresence } from 'motion/react'
import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Info, X } from 'lucide-react'
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

/**
 * The opt-in reading layer for a scene the visitor is meant to discover, not
 * read. Closed by default everywhere; toggling it is a deliberate, rare
 * action (not a hover), so a short reveal is appropriate rather than an
 * instant cut.
 */
export function InfoToggle({ text, tone = 'light' }: { text: string; tone?: 'light' | 'dark' }) {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const dark = tone === 'dark'

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Ocultar contexto de esta escena' : 'Ver contexto de esta escena'}
        className={cn(
          'flex size-9 items-center justify-center rounded-full border backdrop-blur-xl transition-transform duration-150 active:scale-[0.94]',
          dark ? 'border-white/15 bg-white/[0.06] text-white/80' : 'border-[#10151B]/10 bg-white/60 text-[#10151B]/70',
        )}
      >
        {open ? <X className="size-4" /> : <Info className="size-4" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: (reduceMotion ? 10 : 200) / 1000, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformOrigin: 'top right' }}
            className={cn(
              'absolute top-11 right-0 z-10 w-64 border p-4 text-sm leading-relaxed backdrop-blur-xl sm:w-80',
              dark ? 'border-white/15 bg-[#10151B]/90 text-white/75' : 'border-[#10151B]/10 bg-white/90 text-[#10151B]/75',
            )}
          >
            {text}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

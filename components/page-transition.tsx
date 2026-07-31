'use client'

import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { LogoMark } from '@/components/logo-mark'

type IntroState = 'checking' | 'playing' | 'done'
const LogoIntroContext = createContext<IntroState>('checking')
const STORAGE_KEY = 'mr14-logo-intro-played-v1'

export function useLogoIntro() {
  return useContext(LogoIntroContext)
}

/** One-shot brand intro. The final move lands on the navbar logo without shifting layout. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const [introState, setIntroState] = useState<IntroState>('checking')
  const [docking, setDocking] = useState(false)
  const [viewportWidth, setViewportWidth] = useState(0)
  const reduceMotion = useReducedMotion()

  useLayoutEffect(() => {
    // This mount-only state handoff intentionally happens before the first paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setViewportWidth(window.innerWidth)
    const hasPlayed = window.sessionStorage.getItem(STORAGE_KEY) === 'true'

    if (hasPlayed || reduceMotion) {
      setIntroState('done')
      return
    }

    window.sessionStorage.setItem(STORAGE_KEY, 'true')
    setIntroState('playing')
  }, [reduceMotion])

  useEffect(() => {
    if (introState !== 'playing') return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [introState])

  const dock = useMemo(() => {
    const desktop = viewportWidth >= 640
    const containerInset = viewportWidth > 1400 ? (viewportWidth - 1400) / 2 : 0
    return {
      left: containerInset + (desktop ? 24 : 12),
      top: desktop ? 8 : 8,
      width: desktop ? 80 : 56,
    }
  }, [viewportWidth])

  return (
    <LogoIntroContext.Provider value={introState}>
      {children}

      <AnimatePresence>
        {introState === 'checking' ? (
          <div className="fixed inset-0 z-[120] bg-background" aria-hidden="true" />
        ) : null}

        {introState === 'playing' ? (
          <motion.div key="logo-intro" className="pointer-events-none fixed inset-0 z-[120]" aria-hidden="true">
            <motion.div
              className="absolute inset-0 bg-background"
              animate={{ opacity: docking ? 0 : 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.div
              className="fixed"
              initial={{ left: '50%', top: '50%', width: 'min(58vw, 420px)', x: '-50%', y: '-50%' }}
              animate={docking ? { left: dock.left, top: dock.top, width: dock.width, x: 0, y: 0 } : undefined}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => {
                if (docking) setIntroState('done')
              }}
            >
              <LogoMark animateIntro interactive={false} onSequenceComplete={() => setDocking(true)} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </LogoIntroContext.Provider>
  )
}

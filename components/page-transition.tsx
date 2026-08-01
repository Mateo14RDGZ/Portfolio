'use client'

import { createContext, useContext } from 'react'
import { motion, MotionConfig, useReducedMotion } from 'motion/react'
import { EASE } from '@/lib/motion'

type IntroState = 'checking' | 'playing' | 'done'
const LogoIntroContext = createContext<IntroState>('done')

export function useLogoIntro() {
  return useContext(LogoIntroContext)
}

/**
 * Keeps the shared logo state stable without blocking the first paint.
 * The main brand animation is one-shot and never blocks the first paint.
 */
export function PageTransition({
  children,
  animatePage = false,
}: {
  children: React.ReactNode
  animatePage?: boolean
}) {
  const reduceMotion = useReducedMotion()

  return (
    <MotionConfig reducedMotion="user">
      <LogoIntroContext.Provider value="done">
        <motion.div
          initial={
            animatePage && !reduceMotion
              ? { opacity: 0, y: 14, clipPath: 'inset(0 0 2.5% 0)' }
              : false
          }
          animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: reduceMotion ? 0.01 : 0.48, ease: EASE }}
        >
          {children}
        </motion.div>
      </LogoIntroContext.Provider>
    </MotionConfig>
  )
}

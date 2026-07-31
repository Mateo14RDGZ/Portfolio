'use client'

import { createContext, useContext } from 'react'

type IntroState = 'checking' | 'playing' | 'done'
const LogoIntroContext = createContext<IntroState>('done')

export function useLogoIntro() {
  return useContext(LogoIntroContext)
}

/**
 * Keeps the shared logo state stable without blocking the first paint.
 * The main brand animation is one-shot and never blocks the first paint.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <LogoIntroContext.Provider value="done">
      {children}
    </LogoIntroContext.Provider>
  )
}

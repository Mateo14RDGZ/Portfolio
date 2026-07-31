'use client'

import { createContext, useContext } from 'react'

type IntroState = 'checking' | 'playing' | 'done'
const LogoIntroContext = createContext<IntroState>('done')

export function useLogoIntro() {
  return useContext(LogoIntroContext)
}

/**
 * Keeps the shared logo state stable without blocking the first paint.
 * The brand now animates continuously in place instead of using a splash screen.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <LogoIntroContext.Provider value="done">
      {children}
    </LogoIntroContext.Provider>
  )
}

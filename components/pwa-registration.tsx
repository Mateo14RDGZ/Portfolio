'use client'

import { useEffect } from 'react'

/** Registers the lightweight production service worker without affecting development. */
export function PwaRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return

    const register = () => {
      void navigator.serviceWorker.register('/sw.js').catch((error: unknown) => {
        console.error(
          'No se pudo registrar el service worker:',
          error instanceof Error ? error.message : 'error desconocido',
        )
      })
    }

    if (document.readyState === 'complete') register()
    else window.addEventListener('load', register, { once: true })

    return () => window.removeEventListener('load', register)
  }, [])

  return null
}

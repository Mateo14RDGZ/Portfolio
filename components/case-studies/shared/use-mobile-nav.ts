'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Focus-trap + Escape-to-close + body-scroll-lock mechanics for a
 * full-screen mobile nav overlay, extracted from components/site-header.tsx
 * so every case-study page gets a real accessible mobile menu instead of
 * the decorative, non-functional hamburger icon each one had before.
 * Callers own the markup/animation - this hook only owns the behavior.
 */
export function useMobileNav() {
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return

      const navItems = Array.from(
        navRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      )
      const focusable = [menuButtonRef.current, ...navItems].filter(
        (item): item is HTMLElement => item !== null,
      )
      const first = focusable[0]
      const last = focusable.at(-1)

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    const focusFrame = window.requestAnimationFrame(() => {
      navRef.current?.querySelector<HTMLElement>('a[href]')?.focus()
    })
    window.addEventListener('keydown', handleKeyboard)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      window.removeEventListener('keydown', handleKeyboard)
    }
  }, [open])

  return { open, setOpen, menuButtonRef, navRef }
}

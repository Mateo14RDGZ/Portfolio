'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { LogoMark } from '@/components/logo-mark'
import { useLogoIntro } from '@/components/page-transition'
import { EASE } from '@/lib/motion'

const LINKS = [
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Perfil', href: '/#about' },
  { label: 'Servicios', href: '/#services' },
  { label: 'Método', href: '/#process' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const logoIntro = useLogoIntro()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileNavRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleMenuKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return
      const navItems = Array.from(
        mobileNavRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
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
      mobileNavRef.current?.querySelector<HTMLElement>('a[href]')?.focus()
    })
    window.addEventListener('keydown', handleMenuKeyboard)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      window.removeEventListener('keydown', handleMenuKeyboard)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground bg-background/95">
      <div className="mx-auto flex h-[4.5rem] max-w-[1400px] items-stretch px-3 sm:h-24 sm:px-6">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-2.5 border-r border-foreground pr-3 sm:gap-4 sm:pr-8">
          <span className={`size-12 shrink-0 transition-opacity duration-150 min-[380px]:size-14 sm:size-20 ${logoIntro === 'done' ? 'opacity-100' : 'opacity-0'}`}>
            <LogoMark animateIntro className="size-full" />
          </span>
          <span className="truncate text-[0.78rem] font-semibold uppercase tracking-[-0.02em] min-[380px]:text-sm sm:text-lg">Mateo Rodríguez</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-stretch lg:flex">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="grid min-w-28 place-items-center border-r border-foreground px-5 font-mono text-xs uppercase tracking-[0.16em] transition-colors hover:bg-foreground hover:text-background">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/#contact" className="primary-action hidden items-center gap-2 bg-primary px-7 text-sm font-semibold text-primary-foreground sm:flex">
          Hablemos <ArrowUpRight className="size-4" />
        </Link>

        <button ref={menuButtonRef} type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-navigation" className="grid w-14 place-items-center sm:w-20 lg:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav ref={mobileNavRef} id="mobile-navigation" initial={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }} animate={reduceMotion ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }} exit={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: EASE }} aria-label="Móvil" className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 flex flex-col bg-primary text-primary-foreground sm:top-24">
            <div className="flex flex-1 flex-col justify-center px-5 py-5">
              {LINKS.map((link, index) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex min-h-16 items-center justify-between border-t border-primary-foreground/40 py-3 text-[clamp(1.9rem,10vw,4.5rem)] leading-none tracking-[-0.06em]">
                  {link.label}<span className="font-mono text-xs tracking-normal">0{index + 1}</span>
                </Link>
              ))}
            </div>
            <Link href="/#contact" onClick={() => setOpen(false)} className="mobile-safe-bottom flex min-h-20 items-center justify-between border-t border-primary-foreground px-5 pt-4 text-lg font-semibold">
              Iniciar una conversación <ArrowUpRight />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

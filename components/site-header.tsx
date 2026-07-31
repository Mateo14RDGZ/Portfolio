'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { LogoMark } from '@/components/logo-mark'
import { useLogoIntro } from '@/components/page-transition'

const LINKS = [
  { label: 'Perfil', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Archivo', href: '#work' },
  { label: 'Método', href: '#process' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const logoIntro = useLogoIntro()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground bg-background/95">
      <div className="mx-auto flex h-[4.5rem] max-w-[1400px] items-stretch px-3 sm:h-24 sm:px-6">
        <a href="#top" className="flex min-w-0 flex-1 items-center gap-3 border-r border-foreground pr-4 sm:gap-4 sm:pr-8">
          <span className={`size-14 shrink-0 transition-opacity duration-150 sm:size-20 ${logoIntro === 'done' ? 'opacity-100' : 'opacity-0'}`}>
            <LogoMark className="size-full" />
          </span>
          <span className="truncate text-sm font-semibold uppercase tracking-[-0.02em] sm:text-lg">Mateo Rodríguez</span>
        </a>

        <nav aria-label="Principal" className="hidden items-stretch lg:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="grid min-w-28 place-items-center border-r border-foreground px-5 font-mono text-xs uppercase tracking-[0.16em] transition-colors hover:bg-foreground hover:text-background">
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="hidden items-center gap-2 bg-primary px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground sm:flex">
          Hablemos <ArrowUpRight className="size-4" />
        </a>

        <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} className="grid w-14 place-items-center sm:w-20 lg:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.45 }} aria-label="Móvil" className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 flex flex-col bg-primary text-primary-foreground sm:top-24">
            <div className="flex flex-1 flex-col justify-center px-5">
              {LINKS.map((link, index) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex items-baseline justify-between border-t border-primary-foreground/40 py-5 text-[clamp(2rem,12vw,4.5rem)] leading-none tracking-[-0.06em]">
                  {link.label}<span className="font-mono text-xs tracking-normal">0{index + 1}</span>
                </a>
              ))}
            </div>
            <a href="#contact" onClick={() => setOpen(false)} className="flex min-h-20 items-center justify-between border-t border-primary-foreground px-5 text-xl font-semibold">
              Iniciar una conversación <ArrowUpRight />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

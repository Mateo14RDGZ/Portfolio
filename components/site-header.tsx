'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { EASE } from '@/lib/motion'

const NAV_LINKS = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Proyectos', href: '#work' },
  { label: 'Proceso', href: '#process' },
  { label: 'Contacto', href: '#contact' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24)
  })

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4"
      >
        <div
          className={cn(
            'mx-auto flex max-w-6xl items-center justify-between rounded-full border border-transparent px-4 py-2.5 transition-all duration-500 sm:px-5',
            scrolled && 'glass border-border shadow-2xl shadow-black/40',
          )}
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
          >
            <span className="bg-primary text-primary-foreground grid size-8 place-items-center rounded-xl font-mono text-sm font-semibold transition-transform duration-500 group-hover:rotate-[8deg]">
              MR
            </span>
            <span className="text-sm font-medium tracking-tight">
              Mateo Ravel
              <span className="text-muted-foreground ml-1.5 hidden font-mono text-xs sm:inline">
                / dev
              </span>
            </span>
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground relative rounded-full px-3.5 py-2 text-sm transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="hidden rounded-full sm:inline-flex"
              render={<a href="#contact" />}
            >
              Iniciar un proyecto
              <ArrowUpRight data-icon="inline-end" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full md:hidden"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-background/95 fixed inset-0 z-40 backdrop-blur-xl md:hidden"
          >
            <nav
              aria-label="Móvil"
              className="flex h-full flex-col justify-center gap-2 px-8"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: EASE }}
                  className="border-border/60 border-b py-5 text-3xl font-medium tracking-tight"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
                className="pt-8"
              >
                <Button
                  size="lg"
                  className="w-full rounded-full"
                  render={<a href="#contact" onClick={() => setOpen(false)} />}
                >
                  Iniciar un proyecto
                  <ArrowUpRight data-icon="inline-end" />
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

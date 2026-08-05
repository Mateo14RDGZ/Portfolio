'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useMobileNav } from '@/components/case-studies/shared/use-mobile-nav'
import { brumaFade, ParallaxImage } from '@/components/case-studies/bruma/bruma-motion'
import { brumaMeta } from '@/components/case-studies/bruma/data'

const NAV_LINKS = [
  { label: 'Investigación', href: '#bruma-investigacion' },
  { label: 'Sistema', href: '#bruma-sistema' },
  { label: 'Proceso', href: '#bruma-proceso' },
]

export function BrumaHero() {
  const { open, setOpen, menuButtonRef, navRef } = useMobileNav()
  const reduceMotion = useReducedMotion()

  return (
    <>
      <header className="relative z-30 border-b border-[#1D1B18]/12">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 sm:px-10">
          <Link href="#bruma-title" className="text-lg tracking-[-0.01em]" style={{ fontFamily: 'var(--font-bruma-display)' }}>
            Bruma Café
          </Link>
          <nav aria-label="Bruma Café" className="hidden gap-10 text-sm md:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </nav>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="bruma-mobile-nav"
            className="grid size-10 place-items-center md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              ref={navRef}
              id="bruma-mobile-nav"
              aria-label="Bruma Café, móvil"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4 }}
              className="absolute inset-x-0 top-full z-30 border-b border-[#1D1B18]/12 bg-[#F3F0EA] px-6 py-6 md:hidden"
            >
              <ul className="flex flex-col gap-5 text-lg">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <section className="relative">
        <ParallaxImage
          wrapperClassName="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[21/9]"
          src="/concepts/ombu-hero.webp"
          alt="Taza de café de especialidad sobre una barra de piedra, luz natural entrando desde una ventana lateral"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 aspect-[4/5] bg-gradient-to-t from-[#1D1B18]/45 via-transparent to-transparent sm:aspect-[16/10] lg:aspect-[21/9]" />

        <div className="mx-auto max-w-[1400px] px-6 py-14 sm:px-10 sm:py-20">
          <Reveal variants={brumaFade}>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#4A3324]">{brumaMeta.eyebrow}</p>
          </Reveal>
          <Reveal variants={brumaFade} delay={0.1}>
            <h1
              id="bruma-title"
              className="mt-6 max-w-3xl text-[clamp(2.8rem,7vw,5.6rem)] leading-[1.02] tracking-[-0.01em]"
              style={{ fontFamily: 'var(--font-bruma-display)' }}
            >
              {brumaMeta.headline}
            </h1>
          </Reveal>
          <Reveal variants={brumaFade} delay={0.2}>
            <p className="mt-8 max-w-xl border-t border-[#1D1B18]/15 pt-6 text-base leading-relaxed text-[#1D1B18]/70 italic" style={{ fontFamily: 'var(--font-bruma-display)' }}>
              {brumaMeta.intro}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useMobileNav } from '@/components/case-studies/shared/use-mobile-nav'
import { astraFade, TiltPanel, CountUp } from '@/components/case-studies/astra/astra-motion'
import { astraMeta } from '@/components/case-studies/astra/data'

const NAV_LINKS = [
  { label: 'Investigación', href: '#astra-investigacion' },
  { label: 'Sistema', href: '#astra-sistema' },
  { label: 'Proceso', href: '#astra-proceso' },
]

export function AstraHero() {
  const { open, setOpen, menuButtonRef, navRef } = useMobileNav()
  const reduceMotion = useReducedMotion()

  return (
    <>
      <header className="relative z-30 border-b border-white/10 bg-[#10151B]">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 text-white sm:px-10">
          <Link href="#astra-title" className="text-lg tracking-[-0.01em] uppercase" style={{ fontFamily: 'var(--font-astra-display)' }}>
            Astra
          </Link>
          <nav aria-label="Astra" className="hidden gap-10 text-sm md:flex">
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
            aria-controls="astra-mobile-nav"
            className="grid size-10 place-items-center md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              ref={navRef}
              id="astra-mobile-nav"
              aria-label="Astra, móvil"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.35 }}
              className="absolute inset-x-0 top-full z-30 border-b border-white/10 bg-[#10151B] px-6 py-6 text-white md:hidden"
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

      <section className="relative overflow-hidden bg-[#10151B] text-white">
        <div className="absolute inset-0">
          <Image
            src="/concepts/aster-hero.webp"
            alt="SUV eléctrico Astra en una sala de exhibición con luz difusa"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10151B] via-[#10151B]/40 to-[#10151B]/10" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-28 lg:py-36">
          <Reveal variants={astraFade}>
            <p className="text-[11px] tracking-[0.28em] text-[#8FB4C9] uppercase">{astraMeta.eyebrow}</p>
          </Reveal>
          <Reveal variants={astraFade} delay={0.08}>
            <h1
              id="astra-title"
              className="mt-6 max-w-2xl text-[clamp(2.6rem,6.4vw,5rem)] leading-[1.04] tracking-[-0.01em]"
              style={{ fontFamily: 'var(--font-astra-display)' }}
            >
              {astraMeta.headline}
            </h1>
          </Reveal>
          <Reveal variants={astraFade} delay={0.16}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/65">{astraMeta.intro}</p>
          </Reveal>

          <Reveal variants={astraFade} delay={0.24} className="mt-14">
            <TiltPanel tone="dark" className="grid max-w-xl grid-cols-3 divide-x divide-white/10 px-2 py-6 sm:px-4">
              <div className="px-4 text-center sm:px-6">
                <CountUp to={612} className="text-3xl" style={{ fontFamily: 'var(--font-astra-display)' }} />
                <p className="mt-2 text-[10px] tracking-[0.16em] text-white/55 uppercase">km estimados</p>
              </div>
              <div className="px-4 text-center sm:px-6">
                <span className="text-3xl" style={{ fontFamily: 'var(--font-astra-display)' }}>4.3s</span>
                <p className="mt-2 text-[10px] tracking-[0.16em] text-white/55 uppercase">0–100 km/h</p>
              </div>
              <div className="px-4 text-center sm:px-6">
                <CountUp to={350} className="text-3xl" style={{ fontFamily: 'var(--font-astra-display)' }} />
                <p className="mt-2 text-[10px] tracking-[0.16em] text-white/55 uppercase">kW de carga</p>
              </div>
            </TiltPanel>
          </Reveal>
        </div>
      </section>
    </>
  )
}

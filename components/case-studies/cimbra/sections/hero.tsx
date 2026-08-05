'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useMobileNav } from '@/components/case-studies/shared/use-mobile-nav'
import { cimbraFade, PressableCard } from '@/components/case-studies/cimbra/cimbra-motion'
import { cimbraMeta, clases } from '@/components/case-studies/cimbra/data'

const NAV_LINKS = [
  { label: 'Investigación', href: '#cimbra-investigacion' },
  { label: 'Sistema', href: '#cimbra-sistema' },
  { label: 'Proceso', href: '#cimbra-proceso' },
]

export function CimbraHero() {
  const { open, setOpen, menuButtonRef, navRef } = useMobileNav()
  const reduceMotion = useReducedMotion()

  return (
    <>
      <header className="relative z-30 bg-[#ECEFF3]">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 text-[#1C222B] sm:px-10">
          <Link href="#cimbra-title" className="text-lg font-extrabold tracking-[-0.02em]" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
            cimbra<span className="text-[#C22300]">.</span>
          </Link>
          <nav aria-label="Cimbra" className="hidden gap-10 text-sm font-medium md:flex">
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
            aria-controls="cimbra-mobile-nav"
            className="grid size-10 place-items-center md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              ref={navRef}
              id="cimbra-mobile-nav"
              aria-label="Cimbra, móvil"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.3 }}
              className="absolute inset-x-0 top-full z-30 bg-[#ECEFF3] px-6 py-6 text-[#1C222B] shadow-[0_12px_24px_rgba(28,34,43,0.12)] md:hidden"
            >
              <ul className="flex flex-col gap-5 text-lg font-medium">
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

      <section className="bg-[#ECEFF3] px-6 pt-10 pb-20 text-[#1C222B] sm:px-10 sm:pt-14 sm:pb-28">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Reveal variants={cimbraFade}>
              <p className="text-[11px] font-bold tracking-[0.2em] text-[#C22300] uppercase">{cimbraMeta.eyebrow}</p>
            </Reveal>
            <Reveal variants={cimbraFade} delay={0.06}>
              <h1
                id="cimbra-title"
                className="mt-5 max-w-xl text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[1.04] font-extrabold tracking-[-0.02em]"
                style={{ fontFamily: 'var(--font-cimbra-display)' }}
              >
                {cimbraMeta.headline}
              </h1>
            </Reveal>
            <Reveal variants={cimbraFade} delay={0.12}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#1C222B]/65">{cimbraMeta.intro}</p>
            </Reveal>
          </div>

          <Reveal variants={cimbraFade} delay={0.18}>
            <PressableCard className="p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[18px]">
                <Image src="/concepts/cimbra-hero.webp" alt="Estudio de movimiento Cimbra con equipamiento de reformer" fill priority sizes="(max-width:1023px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 p-2">
                {clases.slice(0, 3).map((clase) => (
                  <div key={clase.name} className="rounded-[14px] bg-[#ECEFF3] p-3 shadow-[inset_4px_4px_10px_rgba(28,34,43,0.12),inset_-4px_-4px_10px_rgba(255,255,255,0.85)]">
                    <p className="text-[10px] font-semibold tracking-[0.08em] text-[#5F6777] uppercase">{clase.name}</p>
                    <p className="mt-1 text-lg font-extrabold text-[#C22300]" style={{ fontFamily: 'var(--font-cimbra-display)' }}>{clase.spots}</p>
                    <p className="text-[10px] text-[#5F6777]">cupos</p>
                  </div>
                ))}
              </div>
            </PressableCard>
          </Reveal>
        </div>
      </section>
    </>
  )
}

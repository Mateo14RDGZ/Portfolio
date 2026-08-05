'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { List, X } from 'lucide-react'
import { useMobileNav } from '@/components/case-studies/shared/use-mobile-nav'
import { useScrollStages } from '@/components/case-studies/shared/use-scroll-stages'
import { BRUMA_EASE_OUT, BRUMA_INDEX_ENTER_MS, BRUMA_INDEX_EXIT_MS } from '@/components/case-studies/bruma/bruma-motion'
import { indice } from '@/components/case-studies/bruma/data'

/**
 * Replaces the old 3-link anchor nav with a single "Índice" trigger that
 * opens a real table-of-contents overlay - the masthead of an issue, not a
 * site header. One overlay serves every viewport (no separate mobile/
 * desktop nav model): reading Bruma should feel the same whether the index
 * is tucked away on a phone or a laptop.
 */
export function BrumaMasthead() {
  const { open, setOpen, menuButtonRef, navRef } = useMobileNav()
  const reduceMotion = useReducedMotion()
  const { activeStage, setStageRef } = useScrollStages(indice.length, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: [0, 0.1, 0.3],
  })

  useEffect(() => {
    indice.forEach((item, index) => {
      setStageRef(index)(document.getElementById(item.id))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <header className="relative z-30 border-b border-[#1D1B18]/12">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 sm:px-10">
        <Link href="#bruma-title" className="text-lg tracking-[-0.01em]" style={{ fontFamily: 'var(--font-bruma-display)' }}>
          Bruma Café
        </Link>
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Cerrar índice' : 'Abrir índice'}
          aria-expanded={open}
          aria-controls="bruma-index-panel"
          className="inline-flex h-10 items-center gap-2 px-2 text-[11px] tracking-[0.18em] uppercase"
        >
          {open ? <X className="size-4" /> : <List className="size-4" />}
          Índice
        </button>
      </div>

      {/* A second, always-reachable entry point while reading on a phone -
          the header trigger above scrolls out of view once you're deep in
          the essay, and the index is otherwise easy to forget exists. */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir índice"
          aria-expanded={open}
          aria-controls="bruma-index-panel"
          className="fixed inset-x-6 bottom-6 z-20 flex h-12 items-center justify-center gap-2 border border-[#1D1B18]/20 bg-[#F3F0EA]/95 text-[11px] tracking-[0.18em] text-[#1D1B18] uppercase shadow-[0_4px_24px_rgba(29,27,24,0.14)] backdrop-blur-sm sm:hidden"
        >
          <List className="size-4" />
          Índice
        </button>
      )}

      <AnimatePresence>
        {open && (
          <>
            {/* fixed (viewport-relative), not absolute-to-header: the
                floating mobile trigger below can open this from anywhere
                on the page, long after the header itself has scrolled
                out of view - an absolutely-positioned panel would open
                off-screen in that case. */}
            <motion.div
              aria-hidden="true"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: (reduceMotion ? 0.01 : BRUMA_INDEX_EXIT_MS) / 1000 }}
              className="fixed inset-0 z-20 bg-[#1D1B18]/35 sm:hidden"
            />
            <motion.nav
              ref={navRef}
              id="bruma-index-panel"
              aria-label="En esta edición"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              transition={{
                duration: (reduceMotion ? 0.01 : open ? BRUMA_INDEX_ENTER_MS : BRUMA_INDEX_EXIT_MS) / 1000,
                ease: BRUMA_EASE_OUT,
              }}
              className="fixed inset-x-0 bottom-0 z-30 max-h-[75vh] overflow-y-auto border-t border-[#1D1B18]/12 bg-[#F3F0EA] px-6 pt-8 pb-10 sm:top-20 sm:right-10 sm:bottom-auto sm:left-auto sm:max-h-[70vh] sm:w-96 sm:border sm:px-8"
            >
              <p className="text-[10px] tracking-[0.22em] text-[#4A3324] uppercase">En esta edición</p>
              <ol className="mt-5 flex flex-col gap-4 text-2xl sm:text-2xl" style={{ fontFamily: 'var(--font-bruma-display)' }}>
                {indice.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={activeStage === index ? 'location' : undefined}
                      onClick={() => setOpen(false)}
                      className="inline-flex items-baseline gap-4 transition-colors duration-200 aria-[current=location]:text-[#4A3324]"
                    >
                      <span className="text-sm text-[#1D1B18]/65" style={{ fontFamily: 'var(--font-bruma-body)' }}>
                        0{index + 1}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

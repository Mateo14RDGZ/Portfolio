'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CornerDownLeft, Search } from 'lucide-react'
import { navItems, quickActions, type PanelValue } from '@/components/case-studies/cimbra/data'

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

type Entry = { id: string; label: string; hint: string; run: () => void }

/**
 * A real command palette: typing filters a merged list of the 4 panels and
 * the non-search quick actions, arrow keys move the highlight, Enter runs
 * the highlighted entry, click runs whichever entry was clicked. Opened
 * rarely enough per visit (⌘K or a topbar button) that a short entrance
 * animation is appropriate per emil-design-eng's frequency framework -
 * unlike the tab switches in the shell, this isn't a hundred-times-a-day
 * action.
 */
export function CimbraCommandPalette({
  open,
  onOpenChange,
  onNavigate,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onNavigate: (panel: PanelValue) => void
}) {
  const [query, setQuery] = useState('')
  const [highlighted, setHighlighted] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const reduceMotion = useReducedMotion()

  const entries = useMemo<Entry[]>(() => {
    const navEntries: Entry[] = navItems.map((item) => ({
      id: `nav-${item.value}`,
      label: item.label,
      hint: 'Ir a la sección',
      run: () => onNavigate(item.value),
    }))
    const actionEntries: Entry[] = quickActions
      .filter((action) => action.id !== 'buscar')
      .map((action) => ({
        id: `action-${action.id}`,
        label: action.label,
        hint: 'href' in action ? 'Abrir enlace' : 'Ir a la sección',
        run: () => {
          if ('panel' in action && action.panel) onNavigate(action.panel)
          else if ('href' in action && action.href) window.location.href = action.href
        },
      }))
    const all = [...navEntries, ...actionEntries]
    if (!query.trim()) return all
    const q = query.trim().toLowerCase()
    return all.filter((entry) => entry.label.toLowerCase().includes(q))
  }, [query, onNavigate])

  // Reset synchronously during render (the React-sanctioned way to adjust
  // state on a prop change) instead of in an effect, so the reset commits
  // before paint rather than triggering a second render pass.
  const [wasOpen, setWasOpen] = useState(open)
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) {
      setQuery('')
      setHighlighted(0)
    }
  }

  useEffect(() => {
    if (!open) return
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onOpenChange(false)
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        setHighlighted((value) => Math.min(value + 1, entries.length - 1))
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setHighlighted((value) => Math.max(value - 1, 0))
      } else if (event.key === 'Enter') {
        event.preventDefault()
        const entry = entries[highlighted]
        if (entry) {
          entry.run()
          onOpenChange(false)
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, entries, highlighted, onOpenChange])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            aria-hidden="true"
            onClick={() => onOpenChange(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: (reduceMotion ? 10 : 160) / 1000 }}
            className="fixed inset-0 z-40 bg-[#1C222B]/40 backdrop-blur-[2px]"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Buscar en el panel"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -8 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -6 }}
            transition={{ duration: (reduceMotion ? 10 : open ? 180 : 130) / 1000, ease: EASE_OUT }}
            className="fixed inset-x-4 top-[12vh] z-40 mx-auto max-w-lg overflow-hidden rounded-[20px] bg-[#ECEFF3] shadow-[0_20px_60px_rgba(28,34,43,0.35)] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
          >
            <div className="flex items-center gap-3 border-b border-[#1C222B]/10 px-4 py-3.5">
              <Search className="size-4 shrink-0 text-[#1C222B]/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setHighlighted(0)
                }}
                placeholder="Buscar secciones, plan, contacto..."
                className="w-full bg-transparent text-sm text-[#1C222B] outline-none placeholder:text-[#1C222B]/35"
              />
              <kbd className="hidden shrink-0 rounded-[6px] border border-[#1C222B]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[#1C222B]/40 sm:block">
                Esc
              </kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-1.5" role="listbox">
              {entries.length === 0 && (
                <li className="px-3.5 py-6 text-center text-sm text-[#1C222B]/40">Sin resultados para &ldquo;{query}&rdquo;</li>
              )}
              {entries.map((entry, index) => (
                <li key={entry.id} role="option" aria-selected={index === highlighted}>
                  <button
                    type="button"
                    onMouseEnter={() => setHighlighted(index)}
                    onClick={() => {
                      entry.run()
                      onOpenChange(false)
                    }}
                    className={`flex w-full items-center justify-between rounded-[12px] px-3.5 py-2.5 text-left text-sm transition-colors duration-150 ${
                      index === highlighted ? 'bg-[#1C222B] text-white' : 'text-[#1C222B]/80'
                    }`}
                  >
                    <span>{entry.label}</span>
                    <span className={`flex items-center gap-1 text-[11px] ${index === highlighted ? 'text-white/60' : 'text-[#1C222B]/35'}`}>
                      {entry.hint}
                      {index === highlighted && <CornerDownLeft className="size-3" />}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

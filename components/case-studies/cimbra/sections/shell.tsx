'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { Tabs } from '@base-ui/react/tabs'
import { History, Home, Palette, Search, SlidersHorizontal, StickyNote, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems, type PanelValue } from '@/components/case-studies/cimbra/data'
import { CimbraCommandPalette } from '@/components/case-studies/cimbra/sections/command-palette'
import { CimbraQuickActions } from '@/components/case-studies/cimbra/sections/quick-actions'
import { CimbraPanelInicio } from '@/components/case-studies/cimbra/sections/panel-inicio'
import { CimbraPanelSistema } from '@/components/case-studies/cimbra/sections/panel-sistema'
import { CimbraPanelChangelog } from '@/components/case-studies/cimbra/sections/panel-changelog'
import { CimbraPanelNotas } from '@/components/case-studies/cimbra/sections/panel-notas'

const NAV_ICONS: Record<PanelValue, LucideIcon> = {
  inicio: Home,
  sistema: Palette,
  changelog: History,
  notas: StickyNote,
}

const RAISED = 'shadow-[6px_6px_14px_rgba(28,34,43,0.14),-6px_-6px_14px_rgba(255,255,255,0.85)]'

/**
 * The sidebar (desktop) and bottom bar (mobile) are two `Tabs.List`
 * instances sharing one `Tabs.Root`, but `orientation` - which decides
 * whether arrow keys move focus on the vertical or horizontal axis - lives
 * on the root, not the list. Only one of the two lists is ever focusable at
 * a time (the other is `hidden`, i.e. `display:none`, at that breakpoint),
 * so this tracks which one and reports the orientation that actually
 * matches it. Defaults to horizontal (matching SSR and the mobile bar) and
 * only flips after mount, so there is nothing to hydrate-mismatch on.
 */
const DESKTOP_QUERY = '(min-width: 1024px)'

function useTabsOrientation() {
  const isDesktop = useSyncExternalStore(
    (onStoreChange) => {
      const query = window.matchMedia(DESKTOP_QUERY)
      query.addEventListener('change', onStoreChange)
      return () => query.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  )
  return isDesktop ? 'vertical' : 'horizontal'
}

/**
 * The whole product shell: one `Tabs.Root` shared by a desktop sidebar and a
 * mobile bottom tab bar (two `Tabs.List` surfaces, same state) so this reads
 * as one panel of software with two responsive skins, not a page that gets
 * narrower. Panel switches never animate - per emil-design-eng's frequency
 * framework, a dashboard's own primary navigation is a "tens of times per
 * session" interaction, the bucket the skill says to strip animation from
 * entirely (its own example: Raycast's command palette has no open/close
 * animation because it's used hundreds of times a day). Command palette and
 * quick-actions drawer stay in the "occasional" bucket and keep their motion.
 */
export function CimbraShell() {
  const [tab, setTab] = useState<PanelValue>('inicio')
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [actionsOpen, setActionsOpen] = useState(false)
  const orientation = useTabsOrientation()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((value) => !value)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <Tabs.Root
      value={tab}
      onValueChange={(value) => setTab(value as PanelValue)}
      orientation={orientation}
      className="flex h-full min-h-0 flex-1 flex-col overflow-hidden lg:flex-row"
    >
      <a
        href="#cimbra-panel"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:bg-[#FF6B4A] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Ir al panel activo
      </a>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-[#1C222B]/8 bg-[#ECEFF3] px-4 py-6 lg:flex">
        <Brand />
        <Tabs.List className="mt-8 flex flex-col gap-1.5" aria-label="Secciones del panel">
          {navItems.map((item) => {
            const Icon = NAV_ICONS[item.value]
            return (
              <Tabs.Tab
                key={item.value}
                value={item.value}
                className={cn(
                  'flex items-center gap-3 rounded-[14px] px-3.5 py-2.5 text-left text-sm font-medium text-[#1C222B]/70 transition-shadow duration-200',
                  'shadow-[6px_6px_14px_rgba(28,34,43,0.14),-6px_-6px_14px_rgba(255,255,255,0.85)]',
                  'data-[active]:text-[#C22300] data-[active]:shadow-[inset_5px_5px_12px_rgba(28,34,43,0.16),inset_-5px_-5px_12px_rgba(255,255,255,0.85)]',
                )}
              >
                <NavIcon Icon={Icon} />
                {item.label}
              </Tabs.Tab>
            )
          })}
        </Tabs.List>

        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          className={cn('mt-auto flex items-center justify-between rounded-[14px] bg-[#ECEFF3] px-3.5 py-2.5 text-sm text-[#1C222B]/60', RAISED)}
        >
          <span className="flex items-center gap-2">
            <Search className="size-4" />
            Buscar
          </span>
          <kbd className="rounded-[6px] border border-[#1C222B]/15 bg-white/60 px-1.5 py-0.5 text-[10px] font-semibold text-[#1C222B]/50">⌘K</kbd>
        </button>
      </aside>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#1C222B]/8 bg-[#ECEFF3] px-5 lg:px-8">
          <div className="lg:hidden">
            <Brand compact />
          </div>
          <p className="hidden text-sm font-medium text-[#1C222B]/50 lg:block">
            {navItems.find((item) => item.value === tab)?.label}
          </p>
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            aria-label="Buscar en el panel"
            className={cn('inline-flex size-10 items-center justify-center rounded-full bg-[#ECEFF3] text-[#1C222B]/70', RAISED)}
          >
            <Search className="size-[18px]" />
          </button>
        </header>

        {/* Panels */}
        <main id="cimbra-panel" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-6 pb-28 lg:px-10 lg:pt-10 lg:pb-10">
          <Tabs.Panel value="inicio" keepMounted className="data-[hidden]:hidden">
            <CimbraPanelInicio onNavigate={setTab} />
          </Tabs.Panel>
          <Tabs.Panel value="sistema" keepMounted className="data-[hidden]:hidden">
            <CimbraPanelSistema />
          </Tabs.Panel>
          <Tabs.Panel value="changelog" keepMounted className="data-[hidden]:hidden">
            <CimbraPanelChangelog />
          </Tabs.Panel>
          <Tabs.Panel value="notas" keepMounted className="data-[hidden]:hidden">
            <CimbraPanelNotas />
          </Tabs.Panel>
        </main>
      </div>

      {/* Mobile bottom tab bar - a real app chrome, not a squeezed sidebar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-20 border-t border-[#1C222B]/10 bg-[#ECEFF3]/95 pb-[max(env(safe-area-inset-bottom),0.5rem)] backdrop-blur-sm lg:hidden"
        aria-label="Navegación del panel"
      >
        <div className="flex items-stretch">
          <Tabs.List className="flex flex-1" aria-label="Secciones del panel">
            {navItems.map((item) => {
              const Icon = NAV_ICONS[item.value]
              return (
                <Tabs.Tab
                  key={item.value}
                  value={item.value}
                  className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium tracking-[0.02em] text-[#1C222B]/50 data-[active]:text-[#C22300]"
                >
                  <NavIcon Icon={Icon} />
                  {item.label}
                </Tabs.Tab>
              )
            })}
          </Tabs.List>
          <button
            type="button"
            onClick={() => setActionsOpen(true)}
            className="flex flex-col items-center gap-1 px-4 py-2.5 text-[10px] font-medium tracking-[0.02em] text-[#1C222B]/50"
          >
            <SlidersHorizontal className="size-[18px]" />
            Acciones
          </button>
        </div>
      </nav>

      <CimbraCommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} onNavigate={setTab} />
      <CimbraQuickActions open={actionsOpen} onOpenChange={setActionsOpen} onNavigate={setTab} onSearch={() => setPaletteOpen(true)} />
    </Tabs.Root>
  )
}

function NavIcon({ Icon }: { Icon: LucideIcon }) {
  return <Icon className="size-[18px] shrink-0" />
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className={cn('flex items-center justify-center rounded-[10px] bg-[#1C222B] font-bold text-white', compact ? 'size-8 text-sm' : 'size-9 text-base')}>
        C
      </div>
      <div>
        <p className="text-sm leading-tight font-semibold" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
          Cimbra
        </p>
        {!compact && <p className="text-[11px] leading-tight text-[#1C222B]/50">Panel interno</p>}
      </div>
    </div>
  )
}

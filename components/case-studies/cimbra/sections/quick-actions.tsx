'use client'

import { Drawer } from '@base-ui/react/drawer'
import { Search, ArrowRight, Mail, Plus } from 'lucide-react'
import { quickActions, type PanelValue } from '@/components/case-studies/cimbra/data'

const ICONS: Record<string, typeof Search> = {
  buscar: Search,
  'crear-clase': Plus,
  sistema: ArrowRight,
  contacto: Mail,
}

/**
 * The mobile "Acciones" button opens this as a real bottom sheet - genuine
 * swipe-to-dismiss via `@base-ui/react/drawer`, not a fake gesture. Each row
 * is a real action: two navigate the shell's tabs, one opens the command
 * palette, one is a real link - nothing here is decorative.
 */
export function CimbraQuickActions({
  open,
  onOpenChange,
  onNavigate,
  onSearch,
  onCreateClase,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onNavigate: (panel: PanelValue) => void
  onSearch: () => void
  onCreateClase: () => void
}) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 z-40 bg-[#1C222B]/40 transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Drawer.Popup className="fixed inset-x-0 bottom-0 z-40 rounded-t-[24px] bg-[#ECEFF3] pb-[max(env(safe-area-inset-bottom),1.25rem)] shadow-[0_-12px_40px_rgba(28,34,43,0.25)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full">
          <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-[#1C222B]/15" />
          <div className="px-5 pt-4 pb-2">
            <Drawer.Title className="text-sm font-semibold text-[#1C222B]">Acciones rápidas</Drawer.Title>
          </div>
          <ul className="px-3 pb-2">
            {quickActions.map((action) => {
              const Icon = ICONS[action.id] ?? ArrowRight
              return (
                <li key={action.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onOpenChange(false)
                      if (action.id === 'buscar') onSearch()
                      else if (action.id === 'crear-clase') onCreateClase()
                      else if ('panel' in action && action.panel) onNavigate(action.panel)
                      else if ('href' in action && action.href) window.location.href = action.href
                    }}
                    className="flex w-full items-center gap-3 rounded-[14px] px-3.5 py-3 text-left text-sm font-medium text-[#1C222B] transition-colors duration-150 active:bg-[#1C222B]/5"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1C222B]/8">
                      <Icon className="size-4 text-[#1C222B]/70" />
                    </span>
                    {action.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

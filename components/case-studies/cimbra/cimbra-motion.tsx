'use client'

import type { Variants } from 'motion/react'
import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Cimbra's own signature entrance: a short, springy pop-in instead of a
 * plain ease-out fade - tarjetas que "llegan" con un pequeño rebote físico,
 * a tono con el resto del lenguaje neumórfico/táctil del proyecto.
 */
export const cimbraFade: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 22 } },
}

const RAISED = 'shadow-[8px_8px_18px_rgba(28,34,43,0.16),-8px_-8px_18px_rgba(255,255,255,0.85)]'
const PRESSED = 'shadow-[inset_6px_6px_14px_rgba(28,34,43,0.16),inset_-6px_-6px_14px_rgba(255,255,255,0.85)]'

/**
 * A neumorphic surface that depresses (inset shadow + slight scale-down) on
 * hover/press - the project's core tactile signature. Pure CSS pseudo-classes
 * on purpose: most instances are decorative wrappers around illustrations,
 * and a JS-driven gesture handler (Framer Motion's onTap/onHover) would make
 * Motion mark the element focusable even when it has no interactive role.
 */
export function PressableCard({ children, className, as: Tag = 'div' }: { children: ReactNode; className?: string; as?: ElementType }) {
  return (
    <Tag
      className={cn(
        'rounded-[24px] bg-[#ECEFF3] transition-[box-shadow,transform] duration-300 ease-out',
        'shadow-[8px_8px_18px_rgba(28,34,43,0.16),-8px_-8px_18px_rgba(255,255,255,0.85)]',
        'hover:scale-[0.985] hover:shadow-[inset_6px_6px_14px_rgba(28,34,43,0.16),inset_-6px_-6px_14px_rgba(255,255,255,0.85)]',
        'active:scale-[0.98] active:shadow-[inset_6px_6px_14px_rgba(28,34,43,0.16),inset_-6px_-6px_14px_rgba(255,255,255,0.85)]',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

/** A segmented control with a sliding inset indicator - demonstrates the same press/elevation logic applied to a control. */
export function SegmentedControl({ options, value, onChange }: { options: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <div className={cn('inline-flex gap-1 rounded-[16px] bg-[#ECEFF3] p-1', RAISED)}>
      {options.map((option) => {
        const active = option === value
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              'rounded-[12px] px-4 py-2 text-sm font-medium transition-shadow duration-300',
              active ? cn(PRESSED, 'text-[#C22300]') : 'text-[#1C222B]/70',
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

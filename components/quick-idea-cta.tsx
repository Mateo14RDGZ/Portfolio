import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

/**
 * Mobile-only, deliberately tiny: a contextual nudge between Servicios and
 * Especializaciones, not a competing CTA section. Desktop has no equivalent
 * — nothing to duplicate against.
 */
export function QuickIdeaCta() {
  return (
    <div className="px-5 py-6 sm:hidden">
      <Link
        href="#contact"
        className="primary-action flex min-h-14 items-center justify-between gap-3 rounded-full border border-foreground/20 bg-card px-5 text-sm font-semibold"
      >
        ¿Ya tenés una idea? Contámela
        <ArrowUpRight className="size-4 shrink-0" />
      </Link>
    </div>
  )
}

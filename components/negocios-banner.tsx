'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { track } from '@vercel/analytics'

/**
 * A single discreet line pointing to /negocios, styled like the header nav
 * links (border-y, hover invert) rather than a new visual pattern. Sits
 * between Services and Especializaciones - it doesn't compete with Hero's
 * or Contact's primary CTAs, and nothing else on the Home changes.
 */
export function NegociosBanner() {
  return (
    <Link
      href="/negocios"
      onClick={() => track('negocios_banner_click')}
      className="group flex min-h-14 items-center justify-between gap-3 border-y border-foreground bg-card px-5 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background sm:px-8 sm:text-base"
    >
      ¿Tenés un negocio? Creemos tu web
      <ArrowUpRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  )
}

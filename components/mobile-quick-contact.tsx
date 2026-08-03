'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { track } from '@vercel/analytics'

/** Keeps the primary contact action within reach after the introductory hero. */
export function MobileQuickContact() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => {
      const contact = document.getElementById('contact')
      const hasLeftHero = window.scrollY > 560
      const isNearContact = contact
        ? contact.getBoundingClientRect().top < window.innerHeight * 0.86
        : false

      setVisible(hasLeftHero && !isNearContact)
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 sm:hidden">
      <Link
        href="#contact"
        onClick={() => track('mobile_quick_contact_click')}
        className="primary-action flex min-h-12 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[0_12px_28px_rgba(20,11,34,0.22)] transition-transform active:scale-[0.98]"
      >
        Contame tu idea <ArrowUpRight className="size-4" />
      </Link>
    </div>
  )
}

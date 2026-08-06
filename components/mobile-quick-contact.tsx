'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { track } from '@vercel/analytics'

/**
 * Keeps the primary contact action within reach after the introductory hero,
 * and steps out of the way whenever it would sit on top of something else
 * that matters: another primary CTA, a section headline, or the contact
 * form itself. `.primary-action` and `[data-heading]` are markers every main
 * CTA and every SectionHeading title already carry - no separate markup to
 * maintain. The Contact section gets its own scroll-distance check rather
 * than an IntersectionObserver entry: Contact is taller than a few viewports,
 * so its own intersection ratio can never cross a sane threshold from partial
 * scroll - it would report "not intersecting enough" for most of the time a
 * user is actually inside it, which is exactly the bug this replaces.
 */
export function MobileQuickContact() {
  const [pastHero, setPastHero] = useState(false)
  const [nearContact, setNearContact] = useState(false)
  const [competing, setCompeting] = useState(false)
  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const update = () => {
      setPastHero(window.scrollY > 560)
      const contact = document.getElementById('contact')
      setNearContact(contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.86 : false)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('.primary-action, [data-heading]'),
    ).filter((el) => el !== linkRef.current)
    if (targets.length === 0) return

    // Any one of these entering the viewport is enough to stand down - two
    // CTAs (or a CTA and a headline) competing for attention reads as noise.
    const visible = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        }
        setCompeting(visible.size > 0)
      },
      { threshold: 0.35 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const shouldShow = pastHero && !nearContact && !competing

  return (
    <div
      aria-hidden={!shouldShow}
      className="fixed left-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 transition-[opacity,transform] duration-300 ease-out sm:hidden"
      style={{
        opacity: shouldShow ? 1 : 0,
        transform: shouldShow ? 'translateY(0) scale(1)' : 'translateY(0.5rem) scale(0.9)',
        pointerEvents: shouldShow ? 'auto' : 'none',
      }}
    >
      <Link
        ref={linkRef}
        href="#contact"
        tabIndex={shouldShow ? 0 : -1}
        onClick={() => track('mobile_quick_contact_click')}
        className="primary-action flex min-h-12 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[0_12px_28px_rgba(20,11,34,0.22)] transition-transform active:scale-[0.98]"
      >
        Contame tu idea <ArrowUpRight className="size-4" />
      </Link>
    </div>
  )
}

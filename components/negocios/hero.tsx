'use client'

import { motion } from 'motion/react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { track } from '@vercel/analytics'
import { buildWhatsAppLink } from '@/lib/site'

const WHATSAPP_HREF = buildWhatsAppLink('Hola Mateo! Quiero mi página web 🙌')

/** Same border/eyebrow/headline/CTA-bar grammar as the Home Hero, adapted for a business audience. */
export function NegociosHero() {
  return (
    <section id="top" className="border-b border-foreground pt-[4.5rem] sm:pt-24">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-20 lg:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-xs uppercase tracking-[0.18em]"
        >
          Para dueños de negocio · Uruguay
        </motion.p>

        <h1 className="mt-6 max-w-3xl text-[clamp(2.75rem,10vw,5.75rem)] leading-[0.94] font-semibold tracking-[-0.05em] text-balance sm:mt-8">
          Tu negocio merece una <span className="text-primary">web</span> a su altura.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-snug font-medium sm:mt-8 sm:text-xl">
          Páginas web profesionales para negocios{' '}
          <span className="text-primary font-semibold">desde $7.990</span>.
        </p>
      </div>

      <div className="grid border-t border-foreground sm:grid-cols-2">
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('negocios_whatsapp_click', { source: 'hero_primary' })}
          className="primary-action flex min-h-16 items-center justify-between border-b border-foreground bg-primary px-5 text-base font-semibold text-primary-foreground sm:min-h-20 sm:border-r sm:border-b-0 sm:px-8 sm:text-lg"
        >
          Quiero mi página web <ArrowUpRight />
        </a>
        <a
          href="#ejemplos"
          className="flex min-h-16 items-center justify-between px-5 text-base font-semibold transition-colors hover:bg-foreground hover:text-background sm:min-h-20 sm:px-8 sm:text-lg"
        >
          Ver ejemplos <ArrowDownRight />
        </a>
      </div>
    </section>
  )
}

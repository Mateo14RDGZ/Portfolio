import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { ProjectBack } from '@/components/case-studies/shared/project-back'
import { astraFade, GlassPanel } from '@/components/case-studies/astra/astra-motion'

export function AstraCta() {
  return (
    <section id="astra-cta" className="scroll-mt-20 border-t border-white/10 bg-[#10151B] px-6 py-20 text-white sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal variants={astraFade}>
          <GlassPanel tone="dark" className="p-8 sm:p-12">
            <h2 className="max-w-2xl text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1.05] tracking-[-0.01em]" style={{ fontFamily: 'var(--font-astra-display)' }}>
              ¿Querés algo así para tu negocio?
            </h2>
            <Link
              href="/#contact"
              className="mt-9 inline-flex h-13 items-center gap-3 bg-[#4F7FA0] px-6 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-85"
            >
              Contame tu idea <ArrowUpRight className="size-4" />
            </Link>
          </GlassPanel>
        </Reveal>
        <div className="mt-16 border-t border-white/10 pt-6">
          <ProjectBack className="text-white" />
        </div>
      </div>
    </section>
  )
}

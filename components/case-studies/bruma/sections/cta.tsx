import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { ProjectBack } from '@/components/case-studies/shared/project-back'
import { brumaFade } from '@/components/case-studies/bruma/bruma-motion'

export function BrumaCta() {
  return (
    <section id="bruma-cta" className="scroll-mt-20 border-t border-[#1D1B18]/15 bg-[#1D1B18] px-6 py-20 text-[#F3F0EA] sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal variants={brumaFade}>
          <h2 className="max-w-2xl text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1.05] tracking-[-0.01em]" style={{ fontFamily: 'var(--font-bruma-display)' }}>
            ¿Querés algo así para tu negocio?
          </h2>
          <Link
            href="/#contact"
            className="mt-9 inline-flex h-13 items-center gap-3 border border-[#F3F0EA] px-6 text-sm font-medium transition-colors duration-300 hover:bg-[#F3F0EA] hover:text-[#1D1B18]"
          >
            Contame tu idea <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>
        <div className="mt-16 border-t border-[#F3F0EA]/20 pt-6">
          <ProjectBack className="text-[#F3F0EA]" />
        </div>
      </div>
    </section>
  )
}

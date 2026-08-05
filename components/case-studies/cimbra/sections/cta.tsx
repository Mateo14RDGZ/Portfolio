import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { ProjectBack } from '@/components/case-studies/shared/project-back'
import { cimbraFade, PressableCard } from '@/components/case-studies/cimbra/cimbra-motion'

export function CimbraCta() {
  return (
    <section id="cimbra-cta" className="scroll-mt-20 bg-[#ECEFF3] px-6 py-20 text-[#1C222B] sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal variants={cimbraFade}>
          <PressableCard className="p-8 sm:p-12">
            <h2 className="max-w-2xl text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.1] font-extrabold tracking-[-0.02em]" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
              ¿Querés algo así para tu negocio?
            </h2>
            <Link
              href="/#contact"
              className="mt-8 inline-flex h-13 items-center gap-3 rounded-[16px] bg-[#FF6B4A] px-6 text-sm font-semibold text-[#1C222B] shadow-[6px_6px_14px_rgba(28,34,43,0.18)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Contame tu idea <ArrowUpRight className="size-4" />
            </Link>
          </PressableCard>
        </Reveal>
        <div className="mt-14">
          <ProjectBack />
        </div>
      </div>
    </section>
  )
}

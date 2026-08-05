import Link from 'next/link'
import { Reveal, StaggerGroup, RevealItem } from '@/components/reveal'
import { ProjectBack } from '@/components/case-studies/shared/project-back'
import { brumaFade } from '@/components/case-studies/bruma/bruma-motion'
import { cierre, cta } from '@/components/case-studies/bruma/data'

/**
 * The essay's final beat ("Cómo se hizo") plus its closing thought - the
 * required "¿Querés algo así para tu negocio?" line lives as the last
 * sentence of the piece, not a marketing panel, followed by a small
 * colophon (credits, back link) instead of a big CTA block. The four
 * stages read as a vertical sequence with real pauses between them
 * (divide-y), never a grid - each one is its own block at any width,
 * not a compressed column.
 */
export function BrumaClosing() {
  return (
    <section id="bruma-cierre" className="scroll-mt-24 border-t border-[#1D1B18]/12 bg-[#EDE8DC] px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-[1400px]">
        <Reveal variants={brumaFade}>
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#4A3324]">{cierre.kicker}</p>
          <h2 className="mt-5 max-w-xl text-[clamp(1.85rem,5.5vw,2.75rem)] leading-[1.16] tracking-[-0.01em] italic" style={{ fontFamily: 'var(--font-bruma-display)' }}>
            {cierre.lede}
          </h2>
        </Reveal>

        <StaggerGroup className="mt-10 max-w-[62ch] divide-y divide-[#1D1B18]/12 border-t border-[#1D1B18]/12" gap={0.06}>
          {cierre.etapas.map((step) => (
            <RevealItem key={step.n} variants={brumaFade} className="py-7 first:pt-0">
              <span className="text-xs tracking-[0.15em] text-[#4A3324]">{step.n}</span>
              <h3 className="mt-2 text-xl" style={{ fontFamily: 'var(--font-bruma-display)' }}>{step.title}</h3>
              <p className="mt-2 text-[clamp(1.0625rem,0.9vw+0.85rem,1.1875rem)] leading-[1.7] text-[#1D1B18]/75">{step.copy}</p>
            </RevealItem>
          ))}
        </StaggerGroup>

        <Reveal variants={brumaFade} delay={0.1} className="mt-12 max-w-[62ch] border-t border-[#1D1B18]/12 pt-8">
          <p className="text-[clamp(1.0625rem,0.9vw+0.85rem,1.1875rem)] leading-[1.7] text-[#1D1B18]/80">
            {cierre.resultado}{' '}
            <span className="italic" style={{ fontFamily: 'var(--font-bruma-display)' }}>
              {cta.pregunta}
            </span>{' '}
            <Link href="/#contact" className="group inline-flex items-center gap-1 font-medium text-[#4A3324]">
              <span className="border-b border-current pb-0.5 transition-[padding-bottom] duration-300 group-hover:pb-1.5">
                {cta.linkLabel}
              </span>
            </Link>
            .
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-4 border-t border-[#1D1B18]/12 pt-6 text-xs text-[#1D1B18]/65 sm:flex-row sm:items-center sm:justify-between">
          <p>Bruma Café · Caso de diseño · Construido con {cierre.tecnologias.join(', ')}.</p>
          <ProjectBack className="text-[#1D1B18]/70" />
        </div>
      </div>
    </section>
  )
}

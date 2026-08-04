import { Reveal, StaggerGroup, RevealItem } from '@/components/reveal'
import { brumaFade } from '@/components/case-studies/bruma/bruma-motion'
import { proceso, resultado, tecnologias } from '@/components/case-studies/bruma/data'

export function BrumaProcessResult() {
  return (
    <section id="bruma-proceso" className="scroll-mt-20 border-t border-[#1D1B18]/15 px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal variants={brumaFade} className="max-w-2xl">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#4A3324]">05 · Proceso</p>
          <h2 className="mt-6 text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] tracking-[-0.01em]" style={{ fontFamily: 'var(--font-bruma-display)' }}>
            Cuatro etapas, sin atajos.
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-8 border-t border-[#1D1B18]/15 pt-10 sm:grid-cols-4" gap={0.05}>
          {proceso.map((step) => (
            <RevealItem key={step.n} variants={brumaFade}>
              <span className="text-xs tracking-[0.15em] text-[#4A3324]">{step.n}</span>
              <h3 className="mt-4 text-xl" style={{ fontFamily: 'var(--font-bruma-display)' }}>{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#1D1B18]/65">{step.copy}</p>
            </RevealItem>
          ))}
        </StaggerGroup>

        <div className="mt-20 grid grid-cols-1 gap-14 border-t border-[#1D1B18]/15 pt-14 lg:grid-cols-[0.6fr_0.4fr]">
          <Reveal variants={brumaFade}>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#4A3324]">{resultado.eyebrow}</p>
            <h3 className="mt-5 max-w-lg text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.1]" style={{ fontFamily: 'var(--font-bruma-display)' }}>
              {resultado.title}
            </h3>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#1D1B18]/70">{resultado.body}</p>
          </Reveal>

          <Reveal variants={brumaFade} delay={0.08}>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#4A3324]">Tecnologías</p>
            <ul className="mt-5 space-y-3">
              {tecnologias.map((tech) => (
                <li key={tech} className="border-t border-[#1D1B18]/12 pt-3 text-sm text-[#1D1B18]/70 first:border-t-0 first:pt-0">
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

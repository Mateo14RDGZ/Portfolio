import { Reveal, StaggerGroup, RevealItem } from '@/components/reveal'
import { astraFade } from '@/components/case-studies/astra/astra-motion'
import { proceso, resultado, tecnologias } from '@/components/case-studies/astra/data'

export function AstraProcessResult() {
  return (
    <section id="astra-proceso" className="scroll-mt-20 bg-[#F1F3F6] px-6 py-20 text-[#10151B] sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal variants={astraFade} className="max-w-2xl">
          <p className="text-[11px] tracking-[0.24em] text-[#4F7FA0] uppercase">05 · Proceso</p>
          <h2 className="mt-6 text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] tracking-[-0.01em]" style={{ fontFamily: 'var(--font-astra-display)' }}>
            Cuatro etapas, capa por capa.
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-8 border-t border-[#10151B]/12 pt-10 sm:grid-cols-4" gap={0.05}>
          {proceso.map((step) => (
            <RevealItem key={step.n} variants={astraFade}>
              <span className="text-xs tracking-[0.15em] text-[#4F7FA0]">{step.n}</span>
              <h3 className="mt-4 text-xl" style={{ fontFamily: 'var(--font-astra-display)' }}>{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#10151B]/65">{step.copy}</p>
            </RevealItem>
          ))}
        </StaggerGroup>

        <div className="mt-20 grid grid-cols-1 gap-14 border-t border-[#10151B]/12 pt-14 lg:grid-cols-[0.6fr_0.4fr]">
          <Reveal variants={astraFade}>
            <p className="text-[11px] tracking-[0.24em] text-[#4F7FA0] uppercase">{resultado.eyebrow}</p>
            <h3 className="mt-5 max-w-lg text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.1]" style={{ fontFamily: 'var(--font-astra-display)' }}>
              {resultado.title}
            </h3>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#10151B]/70">{resultado.body}</p>
          </Reveal>

          <Reveal variants={astraFade} delay={0.08}>
            <p className="text-[11px] tracking-[0.24em] text-[#4F7FA0] uppercase">Tecnologías</p>
            <ul className="mt-5 space-y-3">
              {tecnologias.map((tech) => (
                <li key={tech} className="border-t border-[#10151B]/10 pt-3 text-sm text-[#10151B]/70 first:border-t-0 first:pt-0">
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

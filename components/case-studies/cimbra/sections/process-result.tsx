import { Reveal, StaggerGroup, RevealItem } from '@/components/reveal'
import { cimbraFade, PressableCard } from '@/components/case-studies/cimbra/cimbra-motion'
import { proceso, resultado, tecnologias } from '@/components/case-studies/cimbra/data'

export function CimbraProcessResult() {
  return (
    <section id="cimbra-proceso" className="scroll-mt-20 bg-[#ECEFF3] px-6 py-20 text-[#1C222B] sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal variants={cimbraFade} className="max-w-2xl">
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#C22300] uppercase">05 · Proceso</p>
          <h2 className="mt-5 text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.12] font-extrabold tracking-[-0.02em]" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
            Cuatro etapas, capa por capa.
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-4" gap={0.05}>
          {proceso.map((step) => (
            <RevealItem key={step.n} variants={cimbraFade}>
              <PressableCard className="h-full p-6">
                <span className="text-xs font-bold text-[#C22300]">{step.n}</span>
                <h3 className="mt-3 text-xl font-bold" style={{ fontFamily: 'var(--font-cimbra-display)' }}>{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#1C222B]/65">{step.copy}</p>
              </PressableCard>
            </RevealItem>
          ))}
        </StaggerGroup>

        <div className="mt-20 grid grid-cols-1 gap-14 border-t border-[#1C222B]/10 pt-14 lg:grid-cols-[0.6fr_0.4fr]">
          <Reveal variants={cimbraFade}>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#C22300] uppercase">{resultado.eyebrow}</p>
            <h3 className="mt-4 max-w-lg text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.16] font-extrabold" style={{ fontFamily: 'var(--font-cimbra-display)' }}>
              {resultado.title}
            </h3>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#1C222B]/65">{resultado.body}</p>
          </Reveal>

          <Reveal variants={cimbraFade} delay={0.08}>
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#C22300] uppercase">Tecnologías</p>
            <ul className="mt-5 space-y-3">
              {tecnologias.map((tech) => (
                <li key={tech} className="border-t border-[#1C222B]/10 pt-3 text-sm text-[#1C222B]/65 first:border-t-0 first:pt-0">
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

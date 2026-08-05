import { Reveal, StaggerGroup, RevealItem } from '@/components/reveal'
import { cimbraFade, PressableCard } from '@/components/case-studies/cimbra/cimbra-motion'
import { problema, objetivos } from '@/components/case-studies/cimbra/data'

export function CimbraIntro() {
  return (
    <section id="cimbra-problema" className="mx-auto max-w-[1400px] scroll-mt-20 bg-[#ECEFF3] px-6 py-20 text-[#1C222B] sm:px-10 sm:py-28">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.55fr_0.45fr]">
        <Reveal variants={cimbraFade}>
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#C22300] uppercase">{problema.eyebrow}</p>
          <h2
            className="mt-5 max-w-xl text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.12] font-extrabold tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-cimbra-display)' }}
          >
            {problema.title}
          </h2>
        </Reveal>
        <Reveal variants={cimbraFade} delay={0.08} className="flex flex-col justify-center gap-5">
          {problema.body.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-[#1C222B]/65">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>

      <StaggerGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3" gap={0.07}>
        {objetivos.map((item) => (
          <RevealItem key={item.n} variants={cimbraFade}>
            <PressableCard className="h-full p-6">
              <span className="text-xs font-bold text-[#C22300]">{item.n}</span>
              <h3 className="mt-3 text-xl font-bold" style={{ fontFamily: 'var(--font-cimbra-display)' }}>{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#1C222B]/65">{item.copy}</p>
            </PressableCard>
          </RevealItem>
        ))}
      </StaggerGroup>
    </section>
  )
}

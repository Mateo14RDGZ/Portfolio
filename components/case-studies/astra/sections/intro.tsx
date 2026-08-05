import { Reveal, StaggerGroup, RevealItem } from '@/components/reveal'
import { astraFade, GlassPanel } from '@/components/case-studies/astra/astra-motion'
import { problema, objetivos } from '@/components/case-studies/astra/data'

export function AstraIntro() {
  return (
    <section id="astra-problema" className="relative overflow-hidden bg-[#F1F3F6] px-6 py-20 text-[#10151B] sm:px-10 sm:py-28">
      <div className="pointer-events-none absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-[#4F7FA0]/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.55fr_0.45fr]">
          <Reveal variants={astraFade}>
            <p className="text-[11px] tracking-[0.24em] text-[#4F7FA0] uppercase">{problema.eyebrow}</p>
            <h2
              className="mt-6 max-w-xl text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] tracking-[-0.01em]"
              style={{ fontFamily: 'var(--font-astra-display)' }}
            >
              {problema.title}
            </h2>
          </Reveal>
          <Reveal variants={astraFade} delay={0.1} className="flex flex-col justify-center gap-5 border-t border-[#10151B]/12 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-14">
            {problema.body.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-[#10151B]/68">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <StaggerGroup className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {objetivos.map((item) => (
            <RevealItem key={item.n} variants={astraFade}>
              <GlassPanel className="h-full p-6">
                <span className="text-xs tracking-[0.15em] text-[#4F7FA0]">{item.n}</span>
                <h3 className="mt-4 text-xl" style={{ fontFamily: 'var(--font-astra-display)' }}>{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#10151B]/65">{item.copy}</p>
              </GlassPanel>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

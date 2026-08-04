import { Reveal, StaggerGroup, RevealItem } from '@/components/reveal'
import { brumaFade } from '@/components/case-studies/bruma/bruma-motion'
import { problema, objetivos } from '@/components/case-studies/bruma/data'

export function BrumaIntro() {
  return (
    <section id="bruma-problema" className="mx-auto max-w-[1400px] scroll-mt-20 px-6 py-20 sm:px-10 sm:py-28">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.55fr_0.45fr]">
        <Reveal variants={brumaFade}>
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#4A3324]">{problema.eyebrow}</p>
          <h2
            className="mt-6 max-w-xl text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] tracking-[-0.01em]"
            style={{ fontFamily: 'var(--font-bruma-display)' }}
          >
            {problema.title}
          </h2>
        </Reveal>
        <Reveal variants={brumaFade} delay={0.1} className="flex flex-col justify-center gap-5 border-t border-[#1D1B18]/15 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-14">
          {problema.body.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-[#1D1B18]/70">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>

      <StaggerGroup className="mt-20 grid grid-cols-1 gap-10 border-t border-[#1D1B18]/15 pt-12 sm:grid-cols-3">
        {objetivos.map((item) => (
          <RevealItem key={item.n} variants={brumaFade}>
            <span className="text-xs tracking-[0.15em] text-[#4A3324]">{item.n}</span>
            <h3 className="mt-4 text-xl" style={{ fontFamily: 'var(--font-bruma-display)' }}>{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#1D1B18]/65">{item.copy}</p>
          </RevealItem>
        ))}
      </StaggerGroup>
    </section>
  )
}

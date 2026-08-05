import { Reveal } from '@/components/reveal'
import { brumaFade, ParallaxImage } from '@/components/case-studies/bruma/bruma-motion'
import { brumaMeta } from '@/components/case-studies/bruma/data'

export function BrumaCover() {
  return (
    <section className="relative">
      <ParallaxImage
        wrapperClassName="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[21/9]"
        src="/concepts/ombu-hero.webp"
        alt="Taza de café de especialidad sobre una barra de piedra, luz natural entrando desde una ventana lateral"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 aspect-[4/5] bg-gradient-to-t from-[#1D1B18]/45 via-transparent to-transparent sm:aspect-[16/10] lg:aspect-[21/9]" />

      <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 sm:py-20">
        <Reveal variants={brumaFade}>
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#4A3324]">{brumaMeta.eyebrow}</p>
        </Reveal>
        <Reveal variants={brumaFade} delay={0.1}>
          <h1
            id="bruma-title"
            className="mt-6 max-w-3xl text-[clamp(2.6rem,7vw,5.6rem)] leading-[1.02] tracking-[-0.01em]"
            style={{ fontFamily: 'var(--font-bruma-display)' }}
          >
            {brumaMeta.headline}
          </h1>
        </Reveal>
        <Reveal variants={brumaFade} delay={0.2}>
          <p className="mt-8 max-w-xl border-t border-[#1D1B18]/15 pt-6 text-[clamp(0.95rem,0.6vw+0.8rem,1rem)] leading-relaxed text-[#1D1B18]/70 italic" style={{ fontFamily: 'var(--font-bruma-display)' }}>
            {brumaMeta.intro}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

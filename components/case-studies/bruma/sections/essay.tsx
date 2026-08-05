import Image from 'next/image'
import { Reveal, StaggerGroup, RevealItem } from '@/components/reveal'
import { brumaFade, Marginalia } from '@/components/case-studies/bruma/bruma-motion'
import { premisa, referencias, sistema, composicion } from '@/components/case-studies/bruma/data'

/**
 * The continuous article body. No section is its own headed, bordered
 * block with a numbered eyebrow - what used to be "Problema", "Objetivos",
 * "Investigación", "Sistema de diseño" and "Showcase responsive" are now
 * beats within one flowing piece of writing, with design-system facts
 * living as marginalia beside the prose that motivates them rather than
 * as their own grid sections.
 */
export function BrumaEssay() {
  return (
    <article className="mx-auto max-w-[1400px] px-6 sm:px-10">
      {/* La premisa */}
      <section id="bruma-premisa" className="scroll-mt-24 border-t border-[#1D1B18]/12 py-14 sm:py-20">
        <Reveal variants={brumaFade}>
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#4A3324]">{premisa.kicker}</p>
          <h2
            className="mt-4 max-w-2xl text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.12] tracking-[-0.01em] italic"
            style={{ fontFamily: 'var(--font-bruma-display)' }}
          >
            {premisa.lede}
          </h2>
        </Reveal>
        <Reveal variants={brumaFade} delay={0.08} className="mt-8 max-w-[62ch] space-y-5">
          {premisa.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[clamp(1rem,0.3vw+0.94rem,1.125rem)] leading-[1.7] text-[#1D1B18]/75">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <StaggerGroup className="mt-10 max-w-[62ch] space-y-5" gap={0.06}>
          {premisa.objetivos.map((item) => (
            <RevealItem key={item.lede} variants={brumaFade}>
              <p className="text-[clamp(1rem,0.3vw+0.94rem,1.125rem)] leading-[1.7] text-[#1D1B18]/75">
                <span className="font-medium text-[#1D1B18]" style={{ fontVariantCaps: 'small-caps' }}>
                  {item.lede}
                </span>{' '}
                {item.copy}
              </p>
            </RevealItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Referencias */}
      <section id="bruma-referencias" className="scroll-mt-24 border-t border-[#1D1B18]/12 py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px] lg:gap-16">
          <div>
            <Reveal variants={brumaFade}>
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#4A3324]">{referencias.kicker}</p>
              <h2 className="mt-4 max-w-xl text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.12] tracking-[-0.01em] italic" style={{ fontFamily: 'var(--font-bruma-display)' }}>
                {referencias.lede}
              </h2>
            </Reveal>
            <Reveal variants={brumaFade} delay={0.08} className="mt-8 max-w-[62ch]">
              <p className="text-[clamp(1rem,0.3vw+0.94rem,1.125rem)] leading-[1.7] text-[#1D1B18]/75">{referencias.paragraph}</p>
            </Reveal>

            <Reveal variants={brumaFade} delay={0.14} className="relative mt-8 aspect-[4/3] max-w-[62ch] overflow-hidden">
              <Image src={referencias.imagen.src} alt={referencias.imagen.alt} fill loading="lazy" sizes="(max-width:1023px) 100vw, 60vw" className="object-cover" />
            </Reveal>
            <Reveal variants={brumaFade} delay={0.16}>
              <p className="mt-3 max-w-[62ch] text-xs text-[#1D1B18]/65 italic">{referencias.imagen.caption}</p>
            </Reveal>
          </div>

          <Reveal variants={brumaFade} delay={0.1}>
            <Marginalia label="Hallazgos">
              <ul className="space-y-4">
                {referencias.hallazgos.map((finding) => (
                  <li key={finding} className="border-t border-[#1D1B18]/10 pt-4 first:border-t-0 first:pt-0">
                    {finding}
                  </li>
                ))}
              </ul>
            </Marginalia>
          </Reveal>
        </div>
      </section>

      {/* El sistema */}
      <section id="bruma-sistema" className="scroll-mt-24 border-t border-[#1D1B18]/12 py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px] lg:gap-16">
          <div>
            <Reveal variants={brumaFade}>
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#4A3324]">{sistema.kicker}</p>
              <h2 className="mt-4 max-w-xl text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.12] tracking-[-0.01em] italic" style={{ fontFamily: 'var(--font-bruma-display)' }}>
                {sistema.lede}
              </h2>
            </Reveal>
            <Reveal variants={brumaFade} delay={0.08} className="mt-8 max-w-[62ch] space-y-5">
              <p className="text-[clamp(1rem,0.3vw+0.94rem,1.125rem)] leading-[1.7] text-[#1D1B18]/75">{sistema.paragraph}</p>
              <p className="text-[clamp(1rem,0.3vw+0.94rem,1.125rem)] leading-[1.7] text-[#1D1B18]/75">{sistema.componentes}</p>
            </Reveal>

            <Reveal variants={brumaFade} delay={0.14} className="mt-8 max-w-[62ch] border-t border-[#1D1B18]/12 pt-6">
              <p className="text-[10px] tracking-[0.18em] text-[#4A3324] uppercase">{sistema.tipografia.display.name}</p>
              <p className="mt-3 text-[clamp(1.6rem,4vw,2.4rem)] leading-[1.15]" style={{ fontFamily: 'var(--font-bruma-display)' }}>
                {sistema.tipografia.display.sample}
              </p>
              <p className="mt-6 text-[10px] tracking-[0.18em] text-[#4A3324] uppercase">{sistema.tipografia.body.name}</p>
              <p className="mt-3 text-xl leading-snug" style={{ fontFamily: 'var(--font-bruma-body)' }}>
                {sistema.tipografia.body.sample}
              </p>
            </Reveal>
          </div>

          <div className="space-y-8">
            <Reveal variants={brumaFade} delay={0.1}>
              <Marginalia label="Paleta">
                <ul className="grid grid-cols-4 gap-2 lg:grid-cols-2">
                  {sistema.paleta.map((color) => (
                    <li key={color.hex}>
                      <div className="aspect-square w-full border border-[#1D1B18]/15" style={{ backgroundColor: color.hex }} />
                      <p className="mt-1.5 text-[11px] text-[#1D1B18]/65">{color.name}</p>
                    </li>
                  ))}
                </ul>
              </Marginalia>
            </Reveal>
            <Reveal variants={brumaFade} delay={0.16}>
              <Marginalia label="Reglas">
                <ul className="space-y-3">
                  {sistema.reglas.map((rule) => (
                    <li key={rule} className="border-t border-[#1D1B18]/10 pt-3 first:border-t-0 first:pt-0">
                      {rule}
                    </li>
                  ))}
                </ul>
              </Marginalia>
            </Reveal>
          </div>
        </div>
      </section>

      {/* La composición */}
      <section id="bruma-composicion" className="scroll-mt-24 border-t border-[#1D1B18]/12 py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px] lg:gap-16">
          <div>
            <Reveal variants={brumaFade}>
              <p className="text-[11px] tracking-[0.22em] uppercase text-[#4A3324]">{composicion.kicker}</p>
              <h2 className="mt-4 max-w-xl text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.12] tracking-[-0.01em] italic" style={{ fontFamily: 'var(--font-bruma-display)' }}>
                {composicion.lede}
              </h2>
            </Reveal>
            <Reveal variants={brumaFade} delay={0.08} className="mt-8 max-w-[62ch]">
              <p className="text-[clamp(1rem,0.3vw+0.94rem,1.125rem)] leading-[1.7] text-[#1D1B18]/75">{composicion.paragraph}</p>
            </Reveal>

            <StaggerGroup className="mt-10 grid max-w-[62ch] grid-cols-3 gap-3" gap={0.06}>
              {composicion.etapas.map((stage, index) => (
                <RevealItem key={stage.n} variants={brumaFade}>
                  <div
                    className="border border-[#1D1B18]/15 bg-[#EDE8DC]"
                    style={{ aspectRatio: index === 0 ? '16/10' : index === 1 ? '4/3' : '9/16' }}
                  />
                  <p className="mt-2 text-[11px] tracking-[0.1em] text-[#4A3324] uppercase">{stage.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#1D1B18]/65">{stage.nota}</p>
                </RevealItem>
              ))}
            </StaggerGroup>
          </div>

          <Reveal variants={brumaFade} delay={0.1}>
            <Marginalia label="Microinteracciones">
              <ul className="space-y-4">
                {composicion.microinteracciones.map((item) => (
                  <li key={item} className="border-t border-[#1D1B18]/10 pt-4 first:border-t-0 first:pt-0">
                    {item}
                  </li>
                ))}
              </ul>
            </Marginalia>
          </Reveal>
        </div>
      </section>
    </article>
  )
}

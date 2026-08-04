import { Reveal, StaggerGroup, RevealItem } from '@/components/reveal'
import { brumaFade } from '@/components/case-studies/bruma/bruma-motion'
import { EditorialLink } from '@/components/case-studies/bruma/bruma-motion'
import { paleta, tipografia, designSystemNotes, componentes } from '@/components/case-studies/bruma/data'

export function BrumaDesignSystem() {
  return (
    <section id="bruma-sistema" className="scroll-mt-20 border-t border-[#1D1B18]/15 px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal variants={brumaFade}>
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#4A3324]">03 · Sistema de diseño</p>
          <h2 className="mt-6 max-w-xl text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] tracking-[-0.01em]" style={{ fontFamily: 'var(--font-bruma-display)' }}>
            Paleta, tipografía y componentes.
          </h2>
        </Reveal>

        {/* Paleta */}
        <StaggerGroup className="mt-16 grid grid-cols-2 gap-px border border-[#1D1B18]/15 sm:grid-cols-4" gap={0.05}>
          {paleta.map((color) => (
            <RevealItem key={color.hex} variants={brumaFade} className="bg-[#F3F0EA] p-6">
              <div className="aspect-square w-full border border-[#1D1B18]/15" style={{ backgroundColor: color.hex }} />
              <p className="mt-4 text-sm font-medium">{color.name}</p>
              <p className="mt-1 font-mono text-xs text-[#1D1B18]/55 uppercase">{color.hex}</p>
              <p className="mt-1 text-xs text-[#1D1B18]/45">{color.usage}</p>
            </RevealItem>
          ))}
        </StaggerGroup>

        {/* Tipografía */}
        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-[#1D1B18]/15 pt-14 lg:grid-cols-2">
          <Reveal variants={brumaFade}>
            <p className="text-xs tracking-[0.15em] text-[#4A3324] uppercase">{tipografia.display.name} · {tipografia.display.role}</p>
            <p className="mt-4 text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]" style={{ fontFamily: 'var(--font-bruma-display)' }}>
              {tipografia.display.sample}
            </p>
          </Reveal>
          <Reveal variants={brumaFade} delay={0.08}>
            <p className="text-xs tracking-[0.15em] text-[#4A3324] uppercase">{tipografia.body.name} · {tipografia.body.role}</p>
            <p className="mt-4 text-2xl leading-snug" style={{ fontFamily: 'var(--font-bruma-body)' }}>
              {tipografia.body.sample}
            </p>
          </Reveal>
        </div>

        {/* Reglas del sistema + Componentes */}
        <div className="mt-20 grid grid-cols-1 gap-14 border-t border-[#1D1B18]/15 pt-14 lg:grid-cols-2">
          <Reveal variants={brumaFade}>
            <h3 className="text-lg" style={{ fontFamily: 'var(--font-bruma-display)' }}>Reglas del sistema</h3>
            <ul className="mt-6 space-y-4">
              {designSystemNotes.map((note) => (
                <li key={note} className="border-t border-[#1D1B18]/12 pt-4 text-sm leading-relaxed text-[#1D1B18]/70 first:border-t-0 first:pt-0">
                  {note}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variants={brumaFade} delay={0.08}>
            <h3 className="text-lg" style={{ fontFamily: 'var(--font-bruma-display)' }}>Componentes</h3>
            <div className="mt-6 space-y-6">
              <div className="flex flex-wrap items-center gap-5 border-t border-[#1D1B18]/12 pt-5">
                <a href="#bruma-cta" className="inline-flex h-11 items-center border border-[#1D1B18] px-5 text-sm transition-colors duration-300 hover:bg-[#1D1B18] hover:text-[#F3F0EA]">
                  Botón primario
                </a>
                <EditorialLink href="#bruma-cta">Enlace de texto</EditorialLink>
                <span className="text-[10px] tracking-[0.18em] text-[#4A3324] uppercase">Etiqueta</span>
              </div>
              {componentes.map((component) => (
                <p key={component.name} className="border-t border-[#1D1B18]/12 pt-4 text-sm leading-relaxed text-[#1D1B18]/60">
                  <b className="font-medium text-[#1D1B18]">{component.name}.</b> {component.desc}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

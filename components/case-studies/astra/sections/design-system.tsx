import { Reveal, StaggerGroup, RevealItem } from '@/components/reveal'
import { astraFade, GlassPanel, TiltPanel } from '@/components/case-studies/astra/astra-motion'
import { paleta, tipografia, designSystemNotes, componentes, vehiculos } from '@/components/case-studies/astra/data'

export function AstraDesignSystem() {
  return (
    <section id="astra-sistema" className="scroll-mt-20 bg-[#F1F3F6] px-6 py-20 text-[#10151B] sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal variants={astraFade}>
          <p className="text-[11px] tracking-[0.24em] text-[#4F7FA0] uppercase">03 · Sistema de diseño</p>
          <h2 className="mt-6 max-w-xl text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] tracking-[-0.01em]" style={{ fontFamily: 'var(--font-astra-display)' }}>
            Paleta, tipografía y componentes.
          </h2>
        </Reveal>

        {/* Paleta */}
        <StaggerGroup className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4" gap={0.05}>
          {paleta.map((color) => (
            <RevealItem key={color.hex} variants={astraFade}>
              <GlassPanel className="p-6">
                <div className="aspect-square w-full border border-[#10151B]/10" style={{ backgroundColor: color.hex }} />
                <p className="mt-4 text-sm font-medium">{color.name}</p>
                <p className="mt-1 font-mono text-xs text-[#10151B]/55 uppercase">{color.hex}</p>
                <p className="mt-1 text-xs text-[#10151B]/45">{color.usage}</p>
              </GlassPanel>
            </RevealItem>
          ))}
        </StaggerGroup>

        {/* Tipografía */}
        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-[#10151B]/12 pt-14 lg:grid-cols-2">
          <Reveal variants={astraFade}>
            <p className="text-xs tracking-[0.15em] text-[#4F7FA0] uppercase">{tipografia.display.name} · {tipografia.display.role}</p>
            <p className="mt-4 text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]" style={{ fontFamily: 'var(--font-astra-display)' }}>
              {tipografia.display.sample}
            </p>
          </Reveal>
          <Reveal variants={astraFade} delay={0.08}>
            <p className="text-xs tracking-[0.15em] text-[#4F7FA0] uppercase">{tipografia.body.name} · {tipografia.body.role}</p>
            <p className="mt-4 text-2xl leading-snug" style={{ fontFamily: 'var(--font-astra-body)' }}>
              {tipografia.body.sample}
            </p>
          </Reveal>
        </div>

        {/* Reglas del sistema + Componentes */}
        <div className="mt-20 grid grid-cols-1 gap-14 border-t border-[#10151B]/12 pt-14 lg:grid-cols-2">
          <Reveal variants={astraFade}>
            <h3 className="text-lg" style={{ fontFamily: 'var(--font-astra-display)' }}>Reglas del sistema</h3>
            <ul className="mt-6 space-y-4">
              {designSystemNotes.map((note) => (
                <li key={note} className="border-t border-[#10151B]/10 pt-4 text-sm leading-relaxed text-[#10151B]/70 first:border-t-0 first:pt-0">
                  {note}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variants={astraFade} delay={0.08}>
            <h3 className="text-lg" style={{ fontFamily: 'var(--font-astra-display)' }}>Componentes</h3>
            <TiltPanel className="mt-6 flex flex-wrap items-center gap-5 p-5">
              <a href="#astra-cta" className="inline-flex h-11 items-center bg-[#10151B] px-5 text-sm text-white transition-opacity duration-300 hover:opacity-85">
                Botón primario
              </a>
              <span className="text-[10px] tracking-[0.18em] text-[#4F7FA0] uppercase">Etiqueta</span>
            </TiltPanel>
            <div className="mt-6 space-y-6">
              {componentes.map((component) => (
                <p key={component.name} className="border-t border-[#10151B]/10 pt-4 text-sm leading-relaxed text-[#10151B]/60">
                  <b className="font-medium text-[#10151B]">{component.name}.</b> {component.desc}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Tarjeta de especificación, aplicada a las 3 unidades del showroom */}
        <div className="mt-20 border-t border-[#10151B]/12 pt-14">
          <Reveal variants={astraFade}>
            <p className="text-xs tracking-[0.15em] text-[#4F7FA0] uppercase">Tarjeta de especificación · aplicada</p>
          </Reveal>
          <StaggerGroup className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3" gap={0.06}>
            {vehiculos.map((vehicle) => (
              <RevealItem key={vehicle.name} variants={astraFade}>
                <TiltPanel className="h-full p-5">
                  <p className="text-xs tracking-[0.14em] text-[#10151B]/50 uppercase">{vehicle.type}</p>
                  <h4 className="mt-2 text-xl" style={{ fontFamily: 'var(--font-astra-display)' }}>{vehicle.name}</h4>
                  <div className="mt-5 grid grid-cols-3 divide-x divide-[#10151B]/10 border-t border-[#10151B]/10 pt-4 text-center">
                    <div>
                      <b className="text-lg" style={{ fontFamily: 'var(--font-astra-display)' }}>{vehicle.range}</b>
                      <p className="mt-1 text-[9px] tracking-[0.1em] text-[#10151B]/50 uppercase">km</p>
                    </div>
                    <div>
                      <b className="text-lg" style={{ fontFamily: 'var(--font-astra-display)' }}>{vehicle.accel}s</b>
                      <p className="mt-1 text-[9px] tracking-[0.1em] text-[#10151B]/50 uppercase">0–100</p>
                    </div>
                    <div>
                      <b className="text-lg" style={{ fontFamily: 'var(--font-astra-display)' }}>{vehicle.charge}</b>
                      <p className="mt-1 text-[9px] tracking-[0.1em] text-[#10151B]/50 uppercase">kW</p>
                    </div>
                  </div>
                </TiltPanel>
              </RevealItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}

import { RevealItem, StaggerGroup } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { NEGOCIOS_PROCESS } from '@/lib/negocios-data'

/** Numbered step list, same divide-y grammar used across the site's card panels. */
export function NegociosProcess() {
  return (
    <section
      id="proceso"
      className="relative mx-auto my-6 max-w-6xl scroll-mt-24 rounded-[0.75rem_4rem_0.75rem_4rem] bg-card px-5 py-16 sm:my-10 sm:px-10 sm:py-20"
    >
      <SectionHeading
        eyebrow="Proceso"
        title="Contratar tu web es simple."
        description="Cuatro pasos claros, sin sorpresas en el camino."
      />

      <StaggerGroup className="mt-9 max-w-2xl divide-y divide-foreground/15 border-t border-foreground/15 sm:mt-12" gap={0.08}>
        {NEGOCIOS_PROCESS.map((step) => (
          <RevealItem key={step.n} className="flex gap-5 py-6 first:pt-0 sm:gap-8">
            <span className="font-mono text-sm font-semibold text-primary">{step.n}</span>
            <div>
              <h3 className="text-lg font-medium tracking-tight sm:text-xl">{step.title}</h3>
              <p className="mt-1.5 max-w-lg leading-relaxed text-muted-foreground">{step.copy}</p>
            </div>
          </RevealItem>
        ))}
      </StaggerGroup>
    </section>
  )
}

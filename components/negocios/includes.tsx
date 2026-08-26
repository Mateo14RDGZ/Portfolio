import { Info } from 'lucide-react'
import { RevealItem, StaggerGroup, Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { NEGOCIOS_INCLUDES } from '@/lib/negocios-data'

/** Bordered feature grid, same treatment as the Home QualityPanel score grid. */
export function NegociosIncludes() {
  return (
    <section id="incluye" className="relative scroll-mt-24 bg-accent py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Qué incluye"
          title="Todo lo que tu negocio necesita para estar online."
          description="Una web completa, pensada para que tus clientes encuentren lo que buscan y te contacten sin fricción."
        />

        <StaggerGroup
          className="mt-9 grid grid-cols-2 overflow-hidden border border-foreground bg-background sm:mt-12 sm:grid-cols-5"
          gap={0.06}
        >
          {NEGOCIOS_INCLUDES.map((item, index) => {
            const mobileBorderB = index < NEGOCIOS_INCLUDES.length - 2 ? 'border-b' : ''
            const desktopBorderB = index < 5 ? 'sm:border-b' : 'sm:border-b-0'
            const mobileBorderR = index % 2 === 0 ? 'border-r' : ''
            const desktopBorderR = index % 5 !== 4 ? 'sm:border-r' : 'sm:border-r-0'
            return (
              <RevealItem key={item.title}>
                <div
                  className={`flex h-full min-h-36 flex-col justify-between gap-6 border-foreground p-5 sm:min-h-44 sm:p-6 ${mobileBorderB} ${desktopBorderB} ${mobileBorderR} ${desktopBorderR}`}
                >
                  <span className="text-primary grid size-10 place-items-center border border-foreground">
                    <item.icon className="size-4.5" />
                  </span>
                  <p className="text-sm leading-snug font-semibold text-pretty">{item.title}</p>
                </div>
              </RevealItem>
            )
          })}
        </StaggerGroup>

        <Reveal delay={0.1}>
          <div className="mt-8 grid gap-3 border-l-2 border-primary bg-background/70 p-4 sm:mt-10 sm:grid-cols-[auto_1fr] sm:items-start sm:p-5">
            <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            <p className="text-sm leading-relaxed text-foreground/80">
              Funcionalidades avanzadas como reservas, sistemas personalizados, integraciones o
              catálogos complejos se cotizan aparte, según lo que necesite tu negocio.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

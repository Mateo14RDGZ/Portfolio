import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { buildWhatsAppLink } from '@/lib/site'

const WHATSAPP_HREF = buildWhatsAppLink('Hola Mateo! Quiero mi página web 🙌')

/** Big-number treatment reused from the Home QualityPanel score cells. */
export function NegociosPricing() {
  return (
    <section id="precio" className="relative bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Inversión"
          title="Calidad primero. Accesible después."
          description="Una web profesional, con diseño cuidado y todo lo que tu negocio necesita para estar online, a un precio pensado para negocios que están empezando o quieren renovarse."
        />

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-start gap-7 border-t border-foreground pt-8 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs tracking-[0.18em] text-foreground/70 uppercase">Web profesional</p>
              <p className="mt-2 text-[clamp(3.25rem,13vw,6.5rem)] leading-none font-semibold tracking-[-0.05em]">
                desde $7.990
              </p>
            </div>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-action flex min-h-14 w-full items-center justify-between gap-4 bg-primary px-5 text-base font-semibold text-primary-foreground sm:w-auto sm:min-w-72"
            >
              Quiero mi página web <ArrowUpRight className="size-5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

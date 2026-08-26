import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { buildWhatsAppLink } from '@/lib/site'

const WHATSAPP_HREF = buildWhatsAppLink('Hola Mateo! ¿Hacemos la web de mi negocio?')

/** Same dark closing-band treatment as the Home Contact section. */
export function NegociosFinalCta() {
  return (
    <section className="relative scroll-mt-24 overflow-hidden rounded-t-[3.5rem] bg-foreground py-16 text-background sm:rounded-t-[6rem] sm:py-24">
      <div aria-hidden className="absolute top-0 right-0 h-4 w-1/3 bg-primary" />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6">
        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase sm:text-xs">
            Último paso
          </p>
          <h2 className="mt-5 text-[clamp(2.5rem,9vw,5.5rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-balance">
            ¿Hacemos la web de tu negocio?
          </h2>

          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-action mt-9 inline-flex min-h-14 w-full items-center justify-between gap-4 bg-primary px-6 text-base font-semibold text-primary-foreground sm:mt-12 sm:w-auto sm:min-w-80"
          >
            <span className="flex items-center gap-2.5">
              <MessageCircle data-icon="inline-start" className="size-5" />
              Hablar por WhatsApp
            </span>
            <ArrowUpRight className="size-5" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

import { Code2, Gauge, MessagesSquare } from 'lucide-react'
import { Reveal, RevealItem, StaggerGroup } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

// Same three pillars and copy as the Home About section — real, unmodified
// facts about how the work happens, reused instead of invented.
const PILLARS = [
  {
    icon: Code2,
    title: 'Creado desde cero',
    copy: 'Sin constructores visuales pesados. Next.js y TypeScript escritos a mano para que tu sitio siga siendo rápido y fácil de ampliar.',
  },
  {
    icon: Gauge,
    title: 'Rendimiento ante todo',
    copy: 'Cada página se mide con Core Web Vitals antes del lanzamiento. La velocidad es una de las formas más efectivas de mejorar la conversión.',
  },
  {
    icon: MessagesSquare,
    title: 'Hablás conmigo',
    copy: 'Sin intermediarios ni traspasos. La persona que escribe el código es la misma que responde tus mensajes.',
  },
]

const STATS = [
  { k: 'Tiempo de respuesta', v: 'Menos de 24 h' },
  { k: 'Plazo habitual', v: '5-8 días hábiles' },
]

export function NegociosAbout() {
  return (
    <section id="sobre-mi" className="relative mx-auto my-6 max-w-6xl scroll-mt-24 rounded-[2.5rem_0.5rem_2.5rem_0.5rem] bg-card px-5 py-16 sm:my-10 sm:px-10 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-0">
        <div className="flex flex-col gap-8 lg:border-r lg:border-foreground lg:pr-12">
          <SectionHeading
            eyebrow="Sobre mí"
            title="Un desarrollador que piensa como dueño de un negocio."
            description="Me encargo personalmente de cada proyecto: estrategia, diseño y código. Sin agencias de por medio ni traspasos entre distintas personas."
          />

          <StaggerGroup className="flex flex-col" gap={0.12}>
            {PILLARS.map((pillar) => (
              <RevealItem key={pillar.title} className="group flex gap-5 border-t border-foreground py-6">
                <span className="text-primary grid size-11 shrink-0 place-items-center border border-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <pillar.icon className="size-5" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-medium tracking-tight">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{pillar.copy}</p>
                </div>
              </RevealItem>
            ))}
          </StaggerGroup>
        </div>

        <Reveal className="flex flex-col justify-center gap-6 pt-8 lg:pt-0 lg:pl-12">
          <div>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">Mateo Rodríguez</span>
            <p className="mt-1 text-lg font-medium">Desarrollador full-stack, remoto</p>
            <p className="text-muted-foreground text-sm">Uruguay · Trabajo remoto</p>
          </div>
          <dl className="grid grid-cols-2 gap-4">
            {STATS.map((item) => (
              <div key={item.k} className="border-border rounded-2xl border p-5 transition-colors duration-300 hover:border-primary/40">
                <dt className="text-muted-foreground font-mono text-xs tracking-wider uppercase">{item.k}</dt>
                <dd className="mt-1.5 text-lg font-medium">{item.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

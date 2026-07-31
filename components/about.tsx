'use client'

import { motion } from 'motion/react'
import { Code2, Gauge, MessagesSquare } from 'lucide-react'
import { Reveal, RevealItem, StaggerGroup } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { fadeUp, scaleIn, slideLeft } from '@/lib/motion'

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

export function About() {
  return (
    <section id="about" className="relative mx-auto my-6 max-w-6xl scroll-mt-24 rounded-[2.5rem_0.5rem_2.5rem_0.5rem] bg-card px-5 py-16 sm:my-10 sm:px-10 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-0">
        <div className="flex flex-col gap-10 lg:border-r lg:border-foreground lg:pr-12">
          <SectionHeading
            eyebrow="Sobre mí"
            title="Un desarrollador que piensa como dueño de un negocio."
            description="Creo sitios web modernos para pequeños negocios: páginas rápidas, claras y pensadas para mostrar por qué soy una buena opción para tu proyecto. Me encargo de la estrategia, el diseño y el código."
          />

          <StaggerGroup className="flex flex-col" gap={0.12}>
            {PILLARS.map((pillar) => (
              <RevealItem
                key={pillar.title}
                variants={slideLeft}
                className="group flex gap-5 border-t border-foreground py-6"
              >
                <span className="text-primary grid size-11 shrink-0 place-items-center border border-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <pillar.icon className="size-5" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-medium tracking-tight">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">
                    {pillar.copy}
                  </p>
                </div>
              </RevealItem>
            ))}
          </StaggerGroup>
        </div>

        {/* Floating portrait / signature card */}
        <Reveal variants={scaleIn} className="lg:pl-12 lg:pt-0">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="relative overflow-hidden rounded-[4rem_1rem_4rem_1rem] border border-foreground bg-primary p-6 text-primary-foreground min-[380px]:p-7 sm:p-10 [&_.text-muted-foreground]:text-primary-foreground/70"
          >
            <div className="relative flex flex-col gap-6 sm:gap-8">
              <span className="font-mono text-xs tracking-[0.2em] uppercase">
                Actualmente
              </span>
              <p className="text-2xl leading-snug font-medium tracking-tight text-balance sm:text-3xl">
                &ldquo;La mayoría de los sitios de pequeños negocios fallan por motivos
                simples: son lentos, confusos y no ofrecen un siguiente paso claro.
                Esas son las tres primeras cosas que soluciono.&rdquo;
              </p>
              <div className="border-border flex items-center justify-between border-t pt-6">
                <div className="flex flex-col">
                  <span className="font-medium">Mateo Rodríguez</span>
                  <span className="text-muted-foreground text-sm">
                    Desarrollador full-stack, remoto
                  </span>
                </div>
                <span className="text-muted-foreground font-mono text-xs">
                  Uruguay · Trabajo remoto
                </span>
              </div>
            </div>
          </motion.div>

          <Reveal variants={fadeUp} delay={0.15} className="mt-6">
            <dl className="grid grid-cols-2 gap-4">
              {[
                { k: 'Tiempo de respuesta', v: 'Menos de 24 h' },
                { k: 'Plazo habitual', v: '2–5 semanas' },
              ].map((item) => (
                <div
                  key={item.k}
                  className="border-border rounded-2xl border p-5 transition-colors duration-300 hover:border-primary/40"
                >
                  <dt className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                    {item.k}
                  </dt>
                  <dd className="mt-1.5 text-lg font-medium">{item.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Reveal>
      </div>
    </section>
  )
}

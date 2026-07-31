'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { RevealItem, StaggerGroup } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'
import { EASE } from '@/lib/motion'

type Project = {
  title: string
  category: string
  description: string
  image: string
  tech: string[]
  wide?: boolean
}

const PROJECTS: Project[] = [
  {
    title: 'Lumen Dental',
    category: 'Clínica local',
    description:
      'Un sitio sereno y confiable para una clínica dental con dos sedes, reservas en línea y horarios específicos para cada local.',
    image: '/projects/dental-clinic.png',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    wide: true,
  },
  {
    title: 'Casa Nera',
    category: 'Restaurant',
    description:
      'Menú, galería y reservas para una trattoria de barrio, con un diseño pensado primero para móviles porque el 80 % de los clientes accede desde el teléfono.',
    image: '/projects/restaurant.png',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
  },
  {
    title: 'Northline Studio',
    category: 'Comercio electrónico',
    description:
      'Una tienda boutique con carrito personalizado, stock sincronizado y un proceso de pago que carga en menos de un segundo.',
    image: '/projects/ecommerce.png',
    tech: ['Next.js', 'Node.js', 'MySQL', 'Vercel'],
  },
  {
    title: 'Ledger Insights',
    category: 'Aplicación web',
    description:
      'Un panel interno de analítica que sustituye el trabajo con hojas de cálculo: gráficos en vivo, acceso por roles y exportación a CSV.',
    image: '/projects/saas-dashboard.png',
    tech: ['Next.js', 'TypeScript', 'Express', 'PostgreSQL'],
    wide: true,
  },
]

export function Projects() {
  return (
    <section
      id="work"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-28 sm:py-36"
    >
      <SectionHeading
        eyebrow="Proyectos seleccionados"
        title="Negocios reales. Resultados medibles."
        description="Una breve selección de proyectos recientes. Todos comenzaron con una conversación sobre clientes, no sobre píxeles."
      />

      <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-2" gap={0.12}>
        {PROJECTS.map((project) => (
          <RevealItem
            key={project.title}
            className={cn('h-full', project.wide && 'md:col-span-2')}
          >
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="group border-border glass relative flex h-full flex-col overflow-hidden rounded-3xl border"
            >
              <div
                className={cn(
                  'relative overflow-hidden',
                  project.wide ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/3]',
                )}
              >
                <Image
                  src={project.image}
                  alt={`${project.title}: sitio de ${project.category} diseñado y desarrollado por Mateo Ravel`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1100px"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                {/* Readability + hover wash */}
                <div className="from-card/95 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                <div className="bg-primary/10 absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="glass border-border absolute top-5 left-5 rounded-full border px-3 py-1 font-mono text-[0.7rem] tracking-[0.14em] uppercase">
                  {project.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-5 p-7 sm:p-8">
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-2xl font-medium tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground max-w-xl leading-relaxed text-pretty">
                    {project.description}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="border-border text-muted-foreground rounded-full border px-3 py-1 font-mono text-xs"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="group/link text-primary mt-auto inline-flex w-fit items-center gap-1.5 rounded-full text-sm font-medium outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
                >
                  Ver proyecto
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  <span className="sr-only">: {project.title}</span>
                </a>
              </div>
            </motion.article>
          </RevealItem>
        ))}
      </StaggerGroup>
    </section>
  )
}

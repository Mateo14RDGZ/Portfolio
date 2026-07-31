'use client'

import { motion } from 'motion/react'
import {
  ArrowDownRight,
  Code2,
  Gauge,
  PenTool,
  Rocket,
  ServerCog,
  Smartphone,
} from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { EASE } from '@/lib/motion'
import { track } from '@vercel/analytics'

const SKILLS = [
  {
    number: '01',
    title: 'Diseño de interfaces',
    copy: 'Convierto ideas en sistemas visuales claros, coherentes y fáciles de recorrer, con atención real a tipografía, ritmo y jerarquía.',
    tags: ['UI', 'UX', 'Sistemas visuales'],
    icon: PenTool,
    accent: 'bg-primary',
  },
  {
    number: '02',
    title: 'Frontend moderno',
    copy: 'Construyo interfaces rápidas y mantenibles con componentes reutilizables, animaciones precisas y una experiencia cuidada.',
    tags: ['React', 'Next.js', 'TypeScript'],
    icon: Code2,
    accent: 'bg-accent',
  },
  {
    number: '03',
    title: 'Backend y APIs',
    copy: 'Desarrollo la lógica que conecta formularios, datos, usuarios y servicios externos de forma segura y ordenada.',
    tags: ['Node.js', 'APIs', 'Bases de datos'],
    icon: ServerCog,
    accent: 'bg-secondary',
  },
  {
    number: '04',
    title: 'Rendimiento y SEO',
    copy: 'Optimizo carga, estructura y contenido técnico para que cada página responda rápido y sea sencilla de encontrar.',
    tags: ['Core Web Vitals', 'SEO', 'Accesibilidad'],
    icon: Gauge,
    accent: 'bg-primary',
  },
  {
    number: '05',
    title: 'Responsive real',
    copy: 'Diseño cada interacción para que conserve claridad, personalidad y comodidad desde un móvil hasta una pantalla amplia.',
    tags: ['Mobile first', 'Touch', 'Cross-browser'],
    icon: Smartphone,
    accent: 'bg-accent',
  },
  {
    number: '06',
    title: 'Lanzamiento y evolución',
    copy: 'Llevo el producto a producción, configuro sus servicios y dejo una base preparada para crecer sin rehacerlo todo.',
    tags: ['Vercel', 'Git', 'Mantenimiento'],
    icon: Rocket,
    accent: 'bg-secondary',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
}

const card = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
}

export function Projects() {
  return (
    <section id="work" className="scroll-mt-24 overflow-hidden bg-foreground py-16 text-background sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Habilidades"
          title="Diseño, código y criterio en un solo proceso."
          description="Combino pensamiento visual y desarrollo técnico para construir experiencias digitales completas, desde la primera decisión hasta la publicación."
          className="border-background/50 [&_h2]:text-background [&_p]:text-background/65 [&_span]:text-primary"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-70px' }}
          className="mt-9 grid gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILLS.map((skill) => (
            <motion.article
              key={skill.number}
              variants={card}
              whileHover="hover"
              className="group relative flex min-h-[21rem] overflow-hidden rounded-[2.25rem_0.75rem_2.25rem_0.75rem] border border-background/25 bg-background/[0.035] p-6 sm:p-7"
            >
              <motion.div
                aria-hidden
                className={`absolute -top-24 -right-24 size-64 rounded-full ${skill.accent} opacity-0 blur-3xl`}
                variants={{ hover: { opacity: 0.2, scale: 1.15 } }}
                transition={{ duration: 0.55, ease: EASE }}
              />

              <motion.div
                aria-hidden
                className={`absolute inset-x-0 top-0 h-1 origin-left ${skill.accent}`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
              />

              <motion.div
                className="relative flex w-full flex-col justify-between"
                variants={{ hover: { y: -6 } }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <div className="flex items-start justify-between">
                  <motion.span
                    className="grid size-12 place-items-center rounded-full border border-background/35 bg-background/5"
                    variants={{ hover: { rotate: -6, scale: 1.08, backgroundColor: 'rgba(255,93,58,0.18)' } }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <skill.icon className="size-5" />
                  </motion.span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-background/70">{skill.number}</span>
                </div>

                <div>
                  <h3 className="max-w-xs text-3xl leading-[0.95] font-semibold tracking-[-0.045em]">{skill.title}</h3>
                  <p className="mt-4 leading-relaxed text-background/62">{skill.copy}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-background/20 px-3 py-1.5 font-mono text-[9px] tracking-[0.12em] uppercase transition-colors duration-300 group-hover:border-background/45 group-hover:bg-background/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>

        <motion.a
          href="#contact"
          onClick={() => track('projects_click', { source: 'skills_section' })}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="group mt-8 flex min-h-16 items-center justify-between rounded-full border border-background/55 px-6 text-sm font-semibold transition-colors hover:bg-background hover:text-foreground"
        >
          ¿Necesitás estas habilidades en tu proyecto?
          <ArrowDownRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
        </motion.a>
      </div>
    </section>
  )
}

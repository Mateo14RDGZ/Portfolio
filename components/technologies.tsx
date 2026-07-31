'use client'

import { RevealItem, StaggerGroup } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const STACK = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'Express',
  'MySQL',
  'PostgreSQL',
  'Git',
  'GitHub',
  'Vercel',
]

export function Technologies() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Stack"
          title="Herramientas modernas, elegidas con criterio."
          description="Mantengo una selección de tecnologías reducida y probada para que tu sitio sea rápido hoy y siga siendo fácil de mantener dentro de tres años."
          align="center"
        />

        <StaggerGroup
          className="mt-10 flex flex-wrap justify-center gap-2.5 sm:mt-14 sm:gap-3"
          gap={0.05}
        >
          {STACK.map((tech) => (
            <RevealItem key={tech}>
              <span className="text-foreground inline-flex min-h-11 cursor-default items-center gap-2 border border-foreground px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors duration-300 hover:bg-foreground hover:text-background sm:px-5">
                <span className="bg-primary size-1.5 rounded-full" aria-hidden />
                {tech}
              </span>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>

      {/* Infinite scrolling keyword band */}
      <div
        aria-hidden
        className="relative mt-14 flex overflow-hidden border-y border-border py-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] sm:mt-20 sm:py-5"
      >
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10 motion-reduce:animate-none">
          {[...STACK, ...STACK].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="text-muted-foreground/70 font-mono text-sm tracking-[0.2em] whitespace-nowrap uppercase"
            >
              {tech}
              <span className="text-primary ml-10">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
